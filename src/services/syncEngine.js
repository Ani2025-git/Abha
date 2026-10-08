// Offline Queueing & Background Sync Engine for Rural Telemedicine

import { db } from '../db/database';

class SyncEngine {
  constructor() {
    this.networkMode = 'offline'; // 'online' | 'spotty' | 'offline'
    this.isSyncing = false;
    this.listeners = new Set();
    this.initNetworkListeners();
  }

  initNetworkListeners() {
    if (typeof window === 'undefined') return;

    // Listen to actual OS/browser connectivity
    window.addEventListener('online', () => {
      console.log('[SyncEngine] Real network came online');
      if (this.networkMode === 'offline') {
        this.setNetworkMode('online');
      }
    });

    window.addEventListener('offline', () => {
      console.log('[SyncEngine] Real network went offline');
      this.setNetworkMode('offline');
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      networkMode: this.networkMode,
      isSyncing: this.isSyncing
    }));
  }

  setNetworkMode(mode) {
    this.networkMode = mode;
    console.log(`[SyncEngine] Network mode switched to: ${mode}`);
    this.notify();

    // Trigger auto-sync if we just gained connectivity
    if (mode === 'online' || mode === 'spotty') {
      this.triggerSync();
    }
  }

  isOnline() {
    return this.networkMode === 'online' || this.networkMode === 'spotty';
  }

  /**
   * Queue a new triage checkup into IndexedDB
   */
  async queueTriageRecord(recordData) {
    const record = {
      ...recordData,
      syncStatus: 'pending_sync',
      syncedAt: null,
      syncAttempts: 0,
      createdAt: Date.now()
    };

    const recordId = await db.triageRecords.add(record);

    // Also add to syncQueue table for transactional tracking
    await db.syncQueue.add({
      recordId,
      recordType: 'triage',
      status: 'queued',
      retryCount: 0,
      createdAt: Date.now(),
      lastAttemptAt: null
    });

    console.log(`[SyncEngine] Record #${recordId} queued locally in IndexedDB.`);

    // If online right now, attempt immediate background sync
    if (this.isOnline()) {
      setTimeout(() => this.triggerSync(), 500);
    }

    return recordId;
  }

  /**
   * Execute sync loop over all pending IndexedDB records
   */
  async triggerSync() {
    if (this.isSyncing) return { status: 'already_syncing' };
    if (!this.isOnline()) {
      console.log('[SyncEngine] Cannot sync: pure offline mode active.');
      return { status: 'offline', count: 0 };
    }

    this.isSyncing = true;
    this.notify();

    try {
      const pendingRecords = await db.triageRecords
        .where('syncStatus')
        .equals('pending_sync')
        .toArray();

      if (pendingRecords.length === 0) {
        console.log('[SyncEngine] No pending records to sync.');
        this.isSyncing = false;
        this.notify();
        return { status: 'synced', count: 0 };
      }

      console.log(`[SyncEngine] Synchronizing ${pendingRecords.length} records to PHC cloud server...`);

      // Process each record with simulated network delay
      let syncedCount = 0;
      for (const record of pendingRecords) {
        const delay = this.networkMode === 'spotty' ? 1200 : 400;
        await new Promise(r => setTimeout(r, delay));

        // In spotty mode, simulate 10% packet drop
        if (this.networkMode === 'spotty' && Math.random() < 0.1) {
          console.warn(`[SyncEngine] Spotty 2G packet loss on record #${record.id}, will retry.`);
          await db.triageRecords.update(record.id, {
            syncAttempts: (record.syncAttempts || 0) + 1
          });
          continue;
        }

        // Simulate PHC Doctor auto-triage ticket creation
        const doctorUpdate = { ...record.doctorConsultation };
        if (record.aiAssessment?.urgency === 'RED') {
          doctorUpdate.status = 'awaiting_review';
          doctorUpdate.notes = 'URGENT: Received at PHC Emergency triage queue. 108 Ambulance alert generated.';
        }

        // Mark as synced in IndexedDB
        await db.triageRecords.update(record.id, {
          syncStatus: 'synced',
          syncedAt: Date.now(),
          syncAttempts: (record.syncAttempts || 0) + 1,
          doctorConsultation: doctorUpdate
        });

        // Update syncQueue status
        await db.syncQueue
          .where('recordId')
          .equals(record.id)
          .modify({ status: 'synced', lastAttemptAt: Date.now() });

        syncedCount++;
      }

      console.log(`[SyncEngine] Sync complete: ${syncedCount} of ${pendingRecords.length} records synced.`);
      this.isSyncing = false;
      this.notify();
      return { status: 'success', count: syncedCount, total: pendingRecords.length };
    } catch (err) {
      console.error('[SyncEngine] Error during sync:', err);
      this.isSyncing = false;
      this.notify();
      return { status: 'error', error: err.message };
    }
  }

  /**
   * Get sync queue summary stats
   */
  async getQueueStats() {
    const pendingCount = await db.triageRecords.where('syncStatus').equals('pending_sync').count();
    const syncedCount = await db.triageRecords.where('syncStatus').equals('synced').count();
    const totalPatients = await db.patients.count();
    return { pendingCount, syncedCount, totalPatients };
  }
}

export const syncEngine = new SyncEngine();

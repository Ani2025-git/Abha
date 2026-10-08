import React from 'react';
import {
  Database,
  RefreshCw,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';

export function SyncQueueDrawer({
  isOpen,
  onClose,
  triages = [],
  networkMode = 'offline',
  isSyncing = false,
  onTriggerSync
}) {
  if (!isOpen) return null;

  const pendingTriages = triages.filter(t => t.syncStatus === 'pending_sync');
  const syncedTriages = triages.filter(t => t.syncStatus === 'synced');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 9999
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '500px',
        height: '100%',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={22} color="#34d399" />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>
                IndexedDB Sync Queue
              </h3>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Offline Storage & Background Sync Manager
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              color: '#94a3b8',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.1)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Sync Status Banner */}
        <div style={{
          padding: '16px 24px',
          background: networkMode === 'offline' ? '#fef2f2' : networkMode === 'spotty' ? '#fffbeb' : '#ecfdf5',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '700',
              color: networkMode === 'offline' ? '#dc2626' : networkMode === 'spotty' ? '#b45309' : '#047857'
            }}>
              {networkMode === 'offline' && 'Offline Queue Active (No Cellular Signal)'}
              {networkMode === 'spotty' && 'Spotty 2G Connection (High Latency)'}
              {networkMode === 'online' && 'Connected to PHC Telemedicine Gateway'}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {pendingTriages.length} records pending upload • {syncedTriages.length} synced
            </div>
          </div>

          <button
            onClick={onTriggerSync}
            disabled={networkMode === 'offline' || isSyncing}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: networkMode === 'offline' ? '#cbd5e1' : '#059669',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: networkMode === 'offline' ? 'not-allowed' : 'pointer'
            }}
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin-slow' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>

        {/* Records List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: '#64748b', fontWeight: '800', letterSpacing: '0.8px' }}>
            Queue Items in Local Browser Storage:
          </h4>

          {triages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              No checkups recorded yet. Run a triage to see records queued offline!
            </div>
          ) : (
            triages.map(t => {
              const isPending = t.syncStatus === 'pending_sync';
              return (
                <div
                  key={t.id}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '14px',
                    border: isPending ? '1px solid #f59e0b' : '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>
                      {t.patientName} ({t.village})
                    </span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: '800',
                      background: isPending ? '#fef3c7' : '#d1fae5',
                      color: isPending ? '#b45309' : '#047857',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {isPending ? <Clock size={11} /> : <CheckCircle2 size={11} />}
                      {isPending ? 'Pending Sync' : 'Synced'}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    Urgency: <strong style={{ color: t.aiAssessment?.urgency === 'RED' ? '#dc2626' : '#d97706' }}>{t.aiAssessment?.urgency}</strong> • SpO2: {t.vitals?.spo2}% • BP: {t.vitals?.bpSystolic}/{t.vitals?.bpDiastolic}
                  </div>

                  <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Record ID: #{t.id}</span>
                    <span>{new Date(t.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b' }}>
          💡 <strong>Offline Architecture:</strong> Even if browser is closed or refreshed with zero Wi-Fi, all records remain safe in IndexedDB and synchronize automatically when connectivity is restored.
        </div>
      </div>
    </div>
  );
}

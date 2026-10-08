import React, { useState, useEffect } from 'react';
import { db, seedInitialData } from './db/database';
import { syncEngine } from './services/syncEngine';
import { speechService } from './services/speechService';
import { getTranslation } from './services/i18n';
import { Navbar } from './components/Navbar';
import { VoicePromptBanner } from './components/VoicePromptBanner';
import { VoiceMicModal } from './components/VoiceMicModal';
import { TriageForm } from './components/TriageForm';
import { TriageResultModal } from './components/TriageResultModal';
import { DoctorPortal } from './components/DoctorPortal';
import { VillageAnalytics } from './components/VillageAnalytics';
import { PatientList } from './components/PatientList';
import { SyncQueueDrawer } from './components/SyncQueueDrawer';
import { Cpu } from 'lucide-react';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState('triage'); // 'triage' | 'doctor' | 'analytics' | 'patients'
  const [patients, setPatients] = useState([]);
  const [triages, setTriages] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Network & Sync State
  const [networkMode, setNetworkMode] = useState(typeof navigator !== 'undefined' && navigator.onLine ? 'online' : 'offline');
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false);

  // Voice Assistant & Global Language State (Defaults to Hindi for ASHA)
  const [currentLanguage, setCurrentLanguage] = useState('hi-IN');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceExtractedSymptoms, setVoiceExtractedSymptoms] = useState([]);

  // Active Triage Assessment State
  const [currentAssessmentResult, setCurrentAssessmentResult] = useState(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

  const t = (key) => getTranslation(key, currentLanguage);

  // Initialize DB & Seed Data
  useEffect(() => {
    async function init() {
      await seedInitialData();

      // Retrieve saved language from settings if exists
      const savedSettings = await db.appSettings.get('global');
      if (savedSettings?.currentLanguage) {
        const lang = savedSettings.currentLanguage.includes('-')
          ? savedSettings.currentLanguage
          : `${savedSettings.currentLanguage}-IN`;
        setCurrentLanguage(lang);
        speechService.setLanguage(lang);
      } else {
        speechService.setLanguage('hi-IN');
      }

      await refreshData();

      // Subscribe to sync engine events
      const unsubscribe = syncEngine.subscribe(({ networkMode: mode, isSyncing: syncing }) => {
        setNetworkMode(mode);
        setIsSyncing(syncing);
        refreshData();
      });

      return () => unsubscribe();
    }
    init();
  }, []);

  const refreshData = async () => {
    try {
      const allPatients = await db.patients.toArray();
      const allTriages = await db.triageRecords.orderBy('createdAt').reverse().toArray();
      setPatients(allPatients);
      setTriages(allTriages);

      const pending = allTriages.filter(t => t.syncStatus === 'pending_sync').length;
      setPendingCount(pending);

      if (!selectedPatientId && allPatients.length > 0) {
        setSelectedPatientId(allPatients[0].id);
      }
    } catch (err) {
      console.error('[App] Error fetching local DB data:', err);
    }
  };


  // Trigger sync manually
  const handleTriggerSync = async () => {
    await syncEngine.triggerSync();
    await refreshData();
  };

  // Handle global language switch
  const handleLanguageChange = async (langCode) => {
    setCurrentLanguage(langCode);
    speechService.setLanguage(langCode);

    // Persist in local IndexedDB
    try {
      await db.appSettings.update('global', { currentLanguage: langCode });
    } catch (e) {
      console.warn('[App] Could not persist language setting:', e);
    }
  };

  // When AI assessment finishes in TriageForm
  const handleTriageComplete = ({ assessment, patient, vitals, symptoms, voiceTranscript, audioUrl }) => {
    setCurrentAssessmentResult({
      assessment,
      patient,
      vitals,
      symptoms,
      voiceTranscript,
      audioUrl
    });
    setIsAssessmentModalOpen(true);
  };

  // Save completed triage to IndexedDB
  const handleSaveAssessmentToQueue = async () => {
    if (!currentAssessmentResult) return;

    const { assessment, patient, vitals, symptoms, voiceTranscript, audioUrl } = currentAssessmentResult;

    await syncEngine.queueTriageRecord({
      patientId: patient?.id,
      patientName: patient?.name || 'Village Patient',
      patientAge: patient?.age || 30,
      patientGender: patient?.gender || 'female',
      village: patient?.village || 'Rampur Kalan',
      vitals,
      symptoms,
      chiefComplaintVoice: voiceTranscript || '',
      audioMemoBlob: audioUrl || null,
      aiAssessment: assessment,
      doctorConsultation: {
        doctorName: '',
        doctorRegNo: '',
        status: 'awaiting_review',
        notes: '',
        prescription: [],
        reviewedAt: null
      }
    });

    await refreshData();
  };

  // Handle voice NLP output from modal
  const handleApplyVoiceSymptoms = (symptomIds, transcript) => {
    setVoiceExtractedSymptoms(symptomIds);
    setVoiceTranscript(transcript);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Primary Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingSyncCount={pendingCount}
        onOpenSyncQueue={() => setIsQueueDrawerOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* 3. Main Body */}
      <main style={{ flex: 1, padding: '24px 0' }}>
        <div className="container">
          {/* Hero Banner (Only on Triage tab) */}
          {activeTab === 'triage' && (
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid #bbf7d0',
              boxShadow: '0 4px 16px rgba(5, 150, 105, 0.08)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ flex: '1 1 360px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '800',
                  marginBottom: '10px'
                }}>
                  <Cpu size={13} color="#059669" />
                  <span>WHO IMCI & MoHFW Clinical Protocols • 100% Offline PWA</span>
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#064e3b', margin: '0 0 8px 0', lineHeight: '1.2' }}>
                  {t('heroTitle')}
                </h2>
                <p style={{ fontSize: '14px', color: '#334155', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                  {t('heroSubtitle')}
                </p>

                {/* Key feature pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '12px' }}>
                  <span style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '8px', color: '#334155', fontWeight: '600' }}>
                    {t('heroTag1')}
                  </span>
                  <span style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '8px', color: '#334155', fontWeight: '600' }}>
                    {t('heroTag2')}
                  </span>
                  <span style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '8px', color: '#334155', fontWeight: '600' }}>
                    {t('heroTag3')}
                  </span>
                </div>
              </div>

              {/* Hero Image Illustration */}
              <div style={{ flex: '0 0 320px', maxWidth: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                <img
                  src="/hero.png"
                  alt="Rural Health Telemedicine"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}

          {/* Voice Prompt Guidance Bar */}
          <VoicePromptBanner
            language={currentLanguage}
            onLanguageChange={handleLanguageChange}
            currentStep={
              activeTab === 'triage' ? 'welcome' :
              activeTab === 'doctor' ? 'yellowUrgent' :
              activeTab === 'analytics' ? 'analyzing' : 'welcome'
            }
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          />

          {/* Tab Views */}
          {activeTab === 'triage' && (
            <TriageForm
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onOpenNewPatientModal={() => setActiveTab('patients')}
              onTriageComplete={handleTriageComplete}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              voiceTranscript={voiceTranscript}
              voiceExtractedSymptoms={voiceExtractedSymptoms}
              currentLanguage={currentLanguage}
            />
          )}

          {activeTab === 'doctor' && (
            <DoctorPortal
              triages={triages}
              onRefreshTriages={refreshData}
            />
          )}

          {activeTab === 'analytics' && (
            <VillageAnalytics
              triages={triages}
              patients={patients}
            />
          )}

          {activeTab === 'patients' && (
            <PatientList
              patients={patients}
              onSelectForTriage={(patientId) => {
                setSelectedPatientId(patientId);
                setActiveTab('triage');
              }}
              onRefreshPatients={refreshData}
            />
          )}
        </div>
      </main>

      {/* Voice Assistant Modal */}
      <VoiceMicModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onApplySymptoms={handleApplyVoiceSymptoms}
        currentLanguage={currentLanguage}
      />

      {/* Triage AI Assessment Result Modal */}
      <TriageResultModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        assessment={currentAssessmentResult?.assessment}
        patient={currentAssessmentResult?.patient}
        vitals={currentAssessmentResult?.vitals}
        symptoms={currentAssessmentResult?.symptoms}
        onSaveToQueue={handleSaveAssessmentToQueue}
        currentLanguage={currentLanguage}
      />

      {/* IndexedDB Sync Queue Drawer */}
      <SyncQueueDrawer
        isOpen={isQueueDrawerOpen}
        onClose={() => setIsQueueDrawerOpen(false)}
        triages={triages}
        networkMode={networkMode}
        isSyncing={isSyncing}
        onTriggerSync={handleTriggerSync}
      />

      {/* Footer */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '20px 0',
        fontSize: '12px',
        color: '#64748b'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div>
            <strong>AarogyaSangini PWA</strong> • Designed for ASHA & Anganwadi Rural Healthcare Workers • MoHFW & WHO IMCI Compliant
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

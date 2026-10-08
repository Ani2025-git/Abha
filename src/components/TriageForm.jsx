import React, { useState, useRef } from 'react';
import {
  Heart,
  Thermometer,
  Activity,
  Wind,
  Droplet,
  Scale,
  Mic,
  Square,
  Sparkles,
  PlusCircle,
  Volume2
} from 'lucide-react';
import { SYMPTOMS_CATALOG, getLocalizedSymptomName } from '../ai/diseaseProtocols';
import { assessPatientTriage } from '../ai/triageEngine';
import { speechService } from '../services/speechService';
import { getTranslation } from '../services/i18n';

export function TriageForm({
  patients = [],
  selectedPatientId,
  onSelectPatient,
  onOpenNewPatientModal,
  onTriageComplete,
  onOpenVoiceModal,
  voiceTranscript = '',
  voiceExtractedSymptoms = [],
  currentLanguage = 'hi-IN'
}) {
  const selectedPatient = patients.find(p => p.id === Number(selectedPatientId)) || patients[0];
  const t = (key) => getTranslation(key, currentLanguage);

  // Vitals State
  const [vitals, setVitals] = useState({
    tempF: '99.2',
    pulse: '84',
    bpSystolic: '120',
    bpDiastolic: '80',
    spo2: '98',
    respRate: '20',
    bloodSugar: '105',
    muac: '14.2',
    weight: '52'
  });

  // Selected symptoms set
  const [selectedSymptoms, setSelectedSymptoms] = useState(['cough']);

  // Audio Memo Recorder State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  // Sync incoming voice extracted symptoms
  React.useEffect(() => {
    if (voiceExtractedSymptoms && voiceExtractedSymptoms.length > 0) {
      setSelectedSymptoms(prev => Array.from(new Set([...prev, ...voiceExtractedSymptoms])));
    }
  }, [voiceExtractedSymptoms]);

  const handleVitalChange = (field, value) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Audio Memo recording
  const startAudioMemo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecordingAudio(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } catch (err) {
      console.warn('[AudioMemo] Microphone simulation:', err);
      setIsRecordingAudio(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => {
          if (s >= 5) {
            stopAudioMemo();
            return 5;
          }
          return s + 1;
        });
      }, 1000);
    }
  };

  const stopAudioMemo = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecordingAudio(false);
  };

  const handleSpeakVitalGuide = (guideTextKey) => {
    const text = t(guideTextKey);
    speechService.speak(text, currentLanguage);
  };

  // Trigger Local Quantized AI Assessment
  const handleAssess = async () => {
    const numericVitals = {
      tempF: parseFloat(vitals.tempF) || 98.6,
      pulse: parseInt(vitals.pulse, 10) || 75,
      bpSystolic: parseInt(vitals.bpSystolic, 10) || 120,
      bpDiastolic: parseInt(vitals.bpDiastolic, 10) || 80,
      spo2: parseInt(vitals.spo2, 10) || 98,
      respRate: parseInt(vitals.respRate, 10) || 18,
      bloodSugar: parseInt(vitals.bloodSugar, 10) || 100,
      muac: parseFloat(vitals.muac) || 15.0,
      weight: parseFloat(vitals.weight) || 50.0
    };

    const assessment = await assessPatientTriage(numericVitals, selectedSymptoms, selectedPatient || {});

    onTriageComplete({
      assessment,
      patient: selectedPatient,
      vitals: numericVitals,
      symptoms: selectedSymptoms,
      voiceTranscript,
      audioUrl
    });
  };

  // Clinical preset loader
  const loadClinicalPreset = (presetType) => {
    if (presetType === 'pneumonia_child') {
      setVitals({
        tempF: '102.8',
        pulse: '142',
        bpSystolic: '84',
        bpDiastolic: '52',
        spo2: '89',
        respRate: '52',
        bloodSugar: '85',
        muac: '11.0',
        weight: '8.2'
      });
      setSelectedSymptoms(['chest_indrawing', 'fast_breathing', 'high_fever', 'cough', 'refusing_feed']);
    } else if (presetType === 'preeclampsia_maternal') {
      setVitals({
        tempF: '98.8',
        pulse: '96',
        bpSystolic: '158',
        bpDiastolic: '104',
        spo2: '97',
        respRate: '22',
        bloodSugar: '115',
        muac: '24.0',
        weight: '62.0'
      });
      setSelectedSymptoms(['severe_headache', 'blurred_vision', 'face_swelling', 'severe_abdo_pain']);
    } else if (presetType === 'malaria_fever') {
      setVitals({
        tempF: '103.2',
        pulse: '110',
        bpSystolic: '122',
        bpDiastolic: '78',
        spo2: '96',
        respRate: '20',
        bloodSugar: '110',
        muac: '23.0',
        weight: '56.0'
      });
      setSelectedSymptoms(['high_fever', 'chills_rigors', 'joint_pain']);
    } else if (presetType === 'dehydration_gastro') {
      setVitals({
        tempF: '100.2',
        pulse: '128',
        bpSystolic: '90',
        bpDiastolic: '58',
        spo2: '97',
        respRate: '26',
        bloodSugar: '78',
        muac: '12.8',
        weight: '11.5'
      });
      setSelectedSymptoms(['watery_diarrhea', 'vomiting', 'sunken_eyes', 'slow_skin_pinch', 'lethargy_unconscious']);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Patient Header Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: '800', letterSpacing: '0.8px' }}>
              {t('step1Title')}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              {t('choosePatient')}
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onOpenNewPatientModal}
              style={{
                background: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <PlusCircle size={15} /> {t('addNewResident')}
            </button>
          </div>
        </div>

        {/* Patient Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div>
            <select
              value={selectedPatient?.id || ''}
              onChange={(e) => onSelectPatient(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                fontSize: '14px',
                fontWeight: '600',
                color: '#0f172a',
                outline: 'none'
              }}
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.age}y, {p.gender}) - {p.village} {p.isPregnant ? '• [Pregnant 🤰]' : ''} {p.isChildUnder5 ? '• [Child <5 👶]' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Quick patient info tags */}
          {selectedPatient && (
            <div style={{
              background: '#f8fafc',
              borderRadius: '10px',
              padding: '10px 14px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px'
            }}>
              <div>
                <div style={{ fontWeight: '700', color: '#0f172a' }}>{selectedPatient.name}</div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>ABHA: {selectedPatient.abhaId || '91-8472-1092-3841'}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {selectedPatient.isPregnant && (
                  <span style={{ background: '#fdf2f8', color: '#db2777', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '11px' }}>
                    🤰 Trimester {selectedPatient.trimester || 3}
                  </span>
                )}
                {selectedPatient.isChildUnder5 && (
                  <span style={{ background: '#f0f9ff', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '11px' }}>
                    👶 Child Under 5
                  </span>
                )}
                <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '11px' }}>
                  {selectedPatient.village}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Clinical Simulation Presets */}
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px dashed #e2e8f0' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} color="#f59e0b" />
            <span>{t('quickPresets')}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => loadClinicalPreset('pneumonia_child')}
              style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                border: '1px solid #f87171'
              }}
            >
              {t('presetChildPneumonia')}
            </button>
            <button
              onClick={() => loadClinicalPreset('preeclampsia_maternal')}
              style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                border: '1px solid #fcd34d'
              }}
            >
              {t('presetPreeclampsia')}
            </button>
            <button
              onClick={() => loadClinicalPreset('malaria_fever')}
              style={{
                background: '#fef9c3',
                color: '#854d0e',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                border: '1px solid #facc15'
              }}
            >
              {t('presetMalaria')}
            </button>
            <button
              onClick={() => loadClinicalPreset('dehydration_gastro')}
              style={{
                background: '#dbeafe',
                color: '#1e40af',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                border: '1px solid #93c5fd'
              }}
            >
              {t('presetDehydration')}
            </button>
          </div>
        </div>
      </div>

      {/* Step 2: Vitals Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: '800', letterSpacing: '0.8px' }}>
              {t('step2Title')}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              {t('vitalsSubtitle')}
            </h3>
          </div>
        </div>

        {/* Vitals Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          {/* Temperature */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Thermometer size={16} color="#ef4444" />
                <span>{t('tempLabel')}</span>
              </span>
              <button
                onClick={() => handleSpeakVitalGuide('tempGuide')}
                style={{ color: '#059669' }}
                title="Listen guide"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <input
              type="number"
              step="0.1"
              value={vitals.tempF}
              onChange={(e) => handleVitalChange('tempF', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: parseFloat(vitals.tempF) >= 101 ? '#dc2626' : '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: parseFloat(vitals.tempF) >= 101 ? '#dc2626' : '#64748b', marginTop: '2px', fontWeight: '600' }}>
              {parseFloat(vitals.tempF) >= 102 ? '🔥 High Fever' : parseFloat(vitals.tempF) >= 100.4 ? '⚠️ Fever' : '✓ Normal'}
            </div>
          </div>

          {/* Pulse */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={16} color="#dc2626" className="animate-heartbeat" />
                <span>{t('pulseLabel')}</span>
              </span>
              <button
                onClick={() => handleSpeakVitalGuide('pulseGuide')}
                style={{ color: '#059669' }}
                title="Listen guide"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <input
              type="number"
              value={vitals.pulse}
              onChange={(e) => handleVitalChange('pulse', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: parseInt(vitals.pulse) > 120 ? '#dc2626' : '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: parseInt(vitals.pulse) > 120 ? '#dc2626' : '#64748b', marginTop: '2px', fontWeight: '600' }}>
              {parseInt(vitals.pulse) > 120 ? '⚡ Tachycardia' : '✓ Regular'}
            </div>
          </div>

          {/* BP Systolic */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={16} color="#0284c7" />
                <span>{t('bpSysLabel')}</span>
              </span>
              <button
                onClick={() => handleSpeakVitalGuide('bpGuide')}
                style={{ color: '#059669' }}
                title="Listen guide"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <input
              type="number"
              value={vitals.bpSystolic}
              onChange={(e) => handleVitalChange('bpSystolic', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: parseInt(vitals.bpSystolic) >= 140 ? '#dc2626' : '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: parseInt(vitals.bpSystolic) >= 140 ? '#dc2626' : '#64748b', marginTop: '2px', fontWeight: '600' }}>
              {parseInt(vitals.bpSystolic) >= 140 ? '⚠️ High' : '✓ Normal'}
            </div>
          </div>

          {/* BP Diastolic */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={16} color="#0284c7" />
                <span>{t('bpDiaLabel')}</span>
              </span>
            </div>
            <input
              type="number"
              value={vitals.bpDiastolic}
              onChange={(e) => handleVitalChange('bpDiastolic', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: parseInt(vitals.bpDiastolic) >= 90 ? '#dc2626' : '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: parseInt(vitals.bpDiastolic) >= 90 ? '#dc2626' : '#64748b', marginTop: '2px', fontWeight: '600' }}>
              {parseInt(vitals.bpDiastolic) >= 90 ? '⚠️ High' : '✓ Normal'}
            </div>
          </div>

          {/* SpO2 Oxygen */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Droplet size={16} color="#0284c7" />
                <span>{t('spo2Label')}</span>
              </span>
              <button
                onClick={() => handleSpeakVitalGuide('spo2Guide')}
                style={{ color: '#059669' }}
                title="Listen guide"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <input
              type="number"
              value={vitals.spo2}
              onChange={(e) => handleVitalChange('spo2', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: parseInt(vitals.spo2) < 92 ? '#dc2626' : '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: parseInt(vitals.spo2) < 92 ? '#dc2626' : '#64748b', marginTop: '2px', fontWeight: '600' }}>
              {parseInt(vitals.spo2) < 92 ? '🚨 Hypoxia (<92%)' : '✓ Normal'}
            </div>
          </div>

          {/* Respiratory Rate */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Wind size={16} color="#0d9488" />
                <span>{t('respLabel')}</span>
              </span>
            </div>
            <input
              type="number"
              value={vitals.respRate}
              onChange={(e) => handleVitalChange('respRate', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: parseInt(vitals.respRate) >= 40 ? '#dc2626' : '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: parseInt(vitals.respRate) >= 40 ? '#dc2626' : '#64748b', marginTop: '2px', fontWeight: '600' }}>
              {parseInt(vitals.respRate) >= 40 ? '⚠️ Rapid' : '✓ Normal'}
            </div>
          </div>

          {/* MUAC */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Scale size={16} color="#8b5cf6" />
                <span>{t('muacLabel')}</span>
              </span>
            </div>
            <input
              type="number"
              step="0.1"
              value={vitals.muac}
              onChange={(e) => handleVitalChange('muac', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: parseFloat(vitals.muac) < 11.5 ? '#dc2626' : '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: parseFloat(vitals.muac) < 11.5 ? '#dc2626' : '#64748b', marginTop: '2px', fontWeight: '600' }}>
              {parseFloat(vitals.muac) < 11.5 ? '🔴 RED: SAM' : parseFloat(vitals.muac) < 12.5 ? '🟡 YELLOW: MAM' : '🟢 GREEN: Normal'}
            </div>
          </div>

          {/* Weight */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Scale size={16} color="#059669" />
                <span>{t('weightLabel')}</span>
              </span>
            </div>
            <input
              type="number"
              step="0.1"
              value={vitals.weight}
              onChange={(e) => handleVitalChange('weight', e.target.value)}
              style={{
                width: '100%',
                fontSize: '20px',
                fontWeight: '800',
                color: '#0f172a',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }}
            />
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontWeight: '600' }}>
              kg
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Symptoms Checklist with Localized Names */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: '800', letterSpacing: '0.8px' }}>
              {t('step3Title')}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              {t('step3Title')}
            </h3>
          </div>

          <button
            onClick={onOpenVoiceModal}
            style={{
              background: '#fef3c7',
              color: '#92400e',
              border: '1px solid #fde68a',
              padding: '6px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Mic size={15} color="#d97706" /> {t('speakSymptomsBtn')}
          </button>
        </div>

        {voiceTranscript && (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '14px',
            fontSize: '12px',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} color="#059669" />
            <span><strong>{t('symptomsVoiceBadge')}</strong> "{voiceTranscript}"</span>
          </div>
        )}

        {/* Symptoms Chips categorized with Localized Names */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
          {SYMPTOMS_CATALOG.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            const localizedName = getLocalizedSymptomName(symptom, currentLanguage);

            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: isSelected
                    ? (symptom.isCritical ? '2px solid #dc2626' : '2px solid #059669')
                    : '1px solid #e2e8f0',
                  background: isSelected
                    ? (symptom.isCritical ? '#fef2f2' : '#ecfdf5')
                    : '#f8fafc',
                  color: isSelected
                    ? (symptom.isCritical ? '#991b1b' : '#065f46')
                    : '#334155',
                  fontSize: '13px',
                  fontWeight: isSelected ? '700' : '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {symptom.isCritical && (
                      <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '10px', padding: '1px 5px', borderRadius: '4px', fontWeight: '800' }}>
                        {t('dangerTag')}
                      </span>
                    )}
                    <span>{localizedName}</span>
                  </div>
                  {currentLanguage !== 'en-IN' && (
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      {symptom.name}
                    </div>
                  )}
                </div>

                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: isSelected ? 'none' : '2px solid #cbd5e1',
                  background: isSelected ? (symptom.isCritical ? '#dc2626' : '#059669') : 'transparent',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {isSelected ? '✓' : ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 4: Audio Memo / Voice Note for Telemedicine Doctor */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: '800', letterSpacing: '0.8px' }}>
              {t('step4Title')}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
              {t('voiceMemoSubtitle')}
            </h3>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#f8fafc',
          padding: '14px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          flexWrap: 'wrap'
        }}>
          {!isRecordingAudio ? (
            <button
              onClick={startAudioMemo}
              style={{
                background: '#dc2626',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Mic size={16} /> {t('recordSoundBtn')} (15s)
            </button>
          ) : (
            <button
              onClick={stopAudioMemo}
              style={{
                background: '#1e293b',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Square size={16} /> {t('stopRecordBtn')} ({recordingSeconds}s)
            </button>
          )}

          {audioUrl && !isRecordingAudio && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <audio src={audioUrl} controls style={{ height: '36px' }} />
              <span style={{ fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                ✓ {t('audioAttached')} ({recordingSeconds || 8}s)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Triage Trigger Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          onClick={handleAssess}
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff',
            padding: '16px 36px',
            borderRadius: '14px',
            fontSize: '16px',
            fontWeight: '800',
            boxShadow: '0 10px 25px rgba(5, 150, 105, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: 'none',
            transition: 'transform 0.1s ease',
            cursor: 'pointer'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Sparkles size={22} color="#fde047" />
          <span>{t('runTriageBtn')}</span>
        </button>
      </div>
    </div>
  );
}

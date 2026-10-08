import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Check, X, Sparkles, Volume2 } from 'lucide-react';
import { speechService } from '../services/speechService';
import { extractSymptomsFromVoice, SAMPLE_VOICE_SNIPPETS } from '../services/voiceAssistant';
import { SYMPTOMS_CATALOG, getLocalizedSymptomName } from '../ai/diseaseProtocols';
import { getTranslation } from '../services/i18n';

export function VoiceMicModal({ isOpen, onClose, onApplySymptoms, currentLanguage = 'hi-IN' }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedSymptomIds, setDetectedSymptomIds] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const t = (key) => getTranslation(key, currentLanguage);

  useEffect(() => {
    if (!isOpen) {
      if (isRecording) {
        speechService.stopListening();
        setIsRecording(false);
      }
      setTranscript('');
      setDetectedSymptomIds([]);
    } else {
      setStatusMessage('Press microphone to speak or click a sample phrase in your language.');
    }
  }, [isOpen]);

  const handleToggleRecord = () => {
    if (isRecording) {
      speechService.stopListening();
      setIsRecording(false);
      setStatusMessage('Voice recognition paused. Click Apply to save symptoms.');
    } else {
      setTranscript('');
      setDetectedSymptomIds([]);
      setStatusMessage('Listening in your selected language... Speak patient symptoms.');

      const started = speechService.startListening({
        onResult: ({ final, interim }) => {
          const currentText = final || interim;
          setTranscript(currentText);

          // Extract symptoms live
          const matched = extractSymptomsFromVoice(currentText);
          setDetectedSymptomIds(matched);
        },
        onError: (err) => {
          console.warn('[STT Modal Error]', err);
          setStatusMessage(`Speech status: ${err}. You can click any sample audio phrase below!`);
          setIsRecording(false);
        },
        onEnd: () => {
          setIsRecording(false);
        }
      });

      if (started) {
        setIsRecording(true);
      } else {
        setStatusMessage('Microphone access unavailable. Click any sample audio phrase below to test NLP!');
      }
    }
  };

  const handleSelectSample = (sample) => {
    setTranscript(sample.text);
    const matched = extractSymptomsFromVoice(sample.text);
    setDetectedSymptomIds(matched);
    setStatusMessage(`Loaded audio phrase: "${sample.label}"`);
  };

  const handleApply = () => {
    onApplySymptoms(detectedSymptomIds, transcript);
    onClose();
  };

  if (!isOpen) return null;

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
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '560px',
        padding: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        border: '1px solid #e2e8f0',
        maxHeight: '92vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mic size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                Voice Symptom Assistant (वाणी सहायक)
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Web Speech API • Multi-lingual Natural Language Parser
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              background: '#f1f5f9'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Big Mic Button with Waveform */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0',
          background: '#f8fafc',
          borderRadius: '16px',
          marginBottom: '16px',
          border: '1px dashed #cbd5e1'
        }}>
          <button
            onClick={handleToggleRecord}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: isRecording ? '#dc2626' : '#059669',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isRecording ? '0 0 24px rgba(220, 38, 38, 0.6)' : '0 10px 20px rgba(5, 150, 105, 0.3)',
              transition: 'all 0.2s ease',
              marginBottom: '12px',
              border: '4px solid #ffffff'
            }}
          >
            {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
          </button>

          <span style={{
            fontSize: '13px',
            fontWeight: '600',
            color: isRecording ? '#dc2626' : '#0f172a'
          }}>
            {isRecording ? '🔴 Listening... Click to Pause' : 'Tap to Start Speaking'}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', textAlign: 'center', padding: '0 16px' }}>
            {statusMessage}
          </span>
        </div>

        {/* Live Transcript Display */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', display: 'block' }}>
            Spoken Transcript (बोले गए शब्द):
          </label>
          <div style={{
            minHeight: '60px',
            padding: '12px',
            borderRadius: '12px',
            background: '#f1f5f9',
            fontSize: '14px',
            color: transcript ? '#0f172a' : '#94a3b8',
            fontStyle: transcript ? 'normal' : 'italic',
            border: '1px solid #e2e8f0'
          }}>
            {transcript || 'Symptoms will appear here as you speak in any language...'}
          </div>
        </div>

        {/* Detected Symptoms Chips with Localized Names */}
        {detectedSymptomIds.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#047857', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} color="#059669" />
              <span>Extracted Symptoms ({detectedSymptomIds.length}):</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {detectedSymptomIds.map(id => {
                const s = SYMPTOMS_CATALOG.find(item => item.id === id);
                const locName = s ? getLocalizedSymptomName(s, currentLanguage) : id;
                return (
                  <span
                    key={id}
                    style={{
                      background: '#ecfdf5',
                      color: '#065f46',
                      border: '1px solid #a7f3d0',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Check size={12} /> {locName}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Multilingual Sample Voice Phrases */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
            Or Click a Simulated Regional Patient Case:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {SAMPLE_VOICE_SNIPPETS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(sample)}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
              >
                <span><strong>{sample.label}:</strong> "{sample.text}"</span>
                <Volume2 size={14} color="#059669" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              background: '#f1f5f9',
              color: '#475569',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={detectedSymptomIds.length === 0 && !transcript}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: detectedSymptomIds.length > 0 ? '#059669' : '#cbd5e1',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: detectedSymptomIds.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            <Check size={16} /> Apply to Triage Form
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, Sparkles, Globe } from 'lucide-react';
import { speechService } from '../services/speechService';
import { VOICE_PROMPTS } from '../services/voiceAssistant';
import { SUPPORTED_LANGUAGES, getTranslation } from '../services/i18n';

export function VoicePromptBanner({
  language = 'hi-IN',
  onLanguageChange,
  currentStep = 'welcome',
  onOpenVoiceModal
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const langKey = language.split('-')[0] || 'hi';
  const promptText = VOICE_PROMPTS[langKey]?.[currentStep] || VOICE_PROMPTS.hi[currentStep] || VOICE_PROMPTS.en[currentStep];

  const t = (key) => getTranslation(key, language);

  const handleSpeak = () => {
    if (isPlaying) {
      speechService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speechService.speak(promptText, language);
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
      color: '#ffffff',
      padding: '14px 20px',
      borderRadius: '16px',
      marginBottom: '20px',
      boxShadow: '0 4px 14px rgba(4, 120, 87, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      {/* Voice prompt guidance */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 320px' }}>
        <button
          onClick={handleSpeak}
          title={t('listenInstruction')}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: isPlaying ? '#ef4444' : 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.4)',
            transition: 'all 0.2s'
          }}
        >
          {isPlaying ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse-glow" />}
        </button>

        <div>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: '#a7f3d0',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={13} color="#fde047" />
            <span>{t('voiceAssistance')}</span>
          </div>
          <p style={{
            fontSize: '14px',
            margin: '2px 0 0 0',
            color: '#ffffff',
            fontWeight: '500',
            lineHeight: '1.4'
          }}>
            {promptText}
          </p>
        </div>
      </div>

      {/* Voice controls & Language selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Language selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0,0,0,0.25)',
          padding: '4px 10px',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <Globe size={14} color="#a7f3d0" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} style={{ color: '#0f172a', background: '#ffffff' }}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Speak symptoms button */}
        <button
          onClick={onOpenVoiceModal}
          style={{
            background: '#f59e0b',
            color: '#78350f',
            padding: '8px 16px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'transform 0.1s ease',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Mic size={16} />
          <span>{t('speakSymptomsBtn')}</span>
        </button>
      </div>
    </div>
  );
}

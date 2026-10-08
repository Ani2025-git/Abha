import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Volume2,
  VolumeX,
  Save,
  X,
  ShieldAlert,
  Info,
  QrCode,
  Printer,
  Check
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { speechService } from '../services/speechService';
import { VOICE_PROMPTS } from '../services/voiceAssistant';
import { getTranslation } from '../services/i18n';

export function TriageResultModal({
  isOpen,
  onClose,
  assessment,
  patient,
  vitals,
  symptoms,
  onSaveToQueue,
  currentLanguage = 'hi-IN'
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showReferralSlip, setShowReferralSlip] = useState(false);

  if (!isOpen || !assessment) return null;

  const t = (key) => getTranslation(key, currentLanguage);

  const { urgency, urgencyLabel, topConditions, dangerSignsDetected, cdssActions, featureExplanations, inferenceLatencyMs } = assessment;

  const isEmergency = urgency === 'RED';
  const isUrgent = urgency === 'YELLOW';
  const isRoutine = urgency === 'GREEN';

  const themeColor = isEmergency ? '#dc2626' : isUrgent ? '#d97706' : '#059669';
  const themeBgLight = isEmergency ? '#fef2f2' : isUrgent ? '#fffbeb' : '#ecfdf5';
  const themeBorder = isEmergency ? '#fca5a5' : isUrgent ? '#fde68a' : '#a7f3d0';

  const langKey = currentLanguage.split('-')[0] || 'hi';

  const handleSpeakResults = () => {
    if (isPlayingAudio) {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      let textToRead = '';
      if (isEmergency) {
        textToRead = `${VOICE_PROMPTS[langKey]?.redEmergency || VOICE_PROMPTS.hi.redEmergency}. ${cdssActions.slice(0, 2).join('. ')}`;
      } else if (isUrgent) {
        textToRead = `${VOICE_PROMPTS[langKey]?.yellowUrgent || VOICE_PROMPTS.hi.yellowUrgent}. ${cdssActions.slice(0, 2).join('. ')}`;
      } else {
        textToRead = `${VOICE_PROMPTS[langKey]?.greenRoutine || VOICE_PROMPTS.hi.greenRoutine}. ${cdssActions.slice(0, 2).join('. ')}`;
      }

      speechService.speak(textToRead, currentLanguage);
      setTimeout(() => setIsPlayingAudio(false), 8000);
    }
  };

  const handleSave = async () => {
    setIsSaved(true);
    await onSaveToQueue();
  };

  // Referral QR Code payload
  const referralQrPayload = JSON.stringify({
    platform: 'AarogyaSangini',
    type: 'EMERGENCY_REFERRAL_SLIP',
    urgency,
    patientName: patient?.name,
    age: patient?.age,
    gender: patient?.gender,
    village: patient?.village,
    abhaId: patient?.abhaId,
    vitals: {
      tempF: vitals?.tempF,
      pulse: vitals?.pulse,
      bp: `${vitals?.bpSystolic}/${vitals?.bpDiastolic}`,
      spo2: vitals?.spo2,
      respRate: vitals?.respRate,
      muac: vitals?.muac
    },
    dangerSigns: dangerSignsDetected,
    primaryRisk: topConditions?.[0]?.name,
    actionsGiven: cdssActions.slice(0, 2),
    timestamp: new Date().toISOString()
  });

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        overflowY: 'auto'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          border: `2px solid ${themeColor}`,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Urgency Banner Header */}
          <div style={{
            background: themeColor,
            color: '#ffffff',
            padding: '20px 24px',
            borderTopLeftRadius: '22px',
            borderTopRightRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                color: themeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}>
                {isEmergency && <ShieldAlert size={28} className="animate-pulse-glow" />}
                {isUrgent && <AlertTriangle size={28} />}
                {isRoutine && <CheckCircle2 size={28} />}
              </div>
              <div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  opacity: 0.9
                }}>
                  {t('aiAssessmentTitle')}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '2px 0 0 0', color: '#ffffff' }}>
                  {urgencyLabel}
                </h2>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleSpeakResults}
                title="Speak triage results aloud"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isPlayingAudio ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Metadata pill bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: '700' }}>
                <Cpu size={14} />
                <span>Quantized Neural Model: {inferenceLatencyMs || 11}ms Edge Inference</span>
              </div>
              <div style={{ color: '#64748b' }}>
                Patient: <strong>{patient?.name}</strong> ({patient?.age}y / {patient?.gender}) • {patient?.village}
              </div>
            </div>

            {/* Danger Signs Alert Box if RED */}
            {dangerSignsDetected?.length > 0 && (
              <div style={{
                background: themeBgLight,
                border: `1px solid ${themeBorder}`,
                borderRadius: '14px',
                padding: '16px'
              }}>
                <h4 style={{
                  color: themeColor,
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}>
                  <AlertTriangle size={16} /> {t('dangerSignsTitle')}
                </h4>
                <ul style={{ margin: '0 0 0 18px', color: '#334155', fontSize: '13px', lineHeight: '1.6' }}>
                  {dangerSignsDetected.map((sign, i) => (
                    <li key={i} style={{ fontWeight: '600' }}>{sign}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Multi-Disease Probability Breakdown */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
                {t('diseaseDistribution')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {topConditions.map((cond, i) => (
                  <div key={i} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>{cond.name}</span>
                      <span style={{
                        fontWeight: '700',
                        color: cond.probability >= 70 ? '#dc2626' : cond.probability >= 40 ? '#d97706' : '#059669'
                      }}>
                        {cond.probability}% Probability
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${cond.probability}%`,
                        background: cond.probability >= 70 ? '#dc2626' : cond.probability >= 40 ? '#d97706' : '#059669',
                        borderRadius: '999px',
                        transition: 'width 0.6s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Decision Support (CDSS) Immediate Actions */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '14px',
              padding: '16px'
            }}>
              <h4 style={{
                color: '#065f46',
                fontSize: '14px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '10px'
              }}>
                <CheckCircle2 size={16} /> {t('protocolActionsTitle')}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cdssActions.map((action, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#166534',
                    background: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #dcfce7'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '700',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {i + 1}
                    </div>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explainable AI (XAI) Feature Importance */}
            {featureExplanations?.length > 0 && (
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  <Info size={14} color="#0284c7" />
                  <span>{t('xaiAttribution')}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {featureExplanations.map((exp, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>{exp.factor}</strong> ({exp.impact}): {exp.detail}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div style={{
            padding: '16px 24px',
            background: '#f8fafc',
            borderBottomLeftRadius: '22px',
            borderBottomRightRadius: '22px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
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
              {t('closeBtn')}
            </button>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* Emergency Referral QR Slip Button */}
              <button
                onClick={() => setShowReferralSlip(true)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: '#fef3c7',
                  color: '#92400e',
                  border: '1.5px solid #fde68a',
                  fontSize: '13px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <QrCode size={16} color="#d97706" />
                <span>Referral QR Slip</span>
              </button>

              <button
                onClick={handleSave}
                disabled={isSaved}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: isSaved ? '#94a3b8' : '#059669',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSaved ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.3)',
                  cursor: isSaved ? 'default' : 'pointer'
                }}
              >
                <Save size={16} />
                <span>{isSaved ? t('savedToQueueBtn') : t('saveToQueueBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Referral Slip QR Modal */}
      {showReferralSlip && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '480px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            border: `2px solid ${themeColor}`
          }}>
            <div style={{
              background: themeColor,
              color: '#ffffff',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>
                  Emergency Medical Handshake
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '2px 0 0 0' }}>
                  Digital Referral Slip & QR Code
                </h3>
              </div>
              <button
                onClick={() => setShowReferralSlip(false)}
                style={{ color: '#ffffff', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Scannable Vector Referral QR */}
              <div style={{
                background: '#ffffff',
                border: `2px solid ${themeColor}`,
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                <QRCodeSVG
                  value={referralQrPayload}
                  size={190}
                  level="H"
                  includeMargin={true}
                />
                <span style={{ fontSize: '11px', color: themeColor, fontWeight: '800', marginTop: '6px' }}>
                  ✓ Scannable by Emergency ER / 108 Ambulance
                </span>
              </div>

              {/* Patient and Referral Summary */}
              <div style={{ width: '100%', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong>Patient:</strong>
                  <span>{patient?.name} ({patient?.age}y / {patient?.gender})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong>Village:</strong>
                  <span>{patient?.village}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong>Urgency:</strong>
                  <span style={{ color: themeColor, fontWeight: '800' }}>{urgency}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong>Key Vitals:</strong>
                  <span>SpO2: {vitals?.spo2}% • BP: {vitals?.bpSystolic}/{vitals?.bpDiastolic}</span>
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '6px', paddingTop: '6px' }}>
                  <strong>Top Danger Sign:</strong> {dangerSignsDetected?.[0] || 'Urgent evaluation'}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    background: '#f1f5f9',
                    color: '#334155',
                    padding: '10px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Printer size={15} /> Print Slip
                </button>
                <button
                  onClick={() => setShowReferralSlip(false)}
                  style={{
                    flex: 1,
                    background: themeColor,
                    color: '#ffffff',
                    padding: '10px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '13px'
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

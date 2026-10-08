import React, { useState } from 'react';
import {
  Stethoscope,
  AlertTriangle,
  FileCheck,
  Activity,
  Plus,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { db } from '../db/database';

export function DoctorPortal({ triages = [], onRefreshTriages }) {
  const [filterUrgency, setFilterUrgency] = useState('ALL');
  const [selectedTriage, setSelectedTriage] = useState(triages[0] || null);

  // Doctor review form state
  const [doctorNotes, setDoctorNotes] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    { medicine: 'Tab. Paracetamol 500mg', dosage: '1 tab TDS', duration: '3 days', instructions: 'After food' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredTriages = triages.filter(t => {
    if (filterUrgency === 'ALL') return true;
    return t.aiAssessment?.urgency === filterUrgency;
  });

  const handleSelectRecord = (t) => {
    setSelectedTriage(t);
    setSubmitSuccess(false);
    if (t.doctorConsultation?.notes) {
      setDoctorNotes(t.doctorConsultation.notes);
    } else {
      setDoctorNotes('');
    }
    if (t.doctorConsultation?.prescription?.length > 0) {
      setPrescriptions(t.doctorConsultation.prescription);
    } else {
      setPrescriptions([
        { medicine: 'Tab. Paracetamol 500mg', dosage: '1 tab TDS', duration: '3 days', instructions: 'After meals' }
      ]);
    }
  };

  const handleAddMedicine = () => {
    setPrescriptions(prev => [
      ...prev,
      { medicine: '', dosage: '1 tab BD', duration: '5 days', instructions: 'After food' }
    ]);
  };

  const handleRemoveMedicine = (index) => {
    setPrescriptions(prev => prev.filter((_, i) => i !== index));
  };

  const handlePrescriptionChange = (index, field, value) => {
    setPrescriptions(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleSignAndSubmit = async () => {
    if (!selectedTriage) return;
    setIsSubmitting(true);

    try {
      const updatedConsultation = {
        doctorName: 'Dr. Priya Sharma, MBBS, MD',
        doctorRegNo: 'MCI-88234-PHC',
        status: 'reviewed',
        notes: doctorNotes || 'Reviewed teleconsultation triage. Emergency protocol initiated.',
        prescription: prescriptions.filter(p => p.medicine.trim() !== ''),
        reviewedAt: Date.now()
      };

      await db.triageRecords.update(selectedTriage.id, {
        doctorConsultation: updatedConsultation
      });

      setSelectedTriage(prev => ({
        ...prev,
        doctorConsultation: updatedConsultation
      }));

      setSubmitSuccess(true);
      if (onRefreshTriages) onRefreshTriages();
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err) {
      console.error('[DoctorPortal] Error updating prescription:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '24px',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)'
          }}>
            <Stethoscope size={28} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6ee7b7', fontWeight: '800' }}>
              Telemedicine Consultation Hub
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: '2px 0 0 0' }}>
              Primary Health Centre (PHC) Doctor Station
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0' }}>
              Dr. Priya Sharma, MBBS, MD (Chief Medical Officer) • Rampur Block PHC
            </p>
          </div>
        </div>

        {/* Quick summary stats */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#ef4444' }}>
              {triages.filter(t => t.aiAssessment?.urgency === 'RED').length}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>Red Emergencies</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#f59e0b' }}>
              {triages.filter(t => t.aiAssessment?.urgency === 'YELLOW').length}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>Yellow Referrals</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#34d399' }}>
              {triages.length}
            </div>
            <div style={{ fontSize: '11px', color: '#cbd5e1' }}>Total Cases</div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left Column: Triage Referrals Queue */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          maxHeight: '750px',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
              Village Incoming Cases ({filteredTriages.length})
            </h3>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
              {['ALL', 'RED', 'YELLOW', 'GREEN'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterUrgency(f)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    background: filterUrgency === f ? '#0f172a' : 'transparent',
                    color: filterUrgency === f ? '#ffffff' : '#64748b'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List of cases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredTriages.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                No records match the current filter.
              </div>
            ) : (
              filteredTriages.map((t) => {
                const isSelected = selectedTriage?.id === t.id;
                const isEmergency = t.aiAssessment?.urgency === 'RED';
                const isUrgent = t.aiAssessment?.urgency === 'YELLOW';

                return (
                  <div
                    key={t.id}
                    onClick={() => handleSelectRecord(t)}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #059669' : '1px solid #e2e8f0',
                      background: isSelected ? '#ecfdf5' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>
                          {t.patientName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          {t.village} • {t.patientAge}y {t.patientGender}
                        </div>
                      </div>

                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: '800',
                        background: isEmergency ? '#fee2e2' : isUrgent ? '#fef3c7' : '#d1fae5',
                        color: isEmergency ? '#b91c1c' : isUrgent ? '#b45309' : '#047857'
                      }}>
                        {t.aiAssessment?.urgency || 'ROUTINE'}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#334155', fontWeight: '500', marginBottom: '8px' }}>
                      {t.aiAssessment?.topConditions?.[0]?.name || 'Assessment in progress'}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#94a3b8' }}>
                      <span>Vitals: SpO2 {t.vitals?.spo2}% • BP {t.vitals?.bpSystolic}/{t.vitals?.bpDiastolic}</span>
                      <span>{t.doctorConsultation?.status === 'reviewed' ? '✓ Prescribed' : '⏳ Pending Review'}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Case Clinical Review & Tele-Prescription */}
        {selectedTriage ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: '800' }}>
                  Case #{selectedTriage.id} • Village Telemedicine Referral
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '2px 0 0 0' }}>
                  {selectedTriage.patientName}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>
                  Village: {selectedTriage.village} • Age: {selectedTriage.patientAge} • Sync Status: <strong>{selectedTriage.syncStatus}</strong>
                </p>
              </div>

              {selectedTriage.doctorConsultation?.status === 'reviewed' && (
                <div style={{
                  background: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #a7f3d0',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={14} /> Doctor Signed
                </div>
              )}
            </div>

            {/* Vitals Summary Pill Grid */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>
                Field Worker Vitals Recorded:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>TEMP</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: selectedTriage.vitals?.tempF >= 101 ? '#dc2626' : '#0f172a' }}>
                    {selectedTriage.vitals?.tempF}°F
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>PULSE</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                    {selectedTriage.vitals?.pulse} bpm
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>BP</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: selectedTriage.vitals?.bpSystolic >= 140 ? '#dc2626' : '#0f172a' }}>
                    {selectedTriage.vitals?.bpSystolic}/{selectedTriage.vitals?.bpDiastolic}
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>SPO2</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: selectedTriage.vitals?.spo2 < 92 ? '#dc2626' : '#0f172a' }}>
                    {selectedTriage.vitals?.spo2}%
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>RESP</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                    {selectedTriage.vitals?.respRate}/min
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>MUAC</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: selectedTriage.vitals?.muac < 11.5 ? '#dc2626' : '#0f172a' }}>
                    {selectedTriage.vitals?.muac} cm
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Audio Memo / Chief Complaint */}
            {selectedTriage.chiefComplaintVoice && (
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  Patient Spoken Chief Complaint (वाणी रिकॉर्ड):
                </div>
                <div style={{ fontSize: '13px', color: '#1e293b', fontStyle: 'italic' }}>
                  "{selectedTriage.chiefComplaintVoice}"
                </div>
              </div>
            )}

            {/* AI Assessment & Danger Signs */}
            <div style={{
              background: selectedTriage.aiAssessment?.urgency === 'RED' ? '#fef2f2' : '#fffbeb',
              padding: '14px',
              borderRadius: '12px',
              border: `1px solid ${selectedTriage.aiAssessment?.urgency === 'RED' ? '#fecaca' : '#fde68a'}`
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '800',
                color: selectedTriage.aiAssessment?.urgency === 'RED' ? '#b91c1c' : '#b45309',
                marginBottom: '6px'
              }}>
                On-Device AI Assessment: {selectedTriage.aiAssessment?.urgencyLabel}
              </div>
              <ul style={{ margin: '0 0 0 16px', fontSize: '12px', color: '#334155' }}>
                {selectedTriage.aiAssessment?.dangerSignsDetected?.map((d, i) => (
                  <li key={i}><strong>Danger Sign:</strong> {d}</li>
                ))}
              </ul>
            </div>

            {/* Doctor Clinical Notes */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px', display: 'block' }}>
                Doctor Clinical Review & Instructions:
              </label>
              <textarea
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                placeholder="Enter clinical examination review, diagnostic advice, or referral transport instructions..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>

            {/* Prescription Form */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                  Rx: Prescribed Medicines & Dosage:
                </label>
                <button
                  onClick={handleAddMedicine}
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={14} /> Add Medicine
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {prescriptions.map((p, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 28px', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Medicine name"
                      value={p.medicine}
                      onChange={(e) => handlePrescriptionChange(idx, 'medicine', e.target.value)}
                      style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 1 TDS)"
                      value={p.dosage}
                      onChange={(e) => handlePrescriptionChange(idx, 'dosage', e.target.value)}
                      style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={p.duration}
                      onChange={(e) => handlePrescriptionChange(idx, 'duration', e.target.value)}
                      style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                    />
                    <button
                      onClick={() => handleRemoveMedicine(idx)}
                      style={{ color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
              {submitSuccess && (
                <span style={{ fontSize: '13px', color: '#059669', fontWeight: '700' }}>
                  ✓ Prescription Signed & Synced to Village Health Record!
                </span>
              )}

              <button
                onClick={handleSignAndSubmit}
                disabled={isSubmitting}
                style={{
                  background: '#059669',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                <FileCheck size={16} />
                <span>{isSubmitting ? 'Submitting...' : 'Sign & Transmit Digital Prescription'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
            Select a village triage case from the left queue to review and issue prescriptions.
          </div>
        )}
      </div>
    </div>
  );
}

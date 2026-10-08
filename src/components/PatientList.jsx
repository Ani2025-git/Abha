import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  QrCode,
  ScanLine,
  Heart,
  Baby,
  Activity,
  Calendar,
  Phone,
  MapPin,
  Check,
  X,
  Stethoscope,
  Printer,
  Copy,
  Camera,
  Upload,
  Sparkles
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import jsQR from 'jsqr';
import { db } from '../db/database';

export function PatientList({ patients = [], onSelectForTriage, onRefreshPatients, currentLanguage = 'hi-IN' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedPatientForCard, setSelectedPatientForCard] = useState(null);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [copiedAbha, setCopiedAbha] = useState(false);

  // Scanner state
  const [scannerStatus, setScannerStatus] = useState('Ready to scan');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // New Patient Form
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'female',
    village: 'Rampur Kalan',
    phone: '',
    isPregnant: false,
    trimester: 1,
    isChildUnder5: false,
    bloodGroup: 'B+'
  });

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.village && p.village.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.abhaId && p.abhaId.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'PREGNANT') return p.isPregnant;
    if (filterType === 'CHILD') return p.isChildUnder5;
    return true;
  });

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    if (!newPatient.name) return;

    // Generate random standard ABHA-format ID
    const randomAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const ageNum = parseInt(newPatient.age, 10) || 25;
    const isChild = ageNum <= 5 || newPatient.isChildUnder5;

    await db.patients.add({
      abhaId: randomAbha,
      name: newPatient.name,
      age: ageNum,
      gender: newPatient.gender,
      village: newPatient.village,
      phone: newPatient.phone || '+91 98000 00000',
      isPregnant: !!newPatient.isPregnant,
      trimester: newPatient.isPregnant ? parseInt(newPatient.trimester, 10) : 0,
      isChildUnder5: isChild,
      bloodGroup: newPatient.bloodGroup,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    setIsNewPatientModalOpen(false);
    setNewPatient({
      name: '',
      age: '',
      gender: 'female',
      village: 'Rampur Kalan',
      phone: '',
      isPregnant: false,
      trimester: 1,
      isChildUnder5: false,
      bloodGroup: 'B+'
    });

    if (onRefreshPatients) onRefreshPatients();
  };

  // Camera QR Scanner logic using jsQR
  const startCamera = async () => {
    try {
      setScannerStatus('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        videoRef.current.play();
        setIsCameraActive(true);
        setScannerStatus('Align QR code in center of camera view...');
        animFrameIdRef.current = requestAnimationFrame(scanFrame);
      }
    } catch (err) {
      console.warn('[QR Scanner Camera Error]:', err);
      setIsCameraActive(false);
      setScannerStatus('Camera not accessible or denied. Use demo simulation below!');
    }
  };

  const stopCamera = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const scanFrame = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code.data) {
        handleProcessDecodedQr(code.data);
        stopCamera();
        return;
      }
    }
    animFrameIdRef.current = requestAnimationFrame(scanFrame);
  };

  useEffect(() => {
    if (!isQrScannerOpen) {
      stopCamera();
      setScannedResult(null);
    }
  }, [isQrScannerOpen]);

  const handleProcessDecodedQr = (rawData) => {
    try {
      let parsed = null;
      if (rawData.startsWith('{')) {
        parsed = JSON.parse(rawData);
      }

      const abha = parsed?.abha || parsed?.abhaId || (rawData.match(/91-\d{4}-\d{4}-\d{4}/)?.[0]);
      const matched = patients.find(p => p.abhaId === abha || (parsed?.name && p.name.toLowerCase() === parsed.name.toLowerCase()));

      setScannedResult({
        rawData,
        matchedPatient: matched,
        abha: abha || 'Unknown ABHA'
      });
      setScannerStatus('✓ QR Code successfully scanned and decoded!');
    } catch (err) {
      setScannedResult({
        rawData,
        matchedPatient: null,
        abha: rawData
      });
      setScannerStatus('Decoded raw text: ' + rawData);
    }
  };

  // Simulated scan for instant demo testing
  const handleSimulateScan = (patient) => {
    const payload = JSON.stringify({
      platform: 'AarogyaSangini',
      abha: patient.abhaId,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      village: patient.village,
      blood: patient.bloodGroup || 'O+',
      category: patient.isPregnant ? 'Pregnant' : patient.isChildUnder5 ? 'Child<5' : 'General'
    });
    handleProcessDecodedQr(payload);
  };

  const handleCopyAbha = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedAbha(true);
    setTimeout(() => setCopiedAbha(false), 2000);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Search & Actions Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f8fafc',
          padding: '8px 14px',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
          flex: '1 1 280px'
        }}>
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search patient name, ABHA ID, or village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '13px',
              width: '100%',
              color: '#0f172a'
            }}
          />
        </div>

        {/* Filter tags & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
            <button
              onClick={() => setFilterType('ALL')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                background: filterType === 'ALL' ? '#0f172a' : 'transparent',
                color: filterType === 'ALL' ? '#ffffff' : '#64748b'
              }}
            >
              All ({patients.length})
            </button>
            <button
              onClick={() => setFilterType('PREGNANT')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                background: filterType === 'PREGNANT' ? '#db2777' : 'transparent',
                color: filterType === 'PREGNANT' ? '#ffffff' : '#64748b'
              }}
            >
              Pregnant 🤰
            </button>
            <button
              onClick={() => setFilterType('CHILD')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                background: filterType === 'CHILD' ? '#0284c7' : 'transparent',
                color: filterType === 'CHILD' ? '#ffffff' : '#64748b'
              }}
            >
              Children Under 5 👶
            </button>
          </div>

          {/* Scan QR Button */}
          <button
            onClick={() => setIsQrScannerOpen(true)}
            style={{
              background: '#047857',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(4, 120, 87, 0.25)'
            }}
          >
            <ScanLine size={16} /> Scan Patient QR
          </button>

          {/* Add New Resident Button */}
          <button
            onClick={() => setIsNewPatientModalOpen(true)}
            style={{
              background: '#059669',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
            }}
          >
            <Plus size={16} /> Register New Resident
          </button>
        </div>
      </div>

      {/* Patient Directory Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredPatients.map(p => (
          <div
            key={p.id}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '18px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {p.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {p.age} years • {p.gender} • Blood: {p.bloodGroup || 'O+'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  {p.isPregnant && (
                    <span style={{ background: '#fdf2f8', color: '#db2777', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>
                      🤰 Trimester {p.trimester}
                    </span>
                  )}
                  {p.isChildUnder5 && (
                    <span style={{ background: '#f0f9ff', color: '#0284c7', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>
                      👶 Child &lt;5
                    </span>
                  )}
                </div>
              </div>

              {/* Village & Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="#059669" />
                  <span>Village: <strong>{p.village}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={13} color="#64748b" />
                  <span>{p.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7' }}>
                  <Activity size={13} />
                  <span>ABHA: <strong>{p.abhaId || '91-8472-1092-3841'}</strong></span>
                </div>
              </div>
            </div>

            {/* Actions: View ABHA Card / Start Triage */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
              <button
                onClick={() => setSelectedPatientForCard(p)}
                style={{
                  flex: 1,
                  background: '#f8fafc',
                  color: '#065f46',
                  border: '1.5px solid #a7f3d0',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <QrCode size={14} color="#059669" /> View ABHA QR Card
              </button>

              <button
                onClick={() => onSelectForTriage(p.id)}
                style={{
                  flex: 1.2,
                  background: '#059669',
                  color: '#ffffff',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
                }}
              >
                <Stethoscope size={14} /> Start Checkup
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ABHA Digital Health Card Modal (REAL SCANNABLE QR CODE) */}
      {selectedPatientForCard && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
            maxWidth: '460px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            border: '2px solid #059669'
          }}>
            {/* Health Card Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
              color: '#ffffff',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85 }}>
                  National Health Authority • Ayushman Bharat Digital Mission
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '2px 0 0 0' }}>
                  ABHA Digital Health Card
                </h3>
              </div>
              <button
                onClick={() => setSelectedPatientForCard(null)}
                style={{ color: '#ffffff', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Genuine Scannable Vector QR Code */}
              <div style={{
                background: '#ffffff',
                border: '2px solid #059669',
                borderRadius: '20px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(5, 150, 105, 0.15)'
              }}>
                <QRCodeSVG
                  value={JSON.stringify({
                    platform: 'AarogyaSangini',
                    type: 'ABHA_HEALTH_CARD',
                    abha: selectedPatientForCard.abhaId,
                    name: selectedPatientForCard.name,
                    age: selectedPatientForCard.age,
                    gender: selectedPatientForCard.gender,
                    village: selectedPatientForCard.village,
                    phone: selectedPatientForCard.phone,
                    blood: selectedPatientForCard.bloodGroup || 'O+',
                    isPregnant: !!selectedPatientForCard.isPregnant,
                    isChildUnder5: !!selectedPatientForCard.isChildUnder5
                  })}
                  size={190}
                  level="H"
                  includeMargin={true}
                />
                <div style={{
                  fontSize: '11px',
                  color: '#065f46',
                  fontWeight: '800',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Check size={14} color="#059669" />
                  <span>100% Scannable with any Camera / QR App</span>
                </div>
              </div>

              {/* Patient Info */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                  {selectedPatientForCard.name}
                </h3>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #a7f3d0',
                  padding: '4px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: '800',
                  letterSpacing: '0.5px'
                }}>
                  <span>{selectedPatientForCard.abhaId || '91-8472-1092-3841'}</span>
                  <button
                    onClick={() => handleCopyAbha(selectedPatientForCard.abhaId)}
                    style={{ color: '#059669', display: 'flex', alignItems: 'center' }}
                    title="Copy ABHA ID"
                  >
                    {copiedAbha ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                  </button>
                </div>

                <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', textAlign: 'left', background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
                  <div><strong>Age / Gender:</strong> {selectedPatientForCard.age}y / {selectedPatientForCard.gender}</div>
                  <div><strong>Blood Group:</strong> {selectedPatientForCard.bloodGroup || 'B+'}</div>
                  <div><strong>Village:</strong> {selectedPatientForCard.village}</div>
                  <div><strong>Status:</strong> {selectedPatientForCard.isPregnant ? 'Pregnant (Trimester ' + selectedPatientForCard.trimester + ')' : selectedPatientForCard.isChildUnder5 ? 'Child < 5y' : 'General Resident'}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button
                  onClick={handlePrintCard}
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
                  <Printer size={15} /> Print Card
                </button>
                <button
                  onClick={() => setSelectedPatientForCard(null)}
                  style={{
                    flex: 1,
                    background: '#059669',
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

      {/* QR Code Scanner & Decoded Patient Modal */}
      {isQrScannerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
            maxWidth: '520px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            border: '1px solid #e2e8f0',
            maxHeight: '92vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ScanLine size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    Scan ABHA Health QR Code
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                    Instant offline patient identification
                  </p>
                </div>
              </div>
              <button onClick={() => setIsQrScannerOpen(false)} style={{ color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            {/* Video Viewport / Scanner Camera */}
            <div style={{
              position: 'relative',
              background: '#0f172a',
              borderRadius: '16px',
              overflow: 'hidden',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              border: '2px dashed #059669'
            }}>
              <video
                ref={videoRef}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: isCameraActive ? 'block' : 'none' }}
              />

              {!isCameraActive && (
                <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '20px' }}>
                  <Camera size={44} color="#34d399" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '14px', fontWeight: '700' }}>Camera Scanner Ready</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 12px 0' }}>
                    Point camera at patient's printed ABHA card or phone
                  </div>
                  <button
                    onClick={startCamera}
                    style={{
                      background: '#059669',
                      color: '#ffffff',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)'
                    }}
                  >
                    Start Camera Stream
                  </button>
                </div>
              )}

              {isCameraActive && (
                <button
                  onClick={stopCamera}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}
                >
                  Stop Camera
                </button>
              )}
            </div>

            <div style={{ fontSize: '12px', color: '#475569', textAlign: 'center', marginBottom: '14px', fontWeight: '500' }}>
              {scannerStatus}
            </div>

            {/* Decoded Result Box */}
            {scannedResult && (
              <div style={{
                background: '#ecfdf5',
                border: '1.5px solid #a7f3d0',
                borderRadius: '14px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: '800', fontSize: '13px', marginBottom: '8px' }}>
                  <Check size={16} color="#059669" />
                  <span>Decoded Patient Record:</span>
                </div>

                {scannedResult.matchedPatient ? (
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                      {scannedResult.matchedPatient.name}
                    </h4>
                    <div style={{ fontSize: '12px', color: '#475569' }}>
                      ABHA ID: <strong>{scannedResult.matchedPatient.abhaId}</strong> • Village: {scannedResult.matchedPatient.village}
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                      Age: {scannedResult.matchedPatient.age}y • Gender: {scannedResult.matchedPatient.gender} • Blood: {scannedResult.matchedPatient.bloodGroup || 'O+'}
                    </div>

                    <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setIsQrScannerOpen(false);
                          onSelectForTriage(scannedResult.matchedPatient.id);
                        }}
                        style={{
                          background: '#059669',
                          color: '#ffffff',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Stethoscope size={14} /> Start Checkup for this Patient
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '12px', color: '#334155', wordBreak: 'break-all' }}>
                      {scannedResult.rawData}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quick Demo Scan Simulation */}
            <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} color="#f59e0b" />
                <span>One-Click Test Scan Simulation (बिना कैमरे के तुरंत टेस्ट करें):</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {patients.slice(0, 3).map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSimulateScan(p)}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#0f172a'
                    }}
                  >
                    Simulate: {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                onClick={() => setIsQrScannerOpen(false)}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#f1f5f9', color: '#475569', fontSize: '12px', fontWeight: '600' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Patient Registration Modal */}
      {isNewPatientModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
            maxWidth: '520px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                Register Village Resident (नया पंजीकरण)
              </h3>
              <button
                onClick={() => setIsNewPatientModalOpen(false)}
                style={{ color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Full Name (नाम): *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Geeta Devi / Aarav"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Age (उम्र): *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 24 or 3"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Gender (लिंग):
                  </label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  >
                    <option value="female">Female (महिला)</option>
                    <option value="male">Male (पुरुष)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Village (गांव):
                  </label>
                  <input
                    type="text"
                    value={newPatient.village}
                    onChange={(e) => setNewPatient({ ...newPatient, village: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Phone (मोबाइल):
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Special Risk Flags */}
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                  <input
                    type="checkbox"
                    checked={newPatient.isPregnant}
                    onChange={(e) => setNewPatient({ ...newPatient, isPregnant: e.target.checked })}
                  />
                  <span>Pregnant Mother (गर्भवती महिला) 🤰</span>
                </label>

                {newPatient.isPregnant && (
                  <div style={{ paddingLeft: '24px' }}>
                    <label style={{ fontSize: '11px', color: '#64748b' }}>Trimester (तिमाही): </label>
                    <select
                      value={newPatient.trimester}
                      onChange={(e) => setNewPatient({ ...newPatient, trimester: e.target.value })}
                      style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                    >
                      <option value="1">1st Trimester (1-3 months)</option>
                      <option value="2">2nd Trimester (4-6 months)</option>
                      <option value="3">3rd Trimester (7-9 months)</option>
                    </select>
                  </div>
                )}

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                  <input
                    type="checkbox"
                    checked={newPatient.isChildUnder5}
                    onChange={(e) => setNewPatient({ ...newPatient, isChildUnder5: e.target.checked })}
                  />
                  <span>Child Under 5 Years (5 वर्ष से कम आयु का बच्चा) 👶</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsNewPatientModalOpen(false)}
                  style={{ padding: '10px 16px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', fontSize: '13px', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 20px', borderRadius: '10px', background: '#059669', color: '#ffffff', fontSize: '13px', fontWeight: '700' }}
                >
                  Save to Local IndexedDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

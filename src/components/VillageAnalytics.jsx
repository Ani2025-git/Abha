import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  MapPin,
  Flame,
  ShieldCheck,
  Droplets,
  Activity,
  Heart,
  Baby,
  Users
} from 'lucide-react';

export function VillageAnalytics({ triages = [], patients = [] }) {
  // Aggregate statistics
  const redCount = triages.filter(t => t.aiAssessment?.urgency === 'RED').length;
  const yellowCount = triages.filter(t => t.aiAssessment?.urgency === 'YELLOW').length;
  const greenCount = triages.filter(t => t.aiAssessment?.urgency === 'GREEN').length;

  const pregnantCount = patients.filter(p => p.isPregnant).length;
  const childrenUnder5Count = patients.filter(p => p.isChildUnder5).length;

  // Village cluster counts
  const villageStats = {};
  triages.forEach(t => {
    const v = t.village || 'Unknown Village';
    if (!villageStats[v]) {
      villageStats[v] = { total: 0, red: 0, fever: 0, respiratory: 0, gastro: 0 };
    }
    villageStats[v].total++;
    if (t.aiAssessment?.urgency === 'RED') villageStats[v].red++;
    if (t.symptoms?.includes('high_fever')) villageStats[v].fever++;
    if (t.symptoms?.includes('chest_indrawing') || t.symptoms?.includes('fast_breathing')) villageStats[v].respiratory++;
    if (t.symptoms?.includes('watery_diarrhea') || t.symptoms?.includes('vomiting')) villageStats[v].gastro++;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #047857 0%, #064e3b 100%)',
        color: '#ffffff',
        padding: '22px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#a7f3d0', fontWeight: '800' }}>
            Integrated Disease Surveillance Programme (IDSP)
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '2px 0 0 0', color: '#ffffff' }}>
            Village Syndromic Surveillance & Outbreak Radar
          </h2>
          <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '2px 0 0 0' }}>
            Offline-generated epidemic alert vectors aggregated across Rampur Sub-Centre jurisdiction
          </p>
        </div>

        {/* Real-time Outbreak Flags */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid #ef4444',
          borderRadius: '12px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Flame size={22} color="#fca5a5" className="animate-pulse-glow" />
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#fee2e2' }}>
              EARLY OUTBREAK DETECTED
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
              Cluster of Febrile Cases in Sonbarsa (Malaria/Dengue Risk)
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div style={{ background: '#ffffff', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#dc2626', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Critical (Red)</span>
            <AlertTriangle size={18} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#dc2626' }}>{redCount}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Immediate 108 Ambulance referrals</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#d97706', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Urgent (Yellow)</span>
            <Activity size={18} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#d97706' }}>{yellowCount}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>PHC Teleconsultation &lt;24h</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#db2777', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>High Risk Maternal</span>
            <Heart size={18} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#db2777' }}>{pregnantCount}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Registered pregnant mothers</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#0284c7', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Under 5 Nutrition</span>
            <Baby size={18} />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0284c7' }}>{childrenUnder5Count}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Children monitored with MUAC</div>
        </div>
      </div>

      {/* Village Cluster Breakdown */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
          Village Syndromic Outbreak Cluster Density
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {Object.entries(villageStats).map(([village, stats]) => (
            <div
              key={village}
              style={{
                background: '#f8fafc',
                borderRadius: '14px',
                padding: '16px',
                border: stats.fever >= 2 || stats.red >= 1 ? '1px solid #fca5a5' : '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} color="#059669" />
                  <span style={{ fontWeight: '800', fontSize: '15px', color: '#0f172a' }}>{village}</span>
                </div>
                <span style={{
                  background: stats.red > 0 ? '#fee2e2' : '#ecfdf5',
                  color: stats.red > 0 ? '#dc2626' : '#059669',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {stats.total} Checkups
                </span>
              </div>

              {/* Symptom bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', color: '#475569' }}>
                    <span>Febrile / High Fever</span>
                    <strong style={{ color: '#d97706' }}>{stats.fever} cases</strong>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, stats.fever * 33)}%`, background: '#f59e0b' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', color: '#475569' }}>
                    <span>Acute Respiratory / Pneumonia</span>
                    <strong style={{ color: '#dc2626' }}>{stats.respiratory} cases</strong>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, stats.respiratory * 40)}%`, background: '#ef4444' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', color: '#475569' }}>
                    <span>Diarrhea / Dehydration</span>
                    <strong style={{ color: '#0284c7' }}>{stats.gastro} cases</strong>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, stats.gastro * 50)}%`, background: '#0284c7' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import {
  Stethoscope,
  Activity,
  Users,
  BarChart3,
  Database,
  Globe
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, getTranslation } from '../services/i18n';

export function Navbar({
  activeTab,
  onTabChange,
  pendingSyncCount,
  onOpenSyncQueue,
  currentLanguage,
  onLanguageChange
}) {
  const t = (key) => getTranslation(key, currentLanguage);

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/arogyasync_logo.png"
            alt="AarogyaSangini Logo"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#064e3b', margin: 0, letterSpacing: '-0.3px' }}>
                AarogyaSangini
              </h1>
              <span style={{
                background: '#ecfdf5',
                color: '#059669',
                border: '1px solid #a7f3d0',
                fontSize: '10px',
                fontWeight: '800',
                padding: '1px 6px',
                borderRadius: '6px'
              }}>
                PWA OFFLINE
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>
              AI Symptom Triage & Telemedicine for ASHA / Anganwadi
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs with localized labels */}
        <nav style={{
          display: 'flex',
          gap: '4px',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px'
        }}>
          <button
            onClick={() => onTabChange('triage')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === 'triage' ? '#ffffff' : 'transparent',
              color: activeTab === 'triage' ? '#059669' : '#64748b',
              boxShadow: activeTab === 'triage' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Stethoscope size={16} />
            <span>{t('fieldTriage')}</span>
          </button>

          <button
            onClick={() => onTabChange('doctor')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === 'doctor' ? '#ffffff' : 'transparent',
              color: activeTab === 'doctor' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'doctor' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Activity size={16} />
            <span>{t('phcDoctor')}</span>
          </button>

          <button
            onClick={() => onTabChange('analytics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === 'analytics' ? '#ffffff' : 'transparent',
              color: activeTab === 'analytics' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'analytics' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <BarChart3 size={16} />
            <span>{t('outbreakRadar')}</span>
          </button>

          <button
            onClick={() => onTabChange('patients')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === 'patients' ? '#ffffff' : 'transparent',
              color: activeTab === 'patients' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'patients' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={16} />
            <span>{t('residents')}</span>
          </button>
        </nav>

        {/* Right Tools: Global Language Switcher + Sync Queue + Worker Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Prominent Global Language Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            padding: '5px 10px',
            borderRadius: '10px'
          }}>
            <Globe size={15} color="#059669" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#065f46',
                fontSize: '12px',
                fontWeight: '700',
                outline: 'none',
                cursor: 'pointer'
              }}
              title="Select Application Language (भाषा चुनें)"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} style={{ color: '#0f172a', background: '#ffffff' }}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sync Queue Button */}
          <button
            onClick={onOpenSyncQueue}
            style={{
              background: pendingSyncCount > 0 ? '#fffbeb' : '#f8fafc',
              border: `1px solid ${pendingSyncCount > 0 ? '#f59e0b' : '#e2e8f0'}`,
              padding: '6px 12px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: '700',
              color: pendingSyncCount > 0 ? '#b45309' : '#475569'
            }}
            title="Inspect IndexedDB sync queue"
          >
            <Database size={15} color={pendingSyncCount > 0 ? '#d97706' : '#64748b'} />
            <span>{t('queue')}</span>
            {pendingSyncCount > 0 && (
              <span style={{
                background: '#d97706',
                color: '#ffffff',
                fontSize: '11px',
                padding: '1px 6px',
                borderRadius: '999px',
                fontWeight: '800'
              }}>
                {pendingSyncCount}
              </span>
            )}
          </button>

          {/* Worker Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            padding: '5px 10px',
            borderRadius: '10px',
            fontSize: '12px'
          }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: '#059669',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '800'
            }}>
              AS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '700', color: '#0f172a', lineHeight: '1.2' }}>Sunita Devi</span>
              <span style={{ fontSize: '10px', color: '#64748b' }}>{t('ashaBadge')}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

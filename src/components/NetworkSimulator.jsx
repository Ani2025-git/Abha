import React from 'react';
import { Wifi, WifiOff, Radio, RefreshCw, Cpu, Database } from 'lucide-react';
import { getTranslation } from '../services/i18n';

export function NetworkSimulator({
  networkMode,
  onModeChange,
  isSyncing,
  onTriggerSync,
  pendingCount,
  currentLanguage = 'hi-IN'
}) {
  const t = (key) => getTranslation(key, currentLanguage);

  return (
    <div style={{
      background: networkMode === 'offline' ? '#1e293b' : networkMode === 'spotty' ? '#78350f' : '#064e3b',
      color: '#ffffff',
      padding: '8px 16px',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      transition: 'background 0.3s ease'
    }}>
      {/* Left: Mode badge & Edge AI indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
          {networkMode === 'offline' && <WifiOff size={16} color="#ef4444" />}
          {networkMode === 'spotty' && <Radio size={16} color="#fbbf24" />}
          {networkMode === 'online' && <Wifi size={16} color="#34d399" />}
          <span>
            {networkMode === 'offline' && t('offlineMode')}
            {networkMode === 'spotty' && t('spottyMode')}
            {networkMode === 'online' && t('onlineMode')}
          </span>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(255,255,255,0.15)',
          padding: '2px 8px',
          borderRadius: '999px',
          fontSize: '11px',
          letterSpacing: '0.2px'
        }}>
          <Cpu size={12} color="#6ee7b7" />
          <span>{t('aiEngineActive')}</span>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(255,255,255,0.15)',
          padding: '2px 8px',
          borderRadius: '999px',
          fontSize: '11px'
        }}>
          <Database size={12} color="#93c5fd" />
          <span>{t('storageActive')}</span>
        </div>
      </div>

      {/* Right: Switcher toggles + Sync Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ opacity: 0.8, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {t('simulateNetwork')}
        </span>
        <div style={{
          display: 'inline-flex',
          background: 'rgba(0,0,0,0.25)',
          padding: '2px',
          borderRadius: '8px'
        }}>
          <button
            onClick={() => onModeChange('offline')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: networkMode === 'offline' ? '#ef4444' : 'transparent',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: networkMode === 'offline' ? '700' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <WifiOff size={12} /> Offline
          </button>
          <button
            onClick={() => onModeChange('spotty')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: networkMode === 'spotty' ? '#d97706' : 'transparent',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: networkMode === 'spotty' ? '700' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Radio size={12} /> Spotty 2G
          </button>
          <button
            onClick={() => onModeChange('online')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: networkMode === 'online' ? '#059669' : 'transparent',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: networkMode === 'online' ? '700' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Wifi size={12} /> Online 4G
          </button>
        </div>

        {/* Sync Trigger button */}
        <button
          onClick={onTriggerSync}
          disabled={networkMode === 'offline' || isSyncing}
          title={networkMode === 'offline' ? 'Switch to Spotty 2G or Online to synchronize' : 'Sync pending records with PHC'}
          style={{
            padding: '5px 12px',
            borderRadius: '8px',
            background: networkMode === 'offline' ? 'rgba(255,255,255,0.1)' : '#ffffff',
            color: networkMode === 'offline' ? '#94a3b8' : '#064e3b',
            fontWeight: '600',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: networkMode === 'offline' ? 0.6 : 1,
            cursor: networkMode === 'offline' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <RefreshCw size={13} className={isSyncing ? 'animate-spin-slow' : ''} />
          {isSyncing ? t('syncing') : `${t('syncNow')} (${pendingCount})`}
        </button>
      </div>
    </div>
  );
}

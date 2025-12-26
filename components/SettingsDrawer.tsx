import React, { useState, useEffect } from 'react';
import { X, Key, Trash2, ExternalLink, Shield, Zap, Download, Upload, Cpu } from 'lucide-react';
import { getFromStorage, saveToStorage, backupData, restoreFromBackup, getStorageStats } from '../services/storageService';
import { AVAILABLE_MODELS } from '../services/geminiService';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose, onClearHistory }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3-flash-preview');
  const [storageStats, setStorageStats] = useState(getStorageStats());

  useEffect(() => {
    if (isOpen) {
      const stored = getFromStorage<{ key: string }>("user_api_key");
      if (stored?.key) {
        // Show masked version
        setApiKey(stored.key.substring(0, 5) + '*'.repeat(Math.max(0, stored.key.length - 10)) + stored.key.substring(stored.key.length - 5));
      } else {
        setApiKey('');
      }
      
      // Get selected model from storage
      const modelConfig = getFromStorage<{ model: string }>("model_config");
      if (modelConfig?.model) {
        setSelectedModel(modelConfig.model);
      }
    }
  }, [isOpen]);

  const handleSaveModel = () => {
    try {
      saveToStorage("model_config", { model: selectedModel });
      alert(`✅ Model switched to ${AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name}!`);
    } catch (err) {
      alert('❌ Failed to save model selection');
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey || apiKey.includes('*')) {
      alert('Please enter a valid API key');
      return;
    }

    try {
      saveToStorage("user_api_key", { key: apiKey });
      alert('✅ API Key saved successfully!');
      setApiKey(apiKey.substring(0, 5) + '*'.repeat(Math.max(0, apiKey.length - 10)) + apiKey.substring(apiKey.length - 5));
      onClose();
    } catch (err) {
      alert('❌ Failed to save API key');
    }
  };

  const handleClearKey = () => {
    if (confirm("Remove stored API key?")) {
      saveToStorage("user_api_key", null);
      setApiKey('');
      alert('API Key removed');
    }
  };

  const handleBackupData = () => {
    try {
      const backup = backupData();
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(backup));
      element.setAttribute('download', `LinkSnap_Backup_${Date.now()}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (err) {
      alert('BACKUP_FAILED');
    }
  };

  const handleRestoreData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        if (restoreFromBackup(text)) {
          alert('RESTORE_SUCCESSFUL. Please refresh the page.');
          window.location.reload();
        } else {
          alert('RESTORE_FAILED: Invalid backup file');
        }
      }
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md h-full glass-nothing border-l border-white/10 animate-in slide-in-from-right duration-500 flex flex-col pt-safe">
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-nt-red rounded-full animate-pulse"></div>
            <h2 className="text-xl font-dot tracking-[0.2em] text-nt-white uppercase">System_Config</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white/40" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12 no-scrollbar">
          {/* Model Selection Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-nt-red" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Model Selection</span>
            </div>
            
            <div className="p-6 border border-white/10 rounded-3xl bg-white/[0.02] space-y-4">
              <p className="text-[11px] font-medium text-white/60 leading-relaxed uppercase tracking-widest">
                Choose a Gemini model. Free models offer great value for most use cases.
              </p>

              <div className="space-y-3">
                {AVAILABLE_MODELS.map((model) => (
                  <label key={model.id} className="flex items-start gap-3 p-3 border border-white/10 rounded-lg hover:border-white/20 cursor-pointer transition-all">
                    <input
                      type="radio"
                      name="model"
                      value={model.id}
                      checked={selectedModel === model.id}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-4 h-4 mt-0.5 accent-nt-red"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white uppercase">{model.name}</span>
                        <span className={`text-[8px] font-bold px-2 py-1 rounded ${
                          model.tier === 'free' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {model.tier.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[8px] text-white/40 mt-1">{model.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={handleSaveModel}
                className="w-full h-12 bg-nt-red text-nt-white font-dot uppercase tracking-[0.3em] text-[10px] hover:bg-nt-white hover:text-nt-black transition-all rounded-lg shadow-lg mt-4"
              >
                ✓ Apply Model
              </button>
            </div>
          </section>

          {/* API Key Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Key className="w-4 h-4 text-nt-red" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Google Gemini API</span>
            </div>
            
            <div className="p-6 border border-white/10 rounded-3xl bg-white/[0.02] space-y-6">
              <p className="text-[11px] font-medium text-white/60 leading-relaxed uppercase tracking-widest">
                Add your personal Google Gemini API key. Your quota, your control. Never shared.
              </p>

              {/* API Key Input */}
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">API Key</label>
                <div className="relative">
                  <input 
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy... (get from aistudio.google.com/apikey)"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-[10px] text-nt-white placeholder:text-white/30 focus:outline-none focus:border-nt-red focus:ring-1 focus:ring-nt-red/50 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/40 hover:text-white/60"
                  >
                    {showApiKey ? 'Hide' : 'Show'}
                  </button>
                </div>
                <p className="text-[8px] text-white/30 uppercase tracking-[0.2em]">
                  🔒 Stored securely in your browser only. Never sent to our servers.
                </p>
              </div>

              {/* Save Button */}
              <button 
                onClick={handleSaveApiKey}
                className="w-full h-12 bg-nt-red text-nt-white font-dot uppercase tracking-[0.3em] text-[10px] hover:bg-nt-white hover:text-nt-black transition-all rounded-lg shadow-lg"
              >
                ✓ Save API Key
              </button>

              {/* Clear Button */}
              {apiKey && !apiKey.includes('*') === false && (
                <button 
                  onClick={handleClearKey}
                  className="w-full h-11 border border-nt-red/50 text-nt-red font-dot uppercase tracking-[0.3em] text-[9px] hover:bg-nt-red/10 transition-all rounded-lg"
                >
                  🗑️ Remove Key
                </button>
              )}

              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <a 
                  href="https://aistudio.google.com/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[9px] font-bold text-nt-red uppercase tracking-widest hover:underline"
                >
                  <span>Get API Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-[9px] font-bold text-nt-red uppercase tracking-widest hover:underline"
                >
                  <span>Pricing Info</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          {/* Data Management Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-nt-red" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Neural Archive</span>
            </div>
            
            <div className="p-6 border border-white/10 rounded-3xl bg-white/[0.02] space-y-4">
              <div className="space-y-2">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Storage Usage</p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-nt-red transition-all"
                    style={{ width: `${Math.min(storageStats.percentage, 100)}%` }}
                  />
                </div>
                <p className="text-[8px] text-white/20 uppercase tracking-[0.1em]">
                  {(storageStats.used / 1024).toFixed(2)} KB / 5 MB
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button 
                  onClick={handleBackupData}
                  className="h-12 border border-white/10 hover:border-nt-red hover:text-nt-red text-white/40 font-dot uppercase tracking-[0.2em] text-[8px] transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-3 h-3" /> Backup
                </button>
                <button 
                  onClick={handleRestoreData}
                  className="h-12 border border-white/10 hover:border-nt-red hover:text-nt-red text-white/40 font-dot uppercase tracking-[0.2em] text-[8px] transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-3 h-3" /> Restore
                </button>
              </div>

              <button 
                onClick={() => {
                  if(confirm("DANGER: WIPE_ALL_REGISTRY_DATA?")) {
                    onClearHistory();
                    onClose();
                  }
                }}
                className="w-full h-12 border border-white/10 hover:border-nt-red hover:text-nt-red text-white/40 font-dot uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 mt-3"
              >
                <Trash2 className="w-4 h-4" /> Purge Local Registry
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-nt-red" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">System Version</span>
            </div>
            <div className="text-[10px] font-dot text-white/20 tracking-[0.5em] uppercase px-2">
              LinkSnap_OS_V.1.0.4_BETA
            </div>
          </section>
        </div>

        <div className="p-8 border-t border-white/5 bg-black/20">
          <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em] text-center">
            Secured via Encrypted Neural Link
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
// Web Speech API Service: Speech-to-Text & Text-to-Speech

export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', key: 'hi', label: 'हिन्दी (Hindi)', nativeName: 'हिन्दी' },
  { code: 'en-IN', key: 'en', label: 'English (India)', nativeName: 'English' },
  { code: 'bn-IN', key: 'bn', label: 'বাংলা (Bengali)', nativeName: 'বাংলা' },
  { code: 'te-IN', key: 'te', label: 'తెలుగు (Telugu)', nativeName: 'తెలుగు' },
  { code: 'ta-IN', key: 'ta', label: 'தமிழ் (Tamil)', nativeName: 'தமிழ்' },
  { code: 'mr-IN', key: 'mr', label: 'मराठी (Marathi)', nativeName: 'मराठी' }
];

class SpeechService {
  constructor() {
    this.recognition = null;
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isListening = false;
    this.currentLanguage = 'hi-IN';
    this.initRecognition();
  }

  initRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.currentLanguage;
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  }

  isSpeechSupported() {
    return !!(this.recognition || (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)));
  }

  isTtsSupported() {
    return !!(typeof window !== 'undefined' && window.speechSynthesis);
  }

  /**
   * Speak a phrase aloud using Text-To-Speech
   */
  speak(text, langCode = this.currentLanguage) {
    if (!this.synthesis) {
      console.warn('[TTS] SpeechSynthesis not supported in this browser.');
      return;
    }

    try {
      this.synthesis.cancel(); // Stop any previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.95; // Slightly slower for rural clarity
      utterance.pitch = 1.0;

      // Try to find matching regional voice if available
      const voices = this.synthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang === langCode || v.lang.startsWith(langCode.slice(0, 2)));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      this.synthesis.speak(utterance);
    } catch (err) {
      console.error('[TTS] Error speaking phrase:', err);
    }
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Start microphone speech recognition
   */
  startListening({ onResult, onError, onEnd }) {
    if (!this.recognition) {
      this.initRecognition();
    }

    if (!this.recognition) {
      if (onError) onError('Web Speech Recognition API is not supported in this browser.');
      return false;
    }

    this.recognition.lang = this.currentLanguage;

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (onResult) {
        onResult({ final, interim });
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('[STT] Speech recognition event error:', event.error);
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.warn('[STT] Recognition already started or error:', e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn('[STT] Stop error:', err);
      }
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();

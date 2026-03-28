'use client';


import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X } from 'lucide-react';

interface VoiceAssistantProps {
  onCommand: (command: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showAssistant, setShowAssistant] = useState(false);

  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleRecognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Listening...');
    };

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);
      
      if (command.includes('search')) {
        speak("Searching for your next destination.");
        onCommand('search');
      } else if (command.includes('home')) {
        speak("Going back home.");
        onCommand('home');
      } else if (command.includes('profile') || command.includes('account')) {
        speak("Opening your profile dashboard.");
        onCommand('profile');
      } else {
        speak("I didn't quite catch that. Try saying search, home, or profile.");
      }
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
      setTranscript('Error occurred');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [onCommand, speak]);

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {showAssistant && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-agent-blue" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Voice Protocol</span>
              </div>
              <button onClick={() => setShowAssistant(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-4 leading-none">How can I help?</h3>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed italic">
              "{transcript || 'Say search, home, or profile...'}"
            </p>

            <button 
              onClick={handleRecognition}
              className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center space-x-3 transition-all transform active:scale-95 ${
                isListening ? 'bg-agent-pink text-white animate-pulse' : 'bg-slate-950 text-white hover:bg-agent-blue'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? 'STOP LISTENING' : 'START VOICE SYNC'}</span>
            </button>
          </div>
          
          <div className="bg-slate-50 p-6 flex items-center space-x-4 border-t border-slate-100">
            <div className="p-2.5 bg-white rounded-xl shadow-sm">
              <Volume2 className="w-4 h-4 text-agent-blue" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-widest">
              Audio feedback enabled
            </p>
          </div>
        </div>
      )}

      <button 
        onClick={() => {
          if (!showAssistant) speak("Voice assistant initialized.");
          setShowAssistant(!showAssistant);
        }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-90 relative overflow-hidden group ${
          showAssistant ? 'bg-slate-950 text-white rotate-90' : 'bg-white text-slate-950'
        }`}
      >
        {!showAssistant && (
          <div className="absolute inset-0 bg-gradient-agent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        )}
        <div className="relative z-10">
          {showAssistant ? <X className="w-6 h-6" strokeWidth={3} /> : <Mic className="w-6 h-6" strokeWidth={2.5} />}
        </div>
        
        {/* Radar Ping Effect */}
        {!showAssistant && (
          <div className="absolute inset-0 border-4 border-agent-blue/20 rounded-full animate-ping"></div>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;

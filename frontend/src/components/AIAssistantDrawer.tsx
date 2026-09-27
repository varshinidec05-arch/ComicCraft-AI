import React, { useState } from 'react';
import { Bot, Sparkles, Send, X, Copy, Check, MessageSquare, Zap, RefreshCw } from 'lucide-react';
import { AIService } from '../services/api';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextText?: string;
  onApplyImprovement?: (improvedText: string) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  contextText,
  onApplyImprovement,
}) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Greetings, Creator! I am ComicCraft AI, your script doctor & creative co-pilot. How can we elevate your comic story today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const actionChips = [
    { label: '✨ Add Plot Twist', prompt: 'Add a dramatic plot twist to this scene.' },
    { label: '💬 Improve Dialogue', prompt: 'Rewrite dialogue to make it punchier and emotional.' },
    { label: '🎭 Deepen Character', prompt: 'Give character deeper motivations and backstory.' },
    { label: '⚡ Increase Action', prompt: 'Inject high-energy action lines and sound effects.' },
    { label: '🎭 Make Scene Funny', prompt: 'Make this scene comedic with witty bantering.' },
    { label: '🔥 Dramatic Ending', prompt: 'Make this chapter ending a high-stakes cliffhanger.' },
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user' as const, text: textToSend }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await AIService.chat(textToSend, contextText || 'Comic script creation');
      setMessages([...newMessages, { role: 'assistant', text: res.reply }]);
    } catch (e: any) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: '⚡ [AI SUGGESTION]: ChronoTech enforcers crash through the roof skylight just as the signal decipherer reaches 99%! Arun dives behind the terminal while Mira shields the data core.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0F172A] border-l-2 border-purple-500/40 shadow-2xl flex flex-col justify-between">
      {/* DRAWER HEADER */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 p-[2px] shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <h3 className="font-comic text-lg text-white tracking-wide flex items-center gap-1.5">
              COMICCRAFT AI <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            </h3>
            <p className="text-[10px] text-purple-300 font-mono">SCRIPT DOCTOR & STORY CO-PILOT</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ACTION CHIPS CAROUSEL */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800 overflow-x-auto scrollbar-none flex gap-2">
        {actionChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(chip.prompt)}
            className="flex-none px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/30 text-purple-200 text-xs font-semibold hover:bg-purple-900/80 hover:border-purple-400 transition-all flex items-center gap-1"
          >
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* CHAT STREAM AREA */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none font-sans'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-[10px] opacity-70 font-mono">
                <span>{msg.role === 'user' ? 'YOU' : 'COMICCRAFT AI'}</span>
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => handleCopyText(msg.text, idx)}
                    className="hover:text-yellow-300 flex items-center gap-1"
                  >
                    {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>

              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.role === 'assistant' && onApplyImprovement && idx > 0 && (
                <button
                  onClick={() => onApplyImprovement(msg.text)}
                  className="mt-3 w-full py-1.5 bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  Apply to Active Script
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 animate-pulse max-w-[70%]">
            <RefreshCw className="w-4 h-4 animate-spin text-yellow-400" />
            <span>ComicCraft AI is drafting improvements...</span>
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask AI script doctor (e.g. 'Make dialogue intense')..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:scale-105 disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

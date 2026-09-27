import React from 'react';
import { SpeechBubble } from '../types';
import { Trash2 } from 'lucide-react';

interface SpeechBubbleComponentProps {
  bubble: SpeechBubble;
  onUpdateText: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
  editable?: boolean;
}

export const SpeechBubbleComponent: React.FC<SpeechBubbleComponentProps> = ({
  bubble,
  onUpdateText,
  onDelete,
  editable = true,
}) => {
  const getBubbleStyle = () => {
    switch (bubble.type) {
      case 'shout':
        return 'bg-amber-300 text-slate-950 font-black tracking-wide border-3 border-black shadow-comic uppercase p-2.5 rounded-lg';
      case 'thought':
        return 'bg-white text-slate-950 border-2 border-slate-900 shadow-comic rounded-3xl p-3 font-medium';
      case 'whisper':
        return 'bg-slate-900/90 text-slate-200 border-2 border-dashed border-slate-400 p-2.5 rounded-2xl font-mono text-xs';
      case 'narration':
        return 'bg-indigo-950 text-yellow-300 border-2 border-yellow-400 p-2.5 rounded font-mono font-semibold text-xs shadow-comic-lg';
      case 'speech':
      default:
        return 'bg-white text-slate-950 border-2 border-slate-900 shadow-comic rounded-2xl p-2.5 font-bold';
    }
  };

  return (
    <div className={`relative group/bubble ${getBubbleStyle()} max-w-[240px]`}>
      {/* Character Label Badge */}
      {bubble.character && (
        <span className="block text-[9px] uppercase tracking-wider font-extrabold text-purple-600 mb-0.5">
          {bubble.character}
        </span>
      )}

      {/* Editable or Display Text */}
      {editable ? (
        <textarea
          value={bubble.text}
          onChange={(e) => onUpdateText(bubble.id, e.target.value)}
          className="w-full bg-transparent resize-none outline-none text-xs leading-snug border-b border-transparent hover:border-purple-300 focus:border-purple-500 font-inherit"
          rows={Math.max(2, Math.ceil(bubble.text.length / 30))}
        />
      ) : (
        <p className="text-xs leading-snug font-inherit">{bubble.text}</p>
      )}

      {/* Delete Icon Trigger */}
      {editable && onDelete && (
        <button
          onClick={() => onDelete(bubble.id)}
          className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover/bubble:opacity-100 transition-opacity shadow-md hover:bg-red-700"
          title="Delete Bubble"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

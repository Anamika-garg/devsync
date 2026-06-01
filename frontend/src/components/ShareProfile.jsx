import React, { useState } from 'react';
import { Share2, Check, Copy, Shield, ShieldAlert } from 'lucide-react';

export default function ShareProfile({ githubUsername = 'octocat', isPublicInit = true }) {
  const [isPublic, setIsPublic] = useState(isPublicInit);
  const [copied, setCopied] = useState(false);

  const publicLink = `${window.location.origin}/developer/${githubUsername}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.06]">
            <Share2 className="w-5 h-5 text-zinc-300" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">Share Portfolio</h3>
            <p className="text-xs text-zinc-400">Manage public indexing and search listings</p>
          </div>
        </div>
      </div>

      {/* Main interactive cards */}
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {/* Toggle Panel */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
          <div className="flex items-center gap-3">
            {isPublic ? (
              <Shield className="w-5 h-5 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-zinc-500" />
            )}
            <div>
              <span className="block text-sm font-semibold text-white">Public Discoverability</span>
              <span className="text-[10px] text-zinc-400">Allow recruiters to discover your dashboard</span>
            </div>
          </div>
          
          {/* Switch toggle */}
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPublic ? 'bg-brandPurple' : 'bg-zinc-800'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPublic ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Share Link Copy Group */}
        {isPublic && (
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-zinc-400 select-all overflow-hidden truncate">
              {publicLink}
            </div>
            
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center p-3 rounded-xl border transition-all ${copied ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-zinc-900 border-white/[0.08] hover:border-brandPurple text-zinc-300 hover:text-white'}`}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Footer metadata */}
      <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/[0.04] pt-3">
        <span>Portfolio Link status:</span>
        <span className={isPublic ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>
          {isPublic ? 'Active & Searchable' : 'Hidden / Private'}
        </span>
      </div>
    </div>
  );
}

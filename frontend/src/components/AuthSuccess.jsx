import React, { useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function AuthSuccess({ onLoginSuccess }) {
  useEffect(() => {
    // Extract query parameters from URL
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    
    if (token) {
      console.log("[AuthSuccess] Token found in URL, establishing secure session.");
      localStorage.setItem('devsync_token', token);
      
      // Notify parent coordinator to fetch the user profile
      if (onLoginSuccess) {
        onLoginSuccess(token);
      }
    } else {
      console.error("[AuthSuccess] Failed to find token in redirect parameters.");
      // Fallback redirect
      window.location.href = '/';
    }
  }, [onLoginSuccess]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brandPurple/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col items-center gap-6 text-center max-w-sm relative z-10">
        {/* Glowing Logo */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brandPurple to-lcOrange p-[1px] animate-bounce">
          <div className="flex items-center justify-center w-full h-full rounded-2xl bg-[#09090B]">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brandPurple to-lcOrange opacity-50 blur-md" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display font-extrabold text-xl tracking-tight text-white uppercase tracking-wider animate-pulse">
            Establishing Secure Session
          </h3>
          <p className="text-xs text-zinc-400 font-semibold tracking-wide">
            Decrypting token signatures and caching profile states...
          </p>
        </div>

        {/* Small Progress Loader Bar */}
        <div className="w-44 h-1 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.06]">
          <div className="h-full bg-gradient-to-r from-brandPurple to-lcOrange rounded-full w-[60%] animate-[pulse_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
}

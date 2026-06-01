import React from 'react';
import { Terminal, Github, Cpu, ExternalLink } from 'lucide-react';

export default function Navbar({ onConnectClick, onHomeClick, currentView }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#09090B]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-brandPurple to-lcOrange p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="flex items-center justify-center w-full h-full rounded-lg bg-[#09090B]">
              <Terminal className="w-4.5 h-4.5 text-white transition-colors group-hover:text-brandPurple" />
            </div>
            <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-tr from-brandPurple to-lcOrange opacity-50 blur-sm group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-white/90">
            DevSync<span className="text-brandPurple">.</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#preview" className="hover:text-white transition-colors">Platform</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          {currentView === 'dashboard' && (
            <button 
              onClick={onHomeClick}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
            >
              Back Home
            </button>
          )}
          
          <button
            onClick={onConnectClick}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs sm:text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-brandPurple to-lcOrange hover:text-white focus:outline-none"
          >
            <span className="relative px-4 sm:px-5 py-2 transition-all ease-in duration-75 bg-[#09090B] rounded-md group-hover:bg-opacity-0">
              {currentView === 'dashboard' ? 'Sync Profiles' : 'Connect Profiles'}
            </span>
            <span className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-brandPurple to-lcOrange opacity-30 blur-md group-hover:opacity-60 transition-opacity" />
          </button>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, LogIn, ArrowLeft } from 'lucide-react';

const SessionExpired = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]"></div>
      
      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-red-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
            <Clock className="w-12 h-12 text-red-500 relative z-10 animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tighter italic">Session Expired</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Your security token has expired or you've been logged out. Please sign in again to continue accessing your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-4">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-600/20 group"
          >
            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Sign In Again
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl border border-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
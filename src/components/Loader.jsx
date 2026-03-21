import React from "react";
import { ShieldCheck } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans overflow-hidden relative">
        {/* Subtle background patterns matching Landing Page */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-[100px]"></div>

        <div className="relative z-10 flex flex-col items-center max-w-lg px-6">
          {/* Animated Logo Mark */}
          <div className="mb-10 relative group">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-2xl blur-xl group-hover:bg-blue-600/10 transition-all duration-500"></div>
            <div className="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-[0_20px_40px_rgba(37,99,235,0.25)] animate-[float_3s_ease-in-out_infinite]">
              P
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
            </div>
          </div>

          {/* Typography with staggered entry feel */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight animate-[fadeUp_0.8s_ease-out_forwards]">
              Placement <span className="text-blue-600">Pro</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium tracking-tight opacity-0 animate-[fadeUp_0.8s_ease-out_0.2s_forwards]">
              Connecting Campus to Corporate Success.
            </p>
          </div>

          {/* Refined Progress Section */}
          <div className="mt-16 w-full max-w-[280px] space-y-6">
            <div className="relative h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
            </div>
            
            <div className="flex items-center justify-center gap-3 py-2 px-4 bg-slate-50 border border-slate-100 rounded-full opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Syncing with University Servers</span>
            </div>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Enterprise Grade Security</p>
          </div>
          <p className="text-[9px] text-slate-300 font-medium">• Batch 2026</p>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes progress {
            0% { width: 0%; left: 0; }
            50% { width: 70%; left: 15%; }
            100% { width: 0%; left: 100%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
  );
};

export default Loader;
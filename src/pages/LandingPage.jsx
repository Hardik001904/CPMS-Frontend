import React from 'react';
// Fix: Ensured standard react-router-dom import
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, Briefcase, BarChart3, ArrowRight, Shield } from 'lucide-react';
import { Footer } from '../components/Layout';
import { appLogo, appName } from '../App';

const LandingPage= () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">{appLogo}</div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">{appName}</span>
            </Link>
              {/* <Link to="/admin-login" className="hidden md:flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm">
                <Shield className="w-4 h-4" /> Admin Portal
              </Link> */}
            <div className="flex items-center space-x-6">
              <div className=" bg-slate-200 hidden md:block"></div>
              <Link to="/login" className="text-slate-600 hover:text-blue-600 font-bold">Portal Login</Link>
              <Link to="/register/student" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 shadow-lg active:scale-95 transition-all">Enroll Now</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-slate-50 pt-20 pb-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8 border border-blue-200">
            Official Placement Gateway for Batch 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Connecting Campus <br /><span className="text-blue-600">to Corporate Success.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium">
            Streamline your recruitment journey. A unified ecosystem for students and industry leaders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register/student" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95">
              I am a Student <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/register/company" className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95">
              Hiring Partner
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]"></div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-8 group hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-6"/>
              <h3 className="text-xl font-bold mb-3">Student Profiles</h3>
              <p className="text-slate-500">Detailed digital CVs with university verified enrollment tracking.</p>
            </div>
            <div className="p-8 group hover:scale-105 transition-transform duration-300">
              <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-6"/>
              <h3 className="text-xl font-bold mb-3">Smart Hiring</h3>
              <p className="text-slate-500">Corporate partners manage campus drives with intuitive application filtering.</p>
            </div>
            <div className="p-8 group hover:scale-105 transition-transform duration-300">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-6"/>
              <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-slate-500">Live monitoring of placement statistics and hiring trends across the batch.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;


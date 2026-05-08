import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  GraduationCap,
  Briefcase,
  BarChart3,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Footer, PublicNavbar } from "../components/Layout";
import { appLogo, appName } from "../App";
import { fetchSummaryStats } from "../services/statsService";

const LandingPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchSummaryStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        loadStats();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const summaryStats = stats
    ? [
        {
          title: "Total Students",
          value: stats.totalStudents,
          icon: <GraduationCap className="w-5 h-5" />,
        },
        {
          title: "Total Companies",
          value: stats.totalCompanies,
          icon: <Building2 className="w-5 h-5" />,
        },
        {
          title: "Active Jobs",
          value: stats.totalJobs,
          icon: <Briefcase className="w-5 h-5" />,
        },
        {
          title: "Placed Students",
          value: stats.placedStudents,
          icon: <Shield className="w-5 h-5" />,
        },
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <PublicNavbar />
      {/* <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                {appLogo}
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                {appName}
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className=" font-semibold">
                About Us
              </Link>
              <Link
                to="/services"
                className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register/student"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </nav> */}

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#1E3A8A] py-24 relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-sm font-semibold mb-8 border border-blue-400/30 backdrop-blur-sm">
            Official Placement Gateway for Batch 2026
          </div>
          <h1 className="text-5xl text-white md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight reveal">
            Connecting Campus <br />
            <span className="text-blue-500">to Corporate Success.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-medium reveal">
            Streamline your recruitment journey. A unified ecosystem for
            students and industry leaders.
          </p>
          <div className="flex flex-col  sm:flex-row justify-center gap-4">
            <Link
              to="/register/student"
              className="flex items-center  justify-center gap-2 bg-[#2563EB] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1D4ED8] transition-all shadow-2xl shadow-blue-500/30  hover:scale-105"
            >
              I am a Student <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register/company"
              className="flex items-center justify-center gap-2 bg-white/95 border border-slate-300 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95 backdrop-blur-sm"
            >
              Hiring Partner
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-1/2  translate-x-1/3 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[140px]"></div>
      </section>

      {/* PLACEMENT OVERVIEW (MATCHED UI) */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 relative overflow-hidden border-y border-slate-200">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">
              Placement Overview
            </h2>
            <p className="text-slate-600 mt-3 text-lg">
              Real-time insights into campus placement performance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {summaryStats.map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-white shadow-xl border border-blue-100 hover:-translate-y-2 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-5 mx-auto">
                  {item.icon}
                </div>

                <p className="text-slate-500 font-medium text-lg mb-3">
                  {item.title}
                </p>

                <h3 className="text-5xl font-bold text-slate-900">
                  {item.value || 0}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PLACEMENT OVERVIEW (MATCHED UI) */}
      {/* <section className="py-24 bg-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Placement Overview</h2>
            <p className="text-slate-500 mt-2">
              Real-time insights into campus placement performance
            </p>
          </div> */}

      {/* 🔄 Loading */}
      {/* {loading ? (
            <p className="text-center text-slate-500">Loading stats...</p>
          ) : (
            <> */}
      {/* ✅ SAME UI AS FEATURES */}
      {/* <div className="grid md:grid-cols-4 gap-12 text-center">
                {summaryStats.map((item, index) => (
                  <div
                    key={index}
                    className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl border border-slate-100 group hover:scale-105 transition-all duration-300"
                    >
                    <div className="flex justify-center mb-6 text-blue-600"> */}
      {/* bigger icon like features */}
      {/* <div className="w-12 h-12 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div> */}

      {/* <h2 className="text-4xl font-extrabold mb-2 text-slate-900">
                      {item.value || 0}
                    </h2>

                    <p className="text-slate-500 font-medium">{item.title}</p>
                  </div>
                ))}
              </div> */}

      {/* Placement % (Styled clean) */}
      {/* {stats && (
                <div className="mt-16 text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    Placement Rate: {stats.placementPercentage || 0}%
                  </h3>

                  <div className="w-full bg-gray-200 rounded-full h-3 max-w-2xl mx-auto overflow-hidden">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Number(stats.placementPercentage || 0)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section> */}

      {/* FEATURES */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Blur Effects */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-[120px]"></div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose Placement Pro?
          </h2>
          <p className="text-slate-600 mt-3 text-lg">
            Everything needed for modern campus recruitment
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl hover:shadow-blue-500/10 border border-slate-100  group hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Student Profiles</h3>
              <p className="text-slate-500">
                Detailed digital CVs with university verified enrollment
                tracking.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl hover:shadow-blue-500/10 border border-slate-100  group hover:scale-105 transition-all duration-300">
              <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Smart Hiring</h3>
              <p className="text-slate-500">
                Corporate partners manage campus drives with intuitive
                application filtering.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl hover:shadow-blue-500/10 border border-slate-100  group hover:scale-105 transition-all duration-300">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-slate-500">
                Live monitoring of placement statistics and hiring trends across
                the batch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

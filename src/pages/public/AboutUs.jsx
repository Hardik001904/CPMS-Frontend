// import React from "react";
// import { motion } from "framer-motion";
// import { Footer } from "../../components/Layout";
// import { Link } from "react-router-dom";
// import { Shield, Users, Target, Award, ArrowRight } from "lucide-react";
// import { appLogo, appName } from "../../App";

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       {/* Navigation */}
//       <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-20 items-center">
//             <Link to="/" className="flex items-center gap-2.5 group">
//               <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
//                 {appLogo}
//               </div>
//               <span className="text-2xl font-bold tracking-tight text-slate-900">
//                 {appName}
//               </span>
//             </Link>
//             <div className="hidden md:flex items-center space-x-8">
//               <Link to="/about" className="text-blue-600 font-semibold">
//                 About Us
//               </Link>
//               <Link
//                 to="/services"
//                 className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
//               >
//                 Services
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 to="/login"
//                 className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register/student"
//                 className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
//               >
//                 Enroll Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="bg-slate-950 py-24 relative overflow-hidden">
//           <div className="absolute inset-0 pointer-events-none">
//             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
//           </div>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
//             >
//               Our Mission is to{" "}
//               <span className="text-blue-400">Empower Talent.</span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-xl text-slate-400 max-w-3xl mx-auto font-medium"
//             >
//               PlacementPro is a leading campus recruitment platform dedicated to
//               bridging the gap between academic excellence and corporate
//               requirements.
//             </motion.p>
//           </div>
//         </section>

//         {/* Content Section */}
//         <section className="py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid md:grid-cols-2 gap-16 items-center">
//               <div>
//                 <h2 className="text-3xl font-bold text-slate-900 mb-6">
//                   Bridging the Gap Since 2018
//                 </h2>
//                 <p className="text-slate-600 mb-6 leading-relaxed">
//                   Founded by a team of educators and industry veterans,
//                   PlacementPro was born out of a simple observation: the
//                   traditional campus recruitment process was fragmented,
//                   inefficient, and often left talented students behind.
//                 </p>
//                 <p className="text-slate-600 mb-8 leading-relaxed">
//                   We built a unified ecosystem that leverages data and
//                   technology to create transparent, verified, and high-impact
//                   connections between universities and the corporate world.
//                 </p>
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
//                     <Users className="w-8 h-8 text-blue-600 mb-3" />
//                     <h4 className="font-bold text-slate-900">
//                       100+ Universities
//                     </h4>
//                     <p className="text-xs text-slate-500 font-medium">
//                       Trusted by top institutions
//                     </p>
//                   </div>
//                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
//                     <Target className="w-8 h-8 text-indigo-600 mb-3" />
//                     <h4 className="font-bold text-slate-900">500+ Companies</h4>
//                     <p className="text-xs text-slate-500 font-medium">
//                       Hiring elite talent daily
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="aspect-square bg-blue-600 rounded-3xl rotate-3 overflow-hidden shadow-2xl">
//                   <img
//                     src="https://picsum.photos/seed/office/800/800"
//                     alt="Our Office"
//                     className="w-full h-full object-cover opacity-80 mix-blend-overlay"
//                     referrerPolicy="no-referrer"
//                   />
//                 </div>
//                 <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
//                   <Award className="w-10 h-10 text-yellow-500 mb-4" />
//                   <p className="text-sm font-bold text-slate-900">
//                     Awarded Best Ed-Tech Startup 2023
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="py-24 bg-slate-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold text-slate-900">
//                 Our Core Values
//               </h2>
//             </div>
//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   title: "Integrity",
//                   desc: "We believe in verified data and honest connections.",
//                 },
//                 {
//                   title: "Innovation",
//                   desc: "Constantly evolving our tools for the modern workforce.",
//                 },
//                 {
//                   title: "Inclusivity",
//                   desc: "Ensuring every talented student has a fair shot at success.",
//                 },
//               ].map((value, i) => (
//                 <div
//                   key={i}
//                   className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
//                 >
//                   <h3 className="text-xl font-bold text-slate-900 mb-4">
//                     {value.title}
//                   </h3>
//                   <p className="text-slate-600 font-medium">{value.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutUs;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Footer, PublicNavbar } from "../../components/Layout";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  Target,
  Award,
  Briefcase,
  GraduationCap,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { appLogo, appName } from "../../App";
import { fetchSummaryStats } from "../../services/statsService";
// import { Footer } from "../../components/Layout";

const AboutUs = () => {
  const [stats, setStats] = useState(null);

useEffect(() => {
  const loadStats = async () => {
    try {
      const data = await fetchSummaryStats();
      // console.log("ABOUT STATS:", data);
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  loadStats();
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
        <Link to="/about" className="text-blue-600 font-semibold">
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

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-slate-950 py-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px]"></div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Empowering the Future of{" "}
              <span className="text-blue-400">Campus Recruitment</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Placement Pro bridges the gap between universities, students, and
              recruiters with a unified intelligent recruitment ecosystem.
            </p>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                Traditional campus placement processes are often fragmented,
                manual, and inefficient. Placement Pro was built to modernize
                recruitment through technology-driven workflows.
              </p>

              <p className="text-slate-600 leading-relaxed">
                We empower students with verified digital profiles, help
                recruiters filter top talent efficiently, and provide colleges
                with real-time placement analytics.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
  {
    icon: Users,
    title: stats ? stats.totalStudents : "...",
    desc: "Students Registered",
  },
  {
    icon: Building2,
    title: stats ? stats.totalCompanies : "...",
    desc: "Hiring Companies",
  },
  {
    icon: GraduationCap,
    title: "100+",
    desc: "Universities",
  },
  {
    icon: Award,
    title: stats ? `${stats.placementPercentage}%` : "...",
    desc: "Placement Success",
  },
].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm"
                >
                  <item.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-3xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900">
                Why Choose Placement Pro?
              </h2>
              <p className="text-slate-600 mt-4">
                Everything needed for modern placement management
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Verified Student Profiles",
                "Smart Candidate Filtering",
                "Real-Time Placement Analytics",
                "Secure Document Verification",
                "Automated Application Tracking",
                "Centralized Recruiter Dashboard",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 flex gap-4 items-start"
                >
                  <CheckCircle2 className="text-blue-600 w-6 h-6 mt-1" />
                  <span className="font-semibold text-slate-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900">
                How Placement Pro Works
              </h2>
            </div>

            <div className="grid md:grid-cols-5 gap-8 text-center">
              {[
                "Student Registers",
                "Builds Profile",
                "Applies For Jobs",
                "Recruiter Shortlists",
                "Placement Confirmed",
              ].map((step, i) => (
                <div key={i}>
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-4">
                    {i + 1}
                  </div>
                  <p className="font-semibold text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900">
                Our Core Values
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  title: "Integrity",
                  desc: "Verified data and honest connections.",
                },
                {
                  title: "Innovation",
                  desc: "Technology-first recruitment solutions.",
                },
                {
                  title: "Transparency",
                  desc: "Clear hiring processes for everyone.",
                },
                {
                  title: "Inclusivity",
                  desc: "Equal opportunity for every student.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-slate-950 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Campus Hiring?
            </h2>

            <p className="text-slate-400 mb-8 text-lg">
              Join thousands of students and recruiters using Placement Pro.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register/student"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Register as Student
              </Link>

              <Link
                to="/register/company"
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition"
              >
                Partner as Company
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;

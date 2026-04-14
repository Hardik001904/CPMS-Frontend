// import React from "react";
// import { motion } from "framer-motion";
// import { Footer } from "../../components/Layout";
// import { Link } from "react-router-dom";
// import {
//   GraduationCap,
//   Building2,
//   BarChart3,
//   Shield,
//   Zap,
//   Search,
//   Calendar,
//   FileText,
//   Users,
// } from "lucide-react";
// import { appLogo, appName } from "../../App";

// const Services = () => {
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
//               <Link to="/about" className="font-semibold">
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
//         <section className="bg-slate-950 py-24 relative overflow-hidden text-white">
//           <div className="absolute inset-0 pointer-events-none">
//             <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
//           </div>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
//             >
//               Comprehensive{" "}
//               <span className="text-blue-400">Recruitment Solutions.</span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-xl text-slate-400 max-w-3xl mx-auto font-medium"
//             >
//               We provide a suite of tools designed to streamline the hiring
//               journey for students, universities, and corporate partners.
//             </motion.p>
//           </div>
//         </section>

//         {/* Services Grid */}
//         <section className="py-24">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-slate-900">
//               Our Platform Capabilities
//             </h2>
//             <p className="text-slate-600 mt-4 text-lg">
//               Designed for students, recruiters, and placement administrators.
//             </p>
//           </div>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   icon: <GraduationCap className="w-8 h-8" />,
//                   title: "Student Portfolio Management",
//                   desc: "Create verified digital CVs that stand out to top recruiters. Showcase your skills, projects, and academic achievements.",
//                   color: "bg-blue-50 text-blue-600",
//                 },
//                 {
//                   icon: <Building2 className="w-8 h-8" />,
//                   title: "Campus Drive Orchestration",
//                   desc: "End-to-end management of recruitment drives, from job posting to final offer letter generation.",
//                   color: "bg-indigo-50 text-indigo-600",
//                 },
//                 {
//                   icon: <Search className="w-8 h-8" />,
//                   title: "Smart Talent Discovery",
//                   desc: "Advanced filtering and AI-driven matching to help companies find the perfect candidates for their roles.",
//                   color: "bg-emerald-50 text-emerald-600",
//                 },
//                 {
//                   icon: <Calendar className="w-8 h-8" />,
//                   title: "Interview Scheduling",
//                   desc: "Automated scheduling system that syncs with both student and recruiter calendars for seamless coordination.",
//                   color: "bg-orange-50 text-orange-600",
//                 },
//                 {
//                   icon: <BarChart3 className="w-8 h-8" />,
//                   title: "Placement Analytics",
//                   desc: "Real-time dashboards for universities to track placement progress, average packages, and hiring trends.",
//                   color: "bg-purple-50 text-purple-600",
//                 },
//                 {
//                   icon: <FileText className="w-8 h-8" />,
//                   title: "Automated Documentation",
//                   desc: "Generate offer letters, internship certificates, and NOCs automatically with university branding.",
//                   color: "bg-pink-50 text-pink-600",
//                 },
//               ].map((service, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ y: -5 }}
//                   className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
//                 >
//                   <div
//                     className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm`}
//                   >
//                     {service.icon}
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-900 mb-4">
//                     {service.title}
//                   </h3>
//                   <p className="text-slate-600 leading-relaxed font-medium">
//                     {service.desc}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Specialized Solutions */}
//         <section className="py-24 bg-slate-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-slate-100">
//               <div className="grid md:grid-cols-2 gap-16 items-center">
//                 <div>
//                   <h2 className="text-3xl font-bold text-slate-900 mb-6">
//                     Enterprise-Grade Infrastructure
//                   </h2>
//                   <p className="text-slate-600 mb-8 leading-relaxed font-medium">
//                     Our platform is built on secure, scalable cloud technology
//                     designed to handle thousands of concurrent users during peak
//                     recruitment seasons.
//                   </p>
//                   <ul className="space-y-4">
//                     {[
//                       "99.9% Uptime Guarantee",
//                       "End-to-end Data Encryption",
//                       "GDPR & ISO 27001 Compliant",
//                       "24/7 Technical Support",
//                     ].map((item, i) => (
//                       <li
//                         key={i}
//                         className="flex items-center gap-3 font-bold text-slate-700"
//                       >
//                         <Zap className="w-5 h-5 text-blue-600" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="aspect-square bg-blue-50 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
//                     <Shield className="w-10 h-10 text-blue-600 mb-4" />
//                     <p className="font-bold text-slate-900">Secure</p>
//                   </div>
//                   <div className="aspect-square bg-indigo-50 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
//                     <Zap className="w-10 h-10 text-indigo-600 mb-4" />
//                     <p className="font-bold text-slate-900">Fast</p>
//                   </div>
//                   <div className="aspect-square bg-emerald-50 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
//                     <BarChart3 className="w-10 h-10 text-emerald-600 mb-4" />
//                     <p className="font-bold text-slate-900">Insightful</p>
//                   </div>
//                   <div className="aspect-square bg-orange-50 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
//                     <Users className="w-10 h-10 text-orange-600 mb-4" />
//                     <p className="font-bold text-slate-900">Collaborative</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Services;



import React from "react";
import { motion } from "framer-motion";
import { Footer } from "../../components/Layout";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  BarChart3,
  Shield,
  Zap,
  Search,
  Calendar,
  FileText,
  Users,
} from "lucide-react";
import { appLogo, appName } from "../../App";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
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
              <Link
                to="/about"
                className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
              >
                About Us
              </Link>

              <Link to="/services" className="text-blue-600 font-semibold">
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
      </nav>

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-slate-950 py-24 relative overflow-hidden text-white">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
            >
              Comprehensive{" "}
              <span className="text-blue-400">Recruitment Solutions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto font-medium"
            >
              Advanced tools built to modernize placement workflows for
              students, universities, and recruiters.
            </motion.p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900">
                Our Platform Capabilities
              </h2>
              <p className="text-slate-600 mt-4 text-lg">
                Designed for students, recruiters, and placement administrators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <GraduationCap className="w-8 h-8" />,
                  title: "Student Portfolio Management",
                  desc: "Create verified digital profiles showcasing academic performance, projects, certifications, and resumes.",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: <Building2 className="w-8 h-8" />,
                  title: "Campus Drive Management",
                  desc: "Manage complete campus recruitment drives from posting opportunities to final offer rollout.",
                  color: "bg-indigo-50 text-indigo-600",
                },
                {
                  icon: <Search className="w-8 h-8" />,
                  title: "AI-Powered Talent Discovery",
                  desc: "Intelligent candidate filtering and smart recruiter search to identify top-fit applicants.",
                  color: "bg-emerald-50 text-emerald-600",
                },
                {
                  icon: <Calendar className="w-8 h-8" />,
                  title: "Interview Scheduling",
                  desc: "Automated scheduling and coordination with students, recruiters, and placement officers.",
                  color: "bg-orange-50 text-orange-600",
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Placement Analytics",
                  desc: "Track placement progress, hiring metrics, package trends, and recruiter performance.",
                  color: "bg-purple-50 text-purple-600",
                },
                {
                  icon: <FileText className="w-8 h-8" />,
                  title: "Automated Documentation",
                  desc: "Generate offer letters, internship certificates, and compliance documents instantly.",
                  color: "bg-pink-50 text-pink-600",
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="group p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full blur-[120px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-slate-100">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Enterprise-Grade Infrastructure
                  </h2>

                  <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                    Secure, scalable cloud architecture built to support
                    thousands of concurrent users during peak placement seasons.
                  </p>

                  <ul className="space-y-4">
                    {[
                      "99.9% Uptime Guarantee",
                      "End-to-End Encryption",
                      "GDPR & ISO 27001 Compliance",
                      "24/7 Technical Support",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 font-bold text-slate-700"
                      >
                        <Zap className="w-5 h-5 text-blue-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: Shield,
                      title: "Secure",
                      color: "bg-blue-50 text-blue-600",
                    },
                    {
                      icon: Zap,
                      title: "Fast",
                      color: "bg-indigo-50 text-indigo-600",
                    },
                    {
                      icon: BarChart3,
                      title: "Insightful",
                      color: "bg-emerald-50 text-emerald-600",
                    },
                    {
                      icon: Users,
                      title: "Collaborative",
                      color: "bg-orange-50 text-orange-600",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`aspect-square ${item.color} rounded-3xl flex flex-col items-center justify-center p-6 text-center`}
                    >
                      <item.icon className="w-10 h-10 mb-4" />
                      <p className="font-bold text-slate-900">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-slate-950 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Modernize Your Recruitment Process?
            </h2>

            <p className="text-slate-400 mb-8 text-lg">
              Join institutions and recruiters transforming placement management
              with Placement Pro.
            </p>

            <Link
              to="/register/company"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Partner With Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
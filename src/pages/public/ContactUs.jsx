  // import React, { useState } from "react";
  // import { motion } from "framer-motion";
  // import { Footer } from "../../components/Layout";
  // import { Link } from "react-router-dom";
  // import {
  //   Mail,
  //   Phone,
  //   MapPin,
  //   Send,
  //   MessageSquare,
  //   Globe,
  //   Clock,
  // } from "lucide-react";
  // import { appLogo, appName } from "../../App";

  // const ContactUs = () => {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     subject: "",
  //     message: "",
  //   });
  //   const [submitted, setSubmitted] = useState(false);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setSubmitted(true);
  //     // In a real app, you'd send this to an API
  //   };

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
  //               <Link to="/about" className=" font-semibold">
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
  //             <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]"></div>
  //           </div>
  //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
  //             <motion.h1
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
  //             >
  //               Let's Start a <span className="text-blue-400">Conversation.</span>
  //             </motion.h1>
  //             <motion.p
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: 0.1 }}
  //               className="text-xl text-slate-400 max-w-3xl mx-auto font-medium"
  //             >
  //               Have questions about our platform? Our team is here to help you
  //               navigate the future of campus recruitment.
  //             </motion.p>
  //           </div>
  //         </section>

  //         {/* Contact Grid */}
  //         <section className="py-24">
  //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //             <div className="grid lg:grid-cols-3 gap-12">
  //               {/* Contact Info */}
  //               <div className="lg:col-span-1 space-y-8">
  //                 <div>
  //                   <h2 className="text-3xl font-bold text-slate-900 mb-6">
  //                     Get in Touch
  //                   </h2>
  //                   <p className="text-slate-600 font-medium leading-relaxed">
  //                     Whether you're a university administrator, a corporate
  //                     recruiter, or a student, we're ready to assist you.
  //                   </p>
  //                 </div>

  //                 <div className="space-y-6">
  //                   <div className="flex items-start gap-4">
  //                     <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
  //                       <Mail className="w-6 h-6" />
  //                     </div>
  //                     <div>
  //                       <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">
  //                         Email Us
  //                       </p>
  //                       <p className="text-slate-600 font-medium">
  //                         support@placementpro.edu
  //                       </p>
  //                       <p className="text-slate-600 font-medium">
  //                         partners@placementpro.edu
  //                       </p>
  //                     </div>
  //                   </div>

  //                   <div className="flex items-start gap-4">
  //                     <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
  //                       <Phone className="w-6 h-6" />
  //                     </div>
  //                     <div>
  //                       <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">
  //                         Call Us
  //                       </p>
  //                       <p className="text-slate-600 font-medium">
  //                         +91 98765543210-PLACEMENTS
  //                       </p>
  //                       <p className="text-slate-600 font-medium">
  //                         Mon-Fri, 9am - 6pm EST
  //                       </p>
  //                     </div>
  //                   </div>

  //                   <div className="flex items-start gap-4">
  //                     <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
  //                       <MapPin className="w-6 h-6" />
  //                     </div>
  //                     <div>
  //                       <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">
  //                         Visit Us
  //                       </p>
  //                       <p className="text-slate-600 font-medium">
  //                         Placement Cell, Block A
  //                       </p>
  //                       <p className="text-slate-600 font-medium">
  //                         University Campus, 400001
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </div>

  //                 <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
  //                   <div className="flex items-center gap-3 mb-4">
  //                     <Clock className="w-5 h-5 text-blue-600" />
  //                     <h4 className="font-bold text-slate-900">Response Time</h4>
  //                   </div>
  //                   <p className="text-sm text-slate-600 font-medium">
  //                     We typically respond to all inquiries within 24 business
  //                     hours.
  //                   </p>
  //                 </div>
  //               </div>

  //               {/* Contact Form */}
  //               <div className="lg:col-span-2">
  //                 <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
  //                   {submitted ? (
  //                     <motion.div
  //                       initial={{ opacity: 0, scale: 0.9 }}
  //                       animate={{ opacity: 1, scale: 1 }}
  //                       className="text-center py-12"
  //                     >
  //                       <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
  //                         <Send className="w-10 h-10" />
  //                       </div>
  //                       <h3 className="text-3xl font-bold text-slate-900 mb-4">
  //                         Message Sent!
  //                       </h3>
  //                       <p className="text-slate-600 font-medium mb-8">
  //                         Thank you for reaching out. Our team will get back to
  //                         you shortly.
  //                       </p>
  //                       <button
  //                         onClick={() => setSubmitted(false)}
  //                         className="text-blue-600 font-bold hover:underline"
  //                       >
  //                         Send another message
  //                       </button>
  //                     </motion.div>
  //                   ) : (
  //                     <form onSubmit={handleSubmit} className="space-y-6">
  //                       <div className="grid md:grid-cols-2 gap-6">
  //                         <div className="space-y-2">
  //                           <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
  //                             Full Name
  //                           </label>
  //                           <input
  //                             required
  //                             type="text"
  //                             className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
  //                             placeholder="John Doe"
  //                             value={formData.name}
  //                             onChange={(e) =>
  //                               setFormData({ ...formData, name: e.target.value })
  //                             }
  //                           />
  //                         </div>
  //                         <div className="space-y-2">
  //                           <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
  //                             Email Address
  //                           </label>
  //                           <input
  //                             required
  //                             type="email"
  //                             className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
  //                             placeholder="john@example.com"
  //                             value={formData.email}
  //                             onChange={(e) =>
  //                               setFormData({
  //                                 ...formData,
  //                                 email: e.target.value,
  //                               })
  //                             }
  //                           />
  //                         </div>
  //                       </div>
  //                       <div className="space-y-2">
  //                         <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
  //                           Subject
  //                         </label>
  //                         <input
  //                           required
  //                           type="text"
  //                           className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
  //                           placeholder="How can we help?"
  //                           value={formData.subject}
  //                           onChange={(e) =>
  //                             setFormData({
  //                               ...formData,
  //                               subject: e.target.value,
  //                             })
  //                           }
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">
  //                           Message
  //                         </label>
  //                         <textarea
  //                           required
  //                           rows={6}
  //                           className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none"
  //                           placeholder="Tell us more about your inquiry..."
  //                           value={formData.message}
  //                           onChange={(e) =>
  //                             setFormData({
  //                               ...formData,
  //                               message: e.target.value,
  //                             })
  //                           }
  //                         ></textarea>
  //                       </div>
  //                       <button
  //                         type="submit"
  //                         className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
  //                       >
  //                         <Send className="w-5 h-5" />
  //                         Send Message
  //                       </button>
  //                     </form>
  //                   )}
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

  // export default ContactUs;



  import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer, PublicNavbar } from "../../components/Layout";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
} from "lucide-react";
import { appLogo, appName } from "../../App";
import { submitContactMessage } from "../../services/contactService";
// import { Footer } from "../../components/Layout";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await submitContactMessage(formData);

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Submit Error:", error);
      alert(
        error?.response?.data?.message || "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
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
              <Link to="/about" className="font-semibold">
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
                className="text-blue-600 font-semibold"
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
        {/* Hero Section */}
        <section className="bg-slate-950 py-24 relative overflow-hidden text-white">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
            >
              Let's Start a <span className="text-blue-400">Conversation.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto font-medium"
            >
              Have questions about our platform? Our team is here to help you
              navigate the future of campus recruitment.
            </motion.p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Get in Touch
                  </h2>

                  <p className="text-slate-600 font-medium leading-relaxed">
                    Whether you're a university administrator, a corporate
                    recruiter, or a student, we're ready to assist you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">
                        Email Us
                      </p>
                      <p className="text-slate-600 font-medium">
                        support@placementpro.edu
                      </p>
                      <p className="text-slate-600 font-medium">
                        partners@placementpro.edu
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">
                        Call Us
                      </p>
                      <p className="text-slate-600 font-medium">
                        +91 98765543210-PLACEMENTS
                      </p>
                      <p className="text-slate-600 font-medium">
                        Mon-Fri, 9am - 6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">
                        Visit Us
                      </p>
                      <p className="text-slate-600 font-medium">
                        Placement Cell, Block A
                      </p>
                      <p className="text-slate-600 font-medium">
                        University Campus, 400001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900">Response Time</h4>
                  </div>

                  <p className="text-sm text-slate-600 font-medium">
                    We typically respond to all inquiries within 24 business hours.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10" />
                      </div>

                      <h3 className="text-3xl font-bold text-slate-900 mb-4">
                        Message Sent!
                      </h3>

                      <p className="text-slate-600 font-medium mb-8">
                        Thank you for reaching out. Our team will get back to you shortly.
                      </p>

                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
                        />

                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
                        />
                      </div>

                      <input
                        required
                        type="text"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl"
                      />

                      <textarea
                        required
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl resize-none"
                      />

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        <Send className="w-5 h-5" />
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
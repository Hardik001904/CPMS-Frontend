// import React, { useEffect, useState } from "react";
// import { deleteContactMessage, fetchContactMessages, toggleContactReadStatus } from "../../services/contactService";
// // import {
// //   fetchContactMessages,
// //   toggleContactReadStatus,
// //   deleteContactMessage,
// // } from "../../services/contactAdminService";

// const ContactMessages = () => {
//   const [messages, setMessages] = useState([]);

//   const loadMessages = async () => {
//     const data = await fetchContactMessages();
//     setMessages(data);
//   };

//   useEffect(() => {
//     loadMessages();
//   }, []);

//   const handleToggleRead = async (id) => {
//     await toggleContactReadStatus(id);
//     loadMessages();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this message?")) return;

//     await deleteContactMessage(id);
//     loadMessages();
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-8">
//         Contact Messages
//       </h1>

//       <div className="bg-white rounded-3xl shadow border overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-slate-50 border-b">
//             <tr>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Subject</th>
//               <th className="p-4 text-left">Message</th>
//               <th className="p-4 text-left">Date</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {messages.map((msg) => (
//               <tr
//                 key={msg._id}
//                 className="border-b hover:bg-slate-50"
//               >
//                 <td className="p-4">{msg.name}</td>
//                 <td className="p-4">{msg.email}</td>
//                 <td className="p-4">{msg.subject}</td>
//                 <td className="p-4 max-w-xs truncate">
//                   {msg.message}
//                 </td>
//                 <td className="p-4">
//                   {new Date(msg.createdAt).toLocaleDateString()}
//                 </td>

//                 <td className="p-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       msg.isRead
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {msg.isRead ? "Read" : "Unread"}
//                   </span>
//                 </td>

//                 <td className="p-4 flex gap-2">
//                   <button
//                     onClick={() => handleToggleRead(msg._id)}
//                     className="px-3 py-2 bg-blue-600 text-white rounded-xl text-sm"
//                   >
//                     Toggle Read
//                   </button>

//                   <button
//                     onClick={() => handleDelete(msg._id)}
//                     className="px-3 py-2 bg-red-600 text-white rounded-xl text-sm"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ContactMessages;

import React, { useEffect, useState } from "react";
import {
  deleteContactMessage,
  fetchContactMessages,
  toggleContactReadStatus,
} from "../../services/contactService";
import { Eye, EyeOff, Trash2, Mail } from "lucide-react";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const data = await fetchContactMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load contact messages:", error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (id) => {
    try {
      await toggleContactReadStatus(id);
      loadMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact message?")) return;

    try {
      await deleteContactMessage(id);
      loadMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 w-full">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Contact Messages
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Review and manage all inquiries submitted through the contact form.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-3 w-fit self-start lg:self-auto">
          <Mail className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Total Messages
            </p>
            <p className="font-black text-slate-900 text-lg">
              {messages.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "Sender",
                  "Email",
                  "Subject",
                  "Message",
                  "Date",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-slate-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-16 text-slate-400 font-semibold"
                  >
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="border-b border-slate-100 hover:bg-slate-50/80 transition"
                  >
                    <td className="px-6 py-5 font-bold text-slate-900 whitespace-nowrap">
                      {msg.name}
                    </td>

                    <td className="px-6 py-5 text-slate-600 whitespace-nowrap">
                      {msg.email}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700 break-words">
                      {msg.subject}
                    </td>

                    <td className="px-6 py-5 w-[260px]">
                      <p className="text-slate-500 text-sm leading-relaxed break-words line-clamp-2">
                        {msg.message}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-500 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          msg.isRead
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {msg.isRead ? "Read" : "Unread"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRead(msg._id)}
                          className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          title="Toggle Read Status"
                        >
                          {msg.isRead ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;

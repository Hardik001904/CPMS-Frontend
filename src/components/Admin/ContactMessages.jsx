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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Contact Messages
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Review and manage all inquiries submitted through the contact form.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 w-full sm:w-fit">
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

      {/* Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">{msg.name}</h3>

                <p className="text-sm text-slate-500 break-all">{msg.email}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  msg.isRead
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {msg.isRead ? "Read" : "Unread"}
              </span>
            </div>

            <div>
              <p className="font-semibold text-slate-800">{msg.subject}</p>

              <p className="text-sm text-slate-500 mt-1 line-clamp-3">
                {msg.message}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleRead(msg._id)}
                  className="p-3 rounded-xl bg-blue-50 text-blue-600"
                >
                  {msg.isRead ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => handleDelete(msg._id)}
                  className="p-3 rounded-xl bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[900px]">
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
                    className="px-3 md:px-6 py-4 md:py-5 text-left text-xs font-black uppercase tracking-wider text-slate-500"
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
                    <td className="px-3 md:px-6 py-4 md:py-5 font-bold text-slate-900 whitespace-nowrap">
                      {msg.name}
                    </td>

                    <td className="px-3 md:px-6 py-4 md:py-5 text-slate-600 whitespace-nowrap">
                      {msg.email}
                    </td>

                    <td className="px-3 md:px-6 py-4 md:py-5 font-semibold text-slate-700 break-words">
                      {msg.subject}
                    </td>

                    <td className="px-3 md:px-6 py-4 md:py-5 min-w-[250px] max-w-[350px]">
                      <p className="text-slate-500 text-sm leading-relaxed break-words line-clamp-2">
                        {msg.message}
                      </p>
                    </td>

                    <td className="px-3 md:px-6 py-4 md:py-5 text-slate-500 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-3 md:px-6 py-4 md:py-5">
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

                    {/* <td className="px-3 md:px-6 py-4 md:py-5">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleRead(msg._id)}
                          className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
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
                          className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td> */}
                    <td className="px-3 md:px-6 py-4 md:py-5">
                      <div className="flex items-center justify-center gap-2 min-w-[110px]">
                        <button
                          onClick={() => handleToggleRead(msg._id)}
                          className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
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
                          className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
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

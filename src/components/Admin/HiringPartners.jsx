import React, { useEffect, useState } from "react";
import { MapPin, Trash2, Users, AlertTriangle } from "lucide-react";
import { fetchCompanies, rejectUser } from "../../services/adminService";

export default function HiringPartners() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  /* Debounce search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* Load companies */
  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await fetchCompanies(debouncedSearch);
      setCompanies(data);
    } catch (error) {
      console.log("Failed to fetch companies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, [debouncedSearch]);

  const confirmDelete = async () => {
    try {
      await rejectUser(deleteId);
      setCompanies((prev) => prev.filter((c) => c._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Hiring Partners
        </h3>

        <div className="bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          {companies.length} Companies
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />

          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2 text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      {search && (
        <p className="text-xs text-slate-500">
          {companies.length} result{companies.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-pulse"
            >
              <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-6"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-slate-200 rounded w-1/3 mb-6"></div>
            </div>
          ))}
        </div>
      ) : companies.length > 0 ? (
        /* Company Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c) => (
            <div
              key={c._id}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl group-hover:bg-blue-600 transition-colors">
                  {c.name.charAt(0)}
                </div>

                <button
                  onClick={() => setDeleteId(c._id)}
                  className="text-slate-300 hover:text-rose-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-black text-xl text-slate-900 mb-1">
                {c.name}
              </h4>

              {/* <p className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer mb-2">
                {c.email}
              </p> */}
              <a
                href={`mailto:${c.email}?subject=Regarding Job Application&body=Hello ${c.name},`}
                className="text-sm text-blue-600 hover:underline"
              >
                 {c.email}
              </a>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                {c.profile?.industry || "Technology"}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-3 h-3" />
                  {c.profile?.location || "Global"}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                  <Users className="w-3 h-3" />
                  {c.profile?.size || "Scale: Large"}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400">
          No hiring partners found
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[360px] p-6 text-center animate-[scaleIn_.2s_ease]">
            <div className="flex justify-center mb-4">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-full">
                <AlertTriangle size={20} />
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Delete Company?
            </h3>

            {/* <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete this company? This action cannot
              be undone.
            </p> */}
            <p>
              Deleting this company will also remove all its jobs and
              applications. This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

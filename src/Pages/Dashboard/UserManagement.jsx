import React, { useState } from 'react';
import { ShieldCheck, UserCog, Mail, Search, Edit3, Fingerprint } from 'lucide-react';
import useUsers from "@/hooks/useUsers";
import useSecureAxios from "@/hooks/useSecureAxios";
import { cn } from "@/lib/utils";
import { toast } from 'react-toastify';
import Loading from '../Common/Loading';

const UserManagement = () => {
  const [allUsers, refetch, isLoading] = useUsers();
  const secureAxios = useSecureAxios();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = allUsers.filter(u => 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateUser = async (email, updatedData) => {
    try {
      const res = await secureAxios.put(`/users/${email}`, updatedData);
      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        refetch();
        setSelectedUser(null);
        toast.success("User access updated successfully!");
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-3xl border border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Fingerprint className="text-blue-500" /> User Access Control
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage system roles and feature-based permissions.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 w-full md:w-72 transition-all"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/20 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-6 py-4">Identity</th>
              <th className="px-6 py-4">Role Status</th>
              <th className="px-6 py-4">Privileges</th>
              <th className="px-6 py-4 text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((u) => (
              <tr key={u._id} className="group hover:bg-blue-600/[0.02] transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={u.image || `https://ui-avatars.com/api/?name=${u.name}&background=random`} 
                        className="w-10 h-10 rounded-2xl object-cover border border-white/10 shadow-lg"
                        alt=""
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">{u.name || "Anonymous"}</p>
                      <p className="text-xs text-slate-500 leading-none mt-1">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                    u.role === "SuperAdmin" 
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                      : "bg-slate-800 text-slate-400 border-white/5"
                  )}>
                    {u.role === "SuperAdmin" && <ShieldCheck size={12} />}
                    {u.role || "User"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1.5">
                    {u.permissions?.length > 0 ? (
                      u.permissions.map(p => (
                        <span key={p} className="bg-slate-800/50 text-slate-300 text-[9px] px-2 py-0.5 rounded-md border border-white/5">
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-600 text-[10px] italic font-medium">Standard Access</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => setSelectedUser(u)}
                    className="p-2 bg-slate-800/50 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-inner"
                  >
                    <Edit3 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Access Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <img src={selectedUser.image} className="w-14 h-14 rounded-2xl border-2 border-blue-500/20 shadow-xl" alt="" />
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                  <p className="text-slate-500 text-sm font-medium">{selectedUser.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-slate-500 hover:text-white p-2">✕</button>
            </div>

            <div className="space-y-6">
              {/* Role Select */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Authority Level</label>
                <div className="grid grid-cols-2 gap-3">
                  {['User', 'SuperAdmin'].map(r => (
                    <button
                      key={r}
                      onClick={() => setSelectedUser({...selectedUser, role: r})}
                      className={cn(
                        "py-3 rounded-2xl border font-bold text-sm transition-all",
                        selectedUser.role === r 
                          ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20" 
                          : "bg-slate-800 border-white/5 text-slate-400 hover:border-white/10"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Allowed Modules</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Dashboard', 'LinkToScript', 'ImageToComment', 'Analytics', 'Settings'].map(mod => {
                    const hasPerm = selectedUser.permissions?.includes(mod);
                    return (
                      <button
                        key={mod}
                        onClick={() => {
                          const perms = selectedUser.permissions || [];
                          const updated = hasPerm ? perms.filter(p => p !== mod) : [...perms, mod];
                          setSelectedUser({...selectedUser, permissions: updated});
                        }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-2xl border text-[11px] font-semibold transition-all",
                          hasPerm 
                            ? "bg-green-500/10 border-green-500/30 text-green-400" 
                            : "bg-slate-800/40 border-white/5 text-slate-500 hover:text-slate-300"
                        )}
                      >
                        <div className={cn("w-2 h-2 rounded-full", hasPerm ? "bg-green-500 animate-pulse" : "bg-slate-700")} />
                        {mod}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleUpdateUser(selectedUser.email, {
                role: selectedUser.role,
                permissions: selectedUser.permissions
              })}
              className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition-all shadow-xl shadow-blue-600/20"
            >
              Confirm Access Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
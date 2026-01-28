import React, { useState } from 'react';
import {  Search, Edit3, Fingerprint, X } from 'lucide-react';
import useSecureAxios from "@/hooks/useSecureAxios";
import { cn } from "@/lib/utils";
import Loading from '../Common/Loading';
import useUsers from '@/hooks/useUsers';

const UserManagement = () => {
  const [allUsers, refetch, isLoading] = useUsers();
  const secureAxios = useSecureAxios();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(allUsers)
  const filteredUsers = allUsers?.filter(u => 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateUser = async () => {
    try {
      const { email, role, permissions } = selectedUser;
      const res = await secureAxios.put(`/users/${email}`, { role, permissions });
      
      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        refetch();
        setSelectedUser(null);
        alert("Access updated successfully!");
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/50 p-6 rounded-[2rem] border border-white/5 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Fingerprint className="text-blue-500" /> System Access
          </h2>
          <p className="text-slate-500 text-sm">Control user roles and page visibility</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/30 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-widest font-black">
              <th className="px-8 py-5">User Profile</th>
              <th className="px-8 py-5">System Role</th>
              <th className="px-8 py-5">Modules Allowed</th>
              <th className="px-8 py-5 text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((u) => (
              <tr key={u._id} className="hover:bg-blue-600/[0.03] transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img src={u.image || `https://ui-avatars.com/api/?name=${u.name}`} className="w-11 h-11 rounded-2xl object-cover border border-white/10" alt="" />
                    <div>
                      <p className="text-sm font-bold text-white tracking-tight">{u.name || "N/A"}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border",
                    u.role === "superAdmin" ? "bg-blue-600/10 text-blue-400 border-blue-500/20" : "bg-slate-800 text-slate-400 border-white/5"
                  )}>
                    {u.role || "user"}
                  </span>
                </td>
                <td className="px-8 py-5">
                   <div className="flex flex-wrap gap-1">
                      {u.permissions?.map(p => (
                        <span key={p} className="bg-slate-800/80 text-slate-400 text-[9px] px-2 py-0.5 rounded border border-white/5">{p}</span>
                      )) || <span className="text-slate-600 text-[10px] italic">No Extra Perms</span>}
                   </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={() => setSelectedUser(u)}
                    className="p-2.5 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg"
                  >
                    <Edit3 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modern Slide-up Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Edit Privileges</h3>
              <button onClick={() => setSelectedUser(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Role Select */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Role Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['user', 'superAdmin'].map(r => (
                    <button
                      key={r}
                      onClick={() => setSelectedUser({...selectedUser, role: r})}
                      className={cn(
                        "py-3 rounded-2xl border font-bold text-sm transition-all capitalize",
                        selectedUser.role === r ? "bg-blue-600 border-blue-400 text-white" : "bg-slate-800 border-white/5 text-slate-400"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Permissions */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Page Access</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Dashboard', 'LinkToScript', 'ReplyGen', 'Analytics', 'Users'].map(mod => {
                    const isChecked = selectedUser.permissions?.includes(mod);
                    return (
                      <button
                        key={mod}
                        onClick={() => {
                          const current = selectedUser.permissions || [];
                          const updated = isChecked ? current.filter(p => p !== mod) : [...current, mod];
                          setSelectedUser({...selectedUser, permissions: updated});
                        }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border text-[11px] font-semibold transition-all",
                          isChecked ? "bg-blue-600/10 border-blue-600/30 text-blue-400" : "bg-slate-800/50 border-white/5 text-slate-500"
                        )}
                      >
                        <div className={cn("w-2 h-2 rounded-full", isChecked ? "bg-blue-500" : "bg-slate-700")} />
                        {mod}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button 
                onClick={handleUpdateUser}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 transition-all active:scale-95"
              >
                Update Access Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
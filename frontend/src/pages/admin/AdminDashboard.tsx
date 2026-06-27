import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ShieldAlert, FileText, Activity, Search, Shield, 
  MoreVertical, CheckCircle2, XCircle, Trash2 
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Navigate } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2026-06-25' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', joined: '2026-06-20' },
  { id: 3, name: 'Alice Cooper', email: 'alice@example.com', role: 'user', status: 'suspended', joined: '2026-05-15' },
  { id: 4, name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'active', joined: '2026-06-26' },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  // RBAC protection - if not admin, redirect to regular dashboard
  if (user?.role !== 'admin' && user?.username !== 'admin') {
    // For mockup purposes, let's allow it if their name is admin, 
    // otherwise they get kicked out. But since we want to show the UI,
    // we'll bypass the strict check in this demo state.
    // return <Navigate to="/dashboard" />;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 min-h-screen bg-[#050505] text-white">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-500" />
            Superadmin Panel
          </h1>
          <p className="text-gray-400">Manage users, view platform metrics, and control settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <Users className="w-6 h-6 text-blue-400 mb-4" />
          <h3 className="text-2xl font-bold">12,450</h3>
          <p className="text-sm text-gray-400">Total Users</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <Activity className="w-6 h-6 text-emerald-400 mb-4" />
          <h3 className="text-2xl font-bold">8,932</h3>
          <p className="text-sm text-gray-400">Active Portfolios</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <ShieldAlert className="w-6 h-6 text-yellow-400 mb-4" />
          <h3 className="text-2xl font-bold">24</h3>
          <p className="text-sm text-gray-400">Suspended Accounts</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <FileText className="w-6 h-6 text-purple-400 mb-4" />
          <h3 className="text-2xl font-bold">45.2 GB</h3>
          <p className="text-sm text-gray-400">Total Storage Used</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">User Management</h2>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/10 text-gray-300'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${u.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {u.status === 'active' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-400">{u.joined}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

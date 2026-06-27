import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Download, Trash2, Key } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 min-h-screen text-white pb-12">
      <div>
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <SettingsIcon className="w-7 h-7 text-gray-400" />
          Settings
        </h1>
        <p className="text-gray-400">Manage your account preferences, security, and data.</p>
      </div>

      <div className="space-y-6">
        {/* Security Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Security</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white mb-1">Change Password</h3>
                <p className="text-sm text-gray-400">Update your password to keep your account secure.</p>
              </div>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                <Key className="w-4 h-4" /> Update
              </button>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white mb-1">Email Notifications</h3>
                <p className="text-sm text-gray-400">Receive emails when someone contacts you.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Data Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <Download className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold">Data & Privacy</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white mb-1">Export Data</h3>
                <p className="text-sm text-gray-400">Download all your portfolio data in JSON format.</p>
              </div>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="border border-red-500/30 bg-red-500/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-red-500/20">
            <h2 className="text-lg font-bold text-red-500">Danger Zone</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white mb-1">Delete Account</h3>
                <p className="text-sm text-gray-400">Permanently delete your account and all data.</p>
              </div>
              <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

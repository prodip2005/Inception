import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaUsers, FaGraduationCap, FaProjectDiagram } from 'react-icons/fa';

const Dashboard = () => {
    // ডামি স্ট্যাটাস ডাটা
    const stats = [
        { id: 1, label: 'TOTAL_PERSONNEL', value: '25', icon: <FaUsers />, color: 'from-red-900/20' },
        { id: 2, label: 'AFFILIATIONS', value: '18', icon: <FaGraduationCap />, color: 'from-slate-900/40' },
        { id: 3, label: 'ACTIVE_PROJECTS', value: '12', icon: <FaProjectDiagram />, color: 'from-red-900/20' },
        { id: 4, label: 'DATA_POINTS', value: '1.2k', icon: <FaDatabase />, color: 'from-slate-900/40' },
    ];

    return (
        <div className="min-h-screen bg-transparent pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER SECTION --- */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="border-l-4 border-[#8a0001] pl-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                            COMMAND<span className="text-[#8a0001]">_</span>CENTER
                        </h1>
                        <p className="text-slate-500 font-mono text-xs mt-2 tracking-widest uppercase">
                            // SYSTEM_STATUS: OPERATIONAL | SECTOR: ALPHA_NULL
                        </p>
                    </div>
                    <div className="text-right font-mono text-[10px] text-slate-500">
                        <span>LAST_SYNC: {new Date().toLocaleTimeString()}</span>
                    </div>
                </header>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-6 bg-gradient-to-br ${stat.color} to-transparent border border-white/5 rounded-3xl overflow-hidden group hover:border-[#8a0001]/50 transition-all`}
                        >
                            <div className="text-[#8a0001] text-xl mb-4 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-[10px] font-mono text-slate-500 tracking-wider">{stat.label}</div>
                            {/* Background Glow */}
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#8a0001]/10 blur-2xl rounded-full"></div>
                        </motion.div>
                    ))}
                </div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Activity Feed (Left) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-[#8a0001] rounded-full animate-pulse"></span>
                                LIVE_ACTIVITY_STREAM
                            </h3>

                            <div className="space-y-6">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[#8a0001] font-mono text-xs">
                                            0{item}
                                        </div>
                                        <div>
                                            <p className="text-slate-300 text-sm">
                                                New personnel <span className="text-white font-bold underline decoration-[#8a0001]/40">authorized</span> for Sector 7G.
                                            </p>
                                            <span className="text-[10px] font-mono text-slate-600 uppercase mt-1 block tracking-widest">
                                                // TIMESTAMP: 12:4{item} PM
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* System Logs (Right) */}
                    <div className="space-y-6">
                        <div className="p-6 bg-[#8a0001]/5 border border-[#8a0001]/20 rounded-[2.5rem]">
                            <h3 className="text-xs font-mono text-[#8a0001] mb-4 tracking-[0.3em] uppercase">Security_Logs</h3>
                            <div className="font-mono text-[10px] space-y-2 text-slate-500">
                                <p className="text-green-900/80">&gt; Firewall: Active</p>
                                <p className="text-green-900/80">&gt; Encryption: AES_256</p>
                                <p className="text-red-900/80">&gt; Alert: Unauthorized access attempt (Blocked)</p>
                                <p className="animate-pulse">&gt; _Root: Listening...</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col gap-3">
                            <button className="w-full py-3 bg-[#8a0001] text-white font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-[#a00001] transition-all shadow-lg shadow-[#8a0001]/20">
                                Download_Report
                            </button>
                            <button className="w-full py-3 bg-white/5 text-slate-400 font-mono text-xs uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                System_Sync
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
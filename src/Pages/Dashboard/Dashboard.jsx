import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUsers, FaGraduationCap, FaCalendarPlus, FaUserCheck, FaDatabase, FaCogs, FaThLarge, FaSignOutAlt,
    FaUser
} from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router';

const Dashboard = () => {
    const location = useLocation();

    // মেনু আইটেমগুলো আপনার রাউটার পাথ অনুযায়ী সেট করা হয়েছে
    const menuItems = [
        { id: 1, label: 'Overview', icon: <FaThLarge />, path: '/admin' },
        { id: 2, label: 'Add Events', icon: <FaCalendarPlus />, path: '/admin/add-events' },
        { id: 3, label: 'Add Peoples', icon: <FaUsers />, path: '/admin/add-peoples' },
        { id: 4, label: 'Add Institutions', icon: <FaGraduationCap />, path: '/admin/add-institutions' },
        { id: 5, label: 'All Members', icon: <FaUser />, path: '/admin/all-members' },
        { id: 6, label: 'Requests', icon: <FaUserCheck />, path: '/admin/requested-members', alert: true },
        { id: 7, label: 'Edit', icon: <FaCogs />, path: '/admin/edit' },
    ];

    return (
        <div className="flex min-h-screen bg-[#020617] overflow-hidden">

            {/* --- SIDEBAR (Left) --- */}
            <aside className="w-20 md:w-72 bg-white/[0.01] border-r border-white/5 flex flex-col h-screen sticky top-0 transition-all duration-300 backdrop-blur-3xl z-50">
                <div className="p-6 mb-8">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#d22f27] rounded flex items-center justify-center text-white shadow-[0_0_15px_rgba(138,0,1,0.5)]">
                            <FaDatabase size={12} />
                        </div>
                        <h2 className="hidden md:block font-black text-white tracking-tighter text-xl italic uppercase underline decoration-[#d22f27]">
                            Inception<span className="text-[#d22f27]">_</span>
                        </h2>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 w-full rounded-xl transition-all group relative ${isActive
                                    ? 'bg-[#d22f27]/10 text-white border border-[#d22f27]/20'
                                    : 'text-slate-500 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-[#d22f27]' : 'group-hover:text-[#d22f27]'} transition-colors`}>
                                    {item.icon}
                                </span>
                                <span className="hidden md:block font-mono text-[10px] font-bold uppercase tracking-widest text-left">
                                    {item.label}
                                </span>
                                {item.alert && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#d22f27] rounded-full animate-pulse shadow-[0_0_8px_#d22f27]"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center gap-4 px-4 py-3 w-full text-slate-600 hover:text-red-500 transition-colors font-mono text-[10px] uppercase tracking-widest">
                        <FaSignOutAlt />
                        <span className="hidden md:block">Terminate_Session</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT (Middle/Right) --- */}
            <main className="flex-1 overflow-y-auto scrollbar-hide">
                {/* Top Floating Bar (Optional) */}
                <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 md:px-12 sticky top-0 bg-[#020617]/50 backdrop-blur-md z-40">
                    <div className="font-mono text-[10px] text-slate-500 tracking-[0.3em] uppercase">
                        // Admin_Dashboard // {location.pathname.replace('/', ' > ')}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-[1px] bg-white/10"></div>
                        <div className="text-[10px] font-mono text-[#d22f27] animate-pulse">SYSTEM_LIVE</div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto pt-12 pb-12 px-6 md:px-12">
                    {/* Dynamic Header based on Route */}
                    <header className="mb-12 border-l-4 border-[#d22f27] pl-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                            {location.pathname === '/admin' ? 'OVERVIEW' : location.pathname.split('/').pop().replace('-', '_')}
                            <span className="text-[#d22f27]">_</span>
                        </h1>
                    </header>

                    {/* ৩. এটিই গুরুত্বপূর্ণ: এখানে আপনার Children রাউটগুলো লোড হবে */}
                    <div className="relative min-h-[400px]">
                        <Outlet />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
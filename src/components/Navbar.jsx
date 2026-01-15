import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
    FaHome, FaUsers, FaCalendarAlt, FaEnvelope, FaUserPlus,
    FaBars, FaTimes, FaUserShield, FaSignOutAlt
} from 'react-icons/fa';
import { PiFlagBanner } from 'react-icons/pi';

import LogoImg from '../assets/455696229_122100145196476234_1453378197231718222_n-removebg-preview.png';
import { auth } from '../firebase/firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import useAxios from '../hooks/useAxios'; // আপনার কাস্টম হুক

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // অ্যাডমিন স্টেট
    const axiosSecure = useAxios();

    // ফায়ারবেস অথ এবং ডাটাবেজ রোল চেক
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    // ব্যাকএন্ড থেকে চেক করা হচ্ছে সে অ্যাডমিন কিনা
                    const res = await axiosSecure.get(`/admins/check/${currentUser.email}`);
                    setIsAdmin(res.data.isAdmin);
                } catch (error) {
                    console.error("Admin check failed", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, [axiosSecure]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            setIsAdmin(false);
        }).catch((error) => console.error(error));
    };

    const navItems = [
        { icon: <FaHome />, label: 'Home', link: '/' },
        { icon: <PiFlagBanner />, label: 'Mission', link: '/#mission' },
        { icon: <FaCalendarAlt />, label: 'Events', link: '/#events' },
        { icon: <FaUsers />, label: 'Network', link: '/#members' },
        { icon: <FaEnvelope />, label: 'Contact', link: '/#contact' },
    ];

    return (
        <>
            {/* --- ১. ল্যাপটপ ন্যাভবার --- */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6">
                <nav className="flex flex-col items-center gap-4 p-4 bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-full hover:border-[#3b82f6]/30 transition-all duration-500 group/nav shadow-2xl">
                    <Link to="/" className="w-16 h-16 flex items-center justify-center bg-white/[0.02] rounded-full mb-2 border border-white/5">
                        <img src={LogoImg} alt="Logo" className="w-12 h-12 object-contain" />
                    </Link>

                    <div className="flex flex-col gap-1">
                        {navItems.map((item, index) => (
                            <div key={index} className="group relative flex items-center">
                                <a href={item.link} className="p-4 text-gray-500 hover:text-white transition-all rounded-full inline-block">
                                    <span className="text-xl">{item.icon}</span>
                                </a>
                                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-[#3b82f6] text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-widest whitespace-nowrap z-[60]">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* --- শর্তসাপেক্ষ অ্যাডমিন বাটন (শুধুমাত্র isAdmin true হলে দেখাবে) --- */}
                    {isAdmin && (
                        <div className="pt-2 border-t border-white/10 w-full flex flex-col items-center mt-2 gap-2">
                            <Link to="/admin" className="group relative flex flex-col items-center justify-center p-4 rounded-full text-amber-500 hover:text-amber-300 transition-all duration-300">
                                <div className="absolute inset-0 bg-amber-500/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 blur-sm"></div>
                                <FaUserShield className="text-xl relative z-10" />
                                <span className="mt-1 text-[7px] font-black uppercase tracking-tighter text-amber-500/80">
                                    {user?.displayName?.split(' ')[0]}
                                </span>
                                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-amber-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-widest whitespace-nowrap z-[60]">
                                    ADMIN_DASHBOARD
                                </span>
                            </Link>
                            <button onClick={handleLogout} title="Logout" className="p-3 text-red-500/50 hover:text-red-500 transition-colors">
                                <FaSignOutAlt size={14} />
                            </button>
                        </div>
                    )}
                </nav>

                {/* জয়েন বাটন (অ্যাডমিন থাকলে লুকানো যেতে পারে, অথবা রাখা যেতে পারে) */}
                {!isAdmin && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: 5, scale: 1.05 }}>
                        <Link to="/join" className="group relative flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white/[0.08] backdrop-blur-3xl rounded-2xl flex items-center justify-center border border-white/30 transition-all group-hover:bg-[#af0f14]">
                                <FaUserPlus className="text-xl text-white" />
                            </div>
                            <span className="text-[12px] font-black uppercase text-white">Join Now</span>
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* --- ২. মোবাইল ন্যাভবার --- */}
            <div className="fixed top-0 left-0 w-full z-[60] md:hidden bg-[#020617]/90 backdrop-blur-2xl border-b border-white/5 px-5 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img src={LogoImg} alt="Logo" className="w-10 h-10 object-contain" />
                    <span className="text-white font-black text-lg uppercase italic">INCEPTION<span className="text-[#22d3ee]">_</span></span>
                </Link>
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2.5 bg-white/5 rounded-xl border border-white/10">
                        {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                </div>
            </div>

            {/* মোবাইল মেনু */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-[68px] left-0 w-full bg-[#020617]/98 backdrop-blur-3xl z-[55] md:hidden border-b border-[#22d3ee]/20">
                        <div className="grid grid-cols-2 gap-3 p-6 pt-8">
                            {navItems.map((item, index) => (
                                <a key={index} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                    <span className="text-[#22d3ee] text-lg">{item.icon}</span>
                                    <span className="text-white text-[10px] font-bold uppercase">{item.label}</span>
                                </a>
                            ))}
                        </div>

                        <div className="px-6 pb-10">
                            {isAdmin ? (
                                <div className="flex flex-col gap-3">
                                    <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                                        <FaUserShield className="text-amber-500" />
                                        <span className="text-amber-500 text-[11px] font-black uppercase">Admin Dashboard</span>
                                    </Link>
                                    <button onClick={handleLogout} className="text-red-500 text-[10px] font-bold uppercase py-2">Terminate_Session</button>
                                </div>
                            ) : (
                                <Link to="/join" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-3 p-4 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-2xl text-white font-bold uppercase text-[11px]">
                                    <FaUserPlus /> Join Movement
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
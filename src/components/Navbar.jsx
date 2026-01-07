import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { FaHome, FaUsers, FaCalendarAlt, FaEnvelope, FaLayerGroup, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import LogoImg from '../assets/455696229_122100145196476234_1453378197231718222_n-removebg-preview.png';
import { PiFlagBanner } from 'react-icons/pi';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: <FaHome />, label: 'Home', link: '/' },
        { icon: <PiFlagBanner />, label: 'Mission', link: '/#mission' },
        { icon: <FaCalendarAlt />, label: 'Events', link: '/#events' },
        { icon: <FaUsers />, label: 'Members', link: '/#members' },
        { icon: <FaLayerGroup />, label: 'About', link: '/#about' },
        { icon: <FaEnvelope />, label: 'Contact', link: '/#contact' },
    ];

    return (
        <>
            {/* --- ১. ল্যাপটপ/ডেস্কটপ ন্যাভবার --- */}
            <div className="fixed left-6 top-3/7 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
                <nav className="flex flex-col items-center gap-4 p-4 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-full transition-all duration-500 hover:border-[#af0f14]/30 relative z-10 shadow-none group/nav">
                    <Link to="/" className="w-16 h-16 flex items-center justify-center bg-white/[0.02] group-hover/nav:bg-white/5 rounded-full mb-2 overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#af0f14]/40">
                        <img src={LogoImg} alt="Logo" className="w-15 h-15 object-contain transition-transform duration-500 hover:scale-110" />
                    </Link>

                    <div className="flex flex-col gap-1">
                        {navItems.map((item, index) => (
                            <div key={index} className="group relative flex items-center">
                                <a href={item.link} className="p-4 text-gray-500 hover:text-white transition-all duration-300 rounded-full inline-block">
                                    <span className="text-xl">{item.icon}</span>
                                </a>
                                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-300 origin-left bg-[#af0f14] text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-widest shadow-xl whitespace-nowrap">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </nav>

                <div className="relative -mt-2 w-full h-12 flex justify-center pointer-events-none">
                    <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                        <path d="M10 0C10 25 50 25 50 0" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                        <path d="M30 20V50" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                </div>

                {/* ল্যাপটপ জয়েন বাটন: Neon & Glass Effect with Hover Fill */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} whileHover={{ y: 5, scale: 1.05 }}>
                    <Link to="/#join" className="group relative flex flex-col items-center gap-2 -mt-2 cursor-pointer">
                        <div className="relative">
                            {/* বাইরের নিয়ন গ্লো (ডিফল্ট নীল রাখা হয়েছে, চাইলে #af0f14 করতে পারেন) */}
                            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-[#3b82f6] blur-[25px] rounded-2xl group-hover:bg-[#af0f14] transition-colors duration-500"></motion.div>

                            <div className="w-14 h-14 bg-white/[0.08] backdrop-blur-3xl rounded-2xl flex items-center justify-center border border-white/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover:bg-[#af0f14] group-hover:border-[#af0f14] group-hover:shadow-[0_0_30px_#af0f14] z-10 relative overflow-hidden">
                                <FaUserPlus className="text-xl text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />

                                {/* গ্লাস শিমার ইফেক্ট */}
                                <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"></motion.div>
                            </div>
                        </div>

                        <div className="relative flex flex-col items-center">
                            <span className="relative text-[12px] font-black uppercase tracking-[0.25em] font-mono text-white transition-all duration-300 group-hover:text-[#af0f14] group-hover:drop-shadow-[0_0_8px_#af0f14]">
                                Join Now
                            </span>

                            {/* নিচের লাইনের এনিমেশন: হোভারে উইডথ এবং গ্লো বাড়বে */}
                            <div className="relative w-8 h-[2px] bg-[#3b82f6] mt-1 overflow-hidden transition-all duration-500 group-hover:w-full group-hover:bg-[#af0f14] group-hover:shadow-[0_0_15px_#af0f14] rounded-full">
                                <motion.div
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-white/60"
                                ></motion.div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* --- ২. মোবাইল ন্যাভবার --- */}
            <div className="fixed top-0 left-0 w-full z-[60] md:hidden bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/10 px-5 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img src={LogoImg} alt="Logo" className="w-10 h-10 object-contain" />
                    <span className="text-white font-black tracking-tighter text-lg uppercase italic">INCEPTION<span className="text-[#af0f14]">_</span></span>
                </Link>

                <div className="flex items-center gap-3">
                    {/* মোবাইল জয়েন বাটন: Neon & Glass */}
                    <Link to="/#join" className="relative group">
                        <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-[#af0f14] blur-lg rounded-xl"></motion.div>
                        <div className="relative w-11 h-11 bg-white/[0.1] backdrop-blur-xl border border-white/40 rounded-xl flex items-center justify-center z-10 shadow-[0_0_15px_rgba(175,15,20,0.5)] overflow-hidden">
                            <FaUserPlus className="text-white text-sm" />
                            <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></motion.div>
                        </div>
                    </Link>

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2.5 bg-white/5 rounded-xl border border-white/10 active:scale-90 transition-transform">
                        {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                </div>
            </div>

            {/* মোবাইল মেনু কন্টেন্ট */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-[68px] left-0 w-full h-auto bg-[#0a0a0a]/95 backdrop-blur-3xl z-[55] md:hidden border-b border-[#af0f14]/20 shadow-2xl">
                        <div className="grid grid-cols-2 gap-3 p-6 pb-12">
                            {navItems.map((item, index) => (
                                <a key={index} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl active:bg-[#af0f14]/20 transition-all border-l-2 border-l-transparent active:border-l-[#af0f14]">
                                    <span className="text-[#af0f14] text-lg">{item.icon}</span>
                                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
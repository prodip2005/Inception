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
            {/* ল্যাপটপ ন্যাভবার */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
                <nav className="flex flex-col items-center gap-4 p-4 bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-full hover:border-[#3b82f6]/30 transition-all duration-500 group/nav">
                    <Link to="/" className="w-16 h-16 flex items-center justify-center bg-white/[0.02] rounded-full mb-2 border border-white/5 transition-all hover:border-[#22d3ee]/40">
                        <img src={LogoImg} alt="Logo" className="w-12 h-12 object-contain" />
                    </Link>
                    <div className="flex flex-col gap-1">
                        {navItems.map((item, index) => (
                            <div key={index} className="group relative flex items-center">
                                <a href={item.link} className="p-4 text-gray-500 hover:text-white transition-all rounded-full inline-block">
                                    <span className="text-xl">{item.icon}</span>
                                </a>
                                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-[#3b82f6] text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-widest whitespace-nowrap">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </nav>

                {/* জয়েন বাটন ল্যাপটপ */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: 5, scale: 1.05 }}>
                    <Link to="/#join" className="group relative flex flex-col items-center gap-2 mt-4 cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#3b82f6] blur-[20px] rounded-2xl group-hover:bg-[#af0f14] transition-colors duration-500 opacity-50"></div>
                            <div className="w-14 h-14 bg-white/[0.08] backdrop-blur-3xl rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-500 group-hover:bg-[#af0f14] group-hover:border-[#af0f14] z-10 relative overflow-hidden">
                                <FaUserPlus className="text-xl text-white group-hover:rotate-6 transition-all" />
                                <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"></motion.div>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center">
                            <span className="text-[12px] font-black uppercase text-white group-hover:text-[#af0f14] transition-all">Join Now</span>
                            <div className="w-8 h-[2px] bg-[#3b82f6] mt-1 group-hover:w-full group-hover:bg-[#af0f14] transition-all duration-500"></div>
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* মোবাইল ন্যাভবার */}
            <div className="fixed top-0 left-0 w-full z-[60] md:hidden bg-[#020617]/90 backdrop-blur-2xl border-b border-white/5 px-5 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img src={LogoImg} alt="Logo" className="w-10 h-10 object-contain" />
                    <span className="text-white font-black text-lg uppercase italic">INCEPTION<span className="text-[#22d3ee]">_</span></span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/#join" className="relative group">
                        <div className="absolute inset-0 bg-[#3b82f6] blur-lg rounded-xl opacity-40"></div>
                        <div className="relative w-11 h-11 bg-white/[0.1] border border-white/30 rounded-xl flex items-center justify-center z-10 active:bg-[#af0f14] transition-all">
                            <FaUserPlus className="text-white text-sm" />
                        </div>
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2.5 bg-white/5 rounded-xl border border-white/10">
                        {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </button>
                </div>
            </div>

            {/* মোবাইল মেনু */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-[68px] left-0 w-full bg-[#020617]/95 backdrop-blur-3xl z-[55] md:hidden border-b border-[#22d3ee]/20">
                        <div className="grid grid-cols-2 gap-3 p-6 pb-12">
                            {navItems.map((item, index) => (
                                <a key={index} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl active:bg-[#3b82f6]/20 transition-all">
                                    <span className="text-[#22d3ee] text-lg">{item.icon}</span>
                                    <span className="text-white text-[10px] font-bold uppercase">{item.label}</span>
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
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; // Link ইম্পোর্ট করা হয়েছে
import { FaHome, FaUsers, FaCalendarAlt, FaEnvelope, FaLayerGroup, FaUserPlus } from 'react-icons/fa';
import LogoImg from '../assets/455696229_122100145196476234_1453378197231718222_n-removebg-preview.png';
import { PiFlagBanner } from 'react-icons/pi';

const Navbar = () => {
    // লিঙ্কগুলোর আগে / যোগ করা হয়েছে যাতে অন্য পেজ থেকে কাজ করে
    const navItems = [
        { icon: <FaHome />, label: 'Home', link: '/' },
        { icon: <PiFlagBanner />, label: 'Mission', link: '/#mission' },
        { icon: <FaCalendarAlt />, label: 'Events', link: '/#events' },
        { icon: <FaUsers />, label: 'Members', link: '/#members' },
        { icon: <FaLayerGroup />, label: 'About', link: '/#about' },
        { icon: <FaEnvelope />, label: 'Contact', link: '/#contact' },
    ];

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center">

            {/* Main Navbar Capsule */}
            <nav className="flex flex-col items-center gap-4 p-4 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-full transition-all duration-500 hover:border-[#8a0001]/30 relative z-10 shadow-none group/nav">

                {/* ব্র্যান্ড লোগো */}
                <Link to="/" className="w-16 h-16 flex items-center justify-center bg-white/[0.02] group-hover/nav:bg-white/5 rounded-full mb-2 overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#8a0001]/40">
                    <img
                        src={LogoImg}
                        alt="Inception Logo"
                        className="w-15 h-15 object-contain transition-transform duration-500 hover:scale-110"
                    />
                </Link>

                <div className="flex flex-col gap-1">
                    {navItems.map((item, index) => (
                        <div key={index} className="group relative flex items-center">
                            {/* <a> এর বদলে <Link> ব্যবহার করা হয়েছে */}
                            <a
                                href={item.link}
                                className="p-4 text-gray-500 hover:text-white transition-all duration-300 rounded-full inline-block"
                            >
                                <span className="text-xl">{item.icon}</span>
                            </a>
                            <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-300 origin-left bg-[#8a0001] text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-widest shadow-xl whitespace-nowrap">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Parabola Connector */}
            <div className="relative -mt-2 w-full h-12 flex justify-center pointer-events-none">
                <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                    <path d="M10 0C10 25 50 25 50 0" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M30 20V50" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
            </div>

            {/* Floating Join Now Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                whileHover={{ y: 5, scale: 1.05 }}
            >
                <Link to="/#join" className="group relative flex flex-col items-center gap-2 -mt-2 cursor-pointer">
                    <div className="relative">
                        <motion.div
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-[#8a0001] blur-[30px] rounded-full"
                        ></motion.div>

                        <div className="w-14 h-14 bg-white/[0.05] backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/20 transition-all duration-500 group-hover:bg-[#8a0001] group-hover:border-[#8a0001] group-hover:shadow-[0_0_50px_rgba(138,0,1,0.9),inset_0_0_20px_rgba(255,255,255,0.3)] z-10 relative overflow-hidden">
                            <FaUserPlus className="text-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-2xl" />
                            <motion.div
                                animate={{ x: ['-150%', '150%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            ></motion.div>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center">
                        <span className="relative text-[12px] font-black uppercase tracking-[0.25em] font-mono transition-all duration-500 text-white group-hover:tracking-[0.4em]">
                            <span className="absolute inset-0 text-[#8a0001]  blur-[15px] opacity-80 group-hover:opacity-100 transition-opacity">
                                Join Now
                            </span>
                            <span className="relative z-10 drop-shadow-[0_0_10px_rgba(138,0,1,1)]">
                                Join Now
                            </span>
                        </span>
                        <motion.div
                            animate={{
                                width: ['20%', '100%', '20%'],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="h-[2px] bg-[#8a0001] mt-1 shadow-[0_0_15px_#8a0001] rounded-full group-hover:bg-white"
                        ></motion.div>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
};

export default Navbar;
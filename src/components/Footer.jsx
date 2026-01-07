import React from 'react';
import { FaFacebookF, FaDiscord, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaXTwitter } from 'react-icons/fa6';
import LogoImg from '../assets/455696229_122100145196476234_1453378197231718222_n-removebg-preview.png';

const Footer = () => {
    const socialLinks = [
        { icon: <FaFacebookF />, link: '#' },
        { icon: <FaXTwitter />, link: '#' },
        { icon: <FaDiscord />, link: '#' },
        { icon: <FaLinkedinIn />, link: '#' },
    ];

    return (
        // ১. কালার এখন Deep Navy Black (#020617) যা আপনার নতুন ব্যাকগ্রাউন্ডের সাথে পারফেক্ট ম্যাচ করবে
        <footer className="relative z-10 w-full py-16 px-8 bg-[#020617]/90 backdrop-blur-2xl border-t border-white/5">

            {/* টপ অ্যানিমেটেড গ্রাডিয়েন্ট বর্ডার লাইন (এখন Cyan/Blue Glow) */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>

            <div className="max-w-7xl mx-auto md:pl-28">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">

                    {/* ব্র্যান্ড সেকশন */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 group cursor-default">
                        <div className="relative">
                            <img
                                src={LogoImg}
                                alt="Inception Logo"
                                className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* লোগোর পেছনে ব্লু আভা */}
                            <div className="absolute inset-0 bg-[#22d3ee]/10 blur-2xl rounded-full -z-10"></div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start">
                            <h2 className="text-4xl font-black tracking-tighter text-white">
                                INCEPTION<span className="text-[#22d3ee] drop-shadow-[0_0_10px_#22d3ee]">.</span>
                            </h2>
                            <div className="h-0.5 w-full bg-gradient-to-r from-[#22d3ee] via-[#3b82f6]/50 to-transparent mt-1"></div>
                            <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] mt-3 font-bold">
                                Innovation Society
                            </p>
                        </div>
                    </div>

                    {/* সোশ্যাল আইকনস - এখন ব্লু থিমে */}
                    <div className="flex gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 group overflow-hidden"
                            >
                                {/* হোভার করলে সাইয়ান গ্লাস ইফেক্ট */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-[#22d3ee]/20 to-transparent"></div>
                                <span className="relative z-10 text-xl group-hover:text-white group-hover:drop-shadow-[0_0_10px_#22d3ee]">
                                    {social.icon}
                                </span>
                            </motion.a>
                        ))}
                    </div>

                    {/* কপিরাইট ও লোকেশন */}
                    <div className="flex flex-col items-center md:items-end gap-3 text-[10px] tracking-[0.2em] uppercase font-bold text-gray-500">
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <FaMapMarkerAlt className="text-[#22d3ee] text-xl shadow-blue-500" />
                            <span className="text-[13px] font-medium tracking-wider">
                                Nabinagar, Brahmanbaria
                            </span>
                        </div>
                        <p className="opacity-40">© 2026 INCEPTION • ALL RIGHTS RESERVED</p>
                    </div>
                </div>
            </div>

            {/* বটম শিমার লাইন */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden opacity-30">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent animate-shimmer"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 4s infinite linear;
                }
            `}} />
        </footer>
    );
};

export default Footer;
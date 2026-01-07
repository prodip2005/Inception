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
        <footer className="relative z-10 md:ml-28 py-16 px-8 bg-[#08062b]/80 backdrop-blur-xl">

            {/* টপ অ্যানিমেটেড গ্রাডিয়েন্ট বর্ডার লাইন */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8a0001] to-transparent shadow-[0_0_15px_#8a0001]"></div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">

                    {/* ব্র্যান্ড সেকশন */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 group cursor-default">
                        <div className="relative">
                            <img
                                src={LogoImg}
                                alt="Inception Logo"
                                className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_12px_rgba(138,0,1,0.6)] group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-[#8a0001]/15 blur-2xl rounded-full -z-10"></div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start">
                            <h2 className="text-4xl font-black tracking-tighter text-white">
                                INCEPTION<span className="text-[#8a0001] drop-shadow-[0_0_10px_#8a0001]">.</span>
                            </h2>
                            <div className="h-0.5 w-full bg-gradient-to-r from-[#8a0001] via-[#8a0001]/50 to-transparent mt-1 shadow-[0_0_15px_#8a0001]"></div>
                            <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mt-3 font-bold">
                                Innovation Society
                            </p>
                        </div>
                    </div>

                    {/* সোশ্যাল আইকনস */}
                    <div className="flex gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                whileHover={{ y: -5, scale: 1.05 }}
                                transition={{ duration: 0.1 }}
                                className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-75 group"
                            >
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-75 border-[1.5px] border-[#8a0001] bg-[#8a0001]/10 shadow-[inset_0_0_10px_#8a0001]"></div>
                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-75 shadow-[0_0_20px_#8a0001,0_0_40px_rgba(138,0,1,0.4)]"></div>
                                <span className="relative z-10 text-xl group-hover:text-white group-hover:drop-shadow-[0_0_10px_#ffffff] transition-all duration-75">
                                    {social.icon}
                                </span>
                            </motion.a>
                        ))}
                    </div>

                    {/* কপিরাইট */}
                    <div className="flex flex-col items-center md:items-end gap-3 text-[10px] tracking-[0.2em] uppercase font-bold text-gray-500">
                        <div className="flex items-center gap-2 mt-3 text-gray-400 group/loc hover:text-white transition-colors duration-300">
                            <FaMapMarkerAlt className="text-[#8a0001] text-xl" />
                            <span className="text-[13px] font-medium tracking-wider">
                                Nabinagar, Brahmanbaria
                            </span>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-[#8a0001] transition-all duration-150">Privacy</a>
                            <a href="#" className="hover:text-[#8a0001] transition-all duration-150">Terms</a>
                        </div>
                        <p className="opacity-30">© 2026 INCEPTION • ALL RIGHTS RESERVED</p>
                    </div>
                </div>
            </div>

            {/* বটম অ্যানিমেটেড গ্রাডিয়েন্ট লাইন (নতুন ডিজাইন) */}
            <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#8a0001] to-transparent animate-shimmer shadow-[0_0_10px_#8a0001]"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite linear;
                }
            `}} />
        </footer>
    );
};

export default Footer;
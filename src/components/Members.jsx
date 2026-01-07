import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaGraduationCap, FaUsers, FaArrowRight, FaFingerprint, FaShieldAlt, FaCircle } from 'react-icons/fa';

const Members = () => {
    const categories = [
        {
            title: "Institutions",
            desc: "Explore our integrated network of academic institutions and strategic research partners.",
            icon: <FaGraduationCap />,
            path: "/institutions",
            label: "ORG_DATA.LOG",
            accent: "#0062ff"
        },
        {
            title: "Peoples",
            desc: "Comprehensive database of core members, strategic advisors, and visionary intellects.",
            icon: <FaUsers />,
            path: "/peoples",
            label: "CORE_USR.DB",
            accent: "#8a0001"
        }
    ];

    return (
        <section id="members" className="py-24 relative  bg-transparent">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#8a0001]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl px-6 relative z-10">

                {/* --- Section Header --- */}
                <div className="mb-20">
                    <div className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8a0001] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8a0001]"></span>
                                    </span>
                                    <span className="text-slate-500 font-mono text-[10px] tracking-[0.4em] uppercase">Status: Live Access</span>
                                </div>

                                {/* Updated Header with your specific Gradient */}
                                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a0001] via-red-500 to-white">
                                        DIRECTORY
                                    </span>
                                    <span className="text-[#8a0001] animate-pulse">_</span>
                                </h2>
                            </div>

                            <div className="flex items-center gap-8 font-mono text-[10px] text-slate-500">
                                <div className="hidden md:block">
                                    <p className="mb-1 uppercase tracking-widest text-white/40 italic">// Verification_System</p>
                                    <div className="flex gap-1">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className={`w-1 h-3 ${i < 8 ? 'bg-[#8a0001]/40' : 'bg-white/5'}`}></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-right border-l border-white/10 pl-8">
                                    <p className="uppercase tracking-widest leading-none text-white/60">Access: Level_Alpha</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* --- Interactive Glass Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Link to={item.path} className="group relative block h-full">
                                <div className="relative h-full p-10 bg-white/[0.02] border border-white/[0.06] rounded-[2rem] transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/20 overflow-hidden backdrop-blur-sm">

                                    {/* Subltle Glow Effect on Hover */}
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-16">
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-[#8a0001]/50 transition-colors duration-500">
                                                <div className="text-3xl text-white/80 group-hover:text-[#8a0001] transition-colors">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <span className="font-mono text-[9px] text-slate-500 tracking-[0.5em] uppercase border border-white/10 px-3 py-1 rounded-full">
                                                {item.label}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-[#8a0001] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-[280px]">
                                            {item.desc}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                                                Initialize Access <FaArrowRight className="group-hover:translate-x-2 transition-transform text-[#8a0001]" />
                                            </div>
                                            <FaShieldAlt className="text-white/5 group-hover:text-white/20 transition-colors" />
                                        </div>
                                    </div>

                                    {/* Clean Scanline Effect */}
                                    <div className="absolute inset-0 w-full h-[2px] bg-white/[0.05] -translate-y-full group-hover:animate-[scan_2.5s_linear_infinite]"></div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Members;
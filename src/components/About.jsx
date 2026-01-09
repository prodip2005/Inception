import React from 'react';
import { motion } from 'framer-motion';
import { FaFingerprint, FaShieldAlt, FaRocket, FaCubes, FaBullseye, FaArrowRight } from 'react-icons/fa';

const About = () => {
    const stats = [
        { label: "Active Projects", value: "12+", icon: <FaCubes /> },
        { label: "Research Papers", value: "45+", icon: <FaRocket /> },
        { label: "Core Members", value: "150+", icon: <FaShieldAlt /> }
    ];

    return (
        <section id="about" className="py-24 relative  bg-transparent">
            {/* Ambient Lighting Overlay */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* --- Left Side: Tech Content --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d22f27] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d22f27]"></span>
                            </span>
                            <span className="text-white/70 font-mono text-[10px] tracking-[0.3em] uppercase">System_Overview</span>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                            INCEPTION<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d22f27] via-red-500 to-white">PROTOCOLS</span>
                        </h2>

                        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl font-light">
                            Developing a <span className="text-white font-medium italic">collaborative neural network</span> for the next generation of innovators. We bridge the gap between abstract theory and industrial impact through structured research.
                        </p>

                        {/* Professional Stats - Transparent Glass Style */}
                        <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/10">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="relative group">
                                    <div className="text-[#d22f27] mb-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                                        {stat.icon}
                                    </div>
                                    <h4 className="text-3xl font-bold text-white tracking-tighter">{stat.value}</h4>
                                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- Right Side: Visual Terminal --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main Glass Card */}
                        <div className="relative z-10 bg-white/[0.01] backdrop-blur-2xl border border-white/[0.08] rounded-[3.5rem] p-10 md:p-14 transition-all duration-700 hover:border-white/20 group">

                            {/* Inner Scanning UI */}
                            <div className="space-y-12">
                                <div className="flex gap-8 group/item">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d22f27] transition-all duration-500 group-hover/item:bg-[#d22f27] group-hover/item:text-white">
                                            <FaBullseye className="text-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Our Mission_</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">Decentralizing knowledge exchange through secure, peer-verified academic networks.</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group/item">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#d22f27] transition-all duration-500 group-hover/item:bg-[#d22f27] group-hover/item:text-white">
                                            <FaFingerprint className="text-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Core_Integrity_</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">Ensuring high-fidelity data research with zero-compromise on ethical standards.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Futuristic Tech Accents */}
                            <div className="absolute bottom-8 right-12 opacity-20 group-hover:opacity-100 transition-opacity">
                                <FaArrowRight className="text-white text-3xl -rotate-45" />
                            </div>

                            {/* Glass Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>
                        </div>

                        {/* Background Floating Rings - Transparent Style */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-white/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-white/[0.02] rounded-full -z-10 animate-[spin_30s_linear_infinite_reverse]"></div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
};

export default About;
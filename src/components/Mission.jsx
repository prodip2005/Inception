import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaUsers } from 'react-icons/fa';

const Mission = () => {
    return (
        <section id="mission" className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto max-w-5xl px-6 relative z-10">

                {/* সেকশন হেডার */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="relative h-28 md:h-36 flex items-center">

                        {/* --- ENHANCED STATIC GLITCH PURPOSE TEXT --- */}
                        <div className="absolute left-0 select-none pointer-events-none uppercase font-black tracking-[0.15em] leading-none">
                            {/* ১. মেইন বেস লেয়ার (খুবই অস্পষ্ট) */}
                            <span className="text-7xl md:text-[120px] text-white/[0.01]">
                                PURPOSE
                            </span>

                            {/* ২. আপার স্লাইস (লাল থেকে সাদা করা হয়েছে, অপাসিটি কম) */}
                            <span
                                className="absolute left-0 top-0 text-7xl md:text-[120px] text-white/[0.04] ml-[-6px] mt-[-1px]"
                                style={{ clipPath: 'inset(10% 0 60% 0)' }}
                            >
                                PURPOSE
                            </span>

                            {/* ৩. মিডল স্লাইস (আরও বেশি অফসেট গ্লিচ বাড়াতে) */}
                            <span
                                className="absolute left-0 top-0 text-7xl md:text-[120px] text-white/[0.03] ml-[8px] mt-[2px]"
                                style={{ clipPath: 'inset(40% 0 40% 0)' }}
                            >
                                PURPOSE
                            </span>

                            {/* ৪. লোয়ার স্লাইস (সায়ান হিউ সহ হালকা সাদা) */}
                            <span
                                className="absolute left-0 top-0 text-7xl md:text-[120px] text-white/[0.04] ml-[-3px] mt-[4px]"
                                style={{ clipPath: 'inset(65% 0 5% 0)' }}
                            >
                                PURPOSE
                            </span>

                            {/* ৫. মাল্টিপল গ্লিচ লাইনস (গ্লিচ ফিল বাড়াতে) */}
                            <div className="absolute top-[30%] left-0 w-full h-[0.5px] bg-white/5"></div>
                            <div className="absolute top-[50%] left-0 w-full h-[1px] bg-[#8a0001]/20"></div>
                            <div className="absolute top-[70%] left-0 w-full h-[0.5px] bg-white/5"></div>
                        </div>

                        {/* --- মেইন লেখা (THE MISSION) --- */}
                        <div className="relative z-10 pl-6 border-l-[6px] border-[#8a0001]">
                            <span className="block text-sm md:text-xl font-mono text-slate-500 tracking-[0.5em] mb-1">
                                THE_ARCHIVE
                            </span>
                            <h2 className="text-5xl mt-14 md:text-8xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#8a0001] via-red-500 to-white leading-none">
                                MISSION<span className="text-white opacity-50">_</span>
                            </h2>
                        </div>

                        {/* --- টেকনিক্যাল ডাটা বার --- */}
                        <div className="ml-auto hidden lg:flex flex-col text-[10px] font-mono text-slate-500 self-end mb-2 tracking-widest gap-1 border-r border-white/10 pr-4 text-right">
                            <span>STATUS: DECRYPTED</span>
                            <span>PRIORITY: CRITICAL</span>
                            <span className="text-[#8a0001]">SECTOR: EDU_INTEL</span>
                        </div>
                    </div>

                    <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-3xl leading-relaxed mt-10">
                        We believe meaningful education extends beyond the <span className="text-white border-b border-[#8a0001]/50 italic px-1">classroom walls</span>, fostering a culture of constant inquiry.
                    </p>
                </motion.div>

                {/* মিশন কার্ডস গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative p-10 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#8a0001]/30"
                    >
                        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/5 uppercase italic">0x01 // intellectual</div>
                        <div className="w-14 h-14 bg-[#8a0001]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#8a0001]/20 group-hover:bg-[#8a0001] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(138,0,1,0.4)]">
                            <FaLightbulb className="text-[#8a0001] group-hover:text-white text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Intellectual Engagement</h3>
                        <p className="text-slate-400 leading-relaxed text-base">
                            Inclusive experiences that encourage logic, creativity, and ethical reflection. Challenge the status quo through deep questioning.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative p-10 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#8a0001]/30"
                    >
                        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/5 uppercase italic">0x02 // community</div>
                        <div className="w-14 h-14 bg-[#8a0001]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#8a0001]/20 group-hover:bg-[#8a0001] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(138,0,1,0.4)]">
                            <FaUsers className="text-[#8a0001] group-hover:text-white text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Community Participation</h3>
                        <p className="text-slate-400 leading-relaxed text-base">
                            Platforms where students collaborate, compete, and grow. Bridges the gap between academic institutions and cultural wisdom.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
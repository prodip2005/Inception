import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaUsers, FaCode } from 'react-icons/fa';

const Mission = () => {
    const missions = [
        {
            id: "01",
            icon: <FaLightbulb />,
            title: "Intellect",
            desc: "Critical thinking & logic."
        },
        {
            id: "02",
            icon: <FaUsers />,
            title: "Community",
            desc: "Collaborate & grow together."
        },
        {
            id: "03",
            icon: <FaCode />,
            title: "Empower",
            desc: "Future-ready tech skills."
        }
    ];

    return (
        <section id="mission" className="py-16 md:py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto max-w-7xl px-3 md:px-6 relative z-10">

                {/* সেকশন হেডার */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-20"
                >
                    <div className="relative h-20 md:h-36 flex items-center">

                        {/* --- PURPOSE GLITCH TEXT (FIXED) --- */}
                        <div className="absolute left-0 select-none pointer-events-none uppercase font-black tracking-[0.1em] md:tracking-[0.15em] leading-none w-full">
                            {/* মেইন বেস লেয়ার */}
                            <span className="text-5xl md:text-[120px] text-white/[0.01]">PURPOSE</span>

                            {/* গ্লিচ লেয়ার ১ */}
                            <span className="absolute left-0 top-0 text-5xl md:text-[120px] text-white/[0.04] ml-[-3px] md:ml-[-6px] mt-[-1px]" style={{ clipPath: 'inset(10% 0 60% 0)' }}>PURPOSE</span>

                            {/* গ্লিচ লেয়ার ২ */}
                            <span className="absolute left-0 top-0 text-5xl md:text-[120px] text-white/[0.03] ml-[4px] md:ml-[8px] mt-[1px]" style={{ clipPath: 'inset(40% 0 40% 0)' }}>PURPOSE</span>

                            {/* গ্লিচ লেয়ার ৩ */}
                            <span className="absolute left-0 top-0 text-5xl md:text-[120px] text-white/[0.04] ml-[-2px] md:ml-[-3px] mt-[2px]" style={{ clipPath: 'inset(65% 0 5% 0)' }}>PURPOSE</span>

                            {/* ডেকোরেটিভ গ্লিচ লাইনস */}
                            <div className="absolute top-[40%] left-0 w-1/2 h-[0.5px] bg-white/5 md:block hidden"></div>
                            <div className="absolute top-[55%] left-0 w-full h-[1px] bg-[#8a0001]/10"></div>
                        </div>

                        {/* --- মেইন টাইটেল (MISSION) --- */}
                        <div className="relative  z-10 pl-3 md:pl-6 border-l-[3px] md:border-l-[6px] border-[#8a0001]">
                            <span className="block text-[8px] md:text-xl font-mono text-slate-500 tracking-[0.3em] mb-1">The_Commitments</span>
                            <h2 className="text-3xl mt-9 md:text-8xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#8a0001] via-red-500 to-white leading-none">
                                MISSION<span className="text-white opacity-50">_</span>
                            </h2>
                        </div>
                    </div>
                </motion.div>

                {/* মিশন কার্ডস গ্রিড */}
                <div className="grid grid-cols-3 gap-2 md:gap-8 relative">
                    {missions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative p-3 md:p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-xl md:rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#8a0001]/30"
                        >
                            <div className="absolute top-0 right-0 p-1.5 md:p-4 font-mono text-[6px] md:text-[10px] text-white/5 uppercase">#{item.id}</div>

                            <div className="w-8 h-8 md:w-14 md:h-14 bg-[#8a0001]/10 rounded-lg md:rounded-2xl flex items-center justify-center mb-3 md:mb-8 border border-[#8a0001]/20 group-hover:bg-[#8a0001] transition-all duration-500">
                                <span className="text-[#8a0001] group-hover:text-white text-sm md:text-2xl">{item.icon}</span>
                            </div>

                            <h3 className="text-[10px] md:text-2xl font-bold text-white mb-1 md:mb-4 leading-tight">{item.title}</h3>

                            <p className="text-slate-400 leading-tight text-[8px] md:text-base opacity-70">
                                {item.desc}
                            </p>

                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#8a0001]/5 rounded-full blur-md group-hover:bg-[#8a0001]/20 transition-all"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;
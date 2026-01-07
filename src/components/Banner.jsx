import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMapMarkerAlt, FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';
import { MinimalMissionButton } from './AnimatedMissionButton';

const Banner = () => {
    // Animation Variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <section id='home' className="relative min-h-screen flex flex-col justify-center py-10 md:py-20">

            {/* Background Decoration (Ambient Light) */}
            <div className="absolute top-[15%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#8a0001]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-5%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-600/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl px-6 relative z-10">

                {/* 1. Top Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-6 md:mb-8"
                >
                    <span className="w-8 md:w-12 h-[1px] bg-[#8a0001]"></span>
                    <span className="text-[#8a0001] uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px] font-bold">
                        Est. 2024 • Academic Excellence
                    </span>
                </motion.div>

                {/* 2. Main Headline */}
                {/* 2. Main Headline */}
                <div className="relative">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.8 }}
                    >
                        {/* ফোনের জন্য text-7xl এবং leading-[0.8] করা হয়েছে যাতে বড় দেখায় */}
                        <h1 className="text-6xl sm:text-6xl md:text-9xl lg:text-[140px] font-black bg-clip-text text-transparent bg-gradient-to-r from-[#8a0001] via-red-500 to-white leading-[0.8] sm:leading-[0.9] md:leading-[0.85] tracking-tighter uppercase mb-4">
                            INCEPTION
                        </h1>
                        <h2 className="text-xl sm:text-2xl md:text-6xl font-bold text-white/90 tracking-tight max-w-4xl">
                            Education Beyond <span className="text-slate-500 italic">Textbooks</span>
                        </h2>
                    </motion.div>
                </div>

                {/* 3. Divider Line */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-[1px] bg-gradient-to-r from-[#8a0001] via-[#8a0001]/50 to-transparent my-8 md:my-12"
                />

                {/* 4. Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-end">

                    {/* Description */}
                    <motion.div
                        className="lg:col-span-5"
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <p className="text-base md:text-xl text-gray-400 leading-relaxed font-medium mb-8">
                            A non-government educational organization dedicated to nurturing <span className="text-white">curiosity</span>, <span className="text-white">critical thinking</span>, and <span className="text-white">creative intelligence</span> in every student.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            <MinimalMissionButton/>

                            <div className="flex items-center gap-3 text-white/60 border-l-0 sm:border-l border-white/10 pl-0 sm:pl-6 h-auto sm:h-10">
                                <FaMapMarkerAlt className="text-[#8a0001]" />
                                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">Nabinagar, Brahmanbaria</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 5. Status Cards */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                            { icon: <FaRocket />, title: "Innovation", desc: "Future-ready skills" },
                            { icon: <FaLightbulb />, title: "Creative", desc: "Beyond limits" },
                            { icon: <FaUsers />, title: "Community", desc: "Stronger together" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + (idx * 0.1) }}
                                whileHover={{ y: -5 }}
                                className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl group hover:border-[#8a0001]/50 transition-all duration-300"
                            >
                                <div className="text-[#8a0001] text-xl mb-4 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h4 className="text-white font-bold text-sm uppercase mb-1 tracking-wider">{item.title}</h4>
                                <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest leading-tight">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Scroll Indicator (Hidden on small mobile screens to save space) */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20 hidden lg:block"
            >
                <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-[#8a0001] to-transparent mx-auto"></div>
            </motion.div>

        </section>
    );
};

export default Banner;
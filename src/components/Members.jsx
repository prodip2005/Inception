import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate } from 'react-router';
import { FaGraduationCap, FaUsers, FaArrowRight, FaDatabase, FaEye } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';

const Counter = ({ value }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, value, { duration: 2, ease: "easeOut" });
        return animation.stop;
    }, [value, count]);

    return <motion.span>{rounded}</motion.span>;
};

const Members = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const [instCount, setInstCount] = useState(0);
    const [peopleCount, setPeopleCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axiosSecure.get('/institutions'),
            axiosSecure.get('/peoples')
        ])
            .then(([instRes, peopleRes]) => {
                setInstCount(instRes.data.length);
                setPeopleCount(peopleRes.data.length);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    const categories = [
        {
            title: "Institutions",
            shortDesc: "Academic hubs.",
            desc: "Global network of academic excellence and research hubs.",
            count: instCount,
            icon: <FaGraduationCap />,
            path: "/institutions",
            label: "INST_01",
        },
        {
            title: "Peoples",
            shortDesc: "Core personnel.",
            desc: "Core personnel, visionaries, and strategic advisory board.",
            count: peopleCount,
            icon: <FaUsers />,
            path: "/peoples",
            label: "USR_01",
        }
    ];

    return (
        <section className="py-16 md:py-24 relative bg-transparent overflow-hidden">
            <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">

                {/* Header */}
                <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 md:pb-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="h-[1px] md:h-[2px] w-8 md:w-12 bg-[#d22f27]"></div>
                            <span className="text-[#d22f27] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase animate-pulse">
                                Data_Sync_Active
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#d22f27] via-red-500 to-white leading-none tracking-tighter uppercase">
                            NETWORK<span className="text-[#d22f27] animate-pulse">_</span>
                        </h2>
                    </motion.div>

                    <div className="text-right font-mono hidden md:block text-slate-500 text-[10px]">
                        <p className="mb-2 uppercase tracking-widest">// System_Archives</p>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <FaDatabase className="text-[#d22f27]" />
                            <span>NODE_STABLE: 100%</span>
                        </div>
                    </div>
                </header>

                {/* Cards */}
                <div className="grid grid-cols-2 gap-3 md:gap-10">
                    {categories.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative p-0.5 md:p-1 border border-white/5 rounded-[1.5rem] md:rounded-[3rem] bg-white/[0.03] backdrop-blur-2xl transition-all duration-500 hover:border-[#d22f27]/30 h-full"
                        >
                            <div className="p-4 md:p-10 flex flex-col h-full relative overflow-hidden">

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-16 gap-2">
                                    <div className="p-3 md:p-5 bg-white/5 rounded-xl md:rounded-2xl border border-white/10 text-white/80 group-hover:text-[#d22f27] transition-all">
                                        <span className="text-xl md:text-4xl">{item.icon}</span>
                                    </div>

                                    <div className="text-left md:text-right">
                                        <div className="text-2xl md:text-5xl font-black text-white leading-none">
                                            {loading ? ".." : <Counter value={item.count} />}+
                                        </div>
                                        <div className="font-mono text-[8px] md:text-[9px] text-slate-500 tracking-widest uppercase mt-1">
                                            {item.label}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg md:text-4xl font-black text-white mb-2 md:mb-4 tracking-tighter uppercase">
                                    {item.title}
                                </h3>

                                <p className="text-slate-400 text-[10px] md:text-sm leading-tight md:leading-relaxed mb-8 md:mb-12 opacity-70">
                                    <span className="md:hidden">{item.shortDesc}</span>
                                    <span className="hidden md:inline">{item.desc}</span>
                                </p>

                                <div className="mt-auto pt-4 md:pt-8 border-t border-white/10">
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className="group/btn relative flex items-center justify-between w-full md:w-auto md:min-w-[190px] px-4 md:px-6 py-2.5 md:py-3.5 bg-[#d22f27] border border-[#d22f27] rounded-full text-white overflow-hidden transition-all duration-300 hover:bg-[#a00001] hover:shadow-[0_0_25px_rgba(138,0,1,0.5)] active:scale-95"
                                    >
                                        <span className="font-mono text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase relative z-10 flex items-center gap-2">
                                            <FaEye className="text-[10px] md:text-xs" />See The List
                                        </span>
                                        <FaArrowRight className="text-[10px] md:text-xs transition-transform duration-300 group-hover/btn:translate-x-1 relative z-10" />
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 md:mt-20 flex justify-center">
                    <div className="px-4 py-1.5 md:px-6 md:py-2 bg-white/5 rounded-full border border-white/5 flex items-center gap-3 text-slate-500 font-mono text-[8px] md:text-[9px] uppercase tracking-widest">
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className="w-1 h-1 bg-[#d22f27] rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </div>
                        Nodes_Secure
                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
};

export default Members;

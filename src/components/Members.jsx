import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate } from 'react-router';
import { FaGraduationCap, FaUsers, FaArrowRight, FaDatabase, FaEye, FaUserTie } from 'react-icons/fa';
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
    const [memberCount, setMemberCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axiosSecure.get('/institutions'),
            axiosSecure.get('/peoples'),
            axiosSecure.get('/users')
        ])
            .then(([instRes, peopleRes, userRes]) => {
                setInstCount(instRes.data.length);
                setPeopleCount(peopleRes.data.length);

                // --- ফিল্টারিং লজিক এখানে ---
                // শুধুমাত্র যাদের status === "active", তাদের কাউন্ট করা হচ্ছে
                const activeOnes = userRes.data.filter(user => user.status === "active");
                setMemberCount(activeOnes.length);

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
            label: "Total_Nodes"
        },
        {
            title: "VIP Personnel",
            shortDesc: "Core personnel.",
            desc: "Visionaries, and strategic advisory board members of inception.",
            count: peopleCount,
            icon: <FaUserTie />,
            path: "/peoples",
            label: "Elite_Units"
        },
        {
            title: "Members",
            shortDesc: "General Force.",
            desc: "The heartbeat of our movement. Dedicated active members.",
            count: memberCount, // এখানে এখন শুধুমাত্র active সংখ্যা দেখাবে
            icon: <FaUsers />,
            path: "/all-members",
            label: "Active_Cores"
        }
    ];

    return (
        <section className="py-16 md:py-24 relative bg-transparent overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d22f27]/5 blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">

                {/* Header Section */}
                <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 md:pb-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="h-[2px] w-12 bg-[#d22f27]"></div>
                            <span className="text-[#d22f27] font-mono text-xs tracking-[0.3em] uppercase animate-pulse">
                                Registry_Sync_Active
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#d22f27] via-red-500 to-white leading-none tracking-tighter uppercase italic">
                            NETWORK<span className="text-[#d22f27] animate-pulse">_</span>
                        </h2>
                    </motion.div>

                    <div className="text-right font-mono hidden md:block text-slate-500 text-[10px]">
                        <p className="mb-2 uppercase tracking-widest">// Data_Integrity</p>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <FaDatabase className="text-[#d22f27]" />
                            <span>NODE_STABLE: 100%</span>
                        </div>
                    </div>
                </header>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-stretch">
                    {categories.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative flex"
                        >
                            <div className="flex flex-col w-full p-6 md:p-10 border border-white/5 rounded-[2rem] md:rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl transition-all duration-500 hover:border-[#d22f27]/40 hover:bg-white/[0.05] shadow-2xl">

                                {/* Top Section: Icon & Counter */}
                                <div className="flex justify-between items-start mb-8 md:mb-16">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white/80 group-hover:text-[#d22f27] group-hover:scale-110 transition-all duration-500 shadow-lg">
                                        <span className="text-2xl md:text-4xl">{item.icon}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl md:text-5xl font-black text-white leading-none">
                                            {loading ? ".." : <Counter value={item.count} />}+
                                        </div>
                                        <div className="font-mono text-[8px] md:text-[10px] text-slate-500 tracking-widest uppercase mt-1">
                                            {item.label}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-grow">
                                    <h3 className="text-xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase italic group-hover:text-[#d22f27] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Bottom Section: Action Button */}
                                <div className="mt-10 pt-8 border-t border-white/5">
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className="group/btn flex items-center justify-between w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl text-white transition-all duration-300 hover:bg-[#d22f27] hover:border-[#d22f27] hover:shadow-[0_0_20px_rgba(210,47,39,0.3)]"
                                    >
                                        <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                                            <FaEye className="group-hover/btn:animate-pulse" /> View List
                                        </span>
                                        <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Members;
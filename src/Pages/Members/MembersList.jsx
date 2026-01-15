import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import useAxios from '../../hooks/useAxios';
import MemberCard from './MemberCard';

const MembersList = () => {
    const axiosSecure = useAxios();

    const [activeMembers, setActiveMembers] = useState([]); // নাম পরিবর্তন করা হয়েছে clarity-র জন্য
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 8;

    useEffect(() => {
        setLoading(true);
        axiosSecure.get('/users')
            .then(res => {
                // ডাটা আসার পর শুধুমাত্র 'active' স্ট্যাটাস ফিল্টার করা হচ্ছে
                const filteredActive = res.data.filter(user => user.status === "active");
                setActiveMembers(filteredActive);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
                setLoading(false);
            });
    }, [axiosSecure]);

    // Pagination Calculation (filtered data-র ওপর ভিত্তি করে)
    const totalPages = Math.ceil(activeMembers.length / itemsPerPage);
    const currentItems = activeMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d22f27]"></div>
                    <p className="text-[#d22f27] font-mono text-[10px] tracking-widest animate-pulse uppercase">Fetching_Active_Nodes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent py-24 pt-32">
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <div className="mb-16 border-l-8 border-[#d22f27] pl-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
                            ACTIVE_MEMBERS<span className="text-[#d22f27]">_</span>
                        </h2>
                        <p className="text-slate-500 font-mono text-sm tracking-[0.3em] mt-4 uppercase">
                            // Registry_Count: {activeMembers.length} Verified Nodes
                        </p>
                    </motion.div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((member, index) => (
                            <motion.div
                                key={member._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <MemberCard member={member} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {!loading && activeMembers.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 border border-dashed border-white/5 rounded-[3rem]"
                    >
                        <div className="text-slate-600 font-mono uppercase tracking-[0.5em] text-xs">
                            No_Active_Nodes_Synchronized
                        </div>
                    </motion.div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-20 flex flex-wrap justify-center items-center gap-4">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`px-5 py-2 rounded-xl font-mono text-[10px] transition-all duration-300 border ${currentPage === i + 1
                                    ? 'bg-[#d22f27] border-[#d22f27] text-white shadow-[0_0_20px_rgba(138,0,1,0.3)] scale-110'
                                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-[#d22f27]/30 hover:text-white'
                                    }`}
                            >
                                SECTOR_{String(i + 1).padStart(2, '0')}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembersList;
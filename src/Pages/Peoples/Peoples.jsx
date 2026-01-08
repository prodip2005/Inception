import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import People from './People';
import useAxios from '../../hooks/useAxios';

const Peoples = () => {
    const axiosSecure = useAxios();

    const [allPeoples, setAllPeoples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    // 🔥 Backend থেকে peoples data fetch
    useEffect(() => {
        axiosSecure.get('/peoples')
            .then(res => {
                setAllPeoples(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load personnel data:", err);
                setLoading(false);
            });
    }, [axiosSecure]);

    const totalPages = Math.ceil(allPeoples.length / itemsPerPage);
    const currentItems = allPeoples.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="w-10 h-10 border-4 border-[#8a0001]/20 border-t-[#8a0001] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent py-16 md:py-24 pt-28 md:pt-32">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-12 md:mb-16 border-l-4 md:border-l-8 border-[#8a0001] pl-4 md:pl-6 text-right flex flex-col items-end">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        HUMAN<span className="text-[#8a0001]">_</span><br className="block md:hidden" />ASSET
                    </h2>
                    <p className="text-slate-500 font-mono text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] mt-3 md:mt-4 uppercase">
                        // Verified_Core_Personnel_Database: {allPeoples.length}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="contents"
                        >
                            {currentItems.map((person) => (
                                <People
                                    key={person._id}   // 🔥 MongoDB _id
                                    person={person}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 md:mt-20 flex flex-wrap justify-center gap-2 md:gap-3">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo({ top: 200, behavior: 'smooth' });
                                }}
                                className={`group relative px-5 md:px-8 py-2 md:py-3 overflow-hidden rounded-full transition-all duration-500 ${currentPage === i + 1
                                        ? 'bg-[#8a0001] text-white shadow-[0_0_20px_rgba(138,0,1,0.3)]'
                                        : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <span className="relative z-10 font-mono text-[10px] md:text-xs tracking-widest uppercase">
                                    P_{i + 1}
                                </span>
                                {currentPage === i + 1 && (
                                    <motion.div
                                        layoutId="glow"
                                        className="absolute inset-0 bg-white/10 blur-md"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Peoples;

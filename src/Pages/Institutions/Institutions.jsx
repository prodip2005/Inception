import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Institution from './Institutioin';
import useAxios from '../../hooks/useAxios';

const Institutions = () => {
    const axiosSecure = useAxios();

    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 8;

    // 🔥 Backend থেকে data fetch
    useEffect(() => {
        axiosSecure.get('/institutions')
            .then(res => {
                setAllData(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching institutions:', error);
                setLoading(false);
            });
    }, [axiosSecure]);

    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const currentItems = allData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8a0001]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent py-24 pt-32">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="mb-16 border-l-8 border-[#8a0001] pl-6">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                        AFFILIATIONS<span className="text-[#8a0001]">_</span>
                    </h2>
                    <p className="text-slate-500 font-mono text-sm tracking-[0.3em] mt-4 uppercase">
                        // Total_Institutions: {allData.length}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="wait">
                        {currentItems.map((item) => (
                            <motion.div
                                key={item._id}   
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Institution item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-20 flex flex-wrap justify-center items-center gap-4">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`px-5 py-2 rounded-xl font-mono text-xs transition-all duration-300 ${currentPage === i + 1
                                        ? 'bg-[#8a0001] text-white shadow-[0_0_20px_rgba(138,0,1,0.5)] scale-110'
                                        : 'bg-white/5 text-slate-500 hover:bg-white/10'
                                    }`}
                            >
                                PAGE_{i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Institutions;

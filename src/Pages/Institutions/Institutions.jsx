import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Institution from './Institutioin';

const Institutions = () => {
    // ডামি ডাটা (আপনি এখানে আপনার অরিজিনাল ডাটা বসাতে পারেন)
    const allData = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        name: `Institution Name ${i + 1}`,
        img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=500",
        desc: "A brief description of the academic affiliation and impact on the research ecosystem."
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(allData.length / itemsPerPage);

    const currentItems = allData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-transparent py-24 pt-32">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-16 border-l-8 border-[#8a0001] pl-6">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                        AFFILIATIONS<span className="text-[#8a0001]">_</span>
                    </h2>
                    <p className="text-slate-500 font-mono text-sm tracking-[0.3em] mt-4 uppercase">
                        // Authorized_Partner_Network
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode='wait'>
                        {currentItems.map((item) => (
                            <Institution key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                <div className="mt-20 flex justify-center items-center gap-4">
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
            </div>
        </div>
    );
};

export default Institutions;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import People from './People';

const Peoples = () => {
    // মেম্বারদের ডামি ডাটা
    const allPeoples = Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        name: `Personnel ID ${i + 101}`,
        role: i % 2 === 0 ? "Strategic Lead" : "Core Researcher",
        img: `https://i.pravatar.cc/150?u=${i}`,
        bio: "Specialized in data analysis and organizational architecture for the core mission."
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(allPeoples.length / itemsPerPage);

    const currentItems = allPeoples.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-transparent py-24 pt-32">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-16 border-l-8 border-[#8a0001] pl-6 text-right flex flex-col items-end">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                        HUMAN<span className="text-[#8a0001]">_</span>ASSET
                    </h2>
                    <p className="text-slate-500 font-mono text-sm tracking-[0.3em] mt-4 uppercase">
                        // Verified_Core_Personnel_Database
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode='wait'>
                        {currentItems.map((person) => (
                            <People key={person.id} person={person} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                <div className="mt-20 flex justify-center gap-3">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentPage(i + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`group relative px-8 py-3 overflow-hidden rounded-full transition-all duration-500 ${currentPage === i + 1
                                    ? 'bg-[#8a0001] text-white'
                                    : 'bg-white/5 text-slate-500'
                                }`}
                        >
                            <span className="relative z-10 font-mono text-xs tracking-widest uppercase">
                                Phase_{i + 1}
                            </span>
                            {currentPage === i + 1 && (
                                <motion.div
                                    layoutId="glow"
                                    className="absolute inset-0 bg-white/20 blur-md"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Peoples;
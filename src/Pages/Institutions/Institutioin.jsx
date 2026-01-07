import React from 'react';
import { motion } from 'framer-motion';

const Institution = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative p-6 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#8a0001]/30"
        >
            {/* Image Wrapper */}
            <div className="relative w-full h-40 mb-6 overflow-hidden rounded-2xl border border-white/5">
                <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#8a0001]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter group-hover:text-[#8a0001] transition-colors">
                    {item.name}
                </h4>
                <div className="w-8 h-[2px] bg-[#8a0001] mb-4 group-hover:w-full transition-all duration-500"></div>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 italic">
                    {item.desc}
                </p>
            </div>

            {/* Glassy Overlay for Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </motion.div>
    );
};

export default Institution;
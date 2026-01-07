import React from 'react';
import { motion } from 'framer-motion';

const People = ({ person }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            className="group relative p-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] text-center transition-all duration-500 hover:bg-white/[0.04] hover:border-[#8a0001]/40"
        >
            {/* Avatar Section */}
            <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-[#8a0001] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
                <div className="relative w-full h-full rounded-full p-1 border-2 border-dashed border-white/10 group-hover:border-[#8a0001] transition-all duration-700">
                    <img
                        src={person.img}
                        className="w-full h-full rounded-full object-cover filter contrast-125"
                        alt={person.name}
                    />
                </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-2 block">
                    {person.role}
                </span>
                <h4 className="text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-[#8a0001] transition-colors">
                    {person.name}
                </h4>
                <p className="text-slate-400 text-sm leading-snug opacity-70 group-hover:opacity-100 transition-opacity px-2">
                    {person.bio}
                </p>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-[#8a0001] rounded-full opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all"></div>
        </motion.div>
    );
};

export default People;
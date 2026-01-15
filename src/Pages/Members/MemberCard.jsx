import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaMapMarkerAlt, FaUniversity } from 'react-icons/fa';

const MemberCard = ({ member }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative p-6 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-[#d22f27]/40 h-full flex flex-col"
        >
            {/* Profile Image / Icon */}
            <div className="relative w-24 h-24 mb-6 mx-auto">
                <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#d22f27]/50 transition-colors duration-500">
                    {member.image ? (
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-slate-700 group-hover:text-[#d22f27] transition-colors">
                            <FaUserCircle size={48} />
                        </div>
                    )}
                </div>
                {/* Status Indicator */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#000] border-2 border-[#d22f27] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#d22f27] rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Info Section */}
            <div className="text-center flex-grow">
                <h4 className="text-lg font-black text-white mb-1 uppercase tracking-tight group-hover:text-[#d22f27] transition-colors">
                    {member.name}
                </h4>
                <p className="text-[10px] font-mono text-[#d22f27] mb-4 tracking-[0.2em] uppercase opacity-70">
                    Verified_Member
                </p>

                <div className="space-y-2 mb-6 text-left">
                    <div className="flex items-center gap-2 text-slate-400">
                        <FaUniversity className="text-[10px] text-[#d22f27]" />
                        <span className="text-[11px] uppercase tracking-tighter truncate">{member.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <FaMapMarkerAlt className="text-[10px] text-[#d22f27]" />
                        <span className="text-[11px] uppercase tracking-tighter">{member.district}, {member.division}</span>
                    </div>
                </div>
            </div>

            {/* Role Badge */}
            <div className="mt-auto">
                <div className="w-full py-2 bg-white/5 rounded-xl border border-white/5 text-center group-hover:bg-[#d22f27]/10 group-hover:border-[#d22f27]/20 transition-all">
                    <span className="text-[9px] font-mono text-slate-500 group-hover:text-white uppercase tracking-widest">
                        Access_Level: 01
                    </span>
                </div>
            </div>

            {/* Cyber Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </motion.div>
    );
};

export default MemberCard;
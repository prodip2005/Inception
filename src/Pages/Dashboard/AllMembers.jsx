import React, { useState, useEffect, useMemo } from 'react';
import useAxios from '../../hooks/useAxios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSyncAlt, FaPhoneAlt, FaEnvelope, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AllMembers = () => {
    const axiosSecure = useAxios();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // --- PAGINATION STATES ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Protiti page-e 5-ti data thakbe

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        axiosSecure.get('/users')
            .then(res => {
                // শুধুমাত্র এপ্রুভড মেম্বারদের ফিল্টার করে দেখানো
                const activeMembers = res.data.filter(user => user.status === "active");
                setUsers(activeMembers);
                setLoading(false);
            })
    }, []);

    // Search and Filter Logic
    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // --- PAGINATION CALCULATION ---
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    // Page change handler
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-6 font-mono text-white">

            {/* Header & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.02] p-6 rounded-3xl border border-white/5 shadow-xl">
                <div>
                    <h2 className="text-xl font-black uppercase tracking-tighter italic border-l-4 border-[#8a0001] pl-4">Member_Registry</h2>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Total: {filteredUsers.length} Nodes</p>
                </div>
                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a0001]" />
                    <input
                        type="text"
                        placeholder="FILTER_DATA..."
                        className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3 rounded-xl text-[10px] outline-none focus:border-[#8a0001] transition-all"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Search korle page 1-e niye jabe
                        }}
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto bg-white/[0.01] border border-white/5 rounded-3xl min-h-[450px]">
                {loading ? (
                    <div className="flex justify-center py-40"><FaSyncAlt className="animate-spin text-[#8a0001] text-2xl" /></div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 uppercase text-[9px] font-black tracking-widest text-slate-500">
                                <th className="p-6">Identification</th>
                                <th className="p-6">Institution</th>
                                <th className="p-6">Comm_Links</th>
                                <th className="p-6">Region</th>
                                <th className="p-6">Core_Skills</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode='wait'>
                                {currentItems.map((user, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        key={user._id || index}
                                        className="border-b border-white/5 hover:bg-[#8a0001]/5 transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10 overflow-hidden">
                                                    {user.image ? <img src={user.image} className="w-full h-full object-cover" alt="" /> : <FaUserCircle className="opacity-20" size={24} />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase group-hover:text-[#8a0001] transition-colors">{user.name}</p>
                                                    <p className="text-[9px] text-slate-600 uppercase font-bold tracking-tighter mt-0.5">{user.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-[10px] text-slate-400 uppercase max-w-[200px] leading-relaxed">
                                            {user.institution}
                                        </td>
                                        <td className="p-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[9px] text-slate-300 tracking-tight">
                                                    <FaEnvelope className="text-[#8a0001] opacity-50" size={8} /> {user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-[9px] text-slate-300 tracking-tight">
                                                    <FaPhoneAlt className="text-[#8a0001] opacity-50" size={8} /> {user.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 uppercase">
                                            <p className="text-[10px] text-slate-400">{user.district}</p>
                                            <p className="text-[8px] font-black text-slate-700">{user.division}</p>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-wrap gap-1">
                                                {user.skills?.slice(0, 3).map((skill, i) => (
                                                    <span key={i} className="text-[7px] px-2 py-0.5 bg-white/5 text-slate-500 rounded border border-white/10 font-bold uppercase">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                )}

                {!loading && currentItems.length === 0 && (
                    <div className="text-center py-20 text-[10px] text-slate-600 uppercase tracking-[0.5em]">No_Registry_Found</div>
                )}
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center px-6 py-6 bg-white/[0.02] border border-white/5 rounded-3xl gap-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white disabled:opacity-20 transition-all px-4 py-2 bg-white/5 rounded-xl border border-white/5"
                    >
                        <FaChevronLeft size={10} /> Prev_Sector
                    </button>

                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all border ${currentPage === index + 1
                                        ? 'bg-[#8a0001] border-[#8a0001] text-white shadow-lg shadow-[#8a0001]/20'
                                        : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white disabled:opacity-20 transition-all px-4 py-2 bg-white/5 rounded-xl border border-white/5"
                    >
                        Next_Sector <FaChevronRight size={10} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllMembers;
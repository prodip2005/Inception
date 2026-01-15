import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaTimes, FaSyncAlt, FaSearch, FaChevronLeft, FaChevronRight, FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'animate.css';
import useAxios from '../../hooks/useAxios';

const Edit = () => {
    const axiosSecure = useAxios();
    const [activeSection, setActiveSection] = useState('events');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = async (section) => {
        setLoading(true);
        try {
            const endpoint = section === 'events' ? '/timeline' : `/${section}`;
            const res = await axiosSecure.get(endpoint);
            setData(res.data);
            setCurrentPage(1);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(activeSection); }, [activeSection]);

    const formatDate = (dateValue) => {
        const d = new Date(dateValue);
        return isNaN(d.getTime()) ? "NOT_SET" : d.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    const processedData = useMemo(() => {
        let result = [...data];
        if (searchTerm) {
            result = result.filter(item => {
                const title = (item.title || item.name || item.fullName || "").toLowerCase();
                return title.includes(searchTerm.toLowerCase());
            });
        }
        result.sort((a, b) => {
            const timeA = new Date(a.date || a.createdAt || 0).getTime();
            const timeB = new Date(b.date || b.createdAt || 0).getTime();
            return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
        });
        return result;
    }, [data, searchTerm, sortOrder]);

    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const currentItems = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // --- আপডেট হ্যান্ডলার (অ্যালার্ট ফিক্স সহ) ---
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        const form = e.target;
        const endpoint = activeSection === 'events' ? '/timeline' : `/${activeSection}`;

        let updatedDoc;
        if (activeSection === 'users') {
            updatedDoc = {
                name: form.name.value,
                institution: form.institution.value,
                status: form.status.value,
                image: form.img.value
            };
        } else if (activeSection === 'events') {
            updatedDoc = {
                title: form.title.value,
                location: form.location.value,
                img: form.img.value,
                description: form.description.value,
                date: new Date(form.date.value)
            };
        } else {
            updatedDoc = {
                name: form.name.value,
                img: form.img.value,
                desc: form.desc.value,
                date: new Date(form.date.value),
                ...(activeSection === 'peoples' ? { role: form.role.value } : { location: form.location.value })
            };
        }

        try {
            const res = await axiosSecure.patch(`${endpoint}/${selectedItem._id}`, updatedDoc);

            // এখানে modifiedCount অথবা matchedCount চেক করা হচ্ছে যাতে দ্রুত অ্যালার্ট আসে
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({
                    title: 'DATABASE_SYNCED',
                    text: 'Node information updated successfully.',
                    icon: 'success',
                    background: '#050505',
                    color: '#fff',
                    confirmButtonColor: '#8a0001',
                    timer: 2000
                });
                setIsModalOpen(false);
                fetchData(activeSection);
            } else {
                // যদি কোনো পরিবর্তন না করেই সেভ দেয়
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({ title: 'Error', text: 'Update failed', icon: 'error', background: '#050505', color: '#fff' });
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'ERASE_NODE?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8a0001',
            cancelButtonColor: '#333',
            background: '#050505',
            color: '#fff',
            confirmButtonText: 'YES, ERASE'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const endpoint = activeSection === 'events' ? '/timeline' : `/${activeSection}`;
                try {
                    await axiosSecure.delete(`${endpoint}/${id}`);
                    setData(data.filter(item => item._id !== id));
                    Swal.fire({ title: 'WIPED', icon: 'success', background: '#050505', color: '#fff', timer: 1500, showConfirmButton: false });
                } catch (err) {
                    Swal.fire({ title: 'Failed', text: 'Deletion error', icon: 'error' });
                }
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-6 text-white font-mono">

            {/* ১. টপ কন্ট্রোল বার */}
            <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-white/[0.02] p-6 rounded-[2.5rem] border border-white/5">
                <div className="flex flex-wrap justify-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                    {['events', 'institutions', 'peoples', 'users'].map(tab => (
                        <button key={tab} onClick={() => setActiveSection(tab)} className={`px-6 py-2 rounded-xl uppercase text-[9px] font-bold tracking-widest transition-all ${activeSection === tab ? 'bg-[#8a0001] text-white shadow-[0_0_15px_rgba(138,0,1,0.3)]' : 'text-slate-500 hover:text-white'}`}>{tab}</button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]" />
                        <input type="text" placeholder="FILTER_DATA..." className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 rounded-xl text-[10px] outline-none focus:border-[#8a0001]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* ২. ডাটা লিস্ট */}
            <div className="min-h-[450px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FaSyncAlt className="animate-spin text-[#8a0001] text-2xl" />
                        <span className="text-[10px] text-slate-500 animate-pulse uppercase">Syncing_Nodes...</span>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {currentItems.map(item => (
                            <motion.div layout key={item._id} className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-[2rem] hover:border-[#8a0001]/40 transition-all group shadow-sm hover:shadow-lg">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                                        {(item.img || item.image) ? <img src={item.img || item.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" alt="" /> : <FaUserCircle className="w-full h-full p-2 opacity-20 text-slate-400" />}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xs uppercase tracking-tight">{item.title || item.name || item.fullName}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-[9px]">
                                            <span className={`px-2 py-0.5 rounded uppercase font-black ${item.status === 'active' ? 'text-green-500 bg-green-500/10' : 'text-[#8a0001] bg-[#8a0001]/10'}`}>
                                                {activeSection === 'users' ? (item.status || "PENDING") : formatDate(item.date || item.createdAt)}
                                            </span>
                                            <span className="text-slate-500 uppercase italic truncate max-w-[150px]">{item.location || item.role || item.institution}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><FaEdit size={12} /></button>
                                    <button onClick={() => handleDelete(item._id)} className="p-3 bg-[#8a0001]/10 text-[#8a0001] rounded-xl hover:bg-[#8a0001] hover:text-white transition-all"><FaTrash size={12} /></button>
                                </div>
                            </motion.div>
                        ))}
                        {currentItems.length === 0 && <p className="text-center py-20 text-[10px] text-slate-700 uppercase tracking-widest italic">No_Nodes_Found_In_Registry</p>}
                    </div>
                )}
            </div>

            {/* ৩. প্যাগিনেশন */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 py-8">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 text-slate-500 disabled:opacity-20 hover:text-white transition-colors"><FaChevronLeft /></button>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 text-slate-500 disabled:opacity-20 hover:text-white transition-colors"><FaChevronRight /></button>
                </div>
            )}

            {/* ৪. এডিট মডাল */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#050505] border border-white/10 p-8 rounded-[3rem] w-full max-w-lg relative shadow-2xl">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><FaTimes /></button>
                            <h3 className="text-xl font-black uppercase mb-8 border-l-4 border-[#8a0001] pl-4 italic tracking-tighter">Update_{activeSection}_Entry</h3>
                            <form onSubmit={handleUpdate} className="space-y-4">

                                {activeSection === 'users' ? (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-[8px] uppercase text-slate-500 ml-2">Display Name</label>
                                            <input name="name" placeholder="Full Name" defaultValue={selectedItem?.name} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] uppercase text-slate-500 ml-2">Institution</label>
                                            <input name="institution" placeholder="Institution" defaultValue={selectedItem?.institution} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] uppercase text-slate-500 ml-2">Account Status</label>
                                            <select name="status" defaultValue={selectedItem?.status} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-[10px] text-white outline-none appearance-none">
                                                <option value="active" className="bg-black text-green-500">ACTIVE_NODE</option>
                                                <option value="pending" className="bg-black text-yellow-500">PENDING_REVIEW</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] uppercase text-slate-500 ml-2">Image Node (URL)</label>
                                            <input name="img" placeholder="Profile Image URL" defaultValue={selectedItem?.image} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <input name={activeSection === 'events' ? "title" : "name"} defaultValue={selectedItem?.title || selectedItem?.name} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input name={activeSection === 'peoples' ? "role" : "location"} defaultValue={selectedItem?.role || selectedItem?.location} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" />
                                            <input type="date" name="date" defaultValue={selectedItem?.date ? new Date(selectedItem.date).toISOString().split('T')[0] : ""} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" />
                                        </div>
                                        <input name="img" defaultValue={selectedItem?.img} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" />
                                        <textarea name={activeSection === 'events' ? "description" : "desc"} defaultValue={selectedItem?.description || selectedItem?.desc} rows="3" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" />
                                    </>
                                )}

                                <button type="submit" disabled={updateLoading} className="w-full bg-[#8a0001] py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] active:scale-95 transition-all shadow-lg hover:shadow-[#8a0001]/20">
                                    {updateLoading ? 'SYNCING_DATA...' : 'COMMIT_CHANGES'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Edit;
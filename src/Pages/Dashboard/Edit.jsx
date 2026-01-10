import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaTimes, FaSyncAlt, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'animate.css';
import useAxios from '../../hooks/useAxios';

const Edit = () => {
    const axiosSecure = useAxios();
    const [activeSection, setActiveSection] = useState('events');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    // Filter & Pagination States
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'older'
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

    // --- তারিখ ফরম্যাট করার ফাংশন (Invalid Date ফিক্স) ---
    const formatDate = (dateValue) => {
        const d = new Date(dateValue);
        return isNaN(d.getTime()) ? "NOT_SET" : d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // --- ফিল্টারিং এবং সর্টিং লজিক ---
    const processedData = useMemo(() => {
        let result = [...data];

        // ১. সার্চ লজিক
        if (searchTerm) {
            result = result.filter(item => {
                const title = (item.title || item.name || "").toLowerCase();
                return title.includes(searchTerm.toLowerCase());
            });
        }

        // ২. সর্টিং লজিক (Newest vs Older)
        result.sort((a, b) => {
            const timeA = new Date(a.date || a.createdAt || 0).getTime();
            const timeB = new Date(b.date || b.createdAt || 0).getTime();

            return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
        });

        return result;
    }, [data, searchTerm, sortOrder]);

    // প্যাগিনেশন ক্যালকুলেশন
    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const currentItems = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // আপডেট হ্যান্ডলার
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        const form = e.target;
        const endpoint = activeSection === 'events' ? '/timeline' : `/${activeSection}`;

        const updatedDoc = activeSection === 'events'
            ? {
                title: form.title.value,
                location: form.location.value,
                img: form.img.value,
                description: form.description.value,
                date: new Date(form.date.value) // ডেট আপডেট নিশ্চিত করা
            }
            : {
                name: form.name.value,
                img: form.img.value,
                desc: form.desc.value,
                date: new Date(form.date.value),
                ...(activeSection === 'peoples' ? { role: form.role.value } : { location: form.location.value })
            };

        try {
            const res = await axiosSecure.patch(`${endpoint}/${selectedItem._id}`, updatedDoc);
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({
                    title: 'DATABASE_SYNCED',
                    icon: 'success',
                    background: '#050505',
                    color: '#fff',
                    showConfirmButton: false,
                    timer: 1500,
                    showClass: { popup: 'animate__animated animate__fadeInDown' }
                });
                setIsModalOpen(false);
                fetchData(activeSection);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'ERASE_DATA?',
            text: "This node will be wiped permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8a0001',
            background: '#050505',
            color: '#fff',
            confirmButtonText: 'CONFIRM_WIPE'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const endpoint = activeSection === 'events' ? '/timeline' : `/${activeSection}`;
                await axiosSecure.delete(`${endpoint}/${id}`);
                setData(data.filter(item => item._id !== id));
                Swal.fire({ title: 'ERASED', icon: 'success', background: '#050505', color: '#fff', showConfirmButton: false, timer: 1000 });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-6 text-white font-mono">

            {/* ১. টপ কন্ট্রোল বার */}
            <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-white/[0.02] p-6 rounded-[2.5rem] border border-white/5">

                {/* Tabs */}
                <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                    {['events', 'institutions', 'peoples'].map(tab => (
                        <button key={tab} onClick={() => setActiveSection(tab)} className={`px-6 py-2 rounded-xl uppercase text-[9px] font-bold tracking-widest transition-all ${activeSection === tab ? 'bg-[#8a0001] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>{tab}</button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
                    {/* Sort Filter Options */}
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto">
                        <button
                            onClick={() => setSortOrder("newest")}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[9px] uppercase font-bold transition-all ${sortOrder === "newest" ? "bg-[#8a0001] text-white" : "text-slate-500"}`}
                        >
                            Last / Newest
                        </button>
                        <button
                            onClick={() => setSortOrder("older")}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[9px] uppercase font-bold transition-all ${sortOrder === "older" ? "bg-[#8a0001] text-white" : "text-slate-500"}`}
                        >
                            Older First
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]" />
                        <input
                            type="text"
                            placeholder="SEARCH_DATA..."
                            className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 rounded-xl text-[10px] outline-none focus:border-[#8a0001]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* ২. ডাটা লিস্ট */}
            <div className="min-h-[450px]">
                {loading ? (
                    <div className="flex justify-center py-20"><FaSyncAlt className="animate-spin text-[#8a0001] text-2xl" /></div>
                ) : (
                    <div className="grid gap-4">
                        {currentItems.map(item => (
                            <motion.div layout key={item._id} className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-[2rem] hover:border-[#8a0001]/40 transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                                        {item.img && <img src={item.img} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" alt="" />}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xs uppercase tracking-tighter">{item.title || item.name}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-[9px]">
                                            <span className="text-[#8a0001] font-black uppercase tracking-widest bg-[#8a0001]/10 px-2 py-0.5 rounded">
                                                {formatDate(item.date || item.createdAt)}
                                            </span>
                                            <span className="text-slate-600">|</span>
                                            <span className="text-slate-500 uppercase italic">{item.location || item.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><FaEdit size={12} /></button>
                                    <button onClick={() => handleDelete(item._id)} className="p-3 bg-[#8a0001]/10 text-[#8a0001] rounded-xl hover:bg-[#8a0001] hover:text-white transition-all"><FaTrash size={12} /></button>
                                </div>
                            </motion.div>
                        ))}
                        {currentItems.length === 0 && <p className="text-center py-20 text-[10px] text-slate-700 tracking-[0.5em] uppercase italic">Registry_Node_Empty</p>}
                    </div>
                )}
            </div>

            {/* ৩. প্যাগিনেশন */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 py-8">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 text-slate-500 hover:text-white disabled:opacity-20 transition-colors"><FaChevronLeft /></button>
                    <span className="text-[10px] tracking-widest text-slate-400">PAGE {currentPage} / {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 text-slate-500 hover:text-white disabled:opacity-20 transition-colors"><FaChevronRight /></button>
                </div>
            )}

            {/* ৪. এডিট মডাল */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#050505] border border-white/10 p-8 md:p-10 rounded-[3rem] w-full max-w-lg relative">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><FaTimes /></button>
                            <h3 className="text-xl font-black italic uppercase mb-8 border-l-4 border-[#8a0001] pl-4 tracking-tighter text-white">Update_Node_Entry</h3>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[8px] text-slate-500 uppercase ml-2">Label / Name</label>
                                    <input name={activeSection === 'events' ? "title" : "name"} defaultValue={selectedItem?.title || selectedItem?.name} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#8a0001]" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[8px] text-slate-500 uppercase ml-2">Sector / Role</label>
                                        <input name={activeSection === 'peoples' ? "role" : "location"} defaultValue={selectedItem?.role || selectedItem?.location} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[8px] text-slate-500 uppercase ml-2">Registry_Date</label>
                                        <input type="date" name="date" defaultValue={selectedItem?.date ? new Date(selectedItem.date).toISOString().split('T')[0] : ""} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[8px] text-slate-500 uppercase ml-2">Image_Node_URL</label>
                                    <input name="img" defaultValue={selectedItem?.img} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[8px] text-slate-500 uppercase ml-2">Description_Data</label>
                                    <textarea name={activeSection === 'events' ? "description" : "desc"} defaultValue={selectedItem?.description || selectedItem?.desc} rows="3" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white" />
                                </div>
                                <button type="submit" disabled={updateLoading} className="w-full bg-[#8a0001] py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-lg shadow-[#8a0001]/20 mt-4 active:scale-95 transition-transform">
                                    {updateLoading ? 'SYNCING...' : 'COMMIT_CHANGES'}
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
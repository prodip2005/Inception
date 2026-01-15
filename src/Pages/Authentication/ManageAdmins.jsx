import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaTimes, FaSyncAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const ManageAdmins = () => {
    const axiosSecure = useAxios();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    // ১. ডাটাবেজ থেকে সব অ্যাডমিন নিয়ে আসা
    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get('/admins');
            setAdmins(res.data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    // ২. অ্যাডমিন ডিলিট করার লজিক (নিরাপত্তাসহ)
    const handleDelete = async (id) => {
        // নিরাপত্তা চেক: যদি মাত্র ১ জন অ্যাডমিন থাকে তবে ডিলিট করতে দেবে না
        if (admins.length <= 1) {
            return Swal.fire({
                title: 'ACCESS_DENIED',
                text: 'System requires at least one active administrator to maintain registry access.',
                icon: 'error',
                background: '#050505',
                color: '#fff',
                confirmButtonColor: '#d22f27'
            });
        }

        Swal.fire({
            title: 'WIPE_ADMIN?',
            text: "Are you sure you want to revoke this node's access?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d22f27',
            cancelButtonColor: '#333',
            background: '#050505',
            color: '#fff',
            confirmButtonText: 'YES, ERASE'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/admins/${id}`);
                    if (res.data.deletedCount > 0) {
                        setAdmins(admins.filter(a => a._id !== id));
                        Swal.fire({
                            title: 'WIPED',
                            icon: 'success',
                            background: '#050505',
                            color: '#fff'
                        });
                    }
                } catch (error) {
                    Swal.fire({ title: 'ERROR', text: 'Failed to erase node.', icon: 'error' });
                }
            }
        });
    };

    // ৩. অ্যাডমিন আপডেট করার লজিক
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            name: form.name.value,
            image: form.image.value,
            gmail: form.gmail.value,
            password: form.password.value
        };

        try {
            const res = await axiosSecure.patch(`/admins/${selectedAdmin._id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'UPDATED',
                    icon: 'success',
                    background: '#050505',
                    color: '#fff',
                    timer: 1500
                });
                setIsModalOpen(false);
                fetchAdmins();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 font-mono text-white min-h-screen">
            <header className="flex items-center gap-4 mb-12 border-b border-white/5 pb-8">
                <div className="p-3 bg-[#d22f27]/10 rounded-xl">
                    <FaUserShield className="text-[#d22f27] text-2xl" />
                </div>
                <div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Admin_Registry</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Total_Active_Nodes: {admins.length}</p>
                </div>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <FaSyncAlt className="animate-spin text-[#d22f27] text-3xl" />
                    <p className="text-[10px] uppercase tracking-[0.3em] animate-pulse">Scanning_Database...</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {admins.map(admin => (
                        <motion.div
                            layout
                            key={admin._id}
                            className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-[2rem] group hover:border-[#d22f27]/30 transition-all duration-500"
                        >
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <img
                                        src={admin.image}
                                        className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10"
                                        alt={admin.name}
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#020617]"></div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-tight">{admin.name}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{admin.email}</p>
                                    <span className="text-[8px] px-2 py-0.5 bg-[#d22f27]/10 text-[#d22f27] rounded-full uppercase font-bold mt-2 inline-block">Role: {admin.role}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setSelectedAdmin(admin); setIsModalOpen(true); }}
                                    className="p-3.5 bg-blue-500/10 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-lg hover:shadow-blue-500/20"
                                >
                                    <FaEdit size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(admin._id)}
                                    className="p-3.5 bg-[#d22f27]/10 text-[#d22f27] rounded-2xl hover:bg-[#d22f27] hover:text-white transition-all shadow-lg hover:shadow-[#d22f27]/20"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* --- Edit Admin Modal --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#050505] border border-white/10 p-10 rounded-[3rem] w-full max-w-md relative shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d22f27]/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>

                            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                                <FaTimes size={20} />
                            </button>

                            <h3 className="text-xl font-black uppercase mb-8 italic border-l-4 border-[#d22f27] pl-4 tracking-tighter">Update_Admin_Node</h3>

                            <form onSubmit={handleUpdate} className="space-y-4 relative z-10">
                                <div>
                                    <label className="text-[8px] uppercase text-slate-500 ml-2 mb-1 block tracking-widest italic font-bold">Admin_Name</label>
                                    <input name="name" defaultValue={selectedAdmin?.name} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27] transition-all" required />
                                </div>
                                <div>
                                    <label className="text-[8px] uppercase text-slate-500 ml-2 mb-1 block tracking-widest italic font-bold">Avatar_URL</label>
                                    <input name="image" defaultValue={selectedAdmin?.image} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27] transition-all" required />
                                </div>
                                <div>
                                    <label className="text-[8px] uppercase text-slate-500 ml-2 mb-1 block tracking-widest italic font-bold">Email_Address</label>
                                    <input name="gmail" defaultValue={selectedAdmin?.email} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27] transition-all" required />
                                </div>
                                <div>
                                    <label className="text-[8px] uppercase text-slate-500 ml-2 mb-1 block tracking-widest italic font-bold">Security_Key</label>
                                    <input name="password" defaultValue={selectedAdmin?.password} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27] transition-all" required />
                                </div>

                                <button type="submit" className="w-full bg-[#d22f27] py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] shadow-xl shadow-[#d22f27]/20 hover:shadow-[#d22f27]/40 active:scale-95 transition-all mt-4">
                                    Commit_Changes_
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageAdmins;
import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaCheck, FaTimes, FaUserCircle, FaUniversity, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RequestedMembers = () => {
    const axiosSecure = useAxios();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // ডাটা লোড করার ফাংশন
    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get('/users');
            // শুধুমাত্র যাদের স্ট্যাটাস 'pending' তাদের ফিল্টার করা হচ্ছে
            const pendingOnes = res.data.filter(user => user.status === "pending");
            setRequests(pendingOnes);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching requests:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Approve বা Reject অ্যাকশন হ্যান্ডলার
    const handleAction = (id, action) => {
        Swal.fire({
            title: `Confirm ${action === 'approve' ? 'Approval' : 'Rejection'}?`,
            text: action === 'approve'
                ? "This member will be moved to the active registry."
                : "This request will be permanently removed.",
            icon: 'warning',
            background: '#0a0a0a',
            color: '#fff',
            showCancelButton: true,
            confirmButtonColor: action === 'approve' ? '#22c55e' : '#d22f27',
            cancelButtonColor: '#333',
            confirmButtonText: action === 'approve' ? 'YES_APPROVE' : 'YES_REJECT',
            cancelButtonText: 'CANCEL'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (action === 'approve') {
                        // ব্যাকএন্ডে স্ট্যাটাস 'active' করার জন্য PATCH রিকোয়েস্ট
                        const res = await axiosSecure.patch(`/users/approve/${id}`);
                        if (res.data.modifiedCount > 0) {
                            setRequests(prev => prev.filter(req => req._id !== id));
                            Swal.fire({
                                title: 'SUCCESS',
                                text: 'Member node activated.',
                                icon: 'success',
                                background: '#0a0a0a',
                                color: '#fff',
                                confirmButtonColor: '#d22f27'
                            });
                        }
                    } else {
                        // ব্যাকএন্ড থেকে রিকোয়েস্ট ডিলিট করার জন্য DELETE রিকোয়েস্ট
                        const res = await axiosSecure.delete(`/users/reject/${id}`);
                        if (res.data.deletedCount > 0) {
                            setRequests(prev => prev.filter(req => req._id !== id));
                            Swal.fire({
                                title: 'REJECTED',
                                text: 'Request purged from system.',
                                icon: 'success',
                                background: '#0a0a0a',
                                color: '#fff',
                                confirmButtonColor: '#d22f27'
                            });
                        }
                    }
                } catch (error) {
                    console.error('Action failed:', error);
                    Swal.fire({
                        title: 'SYSTEM_ERROR',
                        text: 'Could not process request.',
                        icon: 'error',
                        background: '#0a0a0a',
                        color: '#fff'
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d22f27]"></div>
                    <p className="text-[#d22f27] font-mono text-xs tracking-widest animate-pulse uppercase">Syncing_Pending_Nodes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4 md:px-6 bg-transparent font-mono">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="mb-12 border-l-8 border-[#d22f27] pl-6 py-2 bg-white/[0.02] rounded-r-2xl">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                        ACCESS_REQUESTS<span className="text-[#d22f27]">_</span>
                    </h2>
                    <p className="text-slate-500 text-[10px] md:text-xs mt-2 uppercase tracking-[0.3em]">
                        // Queue_Status: {requests.length} Pending Verifications
                    </p>
                </div>

                {/* List Container */}
                <div className="grid gap-4">
                    <AnimatePresence mode="popLayout">
                        {requests.map((member) => (
                            <motion.div
                                key={member._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group bg-white/[0.03] backdrop-blur-md border border-white/5 p-4 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#d22f27]/30 transition-all duration-500"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="relative">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#d22f27]/50 transition-colors">
                                            {member.image ? (
                                                <img src={member.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={member.name} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-white/5 text-slate-700">
                                                    <FaUserCircle size={40} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-[#d22f27] text-[8px] text-white font-bold rounded shadow-lg animate-pulse">
                                            NEW
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight group-hover:text-[#d22f27] transition-colors italic">
                                            {member.name}
                                        </h4>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                                                <FaUniversity className="text-[#d22f27]" /> {member.institution}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                                                <FaMapMarkerAlt className="text-[#d22f27]" /> {member.district}, {member.division}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-4 w-full md:w-auto justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                                    <div className="hidden lg:flex flex-col items-end mr-4">
                                        <span className="text-[9px] text-slate-600 uppercase font-black">Waiting_Since</span>
                                        <span className="text-[10px] text-yellow-500/80 font-mono">
                                            {new Date(member.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAction(member._id, 'approve')}
                                            className="flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-500 hover:text-white transition-all duration-300 border border-green-500/20 text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-green-500/20"
                                        >
                                            <FaCheck /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(member._id, 'reject')}
                                            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-red-500/20"
                                        >
                                            <FaTimes /> Reject
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Empty State */}
                    {!loading && requests.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]"
                        >
                            <div className="inline-block p-6 rounded-full bg-white/5 mb-6">
                                <FaClock size={40} className="text-slate-700" />
                            </div>
                            <h3 className="text-slate-500 font-mono text-sm uppercase tracking-[0.5em]">
                                No_Pending_Requests_Found
                            </h3>
                            <p className="text-slate-700 text-[10px] mt-4 uppercase italic">// All Nodes Synchronized</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestedMembers;
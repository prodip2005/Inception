import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const AddAdmin = () => {
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(false);

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        // Password field bad deya hoyeche
        const adminData = {
            name: form.name.value,
            image: form.image.value,
            gmail: form.gmail.value,
            role: 'admin', // Optional: Backend e role define korar jonno
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/admins', adminData);

            // Backend theke jodi insertedId ba success message ashe
            if (res.data.insertedId || res.data.success) {
                Swal.fire({
                    title: 'SUCCESS',
                    text: 'Admin Created Successfully!',
                    icon: 'success',
                    background: '#050505',
                    color: '#fff',
                    confirmButtonColor: '#d22f27'
                });
                form.reset();
            }
        } catch (error) {
            console.error("Submission Error:", error.response?.data || error.message);
            Swal.fire({
                title: 'ERROR',
                text: error.response?.data?.message || 'Failed to create admin. Check console for details.',
                icon: 'error',
                background: '#050505',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 font-mono">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl"
            >
                <h2 className="text-2xl font-black uppercase text-center mb-8 italic tracking-tighter text-white">
                    Add_Admin_Node
                </h2>

                <form onSubmit={handleAddAdmin} className="space-y-4">
                    {/* Name Input */}
                    <input
                        name="name"
                        type="text"
                        placeholder="FULL_NAME"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#d22f27] transition-all"
                        required
                    />

                    {/* Image URL Input */}
                    <input
                        name="image"
                        type="url"
                        placeholder="IMAGE_URL"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#d22f27] transition-all"
                        required
                    />

                    {/* Email Input */}
                    <input
                        name="gmail"
                        type="email"
                        placeholder="GMAIL_ADDRESS"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white outline-none focus:border-[#d22f27] transition-all"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#d22f27] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#d22f27]/20"
                    >
                        {loading ? 'COMMITING...' : 'COMMIT_ADMIN_DATA'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddAdmin;
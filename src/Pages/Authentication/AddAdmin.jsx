import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEnvelope, FaLock, FaLink, FaUser } from 'react-icons/fa';

const AddAdmin = () => {
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(false);

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const adminData = {
            name: form.name.value,
            image: form.image.value,
            gmail: form.gmail.value,
            password: form.password.value
        };

        try {
            const res = await axiosSecure.post('/admins', adminData);
            if (res.data.insertedId) {
                Swal.fire({ title: 'SUCCESS', text: 'Admin Created!', icon: 'success', background: '#050505', color: '#fff' });
                form.reset();
            }
        } catch (error) {
            Swal.fire({ title: 'ERROR', text: 'Failed to create admin.', icon: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 font-mono">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
                <h2 className="text-2xl font-black uppercase text-center mb-8 italic tracking-tighter">Add_Admin_Node</h2>
                <form onSubmit={handleAddAdmin} className="space-y-4">
                    <input name="name" placeholder="FULL_NAME" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27]" required />
                    <input name="image" placeholder="IMAGE_URL" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27]" required />
                    <input name="gmail" type="email" placeholder="GMAIL_ADDRESS" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27]" required />
                    {/* <input name="password" type="password" placeholder="PASSWORD" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs outline-none focus:border-[#d22f27]" required /> */}
                    <button type="submit" disabled={loading} className="w-full bg-[#d22f27] py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all active:scale-95 shadow-lg shadow-[#d22f27]/20">
                        {loading ? 'COMMITING...' : 'COMMIT_ADMIN_DATA'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddAdmin;
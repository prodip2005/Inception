import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaUserTie, FaImage, FaFingerprint, FaPaperPlane } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const AddPeople = () => {
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const peopleData = {
            name: form.name.value,
            role: form.role.value,
            img: form.img.value,
            bio: form.bio.value
        };

        try {
            const res = await axiosSecure.post('/peoples', peopleData);

            if (res.data.insertedId) {
                alert('Personnel_Registered: Successfully added to core nodes ✅');
                form.reset();
            }
        } catch (error) {
            console.error('Add people failed:', error);
            alert('Access_Denied: Synchronization failed ❌');
        } finally {
            setLoading(false);
        }
    };

    // ইউনিফর্ম ইনপুট স্টাইল
    const inputStyle = "w-full bg-white/[0.02] border border-white/10 p-4 rounded-2xl outline-none text-white focus:border-[#8a0001] focus:bg-white/[0.05] transition-all placeholder:text-slate-600 font-mono text-sm";

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden">

                {/* Background Decoration */}
                <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none">
                    <FaFingerprint size={280} className="text-[#8a0001]" />
                </div>

                <div className="mb-10 relative z-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
                        <FaUserPlus className="text-[#8a0001]" /> Register_Personnel
                    </h2>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
                        // Protocol: Personnel_Entry // Access_Level: Root_Admin
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                    {/* Full Name */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                            Full_Legal_Name
                        </label>
                        <input name="name" placeholder="E.G. ABRAR HAIDER" required className={inputStyle} />
                    </div>

                    {/* Role / Designation */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                            <FaUserTie size={10} className="text-[#8a0001]" /> Designation_Role
                        </label>
                        <input name="role" placeholder="E.G. EXECUTIVE LEAD / RESEARCHER" required className={inputStyle} />
                    </div>

                    {/* Profile Image URL */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                            <FaImage size={10} className="text-[#8a0001]" /> Avatar_Source_URL
                        </label>
                        <input name="img" placeholder="https://server.com/avater.png" className={inputStyle} />
                    </div>

                    {/* Short Bio */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 font-bold italic">Operational_Brief (Bio)</label>
                        <textarea
                            name="bio"
                            rows="4"
                            placeholder="DESCRIBE PERSONNEL RESPONSIBILITIES AND MISSION OBJECTIVES..."
                            required
                            className={inputStyle}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8a0001] hover:bg-[#a00001] text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all shadow-[0_10px_30px_rgba(138,0,1,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <span className="animate-pulse italic italic">Transmitting_Data...</span>
                            ) : (
                                <>
                                    Add_Personnel_to_Core <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer Sync Status */}
                <div className="mt-10 flex justify-between items-center px-4 border-t border-white/5 pt-6">
                    <span className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em]">Inception_Security_Protocol_Active</span>
                    <div className="flex gap-1.5">
                        <div className="w-1 h-1 bg-[#8a0001] rounded-full"></div>
                        <div className="w-1 h-1 bg-[#8a0001] rounded-full animate-ping"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AddPeople;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaMapMarkerAlt, FaImage, FaCalendarAlt, FaPlus, FaCheckDouble } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const AddInstitutions = () => {
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const institutionData = {
            name: form.name.value,
            img: form.img.value,
            location: form.location.value,
            desc: form.desc.value,
            date: form.date.value
        };

        try {
            const res = await axiosSecure.post('/institutions', institutionData);
            if (res.data) {
                alert('Institution_Authorized: Entry saved successfully ✅');
                form.reset();
            }
        } catch (error) {
            console.error('Add institution failed:', error);
            alert('Access_Denied: Synchronization failed ❌');
        } finally {
            setLoading(false);
        }
    };

    // কমান্ড সেন্টার স্টাইল ইনপুট ডিজাইন
    const inputStyle = "w-full bg-white/[0.02] border border-white/10 p-4 rounded-2xl outline-none text-white focus:border-[#8a0001] focus:bg-white/[0.05] transition-all placeholder:text-slate-600 font-mono text-sm";

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden">

                {/* Background Decoration Icon */}
                <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
                    <FaUniversity size={250} className="text-[#8a0001]" />
                </div>

                <div className="mb-10 relative z-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
                        <FaUniversity className="text-[#8a0001]" /> Link_Institution
                    </h2>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
                        // Status: Secure_Entry // Node: Academic_Database
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                    {/* Institution Name */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2 font-bold">
                            Institution_Name
                        </label>
                        <input name="name" placeholder="E.G. HARVARD INQUIRY LAB" required className={inputStyle} />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                            <FaImage size={10} className="text-[#8a0001]" /> Resource_Image_URL
                        </label>
                        <input name="img" placeholder="HTTPS://IMAGE-HOST.COM/LOGO.PNG" required className={inputStyle} />
                    </div>

                    {/* Affiliation Date */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                            <FaCalendarAlt size={10} className="text-[#8a0001]" /> Connection_Date
                        </label>
                        <input type="date" name="date" required className={inputStyle} />
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                            <FaMapMarkerAlt size={10} className="text-[#8a0001]" /> Physical_Coordinates (Location)
                        </label>
                        <input name="location" placeholder="E.G. NEW YORK, USA / SECTOR 7" required className={inputStyle} />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 font-bold">Institutional_Brief_Log</label>
                        <textarea
                            name="desc"
                            rows="4"
                            placeholder="PROVIDE A DETAILED SUMMARY OF THE ACADEMIC PARTNERSHIP..."
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
                                <span className="animate-pulse">INITIALIZING_UPLOADER...</span>
                            ) : (
                                <>
                                    AUTHORIZE_LINKING <FaCheckDouble className="group-hover:scale-125 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* System Stats Footer */}
                <div className="mt-10 flex justify-between items-center px-4 border-t border-white/5 pt-6">
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em]">Inception_Vault_v4.0</span>
                </div>
            </div>
        </motion.div>
    );
};

export default AddInstitutions;
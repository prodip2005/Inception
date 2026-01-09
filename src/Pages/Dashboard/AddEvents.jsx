import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarPlus, FaRocket, FaMapMarkerAlt, FaTags, FaClipboardList, FaUsers } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const AddEvents = () => {
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(false);

    const generateEventId = () => {
        const year = new Date().getFullYear();
        const random = Math.floor(100 + Math.random() * 900);
        return `EVT-${year}-${random}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        const eventData = {
            id: generateEventId(),
            title: form.title.value,
            date: form.date.value,
            location: form.location.value,
            description: form.description.value,
            category: form.category.value,
            status: form.status.value,
            expected_participants: form.participants.value,
            tags: form.tags.value ? form.tags.value.split(',').map(t => t.trim()) : [],
            schedule: form.schedule.value ? form.schedule.value.split('\n').map(s => s.trim()) : [],
            requirements: form.requirements.value,
        };

        try {
            // আপনার এপিআই এন্ডপয়েন্ট অনুযায়ী এটি কাজ করবে
            const res = await axiosSecure.post('/timeline', eventData);
            if (res.data) {
                alert('Event_Authorized: Successfully Added to Database ✅');
                form.reset();
            }
        } catch (error) {
            console.error(error);
            alert('Access_Denied: Failed to save event ❌');
        } finally {
            setLoading(false);
        }
    };

    // কমন ইনপুট স্টাইল
    const inputStyle = "w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl outline-none text-white focus:border-[#d22f27] focus:bg-white/[0.05] transition-all placeholder:text-slate-600 font-mono text-sm";

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <FaCalendarPlus size={120} className="text-[#d22f27]" />
                </div>

                <div className="mb-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
                        <FaCalendarPlus className="text-[#d22f27]" /> Initialize_New_Event
                    </h2>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
                        // Protocol: Event_Creation // Level: Admin_Root
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Event Title */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">Event_Title</label>
                        <input name="title" placeholder="ENTER EVENT NAME" required className={inputStyle} />
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">Execution_Date</label>
                        <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} className={inputStyle} />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-1"><FaMapMarkerAlt size={8} /> Sector_Location</label>
                        <input name="location" placeholder="e.g. Main Auditorium" required className={inputStyle} />
                    </div>

                    {/* Category & Status */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 italic">Class_Category</label>
                        <input name="category" placeholder="Summit / Workshop / Seminar" className={inputStyle} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">Current_Status</label>
                        <input name="status" placeholder="Registration Open / Closed" className={inputStyle} />
                    </div>

                    {/* Participants & Tags */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-1"><FaUsers size={8} /> Capacity_Limit</label>
                        <input name="participants" placeholder="e.g. 500+" className={inputStyle} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-1"><FaTags size={8} /> Metadata_Tags</label>
                        <input name="tags" placeholder="Comma separated: AI, Tech, Meetup" className={inputStyle} />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">Detailed_Log_Description</label>
                        <textarea name="description" rows="3" placeholder="Brief about the event..." required className={inputStyle}></textarea>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-1"><FaClipboardList size={8} /> Timeline_Schedule</label>
                        <textarea name="schedule" rows="4" placeholder="One per line:&#10;09:00 AM - Opening&#10;11:00 AM - Keynote" className={inputStyle}></textarea>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-2">Entry_Prerequisites</label>
                        <textarea name="requirements" rows="4" placeholder="Special requirements or instructions..." className={inputStyle}></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#d22f27] hover:bg-[#a00001] text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all shadow-[0_10px_30px_rgba(138,0,1,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <span className="animate-pulse italic">Uploading_to_Nodes...</span>
                            ) : (
                                <>
                                    Add_New_Event <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AddEvents;
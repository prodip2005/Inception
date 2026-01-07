import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Events = () => {
    const eventData = [
        {
            title: "Annual Tech Meetup 2026",
            date: "15 Jan, 2026",
            location: "Main Auditorium",
            description: "Join us for the biggest tech conference of the year focusing on future innovations."
        },
        {
            title: "Inception Design Workshop",
            date: "22 Jan, 2026",
            location: "Room 402, IT Building",
            description: "A hands-on session on modern UI/UX principles and design systems."
        },
        {
            title: "Coding Championship",
            date: "05 Feb, 2026",
            location: "Online Contest",
            description: "Compete with the best minds in a 12-hour coding marathon."
        },
        {
            title: "Networking Dinner",
            date: "10 Feb, 2026",
            location: "Grand Palace",
            description: "An evening to connect with industry leaders and alumni."
        },
    ];

    return (
        <section id='events' className="py-20 relative px-4">
            {/* সেকশন টাইটেল */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-16 ml-8 md:ml-16"
            >
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                    Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a0001] via-red-500  to-white font-black uppercase tracking-tighter">
                        Timeline
                    </span>
                </h2>
                <p className="text-gray-500 mt-2 uppercase tracking-[0.3em] text-xs font-bold">Roadmap to Success</p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">

                {/* ১. ভার্টিক্যাল লাইন (Tree Trunk) - একদম বাম পাশে */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8a0001] via-white/20 to-transparent"></div>

                {/* ইভেন্ট লিস্ট */}
                <div className="space-y-12">
                    {eventData.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="relative pl-10"
                        >
                            {/* ২. টাইমলাইন কানেক্টর ডট (সিম্পল সার্কেল) */}
                            <div className="absolute left-[-5px] top-2 w-3 h-3 bg-[#8a0001] rounded-full shadow-[0_0_10px_#8a0001]"></div>

                            {/* ৩. গ্লাসি কার্ড */}
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="p-6 bg-white/[0.02] backdrop-blur-xl border-l-2 border-[#8a0001] rounded-r-2xl rounded-l-sm relative group transition-all duration-300 shadow-[20px_0_40px_rgba(0,0,0,0.2)]"
                            >
                                {/* হোভারে হালকা গ্লো */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#8a0001]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-r-2xl"></div>

                                <div className="relative z-10">
                                    <div className="flex flex-wrap items-center gap-4 mb-3">
                                        <span className="text-[#8a0001] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                            <FaCalendarAlt /> {event.date}
                                        </span>
                                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                            <FaMapMarkerAlt /> {event.location}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#8a0001] transition-colors uppercase tracking-tight">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                                        {event.description}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
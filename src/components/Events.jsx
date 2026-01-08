import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';

const Events = () => {
    const axiosSecure = useAxios();
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        axiosSecure.get('/timeline')
            .then(res => {
                // 🔥 ensure only 4 events
                setEventData(res.data.slice(0, 4));
            })
            .catch(console.error);
    }, [axiosSecure]);

    return (
        <section id='events' className="py-24 relative px-6 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#8a0001]/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-left"
                >
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        OUR <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a0001] via-red-500 to-white">
                            TIMELINE
                        </span>
                        <span className="text-[#8a0001] animate-pulse">_</span>
                    </h2>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="h-[1px] w-12 bg-[#8a0001]"></div>
                        <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold">
                            Roadmap to Success
                        </p>
                    </div>
                </motion.div>

                <div className="relative max-w-3xl ml-4 md:ml-20">
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8a0001] via-white/10 to-transparent"></div>

                    <div className="space-y-16">
                        {eventData.map((event, index) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className="relative pl-10 md:pl-16"
                            >
                                <div className="absolute left-[-4px] top-3 w-2 h-2 bg-[#8a0001] rounded-full">
                                    <div className="absolute inset-0 bg-[#8a0001] rounded-full animate-ping opacity-40"></div>
                                </div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="p-8 bg-white/[0.01] backdrop-blur-2xl border border-white/5 border-l-2 border-l-[#8a0001] rounded-2xl relative group transition-all duration-500"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#8a0001]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                                    <div className="relative z-10">
                                        <div className="flex flex-wrap items-center gap-6 mb-4">
                                            <div className="flex items-center gap-2 text-[#8a0001] font-mono text-xs font-bold uppercase tracking-widest">
                                                <FaCalendarAlt className="text-[10px]" />
                                                {new Date(event.date).toDateString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-white/30 font-mono text-[10px] uppercase tracking-widest">
                                                <FaMapMarkerAlt />
                                                {event.location}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-3">
                                            {event.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl font-light">
                                            {event.description?.slice(0, 100)}...
                                        </p>
                                    </div>

                                    <div className="absolute top-4 right-6 text-white/[0.03] font-black text-4xl italic select-none pointer-events-none">
                                        0{index + 1}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;

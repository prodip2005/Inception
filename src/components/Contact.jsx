import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section id="contact" className="py-32 relative bg-transparent overflow-hidden">
            {/* Dynamic Background Glows */}
            <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#8a0001]/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-16"
                >
                    {/* --- Left Column: Typography & Info --- */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <motion.div variants={itemVariants} className="mb-12">
                            <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase">
                                START A <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a0001] via-red-500 to-white">
                                    PROJECT_
                                </span>
                            </h2>
                            <p className="text-slate-400 mt-6 text-lg font-light max-w-md italic">
                                "// Establishing secure connection..."
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            {[
                                { icon: <FaEnvelope />, text: "ops@inception.com", label: "Email Us" },
                                { icon: <FaPhoneAlt />, text: "+880 1234 567 890", label: "Call Us" },
                                { icon: <FaMapMarkerAlt />, text: "Dhaka, Bangladesh", label: "Visit Us" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#8a0001] group-hover:bg-[#8a0001] group-hover:text-white transition-all duration-500 backdrop-blur-md">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-mono">{item.label}</p>
                                        <p className="text-white font-medium group-hover:text-[#8a0001] transition-colors">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* --- Right Column: The Glass Form --- */}
                    <motion.div variants={itemVariants} className="lg:col-span-7">
                        <div className="relative p-8 md:p-12 bg-white/[0.01] backdrop-blur-[30px] border border-white/[0.08] rounded-[3rem] shadow-2xl">
                            
                            {/* Subtitle inside form */}
                            <div className="mb-10">
                                <h3 className="text-white font-bold text-xl uppercase tracking-widest">Secure Messaging</h3>
                                <div className="h-[2px] w-12 bg-[#8a0001] mt-2"></div>
                            </div>

                            <form className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Input Field: Glass Style */}
                                    <div className="relative group/field">
                                        <input 
                                            type="text" 
                                            required 
                                            className="peer w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#8a0001]/50 focus:bg-white/[0.07] backdrop-blur-md transition-all placeholder-transparent" 
                                            placeholder="Full Name" 
                                        />
                                        <label className="absolute left-6 top-4 text-slate-500 text-sm transition-all peer-focus:-top-7 peer-focus:left-2 peer-focus:text-[#8a0001] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-7 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs">
                                            FULL NAME
                                        </label>
                                    </div>

                                    <div className="relative group/field">
                                        <input 
                                            type="email" 
                                            required 
                                            className="peer w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#8a0001]/50 focus:bg-white/[0.07] backdrop-blur-md transition-all placeholder-transparent" 
                                            placeholder="Email Address" 
                                        />
                                        <label className="absolute left-6 top-4 text-slate-500 text-sm transition-all peer-focus:-top-7 peer-focus:left-2 peer-focus:text-[#8a0001] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-7 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs">
                                            EMAIL ADDRESS
                                        </label>
                                    </div>
                                </div>

                                <div className="relative group/field">
                                    <textarea 
                                        required 
                                        rows="4" 
                                        className="peer w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-4 text-white outline-none focus:border-[#8a0001]/50 focus:bg-white/[0.07] backdrop-blur-md transition-all resize-none placeholder-transparent" 
                                        placeholder="Message"
                                    ></textarea>
                                    <label className="absolute left-6 top-4 text-slate-500 text-sm transition-all peer-focus:-top-7 peer-focus:left-2 peer-focus:text-[#8a0001] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-7 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs">
                                        YOUR MESSAGE
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full relative py-5 rounded-2xl overflow-hidden group/btn"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8a0001] to-red-600 transition-all duration-500 group-hover/btn:scale-105"></div>
                                    <div className="relative flex items-center justify-center gap-3 text-white font-bold uppercase tracking-[0.4em] text-[10px]">
                                        Dispatch Message <FaPaperPlane className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" />
                                    </div>
                                </motion.button>
                            </form>

                            {/* Decorative Corner Scanline */}
                            <div className="absolute bottom-4 right-8 text-[8px] font-mono text-white/5 tracking-[0.5em] uppercase pointer-events-none">
                                Secure_Encrypted_Channel
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
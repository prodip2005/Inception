import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaPaperPlane, FaTools, FaGamepad, FaMapMarkerAlt, FaGlobe, FaHandshake, FaHandsHelping } from 'react-icons/fa';

const JoinForm = () => {
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 md:py-4 md:pl-12 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-[#d22f27]/50 focus:bg-white/10 transition-all duration-300 appearance-none";
    const labelClasses = "block text-[9px] md:text-[13px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black text-[#d22f27] mb-1.5 ml-1";
    const iconWrapperClasses = "absolute left-3.5 inset-y-0 flex items-center justify-center text-gray-500 group-focus-within:text-[#d22f27] transition-colors duration-300 pointer-events-none";

    const bdData = {
        "Barishal": ["Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
        "Chattogram": ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
        "Dhaka": ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
        "Khulna": ["Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
        "Mymensingh": ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
        "Rajshahi": ["Bogra", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Rajshahi", "Sirajganj"],
        "Rangpur": ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
        "Sylhet": ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"]
    };

    const handleDivisionChange = (e) => {
        setSelectedDivision(e.target.value);
        setSelectedDistrict("");
    };

    return (
        <section className="py-16 md:py-28 px-4 md:px-6 relative overflow-hidden bg-transparent" id="join">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#d22f27]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* --- Introduction Header --- */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase italic">
                            Join the <span className="text-[#d22f27] drop-shadow-[0_0_15px_rgba(138,0,1,0.5)]">Movement</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                            Whether you are a student, teacher, or community member, there is a place for you at <span className="text-white font-bold">Inception</span>.
                            Help us build a future where education inspires creativity.
                        </p>
                    </motion.div>
                </div>

                {/* --- Main Form Card --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 md:p-14 shadow-2xl relative overflow-hidden"
                >
                    {/* Subtle Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent h-[200%] animate-[scan_10s_linear_infinite] pointer-events-none"></div>

                    <form className="space-y-6 md:space-y-10 relative z-10">
                        {/* Input Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>Full Name</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaUser size={14} /></div>
                                    <input type="text" placeholder="Access Identity" className={inputClasses} required />
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Email Address</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaEnvelope size={14} /></div>
                                    <input type="email" placeholder="mail@inception.com" className={inputClasses} required />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>Phone Number</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaPhone size={14} /></div>
                                    <input type="tel" placeholder="01XXXXXXXXX" className={inputClasses} required />
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Division</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaGlobe size={14} /></div>
                                    <select value={selectedDivision} onChange={handleDivisionChange} className={inputClasses} required>
                                        <option value="" className="bg-[#020617]">Select Region</option>
                                        {Object.keys(bdData).map(div => (
                                            <option key={div} value={div} className="bg-[#020617]">{div}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>District</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaMapMarkerAlt size={14} /></div>
                                    <select
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                        className={`${inputClasses} ${!selectedDivision ? "opacity-30" : ""}`}
                                        disabled={!selectedDivision}
                                        required
                                    >
                                        <option value="" className="bg-[#020617]">Select District</option>
                                        {selectedDivision && bdData[selectedDivision].map(dist => (
                                            <option key={dist} value={dist} className="bg-[#020617]">{dist}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Institution</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaUniversity size={14} /></div>
                                    <input type="text" placeholder="Org Name" className={inputClasses} required />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>Hobby (optional)</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaGamepad size={14} /></div>
                                    <input type="text" placeholder="Creative Pursuits" className={inputClasses} />
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Skills (optional)</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaTools size={14} /></div>
                                    <input type="text" placeholder="Specialization" className={inputClasses} />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#a00001" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 bg-[#d22f27] text-white font-black uppercase tracking-[0.4em] text-xs md:text-sm rounded-2xl shadow-[0_10px_30px_rgba(138,0,1,0.3)] transition-all flex items-center justify-center gap-3"
                            >
                                Submit Application <FaPaperPlane size={14} />
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default JoinForm;
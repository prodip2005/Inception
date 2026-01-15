import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaPaperPlane, FaTools, FaGamepad, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios'; // আপনার হুক

const JoinForm = () => {
    // আপনি হুক থেকে axiosSecure রিটার্ন পাচ্ছেন, তাই এখানে সেটাই লিখুন
    const axiosSecure = useAxios();

    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const userData = {
            name: form.fullName.value,
            email: form.email.value,
            phone: form.phone.value,
            division: selectedDivision,
            district: selectedDistrict,
            institution: form.institution.value,
            hobby: form.hobby.value || "Not Specified",
            skills: form.skills.value ? form.skills.value.split(',').map(s => s.trim()) : [],
            role: "Member"
        };

        try {
            setLoading(true);
            Swal.fire({
                title: 'SENDING_OTP',
                text: 'Initializing secure node connection...',
                background: '#0a0a0a',
                color: '#fff',
                didOpen: () => Swal.showLoading()
            });

            // এখানে axiosSecure ব্যবহার করা হয়েছে
            const res = await axiosSecure.post('/send-otp', userData);

            if (res.data.success) {
                setLoading(false);
                const { value: otp } = await Swal.fire({
                    title: 'VERIFY_IDENTITY',
                    text: `A code has been sent to ${userData.email}`,
                    input: 'text',
                    inputPlaceholder: 'Enter 6-digit code',
                    showCancelButton: true,
                    confirmButtonText: 'VERIFY',
                    confirmButtonColor: '#d22f27',
                    background: '#0a0a0a',
                    color: '#fff',
                });

                if (otp) {
                    Swal.fire({
                        title: 'FINALIZING...',
                        background: '#0a0a0a',
                        color: '#fff',
                        didOpen: () => Swal.showLoading()
                    });

                    const verifyRes = await axiosSecure.post('/verify-and-save', {
                        email: userData.email,
                        otp
                    });

                    if (verifyRes.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'ACCESS_GRANTED',
                            text: 'You have successfully joined the movement.',
                            background: '#0a0a0a',
                            color: '#fff',
                            confirmButtonColor: '#d22f27'
                        });
                        form.reset();
                        setSelectedDivision("");
                        setSelectedDistrict("");
                    }
                }
            }
        } catch (error) {
            setLoading(false);
            console.error("Error Detail:", error);
            Swal.fire({
                icon: 'error',
                title: 'SYNC_FAILED',
                text: error.response?.data?.message || 'Could not connect to server.',
                background: '#0a0a0a',
                color: '#fff'
            });
        }
    };

    return (
        <section className="py-16 md:py-28 px-4 md:px-6 relative overflow-hidden bg-transparent" id="join">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#d22f27]/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase italic">
                            Join the <span className="text-[#d22f27]">Movement</span>
                        </h2>
                    </motion.div>
                </div>

                <motion.div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 md:p-14 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                        {/* inputs fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>Full Name</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaUser size={14} /></div>
                                    <input name="fullName" type="text" placeholder="Your Name" className={inputClasses} required />
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Email Address</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaEnvelope size={14} /></div>
                                    <input name="email" type="email" placeholder="mail@inception.com" className={inputClasses} required />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>Phone Number</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaPhone size={14} /></div>
                                    <input name="phone" type="tel" placeholder="01XXXXXXXXX" className={inputClasses} required />
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Division</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaGlobe size={14} /></div>
                                    <select value={selectedDivision} onChange={handleDivisionChange} className={inputClasses} required>
                                        <option value="" className="bg-[#020617]">Select Region</option>
                                        {Object.keys(bdData).map(div => <option key={div} value={div} className="bg-[#020617]">{div}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>District</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaMapMarkerAlt size={14} /></div>
                                    <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className={`${inputClasses} ${!selectedDivision ? "opacity-30" : ""}`} disabled={!selectedDivision} required>
                                        <option value="" className="bg-[#020617]">Select District</option>
                                        {selectedDivision && bdData[selectedDivision].map(dist => <option key={dist} value={dist} className="bg-[#020617]">{dist}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Institution</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaUniversity size={14} /></div>
                                    <input name="institution" type="text" placeholder="Institution Name" className={inputClasses} required />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="group">
                                <label className={labelClasses}>Hobby</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaGamepad size={14} /></div>
                                    <input name="hobby" type="text" placeholder="Creative Pursuits" className={inputClasses} />
                                </div>
                            </div>
                            <div className="group">
                                <label className={labelClasses}>Skills</label>
                                <div className="relative">
                                    <div className={iconWrapperClasses}><FaTools size={14} /></div>
                                    <input name="skills" type="text" placeholder="Comma separated" className={inputClasses} />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                className="w-full py-5 bg-[#d22f27] text-white font-black uppercase tracking-[0.4em] text-xs md:text-sm rounded-2xl disabled:opacity-50"
                            >
                                {loading ? 'PROCESSING...' : 'SUBMIT APPLICATION'} <FaPaperPlane className="inline ml-2" size={14} />
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default JoinForm;
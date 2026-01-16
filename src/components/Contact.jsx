import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaSyncAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const formData = new FormData(e.target);

        // .env থেকে কি-টি নিয়ে আসা হচ্ছে
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: 'SIGNAL_TRANSMITTED',
                    text: 'Message received! Check your gmail soon.',
                    icon: 'success',
                    background: '#050505',
                    color: '#fff',
                    confirmButtonColor: '#d22f27'
                });
                e.target.reset();
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            Swal.fire({
                title: 'ERROR',
                text: 'Transmission failed. Try again.',
                icon: 'error',
                background: '#050505',
                color: '#fff'
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="py-32 relative bg-transparent">
            {/* ... বাকি UI কোড আগের মতোই থাকবে ... */}
            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <h2 className="text-6xl md:text-[89px] font-black text-white leading-none tracking-tighter uppercase mb-12">
                            Partner <br /> <p className='bg-clip-text text-transparent bg-gradient-to-r from-[#d22f27] via-red-500 to-white leading-none tracking-tighter uppercase italic'>with us_</p>
                        </h2>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="relative p-8 md:p-12 bg-white/[0.01] backdrop-blur-[30px] border border-white/[0.08] rounded-[3rem] shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="relative group/field">
                                        <input type="text" name="name" required className="peer w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#d22f27]/50 transition-all placeholder-transparent" placeholder="Name" />
                                        <label className="absolute left-6 top-4 text-slate-500 text-sm transition-all peer-focus:-top-7 peer-focus:text-[#d22f27] peer-[:not(:placeholder-shown)]:-top-7">NAME</label>
                                    </div>
                                    <div className="relative group/field">
                                        <input type="email" name="email" required className="peer w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#d22f27]/50 transition-all placeholder-transparent" placeholder="Email" />
                                        <label className="absolute left-6 top-4 text-slate-500 text-sm transition-all peer-focus:-top-7 peer-focus:text-[#d22f27] peer-[:not(:placeholder-shown)]:-top-7">EMAIL</label>
                                    </div>
                                </div>
                                <div className="relative group/field">
                                    <textarea name="message" required rows="4" className="peer w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-4 text-white outline-none focus:border-[#d22f27]/50 transition-all resize-none placeholder-transparent" placeholder="Message"></textarea>
                                    <label className="absolute left-6 top-4 text-slate-500 text-sm transition-all peer-focus:-top-7 peer-focus:text-[#d22f27] peer-[:not(:placeholder-shown)]:-top-7">MESSAGE</label>
                                </div>

                                <button disabled={isSending} className="w-full relative py-5 rounded-2xl bg-[#d22f27] text-white font-bold uppercase tracking-[0.4em] text-[10px]">
                                    {isSending ? <FaSyncAlt className="animate-spin mx-auto" /> : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
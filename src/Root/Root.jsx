import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div className="min-h-screen flex flex-col relative text-white selection:bg-blue-500/30">

            {/* --- ১. সলিড লিনিয়ার গ্রাডিয়েন্ট ব্যাকগ্রাউন্ড --- */}
            <div className="fixed inset-0 z-0 pointer-events-none 
                bg-gradient-to-br from-[#0a0f1e] via-[#020617] to-[#0d0202]">

                {/* একটু ডেপথ বাড়ানোর জন্য একটি রেডিয়াল স্পট লাইট */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(29,78,216,0.15),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(138,0,1,0.08),transparent_50%)]"></div>
            </div>

            {/* --- ২. নেভিগেশন বার --- */}
            <Navbar />

            {/* --- ৩. মেইন কন্টেন্ট এরিয়া --- */}
            <main className="relative z-10 flex-grow w-full pt-24 md:pt-0">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <Outlet />
                </div>
            </main>

            {/* --- ৪. ফুটার --- */}
            <footer className="relative z-10 w-full mt-20 bg-black/40 backdrop-blur-xl border-t border-white/5">
                <Footer />
            </footer>

            {/* --- ৫. গ্লোবাল কাস্টম স্টাইলস --- */}
            <style dangerouslySetInnerHTML={{
                __html: `
                /* স্ক্রোলবার ডিজাইন */
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: #020617; }
                ::-webkit-scrollbar-thumb { 
                    background: #1e3a8a; 
                    border-radius: 10px; 
                }
                
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #020617; /* Fallback */
                }

                /* কন্টেন্ট লোডিং অ্যানিমেশন */
                main { 
                    animation: fadeIn 0.5s ease-in-out forwards; 
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}} />
        </div>
    );
};

export default Root;
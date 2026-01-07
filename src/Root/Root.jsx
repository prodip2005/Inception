import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Root = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions = {
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab" // মাউস নিলে লাইনগুলো আরও উজ্জ্বল হয়ে কানেক্ট হবে
                },
                onClick: { enable: true, mode: "push" },
            },
            modes: {
                grab: {
                    distance: 180,
                    links: { opacity: 0.8 } // মাউসের কাছে লাইনগুলো খুব উজ্জ্বল দেখাবে
                },
                push: { quantity: 4 },
            },
        },
        particles: {
            // সাইয়ান এবং ব্লু কালার কম্বিনেশন
            color: { value: ["#22d3ee", "#3b82f6", "#ffffff"] },
            links: {
                enable: true,
                color: "#22d3ee", // উজ্জ্বল সায়ান কালার লিন্ক
                distance: 120,    // লাইনগুলোর দৈর্ঘ্য
                opacity: 0.35,    // লাইনের স্পষ্টতা
                width: 1.2,       // লাইনের পুরুত্ব
            },
            move: {
                enable: true,
                speed: 0.7,       // আপনার চাওয়া অনুযায়ী ধীর এবং স্মুথ গতি
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "bounce" } // স্ক্রিনের কোণায় ধাক্কা খেয়ে ফিরে আসবে
            },
            // ডেনসিটি বা ঘনত্ব বাড়ানোর জন্য ভ্যালু বাড়ানো হয়েছে
            number: {
                density: { enable: true, area: 700 },
                value: 200
            },
            opacity: {
                value: { min: 0.3, max: 0.7 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1
                }
            },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    };

    return (
        <div className="min-h-screen flex flex-col relative bg-gradient-to-tl from-[#050505] via-[#020617] to-[#050505] text-white overflow-x-hidden">

            {/* ১. ব্রাইট ব্লু গ্লো ইফেক্টস - রিভার্স করা হয়েছে (বাম দিক থেকে শুরু) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* টপ-লেফট বড় ব্লু গ্লো (আগে রাইটে ছিল) */}
                <div className="absolute top-[-15%] left-[-10%] w-[80%] h-[70%] bg-blue-600/20 blur-[150px] rounded-full opacity-60"></div>

                {/* মিড-রাইট আভা (ভারসাম্য বজায় রাখার জন্য) */}
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] bg-indigo-600/10 blur-[130px] rounded-full"></div>

                {/* বটম-লেফট আভা */}
                <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-500/15 blur-[120px] rounded-full opacity-40"></div>
            </div>

            {init && <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-1" />}

            <Navbar />

            <main className="relative z-10 flex-grow w-full pt-20 md:pt-0">
                <div className="max-w-6xl mx-auto px-6">
                    <Outlet />
                </div>
            </main>

            <footer className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/5">
                <div className="w-full">
                    <Footer />
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #020617; }
                ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
                
                ::selection {
                    background: #3b82f6;
                    color: white;
                }

                main { animation: fadeIn 1.2s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
};

export default Root;
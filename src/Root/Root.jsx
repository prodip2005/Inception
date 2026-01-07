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
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
            },
            modes: {
                repulse: { distance: 150, duration: 0.4 },
                push: { quantity: 4 },
            },
        },
        particles: {
            color: { value: ["#3b82f6", "#1e3a8a", "#ffffff"] },
            links: { enable: false },
            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, outModes: { default: "out" } },
            number: { density: { enable: true, area: 800 }, value: 120 },
            opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
    };

    return (
        <div className="min-h-screen flex flex-col relative bg-[#08062b] text-white overflow-hidden">

            {/* ব্যাকগ্রাউন্ড ব্লার এবং কণাগুলো - নীল আভা হালকা করা হয়েছে */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* এখানে blue-900/10 থেকে বদলে sky-500/20 করা হয়েছে */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-500/15 blur-[140px] rounded-full opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[130px] rounded-full opacity-40"></div>
            </div>

            {init && <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-1" />}

            {/* ন্যাভবার */}
            <Navbar />

            {/* মূল কন্টেন্ট */}

            < main className="relative z-10 flex-grow w-full pt-20 md:pt-0" >
                <div className="max-w-6xl mx-auto px-6 min-h-screen flex flex-col">
                    <Outlet />
                </div>
            </main >

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #08062b; }
                ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
                
                main { animation: fadeIn 1.2s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
};

export default Root;
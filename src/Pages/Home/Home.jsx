import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import Banner from '../../components/Banner';
import Events from '../../components/Events';
import Mission from '../../components/Mission';
import Members from '../../components/Members';
import About from '../../components/About';
import Contact from '../../components/Contact';

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                // block: 'start' যোগ করা হয়েছে যাতে সেকশনটি স্ক্রিনের একদম ওপর থেকে শুরু হয়
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [hash]);

    return (
        <div className="flex flex-col">
            {/* প্রতিটি সেকশন এখন min-h-screen এবং flex ব্যবহার করবে যাতে কন্টেন্ট সেন্টারে থাকে */}

            <section id="home" className="min-h-screen flex flex-col justify-center">
                <Banner />
            </section>

            <section id="mission" className="min-h-screen flex flex-col justify-center">
                <Mission />
            </section>

            <section id="events" className="min-h-screen flex flex-col justify-center py-20">
                <Events />
            </section>
            <section id="members" className="min-h-screen flex flex-col justify-center py-20">
                <Members/>
            </section>
            <section id="about" className="min-h-screen flex flex-col justify-center py-20">
                <About/>
            </section>
            <section id="contact" className="min-h-screen flex flex-col justify-center py-20">
                <Contact/>
            </section>

            {/* অন্যান্য সেকশনগুলো এখানে যোগ করতে পারেন একইভাবে */}
        </div>
    );
};

export default Home;
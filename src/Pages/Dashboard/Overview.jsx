import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserClock, FaBuilding, FaCalendarCheck } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const Overview = () => {
    const axiosSecure = useAxios();

    const [peopleCount, setPeopleCount] = useState(0);
    const [institutionCount, setInstitutionCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);

    useEffect(() => {
        // Peoples count
        axiosSecure.get('/peoples')
            .then(res => setPeopleCount(res.data.length))
            .catch(console.error);

        // Institutions count
        axiosSecure.get('/institutions')
            .then(res => setInstitutionCount(res.data.length))
            .catch(console.error);

        // Events count
        axiosSecure.get('/timeline')
            .then(res => setEventCount(res.data.length))
            .catch(console.error);

    }, [axiosSecure]);

    const summary = [
        {
            label: 'Total Person',
            value: String(peopleCount).padStart(2, '0'),
            icon: <FaUsers />,
            color: 'text-blue-500'
        },
        {
            label: 'Pending Requests',
            value: '00', // future feature
            icon: <FaUserClock />,
            color: 'text-[#8a0001]'
        },
        {
            label: 'Institutions',
            value: String(institutionCount).padStart(2, '0'),
            icon: <FaBuilding />,
            color: 'text-emerald-500'
        },
        {
            label: 'Upcoming Events',
            value: String(eventCount).padStart(2, '0'),
            icon: <FaCalendarCheck />,
            color: 'text-amber-500'
        },
    ];

    return (
        <div className="space-y-10">

            {/* --- ১. স্ট্যাটাস কার্ডস --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summary.map((item, i) => (
                    <div
                        key={i}
                        className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:border-[#8a0001]/30 transition-all"
                    >
                        <div className={`${item.color} text-2xl mb-4`}>
                            {item.icon}
                        </div>
                        <div className="text-3xl font-black text-white">
                            {item.value}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* --- ২. মেইন কন্ট্রোল এরিয়া --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Requests (static for now) */}
                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm italic">
                        <span className="w-1.5 h-4 bg-[#8a0001] block"></span> RECENT_REQUESTS
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5"
                            >
                                <span className="text-xs text-slate-300 font-mono">
                                    USER_NODE_{i}02
                                </span>
                                <button className="text-[8px] font-bold text-[#8a0001] uppercase tracking-tighter border border-[#8a0001]/30 px-3 py-1 rounded-lg hover:bg-[#8a0001] hover:text-white transition-all">
                                    Review
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Message */}
                <div className="p-8 bg-[#8a0001]/5 border border-[#8a0001]/10 rounded-[2.5rem]">
                    <h3 className="text-[#8a0001] font-bold mb-4 text-xs uppercase tracking-widest">
                        Administrator_Notice
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-mono">
                        &gt; Welcome to Inception Command Center. <br />
                        &gt; Ensure all pending requests are verified before the next sync cycle. <br />
                        &gt; System encryption is currently set to AES_256.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Overview;

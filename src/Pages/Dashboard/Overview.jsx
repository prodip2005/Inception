import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserClock, FaBuilding, FaCalendarCheck } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const Overview = () => {
    const axiosSecure = useAxios();

    const [peopleCount, setPeopleCount] = useState(0);
    const [institutionCount, setInstitutionCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0); // পেন্ডিং কাউন্ট স্টেট

    useEffect(() => {
        // ১. Peoples (Core Members) count
        axiosSecure.get('/peoples')
            .then(res => setPeopleCount(res.data.length))
            .catch(console.error);

        // ২. Institutions count
        axiosSecure.get('/institutions')
            .then(res => setInstitutionCount(res.data.length))
            .catch(console.error);

        // ৩. Events count
        axiosSecure.get('/timeline')
            .then(res => setEventCount(res.data.length))
            .catch(console.error);

        // ৪. Pending Users count (যাদের status === 'pending')
        axiosSecure.get('/users')
            .then(res => {
                const pending = res.data.filter(user => user.status === 'pending');
                setPendingCount(pending.length);
            })
            .catch(console.error);

    }, [axiosSecure]);

    const summary = [
        {
            label: 'Core Persons',
            value: String(peopleCount).padStart(2, '0'),
            icon: <FaUsers />,
            color: 'text-blue-500'
        },
        {
            label: 'Pending Requests',
            value: String(pendingCount).padStart(2, '0'), // ডাইনামিক পেন্ডিং সংখ্যা
            icon: <FaUserClock />,
            color: 'text-[#d22f27]'
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
                        className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl group hover:border-[#d22f27]/30 transition-all shadow-xl"
                    >
                        <div className={`${item.color} text-2xl mb-4 group-hover:scale-110 transition-transform`}>
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

            {/* --- ২. মেইন কন্ট্রোল এরিয়া --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Info */}
                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm italic">
                        <span className="w-1.5 h-4 bg-[#d22f27] block"></span> SYSTEM_STATUS
                    </h3>
                    <div className="space-y-4 font-mono">
                        <div className="flex justify-between text-[10px] text-slate-400 border-b border-white/5 pb-2">
                            <span>REGISTRY_SYNC</span>
                            <span className="text-green-500">ACTIVE</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 border-b border-white/5 pb-2">
                            <span>PENDING_QUEUE</span>
                            <span className={pendingCount > 0 ? "text-[#d22f27] animate-pulse" : "text-slate-500"}>
                                {pendingCount} NODES_WAITING
                            </span>
                        </div>
                    </div>
                </div>

                {/* System Message */}
                <div className="p-8 bg-[#d22f27]/5 border border-[#d22f27]/10 rounded-[2.5rem]">
                    <h3 className="text-[#d22f27] font-bold mb-4 text-xs uppercase tracking-widest">
                        Administrator_Notice
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-mono">
                        &gt; Welcome to Inception Command Center. <br />
                        &gt; {pendingCount > 0 ? `Currently ${pendingCount} nodes are waiting for authentication.` : "All nodes are currently synchronized."} <br />
                        &gt; System encryption is currently set to AES_256.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Overview;1
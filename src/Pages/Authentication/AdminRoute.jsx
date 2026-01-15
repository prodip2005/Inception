import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';

import { onAuthStateChanged } from 'firebase/auth';

import { FaSyncAlt } from 'react-icons/fa';
import { auth } from '../../firebase/firebase.config';
import useAxios from '../../hooks/useAxios';

const AdminRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxios();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    const res = await axiosSecure.get(`/admins/check/${currentUser.email}`);
                    setIsAdmin(res.data.isAdmin);
                } catch (error) {
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [axiosSecure]);

    // লোডিং স্টেট (যতক্ষণ চেক হচ্ছে)
    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <FaSyncAlt className="animate-spin text-[#d22f27] text-4xl" />
            </div>
        );
    }

    // যদি ইউজার লগইন থাকে এবং সে অ্যাডমিন হয়
    if (user && isAdmin) {
        return children;
    }

    // যদি অ্যাডমিন না হয়, তবে লগইন পেজে পাঠিয়ে দিবে
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
import React from 'react';
import { auth, googleProvider } from '../../firebase/firebase.config';
import { signInWithPopup, signOut } from 'firebase/auth';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // ব্যাকএন্ডে চেক করা হচ্ছে ইমেইলটি অ্যাডমিন কি না
            const res = await axiosSecure.get(`/admins/check/${user.email}`);

            if (res.data.isAdmin) {
                Swal.fire({ title: 'Welcome Admin', icon: 'success', background: '#050505', color: '#fff' });
                navigate('/admin');
            } else {
                // অ্যাডমিন না হলে সাথে সাথে লগআউট করে দেওয়া হবে
                await signOut(auth);
                Swal.fire({ title: 'Access Denied', text: 'You are not an authorized admin!', icon: 'error', background: '#050505', color: '#fff' });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] font-mono">
            <div className="p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] text-center backdrop-blur-xl">
                <h2 className="text-2xl font-black text-white mb-6 uppercase italic">Admin_Login_</h2>
                <button onClick={handleGoogleLogin} className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-2xl font-bold uppercase text-xs hover:bg-[#d22f27] hover:text-white transition-all">
                    <FaGoogle /> Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
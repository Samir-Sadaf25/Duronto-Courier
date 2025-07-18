import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import { GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { auth } from '../Authentication/firebase.config';
import AuthProvider from '../Provider/AuthProvider';
import { Bounce, toast } from 'react-toastify';
import loginLottie from "../assets/Animation - 1750150347922.json"; // download your preferred login animation
import Lottie from "lottie-react";

const Login = () => {
    const { setUser, signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMsg, setError] = useState('');
    const provider = new GoogleAuthProvider;

    const notify = () => {
        toast.success('Account Login Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('');
        signIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate(location.state ? location.state : "/");
                notify();
                navigate('/');
            })
            .catch((error) => {
                setError(error.code);
            })
    };
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(result => {

                setUser(result.user);
                notify();
                navigate('/');
            }).catch(error => {

                const errorMessge = error.message;
                setError(errorMessge);
            })
    }
    return (
        <div className="flex flex-col md:flex-row lg:flex-row-reverse items-center justify-center min-h-screen px-6">
            {/* Lottie Animation */}
            <div className=" justify-center">
                <Lottie
                    animationData={loginLottie}
                    loop={true}
                    style={{ height: "400px", width: "400px" }}
                />
            </div>

            {/* Login Form */}
            <div className="w-full max-w-md p-6 bg-base-100 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-4">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </form>
                <button onClick={handleGoogleLogin} className="btn btn-outline  text-black border-[#e5e5e5] btn-block">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
            </div>
        </div>
    );
};

export default Login;

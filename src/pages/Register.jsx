import React, { use, useState, } from 'react';
import { Link, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Authentication/firebase.config';

import registerLottie from "../assets/Animation - 1750142963559.json"; // make sure you have this
import Lottie from "lottie-react";

const Register = () => {
    const { createUser, updateUser, setUser } = use(AuthContext);

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const provider = new GoogleAuthProvider;


   

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form)
        const { email, password,...restFormData } = Object.fromEntries(formData.entries());
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must contain at least one uppercase, one lowercase letter & be 6+ characters long.");
            return;
        }

        createUser(email, password)
            .then(result => {
                    //    post user data on DB
                // const userProfile = {
                //     email,
                //     name,
                //     photo,
                //     creationTime: result.user?.metadata?.creationTime,
                //     lastSignInTime: result.user?.metadata?.lastSignInTime
                // }
                // fetch('https://assignment-10-server-side-lyart-omega.vercel.app/users', {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify(userProfile)

                // }).then(res => res.json())
                //     .then(data => {
                //         if (data.insertedId) {
                //             Swal.fire({
                //                 title: "acoount created Successfully",
                //                 icon: "success",
                //                 draggable: true

                //             });

                //         }
                //     })

                const user = result.user;
                // updateUser({ displayName: name, photoURL: photo })
                //     .then(() => {
                //         setUser({ ...user, displayName: name, photoURL: photo });
                //         navigate("/login");

                //     })
                //     .catch((error) => {

                //         setUser(user);
                //     });
            }).catch(error => {
                // console.log(error.message);
                setError(error.message)
            })
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user)
                Swal.fire({ title: "✅ Signed in with Google!", icon: "success", confirmButtonColor: "#4CAF50" });
                navigate("/");
            })
            .catch(error => setError(error.message));
    };

    return (
        <div className="flex flex-col md:flex-row lg:flex-row-reverse items-center justify-center min-h-screen px-6">
            {/* Lottie Animation */}
            <div className="  justify-center">
                <Lottie
                    animationData={registerLottie}
                    loop={true}
                    style={{ height: "400px", width: "400px" }}
                />
            </div>

            {/* Registration Form */}
            <div className="w-full max-w-md p-6 bg-base-100 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-4">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>
                    <button onClick={handleGoogleSignIn} className="btn btn-outline  text-black border-[#e5e5e5] btn-block">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;

import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react'; // Removed useEffect as it's not strictly needed for this file's logic
import { LoaderCircle } from 'lucide-react';

// Define the LoginForm type clearly
type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    // Explicitly define the type for useForm, preventing narrow inference
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            {/* Injected CSS from login.blade.php */}
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: "Poppins", sans-serif;
                    font-weight: 600;
                    font-style: normal;
                }

                body, html { height: 100%; }

                .container { display: flex; height: 100vh; }

                .left {
                    flex: 1;
                    padding: 60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .form-box {
                    max-width: 480px;
                    margin: 0 auto;
                    width: 100%;
                    padding: 0 16px;
                }

                .form-box img { width: 60px; margin-bottom: 20px; }

                .form-box h2 {
                    font-size: 22px;
                    font-family: "Poppins", sans-serif;
                    font-weight: 600;
                    font-style: normal;
                    margin-bottom: 5px;
                }

                .form-box p {
                    font-size: 14px;
                    font-family: "Poppins", sans-serif;
                    font-weight: 600;
                    font-style: normal;
                    margin-bottom: 20px;
                    color: #555;
                }

                input[type="email"],
                .form-group input[type="password"],
                .form-group input[type="text"] {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 12px; /* Adjusted to consolidate spacing */
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    height: 42px;
                    line-height: 1.5;
                    font-weight: 400; /* Adjusted for input fields */
                }
                
                input[type="email"] {
                    padding-right: 10px; /* Ensure no extra space on right if no icon */
                }


                .form-group {
                    position: relative;
                    margin-bottom: 12px;
                }

                .form-group input[type="password"],
                .form-group input[type="text"] {
                    padding-right: 40px; /* Space for eye icon */
                }

                .form-group i.toggle-password {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #888;
                    font-size: 16px;
                }

                .form-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 5px;
                    font-size: 13px;
                }

                .form-footer a {
                    color: #3B82F6;
                    text-decoration: none;
                }

                .form-footer a:hover { text-decoration: underline; }

                button[type="submit"] {
                    width: 100%;
                    padding: 12px;
                    background-color: #3B82F6;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-top: 15px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                
                button[type="submit"]:hover {
                    background-color: #2a65d6; /* Darken on hover */
                }

                button[type="submit"]:disabled {
                    background-color: #a0c2f7; /* Lighter color when disabled */
                    cursor: not-allowed;
                }

                .register {
                    margin-top: 15px;
                    text-align: center;
                    font-size: 14px;
                }

                .register a { color: #3B82F6; text-decoration: none; }

                .register a:hover {
                    text-decoration: underline;
                }

                .right {
                    flex: 1;
                    background: url('BPSID.JPG')  center center/cover;
                }

                .input-error-message { 
                    color: #ef4444; 
                    font-size: 0.875rem;
                    margin-top: 4px; 
                    font-weight: 400;
                }

                @media (max-width: 768px) {
                    .container { flex-direction: column; }
                    .right { height: 250px; }
                    .left { padding: 30px; } /* Adjust padding for smaller screens */
                    .form-box { max-width: none; } /* Allow full width on smaller screens */
                }
            `}</style>

            <div className="container">
                <div className="left">
                    <div className="form-box">
                        <img src="logobpsr.png" alt="Logo" />
                        <h2>Selamat Datang di<br />Sistem Peminjaman Ruang</h2>
                        <p>Masuk untuk menggunakan layanan</p>
                        <form method="POST" onSubmit={submit}>
                            {/* No need for @csrf with Inertia, it handles CSRF automatically */}

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                                autoFocus
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <div className="input-error-message">{errors.email}</div>}


                            <div className="form-group">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                                    onClick={togglePasswordVisibility}
                                ></i>
                            </div>
                            {errors.password && <div className="input-error-message">{errors.password}</div>}


                            <div className="form-footer">
                                <label className="flex items-center" style={{fontSize: '13px', fontWeight: '400'}}>
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="mr-2" // Add some margin right
                                    />
                                    Remember me
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')}>Lupa Password?</Link>
                                )}
                            </div>

                            <button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin inline-block mr-2" />}
                                Masuk
                            </button>
                        </form>

                        <div className="register">
                            Belum punya akun? <Link href={route('register')}>Daftar</Link>
                        </div>
                    </div>
                </div>
                <div className="right"></div>
            </div>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
                    {status}
                </div>
            )}
        </>
    );
}
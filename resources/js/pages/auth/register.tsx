import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

// Tentukan tipe RegisterForm
type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (fieldId: 'password' | 'password_confirmation') => {
        if (fieldId === 'password') {
            setShowPassword(prev => !prev);
        } else {
            setShowConfirmPassword(prev => !prev);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Daftar Akun" />

            {/* CSS yang disuntikkan dari register.blade.php */}
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                    /* Tambahkan font-weight default jika tidak ada di spesifik */
                    font-weight: 400; /* Normal text */
                }
                h2, button {
                    font-weight: 600; /* Bold for headings and buttons */
                }

                body, html { height: 100%; }
                .container { display: flex; height: 100vh; }

                .left {
                    flex: 1;
                    padding: 40px;
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
                .form-box h2 { font-size: 22px; font-weight: bold; margin-bottom: 5px; }
                .form-box p { font-size: 14px; margin-bottom: 20px; color: #555; }

                .form-row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 12px;
                }

                .form-row input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    height: 42px; /* Consistent height */
                    line-height: 1.5; /* Consistent line-height */
                    font-weight: 400; /* Input text normal weight */
                }

                .form-group {
                    position: relative;
                    margin-bottom: 12px;
                }

                .form-group input {
                    width: 100%;
                    padding: 10px 40px 10px 10px; /* Padding kanan untuk ikon mata */
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    height: 42px; /* Consistent height */
                    line-height: 1.5; /* Consistent line-height */
                    font-weight: 400; /* Input text normal weight */
                }

                .form-group i.toggle-password {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #888;
                    font-size: 16px; /* Ukuran ikon */
                }

                button[type="submit"] {
                    width: 100%;
                    padding: 12px;
                    background-color: #3B82F6;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    margin-top: 10px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                button[type="submit"]:hover {
                    background-color: #2a65d6; /* Darker blue on hover */
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
                .register a:hover { text-decoration: underline; }

                .right {
                    flex: 1;
                    background: url('BPSID.JPG') no-repeat center center/cover;
                    height: 100vh;
                    /* Ini sudah bagus untuk memastikan gambar mengisi penuh */
                    /* Pastikan elemen .container memiliki tinggi yang cukup (100vh) */
                }

                .input-error-message { /* Gaya untuk pesan error Inertia */
                    color: #ef4444; /* red-500 dari Tailwind/Shadcn */
                    font-size: 0.875rem; /* text-sm */
                    margin-top: 4px; /* mt-1 */
                    font-weight: 400;
                }

                @media (max-width: 768px) {
                    .container { flex-direction: column; }
                    .right { height: 250px; } /* Memberi tinggi eksplisit pada mobile */
                    .left { padding: 30px; } /* Menyesuaikan padding untuk layar kecil */
                    .form-box { max-width: none; } /* Mengizinkan lebar penuh pada layar kecil */
                }
            `}</style>

            <div className="container">
                <div className="left">
                    <div className="form-box">
                        <img src="logobpsr.png" alt="Logo" />
                        <h2>Daftar Akun</h2>
                        <p>Masukkan data untuk membuat akun</p>
                        <form method="POST" onSubmit={submit}>
                            {/* Input Nama dan Email dalam form-row */}
                            <div className="form-row">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Nama"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                />
                                {/* Error untuk Name */}
                                {errors.name && <div className="input-error-message" style={{flexBasis: '50%'}}>{errors.name}</div>}

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                />
                                {/* Error untuk Email */}
                                {errors.email && <div className="input-error-message" style={{flexBasis: '50%'}}>{errors.email}</div>}
                            </div>
                            {/* Karena error-message berada di luar form-row, kita perlu memastikan aligmentnya */}
                            {/* Mungkin lebih baik error dipindahkan ke dalam div grid terpisah jika ingin sejajar */}


                            {/* Input Password */}
                            <div className="form-group">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                />
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                                    onClick={() => togglePasswordVisibility('password')}
                                ></i>
                            </div>
                            {errors.password && <div className="input-error-message">{errors.password}</div>}

                            {/* Input Konfirmasi Password */}
                            <div className="form-group">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    placeholder="Konfirmasi Password"
                                    required
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                />
                                <i
                                    className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                                    onClick={() => togglePasswordVisibility('password_confirmation')}
                                ></i>
                            </div>
                            {errors.password_confirmation && <div className="input-error-message">{errors.password_confirmation}</div>}

                            {/* Tombol Daftar */}
                            <button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin inline-block mr-2" />}
                                Daftar
                            </button>

                            {/* Link Sudah punya akun? */}
                            <div className="register">
                                Sudah punya akun? <Link href={route('login')}>Masuk</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="right"></div>
            </div>
        </>
    );
}
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });

        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const menuWrapper = document.getElementById('menuWrapper');
        const navLinks = document.querySelectorAll('.nav-link');

        const toggleMenu = () => {
            hamburgerBtn?.classList.toggle('open');
            menuWrapper?.classList.toggle('open');
            document.body.classList.toggle('no-scroll'); 
        };

        const closeMenu = () => {
            hamburgerBtn?.classList.remove('open');
            menuWrapper?.classList.remove('open');
            document.body.classList.remove('no-scroll');
        };

        hamburgerBtn?.addEventListener('click', toggleMenu);

   
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

  
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });


        return () => {
            hamburgerBtn?.removeEventListener('click', toggleMenu);
            navLinks.forEach(link => {
                link.removeEventListener('click', closeMenu);
            });
        };
    }, []);

    return (
        <>
            <Head title="Welcome" />
          
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                /* navbar */
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: "Poppins", sans-serif;
                    font-weight: 600;
                    font-style: normal;
                }

                .header {
                    position: relative;
                    width: 100%;
                    background: #ffffff;
                    color: white;
                    padding: 10px 30px;
                    height: 70px;
                    box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
                }

                /* logo */
                .logo {
                    position: absolute;
                    top: 50%;
                    left: 30px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    user-select: none;
                    display: flex;
                    align-items: center;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    height: 100%;
                }

                .logo-img {
                    height: 50px;
                    width: auto;
                    object-fit: contain;
                }

                .separator {
                    width: 2px;
                    height: 40px;
                    background-color: black;
                    margin: 0 15px;
                }

                .logo-text {
                    font-size: 1.1rem;
                    font-weight: 400;
                    color: rgb(0, 0, 0);
                    white-space: nowrap;
                }

                /* Link */
                .nav-center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    gap: 30px;
                }

                .nav-center a {
                    text-decoration: none;
                    color: #29242452;
                    font-weight: 600;
                    font-size: 1rem;
                    position: relative;
                    transition: color 0.3s ease;
                }

                .nav-center a::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -3px;
                    width: 100%;
                    height: 2px;
                    background-color: #007BFF;
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                    pointer-events: none;
                }

                .nav-center a:hover::after,
                .nav-center a:focus::after,
                .nav-center a.active::after { /* Added .active class */
                    transform: scaleX(1);
                }

                .nav-center a:hover,
                .nav-center a:focus,
                .nav-center a.active {
                    color: #101111;
                    outline: none;
                }

                /* button */
                .auth-buttons {
                    position: absolute;
                    top: 50%;
                    right: 30px;
                    transform: translateY(-50%);
                    display: flex;
                    gap: 15px;
                }

                .btn {
                    padding: 6px 16px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    border: 2px solid transparent;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    position: relative;
                    z-index: 0;
                    overflow: hidden;
                    text-decoration: none;
                }

                #login {
                    background-color: #3162EB;
                    color: white;
                }

                #sign {
                    background-color: white;
                    border: 2px solid black;
                    color: black;
                }

                /* Holographic hover effect */
                .btn::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, #00f, #0ff, #f0f, #00f);
                    background-size: 400%;
                    z-index: -1;
                    transition: 0.5s;
                    opacity: 0;
                    filter: blur(8px);
                }

                .btn:hover::before {
                    opacity: 0.7;
                    animation: holograph 3s linear infinite;
                }

                @keyframes holograph {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Hamburger Button */
                .hamburger {
                    display: none;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 25px;
                    height: 20px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    position: absolute;
                    right: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1000;
                }

                .bar {
                    width: 100%;
                    height: 3px;
                    background-color: #333;
                    transition: 0.4s;
                    border-radius: 2px;
                }

                /* Rotate effect */
                .bar.open:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .bar.open:nth-child(2) {
                    opacity: 0;
                }

                .bar.open:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }

                /* Responsive Rules */
                @media (max-width: 768px) {
                    .nav-center,
                    .auth-buttons {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 70px;
                        right: 0;
                        background: white;
                        padding: 60px 40px;
                        width: 100%;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        z-index: 999;
                    }

                    .nav-center.open,
                    .auth-buttons.open {
                        display: flex;
                    }

                    .nav-center a {
                        top: 80px;
                        padding: 10px 90px;
                        font-size: 1.1rem;
                        color: black;
                    }

                    .auth-buttons {
                        gap: 10px;
                        margin-top: 10px;
                    }

                    .hamburger {
                        display: flex;
                    }

                    .logo-text {
                        font-size: 0.85rem;
                        white-space: normal;
                        max-width: 180px;
                    }
                }

                /* Wrapper untuk menu + tombol saat mobile */
                .menu-wrapper {
                    display: flex;
                    flex-direction: row;
                }

                @media (max-width: 768px) {
                    .menu-wrapper {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background: white;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        z-index: 999;
                        padding: 20px 30px;
                        gap: 20px;
                    }

                    .menu-wrapper.open {
                        display: flex;
                    }

                    .nav-center {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 15px;
                    }

                    .nav-center a {
                        padding: 10px 0;
                        font-size: 1.1rem;
                        width: 100%;
                        color: black;
                    }

                    .auth-buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    .btn {
                        width: 100%;
                        text-align: center;
                    }

                    body.no-scroll {
                        overflow: hidden;
                    }
                }

                /* body */
                .page-wrapper {
                    padding: 50px;
                    min-height: 250vh;
                }

                .hero-container {
                    position: relative;
                    width: 100%;
                    overflow-x: hidden;
                    height: 90vh;
                    border-radius: 20px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .hero-background {
                    filter: brightness(0.5);
                    z-index: 1;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* Konten teks dan tombol */
                .hero-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2;
                    text-align: center;
                    padding: 20px;
                    color: white;
                }

                /* Judul dan subjudul */
                .hero-content h1,
                .hero-content h2 {
                    text-transform: uppercase;
                    margin: 30px 20px;
                    padding: 10px 20px;
                    border-radius: 12px;
                }

                .hero-content h1 {
                    font-size: 2.5rem;
                    font-family: "Montserrat", sans-serif;
                    font-optical-sizing: auto;
                    font-weight: 700; /* Adjusted from 'weight' to a valid number */
                    font-style: normal;
                }

                .hero-content h2 {
                    font-size: 1.8rem;
                    font-family: "Montserrat", sans-serif;
                    font-optical-sizing: auto;
                    font-weight: 500; /* Adjusted from 'normal' to a valid number */
                    font-style: normal;
                }

                /* Tombol */
                .start-button {
                    margin-top: 20px;
                    padding: 20px 120px;
                    font-size: 1rem;
                    font-weight: 600;
                    background-color: #3162eb;
                    color: #fcfbfb;
                    border: none;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .start-button:hover {
                    background-color:rgba(10, 10, 10, 0.46);
                 
                }

                /* Tentang Section */
                .tentang-section {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    padding: 60px 20px;
                    background-color: #fff;
                    gap: 40px;
                    padding-bottom: 20vh;
                }

                .tentang-text {
                    max-width: 500px;
                }

                .tentang-text h1 {
                    font-size: 2rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .tentang-text p {
                    font-size: 1rem;
                    color: #333;
                    font-weight: 500;
                    line-height: 1.8;
                }

                .tentang-image img,
                .rounded-image {
                    border-radius: 12px;
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                }

                .fitur-section-wrapper {
                    background-color: #2f73f2;
                    padding: 4rem 2rem;
                    display: flex;
                    justify-content: center;
                    border-radius: 10px;
                }

                .fitur-section {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .fitur-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    background-color: white;
                    border-radius: 12px;
                    padding: 30px 20px;
                    width: 280px;
                    text-align: center;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .fitur-icon {
                    font-size: 3rem;
                    color: #2f73f2;
                    margin-top: 20px;
                }


                .fitur-box:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
                }

                .fitur-box h3 {
                    font-size: 1.3rem;
                    margin: 15px 0 10px;
                    color: #222;
                    font-weight: 600;
                }

                .fitur-box p {
                    font-size: 1rem;
                    color: #555;
                    line-height: 1.6;
                    font-weight: 500;
                }

                .fitur-box.active {
                    border: 2px solid #2f73f2;
                }

                /* footer */

                .custom-footer {
                    background-color: #254DBC;
                    color: white;
                    padding: 2rem 1rem;
                    box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
                }

                .pemisah {
                    width: 2px;
                    height: 40px;
                    background-color: white;
                    margin: 0 10px;
                }

                h4{
                    font-family: "Poppins", sans-serif;
                    font-weight: 100;
                    font-style: normal;
                }

                p{
                    font-family: "Poppins", sans-serif;
                    font-weight: 250;
                    font-style: normal;
                }

                .footer-container {
                    max-width: 1280px;
                    margin: 0 auto;
                }

                .footer-sections {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                @media (min-width: 768px) {
                    .footer-sections {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-start;
                    }
                }

                .footer-left {
                    flex: 1;
                }

                .footer-logo-text {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .footer-org-text {
                    line-height: 1.2;
                }

                .footer-right {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .footer-divider {
                    margin: 1.5rem 0;
                    border-color: #ccc;
                }

                .footer-bottom {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .footer-bottom {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }

                .footer-nav {
                    display: flex;
                    gap: 1.5rem;
                }

                .footer-nav a {
                    color: white;
                    text-decoration: none;
                    font-family: "Poppins", sans-serif;
                    font-weight: 100;
                    font-style: normal;
                }

                .footer-nav a:hover {
                    text-decoration: underline;
                }

                html {
                    scroll-behavior: smooth;
                }
            `}</style>

            <header className="header" role="banner" aria-label="Main navigation header">
                <div className="logo" aria-label="Homepage">
                    <div className="logo-container">
                        <img src="logobpsr.png" alt="Logo BPS" className="logo-img" />
                        <div className="separator"></div>
                        <span className="logo-text">SISTEM MANAJEMEN PEMINJAMAN RUANG RAPAT</span>
                    </div>
                </div>

                <button className="hamburger" id="hamburgerBtn" aria-label="Toggle navigation menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <div className="menu-wrapper" id="menuWrapper">
                    <nav className="nav-center" role="navigation" aria-label="Primary navigation">
                        <Link href="/" className="nav-link">BERANDA</Link>
                        <Link href="/tentang" className="nav-link">TENTANG</Link>
                        <Link href="/pedoman" className="nav-link">PEDOMAN</Link>
                    </nav>

                    <div className="auth-buttons">
                        <Link href={route('login')} className="btn" id="login">Masuk 😎</Link>
                        <Link href={route('register')} className="btn" id="sign">Daftar 🚀</Link>
                    </div>
                </div>
            </header>

            <div className="page-wrapper">
                <div className="hero-container">
                    <img src="BPSID.JPG" alt="Background BPS" className="hero-background" />
                    <div className="hero-content">
                        <h1>SELAMAT DATANG DI MANAJEMEN SISTEM PEMINJAMAN RUANG RAPAT</h1>
                        <h2>BPS PROVINSI RIAU</h2>
                        {auth?.user ? (
                        <Link href="/dashboard" className="start-button">MULAI RAPAT</Link>
                        ) : (
                            <Link href={route('login')} className="start-button">MULAI RAPAT</Link>
                        )}

                    </div>
                </div>

                <div className="tentang-section">
                    <div className="tentang-text" data-aos="fade-right">
                        <h1>Tentang Sistem</h1>
                        <p>
                            Sistem ini dirancang untuk mempermudah proses peminjaman ruang rapat secara digital,
                            praktis, dan transparan. Dengan sistem ini, pengguna dapat melihat ketersediaan ruang,
                            mengajukan peminjaman, serta melacak riwayat penggunaan ruang secara efisien.
                        </p>
                    </div>
                    <div className="tentang-image" data-aos="fade-left">
                        <img src="samplerapat.jpeg" alt="Sample Rapat" className="rounded-image" />
                    </div>
                </div>

                <div className="fitur-section-wrapper" data-aos="fade-up">
                    <div className="fitur-section">
                        <div className="fitur-box">
                            <h3>Daftar Ruang</h3>
                            <p>Lihat informasi lengkap tentang ruangan rapat yang tersedia.</p>
                            <Link href="/daftarruangan"><i className="fas fa-list-alt fitur-icon"></i></Link>
                        </div>
                        <div className="fitur-box active">
                            <h3>Jadwal Rapat</h3>
                            <p>Cek jadwal pemakaian ruangan secara real-time.</p>
                            <Link href="/jadwalrapat"><i className="fas fa-calendar-alt fitur-icon"></i></Link>
                        </div>
                        <div className="fitur-box">
                            <h3>Riwayat Pinjam</h3>
                            <p>Lihat semua riwayat peminjaman ruangan.</p>
                            <Link href="/riwayat"><i className="fas fa-history fitur-icon"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="custom-footer">
                <div className="footer-container">
                    <div className="footer-sections">
                        <div className="footer-left">
                            <div className="footer-logo-text">
                                <img src="logobpsr.png" alt="Logo BPS" width="40" height="40" />
                                <div className="pemisah"></div>
                                <div className="footer-org-text">
                                    <h1>Badan Pusat Statistik</h1>
                                    <h4>Provinsi Riau</h4>
                                </div>
                            </div>
                            <p>Badan Pusat Statistik Provinsi Riau (Statistics of Riau Province)<br />
                                Jl. Pattimura No. 12 Pekanbaru - Riau Indonesia</p>
                            <p>Email: riau@bps.go.id</p>
                            <p>Nomor Telepon:<br />Telp (62-761) 23042</p>
                        </div>

                        <div className="footer-right">
                            <img
                                src="Sticker.webp"
                                alt="Sticker Bangga Melayani Bangsa"
                                width="380"
                                height="100"
                                className="footer-sticker"
                            />
                        </div>
                    </div>

                    <hr className="footer-divider" />

                    <div className="footer-bottom">
                        <p>Hak Cipta © 2025 Badan Pusat Statistik</p>
                        <div className="footer-nav">
                            <Link href="/">Beranda</Link>
                            <Link href="/TENTANG">Tentang</Link>
                            <Link href="/PEDOMAN">Pedoman</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
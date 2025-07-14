<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoomController;

// Rute untuk halaman selamat datang
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Grup rute yang memerlukan otentikasi dan verifikasi
Route::middleware(['auth', 'verified'])->group(function () {
    // Rute untuk dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Rute resource untuk produk
    Route::resource('/products', ProductsController::class);

    // Rute resource untuk ruangan
    Route::resource('/Rooms', RoomController::class);

    // Rute untuk menampilkan daftar riwayat (histories)
    Route::get('/histories', [HistoryController::class, 'Historys'])->name('history.index');

    // Rute untuk menampilkan daftar anggota (members)
    Route::get('/members', [MembersController::class, 'Members'])->name('members.index');

    // Rute untuk menampilkan daftar pemesanan (bookings)
    Route::get('/bookings', [BookingController::class, 'Bookings'])->name('bookings.index');
});

// Memasukkan file rute eksternal
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

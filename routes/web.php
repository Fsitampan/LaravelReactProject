<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\MembersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoomController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/Rooms', [RoomController::class, 'index'])->name('Rooms.index');
    Route::resource('Rooms', RoomController::class);
    Route::get('Rooms/create', [RoomController::class, 'create'])->name('Rooms.create');
    Route::get('Rooms/show', [RoomController::class, 'show'])->name('Rooms.show');
    Route::get('/Historys', [HistoryController::class, 'Historys'])->name('Historys');
    Route::get('/Members', [MembersController::class, 'Members'])->name('Members.index');
    Route::get('/Bookings',[BookingController::class, 'Bookings'])->name('Bookings.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

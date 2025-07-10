<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Room;
use App\Models\Booking; // Add this line for the Booking model
use Illuminate\Support\Facades\Storage;

class BookingController extends Controller{
public function Bookings()
{
    return inertia::render('Bookings/Bookings', []);
}
}
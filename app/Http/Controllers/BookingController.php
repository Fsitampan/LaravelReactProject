<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Room;
use App\Models\Booking; // Add this line for the Booking model
use Illuminate\Support\Facades\Storage;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'booked_by' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        Booking::create($data);

        return redirect()->back();
    }

    public function cancel(Booking $booking)
    {
        $booking->update(['canceled' => true]);

        return redirect()->back();
    }
}
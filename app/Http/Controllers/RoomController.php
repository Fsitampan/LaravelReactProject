<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Add this line for Inertia
use App\Models\Rooms; // Add this line for the Room model
use Illuminate\Support\Facades\Storage; // Add this line for the Storage facade

class RoomController extends Controller
{
    
    public function Rooms()
    {
        return Inertia::render('Rooms/Rooms', []); 
    }
    public function create()
    {
        return inertia::render('Rooms/create');
    }
    
}

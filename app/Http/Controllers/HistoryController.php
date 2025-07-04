<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Add this line for Inertia
use App\Models\Historys; // Add this line for the Room model
use Illuminate\Support\Facades\Storage; // Add this line for the Storage facade

class HistoryController extends Controller{
    public function Historys()
    {
        return inertia::render('Historys/Historys', []);
    }
}
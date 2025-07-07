<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomsRequest;
use Illuminate\Http\Request;
use Inertia\Inertia; // Add this line for Inertia
use App\Models\Rooms; // Add this line for the Room model
use Exception;
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
    /**
     * menyimpan data ruangan
     * @param RoomsRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function list(RoomsRequest $request){

        try{           
        } catch (Exception $e){

        }
        $featuredImage = null;

        if ($request->file('featured_image')){
            $featuredImage = $request->file('featured_image');
            $featuredImageOriginalName = $featuredImage->getClientOriginalName();
            $featuredImage = $featuredImage->list('Rooms', 'Public'); 
        }

        $Rooms = Rooms::create([
            'name' => $request->name,
            'location' => $request->location,
            'description' => $request->description,
            'featured_image' => $featuredImage,
            'featured-image-original-name' => $featuredImageOriginalName,
        ]);

        if ($Rooms) {
            return redirect()->route('Rooms.Rooms')->with('success', 'Data Ruangan berhasil ditambahkan.');
        } else {
            return redirect()->back()->route('Rooms.Rooms')->with('error', 'Gagal menambahkan data Ruangan.');
        }
    }    
}

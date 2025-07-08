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
    
    public function index()
    {
        $Rooms = Rooms::latest()->get();
        return Inertia::render('Rooms/index', [
            'Rooms' => $Rooms,
        ]); 
    }
    public function Create()
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
        $featuredImageOriginalName = null;

        if ($request->file('featured_image')){
            $featuredImage = $request->file('featured_image');
            $featuredImageOriginalName = $featuredImage->getClientOriginalName();
            $featuredImage = $featuredImage->store('Rooms', 'public'); 
        }

        $Rooms = Rooms::create([
            'name' => $request->name,
            'location' => $request->location,
            'description' => $request->description,
            'featured_image' => $featuredImage,
            'featured-image_original_name' => $featuredImageOriginalName,
        ]);

        if ($Rooms) {
            return redirect()->route('Rooms.index')->with('success', 'Data Ruangan berhasil ditambahkan.');
        } else {
            return redirect()->back()->with('error', 'Gagal menambahkan data Ruangan.');
        }
    }    
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomsRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Rooms;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
    /**
     * Tampilkan daftar ruangan dengan filter & pagination.
     */
    public function index(Request $request)
    {
        $query = Rooms::query();

        // Total sebelum filter
        $totalCount = $query->count();

        // Filter pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(fn($q) =>
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
            );
        }

        $filteredCount = $query->count();
        $perPage = (int) ($request->perPage ?? 10);

        if ($perPage === -1) {
            $allRooms = $query->latest()->get()->map(fn($Rooms) => [
                'id'                           => $Rooms->id,
                'name'                         => $Rooms->name,
                'location'                     => $Rooms->location,
                'description'                  => $Rooms->description,
                'featured_image'               => $Rooms->featured_image,
                'featured_image_original_name' => $Rooms->featured_image_original_name,
            ]);

            $Rooms = [
                'data'     => $allRooms,
                'total'    => $filteredCount,
                'per_page' => $perPage,
                'from'     => 1,
                'to'       => $filteredCount,
                'links'    => [],
            ];
        } else {
            $Rooms = $query->latest()->paginate($perPage)->withQueryString();
            $Rooms->getCollection()->transform(fn($Rooms) => [
                'id'                           => $Rooms->id,
                'name'                         => $Rooms->name,
                'location'                     => $Rooms->location,
                'description'                  => $Rooms->description,
                'featured_image'               => $Rooms->featured_image,
                'featured_image_original_name' => $Rooms->featured_image_original_name,
            ]);
        }

        return Inertia::render('Rooms/index', [
            'Rooms'          => $Rooms,
            'filters'        => $request->only(['search', 'perPage']),
            'totalCount'     => $totalCount,
            'filteredCount'  => $filteredCount,
        ]);
    }

    /**
     * Tampilkan form tambah ruangan.
     */
    public function create()
    {
        return Inertia::render('Rooms/create');
    }

    /**
     * Simpan data ruangan baru.
     */
    public function store(RoomsRequest $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'description' => 'nullable|string',
                'featured_image' => 'nullable|image|max:2048',
            ]);

            $featuredImage = null;
            $featuredImageOriginalName = null;

            if ($request->hasFile('featured_image')) {
                $image = $request->file('featured_image');
                $featuredImage = $image->store('rooms', 'public');
                $featuredImageOriginalName = $image->getClientOriginalName();
            } else {
                $featuredImage = null;
                $featuredImageOriginalName = null;
            }

            Rooms::create([
                'name'                         => $request->name,
                'location'                     => $request->location,
                'description'                  => $request->description,
                'status'                       => $request->status,
                'featured_image'               => $featuredImage,
                'featured_image_original_name' => $featuredImageOriginalName,
            ]);


            return redirect()->route('Rooms.index')->with('success', 'Data Ruangan berhasil ditambahkan.');
        } catch (Exception $e) {
            Log::error('Gagal menyimpan ruangan: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan data ruangan.');
        }
    }


    /**
     * Tampilkan detail ruangan (khusus untuk read/view).
     */
    public function show(Rooms $Rooms)
    {
        return Inertia::render('Rooms/show', [
            'Rooms'  => $Rooms,
            'isView' => true,
        ]);
    }

    /**
     * Tampilkan form edit ruangan.
     */
    public function edit(Rooms $Rooms)
    {
        return Inertia::render('Rooms/create', [
            'Rooms' => $Rooms,
            'isEdit' => true,
        ]);
    }

    /**
     * Update data ruangan.
     */
    public function update(RoomsRequest $request, Rooms $Rooms)
    {
        try {
            $Rooms->name = $request->name;
            $Rooms->location = $request->location;
            $Rooms->description = $request->description;

            if ($request->hasFile('featured_image')) {
                $image = $request->file('featured_image');
                $featuredImageOriginalName = $image->getClientOriginalName();
                $featuredImage = $image->store('Rooms', 'public');

                $Rooms->featured_image = $featuredImage;
                $Rooms->featured_image_original_name = $featuredImageOriginalName;
            }

            $Rooms->save();

            return redirect()->route('Rooms.index')->with('success', 'Data Ruangan berhasil diperbarui.');
        } catch (Exception $e) {
            Log::error('Gagal memperbarui ruangan: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat memperbarui data ruangan.');
        }
    }

    /**
     * Hapus ruangan.
     */
    public function destroy(Rooms $Rooms)
    {
        try {
            $Rooms->delete();
            return redirect()->back()->with('success', 'Data Ruangan berhasil dihapus.');
        } catch (Exception $e) {
            Log::error('Gagal menghapus ruangan: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menghapus data ruangan.');
        }
    }
}

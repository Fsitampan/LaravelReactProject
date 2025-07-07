<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Add this line
use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    use HasFactory;
        protected $fillable = [
        'name',
        'location',
        'description',
        'featured_image',
        'featured_image_original_name',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
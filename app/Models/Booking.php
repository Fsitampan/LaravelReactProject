<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = ['room_id', 'booked_by', 'date', 'start_time', 'end_time', 'canceled'];

    public function Rooms()
    {
        return $this->belongsTo(Rooms::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ruangan extends Model
{
    use HasFactory;

    public function user(): HasMany
    {
        return $this->hasMany(User::class, 'ruangan_id', 'id');
    }

    public function barangs(): HasMany
    {
        return $this->hasMany(Barang::class, 'ruangan_id', 'id');
    }
}

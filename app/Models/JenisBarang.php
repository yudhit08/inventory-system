<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisBarang extends Model
{
    use HasFactory;

    public function barangs(): HasMany
    {
        return $this->hasMany(Barang::class, 'id_barang', 'id');
    }
}

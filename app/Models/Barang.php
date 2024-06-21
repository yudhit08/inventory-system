<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Barang extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penanggung_jawab', 'id');
    }

    public function pengaduans(): HasMany
    {
        return $this->hasMany(Pengaduan::class, 'id_barang', 'no_bmn');
    }

    public function ruangan(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ruangan', 'id');
    }

    public function jenisBarang(): BelongsTo
    {
        return $this->belongsTo(User::class, 'jenis_barang', 'id');
    }
}

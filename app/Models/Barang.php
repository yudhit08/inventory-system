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
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function pengaduans(): HasMany
    {
        return $this->hasMany(Pengaduan::class, 'barang_id', 'no_bmn');
    }

    public function ruangan(): BelongsTo
    {
        return $this->belongsTo(Ruangan::class, 'ruangan_id', 'id');
    }

    public function jenisBarang(): BelongsTo
    {
        return $this->belongsTo(JenisBarang::class, 'jenis_barang_id', 'id');
    }
}

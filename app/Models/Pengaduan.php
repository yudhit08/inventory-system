<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pengaduan extends Model
{
    use HasFactory;

    public function userPengaduan(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_pelapor', 'id');
    }

    public function userPelapor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_petugas', 'id');
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_barang', 'no_bmn');
    }

    public function jenisLayanan(): BelongsTo
    {
        return $this->belongsTo(JenisLayanan::class, 'jenis_layanan', 'id');
    }
}

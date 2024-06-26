<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pengaduan extends Model
{
    use HasFactory;

    public $incrementing = false;


    public function userPelapor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pelapor_user_id', 'id');
    }

    public function userPetugas(): BelongsTo
    {
        return $this->belongsTo(User::class, 'petugas_user_id', 'id');
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id', 'id');
    }

    public function jenisLayanan(): BelongsTo
    {
        return $this->belongsTo(JenisLayanan::class, 'layanan_id', 'id');
    }
}

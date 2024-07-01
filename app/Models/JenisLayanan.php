<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisLayanan extends Model
{
    use HasFactory;

    public $incrementing = false;


    public function pengaduans(): HasMany
    {
        return $this->hasMany(Pengaduan::class, 'pengaduan_id', 'id');
    }
}

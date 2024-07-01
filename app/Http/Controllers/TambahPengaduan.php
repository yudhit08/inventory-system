<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TambahPengaduan extends Controller
{
    //
    public function layanan() {
        return Inertia::render('Pengaduan/Form/BuatPengaduanLayanan');
    }

    public function barang() {
        return Inertia::render('Pengaduan/Form/BuatPengaduanBarang');
    }
}

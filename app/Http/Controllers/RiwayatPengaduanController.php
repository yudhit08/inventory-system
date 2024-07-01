<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RiwayatPengaduanController extends Controller
{
    //
    public function index() {
        return Inertia::render('Pengaduan/RiwayatPengaduan');
    }
}

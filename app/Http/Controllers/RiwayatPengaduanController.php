<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RiwayatPengaduanController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::findMany(Auth::user()->id);
        return Inertia::render('Pengaduan/RiwayatPengaduan', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan
        ]);
    }
}

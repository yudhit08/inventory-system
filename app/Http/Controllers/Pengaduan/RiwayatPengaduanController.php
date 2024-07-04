<?php

namespace App\Http\Controllers\Pengaduan;

use App\Http\Controllers\Controller;
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
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang', 'jenisLayanan'])
            ->where('pelapor_user_id', Auth::id())
            ->get();

        return Inertia::render('Pengaduan/RiwayatPengaduan', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan
        ]);
    }

    public function details($id)
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang.jenisBarang', 'jenisLayanan', 'gambar'])
            ->findOrFail($id);

        return Inertia::render('Pengaduan/Details', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan
        ]);
    }
}

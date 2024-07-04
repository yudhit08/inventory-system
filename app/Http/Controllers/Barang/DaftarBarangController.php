<?php

namespace App\Http\Controllers\Barang;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DaftarBarangController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $barang = Barang::with(['user', 'ruangan', 'jenisBarang'])
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('Barang/DaftarBarang', [
            'user' => $user,
            'barang' => $barang
        ]);
    }

    public function details($id)
    {
        $user = Auth::user();
        $barang = Barang::with(['pengaduans', 'ruangan', 'jenisBarang', 'gambar', 'user'])
            ->findOrFail($id);
        $allBarang = Barang::with(['pengaduans', 'ruangan', 'jenisBarang', 'gambar', 'user'])
            ->where('id', '!=', $id)
            ->where('user_id', $user->id)
            ->get();

        return Inertia::render('Barang/DetailsBarang', [
            'user' => $user,
            'barang' => $barang,
            'semuaBarang' => $allBarang
        ]);
    }
}

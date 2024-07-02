<?php

namespace App\Http\Controllers;

use App\Http\Requests\TambahPengaduanRequest;
use App\Models\Barang;
use App\Models\JenisLayanan;
use App\Models\Pengaduan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TambahPengaduan extends Controller
{
    //
    public function layanan()
    {
        return Inertia::render('Pengaduan/Form/BuatPengaduanLayanan');
    }

    public function barang()
    {
        $layanan = JenisLayanan::all();
        $barang = Barang::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Pengaduan/Form/BuatPengaduanBarang', [
            "layanan" => $layanan,
            "barang" => $barang
        ]);
    }

    public function tambahBarang(TambahPengaduanRequest $request)
    {
        logger()->info($request);
        // $request->authenticate();
        $pengaduan = new Pengaduan();
        $pengaduan->keterangan = $request->keterangan;
        $pengaduan->pelapor_user_id = Auth::user()->id;
        $pengaduan->barang_id = $request->barang;
        $pengaduan->layanan_id = $request->layanan;
        
        $pengaduan->save();
        // dd($pengaduan);

        // Mengembalikan respon sukses
        return response()->json([
            'success' => [
                'message' => 'Pengaduan berhasil ditambah',
            ],
        ], 200);
    }
}

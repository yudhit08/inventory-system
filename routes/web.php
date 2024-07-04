<?php

use App\Http\Controllers\Barang\DaftarBarangController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Pengaduan\RiwayatPengaduanController;
use App\Http\Controllers\Pengaduan\TambahPengaduan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/', "/dashboard");

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/pengaduan/riwayat-pengaduan', [RiwayatPengaduanController::class, 'index'])->name('riwayat-pengaduan');
    Route::get('/pengaduan/riwayat-pengaduan/details/{id}', [RiwayatPengaduanController::class, 'details'])->name('details-riwayat-pengaduan');
   
    Route::get('/pengaduan/buat-pengaduan', [TambahPengaduan::class, 'index'])->name('buat-pengaduan');
    Route::post('/pengaduan/buat-pengaduan', [TambahPengaduan::class, 'tambahPengaduan'])->name('buat-pengaduan');

    Route::get('/barang/daftar-barang', [DaftarBarangController::class, 'index'])->name('daftar-barang');
    Route::get('/barang/daftar-barang/details/{id}', [DaftarBarangController::class, 'details'])->name('details-daftar-barang');
});

Route::middleware('auth')->group(function () {
    Route::get('/profiles/user/personal', function () {
        return Inertia::render('Profiles/TabPersonal');
    })->name('profile.edit');
    Route::get('/profiles/user/password', function () {
        return Inertia::render('Profiles/TabPassword');
    })->name('profile.edit');
    Route::get('/profiles/user/settings', function () {
        return Inertia::render('Profiles/TabSettings');
    })->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// Fallback route for handling 404 errors
Route::fallback(function () {
    return Inertia::render('Error/404');
});

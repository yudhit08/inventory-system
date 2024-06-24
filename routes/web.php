<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', "/dashboard");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Default');
    })->name('dashboard');

    Route::get('/riwayat-pengaduan', function () {
        return Inertia::render('RiwayatPengaduan');
    })->name('riwayat-pengaduan');
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

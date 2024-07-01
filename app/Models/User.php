<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'nip',
        'nomor_wa',
        'email',
        'email_verified_at',
        'role',
        'remember_token',
        'password'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function barangs(): HasMany
    {
        return $this->hasMany(Barang::class, 'penanggung_jawab', 'id');
    }

    public function pelaporPengaduans(): HasMany
    {
        return $this->hasMany(Pengaduan::class, 'nip_pelapor', 'nip');
    }

    public function petugasPengaduans(): HasMany
    {
        return $this->hasMany(Pengaduan::class, 'nip_petugas', 'nip');
    }

    public function ruangans(): BelongsTo
    {
        return $this->belongsTo(Ruangan::class, 'penanggung_jawab', 'id');
    }

    public function jabatans(): BelongsTo {
        return $this->belongsTo(Jabatan::class, 'nip_pegawai', 'nip');
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Roles::class, 'role_user', 'user_id', 'role_id');
    }
}

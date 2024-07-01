<?php

namespace Database\Factories;

use App\Models\Barang;
use App\Models\JenisBarang;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BarangFactory extends Factory
{
    protected $model = Barang::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Get all jenis barang IDs
        $jenisBarangIds = JenisBarang::pluck('id')->toArray();
        return [
            'id' => $this->faker->uuid,
            'no_bmn' => Str::random(10),
            'merk' => $this->faker->word,
            'tahun_pengadaan' => $this->faker->dateTime,
            'nilai_pengadaan' => $this->faker->numberBetween(1000, 100000),
            'riwayat_perbaikan' => $this->faker->optional()->dateTime,
            'status' => $this->faker->randomElement(['available', 'unavailable', 'in repair']),
            'jenis_barang_id' => $this->faker->randomElement($jenisBarangIds),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

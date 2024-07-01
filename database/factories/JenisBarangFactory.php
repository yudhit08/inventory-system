<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JenisBarang>
 */
class JenisBarangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid,
            'jenis_barang' => $this->faker->randomElement(['monitor', 'ups', 'keyboard', 'mouse', 'pc', 'printer', 'proyektor']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

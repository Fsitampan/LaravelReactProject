<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoomsFactory extends Factory
{
    /**
     * what makes you strong today it's yourself in yesterday
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word . ' Room',
            'location' => 'Lantai ' . $this->faker->numberBetween(1, 3),
            'description' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['tersedia', 'tidak tersedia']),
            'featured_image' => '',
        ];
    }
}
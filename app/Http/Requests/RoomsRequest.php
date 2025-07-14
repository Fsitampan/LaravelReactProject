<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:225',
            'description' => 'required|string|max:1000',
             'status' => 'required|in:tersedia,tidak tersedia',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    /**
     * function messages
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'masukkan nama ruangan',
            'name.string' => 'nama ruangan harus berupa huruf atau angka',
            'name.max' => 'nama ruangan harus kurang dari 255 karakter',
            'location.required' => 'masukkan lokasi ruangan',
            'location.string' => 'lokasi ruangan harus berupa huruf atau angka',
            'location.max' => 'lokasi ruangan harus kurang dari 255 karakter',
            'description.required' => 'masukkan deskripsi ruangan',
            'description.string' => 'deskripsi ruangan harus berupa huruf atau angka',
            'description.max' => 'deskripsi ruangan harus kurang dari 1000 karakter',
            'featured_image.image' => 'file harus berupa gambar',
            'featured_image.mimes' => 'file harus berformat jpeg,png,jpg,gif,svg',
            'featured_image.max' => 'file gambar tidak boleh lebih dari 2MB',
            'status.required' => 'status ruangan wajib diisi',
            'status.in' => 'status harus bernilai tersedia atau tidak tersedia',

        ];
    } 
}
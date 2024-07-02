<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TambahPengaduanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return false;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'keterangan' => ['required', 'string'],
            'barang' => ['required', 'string'],
            'layanan' => ['required', 'string'],
        ];
    }
}

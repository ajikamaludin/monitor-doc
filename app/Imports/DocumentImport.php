<?php

namespace App\Imports;

use App\Models\Category;
use App\Models\Company;
use App\Models\Document;
use App\Models\Type;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class DocumentImport implements ToCollection, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
        $no = Document::count();
        $documents = collect();

        foreach($rows as $row) {
            $company = Company::where('name', 'like', $row['nama_perusahaan'])->first();
            $type = Type::where('name', 'like', $row['jenis'])->first();
            $cat = Category::where('name', 'like', $row['kategori'])->first();

            if ($company == null) {
                $company = Company::first();
            }

            if ($type == null) {
                $type = Type::first();
            }

            if ($cat == null) {
                $cat = Category::first();
            }

            $no += 1;
            $documents->add([
                "no" => $no,
                "no_doc" => $row['no'],
                "name" => $row['nama'],
                "publisher" => $row['penerbit'],
                "description" => $row['keterangan'],
                "publish_date" => Carbon::createFromFormat('d-m-Y',$row['tanggal_terbit']),
                "due_date" => Carbon::createFromFormat('d-m-Y',$row['tanggal_jatuh_tempo']),
                "status" => $row['status'] == 'Ya' ? Document::STATUS_YES : Document::STATUS_NO,
                "type" => $row['tipe'] == 'Tetap' ? Document::TYPE_TETAP : Document::TYPE_TIDAK_TETAP,
                "document" => '',
                "company_id" => $company->id,
                "type_id" => $type->id,
                "category_id" => $cat->id,
                "user_id" => auth()->user()->id,
                "created_at" => now()
            ]);
        }

        if ($documents->count() > 0) {
            Document::insert($documents->toArray());
        }
        
    }

    public function chunkSize(): int
    {
        return 1000;
    }

}

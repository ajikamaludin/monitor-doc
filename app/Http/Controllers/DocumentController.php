<?php

namespace App\Http\Controllers;

use App\Imports\DocumentImport;
use App\Models\Category;
use App\Models\Company;
use App\Models\Document;
use App\Models\Type;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use OpenSpout\Writer\Common\Creator\Style\StyleBuilder;
use Rap2hpoutre\FastExcel\FastExcel;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = Document::with(['variety', 'category', 'company.region']);

        if ($request->has('status')) {
            if($request->status == 1) {
                $query->whereDate('due_date', '<=', now()->toDateString());
            } 
            if($request->status == 2) {
                $query->closeToExpired();
            }
        }

        if ($request->has('sortBy') && $request->has('sortRule')) {
            $query->orderBy($request->sortBy, $request->sortRule);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        if ($request->q != null || $request->q != '') {
            $query->where(function ($query) use ($request) {
                $query->where('no_doc', 'like', '%'.$request->q.'%')
                ->orWhere('name', 'like', '%'.$request->q.'%')
                ->orWhere('no', 'like', '%'.$request->q.'%');
            });
        }

        if($request->user()->region_id != null) {
            $companies = Company::where('region_id', $request->user()->region_id)->pluck('id')->toArray();
            $query->whereIn('company_id', $companies);
        }

        return inertia('Document/Index', [
            'docs' => $query->paginate(10),
        ]);
    }

    public function create()
    {
        $user = User::find(auth()->user()->id);
        if ($user->is_admin) {
            $companies = Company::all();
        } else {
            $companies = Company::where('region_id', $user->region_id)->get();
        }

        return inertia('Document/Form', [
            'companies' => $companies,
            'types' => Type::all(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "no_doc" => "nullable|string",
            "name" => "nullable|string",
            "type_id" => "required|exists:types,id",
            "category_id" => "required|exists:categories,id",
            "publisher" => "required|string",
            "description" => "nullable",
            "publish_date" => "nullable|date",
            "due_date" => "nullable|date",
            "status" => "required|in:0,1",
            "type" => "required|in:0,1",
            "company_id" => "required|exists:companies,id",
            "document" => "nullable|file",
        ]);

        if($request->type == Document::TYPE_TIDAK_TETAP) {
            $request->validate([
                "due_date" => "date|after_or_equal:".$request->publish_date
            ]);
        }

        if($request->status == Document::STATUS_YES) {
            $request->validate([
                "no_doc" => "required|string",
                "publish_date" => "required|date",
            ]);
        }

        $doc = Document::make([
            "no" => Document::count() + 1,
            "no_doc" => $request->no_doc,
            "name" => $request->name,
            "type_id" => $request->type_id,
            "category_id" => $request->category_id,
            "publisher" => $request->publisher,
            "description" => $request->description,
            "publish_date" => $request->publish_date != '' ? Carbon::parse($request->publish_date)->toDateString() : null,
            "due_date" => $request->due_date != '' ? Carbon::parse($request->due_date)->toDateString() : null,
            "status" => $request->status,
            "type" => $request->type,
            "company_id" => $request->company_id,
            "user_id" => auth()->user()->id,
        ]);

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $file->store('documents', 'public');
            $doc->document = $file->hashName();
        }

        $doc->save();
        
        return redirect()->route("docs.index")
                ->with('message', ['type' => 'success', 'message' => 'The data has beed saved']);
    }

    public function edit(Document $doc)
    {
        $user = User::find(auth()->user()->id);
        if ($user->is_admin) {
            $companies = Company::all();
        } else {
            $companies = Company::where('region_id', $user->region_id)->get();
        }
    
        return inertia('Document/Form', [
            'companies' => $companies,
            'types' => Type::all(),
            'categories' => Category::all(),
            'doc' => $doc->load(['variety', 'category'])
        ]);
    }

    public function update(Request $request, Document $doc)
    {
        $request->validate([
            "no_doc" => "nullable|string",
            "name" => "nullable|string",
            "type_id" => "required|exists:types,id",
            "category_id" => "required|exists:categories,id",
            "publisher" => "required|string",
            "description" => "nullable",
            "publish_date" => "nullable|date",
            "due_date" => "nullable|date",
            "status" => "required|in:0,1",
            "type" => "required|in:0,1",
            "company_id" => "required|exists:companies,id",
            "document" => "nullable|file",
        ]);

        if($request->type == Document::TYPE_TIDAK_TETAP) {
            $request->validate([
                "due_date" => "date|after_or_equal:".$request->publish_date
            ]);
        }

        if($request->status == Document::STATUS_YES) {
            $request->validate([
                "no_doc" => "required|string",
                "publish_date" => "required|date",
            ]);
        }

        $doc->fill([
            "no" => Document::count() + 1,
            "no_doc" => $request->no_doc,
            "name" => $request->name,
            "type_id" => $request->type_id,
            "category_id" => $request->category_id,
            "publisher" => $request->publisher,
            "description" => $request->description,
            "publish_date" => $request->publish_date != '' ? Carbon::parse($request->publish_date)->toDateString() : null,
            "due_date" => $request->due_date != '' ? Carbon::parse($request->due_date)->toDateString() : null,
            "status" => $request->status,
            "type" => $request->type,
            "company_id" => $request->company_id,
            "user_id" => auth()->user()->id,
        ]);

        if ($request->hasFile('document')) {
            $file = $request->file('document');
            $file->store('documents', 'public');
            $doc->document = $file->hashName();
        }

        $doc->save();

        return redirect()->route("docs.index")
                ->with('message', ['type' => 'success', 'message' => 'The data has beed updated']);
    }

    public function show(Document $doc)
    {
        return inertia('Document/Detail', [
            'doc' => $doc->load(['variety', 'category', 'company.region.group']),
            'doc_url' => asset('documents/'.$doc->document),
        ]);
    }

    public function destroy(Document $doc)
    {
        $doc->delete();
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file'
        ]);

        Excel::import(new DocumentImport, $request->file);
    }


    public function export(Request $request)
    {
        $query = Document::with(['variety', 'category', 'company.region.group'])->orderBy('created_at', 'desc');

        $collections = collect([]);
        foreach ($query->get() as $document) {
            $collections->add([
                'group' => $document->company->region->group->name,
                'region' => $document->company->region->name,
                'nama perusahaan' => $document->company->name,
                'jenis' => $document->variety->name,
                'kategori' => $document->category->name,
                'no' => $document->no_doc,
                'nama' => $document->name,
                'penerbit' => $document->publisher,
                'tipe' => $document->type == Document::TYPE_TETAP ? 'Tetap' : 'Tidak Tetap',
                'tanggal terbit' => $document->publish_date->format('d-m-Y'),
                'tanggal jatuh tempo' => $document->due_date?->format('d-m-Y'),
                'keterangan' => $document->description,
                'file' => $document->document != null ? asset('documents/'.$document->document) : null,
                'status' => $document->status == Document::STATUS_YES ? 'Ya' : 'Tidak',
                'catatan' => $document->due_status,
            ]);
        }

        if($request->type == 'pdf') {
            return $this->exportAsPdf($collections);
        }
        if($request->type == 'excel') {
            return $this->exportAsExcel($collections);
        }
        return $this->print($collections);
    }

    private function print($collections) {
        return view('exports.documents', ['collections' => $collections->toArray()]);
    }

    private function exportAsPdf($collections) 
    {
        $pdf = Pdf::setPaper('legal', 'landscape');
        $pdf->loadView('exports.documents', ['collections' => $collections->toArray()]);
        $date = now()->format('d-m-Y');

        return $pdf->download("documents-$date.pdf");
    }

    private function exportAsExcel($collections)
    {
        $date = now()->format('d-m-Y');

        return (new FastExcel($collections))
            ->download("document-$date.xlsx");
    }
}

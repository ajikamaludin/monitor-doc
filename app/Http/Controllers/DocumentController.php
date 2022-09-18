<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Document;
use App\Models\TypeDoc;
use Illuminate\Http\Request;
use OpenSpout\Writer\Common\Creator\Style\StyleBuilder;
use Rap2hpoutre\FastExcel\FastExcel;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = Document::with(['department', 'type'])->orderBy('created_at');

        if ($request->q != null || $request->q != '') {
            $query->where(function ($query) use ($request) {
                $query->where('no_doc', 'like', '%'.$request->q.'%')
                ->orWhere('company_name', 'like', '%'.$request->q.'%')
                ->orWhere('pic_name', 'like', '%'.$request->q.'%')
                ->orWhere('email', 'like', '%'.$request->q.'%');
            });
        }

        if ($request->department_id != '') {
            $query->where('department_id', $request->department_id);
        }

        if ($request->status != '') {
            $query->where('status', $request->status);
        }

        if ($request->type_doc_id != '') {
            $query->where('type_doc_id', $request->type_doc_id);
        }

        return inertia('Document/Index', [
            'docs' => $query->paginate(10),
            'types' => TypeDoc::all(),
            'departments' => Department::all(),
        ]);
    }

    public function create()
    {
        return inertia('Document/Form', [
            'types' => TypeDoc::all(),
            'departments' => Department::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_doc' => 'required|string',
            'company_name' => 'required|string',
            'first_person_name' => 'required|string',
            'second_person_name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'type_doc_id' => 'required|exists:type_docs,id',
            'department_id' => 'required|exists:departments,id',
            'pic_name' => 'required|string',
            'email' => 'required|email',
            // 'document' => 'required|file',
            'note' => 'nullable',
            'status' => 'required|numeric',
        ]);

        $lastDocs = Document::orderBy('created_at', 'desc')->first();
        $lastDocs = $lastDocs ? $lastDocs : Document::make(['no' => 0]);
        $docs = Document::make([
            'no' => $lastDocs->no + 1,
            'no_doc' => $request->no_doc,
            'company_name' => $request->company_name,
            'first_person_name' => $request->first_person_name,
            'second_person_name' => $request->second_person_name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'pic_name' => $request->pic_name,
            'email' => $request->email,
            'note' => $request->note,
            'type_doc_id' => $request->type_doc_id,
            'department_id' => $request->department_id,
            'status' => $request->status,
            'user_id' => auth()->user()->id,
        ]);

        // $file = $request->file('document');
        // $file->store('documents', 'public');
        $docs->document = '';

        $docs->save();

        return redirect()->route('docs.index')
            ->with('message', ['type' => 'success', 'message' => 'The data has beed saved']);
    }

    public function edit(Document $doc)
    {
        return inertia('Document/Form', [
            'types' => TypeDoc::all(),
            'departments' => Department::all(),
            'doc' => $doc
        ]);
    }

    public function update(Request $request, Document $doc)
    {
        $request->validate([
            'no_doc' => 'required|string',
            'company_name' => 'required|string',
            'first_person_name' => 'required|string',
            'second_person_name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'type_doc_id' => 'required|exists:type_docs,id',
            'department_id' => 'required|exists:departments,id',
            'pic_name' => 'required|string',
            'email' => 'required|email',
            'document' => 'nullable|file',
            'note' => 'nullable',
            'status' => 'required|numeric',
        ]);


        $doc->fill([
            'no_doc' => $request->no_doc,
            'company_name' => $request->company_name,
            'first_person_name' => $request->first_person_name,
            'second_person_name' => $request->second_person_name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'pic_name' => $request->pic_name,
            'email' => $request->email,
            'note' => $request->note,
            'type_doc_id' => $request->type_doc_id,
            'department_id' => $request->department_id,
            'status' => $request->status,
        ]);

        $file = $request->file('document');
        if ($file != null) {
            $file->store('documents', 'public');
            $doc->document = $file->hashName();
        }

        $doc->save();

        return redirect()->route('docs.index')
            ->with('message', ['type' => 'success', 'message' => 'The data has beed saved']);
    }

    public function show(Document $doc)
    {
        return inertia('Document/Detail', [
            'doc' => $doc->load(['department', 'type', 'creator']),
            'doc_url' => asset('document/'.$doc->document),
        ]);
    }

    public function export(Request $request)
    {
        $query = Document::with(['department', 'type', 'creator'])->orderBy('created_at');

        if ($request->q != null || $request->q != '') {
            $query->where(function ($query) use ($request) {
                $query->where('no_doc', 'like', '%'.$request->q.'%')
                ->orWhere('company_name', 'like', '%'.$request->q.'%')
                ->orWhere('pic_name', 'like', '%'.$request->q.'%')
                ->orWhere('email', 'like', '%'.$request->q.'%');
            });
        }

        if ($request->department_id != '') {
            $query->where('department_id', $request->department_id);
        }

        if ($request->status != '') {
            $query->where('status', $request->status);
        }

        if ($request->type_doc_id != '') {
            $query->where('type_doc_id', $request->type_doc_id);
        }

        $collections = collect([]);
        foreach ($query->get() as $document) {
            $collections->add([
                'no dokumen' => $document->no_doc,
                'jenis dokumen' => $document->type->name,
                'nama perusahaan' => $document->company_name,
                'nama pihak pertama' => $document->first_person_name,
                'nama pihak kedua' => $document->second_person_name,
                'tanggal mulai' => $document->start_date,
                'tanggal selesai' => $document->end_date,
                'department' => $document->department->name,
                'nama pic' => $document->pic_name,
                'email' => $document->email,
                'catata' => $document->note,
                'status' => $document->status,
                'user_creator' => $document->creator->name,
            ]);
        }

        $date = now()->format('d-m-y');
        $header_style = (new StyleBuilder())->setFontBold()->build();

        return (new FastExcel($collections))
            ->headerStyle($header_style)
            ->download("documents-$date.xlsx");
    }

    public function destroy(Document $doc)
    {
        $doc->delete();
        return redirect()->back();
    }
}

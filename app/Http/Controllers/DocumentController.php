<?php

namespace App\Http\Controllers;

use App\Mail\DocumentShare;
use App\Models\Category;
use App\Models\Department;
use App\Models\Document;
use App\Models\Type;
use App\Models\TypeDoc;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use OpenSpout\Writer\Common\Creator\Style\StyleBuilder;
use Rap2hpoutre\FastExcel\FastExcel;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = Document::with(['type', 'category']);

        if ($request->has('sortBy') && $request->has('sortRule')) {
            $query->orderBy($request->sortBy, $request->sortRule);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        if ($request->q != null || $request->q != '') {
            $query->where(function ($query) use ($request) {
                $query->where('no_doc', 'like', '%'.$request->q.'%')
                ->orWhere('name', 'like', '%'.$request->q.'%')
                ->orWhere('company_name', 'like', '%'.$request->q.'%')
                ->orWhere('no', 'like', '%'.$request->q.'%');
            });
        }

        return inertia('Document/Index', [
            'docs' => $query->paginate(10),
        ]);
    }

    public function create()
    {
        return inertia('Document/Form', [
            'types' => Type::all(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "no_doc" => "required|string",
            "name" => "required|string",
            "company_name" => "required|string",
            "type_id" => "required|exists:types,id",
            "category_id" => "required|exists:categories,id",
            "publisher" => "required|string",
            "description" => "nullable",
            "publish_date" => "required|date",
            "due_date" => "required_if:type,1",
            "status" => "required|in:0,1",
            "type" => "required|in:0,1",
            "group" => "required|string",
            "region" => "required|string",
            "document" => "required|file",
        ]);

        if($request->publish_date == Document::TYPE_TETAP) {
            $request->validate([
                "due_date" => "date|after_or_equal:".$request->publish_date
            ]);
        }

        $doc = Document::make([
            "no" => Document::count() + 1,
            "no_doc" => $request->no_doc,
            "name" => $request->name,
            "company_name" => $request->company_name,
            "type_id" => $request->type_id,
            "category_id" => $request->category_id,
            "publisher" => $request->publisher,
            "description" => $request->description,
            "publish_date" => $request->publish_date,
            "due_date" => $request->due_date,
            "status" => $request->status,
            "type" => $request->type,
            "group" => $request->group,
            "region" => $request->region,
            "user_id" => auth()->user()->id,
        ]);

        $file = $request->file('document');
        $file->store('documents', 'public');
        $doc->document = $file->hashName();

        $doc->save();
        
        return redirect("docs.index")
                ->with('message', ['type' => 'success', 'message' => 'The data has beed saved']);
    }

    public function edit(Document $doc)
    {
        return inertia('Document/Form', [
            'types' => Type::all(),
            'categories' => Category::all(),
            'doc' => $doc->load(['type', 'category'])
        ]);
    }

    public function update(Request $request, Document $doc)
    {
        // 
    }

    public function show(Document $doc)
    {
        return inertia('Document/Detail', [
            'doc' => $doc->load(['type', 'category']),
            'doc_url' => asset('documents/'.$doc->document),
        ]);
    }

    public function destroy(Document $doc)
    {
        $doc->delete();
    }
}

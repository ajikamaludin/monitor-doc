<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Document;
use App\Models\Type;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = Document::with(['variety', 'category']);

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
            'now' => now()->timezone('UTC'),
            'now2' => now()->toDateTimeString(),
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
            "no_doc" => "nullable|string",
            "name" => "required|string",
            "company_name" => "required|string",
            "type_id" => "required|exists:types,id",
            "category_id" => "required|exists:categories,id",
            "publisher" => "required|string",
            "description" => "nullable",
            "publish_date" => "nullable|date",
            "due_date" => "required_if:type,0",
            "status" => "required|in:0,1",
            "type" => "required|in:0,1",
            "group" => "required|string",
            "region" => "required|string",
            "document" => "required|file",
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
        
        return redirect()->route("docs.index")
                ->with('message', ['type' => 'success', 'message' => 'The data has beed saved']);
    }

    public function edit(Document $doc)
    {
        return inertia('Document/Form', [
            'types' => Type::all(),
            'categories' => Category::all(),
            'doc' => $doc->load(['variety', 'category'])
        ]);
    }

    public function update(Request $request, Document $doc)
    {
        $request->validate([
            "no_doc" => "nullable|string",
            "name" => "required|string",
            "company_name" => "required|string",
            "type_id" => "required|exists:types,id",
            "category_id" => "required|exists:categories,id",
            "publisher" => "required|string",
            "description" => "nullable",
            "publish_date" => "nullable|date",
            "due_date" => "required_if:type,1",
            "status" => "required|in:0,1",
            "type" => "required|in:0,1",
            "group" => "required|string",
            "region" => "required|string",
            "document" => "nullable|file",
        ]);

        if($request->type == Document::TYPE_TETAP) {
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
            'doc' => $doc->load(['variety', 'category']),
            'doc_url' => asset('documents/'.$doc->document),
        ]);
    }

    public function destroy(Document $doc)
    {
        $doc->delete();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Auth;
use Illuminate\Http\Request;
use Str;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'location' => ['required', 'string'],
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,png,jpeg,webp', 'max:2048'],
        ]);

        $data = [
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'location' => $request->location,
            'description' => $request->description,
        ];

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imageName = Str::uuid() . '.' . $request->file('image')->extension();
            $request->file('image')->storeAs('images/reports', $imageName, 'public');

            $data['image'] = $imageName;
        }

        Report::create($data);

        return back()->with('success', 'berhasil membuat aspirasi');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function reply(Request $request, string $id) {
        
    }
}

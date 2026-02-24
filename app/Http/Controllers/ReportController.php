<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Auth;
use Illuminate\Http\Request;

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
            'category_id' => ['required', 'integer'],
            'location' => ['required', 'string'],
            'description' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpg,png,jpeg,webp'],
        ]);

        if ($request->photo) {

        }
        
        $data = [
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'location' => $request->location,
            'description' => $request->description,
        ];


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
}

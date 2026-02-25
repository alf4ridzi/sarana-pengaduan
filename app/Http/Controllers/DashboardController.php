<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Report;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = User::where('id', Auth::id())->first();

        $aspirasi = collect();

        // build base query for reports with relationships
        $query = Report::with('user', 'category', 'replies');

        if ($user->hasRole('admin') || $user->hasRole('superadmin')) {
            // no additional constraints
        } elseif ($user->hasRole('student')) {
            $query->where('user_id', Auth::id());
        }

        // fetch and normalize the data so the frontend receives a simple structure
        $aspirasi = $query->get()->map(function ($r) {
            $arr = $r->toArray();
            // convert category relationship to a simple string name
            $arr['category'] = optional($r->category)->name;
            // build a full URL for image so frontend can render it easily
            if ($r->image) {
                $arr['image_url'] = url('storage/images/reports/' . $r->image);
            }
            return $arr;
        })->toArray();

        $categories = Category::all();

        $data = [
            'categories' => $categories,
            'aspirasi' => $aspirasi,
        ];

        return Inertia::render("Sarana/Dashboard", $data);
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

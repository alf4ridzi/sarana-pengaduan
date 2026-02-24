<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("reports", function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, "user_id")->constrained();
            $table->foreignIdFor(Category::class, "category_id")->constrained();
            $table->string("location", 50);
            $table->string("description");
            $table->string("photo")->nullable();
            $table->enum("status", ["open", "process", "closed"])->default("open");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("reports");
    }
};

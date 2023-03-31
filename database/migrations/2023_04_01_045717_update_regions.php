<?php

use App\Models\Permission;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('regions', function ($table) {
            $table->string('email')->nullable();
        });

        $permission = Permission::where('name', 'download-document')->first();
        if ($permission == null) {
            Permission::create([
                'name' => 'download-document', 
                'label' => 'Download Documen'
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('regions', function ($table) {
            $table->dropColumn('email');
        });
    }
};

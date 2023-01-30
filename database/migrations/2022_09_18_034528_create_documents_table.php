<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string("no")->nullable();
            $table->string("no_doc")->nullable();
            $table->string("name")->nullable();
            $table->foreignId("type_id")->constrained(); //select jenis
            $table->foreignId("category_id")->constrained(); //select
            $table->string("publisher")->nullable();
            $table->text("description")->nullable();
            $table->timestamp("publish_date")->nullable();
            $table->timestamp("due_date")->nullable(); //for reminder
            $table->smallInteger("status")->default(1); //only 1 yes/ 0no 
            $table->smallInteger("type")->default(1); //only 1 tetap/ 0tidak tetap 
            $table->string("document")->nullable();
            $table->foreignId("user_id")->constrained();

            $table->foreignId("company_id")->constrained();
            // ?
            // $table->string("group")->nullable();
            // $table->string("region")->nullable();
            // $table->string("company_name")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
    }
};

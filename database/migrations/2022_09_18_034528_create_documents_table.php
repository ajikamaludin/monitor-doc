<?php

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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->integer('no', false);
            $table->string('no_doc');
            $table->foreignId('type_doc_id')->constrained();
            $table->string('company_name');
            $table->string('first_person_name');
            $table->string('second_person_name');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->foreignId('department_id')->constrained();
            $table->string('pic_name');
            $table->string('email');
            $table->text('note');
            $table->string('document');
            $table->foreignId('user_id')->constrained();
            $table->smallInteger('status')->default(0);
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

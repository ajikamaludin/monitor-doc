<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\GeneralController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/docs', [DocumentController::class, 'index'])->name('docs.index');
    Route::get('/docs/export', [DocumentController::class, 'export'])->name('docs.export');
    Route::get('/docs/create', [DocumentController::class, 'create'])->name('docs.create');
    Route::post('/docs', [DocumentController::class, 'store'])->name('docs.store');
    Route::delete('/docs/{doc}', [DocumentController::class, 'destroy'])->name('docs.destroy');
    Route::get('/docs/{doc}', [DocumentController::class, 'edit'])->name('docs.edit');
    Route::post('/docs/{doc}', [DocumentController::class, 'update'])->name('docs.update');
    Route::get('/docs/{doc}/show', [DocumentController::class, 'show'])->name('docs.show');
    Route::post('/docs/{doc}/share', [DocumentController::class, 'share'])->name('docs.share');
});

require __DIR__.'/auth.php';

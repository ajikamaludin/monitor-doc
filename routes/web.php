<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClassificationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TypeController;
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

Route::get('/mailable', function () {
    return new App\Mail\DocumentNotification();
});

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/docs/export', [DocumentController::class, 'export'])->name('docs.export');
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::get('/groups', [GroupController::class, 'index'])->name('groups.index');
    Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');
    Route::put('/groups/{group}', [GroupController::class, 'update'])->name('groups.update');
    Route::delete('/groups/{group}', [GroupController::class, 'destroy'])->name('groups.destroy');

    Route::get('/regions', [RegionController::class, 'index'])->name('regions.index');
    Route::post('/regions', [RegionController::class, 'store'])->name('regions.store');
    Route::put('/regions/{region}', [RegionController::class, 'update'])->name('regions.update');
    Route::delete('/regions/{region}', [RegionController::class, 'destroy'])->name('regions.destroy');

    Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
    Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');
    Route::put('/companies/{company}', [CompanyController::class, 'update'])->name('companies.update');
    Route::delete('/companies/{company}', [CompanyController::class, 'destroy'])->name('companies.destroy');
    
    Route::get('/classifications', [ClassificationController::class, 'index'])->name('classifications.index');
    Route::post('/classifications', [ClassificationController::class, 'store'])->name('classifications.store');
    Route::put('/classifications/{classification}', [ClassificationController::class, 'update'])->name('classifications.update');
    Route::delete('/classifications/{classification}', [ClassificationController::class, 'destroy'])->name('classifications.destroy');

    Route::get('/types', [TypeController::class, 'index'])->name('types.index');
    Route::post('/types', [TypeController::class, 'store'])->name('types.store');
    Route::put('/types/{type}', [TypeController::class, 'update'])->name('types.update');
    Route::delete('/types/{type}', [TypeController::class, 'destroy'])->name('types.destroy');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::post("/docs/import", [DocumentController::class, 'import'])->name('docs.import');
    Route::get('/docs', [DocumentController::class, 'index'])->name('docs.index');
    Route::get('/docs/create', [DocumentController::class, 'create'])->name('docs.create');
    Route::post('/docs', [DocumentController::class, 'store'])->name('docs.store');
    Route::delete('/docs/{doc}', [DocumentController::class, 'destroy'])->name('docs.destroy');
    Route::get('/docs/{doc}', [DocumentController::class, 'edit'])->name('docs.edit');
    Route::post('/docs/{doc}', [DocumentController::class, 'update'])->name('docs.update');
    Route::get('/docs/{doc}/show', [DocumentController::class, 'show'])->name('docs.show');

    Route::get('/notification/{notification}', [NotificationController::class, 'redirect'])->name('notification.redirect');

    Route::get('/setting', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/setting', [SettingController::class, 'update'])->name('setting.update');
    Route::post('/setting/add-cc', [SettingController::class, 'store'])->name('setting.add-cc');
    Route::delete('/setting/add-cc/{mail}', [SettingController::class, 'destroy'])->name('setting.delete-cc');
});

require __DIR__.'/auth.php';

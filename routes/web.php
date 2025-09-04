<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin user management routes with specific permissions
    Route::prefix('admin/users')->name('admin.users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->middleware('permission:user-list')->name('index');
        Route::get('/create', [UserController::class, 'create'])->middleware('permission:user-create')->name('create');
        Route::post('/', [UserController::class, 'store'])->middleware('permission:user-create')->name('store');
        Route::get('/{user}', [UserController::class, 'show'])->middleware('permission:user-list')->name('show');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->middleware('permission:user-edit')->name('edit');
        Route::patch('/{user}', [UserController::class, 'update'])->middleware('permission:user-edit')->name('update');
        Route::put('/{user}', [UserController::class, 'update'])->middleware('permission:user-edit')->name('update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->middleware('permission:user-delete')->name('destroy');
    });

    // Admin role management routes with specific permissions
    Route::prefix('admin/roles')->name('admin.roles.')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->middleware('permission:role-list')->name('index');
        Route::get('/create', [RoleController::class, 'create'])->middleware('permission:role-create')->name('create');
        Route::post('/', [RoleController::class, 'store'])->middleware('permission:role-create')->name('store');
        Route::get('/{role}', [RoleController::class, 'show'])->middleware('permission:role-list')->name('show');
        Route::get('/{role}/edit', [RoleController::class, 'edit'])->middleware('permission:role-edit')->name('edit');
        Route::patch('/{role}', [RoleController::class, 'update'])->middleware('permission:role-edit')->name('update');
        Route::put('/{role}', [RoleController::class, 'update'])->middleware('permission:role-edit')->name('update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->middleware('permission:role-delete')->name('destroy');
    });

    // Admin permission management routes with specific permissions
    Route::prefix('admin/permissions')->name('admin.permissions.')->group(function () {
        Route::get('/', [PermissionController::class, 'index'])->middleware('permission:permission-list')->name('index');
        Route::get('/create', [PermissionController::class, 'create'])->middleware('permission:permission-create')->name('create');
        Route::post('/', [PermissionController::class, 'store'])->middleware('permission:permission-create')->name('store');
        Route::get('/{permission}', [PermissionController::class, 'show'])->middleware('permission:permission-list')->name('show');
        Route::get('/{permission}/edit', [PermissionController::class, 'edit'])->middleware('permission:permission-edit')->name('edit');
        Route::patch('/{permission}', [PermissionController::class, 'update'])->middleware('permission:permission-edit')->name('update');
        Route::put('/{permission}', [PermissionController::class, 'update'])->middleware('permission:permission-edit')->name('update');
        Route::delete('/{permission}', [PermissionController::class, 'destroy'])->middleware('permission:permission-delete')->name('destroy');
    });
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

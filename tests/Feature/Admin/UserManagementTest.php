<?php

use App\Models\User;
use App\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create permissions
    $permissions = [
        'user-list', 'user-create', 'user-edit', 'user-delete'
    ];
    
    foreach ($permissions as $permission) {
        Permission::create(['name' => $permission, 'guard_name' => 'web']);
    }
    
    // Create roles
    $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web']);
    $adminRole->givePermissionTo($permissions);
    
    $userRole = Role::create(['name' => 'user', 'guard_name' => 'web']);
    
    // Create admin user
    $this->adminUser = User::factory()->create();
    $this->adminUser->assignRole('admin');
});

test('admin can create a new user', function () {
    $userData = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'roles' => ['user']
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.users.store'), $userData);
    
    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseHas('users', [
        'name' => 'Test User',
        'email' => 'test@example.com'
    ]);
    
    $user = User::where('email', 'test@example.com')->first();
    expect($user->hasRole('user'))->toBeTrue();
});

test('admin can view user details', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.users.show', $user));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/users/show')
            ->has('user')
    );
});

test('admin can update user', function () {
    $user = User::factory()->create();
    $user->assignRole('user');
    
    $updateData = [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'roles' => ['admin']
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->put(route('admin.users.update', $user), $updateData);
    
    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Updated Name',
        'email' => 'updated@example.com'
    ]);
    
    $user->refresh();
    expect($user->hasRole('admin'))->toBeTrue();
});

test('admin can delete user', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($this->adminUser)
        ->delete(route('admin.users.destroy', $user));
    
    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseMissing('users', [
        'id' => $user->id
    ]);
});

test('user creation requires valid data', function () {
    $invalidData = [
        'name' => '',
        'email' => 'invalid-email',
        'password' => '123',
        'roles' => []
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.users.store'), $invalidData);
    
    $response->assertSessionHasErrors(['name', 'email', 'password', 'roles']);
});

test('admin can search users', function () {
    User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
    User::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);
    
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.users.index', ['search' => 'John']));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/users/index')
            ->has('users')
    );
});

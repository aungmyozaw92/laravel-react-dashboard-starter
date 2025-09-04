<?php

use App\Models\User;
use App\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create permissions
    $permissions = [
        'user-list', 'user-create', 'user-edit', 'user-delete',
        'role-list', 'role-create', 'role-edit', 'role-delete',
        'permission-list', 'permission-create', 'permission-edit', 'permission-delete'
    ];
    
    foreach ($permissions as $permission) {
        Permission::create(['name' => $permission, 'guard_name' => 'web']);
    }
    
    // Create admin role
    $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web']);
    $adminRole->givePermissionTo($permissions);
    
    // Create admin user
    $this->adminUser = User::factory()->create();
    $this->adminUser->assignRole('admin');
});

test('user creation shows success flash message', function () {
    $userData = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'roles' => ['admin']
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.users.store'), $userData);
    
    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('successMessage');
    
    $flashMessage = session('successMessage');
    expect($flashMessage)->toContain('Test User');
    expect($flashMessage)->toContain('created successfully');
});

test('user update shows success flash message', function () {
    $user = User::factory()->create(['name' => 'Original Name']);
    
    $updateData = [
        'name' => 'Updated User',
        'email' => 'updated@example.com',
        'roles' => ['admin']
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->put(route('admin.users.update', $user), $updateData);
    
    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('successMessage');
    
    $flashMessage = session('successMessage');
    expect($flashMessage)->toContain('Original Name'); // Controller fetches user before update
    expect($flashMessage)->toContain('updated successfully');
});

test('user deletion shows success flash message', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($this->adminUser)
        ->delete(route('admin.users.destroy', $user));
    
    $response->assertRedirect(route('admin.users.index'));
    $response->assertSessionHas('successMessage');
    
    $flashMessage = session('successMessage');
    expect($flashMessage)->toContain('deleted successfully');
});

test('role creation shows success flash message', function () {
    $roleData = [
        'name' => 'manager',
        'permissions' => ['user-list']
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.roles.store'), $roleData);
    
    $response->assertRedirect(route('admin.roles.index'));
    $response->assertSessionHas('successMessage');
    
    $flashMessage = session('successMessage');
    expect($flashMessage)->toContain('manager');
    expect($flashMessage)->toContain('created successfully');
});

test('permission creation shows success flash message', function () {
    $permissionData = [
        'name' => 'test-permission'
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.permissions.store'), $permissionData);
    
    $response->assertRedirect(route('admin.permissions.index'));
    $response->assertSessionHas('successMessage');
    
    $flashMessage = session('successMessage');
    expect($flashMessage)->toContain('test-permission');
    expect($flashMessage)->toContain('created successfully');
});

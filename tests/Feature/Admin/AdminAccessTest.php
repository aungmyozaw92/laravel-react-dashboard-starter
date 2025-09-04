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
    
    // Create user role
    $userRole = Role::create(['name' => 'user', 'guard_name' => 'web']);
    
    // Create test users
    $this->adminUser = User::factory()->create();
    $this->adminUser->assignRole('admin');
    
    $this->regularUser = User::factory()->create();
    $this->regularUser->assignRole('user');
});

test('admin can access user management', function () {
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.users.index'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/users/index')
    );
});

test('admin can access role management', function () {
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.roles.index'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/roles/index')
    );
});

test('admin can access permission management', function () {
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.permissions.index'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/permissions/index')
    );
});

test('regular user cannot access admin panel', function () {
    $response = $this->actingAs($this->regularUser)
        ->get(route('admin.users.index'));
    
    $response->assertStatus(403);
});

test('regular user cannot access role management', function () {
    $response = $this->actingAs($this->regularUser)
        ->get(route('admin.roles.index'));
    
    $response->assertStatus(403);
});

test('regular user cannot access permission management', function () {
    $response = $this->actingAs($this->regularUser)
        ->get(route('admin.permissions.index'));
    
    $response->assertStatus(403);
});

test('guest cannot access admin panel', function () {
    $response = $this->get(route('admin.users.index'));
    
    $response->assertRedirect(route('login'));
});

test('admin can view create user page', function () {
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.users.create'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/users/create')
    );
});

test('admin can view create role page', function () {
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.roles.create'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/roles/create')
    );
});

test('admin can view create permission page', function () {
    $response = $this->actingAs($this->adminUser)
        ->get(route('admin.permissions.create'));
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/permissions/create')
    );
});

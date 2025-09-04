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

test('admin can create a new role', function () {
    $roleData = [
        'name' => 'manager',
        'permissions' => ['user-list', 'user-create']
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.roles.store'), $roleData);
    
    $response->assertRedirect(route('admin.roles.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseHas('roles', [
        'name' => 'manager',
        'guard_name' => 'web'
    ]);
    
    $role = Role::where('name', 'manager')->first();
    expect($role->hasPermissionTo('user-list'))->toBeTrue();
});

test('admin can update role', function () {
    $role = Role::create(['name' => 'test-role', 'guard_name' => 'web']);
    $role->givePermissionTo('user-list');
    
    $updateData = [
        'name' => 'updated-role',
        'permissions' => ['user-list', 'user-create']
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->put(route('admin.roles.update', $role), $updateData);
    
    $response->assertRedirect(route('admin.roles.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseHas('roles', [
        'id' => $role->id,
        'name' => 'updated-role'
    ]);
    
    $role->refresh();
    expect($role->hasPermissionTo('user-list'))->toBeTrue();
    expect($role->hasPermissionTo('user-create'))->toBeTrue();
});

test('admin can delete role', function () {
    $role = Role::create(['name' => 'test-role', 'guard_name' => 'web']);
    
    $response = $this->actingAs($this->adminUser)
        ->delete(route('admin.roles.destroy', $role));
    
    $response->assertRedirect(route('admin.roles.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseMissing('roles', [
        'id' => $role->id
    ]);
});

test('admin can create a new permission', function () {
    $permissionData = [
        'name' => 'test-permission'
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.permissions.store'), $permissionData);
    
    $response->assertRedirect(route('admin.permissions.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseHas('permissions', [
        'name' => 'test-permission',
        'guard_name' => 'web'
    ]);
});

test('admin can update permission', function () {
    $permission = Permission::create(['name' => 'test-permission', 'guard_name' => 'web']);
    
    $updateData = [
        'name' => 'updated-permission'
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->put(route('admin.permissions.update', $permission), $updateData);
    
    $response->assertRedirect(route('admin.permissions.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseHas('permissions', [
        'id' => $permission->id,
        'name' => 'updated-permission'
    ]);
});

test('admin can delete permission', function () {
    $permission = Permission::create(['name' => 'test-permission', 'guard_name' => 'web']);
    
    $response = $this->actingAs($this->adminUser)
        ->delete(route('admin.permissions.destroy', $permission));
    
    $response->assertRedirect(route('admin.permissions.index'));
    $response->assertSessionHas('successMessage');
    
    $this->assertDatabaseMissing('permissions', [
        'id' => $permission->id
    ]);
});

test('role creation requires valid data', function () {
    $invalidData = [
        'name' => '',
        'permissions' => []
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.roles.store'), $invalidData);
    
    $response->assertSessionHasErrors(['name', 'permissions']);
});

test('permission creation requires valid data', function () {
    $invalidData = [
        'name' => ''
    ];
    
    $response = $this->actingAs($this->adminUser)
        ->post(route('admin.permissions.store'), $invalidData);
    
    $response->assertSessionHasErrors(['name']);
});

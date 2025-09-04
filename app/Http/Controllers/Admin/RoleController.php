<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\StoreRoleRequest;
use App\Http\Requests\Admin\Role\UpdateRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function __construct(
        private RoleService $roleService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $sortBy = $request->get('sort_by');
        $sortDirection = $request->get('sort_direction', 'asc');
        
        $roles = $this->roleService->getPaginatedRoles(10, $search, $sortBy, $sortDirection);
        
        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
            'filters' => [
                'search' => $search ?? '',
                'sort_by' => $sortBy ?? '',
                'sort_direction' => $sortDirection,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = $this->roleService->getAllPermissions()->pluck('name');
        return Inertia::render('admin/roles/create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $validated = $request->validated();
        
        $role = $this->roleService->createRole(
            $validated,
            $validated['permissions'] ?? []
        );

        return redirect()->route('admin.roles.index')
            ->with('successMessage', "Role '{$role->name}' has been created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = $this->roleService->findRoleById((int) $id);
        
        if (!$role) {
            abort(404);
        }
        
        return Inertia::render('admin/roles/show', [
            'role' => $role,
            'rolePermissions' => $role->permissions->pluck('name'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = $this->roleService->findRoleById((int) $id);
        
        if (!$role) {
            abort(404);
        }
        
        $permissions = $this->roleService->getAllPermissions()->pluck('name');
        return Inertia::render('admin/roles/edit', [
            'role' => $role,
            'rolePermissions' => $role->permissions->pluck('name'),
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, string $id)
    {
        $validated = $request->validated();
        
        $role = $this->roleService->findRoleById((int) $id);
        $this->roleService->updateRole(
            (int) $id,
            $validated,
            $validated['permissions'] ?? []
        );

        return redirect()->route('admin.roles.index')
            ->with('successMessage', "Role '{$role->name}' has been updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = $this->roleService->findRoleById((int) $id);
        $roleName = $role ? $role->name : 'Role';
        
        $this->roleService->deleteRole((int) $id);
        
        return redirect()->route('admin.roles.index')
            ->with('successMessage', "Role '{$roleName}' has been deleted successfully.");
    }
}

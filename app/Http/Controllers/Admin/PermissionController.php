<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Permission\StorePermissionRequest;
use App\Http\Requests\Admin\Permission\UpdatePermissionRequest;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function __construct(
        private PermissionService $permissionService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $sortBy = $request->get('sort_by');
        $sortDirection = $request->get('sort_direction', 'asc');
        
        $permissions = $this->permissionService->getPaginatedPermissions(10, $search, $sortBy, $sortDirection);
        
        return Inertia::render('admin/permissions/index', [
            'permissions' => $permissions,
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
        $groups = $this->permissionService->getPermissionGroups();
        return Inertia::render('admin/permissions/create', [
            'groups' => $groups
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        $validated = $request->validated();
        
        $this->permissionService->createPermission($validated);

        return redirect()->route('admin.permissions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // $permission = $this->permissionService->findPermissionById((int) $id);
        
        // if (!$permission) {
        //     abort(404);
        // }
        
        // return Inertia::render('admin/permissions/show', [
        //     'permission' => $permission
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $permission = $this->permissionService->findPermissionById((int) $id);
        
        if (!$permission) {
            abort(404);
        }
        
        $groups = $this->permissionService->getPermissionGroups();
        return Inertia::render('admin/permissions/edit', [
            'permission' => $permission,
            'groups' => $groups
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, string $id)
    {
        $validated = $request->validated();
        
        $this->permissionService->updatePermission((int) $id, $validated);

        return redirect()->route('admin.permissions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->permissionService->deletePermission((int) $id);
        return redirect()->route('admin.permissions.index');
    }
}
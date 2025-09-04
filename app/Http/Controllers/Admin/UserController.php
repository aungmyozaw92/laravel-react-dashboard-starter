<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $sortBy = $request->get('sort_by');
        $sortDirection = $request->get('sort_direction', 'asc');
        
        $users = $this->userService->getPaginatedUsers(10, $search, $sortBy, $sortDirection);
        
        return Inertia::render('admin/users/index', [
            'users' => $users,
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
        $roles = Role::pluck('name');
        return Inertia::render('admin/users/create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        
        $user = $this->userService->createUser(
            $validated,
            $validated['roles'] ?? []
        );

        return redirect()->route('admin.users.index')
            ->with('successMessage', "User '{$user->name}' has been created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->userService->findUserById((int) $id);
        
        if (!$user) {
            abort(404);
        }
        
        return Inertia::render('admin/users/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = $this->userService->findUserById((int) $id);
        
        if (!$user) {
            abort(404);
        }
        
        $roles = Role::pluck('name');
        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'userRoles' => $user->roles->pluck('name'),
            'roles' => $roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $validated = $request->validated();
        
        $user = $this->userService->findUserById((int) $id);
        $this->userService->updateUser(
            (int) $id,
            $validated,
            $validated['roles'] ?? []
        );

        return redirect()->route('admin.users.index')
            ->with('successMessage', "User '{$user->name}' has been updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->userService->findUserById((int) $id);
        $userName = $user ? $user->name : 'User';
        
        $this->userService->deleteUser((int) $id);
        
        return redirect()->route('admin.users.index')
            ->with('successMessage', "User '{$userName}' has been deleted successfully.");
    }
}

<?php

namespace App\Services;

use App\Models\Role;
use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class RoleService
{
    public function __construct(
        private RoleRepositoryInterface $roleRepository
    ) {}

    /**
     * Get paginated roles with search and sorting
     */
    public function getPaginatedRoles(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator
    {
        return $this->roleRepository->getAllWithPagination($perPage, $search, $sortBy, $sortDirection);
    }

    /**
     * Get all roles with permissions
     */
    public function getAllRolesWithPermissions(): Collection
    {
        return $this->roleRepository->getAllWithPermissions();
    }

    /**
     * Find role by ID
     */
    public function findRoleById(int $id): ?Role
    {
        return $this->roleRepository->findById($id);
    }

    /**
     * Create a new role with permissions
     */
    public function createRole(array $roleData, array $permissions = []): Role
    {
        // Create role
        $role = $this->roleRepository->create($roleData);

        // Assign permissions if provided
        if (!empty($permissions)) {
            $this->roleRepository->syncPermissions($role, $permissions);
        }

        return $role;
    }

    /**
     * Update role with permissions
     */
    public function updateRole(int $id, array $roleData, array $permissions = []): bool
    {
        // Update role
        $updated = $this->roleRepository->update($id, $roleData);

        // Update permissions if provided
        if ($updated && !empty($permissions)) {
            $role = $this->roleRepository->findById($id);
            if ($role) {
                $this->roleRepository->syncPermissions($role, $permissions);
            }
        }

        return $updated;
    }

    /**
     * Delete role
     */
    public function deleteRole(int $id): bool
    {
        return $this->roleRepository->delete($id);
    }

    /**
     * Get roles count
     */
    public function getRolesCount(): int
    {
        return $this->roleRepository->count();
    }

    /**
     * Check if role exists by name
     */
    public function roleExistsByName(string $name): bool
    {
        return $this->roleRepository->findByName($name) !== null;
    }

    /**
     * Get role statistics
     */
    public function getRoleStats(): array
    {
        return [
            'total_roles' => $this->getRolesCount(),
            'roles_with_permissions' => Role::with('permissions')->count(),
        ];
    }

    /**
     * Get all available permissions
     */
    public function getAllPermissions(): Collection
    {
        return \Spatie\Permission\Models\Permission::all();
    }

    /**
     * Get permissions for a specific role
     */
    public function getRolePermissions(int $roleId): Collection
    {
        $role = $this->roleRepository->findById($roleId);
        return $role ? $role->permissions : collect();
    }
}

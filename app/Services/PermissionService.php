<?php

namespace App\Services;

use App\Models\Permission;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class PermissionService
{
    public function __construct(
        private PermissionRepositoryInterface $permissionRepository
    ) {}

    /**
     * Get paginated permissions with search and sorting
     */
    public function getPaginatedPermissions(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator
    {
        return $this->permissionRepository->getAllWithPagination($perPage, $search, $sortBy, $sortDirection);
    }

    /**
     * Get all permissions
     */
    public function getAllPermissions(): Collection
    {
        return $this->permissionRepository->getAll();
    }

    /**
     * Find permission by ID
     */
    public function findPermissionById(int $id): ?Permission
    {
        return $this->permissionRepository->findById($id);
    }

    /**
     * Create a new permission
     */
    public function createPermission(array $permissionData): Permission
    {
        return $this->permissionRepository->create($permissionData);
    }

    /**
     * Update permission
     */
    public function updatePermission(int $id, array $permissionData): bool
    {
        return $this->permissionRepository->update($id, $permissionData);
    }

    /**
     * Delete permission
     */
    public function deletePermission(int $id): bool
    {
        return $this->permissionRepository->delete($id);
    }

    /**
     * Get permissions count
     */
    public function getPermissionsCount(): int
    {
        return $this->permissionRepository->count();
    }

    /**
     * Check if permission exists by name
     */
    public function permissionExistsByName(string $name): bool
    {
        return $this->permissionRepository->findByName($name) !== null;
    }

    /**
     * Get permission statistics
     */
    public function getPermissionStats(): array
    {
        return [
            'total_permissions' => $this->getPermissionsCount(),
            'permission_groups' => $this->getPermissionGroups()->count(),
        ];
    }

    /**
     * Get permissions by group
     */
    public function getPermissionsByGroup(string $group): Collection
    {
        return $this->permissionRepository->getByGroup($group);
    }

    /**
     * Get all permission groups
     */
    public function getPermissionGroups(): SupportCollection
    {
        return $this->permissionRepository->getGroups();
    }

    /**
     * Get permissions grouped by category
     */
    public function getPermissionsGrouped(): array
    {
        $permissions = $this->getAllPermissions();
        $grouped = [];

        foreach ($permissions as $permission) {
            $parts = explode('-', $permission->name);
            $group = $parts[0] ?? 'other';
            
            if (!isset($grouped[$group])) {
                $grouped[$group] = [];
            }
            
            $grouped[$group][] = $permission;
        }

        return $grouped;
    }

    /**
     * Create multiple permissions at once
     */
    public function createMultiplePermissions(array $permissionsData): array
    {
        $created = [];
        
        foreach ($permissionsData as $data) {
            $created[] = $this->createPermission($data);
        }
        
        return $created;
    }

    /**
     * Get permissions for a specific role
     */
    public function getPermissionsForRole(int $roleId): Collection
    {
        $role = \Spatie\Permission\Models\Role::with('permissions')->find($roleId);
        return $role ? $role->permissions : collect();
    }
}

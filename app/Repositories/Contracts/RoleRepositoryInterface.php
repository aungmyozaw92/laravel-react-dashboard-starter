<?php

namespace App\Repositories\Contracts;

use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface RoleRepositoryInterface
{
    /**
     * Get all roles with pagination, search, and sorting
     */
    public function getAllWithPagination(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator;

    /**
     * Get all roles with their permissions
     */
    public function getAllWithPermissions(): Collection;

    /**
     * Find role by ID
     */
    public function findById(int $id): ?Role;

    /**
     * Find role by name
     */
    public function findByName(string $name): ?Role;

    /**
     * Create a new role
     */
    public function create(array $data): Role;

    /**
     * Update role
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete role
     */
    public function delete(int $id): bool;

    /**
     * Sync role permissions
     */
    public function syncPermissions(Role $role, array $permissions): void;

    /**
     * Get roles count
     */
    public function count(): int;
}

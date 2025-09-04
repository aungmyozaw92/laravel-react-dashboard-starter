<?php

namespace App\Repositories\Contracts;

use App\Models\Permission;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

interface PermissionRepositoryInterface
{
    /**
     * Get all permissions with pagination, search, and sorting
     */
    public function getAllWithPagination(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator;

    /**
     * Get all permissions
     */
    public function getAll(): Collection;

    /**
     * Find permission by ID
     */
    public function findById(int $id): ?Permission;

    /**
     * Find permission by name
     */
    public function findByName(string $name): ?Permission;

    /**
     * Create a new permission
     */
    public function create(array $data): Permission;

    /**
     * Update permission
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete permission
     */
    public function delete(int $id): bool;

    /**
     * Get permissions count
     */
    public function count(): int;

    /**
     * Get permissions by group
     */
    public function getByGroup(string $group): Collection;

    /**
     * Get all permission groups
     */
    public function getGroups(): SupportCollection;
}

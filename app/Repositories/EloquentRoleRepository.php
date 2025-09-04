<?php

namespace App\Repositories;

use App\Models\Role;
use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class EloquentRoleRepository implements RoleRepositoryInterface
{
    public function getAllWithPagination(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator
    {
        return Role::with('permissions')
            ->withFilters($search, $sortBy, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getAllWithPermissions(): Collection
    {
        return Role::with('permissions')->get();
    }

    public function findById(int $id): ?Role
    {
        return Role::with('permissions')->find($id);
    }

    public function findByName(string $name): ?Role
    {
        return Role::where('name', $name)->first();
    }

    public function create(array $data): Role
    {
        return Role::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $role = Role::findOrFail($id);
        return $role->update($data);
    }

    public function delete(int $id): bool
    {
        $role = Role::findOrFail($id);
        return $role->delete();
    }

    public function syncPermissions(Role $role, array $permissions): void
    {
        $role->syncPermissions($permissions);
    }

    public function count(): int
    {
        return Role::count();
    }
}

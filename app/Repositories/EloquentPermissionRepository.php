<?php

namespace App\Repositories;

use App\Models\Permission;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class EloquentPermissionRepository implements PermissionRepositoryInterface
{
    public function getAllWithPagination(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator
    {
        return Permission::withFilters($search, $sortBy, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getAll(): Collection
    {
        return Permission::all();
    }

    public function findById(int $id): ?Permission
    {
        return Permission::find($id);
    }

    public function findByName(string $name): ?Permission
    {
        return Permission::where('name', $name)->first();
    }

    public function create(array $data): Permission
    {
        return Permission::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $permission = Permission::findOrFail($id);
        return $permission->update($data);
    }

    public function delete(int $id): bool
    {
        $permission = Permission::findOrFail($id);
        return $permission->delete();
    }

    public function count(): int
    {
        return Permission::count();
    }

    public function getByGroup(string $group): Collection
    {
        return Permission::where('name', 'like', "{$group}-%")->get();
    }

    public function getGroups(): SupportCollection
    {
        // Use SQLite-compatible query instead of MySQL's SUBSTRING_INDEX
        if (config('database.default') === 'sqlite') {
            return Permission::selectRaw("SUBSTR(name, 1, INSTR(name || '-', '-') - 1) as group_name")
                ->distinct()
                ->orderBy('group_name')
                ->get()
                ->pluck('group_name');
        }
        
        return Permission::selectRaw('SUBSTRING_INDEX(name, "-", 1) as group_name')
            ->distinct()
            ->orderBy('group_name')
            ->get()
            ->pluck('group_name');
    }
}

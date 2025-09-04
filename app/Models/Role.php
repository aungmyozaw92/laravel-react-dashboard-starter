<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    /**
     * Scope a query to search roles by name.
     */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (!$search) {
            return $query;
        }

        return $query->where('name', 'like', "%{$search}%");
    }

    /**
     * Scope a query to sort roles by a given field and direction.
     */
    public function scopeSortBy(Builder $query, ?string $sortBy, string $sortDirection = 'asc'): Builder
    {
        $allowedSortFields = ['id', 'name', 'created_at', 'updated_at'];
        $allowedDirections = ['asc', 'desc'];
        
        if ($sortBy && in_array($sortBy, $allowedSortFields) && in_array($sortDirection, $allowedDirections)) {
            return $query->orderBy($sortBy, $sortDirection);
        }
        
        // Default sorting by name asc
        return $query->orderBy('name', 'asc');
    }

    /**
     * Scope a query to get roles with search and sorting filters.
     */
    public function scopeWithFilters(
        Builder $query, 
        ?string $search = null, 
        ?string $sortBy = null, 
        string $sortDirection = 'asc'
    ): Builder {
        return $query
            ->search($search)
            ->sortBy($sortBy, $sortDirection);
    }
}
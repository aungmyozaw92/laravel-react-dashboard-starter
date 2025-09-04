<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    /**
     * Get all users with pagination, search, and sorting
     */
    public function getAllWithPagination(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator;

    /**
     * Get all users with their roles
     */
    public function getAllWithRoles(): Collection;

    /**
     * Find user by ID
     */
    public function findById(int $id): ?User;

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?User;

    /**
     * Create a new user
     */
    public function create(array $data): User;

    /**
     * Update user
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete user
     */
    public function delete(int $id): bool;

    /**
     * Sync user roles
     */
    public function syncRoles(User $user, array $roles): void;

    /**
     * Get users count
     */
    public function count(): int;
}

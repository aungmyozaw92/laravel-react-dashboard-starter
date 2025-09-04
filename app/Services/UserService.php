<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}

    /**
     * Get paginated users with search and sorting
     */
    public function getPaginatedUsers(int $perPage = 10, ?string $search = null, ?string $sortBy = null, ?string $sortDirection = 'asc'): LengthAwarePaginator
    {
        return $this->userRepository->getAllWithPagination($perPage, $search, $sortBy, $sortDirection);
    }

    /**
     * Get all users with roles
     */
    public function getAllUsersWithRoles(): Collection
    {
        return $this->userRepository->getAllWithRoles();
    }

    /**
     * Find user by ID
     */
    public function findUserById(int $id): ?User
    {
        return $this->userRepository->findById($id);
    }

    /**
     * Create a new user with roles
     */
    public function createUser(array $userData, array $roles = []): User
    {
        // Hash password if provided
        if (isset($userData['password'])) {
            $userData['password'] = Hash::make($userData['password']);
        }

        // Create user
        $user = $this->userRepository->create($userData);

        // Assign roles if provided
        if (!empty($roles)) {
            $this->userRepository->syncRoles($user, $roles);
        }

        return $user;
    }

    /**
     * Update user with roles
     */
    public function updateUser(int $id, array $userData, array $roles = []): bool
    {
        // Hash password if provided
        if (isset($userData['password']) && !empty($userData['password'])) {
            $userData['password'] = Hash::make($userData['password']);
        } else {
            // Remove password from update if empty
            unset($userData['password']);
        }

        // Update user
        $updated = $this->userRepository->update($id, $userData);

        // Update roles if provided
        if ($updated && !empty($roles)) {
            $user = $this->userRepository->findById($id);
            if ($user) {
                $this->userRepository->syncRoles($user, $roles);
            }
        }

        return $updated;
    }

    /**
     * Delete user
     */
    public function deleteUser(int $id): bool
    {
        return $this->userRepository->delete($id);
    }

    /**
     * Get users count
     */
    public function getUsersCount(): int
    {
        return $this->userRepository->count();
    }

    /**
     * Check if user exists by email
     */
    public function userExistsByEmail(string $email): bool
    {
        return $this->userRepository->findByEmail($email) !== null;
    }

    /**
     * Get user statistics
     */
    public function getUserStats(): array
    {
        return [
            'total_users' => $this->getUsersCount(),
            'users_with_roles' => User::with('roles')->count(),
        ];
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Scope a query to search users by name or email.
     */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (!$search) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to sort users by a given field and direction.
     */
    public function scopeSortBy(Builder $query, ?string $sortBy, string $sortDirection = 'asc'): Builder
    {
        $allowedSortFields = ['id', 'name', 'email', 'created_at', 'updated_at'];
        $allowedDirections = ['asc', 'desc'];
        
        if ($sortBy && in_array($sortBy, $allowedSortFields) && in_array($sortDirection, $allowedDirections)) {
            return $query->orderBy($sortBy, $sortDirection);
        }
        
        // Default sorting by created_at desc
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Scope a query to get users with search and sorting filters.
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

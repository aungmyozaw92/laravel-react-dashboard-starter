# Laravel React Dashboard Starter

A modern, full-stack dashboard application built with Laravel 11, React 18, TypeScript, and Inertia.js. Features a complete admin panel with user management, role-based permissions, and a beautiful UI.

## 🚀 Features

- **Modern Tech Stack**: Laravel 11 + React 18 + TypeScript + Inertia.js
- **Authentication System**: Complete login/register with email verification
- **Role-Based Access Control**: Spatie Laravel Permission integration
- **User Management**: CRUD operations for users, roles, and permissions
- **Modern UI**: Beautiful dashboard with Tailwind CSS and shadcn/ui components
- **Toast Notifications**: Laravel flash messages with React toast system
- **Responsive Design**: Mobile-first approach with sidebar navigation
- **Search & Pagination**: Advanced filtering and sorting capabilities
- **Repository Pattern**: Clean architecture with service layer

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **NPM** >= 9.0
- **MySQL** >= 8.0 or **PostgreSQL** >= 13.0
- **Git**

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/laravel-react-dashboard-starter.git
cd laravel-react-dashboard-starter
```

### Step 2: Install PHP Dependencies

```bash
composer install
```

### Step 3: Install Node.js Dependencies

```bash
npm install
```

### Step 4: Environment Configuration

```bash
# Copy the environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 5: Database Configuration

Edit your `.env` file and configure your database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_dashboard
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Step 6: Create Database

Create a new database in your MySQL/PostgreSQL:

```sql
CREATE DATABASE laravel_dashboard;
```

### Step 7: Run Migrations and Seeders

```bash
# Run migrations
php artisan migrate

# Seed the database with default data
php artisan db:seed
```

This will create:
- Default permissions
- SuperAdmin role with all permissions
- Default SuperAdmin user

### Step 8: Build Frontend Assets

```bash
# Build for development
npm run dev

# Or build for production
npm run build
```

### Step 9: Start the Development Server

```bash
# Start Laravel development server
php artisan serve

# In another terminal, start Vite for hot reloading
npm run dev
```

Your application will be available at: `http://localhost:8000`

## 🔐 Default Login Credentials

After running the seeders, you can login with:

- **Email**: `superadmin@admin.com`
- **Password**: `password123`
- **Role**: SuperAdmin (with all permissions)


## 🚀 Running Tests

### Run All Tests
```bash
php artisan test
```

### Run Specific Test Groups
```bash
# Admin tests only
php artisan test tests/Feature/Admin/

# Authentication tests only
php artisan test tests/Feature/Auth/

# Settings tests only
php artisan test tests/Feature/Settings/
```

### Run Individual Tests
```bash
# Run a specific test
php artisan test --filter="admin can create a new user"

# Run tests with verbose output
php artisan test --verbose
```
**Happy coding! 🚀**

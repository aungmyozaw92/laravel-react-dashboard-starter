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

## 📁 Project Structure

```
laravel-react-dashboard-starter/
├── app/
│   ├── Http/
│   │   ├── Controllers/Admin/     # Admin controllers
│   │   ├── Middleware/            # Custom middleware
│   │   └── Requests/              # Form request validation
│   ├── Models/                    # Eloquent models
│   ├── Repositories/              # Repository pattern
│   └── Services/                  # Business logic layer
├── database/
│   ├── migrations/                # Database migrations
│   └── seeders/                   # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/            # React components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── layouts/               # Page layouts
│   │   ├── pages/                 # Inertia.js pages
│   │   └── types/                 # TypeScript definitions
│   └── views/                     # Blade templates
└── routes/                        # Application routes
```

## 🎨 Available Roles & Permissions

### Roles
- **SuperAdmin**: Full access to all features
- **Admin**: User and role management
- **Manager**: User viewing and dashboard access
- **User**: Basic dashboard access

### Permissions
- **User Management**: `user-list`, `user-create`, `user-edit`, `user-delete`, `user-show`
- **Role Management**: `role-list`, `role-create`, `role-edit`, `role-delete`, `role-show`
- **Permission Management**: `permission-list`, `permission-create`, `permission-edit`, `permission-delete`, `permission-show`
- **Dashboard**: `dashboard-view`
- **Settings**: `settings-view`, `settings-edit`

## 🚀 Development Commands

```bash
# Run Laravel development server
php artisan serve

# Run Vite development server (hot reloading)
npm run dev

# Build assets for production
npm run build

# Run tests
php artisan test

# Clear application cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Run database migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Fresh migration with seeding
php artisan migrate:fresh --seed
```

## 🎯 Key Features Explained

### Authentication & Authorization
- Complete authentication system with email verification
- Role-based access control using Spatie Laravel Permission
- Middleware protection for admin routes
- Permission-based UI component rendering

### User Management
- Full CRUD operations for users, roles, and permissions
- Search and pagination functionality
- Sortable table headers
- Bulk operations support

### Modern UI/UX
- Responsive design with mobile-first approach
- Beautiful toast notifications
- Loading states and error handling
- Consistent design system with Tailwind CSS

### Architecture
- Repository pattern for data access
- Service layer for business logic
- Form request validation
- Model scopes for reusable queries

## 🔧 Configuration

### Environment Variables

Key environment variables you might want to customize:

```env
APP_NAME="Laravel React Dashboard"
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_dashboard
DB_USERNAME=root
DB_PASSWORD=

# Mail (for email verification)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=UserTest

# Run tests with coverage
php artisan test --coverage
```

## 📦 Production Deployment

### Build for Production

```bash
# Install production dependencies
composer install --optimize-autoloader --no-dev

# Build frontend assets
npm run build

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Server Requirements

- PHP >= 8.2
- MySQL >= 8.0 or PostgreSQL >= 13.0
- Web server (Apache/Nginx)
- SSL certificate (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Troubleshooting

### Common Issues

**Issue**: `Class "TightenCo\Ziggy\Ziggy" not found`
**Solution**: Run `composer install` and ensure all dependencies are installed.

**Issue**: `npm run dev` fails
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install`.

**Issue**: Database connection error
**Solution**: Check your `.env` file database configuration and ensure the database exists.

**Issue**: Permission denied errors
**Solution**: Run `php artisan migrate:fresh --seed` to reset the database.

### Getting Help

If you encounter any issues:

1. Check the [Laravel documentation](https://laravel.com/docs)
2. Check the [Inertia.js documentation](https://inertiajs.com/)
3. Check the [React documentation](https://react.dev/)
4. Open an issue in this repository

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - The PHP framework
- [React](https://react.dev/) - The JavaScript library
- [Inertia.js](https://inertiajs.com/) - The glue between Laravel and React
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission) - Role and permission management
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components

---

**Happy coding! 🚀**

## Admin Credentials
- Email: admin@gmail.com
- Password: 123456

## API Routes

### Authentication Routes
- POST `http://localhost:5000/register` - Register a new user
- POST `http://localhost:5000/login` - Login user
- POST `http://localhost:5000/forgot-password` - Request password reset with OTP
- POST `http://localhost:5000/reset-password` - Reset password using OTP
- POST `http://localhost:5000/logout` - Logout user

### User Routes
- GET `http://localhost:5000/users/profile` - Get user profile
- PUT `http://localhost:5000/users/profile` - Update user profile
- PUT `http://localhost:5000/users/password` - Update password
- POST `http://localhost:5000/users/profile/image` - Upload profile image

### Task Routes
- GET `http://localhost:5000/tasks/all` - Get all tasks
- GET `http://localhost:5000/tasks/view/:id` - Get single task
- POST `http://localhost:5000/tasks/create` - Create new task
- PUT `http://localhost:5000/tasks/update/:id` - Update task
- DELETE `http://localhost:5000/tasks/remove/:id` - Delete task

### Category Routes
- GET `http://localhost:5000/categories/all` - Get all categories
- GET `http://localhost:5000/categories/view/:id` - Get single category
- POST `http://localhost:5000/categories/create` - Create new category
- PUT `http://localhost:5000/categories/update/:id` - Update category
- DELETE `http://localhost:5000/categories/remove/:id` - Delete category

### Admin Routes
- GET `http://localhost:5000/admin/users/all` - Get all users
- GET `http://localhost:5000/admin/users/view/:id` - Get user details
- PUT `http://localhost:5000/admin/users/update/:id` - Update user
- DELETE `http://localhost:5000/admin/users/remove/:id` - Delete user
- GET `http://localhost:5000/admin/tasks/all` - Get all tasks
- GET `http://localhost:5000/admin/users/:userId/tasks/all` - Get user's tasks
- GET `http://localhost:5000/admin/tasks/view/:id` - Get task details
- PUT `http://localhost:5000/admin/tasks/update/:id` - Update task
- DELETE `http://localhost:5000/admin/tasks/remove/:id` - Delete task
- GET `http://localhost:5000/admin/categories/all` - Get all categories
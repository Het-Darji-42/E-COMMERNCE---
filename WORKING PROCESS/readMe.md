## E-commerce Backend File and Folder Structure (MERN - Backend Only)

Below is the recommended folder structure for your e-commerce backend, following the **MVC pattern**, with descriptions of each file and folder.

### Root Directory

- `/src`: Contains all source code for the backend.
- `package.json`: Defines project metadata, dependencies (e.g., express, mongoose, bcrypt, jwt), and scripts (e.g., `start`, `dev`).
- `.env`: Stores environment variables (e.g., `MONGO_URI`, `JWT_SECRET`, `PORT`).
- `server.js`: Entry point of the application. Initializes Express, connects to MongoDB, and sets up middleware and routes.
- `.gitignore`: Specifies files/folders to ignore in version control (e.g., `node_modules`, `.env`).

### `/src` Directory

- `/config`: Configuration files.
  - `db.js`: Handles MongoDB connection using Mongoose.
- `/models`: Mongoose schemas (data models) for MongoDB collections.
  - `userModel.js`: Defines schema for users (role, name, email, password).
  - `categoryModel.js`: Defines schema for product categories (name, description).
  - `productModel.js`: Defines schema for products (name, description, price, category, stock, images).
  - `cartModel.js`: Defines schema for user carts (user, products, quantities).
  - `orderModel.js`: Defines schema for orders (user, products, status, total).
- `/controllers`: Business logic for handling requests.
  - `authController.js`: Handles authentication (register, login, logout).
  - `userController.js`: Manages user-related operations (update profile, get user details).
  - `categoryController.js`: Manages categories (create, update, delete, list).
  - `productController.js`: Manages products (create, update, delete, list, filter by category).
  - `cartController.js`: Manages cart operations (add to cart, remove, update quantities).
  - `orderController.js`: Manages orders (place order, update status, view order history).
- `/routes`: Express routes mapping to controllers.
  - `authRoutes.js`: Routes for authentication (e.g., `/api/auth/register`, `/api/auth/login`).
  - `userRoutes.js`: Routes for user operations (e.g., `/api/users/profile`).
  - `categoryRoutes.js`: Routes for categories (e.g., `/api/categories`).
  - `productRoutes.js`: Routes for products (e.g., `/api/products`).
  - `cartRoutes.js`: Routes for cart (e.g., `/api/cart`).
  - `orderRoutes.js`: Routes for orders (e.g., `/api/orders`).
- `/middleware`: Custom middleware for authentication, authorization, and error handling.
  - `authMiddleware.js`: Verifies JWT tokens and checks user roles (user/admin).
  - `errorMiddleware.js`: Handles errors globally (e.g., 404, 500).
- `/utils`: Utility functions and helpers.
  - `errorHandler.js`: Custom error handling logic.
  - `asyncHandler.js`: Wraps async controller functions to catch errors.
- `/constants`: Constant values used across the app.
  - `roles.js`: Defines user roles (e.g., `USER`, `ADMIN`).
  - `orderStatus.js`: Defines order statuses (e.g., `PENDING`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`).

---

## Detailed Explanation of Each Component (MVC Pattern)

### 1. **Authentication (Auth)** ✅

Handles user registration, login, and logout. Ensures secure access to the platform.

- **Model (**`userModel.js`**)**:

  - **Purpose**: Defines the schema for the `users` collection in MongoDB.
  - **Fields**:
    - `name`: String, required (user’s full name).✅
    - `email`: String, required, unique (user’s email for login).✅
    - `password`: String, required (hashed password using bcrypt).✅
    - `role`: String, enum (`USER`, `ADMIN`), default `USER`(defines user type).✅
    - `createdAt`: Date, default current timestamp (tracks user creation).✅
  - **Additional Logic**:
    - Use bcrypt to hash passwords before saving.
    - Add methods to compare passwords during login.

- **Controller (**`authController.js`**)**:✅

  - **Register**:
    - Validate input (name, email, password).
    - Check if email already exists.
    - Hash password using bcrypt.
    - Create a new user in the `users` collection.
    - Generate a JWT token and return it.
  - **Login**:
    - Validate email and password.
    - Check if user exists.
    - Compare provided password with hashed password.
    - Generate and return a JWT token if valid.
  - **Logout**:
    - Invalidate or clear the JWT token (client-side or server-side token blacklist).

- **Routes (**`authRoutes.js`**)**:

  - `POST /api/auth/register`: Register a new user.✅
  - `POST /api/auth/login`: Login an existing user.✅
  - `POST /api/auth/logout`: Logout the user (optional, depends on implementation).
  - **Middleware**:
    - Use `authMiddleware.js` to protect routes where needed.✅
    - Apply input validation middleware (e.g., using `express-validator`).

### 2. **User Management**❌❌❌

Manages user profiles and roles (admin or customer).

- **Model (**`userModel.js`**)**:

  - Reuses the same schema as authentication.
  - Additional fields (optional):
    - `address`: Object (street, city, state, zip, country) for delivery.
    - `phone`: String (contact number).

- **Controller (**`userController.js`**)**:

- **Get Profile**:

- Fetch user details by ID (from JWT token).

## Return name, email, role, address, etc.

- **Update Profile**:

  - Allow users to update name, email, password, or address.
  - Validate input and ensure email uniqueness.

- **Admin: Get All Users**:

  - Allow admins to fetch a list of all users.

- **Admin: Update User Role**:

  - Allow admins to change a user’s role (e.g., promote to admin).

- **Routes (**`userRoutes.js`**)**:

  - `GET /api/users/profile`: Get logged-in user’s profile.
  - `PUT /api/users/profile`: Update logged-in user’s profile.
  - `GET /api/users`: Admin-only route to list all users.
  - `PUT /api/users/:id/role`: Admin-only route to update a user’s role.
  - **Middleware**:
    - `authMiddleware.js`: Ensure user is authenticated.
    - `roleMiddleware.js`: Restrict admin-only routes to `ADMIN` role.
❌❌❌

### 3. **Category Management**

Allows admins to create and manage product categories (e.g., Electronics, Clothing).

- **Model (**`categoryModel.js`**)**: ✅

  - **Fields**:
    - `name`: String, required, unique (e.g., “Electronics”).✅
    - `description`: String, optional (category details). 
    - `createdAt`: Date, default current timestamp. ✅
  - **Additional Logic**:
    - Ensure category names are unique. ✅

- **Controller (**`categoryController.js`**)**:✅

- **Create Category**:

  - Validate input (name, description). 
  - Check if category name already exists.✅
  - Save new category to `categories` collection. ✅

- **Update Category**:✅

# Allow admins to update name or description.

1. Validate updated name for uniqueness.

- **Delete Category**:✅

  - Allow admins to delete a category.
  - Check if category is linked to products (prevent deletion if linked).

- **List Categories**:✅

  - Fetch all categories for display (used by admins and users).✅

- **Routes (**`categoryRoutes.js`**)**:

  - `POST /api/categories`: Create a new category (admin-only).✅
  - `PUT /api/categories/:id`: Update a category (admin-only).✅
  - `DELETE /api/categories/:id`: Delete a category (admin-only).✅
  - `GET /api/categories`: List all categories (public).✅
  - **Middleware**:✅
    - `authMiddleware.js`: Ensure user is authenticated.:  foes not need
    - `roleMiddleware.js`: Restrict create/update/delete to `ADMIN` role.✅

### 4. **Product Management**

Allows admins to manage products and users to browse them.

- **Model (**`productModel.js`**)**:

  - **Fields**:
    - `name`: String, required (e.g., “Smartphone”).
    - `description`: String, required (product details).
    - `price`: Number, required (product price).
    - `category`: ObjectId, ref to `Category` (links to category).
    - `stock`: Number, required (available quantity).
    - `images`: Array of Strings (URLs to product images).
    - `createdAt`: Date, default current timestamp.
  - **Additional Logic**:
    - Validate stock (non-negative).
    - Ensure category exists before saving.

- **Controller (**`productController.js`**)**:

  - **Create Product**:
    - Validate input (name, description, price, category, stock, images).
    - Check if category exists.
    - Save new product to `products` collection.
  - **Update Product**:
    - Allow admins to update product details.
    - Validate updated category and stock.
  - **Delete Product**:
    - Allow admins to delete a product.
  - **List Products**:
    - Fetch all products or filter by category.
    - Support pagination and sorting (e.g., by price).
  - **Get Product Details**:
    - Fetch details of a single product by ID.

- **Routes (**`productRoutes.js`**)**:

  - `POST /api/products`: Create a new product (admin-only).
  - `PUT /api/products/:id`: Update a product (admin-only).
  - `DELETE /api/products/:id`: Delete a product (admin-only).
  - `GET /api/products`: List all products (public).
  - `GET /api/products/:id`: Get product details (public).
  - `GET /api/products/category/:categoryId`: List products by category (public).
  - **Middleware**:
    - `authMiddleware.js`: Ensure user is authenticated.
    - `roleMiddleware.js`: Restrict create/update/delete to `ADMIN` role.

### 5. **Cart Management**

Allows users to add products to their cart and manage quantities.

- **Model (**`cartModel.js`**)**:

  - **Fields**:
    - `user`: ObjectId, ref to `User` (links to user).
    - `items`: Array of Objects:
      - `product`: ObjectId, ref to `Product` (product in cart).
      - `quantity`: Number, required (quantity of product).
    - `updatedAt`: Date, default current timestamp.
  - **Additional Logic**:
    - Ensure product exists and has sufficient stock.
    - Update cart when quantities change.

- **Controller (**`cartController.js`**)**:

  - **Add to Cart**:
    - Validate product ID and quantity.
    - Check if product exists and has stock.
    - Add or update product in user’s cart.
  - **Remove from Cart**:
    - Remove a product from the user’s cart.
  - **Update Cart**:
    - Update quantities of products in the cart.
    - Validate stock availability.
  - **Get Cart**:
    - Fetch user’s cart with product details.

- **Routes (**`cartRoutes.js`**)**:

  - `POST /api/cart`: Add product to cart.
  - `DELETE /api/cart/:productId`: Remove product from cart.
  - `PUT /api/cart`: Update cart quantities.
  - `GET /api/cart`: Get user’s cart.
  - **Middleware**:
    - `authMiddleware.js`: Ensure user is authenticated.

### 6. **Order Management**

Handles order placement and status tracking (Pending, Out for Delivery, Delivered, Cancelled).

- **Model (**`orderModel.js`**)**:

  - **Fields**:
    - `user`: ObjectId, ref to `User` (links to user).
    - `items`: Array of Objects:
      - `product`: ObjectId, ref to `Product`.
      - `quantity`: Number, required.
    - `total`: Number, required (total order amount).
    - `status`: String, enum (`PENDING`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`), default `PENDING`.
    - `address`: Object (delivery address: street, city, state, zip, country).
    - `createdAt`: Date, default current timestamp.
  - **Additional Logic**:
    - Calculate total based on product prices and quantities.
    - Update product stock when order is placed.

- **Controller (**`orderController.js`**)**:

  - **Place Order**:
    - Validate cart items and address.
    - Calculate total amount.
    - Reduce product stock.
    - Create order in `orders` collection.
    - Clear user’s cart.
  - **Update Order Status**:
    - Allow admins to update status (e.g., `OUT_FOR_DELIVERY` to `DELIVERED`).
    - Notify user (optional, via email or frontend).
  - **Cancel Order**:
    - Allow users to cancel `PENDING` orders.
    - Restore product stock.
  - **Get Order History**:
    - Fetch user’s order history.
  - **Admin: Get All Orders**:
    - Allow admins to view all orders with filtering (e.g., by status).

- **Routes (**`orderRoutes.js`**)**:

  - `POST /api/orders`: Place a new order.
  - `PUT /api/orders/:id/status`: Update order status (admin-only).
  - `PUT /api/orders/:id/cancel`: Cancel an order.
  - `GET /api/orders`: Get user’s order history.
  - `GET /api/orders/all`: Get all orders (admin-only).
  - **Middleware**:
    - `authMiddleware.js`: Ensure user is authenticated.
    - `roleMiddleware.js`: Restrict status updates and all-orders view to `ADMIN` role.

---

## Additional Considerations

- **Multiple Categories**:
  - Categories are listed first (via `GET /api/categories`) for admins to select when creating products.
  - Products can belong to one category (or multiple, if you extend the schema to support an array of `category` ObjectIds).
- **Order Status Workflow**:
  - `PENDING`: Order placed, awaiting confirmation.
  - `OUT_FOR_DELIVERY`: Order shipped.
  - `DELIVERED`: Order received by customer.
  - `CANCELLED`: Order cancelled by user or admin.
- **Security**:
  - Use JWT for authentication.
  - Hash passwords with bcrypt.
  - Sanitize inputs to prevent injection attacks.
  - Use HTTPS for API requests.
- **Scalability**:
  - Use MongoDB indexes for frequently queried fields (e.g., product category, user email).
  - Implement pagination for product and order lists.
- **Error Handling**:
  - Centralized error handling in `errorMiddleware.js`.
  - Return meaningful error messages (e.g., “Product out of stock”).
- **Logging**:
  - Log critical actions (e.g., order placement, stock updates) for debugging.
import jwt from "jsonwebtoken";

// Middleware: Authenticate user via JWT
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new Error("No token provided");
      err.statusCode = 401;
      throw err;
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
      const err = new Error("Invalid token format");
      err.statusCode = 401;
      throw err;
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);

    // Attach user info to req.user for downstream access
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "user", // optional: include role in token
    };

    next();
  } catch (err) {
    err.statusCode = err.statusCode || 401;
    next(err); // send to centralized error handler
  }
}

// Middleware: Admin only routes
function isAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  const err = new Error("Admin access required");
  err.statusCode = 403;
  next(err);
}

// Middleware: User can access their own data or admins can
function authorizeUserOrAdmin(req, res, next) {
  if (req.user.id === req.params.userId || req.user.role === "admin") {
    return next();
  }
  const err = new Error("Forbidden");
  err.statusCode = 403;
  next(err);
}

export { authMiddleware, authorizeUserOrAdmin, isAdmin };

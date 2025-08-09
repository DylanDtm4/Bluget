import jwt from "jsonwebtoken";

// Middleware: Authenticate userId
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // store user id in req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Middleware: Simple admin check placeholder
function isAdmin(req, res, next) {
  // Replace with real auth and role check in production
  if (req.query.admin === "true") {
    next();
  } else {
    res.status(403).json({ error: "Admin access required" });
  }
}

// Middleware example to check if user owns the account or is admin
function authorizeUserOrAdmin(req, res, next) {
  if (req.user.id === req.params.userId || req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Forbidden" });
}

export { authMiddleware, authorizeUserOrAdmin, isAdmin };

const roleAuthorization = (...allowedRoles) => {
  // Flatten in case nested arrays come in
  allowedRoles = allowedRoles.flat();

  return (req, res, next) => {
    const userRoles = Array.isArray(req.user.userRole)
      ? req.user.userRole
      : [req.user.userRole];

    // Check if ANY of the user's roles exist in allowed roles
    const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default roleAuthorization;

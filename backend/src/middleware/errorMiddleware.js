export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
}

//Error handler return api error responses
export function errorHandler(err, req, res, next) {
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const value = err.keyValue?.[field];
    return res.status(400).json({
      message: `${field} already in use${value ? `: ${value}` : ""}`
    });
  }
  const statusCode = err?.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  return res.status(statusCode).json({
    message: err?.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? undefined : err?.stack
  });
}

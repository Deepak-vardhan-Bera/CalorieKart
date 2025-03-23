export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set proper status code
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  };
  
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    // If not an ApiError, convert it to one
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error.status || 500;
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, [], error.stack);
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    // Log error
    console.error(`Error ${error.statusCode}: ${error.message}`);
    
    return res.status(error.statusCode).json(response);
};

export { errorHandler };


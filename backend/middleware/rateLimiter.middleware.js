// Simple in-memory rate limiter (for production, use Redis)
const rateLimitStore = new Map();

export const rateLimiter = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
    return (req, res, next) => {
        const clientId = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        
        // Clean old entries periodically
        if (rateLimitStore.size > 10000) {
            for (const [key, value] of rateLimitStore.entries()) {
                if (now - value.resetTime > windowMs) {
                    rateLimitStore.delete(key);
                }
            }
        }

        const clientData = rateLimitStore.get(clientId);

        if (!clientData || now - clientData.resetTime > windowMs) {
            // New window
            rateLimitStore.set(clientId, {
                count: 1,
                resetTime: now
            });
            return next();
        }

        if (clientData.count >= maxRequests) {
            return res.status(429).json({
                success: false,
                message: "Too many requests, please try again later",
                retryAfter: Math.ceil((windowMs - (now - clientData.resetTime)) / 1000)
            });
        }

        clientData.count++;
        next();
    };
};

// Stricter rate limiter for auth routes
export const authRateLimiter = rateLimiter(15 * 60 * 1000, 5); // 5 requests per 15 minutes


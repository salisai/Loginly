//handle errors, to avoid repitition
const asyncHandler = (requestHandler) => {
    if (typeof requestHandler !== "function"){
        throw new Error("asyncHandler expects a function");
    }
    
    return (req, res, next) => {
        requestHandler(req, res, next)
        .catch((err) => next(err))
    }
}

export {asyncHandler};
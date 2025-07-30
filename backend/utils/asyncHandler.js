//handle errors, to avoid repitition
const asyndHandler = (requestHandler) => {
    if (typeof requestHandler !== "function"){
        throw new Error("asyncHandler expects a function");
    }
    
    return (req, res, next) => {
        requestHandler(req, res, next)
        .catch((err) => next(err))
    }
}

export {asyndHandler};
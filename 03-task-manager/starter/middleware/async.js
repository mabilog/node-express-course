const asyncWrapper = (fn) => {
  return async(req, res, next) =>{
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error) // passes next set of middleware 
    }
  }
}

module.exports = asyncWrapper
module.exports = (req, res, next) => {
 const params = req.query || req.body;
 console.log(`${req.method} ${req.path} params:${JSON.stringify(params)}`);
 return next();
};
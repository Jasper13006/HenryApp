const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  if(!token) return res.status(401).json({error: 'Unauthorized'})
  try {
    const verified = jwt.verify(token, process.env.SECRET)
    req.user = verified
    next()
  } catch (err) {
    console.log(err)
  }
}
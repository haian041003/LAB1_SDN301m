var jwt = require('jsonwebtoken');

const accessRoutesMiddleware = (req, res, next) => {
  // get token from header
  const token = req.header('Authorization')?.split(' ')[1] ?? req.cookies['x-auth-token'];
  if (!token) {
    res.redirect('/dashboard/login');
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.clearCookie('x-auth-token');
    res.redirect('/dashboard/login');
  }
};
module.exports = accessRoutesMiddleware;

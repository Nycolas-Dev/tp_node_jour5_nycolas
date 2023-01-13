export default (req, res, next) => {
    if (req.session.auth) {
        res.redirect('/dashboard');
    }
    else return next();
  };
  
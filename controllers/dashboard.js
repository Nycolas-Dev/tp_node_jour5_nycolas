export default (req, res) => {
  res.render("dashboard.pug", { message: req.session.message});
};

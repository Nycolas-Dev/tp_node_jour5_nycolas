export default function home(req, res) {
  res.render("home.pug", { message: req.session.message});
}

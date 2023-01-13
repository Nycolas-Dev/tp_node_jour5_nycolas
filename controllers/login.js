export default (req, res) => {
    res.render("login.pug", { message: req.session.message});
};
 
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post("/authenticate",function(req, res, next){
	var email = req.body.email;
	var pass = req.body.password;
	if ( email == "jaimeirazabal1@gmail.com" && pass == "16923509j") {
		req.session.user = {email : email, password : pass};
		res.redirect("/users/dashboard");
	}else{
		res.redirect("/index");
	}
})

router.get("/dashboard",function(req, res, next){
	if (typeof req.session != "undefined") {
		res.render("users/dashboard",{title:"Dashboard",connected:req.session.user});
	}else{
		res.redirect("/index");
	}
})

module.exports = router;

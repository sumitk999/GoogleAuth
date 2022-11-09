const router = require('express').Router()
const passport = require('passport')


router.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/', function (req, res) {
    res.render('pages/auth');
})
router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
  // Successful authentication, redirect success.
  res.redirect('/success');
});

router.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      req.user = null;
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });
  router.get('/success', (req, res) => res.render('pages/success',{user:userProfile}));
  router.get('/error', (req, res) => res.send("error logging in"));


module.exports = router
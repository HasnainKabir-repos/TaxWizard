const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../server/models/User.model');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async (Email, Password, done) => {
    try {
        const user = await User.findOne({ Email });
  
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
  
        const passwordMatch = await bcrypt.compare(Password, user.Password);
  
        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const express = require('express');
const session = require('express-session');
const path = require('path');
const auth = require('./google_auth');

const app = express();
const PORT = 3000;

app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'crazy cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true},
}));

app.get('/',(req, res) => {
  res.render("index.ejs", {});
  console.log(req.session);
});


app.get('/auth/', async (req, res) => {

  let tokens;
  if (req.param('code')) {
    tokens = await auth.getToken(req.param('code'));
    auth.storeToken(tokens);
  }
  else {
    tokens = auth.getStoredToken();
  }

  if (tokens) {
    req.session.authClient = auth.getAuthClient(tokens);    
    res.redirect('/');
  }
  else {
    const redirectUri = await auth.getRedirectUri();
    res.redirect(redirectUri);
  }

});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

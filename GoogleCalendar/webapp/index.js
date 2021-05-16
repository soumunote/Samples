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
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 30,
  },
}));

app.get('/', async (req, res) => {
  let list = null;
  if (req.session.tokens) {
    const authClient = auth.getAuthClient(req.session.tokens);
    list = await auth.listEvents(authClient);
  }
  console.log(session.authClient);
  res.render("index.ejs", {
    list: list
  });
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
    req.session.tokens = tokens;    
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

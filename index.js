
const express = require('express');
const Instagram = require('node-instagram').default;
// Create a new instance.
const instagram = new Instagram({
  clientId: '4a2da506da6a47b0a49b2e2e2d4d7ec6',
  clientSecret: '4ffcfd8b40c44870b7c82cbddebcd67f',
});

const redirectUri = 'http://localhost:3000/auth/instagram/callback';

// create express server
const app = express();

app.use('/', express.static(__dirname + '/public'));

// Redirect user to instagram oauth
app.get('/auth/instagram', (req, res) => {
  res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ['basic'] }));
});

// Handle auth code and get access_token for user
app.get('/auth/instagram/callback', async (req, res) => {
  try {
    const data = await instagram.authorizeUser(req.query.code, redirectUri);
    // access_token in data.access_token
        console.log(data)
        // res.json(data);
        const accessToken = data.access_token
        res.cookie('insta_id_token' , accessToken)
        res.redirect('/')
  } catch (err) {
    console.log(err)
    // res.json(err);
  } 
    
  
});

// listen to port 3000
app.listen(3000, () => {
  console.log('app listening on http://localhost:3000');
});

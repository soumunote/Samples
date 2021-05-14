const fs = require('fs');
const path = require('path');
const readline = require('readline');
const util = require('util');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/**
 * client_id, client_secret　等をローカルファイル(credentials.json)から取得する
 * credentials.json は事前に Cloud Console からダウンロードしておく
 * @return {string} credentials object
 */
function getCredentials()
{
  const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
  try {
    return JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      console.err(`credential(${CREDENTIALS_PATH}) not found.`);
    }
    throw err;
  }
}

/**
 * アクセストークンを取得する。
 * @param {google.auth.OAuth2} oAuth2Client (client_id, client_secret, redirect_uris)
 */
async function getAccessToken(oAuth2Client) {
  const TOKEN_PATH = path.join(__dirname, 'token.json');
  let token;
  if (fs.existsSync(TOKEN_PATH)) {
    token = fs.readFileSync(TOKEN_PATH);
  }
  else {
    token = await downloadAccessToken(oAuth2Client);
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  }
  oAuth2Client.setCredentials(JSON.parse(token));
}

async function downloadAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline'/*=サーバサイド向け, online=クライアント向け*/,
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = util.promisify(rl.question).bind(rl);
  //const question = util.promisify(rl.question);
  const code = await question('Enter the code from that page here: ');
  const r = await oAuth2Client.getToken(code);
  return r.tokens;
}

/**
 * 与えられた credentials から OAuth2 Client を作成する
 * @param {Object} credentials
 * @return {string} 
 */
async function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  await getAccessToken(oAuth2Client);
  return oAuth2Client;
}

function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length > 0) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    }
    else {
      console.log('No upcoming events found.');
    }
  });
}

async function main() {
  const credentials = getCredentials();
  const accessToken = await authorize(credentials);
  listEvents(accessToken);  
}

main();

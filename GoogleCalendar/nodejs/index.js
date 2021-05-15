/**
 * Google Calendar アクセスサンプルアプリケーション
 *   - Original: https://developers.google.com/calendar/quickstart/nodejs  
 *     詳細を理解する為に、若干アレンジ(エラー処理省略、非同期ルーチンを同期に変更)
 *   - 事前準備
 *     Cloud Console から [OAuth2クライアントID]をダウンロードし、
 *     credentials.json として保存 
 *   - token.json 無い場合認可画面を表示してアクセストークンを取得後保存する
 *                ある場合、そのまま利用する
 *   - google.auth 関連のソース
 *     https://github.com/googleapis/google-auth-library-nodejs/tree/master/src/auth
 */
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
 * 認可画面を表示して認可コードを取得、(レスポンスに含まれる認可コードをマニュアル操作で受け取り)
 * アクセストークンを取得する
 * @param {google.auth.OAuth2} oAuth2Client 
 * @returns {google.auth.Credentials} アクセストークン
 */
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
  const {tokens} = await oAuth2Client.getToken(code);
  return tokens;
}

/**
 * アクセストークンを取得する
 *   保存済みのアクセストークンが
 *     ある場合、それを返す
 *     ない場合、一連の手順を実行して、それを返す(保存もする)
 * @param {google.auth.OAuth2} oAuth2Client 
 * @returns {google.auth.Credentials} アクセストークン
 */
async function getAndSaveAccessToken(oAuth2Client) {
  const TOKEN_PATH = path.join(__dirname, 'token.json');
  let token;
  if (fs.existsSync(TOKEN_PATH)) {
    token = JSON.parse(fs.readFileSync(TOKEN_PATH));
  }
  else {
    token = await downloadAccessToken(oAuth2Client);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  }
  return token;
}

/**
 * 与えられた credentials から OAuth2 Client を作成する
 * @param {Object} credentials
 * @return {google.auth.OAuth2} 
 */
async function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = await getAndSaveAccessToken(oAuth2Client);
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

/**
 * Google Calendar のイベントを一覧する
 * @param {google.auth.OAuth2} auth 
 */
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

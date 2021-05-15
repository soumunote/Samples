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
 
exports.getRedirectUri = async function() {
  const credentials = getCredentials();
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
  const redirect_uri = oAuth2Client.generateAuthUrl({
    access_type: 'offline'/*=サーバサイド向け, online=クライアント向け*/,
    scope: SCOPES,
  });
  return redirect_uri;
}

exports.storeToken = function(tokens) {
  const TOKEN_PATH = path.join(__dirname, 'token.json');
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
}

exports.getStoredToken = function() {
  const TOKEN_PATH = path.join(__dirname, 'token.json');
  let tokens = null;
  if (fs.existsSync(TOKEN_PATH)) {
    tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
  }
  return tokens;
}

exports.getAuthClient = function(tokens) {
  const credentials = getCredentials();
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

exports.getToken = async function(code) {
  const credentials = getCredentials();
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
  try {
    const r = await oAuth2Client.getToken(code);
    return r.tokens;  
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}
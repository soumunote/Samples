const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// token.json ファイルは、ユーザのアクセストークン及びリフレッシュトークンを保存する
// 最初に認証にが成功した際に自動的に作成される。
const TOKEN_PATH = 'token.json';

// client secrets をローカルファイル(credentials.json)から取得する
fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
  if (err) {
    console.log("Error loading slient secret file:", err);
  }
  const accessToken = authorize(JSON.parse(content));
});

/**
 * 与えられた credentials から OAuth2 Client を作成する
 * @param {Object} credentials 
 */
function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  // token.json が作成されているかを確認
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }

  });
}

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline'/*=サーバサイド向け, online=クライアント向け*/,
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      return console.err("Error retrieving access token", err);
    }
    oAuth2Client.setCredentials(token);
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
      if (err) {
        return console.error(err);
      }
    });
  });
}
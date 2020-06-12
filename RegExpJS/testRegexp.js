let targets = [
  "【お客様】ArcserveUnifiedDataProtectionアラート-マージジョブステータス:完了(vmName:RSSV、nodeName:rssv)",
  "【お客様】ArcserveUnifiedDataProtectionアラート-マージジョブステータス:スキップ(BKSV01)",
  "【ユーザさま】ArcserveUnifiedDataProtectionアラート-マージジョブステータス:完了(BKSV01)",
  "【ユーザさま】ArcserveUnifiedDataProtectionアラート-VMバックアップ-増分バックアップジョブステータス:完了(vmName:vMA01、nodeName:vma01)",
  "【ユーザさま:福岡支店】ArcserveUDP-復旧ポイントのコピージョブステータス:完了(vmName:vMA02、nodeName:vma02)",
  "【ユーザさま:福岡支店】ArcserveUDP-レプリケーション(アウト)ジョブステータス:完了(FU-BKSV01)",
  "【ユーザさま】ArcserveUnifiedDataProtectionアラート-レプリケーション(イン)ジョブステータス:完了(FU-BKSV01)",
];

const BLACK   = '\u001b[30m';
const RED     = '\u001b[31m';
const GREEN   = '\u001b[32m';
const YELLOW  = '\u001b[33m';
const BLUE    = '\u001b[34m';
const MAGENTA = '\u001b[35m';
const CYAN    = '\u001b[36m';
const WHITE   = '\u001b[37m';
const RESET   = '\u001b[0m';

const re = /【(?<tokuiName>.+?)(:(?<siteName>.+?))?】(ArcserveUnifiedDataProtectionアラート-|ArcserveUDP)(?<methodName>.+?)ステータス:(?<statusName>.+?)\((vmName:|)(?<targetName>.+?)(、.+|)\)+$/;

targets.forEach(str => {
  let result = str.match(re);
  console.log(GREEN + str + RESET);
  if (result) {
    console.log(`     tokuiName  = ${result.groups['tokuiName']}`);
    console.log(`     siteName   = ${result.groups['siteName']}`);
    console.log(`     methodName = ${result.groups['methodName']}`);
    console.log(`     statusName = ${result.groups['statusName']}`);
    console.log(`     targetName = ${result.groups['targetName']}`);
  }
  else {
    console.log(RED + '     Not Match!' + RESET);
  }
});

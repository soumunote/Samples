const crypto = require("crypto");

const key = new Buffer.from("abcdefghijklmnopqrstuvwxwzABCDEF", 'utf8');
const iv = new Buffer.from("1234567890abcdef", "utf8");
const value = new Buffer.from("abcdefghijklmnop", "utf8");

const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
cipher.setAutoPadding(false);
const encoded = cipher.update(value, "utf8", "hex")
              + cipher.final("hex");
console.log(`ENCODED:[${encoded}]`);

const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
decipher.setAutoPadding(false);
const decoded = decipher.update(encoded, 'hex', 'utf8')
              + decipher.final("utf8");
console.log(`DECODED:[${decoded}]`);

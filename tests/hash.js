const bcrypt = require("bcryptjs");
const passwords = process.argv.slice(2);
const hashes = [];
passwords.map(pw => {
    hashes.push({ "pw": pw, "hash": bcrypt.hashSync(pw, 10) });
})
console.log(hashes);

// Runs automatically on Vercel at deploy time.
// Finds every image in the project and saves the list to images.json
const fs = require("fs");
const imgs = fs.readdirSync(".").filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
fs.writeFileSync("images.json", JSON.stringify(imgs));
console.log("Found " + imgs.length + " images");

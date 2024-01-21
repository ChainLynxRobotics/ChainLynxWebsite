/** @type {import('next').NextConfig} */

const fs = require("fs");
const yaml = require("yaml");

module.exports = {
    async redirects() {

        const configText = fs.readFileSync("./config/redirects.yml", "utf8");
        const config = yaml.parse(configText);

        return config.redirects.map((redirect) => {
            return {
                source: redirect.source,
                destination: redirect.destination,
                permanent: true,
            }
        });
    }
}

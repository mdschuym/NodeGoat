const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require("needle");
const {
    environmentalScripts
} = require("../../config/config");

function buildValidatedUrl(baseUrl, symbol) {
    try {
        // Minimal path validation
        if (baseUrl.includes('/../') || /\/%2e%2e\//i.test(baseUrl)) {
            throw new Error('Invalid path');
        }
        
        const url = new URL(baseUrl);
        
        // Protocol + host checks
        const allowedDomains = ['example.com']; // add your allowed domains here
        if (!allowedDomains.includes(url.hostname)) {
            throw new Error('Invalid host');
        }
        if (!['http:', 'https:'].includes(url.protocol)) {
            throw new Error('Invalid protocol');
        }
        
        // Validate path parameters
        if (!/^[A-Za-z0-9_-]+$/.test(symbol)) {
            throw new Error('Invalid parameter');
        }
        
        // Append symbol as path segment
        url.pathname = url.pathname + symbol;
        
        return url.href;
    } catch {
        throw new Error('Invalid URL');
    }
}

function ResearchHandler(db) {
    "use strict";

    const researchDAO = new ResearchDAO(db);

    this.displayResearch = (req, res) => {

        if (req.query.symbol) {
            const url = buildValidatedUrl(req.query.url, req.query.symbol);
            return needle.get(url, (error, newResponse, body) => {
                if (!error && newResponse.statusCode === 200) {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                }
                res.write("<h1>The following is the stock information you requested.</h1>\n\n");
                res.write("\n\n");
                if (body) {
                    res.write(body);
                }
                return res.end();
            });
        }

        return res.render("research", {
            environmentalScripts
        });
    };

}

module.exports = ResearchHandler;

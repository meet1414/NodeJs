const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '';

    switch (req.url) {
        case '/':
            filePath = 'index.html';
            break;
        case '/about':
            filePath = 'about.html';
            break;
        case '/services':
            filePath = 'services.html';
            break;
        case '/projects':
            filePath = 'projects.html';
            break;
        case '/blog':
            filePath = 'blog.html';
            break;
        // case '/career':
        //     filePath = 'carrer.html';
        //     break;
        default:
            if (req.url.startsWith('/public/')) {
                filePath = req.url.substring(1);
            } else {
                filePath = null;
            }
    }

    if (filePath) {
        const fullPath = path.join(__dirname, filePath);
        const extname = path.extname(fullPath);
        let contentType = 'text/html';

        switch (extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
            case '.ttf':
                contentType = 'font/ttf';
                break;
            // case '.woff':
            //     contentType = 'font/woff';
            //     break;
            // case '.woff2':
            //     contentType = 'font/woff2';
            //     break;
            // case '.otf':
            //     contentType = 'font/otf';
            //     break;
        }

        // Server file
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested page was not found.</p>');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

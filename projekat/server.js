const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Check if the requested URL is for the main page
    if (req.url === '/' || req.url === '/1.html') {
        // Read the index.html file
        fs.readFile(path.join(__dirname, '1.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
            } else {
                // Set the content type and send the HTML content
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else {
        // Handle other requests (e.g., CSS and JS files)
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('File Not Found');
            } else {
                // Determine the content type based on the file extension
                let contentType = 'text/html';
                if (filePath.endsWith('.css')) {
                    contentType = 'text/css';
                } else if (filePath.endsWith('.js')) {
                    contentType = 'text/javascript';
                }

                // Set the content type and send the file content
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

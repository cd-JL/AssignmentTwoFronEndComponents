const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Get the requested URL and map it to a file path
  let filePath = '.' + req.url;

  // If the request is for the root, serve an index.html file
  if (filePath === './') {
    filePath = './index.html';
  }

  // Determine the content type based on the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    // Add more content types as needed
  }[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found, return a 404 response
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
      } else {
        // Server error, return a 500 response
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('500 Internal Server Error');
      }
    } else {
      // Serve the file with the appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

// @ts-check
import http from 'http';
import fs from 'fs';
import path from 'path';
http
  .createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });

      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      const analyzeDir = path.join(import.meta.dirname, '.next', 'analyze');
      fs.readdir(analyzeDir, (err, files) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error reading directory');
          return;
        }
        const links = files
          .filter(file => file.endsWith('.html'))
          .map(file => `<li><a href="${file}">${file}</a></li>`)
          .join('');
        res.end(`<ul>${links}</ul>`);
      });
    }
    const filePath = path.join(
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      import.meta.dirname,
      '..',
      '.next',
      'analyze',
      `${req.url?.replaceAll('.html', '')}.html`
    );
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  })
  .listen(3001, () => {
    console.log(
      '\x1b[42mBundle analyzer running at http://localhost:3001/\x1b[0m'
    );
  });

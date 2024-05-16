// app.js

const http = require('http');
const fs = require('fs');
const os = require('os');
const zlib = require('zlib');


const server = http.createServer((req, res) => {
    const { url } = req;
    const timestamp = new Date().getTime();
    const user = 'Гогіна Тетяна Олександрівна';
    

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(`<h1>Сервер на Node.js ${user}</h1>`);
    } else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(`
            <h1>Про нас</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        `);
    } else if (url === '/getdata') {
        const data = JSON.stringify({ date: timestamp, user });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    } else if (url === '/myfile') {
        const filePath = __dirname + '/data/file1.txt';
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    } else if (url === '/mydownload') {
        const filePath = __dirname + '/data/file2.txt';
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="file2.txt"');
        fileStream.pipe(res);
    } else if (url === '/myarchive') {
        const filePath = __dirname + '/data/file1.txt';
        const archiveName = 'file1.txt.gz';
        const gzip = zlib.createGzip();
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'application/gzip');
        res.setHeader('Content-Disposition', `attachment; filename="${archiveName}"`);
        fileStream.pipe(gzip).pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('<h1>404 Not Found</h1>');
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

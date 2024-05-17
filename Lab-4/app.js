// app.js

const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const app = express();
const PORT = 3000;

const user = 'Гогіна Тетяна Олександрівна';

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Сервер на Express.js ${user}</h1>`);
});

app.get('/about', (req, res) => {
    res.status(200).send(`
        <h1>Про нас</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    `);
});

app.get('/getdata', (req, res) => {
    const timestamp = new Date().getTime();
    const data = { date: timestamp, user };
    res.status(200).json(data);
});

app.get('/myfile', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'file1.txt');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.status(200).type('text/plain').send(data);
        }
    });
});

app.get('/mydownload', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'file2.txt');
    res.setHeader('Content-Disposition', 'attachment; filename="file2.txt"');
    res.type('text/plain');
    res.sendFile(filePath);
});

app.get('/myarchive', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'file1.txt');
    const archiveName = 'file1.txt.gz';
    const gzip = zlib.createGzip();
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', `attachment; filename="${archiveName}"`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(gzip).pipe(res);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


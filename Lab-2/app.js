// app.js

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function CreateFileFunc() {
    const fileName = 'fresh.txt';
    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, fileName);
    const fileContent = 'Свіжий і бадьорий';

    // Перевірка чи існує файл
    if (fs.existsSync(filePath)) {
        console.log('CREATE operation failed: File already exists');
        return;
    }

    // Створення файлу та запис вмісту
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('CREATE operation failed:', err);
        } else {
            console.log('File created successfully:', fileName);
        }
    });
}
function copyFilesFunc() {
    const sourcePath = path.join(__dirname, 'files');
    const destinationPath = path.join(__dirname, 'files_copy');

    // Перевірка чи існує папка files
    if (!fs.existsSync(sourcePath)) {
        console.log("COPY operation failed: Source folder 'files' does not exist.");
        return;
    }

    // Перевірка чи існує папка files_copy
    if (fs.existsSync(destinationPath)) {
        console.log("COPY operation failed: Destination folder 'files_copy' already exists.");
        return;
    }

    // Створення папки files_copy
    fs.mkdirSync(destinationPath);

    // Копіювання файлів
    try {
        fs.readdirSync(sourcePath).forEach(file => {
            const sourceFile = path.join(sourcePath, file);
            const destinationFile = path.join(destinationPath, file);
            fs.copyFileSync(sourceFile, destinationFile);
        });
        console.log("Files copied successfully.");
    } catch (err) {
        console.error("An error occurred while copying files:", err);
    }
}
function renameFileFunc() {
    const sourceFile = path.join(__dirname, 'files', 'wrongFilename.txt');
    const destinationFile = path.join(__dirname, 'files', 'properFilename.md');

    // Перевірка чи існує файл wrongFilename.txt
    if (!fs.existsSync(sourceFile)) {
        console.log("RENAME operation failed: Source file 'wrongFilename.txt' does not exist.");
        return;
    }

    // Перевірка чи існує файл properFilename.md
    if (fs.existsSync(destinationFile)) {
        console.log("RENAME operation failed: Destination file 'properFilename.md' already exists.");
        return;
    }

    // Перейменування файлу
    try {
        fs.renameSync(sourceFile, destinationFile);
        console.log("File renamed successfully.");
    } catch (err) {
        console.error("An error occurred while renaming the file:", err);
    }
}
function deleteFileFunc() {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    // Перевірка чи існує файл fileToRemove.txt
    if (!fs.existsSync(filePath)) {
        console.log("DELETE operation failed: File 'fileToRemove.txt' does not exist.");
        return;
    }

    // Видалення файлу
    try {
        fs.unlinkSync(filePath);
        console.log("File deleted successfully.");
    } catch (err) {
        console.error("An error occurred while deleting the file:", err);
    }
}
function listFilesFunc() {
    const folderPath = path.join(__dirname, 'files');

    // Перевірка чи існує папка files
    if (!fs.existsSync(folderPath)) {
        console.log("LIST operation failed: Folder 'files' does not exist.");
        return;
    }

    // Читання вмісту папки files
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error("An error occurred while reading the folder:", err);
            return;
        }
        // Вивід імен файлів
        console.log("Files in the 'files' folder:");
        files.forEach(file => {
            console.log(file);
        });
    });
}
function readFileFunc() {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    // Перевірка чи існує файл fileToRead.txt
    if (!fs.existsSync(filePath)) {
        console.log("READ operation failed: File 'fileToRead.txt' does not exist.");
        return;
    }

    // Читання вмісту файлу fileToRead.txt
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("An error occurred while reading the file:", err);
            return;
        }
        // Вивід вмісту файлу
        console.log("Contents of 'fileToRead.txt':");
        console.log(data);
    });
}
function readStreamFunc() {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    // Перевірка чи існує файл fileToRead.txt
    if (!fs.existsSync(filePath)) {
        console.log("READ STREAM operation failed: File 'fileToRead.txt' does not exist.");
        return;
    }

    // Створення Readable Stream для читання файлу
    const readStream = fs.createReadStream(filePath, 'utf8');

    // Обробник події 'data' для виводу даних з потоку
    readStream.on('data', (chunk) => {
        console.log(chunk);
    });

    // Обробник події 'error' для обробки помилок
    readStream.on('error', (err) => {
        console.error("An error occurred while reading the stream:", err);
    });

    // Обробник події 'end' для завершення потоку
    readStream.on('end', () => {
        console.log("Stream reading complete.");
    });
}

function writeStreamFunc(dataToWrite) {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    // Перевірка чи існує файл fileToWrite.txt
    if (fs.existsSync(filePath)) {
        console.log("WRITE STREAM operation failed: File 'fileToWrite.txt' already exists.");
        return; // Додавання return для зупинки виконання функції
    }

    // Створення Writable Stream для запису в файл
    const writeStream = fs.createWriteStream(filePath);

    // Обробник події 'error' для обробки помилок
    writeStream.on('error', (err) => {
        console.error("An error occurred while writing the stream:", err);
    });

    // Обробник події 'finish' для завершення запису
    writeStream.on('finish', () => {
        console.log("Stream writing complete.");
    });

    // Запис даних у файл
    writeStream.write(dataToWrite, 'utf8');

    // Закриття потоку запису
    writeStream.end();
}

function CompressFunc() {
    const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const targetFilePath = path.join(__dirname, 'archives', 'archive.gz');

    // Перевірка наявності файлу fileToCompress.txt
    if (!fs.existsSync(sourceFilePath)) {
        console.log("COMPRESS operation failed: File 'fileToCompress.txt' does not exist.");
        return;
    }

    // Перевірка наявності архіву archive.gz
    if (fs.existsSync(targetFilePath)) {
        console.log("COMPRESS operation failed: Archive 'archive.gz' already exists.");
        return;
    }

    // Створення читаючого потоку для файлу fileToCompress.txt
    const readStream = fs.createReadStream(sourceFilePath);

    // Створення записуючого потоку для архіву archive.gz
    const writeStream = fs.createWriteStream(targetFilePath);

    // Створення потоку стиснення
    const gzip = zlib.createGzip();

    // Підключення потоків: readStream -> gzip -> writeStream
    readStream.pipe(gzip).pipe(writeStream);

    // Обробник події "finish" для повідомлення про успішне стискання
    writeStream.on('finish', () => {
        console.log("File compressed successfully.");
    });
}



// Виклик функцій
CreateFileFunc();
copyFilesFunc();
renameFileFunc();
deleteFileFunc();
listFilesFunc();
readFileFunc();
readStreamFunc();
writeStreamFunc("Це буде записано у файл");
CompressFunc();
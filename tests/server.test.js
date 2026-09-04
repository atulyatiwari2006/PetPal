const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'pages', 'Chaitanya');

test('PetPal server file exists', () => {
    assert.strictEqual(
        fs.existsSync(path.join(appDir, 'server.js')),
        true
    );
});

test('PetPal main page exists', () => {
    assert.strictEqual(
        fs.existsSync(path.join(appDir, 'index.html')),
        true
    );
});

test('PetPal main page contains correct title', () => {
    const html = fs.readFileSync(
        path.join(appDir, 'index.html'),
        'utf8'
    );

    assert.match(html, /PetPal.*Pet-Care.*Management Platform/i);
});

test('PetPal main page contains Add Pet form', () => {
    const html = fs.readFileSync(
        path.join(appDir, 'index.html'),
        'utf8'
    );

    assert.match(html, /id="petName"/);
    assert.match(html, /id="petSpecies"/);
    assert.match(html, /id="petBreed"/);
});

test('PetPal server uses port 3000 by default', () => {
    const server = fs.readFileSync(
        path.join(appDir, 'server.js'),
        'utf8'
    );

    assert.match(server, /process\.env\.PORT\s*\|\|\s*3000/);
});

test('PetPal server handles the root route', () => {
    const server = fs.readFileSync(
        path.join(appDir, 'server.js'),
        'utf8'
    );

    assert.match(server, /reqPath\s*===\s*['"]\/['"]/);
    assert.match(server, /['"]\/index\.html['"]/);
});

test('PetPal server supports common web file types', () => {
    const server = fs.readFileSync(
        path.join(appDir, 'server.js'),
        'utf8'
    );

    assert.match(server, /\.html/);
    assert.match(server, /\.css/);
    assert.match(server, /\.js/);
});
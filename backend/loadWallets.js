const db = require('./database');
const fs = require('fs');
const path = require('path');

async function loadWalletsFromFile(filePath, tier) {
    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const wallets = content.split('\n').filter(line => line.trim() !== '');

    const promises = wallets.map(walletAddress => 
        db.query('INSERT INTO wallets (wallet_address, tier_level) VALUES (?, ?)', [walletAddress, tier])
    );

    await Promise.all(promises);
    console.log(`Wallets from ${filePath} inserted successfully`);
}

async function setupWallets() {
    try {
        await loadWalletsFromFile(path.join(__dirname, 't1wallets.txt'), 1);
        await loadWalletsFromFile(path.join(__dirname, 't2wallets.txt'), 2);
    } catch (err) {
        console.error('Error loading wallets', err);
    }
}

setupWallets();

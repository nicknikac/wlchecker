const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Load wallets from text files
const loadWalletsFromFile = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return content.split('\n').map(wallet => wallet.trim().toLowerCase()).filter(wallet => wallet);
    } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return [];
    }
};

// Read wallet lists at server start
const tier1Wallets = loadWalletsFromFile(path.join(__dirname, 'tier1wallets.txt'));
const tier2Wallets = loadWalletsFromFile(path.join(__dirname, 'tier2wallets.txt'));

// Endpoint to check wallet tier
app.post('/api/check-tier', (req, res) => {
    const { walletAddress } = req.body;
    if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address is required" });
    }

    const lowercasedAddress = walletAddress.toLowerCase();
    const onTier1 = tier1Wallets.includes(lowercasedAddress);
    const onTier2 = tier2Wallets.includes(lowercasedAddress);

    let tier = 'none';
    if (onTier1 && onTier2) {
        tier = 'both 1 and 2';
    } else if (onTier1) {
        tier = '1';
    } else if (onTier2) {
        tier = '2';
    }

    res.json({ tier });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

let strayListTier1 = [];
let strayListTier2 = [];

// Function to load wallets from a text file
function loadWallets(filePath, list) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            list.push(...data.split('\n').map(wallet => wallet.trim().toLowerCase()));
        })
        .catch(err => console.error(`Error loading ${filePath}:`, err));
}

// Load wallet lists on page load
loadWallets('tier1wallets.txt', strayListTier1);
loadWallets('tier2wallets.txt', strayListTier2);

// Function to check if a given wallet address is eligible
function checkEligibility() {
    const walletAddress = document.getElementById('walletAddress').value.trim().toLowerCase();
    const result = document.getElementById('result');

    const onTier1 = strayListTier1.includes(walletAddress);
    const onTier2 = strayListTier2.includes(walletAddress);

    result.className = 'result-text';

    if (onTier1 && onTier2) {
        result.innerText = "You are on both StrayList Tier 1 and Tier 2.";
        result.style.color = '#30dcf3';
    } else if (onTier1) {
        result.innerText = "You are on StrayList Tier 1.";
        result.style.color = '#30dcf3';
    } else if (onTier2) {
        result.innerText = "You are on StrayList Tier 2.";
        result.style.color = '#30dcf3';
    } else {
        result.innerText = "You are not on any list.";
        result.style.color = '#30dcf3';
    }
}

// Function to toggle the mute state of the audio
function toggleMute() {
    const audio = document.getElementById('backgroundMusic');
    audio.muted = !audio.muted;

    const muteButton = document.querySelector('.mute-button img');
    muteButton.src = audio.muted ? 'Mute.webp' : 'Speaker.webp';
}

// Function to start playing the audio when the page is interacted with
function playAudio() {
    const audio = document.getElementById('backgroundMusic');
    if (audio.paused) {
        audio.play().catch(e => console.error("Failed to play audio: ", e));
    }
}

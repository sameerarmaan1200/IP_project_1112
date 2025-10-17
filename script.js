// ===============================
// 🌍 Waste Segregation Project JS
// ===============================

// 🎮 Game Data
const gameItems = [
    { name: '🍌 Banana Peel', type: 'biodegradable' },
    { name: '🥤 Plastic Bottle', type: 'recyclable' },
    { name: '🔋 Battery', type: 'hazardous' },
    { name: '📱 Old Phone', type: 'ewaste' },
    { name: '🍂 Dry Leaves', type: 'biodegradable' },
    { name: '📦 Cardboard Box', type: 'recyclable' },
    { name: '💊 Expired Medicine', type: 'hazardous' },
    { name: '💻 Broken Laptop', type: 'ewaste' },
    { name: '🥕 Vegetable Scraps', type: 'biodegradable' },
    { name: '🥫 Aluminum Can', type: 'recyclable' },
    { name: '🎨 Paint Can', type: 'hazardous' },
    { name: '🎧 Old Headphones', type: 'ewaste' },
    { name: '🍞 Bread Crumbs', type: 'biodegradable' },
    { name: '🍾 Glass Bottle', type: 'recyclable' },
    { name: '🧴 Cleaning Chemical', type: 'hazardous' },
    { name: '📺 Old TV', type: 'ewaste' }
];

// 🔍 Search Database
const wasteDatabase = {
    'banana peel': { bin: 'Biodegradable', icon: '🥬', color: '#2ecc71' },
    'banana': { bin: 'Biodegradable', icon: '🥬', color: '#2ecc71' },
    'plastic bottle': { bin: 'Recyclable', icon: '♻️', color: '#3498db' },
    'plastic': { bin: 'Recyclable', icon: '♻️', color: '#3498db' },
    'battery': { bin: 'Hazardous', icon: '☠️', color: '#e74c3c' },
    'phone': { bin: 'E-Waste', icon: '💻', color: '#f39c12' },
    'laptop': { bin: 'E-Waste', icon: '💻', color: '#f39c12' },
    'leaves': { bin: 'Biodegradable', icon: '🥬', color: '#2ecc71' },
    'cardboard': { bin: 'Recyclable', icon: '♻️', color: '#3498db' },
    'paper': { bin: 'Recyclable', icon: '♻️', color: '#3498db' },
    'medicine': { bin: 'Hazardous', icon: '☠️', color: '#e74c3c' },
    'paint': { bin: 'Hazardous', icon: '☠️', color: '#e74c3c' },
    'vegetable': { bin: 'Biodegradable', icon: '🥬', color: '#2ecc71' },
    'food': { bin: 'Biodegradable', icon: '🥬', color: '#2ecc71' },
    'can': { bin: 'Recyclable', icon: '♻️', color: '#3498db' },
    'aluminum': { bin: 'Recyclable', icon: '♻️', color: '#3498db' },
    'glass': { bin: 'Recyclable', icon: '♻️', color: '#3498db' },
    'tv': { bin: 'E-Waste', icon: '💻', color: '#f39c12' },
    'computer': { bin: 'E-Waste', icon: '💻', color: '#f39c12' },
    'headphones': { bin: 'E-Waste', icon: '💻', color: '#f39c12' },
    'chemical': { bin: 'Hazardous', icon: '☠️', color: '#e74c3c' },
    'fruit': { bin: 'Biodegradable', icon: '🥬', color: '#2ecc71' }
};

// Game Score Variables
let score = 0;
let mistakes = 0;

// ===============================
// 📚 Section Navigation
// ===============================
// Function: Shows the selected section and hides others
// Updates the active navigation button styling
function showSection(sectionId, event) {
    if (event) event.preventDefault();

    // Hide all sections
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add("active");
    }

    // Update active nav button
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (event && event.target) {
        event.target.classList.add("active");
    }
}

// ===============================
// 🔍 Smart Search Functions
// ===============================
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");
const searchSuggestions = document.getElementById("suggestions");

// Function: Displays search suggestions as user types
// Matches user input with items in wasteDatabase
function showSuggestions() {
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        if (searchSuggestions) searchSuggestions.style.display = "none";
        return;
    }

    const matches = Object.keys(wasteDatabase).filter(k => k.includes(query));

    if (matches.length && searchSuggestions) {
        searchSuggestions.innerHTML = "<strong>Suggestions:</strong> " + matches.slice(0, 5).join(", ");
        searchSuggestions.style.display = "block";
    } else if (searchSuggestions) {
        searchSuggestions.style.display = "none";
    }
}

// Function: Searches for waste item and displays which bin it belongs to
// Uses exact match or partial match from wasteDatabase
function searchItem() {
    if (!searchInput || !searchResult) return;

    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        searchResult.innerHTML = '<div class="result-icon">🔍</div><p style="color: #999;">Enter an item name to find its correct bin</p>';
        return;
    }

    // Search for exact match or partial match
    let item = wasteDatabase[query];

    if (!item) {
        // Try to find partial match
        const partialMatch = Object.keys(wasteDatabase).find(k =>
            query.includes(k) || k.includes(query)
        );
        if (partialMatch) {
            item = wasteDatabase[partialMatch];
        }
    }

    if (item) {
        searchResult.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">${item.icon}</div>
            <h3 style="color:${item.color}; margin-bottom: 1rem;">Dispose in ${item.bin} Bin</h3>
            <p style="color: #666;">This item belongs to the ${item.bin} waste category.</p>
        `;
        searchResult.style.border = `3px solid ${item.color}`;
    } else {
        searchResult.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
            <h3>No exact match found</h3>
            <p style="color: #666;">Try searching for: plastic, paper, battery, phone, food, etc.</p>
        `;
        searchResult.style.border = '2px solid #ccc';
    }
}

// ===============================
// 🎮 Game Items Display & Logic
// ===============================
const itemsContainer = document.getElementById("itemsContainer");
const scoreDisplay = document.getElementById("score");
const mistakesDisplay = document.getElementById("mistakes");
const feedbackDiv = document.getElementById("feedback");

// Function: Creates a new game round with random items
// Shuffles gameItems array and displays 8 random draggable items
function newRound() {
    if (!itemsContainer) return;

    itemsContainer.innerHTML = "";
    const shuffled = [...gameItems].sort(() => 0.5 - Math.random()).slice(0, 8);

    shuffled.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.draggable = true;
        div.textContent = item.name;
        div.dataset.type = item.type;

        // Drag events
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);

        itemsContainer.appendChild(div);
    });
}

// Function: Handles drag start event
// Sets data transfer and visual feedback
function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.target.style.opacity = '0.5';
}

// Function: Handles drag end event
// Resets visual feedback
function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

// Setup bins with drag and drop event listeners
const bins = document.querySelectorAll('.bin');
bins.forEach(bin => {
    bin.addEventListener('dragover', handleDragOver);
    bin.addEventListener('drop', handleDrop);
    bin.addEventListener('dragleave', handleDragLeave);
});

// Function: Handles drag over event on bins
// Provides visual feedback during drag
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.style.background = 'rgba(46, 204, 113, 0.2)';
    e.currentTarget.style.borderColor = '#2ecc71';
}

// Function: Handles drag leave event
// Removes visual feedback
function handleDragLeave(e) {
    e.currentTarget.style.background = '';
    e.currentTarget.style.borderColor = '';
}

// Function: Handles drop event on bins
// Checks if item is dropped in correct bin, updates score/mistakes
function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.style.background = '';
    e.currentTarget.style.borderColor = '';

    const itemType = e.dataTransfer.getData('text/plain');
    const binType = e.currentTarget.dataset.type;

    // Find the dragged element
    let draggedItem = document.querySelector('.item[style*="opacity: 0.5"]');
    if (!draggedItem) {
        const allItems = document.querySelectorAll('.item');
        for (let item of allItems) {
            if (item.dataset.type === itemType && item.parentElement === itemsContainer) {
                draggedItem = item;
                break;
            }
        }
    }

    if (itemType === binType) {
        // Correct!
        score++;
        if (scoreDisplay) scoreDisplay.textContent = score;
        showFeedback('✅ Correct!', '#2ecc71');
        if (draggedItem) draggedItem.remove();
    } else {
        // Wrong!
        mistakes++;
        if (mistakesDisplay) mistakesDisplay.textContent = mistakes;
        showFeedback('❌ Wrong Bin!', '#e74c3c');
    }

    // Check if all items are sorted
    if (itemsContainer && itemsContainer.children.length === 0) {
        setTimeout(() => {
            showFeedback('🎉 Round Complete!', '#f39c12');
            setTimeout(newRound, 1500);
        }, 500);
    }
}

// Function: Displays feedback message with color
// Shows temporary feedback for game actions
function showFeedback(text, color) {
    if (!feedbackDiv) return;

    const feedbackText = document.getElementById('feedbackText');
    const feedbackIcon = document.getElementById('feedbackIcon');

    if (feedbackText) feedbackText.textContent = text;
    if (feedbackIcon) feedbackIcon.textContent = text.includes('✅') ? '✅' : text.includes('❌') ? '❌' : '🎉';

    feedbackDiv.style.display = 'block';
    feedbackDiv.style.background = color;

    setTimeout(() => {
        feedbackDiv.style.display = 'none';
    }, 1500);
}

// Function: Resets the game to initial state
// Clears score, mistakes, and starts new round
function resetGame() {
    score = 0;
    mistakes = 0;
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (mistakesDisplay) mistakesDisplay.textContent = mistakes;
    newRound();
}

// ===============================
// 💰 Trash to Cash Functions
// ===============================

// Function: Validates flat number format (1-6 and A-C)
// Returns true if flat number is valid, false otherwise
function validateFlatNumber(flatNo) {
    const regex = /^[1-6][A-C]$/i;
    return regex.test(flatNo);
}

// Function: Generates random quantity between 10-60 kg
// Returns random integer for waste quantity
function generateRandomQuantity() {
    return Math.floor(Math.random() * (60 - 10 + 1)) + 10;
}

// Function: Generates random amount between 100-1000 Tk
// Returns random integer for cash reward
function generateRandomAmount() {
    return Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
}

// Function: Main calculation function for Trash to Cash
// Validates input, generates random values, displays results
function calculateReward() {
    const flatNo = document.getElementById('flatNo').value.trim().toUpperCase();
    const pinNumber = document.getElementById('pinNumber').value.trim();

    // Validate flat number
    if (!flatNo) {
        alert('⚠️ Please enter your flat number!');
        return;
    }

    if (!validateFlatNumber(flatNo)) {
        alert('⚠️ Invalid flat number! Please enter a valid flat number (1A-6C)\nExample: 1A, 2B, 3C, 4A, 5B, 6C');
        return;
    }

    // Validate PIN
    if (!pinNumber) {
        alert('⚠️ Please enter your PIN number!');
        return;
    }

    if (pinNumber.length !== 4 || isNaN(pinNumber)) {
        alert('⚠️ Invalid PIN! Please enter a 4-digit PIN number.');
        return;
    }

    // Generate random quantity and amount
    const quantity = generateRandomQuantity();
    const amount = generateRandomAmount();

    // Display results
    document.getElementById('resultFlat').textContent = flatNo;
    document.getElementById('resultQuantity').textContent = quantity + ' kg';
    document.getElementById('resultAmount').textContent = amount + ' Tk';

    // Hide input card and show result card
    document.querySelector('.input-card').style.display = 'none';
    document.getElementById('cashResult').style.display = 'block';
}

// Function: Resets Trash to Cash form
// Clears inputs and shows input card again
function resetCashForm() {
    document.getElementById('flatNo').value = '';
    document.getElementById('pinNumber').value = '';
    document.querySelector('.input-card').style.display = 'block';
    document.getElementById('cashResult').style.display = 'none';
}

// ===============================
// 🚀 Initialize on Load
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // Show home section by default
    showSection('home');

    // Initialize game if on game page
    if (itemsContainer) {
        newRound();
    }
});
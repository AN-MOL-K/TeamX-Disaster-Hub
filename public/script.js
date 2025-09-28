// Mock disaster data
const mockDisasters = [
    {
        id: 1,
        title: "Major Earthquake Hits Downtown",
        type: "earthquake",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1601052606962-ce1c3a4e4e74?w=400&h=300&fit=crop",
        verified: true,
        description: "A 6.2 magnitude earthquake struck the downtown area, causing significant structural damage to several buildings.",
        timestamp: "2 hours ago"
    },
    {
        id: 2,
        title: "Flash Flood Warning Issued",
        type: "flood",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
        verified: false,
        description: "Heavy rainfall has caused rapid flooding in low-lying areas. Residents advised to avoid travel.",
        timestamp: "45 minutes ago"
    },
    {
        id: 3,
        title: "Wildfire Spreads Rapidly",
        type: "fire",
        location: "Los Angeles, CA",
        image: "https://images.unsplash.com/photo-1574521159170-8c1c7eed7ef7?w=400&h=300&fit=crop",
        verified: true,
        description: "Strong winds are fueling a fast-moving wildfire that has already consumed 500 acres.",
        timestamp: "1 hour ago"
    },
    {
        id: 4,
        title: "Severe Thunderstorm Alert",
        type: "storm",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=300&fit=crop",
        verified: false,
        description: "Severe thunderstorms with hail and high winds are approaching the metropolitan area.",
        timestamp: "30 minutes ago"
    },
    {
        id: 5,
        title: "Coastal Flooding Expected",
        type: "flood",
        location: "Miami, FL",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        verified: true,
        description: "High tide combined with storm surge is expected to cause coastal flooding in several neighborhoods.",
        timestamp: "3 hours ago"
    },
    {
        id: 6,
        title: "Aftershock Sequence Continues",
        type: "earthquake",
        location: "Anchorage, AK",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        verified: true,
        description: "Multiple aftershocks following yesterday's 5.8 earthquake continue to shake the region.",
        timestamp: "4 hours ago"
    }
];

// DOM elements
const disastersGrid = document.getElementById('disasters-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const filterTags = document.querySelectorAll('.filter-tag');
const searchInput = document.querySelector('.search-bar input');

// State
let currentFilter = 'all';
let visibleDisasters = 6;
let filteredDisasters = [...mockDisasters];

// Initialize the app
function init() {
    renderDisasters();
    setupEventListeners();
}

// Render disaster cards
function renderDisasters() {
    disastersGrid.innerHTML = '';
    
    const disastersToShow = filteredDisasters.slice(0, visibleDisasters);
    
    disastersToShow.forEach(disaster => {
        const card = createDisasterCard(disaster);
        disastersGrid.appendChild(card);
    });
    
    // Show/hide load more button
    loadMoreBtn.style.display = visibleDisasters >= filteredDisasters.length ? 'none' : 'block';
}

// Create a disaster card element
function createDisasterCard(disaster) {
    const card = document.createElement('div');
    card.className = 'disaster-card';
    
    const statusIcon = disaster.verified ? 'fas fa-check-circle' : 'fas fa-clock';
    const statusClass = disaster.verified ? 'verified' : 'pending';
    const statusText = disaster.verified ? 'Verified' : 'Pending';
    
    const verifyBtnClass = disaster.verified ? 'verified' : 'verify';
    const verifyBtnText = disaster.verified ? 'Verified' : 'Verify';
    const verifyBtnIcon = disaster.verified ? 'fas fa-check' : 'fas fa-shield-alt';
    
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${disaster.image}" alt="${disaster.title}" class="card-image">
            <div class="card-badges">
                <span class="type-badge ${disaster.type}">${getTypeLabel(disaster.type)}</span>
                <span class="status-badge ${statusClass}">
                    <i class="${statusIcon}"></i>
                    ${statusText}
                </span>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${disaster.title}</h3>
            <div class="card-location">
                <i class="fas fa-map-marker-alt"></i>
                ${disaster.location}
            </div>
            <p class="card-description">${disaster.description}</p>
            <div class="card-footer">
                <span class="card-timestamp">${disaster.timestamp}</span>
                <button class="verify-btn ${verifyBtnClass}" onclick="handleVerify(${disaster.id})">
                    <i class="${verifyBtnIcon}"></i>
                    ${verifyBtnText}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Get type label
function getTypeLabel(type) {
    const labels = {
        earthquake: 'Earthquake',
        flood: 'Flood',
        fire: 'Wildfire',
        storm: 'Storm'
    };
    return labels[type] || type;
}

// Handle verify button click
function handleVerify(disasterId) {
    const disaster = mockDisasters.find(d => d.id === disasterId);
    if (disaster && !disaster.verified) {
        disaster.verified = true;
        applyFilters();
        renderDisasters();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            e.target.classList.add('active');
            
            currentFilter = e.target.textContent.toLowerCase();
            visibleDisasters = 6;
            applyFilters();
            renderDisasters();
        });
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', () => {
        visibleDisasters += 6;
        renderDisasters();
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        applyFilters(searchTerm);
        renderDisasters();
    });
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
}

// Apply filters
function applyFilters(searchTerm = '') {
    filteredDisasters = mockDisasters.filter(disaster => {
        // Apply filter
        const matchesFilter = currentFilter === 'all' || 
                            (currentFilter === 'verified' && disaster.verified) ||
                            disaster.type === currentFilter;
        
        // Apply search
        const matchesSearch = searchTerm === '' ||
                            disaster.title.toLowerCase().includes(searchTerm) ||
                            disaster.location.toLowerCase().includes(searchTerm) ||
                            disaster.description.toLowerCase().includes(searchTerm) ||
                            disaster.type.toLowerCase().includes(searchTerm);
        
        return matchesFilter && matchesSearch;
    });
    
    visibleDisasters = 6;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
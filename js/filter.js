// Filtering functionality for CornwallThrive.com

// Parse URL parameters
function getUrlParameters() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    // Get all parameters
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    
    return params;
}

// Apply filters based on URL parameters
function applyFilters() {
    const params = getUrlParameters();
    const listingCards = document.querySelectorAll('.listing-card');
    
    // If no parameters or only empty parameters, show all listings
    if (Object.keys(params).length === 0) {
        return;
    }
    
    // Update filter form to match URL parameters
    if (params.category && params.category !== 'all') {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = params.category;
        }
    }
    
    if (params.region && params.region !== 'all') {
        const regionFilter = document.getElementById('regionFilter');
        if (regionFilter) {
            regionFilter.value = params.region;
        }
    }
    
    // Update page title based on filters
    updatePageTitle(params);
    
    // Filter listings
    listingCards.forEach(card => {
        let showCard = true;
        
        // Filter by region
        if (params.region && params.region !== 'all') {
            const cardRegion = card.getAttribute('data-region');
            if (cardRegion && cardRegion !== params.region) {
                showCard = false;
            }
        }
        
        // Filter by category
        if (params.category && params.category !== 'all') {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory && cardCategory !== params.category) {
                showCard = false;
            }
        }
        
        // Filter by season
        if (params.season && params.season !== 'all') {
            const cardSeasons = card.getAttribute('data-seasons');
            if (cardSeasons && !cardSeasons.includes(params.season)) {
                showCard = false;
            }
        }
        
        // Filter by tag
        if (params.tag) {
            const cardTags = card.getAttribute('data-tags');
            if (cardTags && !cardTags.includes(params.tag)) {
                showCard = false;
            }
        }
        
        // Show or hide card based on filters
        if (showCard) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    updateResultsCount();
}

// Update page title based on active filters
function updatePageTitle(params) {
    const titleElement = document.querySelector('.col-lg-9 h2');
    if (!titleElement) return;
    
    let title = 'All Listings';
    
    if (params.category && params.category !== 'all') {
        switch(params.category) {
            case 'accommodation':
                title = 'Accommodation';
                break;
            case 'food':
                title = 'Food & Drink';
                break;
            case 'attractions':
                title = 'Attractions';
                break;
            case 'outdoor':
                title = 'Outdoor Activities';
                break;
            case 'beaches':
                title = 'Beaches & Coastal';
                break;
            case 'shopping':
                title = 'Shopping';
                break;
            default:
                break;
        }
    }
    
    if (params.region && params.region !== 'all') {
        let regionName = '';
        switch(params.region) {
            case 'north':
                regionName = 'North Cornwall';
                break;
            case 'south':
                regionName = 'South Cornwall';
                break;
            case 'west':
                regionName = 'West Cornwall';
                break;
            case 'bodmin':
                regionName = 'Bodmin Moor';
                break;
            case 'roseland':
                regionName = 'Roseland Peninsula';
                break;
            default:
                break;
        }
        
        title = title === 'All Listings' ? regionName : `${title} in ${regionName}`;
    }
    
    if (params.season && params.season !== 'all') {
        let seasonName = '';
        switch(params.season) {
            case 'spring':
                seasonName = 'Spring';
                break;
            case 'summer':
                seasonName = 'Summer';
                break;
            case 'autumn':
                seasonName = 'Autumn';
                break;
            case 'winter':
                seasonName = 'Winter';
                break;
            default:
                break;
        }
        
        title = `${title} - ${seasonName}`;
    }
    
    if (params.tag) {
        title = `${title} - ${params.tag.charAt(0).toUpperCase() + params.tag.slice(1)}`;
    }
    
    titleElement.textContent = title;
}

// Update results count
function updateResultsCount() {
    const visibleListings = document.querySelectorAll('.listing-card:not([style*="display: none"])');
    const countElement = document.querySelector('.results-count');
    
    if (countElement) {
        countElement.textContent = `${visibleListings.length} results found`;
    } else {
        // Create count element if it doesn't exist
        const sortDiv = document.querySelector('.col-lg-9 .d-flex.justify-content-between');
        if (sortDiv) {
            const countSpan = document.createElement('span');
            countSpan.className = 'results-count ms-2';
            countSpan.textContent = `${visibleListings.length} results found`;
            sortDiv.querySelector('.d-flex.align-items-center').prepend(countSpan);
        }
    }
}

// Add data attributes to listing cards for filtering
function addDataAttributesToListings() {
    const listingCards = document.querySelectorAll('.listing-card');
    
    listingCards.forEach(card => {
        const categoryBadge = card.querySelector('.badge');
        const locationText = card.querySelector('.card-text i.fas.fa-map-marker-alt').parentNode.textContent;
        
        // Extract category
        if (categoryBadge) {
            let category = categoryBadge.textContent.toLowerCase();
            if (category === 'food & drink') category = 'food';
            if (category === 'attraction') category = 'attractions';
            card.setAttribute('data-category', category);
        }
        
        // Extract region based on location
        let region = 'all';
        if (locationText.includes('Padstow') || locationText.includes('Tintagel') || locationText.includes('Newquay')) {
            region = 'north';
        } else if (locationText.includes('St Austell') || locationText.includes('Fowey')) {
            region = 'south';
        } else if (locationText.includes('St Ives') || locationText.includes('Porthcurno') || locationText.includes('Land')) {
            region = 'west';
        } else if (locationText.includes('Bodmin') || locationText.includes('Jamaica Inn')) {
            region = 'bodmin';
        } else if (locationText.includes('Roseland') || locationText.includes('St Mawes')) {
            region = 'roseland';
        }
        card.setAttribute('data-region', region);
        
        // Add seasons data (for demo purposes, assign all seasons to all listings)
        card.setAttribute('data-seasons', 'spring,summer,autumn,winter');
        
        // Add tags based on description
        const description = card.querySelector('.card-text.small').textContent.toLowerCase();
        const tags = [];
        
        if (description.includes('beach') || description.includes('coastal') || description.includes('sea')) {
            tags.push('beach');
        }
        if (description.includes('restaurant') || description.includes('food') || description.includes('dining')) {
            tags.push('restaurant');
        }
        if (description.includes('hotel') || description.includes('accommodation') || description.includes('stay')) {
            tags.push('hotel');
        }
        if (description.includes('hike') || description.includes('walk') || description.includes('trail')) {
            tags.push('hiking');
        }
        if (description.includes('surf') || description.includes('wave')) {
            tags.push('surfing');
        }
        if (description.includes('history') || description.includes('historic') || description.includes('castle')) {
            tags.push('history');
        }
        if (description.includes('family') || description.includes('children') || description.includes('kid')) {
            tags.push('family');
        }
        if (description.includes('garden') || description.includes('plant') || description.includes('flora')) {
            tags.push('garden');
        }
        
        card.setAttribute('data-tags', tags.join(','));
    });
}

// Handle filter form submission
const filterForm = document.querySelector('.filter-section form');
if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get filter values
        const category = document.getElementById('categoryFilter').value;
        const region = document.getElementById('regionFilter').value;
        
        // Build URL with parameters
        let url = 'listings.html';
        const params = [];
        
        if (category && category !== 'all') {
            params.push(`category=${category}`);
        }
        
        if (region && region !== 'all') {
            params.push(`region=${region}`);
        }
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        
        // Navigate to filtered URL
        window.location.href = url;
    });
}

// Initialize filtering
addDataAttributesToListings();
applyFilters();

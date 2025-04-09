// Main JavaScript for CornwallThrive.com

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Search functionality
    const searchForm = document.querySelector('.search-box form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input').value;
            const searchCategory = this.querySelector('select').value;
            
            // In a real implementation, this would redirect to search results
            console.log('Search for:', searchInput, 'in category:', searchCategory);
            
            // For demo purposes, show an alert
            alert(`Searching for "${searchInput}" in category "${searchCategory}"`);
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('section.py-5.bg-primary form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real implementation, this would submit to a backend
            console.log('Newsletter subscription for:', email);
            
            // For demo purposes, show success message
            const formRow = this.querySelector('.row');
            formRow.innerHTML = '<div class="col-12 text-center"><div class="alert alert-light" role="alert">Thank you for subscribing! We\'ve sent a confirmation email to your inbox.</div></div>';
        });
    }

    // Business listing filter functionality (for listings page)
    const filterForm = document.getElementById('business-filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get filter values
            const category = document.getElementById('filter-category').value;
            const region = document.getElementById('filter-region').value;
            const keyword = document.getElementById('filter-keyword').value;
            
            // In a real implementation, this would filter the listings
            console.log('Filter by:', {category, region, keyword});
            
            // For demo purposes, we'll just reload the page
            // In a real implementation, this would use AJAX to update the listings
            alert(`Filtering listings by: Category: ${category}, Region: ${region}, Keyword: ${keyword}`);
        });
    }

    // Add to favorites functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const businessId = this.getAttribute('data-business-id');
            
            // Toggle active class for visual feedback
            this.classList.toggle('active');
            
            // In a real implementation, this would add/remove from favorites in a database
            console.log(this.classList.contains('active') ? 'Added to favorites:' : 'Removed from favorites:', businessId);
            
            // Update icon
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // Deal claim functionality
    const dealButtons = document.querySelectorAll('.deal-card .btn');
    dealButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const dealTitle = this.closest('.card-body').querySelector('.card-title').textContent;
            
            // In a real implementation, this would record the deal claim
            console.log('Deal claimed:', dealTitle);
            
            // For demo purposes, show a modal or alert
            alert(`You've claimed the "${dealTitle}" deal! Check your email for details.`);
        });
    });
});

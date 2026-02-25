document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('shadow');
            navbar.style.padding = '1rem 0';
        }
    });

    // --- Theme Toggler ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if(themeToggle) themeToggle.innerHTML = sunIcon;
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.removeItem('theme');
                themeToggle.innerHTML = moonIcon;
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = sunIcon;
            }
        });
    }

    // --- Scroll Animation Observer ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- Search Functionality (Index Page) ---
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const location = document.getElementById('search-location').value;
            const type = document.getElementById('search-type').value;
            const price = document.getElementById('search-price').value;

            // Redirect to properties.html with query parameters
            const params = new URLSearchParams();
            if (location !== 'All Locations') params.append('location', location);
            if (type !== 'All Types') params.append('type', type);
            if (price !== 'Any Price') params.append('price', price);

            window.location.href = `properties.html?${params.toString()}`;
        });
    }

    // --- Search Filtering (Properties Page) ---
    if (window.location.pathname.includes('properties.html')) {
        const params = new URLSearchParams(window.location.search);
        const filterLoc = params.get('location');
        const filterType = params.get('type');
        const filterPrice = params.get('price');

        const clearFilterBtn = document.getElementById('clear-filter-btn');
        const allCards = Array.from(document.querySelectorAll('.property-card-col'));
        let filteredCards = allCards;

        // Apply filters if any URL parameters are present
        if (filterLoc || filterType || filterPrice) {
            if (clearFilterBtn) {
                clearFilterBtn.classList.remove('d-none');
            }
            filteredCards = allCards.filter(card => {
                const pLoc = card.getAttribute('data-location');
                const pType = card.getAttribute('data-type');
                const pPrice = parseInt(card.getAttribute('data-price-value'));
                
                let show = true;
                if (filterLoc && !pLoc.includes(filterLoc)) show = false;
                if (filterType && pType !== filterType) show = false;
                if (filterPrice) {
                    if (filterPrice === '₹ 10 Cr - ₹ 40 Cr' && (pPrice < 100000000 || pPrice > 400000000)) show = false;
                    if (filterPrice === '₹ 40 Cr - ₹ 80 Cr' && (pPrice < 400000000 || pPrice > 800000000)) show = false;
                    if (filterPrice === '₹ 80 Cr+' && pPrice < 800000000) show = false;
                }
                return show;
            });
        }
        
        // Hide all cards in the DOM initially. JS will control visibility.
        allCards.forEach(card => card.style.display = 'none');

        const noData = document.getElementById('no-data');
        const paginationContainer = document.getElementById('pagination-container');
        const propertiesPerPage = 6;
        const totalProperties = filteredCards.length;
        const totalPages = Math.ceil(totalProperties / propertiesPerPage);

        // Handle display based on filtered results
        if (totalProperties === 0) {
            if(noData) noData.classList.remove('d-none');
            if(paginationContainer) paginationContainer.innerHTML = '';
        } else {
            if(noData) noData.classList.add('d-none');

            if (totalPages > 1 && paginationContainer) {
                let currentPage = 1;
                
                const setupPagination = () => {
                    let paginationHTML = `
                        <nav aria-label="Page navigation">
                            <ul class="pagination justify-content-center">
                                <li class="page-item" id="prev-page"><a class="page-link" href="#" aria-label="Previous">&laquo;</a></li>`;
                    for (let i = 1; i <= totalPages; i++) {
                        paginationHTML += `<li class="page-item page-number"><a class="page-link" href="#">${i}</a></li>`;
                    }
                    paginationHTML += `<li class="page-item" id="next-page"><a class="page-link" href="#" aria-label="Next">&raquo;</a></li>
                            </ul>
                        </nav>`;
                    paginationContainer.innerHTML = paginationHTML;

                    document.querySelectorAll('.page-number').forEach(pn => {
                        pn.addEventListener('click', e => {
                            e.preventDefault();
                            currentPage = parseInt(e.target.textContent);
                            showPage(currentPage);
                        });
                    });

                    document.getElementById('prev-page').addEventListener('click', e => { e.preventDefault(); if (currentPage > 1) { currentPage--; showPage(currentPage); } });
                    document.getElementById('next-page').addEventListener('click', e => { e.preventDefault(); if (currentPage < totalPages) { currentPage++; showPage(currentPage); } });
                };

                const showPage = (page) => {
                    // Hide all cards and reset their animation state for re-triggering
                    allCards.forEach(card => {
                        card.style.display = 'none';
                        card.classList.remove('visible');
                    });

                    const startIndex = (page - 1) * propertiesPerPage;
                    const endIndex = startIndex + propertiesPerPage;
                    const cardsOnPage = filteredCards.slice(startIndex, endIndex);

                    cardsOnPage.forEach((card, index) => {
                        // Remove any hardcoded delay classes and apply a consistent, staggered animation delay
                        card.classList.remove('delay-100', 'delay-200', 'delay-300');
                        const delay = (index % 3 + 1) * 100;
                        card.classList.add(`delay-${delay}`);
                        card.style.display = 'block';
                    });

                    document.querySelectorAll('.page-number').forEach((pn, i) => pn.classList.toggle('active', i + 1 === page));
                    document.getElementById('prev-page').classList.toggle('disabled', page === 1);
                    document.getElementById('next-page').classList.toggle('disabled', page === totalPages);
                    
                    document.getElementById('all-properties')?.scrollIntoView({ behavior: 'smooth' });
                };

                setupPagination();
                showPage(currentPage);

            } else {
                filteredCards.forEach(card => card.style.display = 'block');
                if(paginationContainer) paginationContainer.innerHTML = '';
            }
        }
    }
    // --- Property Modal Logic ---
    const propertyDetailModal = document.getElementById('propertyDetailModal');
    if (propertyDetailModal) {
        propertyDetailModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            
            const data = {
                title: button.getAttribute('data-title'),
                price: button.getAttribute('data-price'),
                location: button.getAttribute('data-location'),
                beds: button.getAttribute('data-beds'),
                baths: button.getAttribute('data-baths'),
                sqft: button.getAttribute('data-sqft'),
                img: button.getAttribute('data-img'),
                interiors: button.getAttribute('data-interiors') ? button.getAttribute('data-interiors').split(',') : [],
                desc: button.getAttribute('data-desc')
            };

            propertyDetailModal.querySelector('#modal-title').textContent = data.title;
            propertyDetailModal.querySelector('#modal-price').textContent = data.price;
            propertyDetailModal.querySelector('#modal-location').textContent = data.location;
            propertyDetailModal.querySelector('#modal-beds').textContent = data.beds;
            propertyDetailModal.querySelector('#modal-baths').textContent = data.baths;
            propertyDetailModal.querySelector('#modal-sqft').textContent = data.sqft;
            propertyDetailModal.querySelector('#modal-desc').textContent = data.desc;

            // Populate Carousel
            const carouselInner = propertyDetailModal.querySelector('#carousel-inner');
            carouselInner.innerHTML = '';
            
            const allImages = [data.img, ...data.interiors];
            
            allImages.forEach((imgSrc, index) => {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                if (index === 0) item.classList.add('active');
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.classList.add('d-block', 'w-100');
                img.alt = 'Property Image';
                
                item.appendChild(img);
                carouselInner.appendChild(item);
            });
        });
    }

    // --- Auto-close mobile navbar on link click ---
    const navLinks = document.querySelectorAll('#navbarNav .nav-link, #navbarNav .btn-primary');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {
            toggle: false
        });
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                // If the navbar is currently open (in mobile view), hide it
                if (menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }
});
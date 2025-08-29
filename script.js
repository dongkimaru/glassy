// Mobile Navigation Toggle
function openNav() {
    const nav = document.getElementById('gnb');
    nav.classList.toggle('active');
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Product Search Functionality
function searchProducts(query) {
    // Cafe24 API 연동을 위한 검색 함수
    console.log('Searching for:', query);
    // 실제 구현시 cafe24 API 호출
}

// Shopping Cart Functions
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

// Initialize Shopping Cart
const cart = new ShoppingCart();

// Product Quick View
function showQuickView(productId) {
    // 상품 빠른보기 모달 표시
    console.log('Quick view for product:', productId);
}

// Wishlist Functions
class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.updateWishlistDisplay();
    }

    addItem(product) {
        if (!this.items.find(item => item.id === product.id)) {
            this.items.push(product);
            this.saveWishlist();
            this.updateWishlistDisplay();
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveWishlist();
        this.updateWishlistDisplay();
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    updateWishlistDisplay() {
        const wishlistCount = document.getElementById('wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.items.length;
            wishlistCount.style.display = this.items.length > 0 ? 'block' : 'none';
        }
    }
}

// Initialize Wishlist
const wishlist = new Wishlist();

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Newsletter Subscription
function subscribeNewsletter(email) {
    if (validateEmail(email)) {
        // Cafe24 뉴스레터 구독 API 호출
        console.log('Newsletter subscription for:', email);
        return true;
    }
    return false;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Product Filter
function filterProducts(category, priceRange, sortBy) {
    // 상품 필터링 및 정렬
    console.log('Filtering products:', { category, priceRange, sortBy });
}

// Review System
function submitReview(productId, rating, comment) {
    // 리뷰 제출
    console.log('Review submitted:', { productId, rating, comment });
}

// Social Media Sharing
function shareProduct(platform, productUrl, productTitle) {
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`;
            break;
        case 'kakao':
            // 카카오톡 공유 API 사용
            if (typeof Kakao !== 'undefined') {
                Kakao.Link.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: productTitle,
                        imageUrl: productUrl,
                        link: {
                            mobileWebUrl: productUrl,
                            webUrl: productUrl,
                        },
                    },
                });
                return;
            }
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize all event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.openMenu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openNav);
    }

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input[name="search"]').value;
            searchProducts(query);
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[name="email"]').value;
            if (subscribeNewsletter(email)) {
                alert('뉴스레터 구독이 완료되었습니다!');
                this.reset();
            }
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('필수 항목을 모두 입력해주세요.');
            }
        });
    });
});

// Export for use in other modules
window.cafe24Template = {
    cart,
    wishlist,
    searchProducts,
    filterProducts,
    submitReview,
    shareProduct
};

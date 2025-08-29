/**
 * Cafe24 쇼핑몰 템플릿 공통 JavaScript
 */

// 전역 변수
let isMobileMenuOpen = false;

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplate();
});

/**
 * 템플릿 초기화
 */
function initializeTemplate() {
    // 모바일 메뉴 초기화
    initMobileMenu();
    
    // 스크롤 이벤트 초기화
    initScrollEvents();
    
    // 검색 기능 초기화
    initSearch();
    
    // 이미지 지연 로딩 초기화
    initLazyLoading();
    
    // 툴팁 초기화
    initTooltips();
}

/**
 * 모바일 메뉴 초기화
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const gnb = document.querySelector('#gnb');
    
    if (mobileMenuBtn && gnb) {
        mobileMenuBtn.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
}

/**
 * 모바일 메뉴 토글
 */
function toggleMobileMenu() {
    const gnb = document.querySelector('#gnb');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!gnb || !mobileMenuBtn) return;
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        gnb.style.display = 'block';
        mobileMenuBtn.classList.add('active');
    } else {
        gnb.style.display = 'none';
        mobileMenuBtn.classList.remove('active');
    }
}

/**
 * 스크롤 이벤트 초기화
 */
function initScrollEvents() {
    let lastScrollTop = 0;
    const header = document.querySelector('#header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 헤더 스크롤 효과
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 스크롤 방향에 따른 헤더 숨김/표시
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * 검색 기능 초기화
 */
function initSearch() {
    const searchForm = document.querySelector('.search-box form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const keyword = this.querySelector('input[name="keyword"]').value.trim();
            
            if (keyword === '') {
                alert('검색어를 입력해주세요.');
                return;
            }
            
            // 검색 페이지로 이동
            const searchUrl = this.action || '/product/list.html';
            const searchParams = new URLSearchParams();
            searchParams.append('keyword', keyword);
            
            window.location.href = searchUrl + '?' + searchParams.toString();
        });
    }
}

/**
 * 이미지 지연 로딩 초기화
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * 툴팁 초기화
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

/**
 * 툴팁 표시
 */
function showTooltip(e) {
    const tooltipText = e.target.dataset.tooltip;
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    e.target.tooltip = tooltip;
}

/**
 * 툴팁 숨김
 */
function hideTooltip(e) {
    if (e.target.tooltip) {
        e.target.tooltip.remove();
        e.target.tooltip = null;
    }
}

/**
 * 디바운스 함수
 */
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

/**
 * 쓰로틀 함수
 */
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
    };
}

/**
 * 로컬 스토리지 유틸리티
 */
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage set error:', e);
        }
    },
    
    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage remove error:', e);
        }
    }
};

/**
 * 쿠키 유틸리티
 */
const Cookie = {
    set: function(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    },
    
    get: function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    
    remove: function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }
};

/**
 * 유틸리티 함수들
 */
const Utils = {
    // 숫자 포맷팅
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // 가격 포맷팅
    formatPrice: function(price) {
        return this.formatNumber(price) + '원';
    },
    
    // 날짜 포맷팅
    formatDate: function(date) {
        const d = new Date(date);
        return d.getFullYear() + '-' + 
               String(d.getMonth() + 1).padStart(2, '0') + '-' + 
               String(d.getDate()).padStart(2, '0');
    },
    
    // 문자열 자르기
    truncate: function(str, length) {
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    },
    
    // URL 파라미터 파싱
    getUrlParams: function() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }
};

// 전역 객체에 유틸리티 추가
window.Cafe24Utils = {
    Storage,
    Cookie,
    Utils,
    debounce,
    throttle
};

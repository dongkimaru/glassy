// Cafe24 템플릿 사이트 설정 파일
// 이 파일에서 사이트의 기본 설정을 관리할 수 있습니다.

const SITE_CONFIG = {
    // 사이트 기본 정보
    site: {
        name: 'BabyBrezza',
        title: 'BabyBrezza - 육아의 신세계',
        description: '베이비 브레짜와 함께하는 매순간이 늘 감동스럽길 바라는 마음',
        keywords: '분유제조기, 젖병세척기, 젖병소독기, 이유식마스터기, 육아용품',
        author: 'BabyBrezza',
        url: 'https://www.babybrezza.kr'
    },

    // 회사 정보
    company: {
        name: '(주)아이브이지',
        ceo: '강석준',
        businessNumber: '776-87-00563',
        address: '서울특별시 강남구 학동로 401, 금하빌딩 4층',
        zipCode: '06060',
        phone: '1811-8077',
        email: 'info@babybrezza.co.kr',
        operatingHours: '평일 10:00 - 17:00 (점심시간 12:00 - 13:00)',
        weekendHours: '주말 및 공휴일 휴무'
    },

    // 쇼핑몰 설정
    shop: {
        currency: 'KRW',
        currencySymbol: '원',
        freeShippingThreshold: 50000, // 5만원 이상 무료배송
        shippingCost: 3000, // 기본 배송비
        taxRate: 0.1, // 부가세율
        maxQuantity: 99, // 최대 주문 수량
        minOrderAmount: 10000 // 최소 주문 금액
    },

    // 상품 카테고리
    categories: [
        {
            id: 'formula-maker',
            name: '분유제조기',
            slug: 'formula-maker',
            description: '원터치로 완벽한 분유를 만드는 제품들'
        },
        {
            id: 'bottle-cleaner',
            name: '젖병세척기',
            slug: 'bottle-cleaner',
            description: 'UV 살균과 세척을 동시에 하는 제품들'
        },
        {
            id: 'bottle-sterilizer',
            name: '젖병소독기',
            slug: 'bottle-sterilizer',
            description: '편리하고 안전한 젖병 소독 제품들'
        },
        {
            id: 'food-master',
            name: '이유식 마스터기',
            slug: 'food-master',
            description: '다양한 이유식을 쉽게 만들 수 있는 제품들'
        }
    ],

    // 결제 설정
    payment: {
        methods: ['card', 'bank_transfer', 'kakao_pay', 'naver_pay'],
        cardTypes: ['visa', 'mastercard', 'amex', 'jcb'],
        installmentMonths: [3, 6, 12, 24],
        defaultInstallment: 0 // 일시불
    },

    // 배송 설정
    shipping: {
        methods: [
            {
                id: 'standard',
                name: '일반배송',
                cost: 3000,
                deliveryTime: '2-3일'
            },
            {
                id: 'express',
                name: '빠른배송',
                cost: 5000,
                deliveryTime: '1일'
            },
            {
                id: 'free',
                name: '무료배송',
                cost: 0,
                deliveryTime: '2-3일',
                minAmount: 50000
            }
        ]
    },

    // 쿠폰 설정
    coupons: [
        {
            code: 'WELCOME10',
            name: '신규 고객 10% 할인',
            discount: 0.1,
            type: 'percentage',
            minAmount: 50000,
            maxDiscount: 50000,
            validFrom: '2024-01-01',
            validTo: '2024-12-31',
            usageLimit: 1
        },
        {
            code: 'SAVE20',
            name: '20% 할인 쿠폰',
            discount: 0.2,
            type: 'percentage',
            minAmount: 100000,
            maxDiscount: 100000,
            validFrom: '2024-01-01',
            validTo: '2024-12-31',
            usageLimit: 1
        }
    ],

    // 소셜 미디어
    social: {
        facebook: 'https://www.facebook.com/babybrezza',
        instagram: 'https://www.instagram.com/babybrezza',
        youtube: 'https://www.youtube.com/babybrezza',
        blog: 'https://blog.naver.com/babybrezza'
    },

    // API 설정
    api: {
        baseUrl: 'https://api.babybrezza.kr',
        endpoints: {
            products: '/products',
            cart: '/cart',
            orders: '/orders',
            users: '/users',
            reviews: '/reviews'
        },
        timeout: 10000
    },

    // 분석 및 추적
    analytics: {
        googleAnalytics: 'GA_MEASUREMENT_ID',
        googleTagManager: 'GTM_CONTAINER_ID',
        facebookPixel: 'FACEBOOK_PIXEL_ID',
        kakaoPixel: 'KAKAO_PIXEL_ID'
    },

    // 성능 설정
    performance: {
        imageLazyLoading: true,
        preloadCriticalResources: true,
        serviceWorker: false,
        cacheStrategy: 'network-first'
    },

    // 보안 설정
    security: {
        csrfProtection: true,
        xssProtection: true,
        contentSecurityPolicy: true,
        httpsOnly: true
    }
};

// 설정값을 전역으로 노출
window.SITE_CONFIG = SITE_CONFIG;

// 설정 유틸리티 함수들
const ConfigUtils = {
    // 카테고리 정보 가져오기
    getCategory: (id) => {
        return SITE_CONFIG.categories.find(cat => cat.id === id);
    },

    // 배송 방법 정보 가져오기
    getShippingMethod: (id) => {
        return SITE_CONFIG.shipping.methods.find(method => method.id === id);
    },

    // 쿠폰 정보 가져오기
    getCoupon: (code) => {
        return SITE_CONFIG.coupons.find(coupon => coupon.code === code);
    },

    // 무료배송 기준 확인
    isFreeShipping: (amount) => {
        return amount >= SITE_CONFIG.shop.freeShippingThreshold;
    },

    // 배송비 계산
    calculateShipping: (amount) => {
        if (ConfigUtils.isFreeShipping(amount)) {
            return 0;
        }
        return SITE_CONFIG.shop.shippingCost;
    },

    // 할인 금액 계산
    calculateDiscount: (amount, couponCode) => {
        const coupon = ConfigUtils.getCoupon(couponCode);
        if (!coupon) return 0;

        let discount = 0;
        if (coupon.type === 'percentage') {
            discount = amount * coupon.discount;
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        }

        return Math.floor(discount);
    },

    // 가격 포맷팅
    formatPrice: (price) => {
        return price.toLocaleString() + SITE_CONFIG.shop.currencySymbol;
    },

    // 설정값 검증
    validate: () => {
        const errors = [];
        
        if (!SITE_CONFIG.site.name) errors.push('사이트명이 설정되지 않았습니다.');
        if (!SITE_CONFIG.company.businessNumber) errors.push('사업자등록번호가 설정되지 않았습니다.');
        if (SITE_CONFIG.shop.freeShippingThreshold <= 0) errors.push('무료배송 기준이 올바르지 않습니다.');
        
        return errors;
    }
};

// 설정 유틸리티를 전역으로 노출
window.ConfigUtils = ConfigUtils;

// 설정 로드 완료 이벤트 발생
document.addEventListener('DOMContentLoaded', () => {
    const errors = ConfigUtils.validate();
    if (errors.length > 0) {
        console.warn('사이트 설정 오류:', errors);
    }
    
    // 설정 로드 완료 이벤트 발생
    window.dispatchEvent(new CustomEvent('siteConfigLoaded', {
        detail: { config: SITE_CONFIG, errors }
    }));
});

// ES6 모듈로 내보내기 (필요시)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SITE_CONFIG, ConfigUtils };
}

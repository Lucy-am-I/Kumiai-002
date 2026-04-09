document.addEventListener('DOMContentLoaded', () => {
    
    // 店舗データのダミー生成と描画
    // 画像パスは生成した仮画像の2種を交互に使う
    const shopImages = [
        "assets/shop_exterior.png", // 外観
        "assets/shop_food.png"  // 料理
    ];

    const shopNames = [
        "和食処 さいたま彩", "洋食ビストロ KURA", "鮨 浦和海鮮", "手打ち蕎麦 山風", "焼肉 炎陣",
        "カフェ・ド・ルージュ", "本格中華 龍の舌", "居酒屋 大宮横丁", "イタリアン ポルタ", "割烹 季節の彩り"
    ];

    const shopComments = [
        "地元の新鮮な野菜を使用！", "本格ワインと洋食の店", "毎朝市場から直送の鮮魚", "香り高い蕎麦が自慢", "特選和牛をリーズナブルに",
        "自家焙煎コーヒーで一息", "本場の点心をどうぞ", "活気あふれる大衆居酒屋", "モチモチの生パスタ", "記念日に最適な空間"
    ];

    const shopGrid = document.getElementById('shopGrid');
    
    if (shopGrid) {
        for (let i = 0; i < 10; i++) {
            const imgSrc = shopImages[i % 2]; // 仮で2つの画像を交互に使用
            const cardHtml = `
                <div class="shop-card">
                    <div class="shop-img-container">
                        <div class="shop-img" style="background-image: url('${imgSrc}');"></div>
                    </div>
                    <div class="shop-info">
                        <h4 class="shop-name">${shopNames[i]}</h4>
                        <p class="shop-comment">${shopComments[i]}</p>
                    </div>
                </div>
            `;
            shopGrid.insertAdjacentHTML('beforeend', cardHtml);
        }
    }

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // ヘッダーの高さを考慮
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // モバイルメニューを閉じる
                document.querySelector('.global-nav').classList.remove('active');
            }
        });
    });

    // モバイルメニューのトグル
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.global-nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // スクロール時のフェードインアニメーション
    const bgHeader = document.querySelector('.global-header');
    
    // Intersection Observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // スクロールによるヘッダーの影とヒーロー背景の微動（パララックス風）
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Header shadow
        if (scrollY > 50) {
            bgHeader.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            bgHeader.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }

        // Hero background movement (パララックス)
        if (heroBg && scrollY <= window.innerHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
        }
    });

    // ヒーロー画像の表示時アニメーションを確実に行うため
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
});

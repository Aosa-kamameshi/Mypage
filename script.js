// ページローダー
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000);
  
  // スキルバーのアニメーション
  animateSkillBars();
  
  // スクロールアニメーションの初期化
  checkScroll();
});

// スキルバーのアニメーション
function animateSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  skillLevels.forEach(level => {
    const width = level.style.width;
    level.style.width = '0';
    
    setTimeout(() => {
      level.style.width = width;
    }, 500);
  });
}

// スクロール時のアニメーション
function checkScroll() {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // セクションが表示されたときに図形アニメーションを開始
        const shapes = entry.target.querySelectorAll('.shape');
        shapes.forEach(shape => {
          shape.style.opacity = '0.7';
          if (shape.classList.contains('bg')) {
            shape.style.opacity = '0.05';
          }
        });
        
        // スキルバーのアニメーション
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// ヘッダーのスクロール制御
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (lastScrollY < window.scrollY) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollY = window.scrollY;
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // ヘッダーの高さを考慮
        behavior: 'smooth'
      });
    }
  });
});

// PowerPoint風の図形アニメーション
function animateShapes() {
  const shapes = document.querySelectorAll('.shape:not(.bg)');
  
  shapes.forEach(shape => {
    // ランダムな位置と回転を設定
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    const randomRotate = Math.random() * 30 - 15;
    
    // アニメーションを適用
    shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    
    // 一定時間後に元の位置に戻す
    setTimeout(() => {
      shape.style.transform = 'translate(0, 0) rotate(0deg)';
    }, 500);
  });
  
  // 定期的にアニメーションを実行
  setTimeout(animateShapes, 3000);
}

// 初期化時にアニメーションを開始
setTimeout(animateShapes, 2000);

// プロジェクトカードのホバーエフェクト
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // カード内の図形オーバーレイにアニメーションを追加
    const overlay = card.querySelector('.shape-overlay');
    if (overlay) {
      overlay.style.opacity = '0.4';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    const overlay = card.querySelector('.shape-overlay');
    if (overlay) {
      overlay.style.opacity = '0.2';
    }
  });
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
  // 必要に応じてレイアウトを調整
});
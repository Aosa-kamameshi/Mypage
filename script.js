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

// 画像の読み込みエラーを検出する関数
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.error("画像の読み込みに失敗しました:", this.src)
      // エラーが発生した画像に代替スタイルを適用
      this.style.padding = "20px"
      this.style.border = "2px solid #ddd"
      this.style.backgroundColor = "#f0f0f0"
      this.style.minHeight = "200px"
      this.style.minWidth = "200px"
      this.style.display = "flex"
      this.style.alignItems = "center"
      this.style.justifyContent = "center"
      this.style.fontSize = "14px"
      this.style.color = "#666"
      this.style.textAlign = "center"
      this.style.borderRadius = "5px"
      
      // 代替テキストを表示
      this.alt = "画像を読み込めませんでした"
      this.title = "画像ファイル: " + this.src
      
      // 親要素にも最小サイズを設定
      if (this.parentElement && this.parentElement.classList.contains('image-placeholder')) {
        this.parentElement.style.minHeight = "200px"
        this.parentElement.style.display = "flex"
        this.parentElement.style.alignItems = "center"
        this.parentElement.style.justifyContent = "center"
        this.parentElement.style.backgroundColor = "#f8f8f8"
        this.parentElement.style.border = "1px dashed #ccc"
        this.parentElement.style.borderRadius = "5px"
      }
    })
    
    // 画像が正常に読み込まれた場合のログ
    img.addEventListener("load", function () {
      console.log("画像が正常に読み込まれました:", this.src)
    })
  })
})
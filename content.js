// カスタムボタンのID
const CUSTOM_BUTTON_ID = 'x-profile-minimal-switcher';

function replaceProfileParticle() {
  // 元のアカウントスイッチャーボタンを探す
  const originalButton = document.querySelector('a[data-testid="SideNav_AccountSwitcher_Button"]') || 
                         document.querySelector('[data-testid="SideNav_AccountSwitcher_Button"]');

  if (!originalButton || document.getElementById(CUSTOM_BUTTON_ID)) return;

  // 1. 元のボタンを不可視にするが、DOM上には残してクリック可能にする
  // (完全に消すとメニューが表示されなくなるため)
  originalButton.style.opacity = '0';
  originalButton.style.position = 'absolute';
  originalButton.style.width = '1px';
  originalButton.style.height = '1px';
  originalButton.style.overflow = 'hidden';

  // 2. 代わりのシンプルなボタンを作成
  const replacementBtn = document.createElement('div');
  replacementBtn.id = CUSTOM_BUTTON_ID;
  
  // XのUIに合わせたスタイル調整
  replacementBtn.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px; /* ボタン全体のサイズを少し大きくして押しやすく */
    height: 44px;
    margin: 8px auto;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: transparent;
  `;

  // ホバーエフェクト
  replacementBtn.onmouseenter = () => replacementBtn.style.backgroundColor = 'rgba(239, 243, 244, 0.1)';
  replacementBtn.onmouseleave = () => replacementBtn.style.backgroundColor = 'transparent';

  // 新しいアイコン (SVG): 太くて分かりやすい上下矢印
  // 視認性を高めるため、塗りつぶし（fill）スタイルを採用
  replacementBtn.innerHTML = `
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" style="color: rgb(239, 243, 244);">
      <path d="M7.41 10.59L12 6l4.59 4.59L18 9.17 12 3.17l-6 6zM16.59 13.41L12 18l-4.59-4.59L6 14.83l6 6 6-6z"/>
    </svg>
  `;

  // 3. 新しいボタンがクリックされたら、元のボタンをクリックする
  replacementBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    originalButton.click();
  });

  // 4. サイドバーの適切な位置（元のボタンの親要素）に挿入
  originalButton.parentElement.appendChild(replacementBtn);
}

// 監視設定
const observer = new MutationObserver(() => {
  replaceProfileParticle();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初回実行
replaceProfileParticle();
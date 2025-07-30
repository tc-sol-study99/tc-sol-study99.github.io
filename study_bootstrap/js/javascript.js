/*
    イメージマップの画像サイズを変更しても追随させるスクリプト
*/
function makeImageMapResponsive(imgId) {
    const img = document.getElementById(imgId);
    if (!img || !img.useMap) return; // 画像がない場合は処理を中断

    const areas = document.querySelectorAll(`map[name="${img.useMap.substring(1)}"] area`);

    function resizeCoords(originalWidth, originalHeight) {

        const currentWidth = img.clientWidth;
        const currentHeight = img.clientHeight;

        const scaleX = currentWidth / originalWidth;
        const scaleY = currentHeight / originalHeight;

        areas.forEach(area => {
            const originalCoords = area.dataset.originalCoords.split(',').map(Number);
            const scaledCoords = originalCoords.map((val, index) =>
                index % 2 === 0 ? Math.round(val * scaleX) : Math.round(val * scaleY)
            );
            area.coords = scaledCoords.join(',');
        });
    }

    function init() {
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;

        if (!originalWidth || !originalHeight) {
            // 画像が未読込の場合は onload 待ち
            img.onload = () => {
                resizeCoords(img.naturalWidth, img.naturalHeight);
            };
        } else {
            resizeCoords(originalWidth, originalHeight);
        }

        window.addEventListener('resize', () => {
            resizeCoords(img.naturalWidth, img.naturalHeight);
        });
    }

    init();
}

// 呼び出し例
// DOM が完全に読み込まれてから実行
document.addEventListener('DOMContentLoaded', () => {
    makeImageMapResponsive('introImage');
});
/*
    Topに戻る機能
*/

document.querySelectorAll('area[data-target]').forEach(area => {
    area.addEventListener('click', function (e) {
        e.preventDefault(); // デフォルトのアンカー動作を無効化

        const targetId = this.dataset.target;
        const target = document.getElementById(targetId);
        if (target) {
            // スクロールして要素を画面のトップに
            const top = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: top,
                behavior: 'smooth' // スムーズに移動
            });
        }
    });
});

const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    // スクロールでボタンの表示・非表示切替
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    // クリックでTOPへスムーズスクロール
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

//PopOver
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

//トースト
document.addEventListener('DOMContentLoaded', () => {
    const toastEl = document.querySelector('.toast');
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, {
            autohide: false
        });
        toast.show(); // ← トーストを表示
    }
});
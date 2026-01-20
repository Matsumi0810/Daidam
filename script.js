/* =========================================
   だいだむ - JS Logic (Custom Alert Edition)
   ========================================= */

// 1. デフォルトデータの定義
const commonHairColors = ["赤", "茶", "オレンジ", "黄", "黄緑", "緑", "青緑", "青", "青紫", "紫", "白", "銀", "灰", "黒", "金"];

const defaultCategories = ["種族", "性別", "髪型", "髪色1", "髪色2", "表情", "衣装(セットアップ)", "アイテム", "衣装(コーディネート)", "衣装(レディース向け)", "場所"];

const defaultActiveCats = ["種族", "性別", "髪型", "髪色1", "髪色2", "表情", "衣装(セットアップ)", "アイテム"];

const defaultThemeData = {
    "種族": ["エルフ", "妖精", "獣人", "鳥人", "兎人", "人狼", "龍人", "小人", "人魚", "アラクネ(蜘蛛)", "ラミア(蛇)", "アルラウネ(植物)", "メデューサ", "悪魔", "天使", "サキュバス", "インキュバス", "ヴァンパイア", "鬼", "妖狐", "ゴースト", "アンデッド", "人造人間", "神", "人間"],
    "性別": ["男性", "女性", "中性", "不明"],
    "髪型": ["ショート", "ベリーショート", "ショートマッシュ", "ボブ", "セミロング", "ロング", "おだんご(高)", "おだんご(低)", "ポニーテール", "ひとつ結び", "ハーフアップ(短)", "ハーフアップ(ボブ)", "ハーフアップ(ロング)", "ツインテール(短)", "ツインテール(長)", "おさげ", "編み込み", "コーンロウ", "センターパート", "ウルフ", "ツーブロック", "マンバン", "7:3", "アップバング"],
    "髪色1": [...commonHairColors], "髪色2": [...commonHairColors],
    "表情": ["笑顔", "ジト目", "照れ", "ドヤ顔", "泣き顔", "困り顔", "驚き", "焦り", "赤面", "号泣", "怯え", "不思議", "落ち込み", "怒り", "悲しみ", "諦め", "呆れ", "無表情", "興奮", "やつれ", "うっとり", "嘲笑", "愛想笑い", "悪巧み", "狂"],
    "衣装(セットアップ)": ["スーツ", "スウェットセットアップ", "パジャマ", "ジャージ", "作業着", "制服", "ジャンプスーツ", "サロペット", "つなぎ", "ワンピース", "ドレス", "フォーマルウェア", "喪服", "礼服", "着物", "ミリタリーセットアップ"],
    "アイテム": ["スマホ", "イヤホン", "本・ノート", "ペン", "紙袋", "飲み物", "傘", "花束", "鍵", "カメラ", "ヘッドホン", "マスク", "帽子", "マフラー", "手袋", "タバコ", "ライター", "お菓子", "チケット", "手紙", "メガネ", "サングラス", "腕時計", "指輪", "ネックレス", "ピアス", "ブレスレット", "リュック", "銃", "魔法杖", "剣"],
    "衣装(コーディネート)": ["白Tシャツ × デニムパンツ", "オーバーサイズT × ワイドパンツ", "シャツ（白） × スラックス", "シャツ（ストライプ） × チノパン", "ニット × テーパードパンツ", "パーカー × スキニーパンツ", "パーカー × カーゴパンツ", "スウェット × ジョガーパンツ", "ロンT × レギンス", "ジャケット × デニムパンツ", "ジャケット × スラックス", "タンクトップ × デニムパンツ", "シアートップス × スラックス", "ロゴT × カーゴパンツ", "開襟シャツ × ワイドパンツ", "アロハシャツ × ショートパンツ", "デニムシャツ × チノパン", "ミリタリーシャツ × ベイカーパンツ", "フーディ × ハーフパンツ", "ペプラムトップス × テーパードパンツ", "ビスチェ × シャツ × ワイドパンツ", "メッシュトップス × インナータンク × デニム", "バンドT × レザーパンツ"],
    "衣装(レディース向け)": ["ブラウス × プリーツスカート", "ブラウス × タイトスカート", "クロップドトップス × ハイウエストデニム", "カーディガン × ロングスカート", "タートルネック × フレアスカート", "チュニック × スキニーパンツ", "レースブラウス × マーメイドスカート", "ボーダーT × デニムスカート", "ニットベスト × ロングスカート", "オフショルダー × フレアスカート", "ペプラムトップス × テーパードパンツ", "ボウタイブラウス × タイトスカート", "ショート丈ニット × ロングスカート", "シャツワンピ風トップス × レギンス", "ハイネックトップス × ジャンパースカート", "チュールトップス × スラックス"],
    "場所": ["学校の屋上", "放課後の教室", "夜のコンビニ前", "雨のバス停", "電車のホーム", "夕焼けの河川敷", "商店街の路地", "ネオン街の交差点", "カフェの窓際席", "ベランダ・非常階段", "海沿いの防波堤", "波打ち際", "展望台", "夜の公園", "神社の境内", "祭りの帰り道", "古いアパートの廊下", "図書館の書架の間", "雨上がりの路地裏", "夕暮れの踏切"]
};

// 2. 変数管理
let categories, activeCats, themeData, selectionState;
let deleteTargetCat = null; // 削除対象の一時保存用
let resultsMap = {};
let currentIdx = 0;
let isSpinning = false;
let isPaused = false;
let isBatchRunning = false;
let activeRotation = 0;
let expandedStates = {};

// 3. ストレージ機能
function saveToStorage() {
    const data = { categories, themeData, selectionState };
    localStorage.setItem('daidamu_app_v2', JSON.stringify(data));
}

function loadFromStorage() {
    const saved = localStorage.getItem('daidamu_app_v2');
    if (saved) {
        const parsed = JSON.parse(saved);
        categories = parsed.categories;
        themeData = parsed.themeData;
        selectionState = parsed.selectionState;
        activeCats = [...defaultActiveCats].filter(c => categories.includes(c));
    } else {
        categories = [...defaultCategories];
        activeCats = [...defaultActiveCats];
        themeData = JSON.parse(JSON.stringify(defaultThemeData));
        selectionState = {};
        categories.forEach(c => { selectionState[c] = [...themeData[c]]; });
        saveToStorage();
    }
}

// 4. 描画ロジック
function draw(catName) {
    const bgCanvas = document.getElementById('wheel-bg-canvas');
    const textCanvas = document.getElementById('wheel-text-canvas');
    if (!bgCanvas) return;
    const bgCtx = bgCanvas.getContext('2d');
    const textCtx = textCanvas.getContext('2d');
    const items = (selectionState[catName] && selectionState[catName].length > 0) ? selectionState[catName] : ["EMPTY"];
    const total = items.length;
    const arc = (Math.PI * 2) / total;
    const colors = ['#e63946', '#1d3557', '#ffb703', '#1a1a1a', '#f1faee'];

    bgCanvas.style.transform = `rotate(${activeRotation}deg)`;
    bgCtx.clearRect(0, 0, 600, 600);
    textCtx.clearRect(0, 0, 600, 600);

    let lastColorIdx = -1;
    for (let i = 0; i < total; i++) {
        const angle = i * arc - Math.PI / 2;
        let colorIdx = i % colors.length;
        if (colorIdx === lastColorIdx) colorIdx = (colorIdx + 1) % colors.length;
        if (i === total - 1 && colorIdx === 0 && total > 1) colorIdx = (colorIdx + 1) % colors.length;
        lastColorIdx = colorIdx;
        const chosenColor = colors[colorIdx];

        bgCtx.beginPath(); bgCtx.moveTo(300, 300); bgCtx.arc(300, 300, 300, angle, angle + arc);
        bgCtx.fillStyle = chosenColor; bgCtx.fill(); bgCtx.strokeStyle = '#000'; bgCtx.lineWidth = 3; bgCtx.stroke();

        const currentTotalAngle = angle + arc / 2 + (activeRotation * Math.PI / 180);
        const tx = 300 + Math.cos(currentTotalAngle) * 210;
        const ty = 300 + Math.sin(currentTotalAngle) * 210;

        textCtx.save(); textCtx.translate(tx, ty); textCtx.textAlign = "center"; textCtx.textBaseline = "middle";
        textCtx.fillStyle = (chosenColor === '#f1faee' || chosenColor === '#ffb703') ? '#000' : '#fff';
        const text = items[i];
        let fontSize = (text.length > 12) ? 18 : 24;
        textCtx.font = `900 ${fontSize}px sans-serif`;

        if (text.includes(' × ')) {
            const parts = text.split(' × ');
            parts.forEach((p, pIdx) => {
                const offset = (pIdx - (parts.length - 1) / 2) * (fontSize + 5);
                textCtx.fillText(p, 0, offset);
            });
        } else { textCtx.fillText(text, 0, 0); }
        textCtx.restore();
    }
}

// 5. アニメーション制御
async function spin() {
    if (activeCats.length === 0) return;
    isSpinning = true;
    const cat = activeCats[currentIdx];
    const items = selectionState[cat];
    const stopIdx = Math.floor(Math.random() * items.length);
    const sectorAngle = 360 / items.length;
    const targetDeg = 360 - (sectorAngle * stopIdx + sectorAngle / 2);
    const startRot = activeRotation;
    const targetRot = (Math.ceil(startRot / 360) * 360) + 1440 + targetDeg;
    const duration = 1600;
    const startTime = performance.now();
    function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
    return new Promise(resolve => {
        function frame(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            activeRotation = startRot + (targetRot - startRot) * easeOut(progress);
            draw(cat);
            if (progress < 1) requestAnimationFrame(frame);
            else {
                resultsMap[cat] = items[stopIdx];
                renderSelectors();
                isSpinning = false;
                resolve();
            }
        }
        requestAnimationFrame(frame);
    });
}

async function handleSpin(mode) {
    if (isSpinning || activeCats.length === 0 || currentIdx >= activeCats.length) return;
    if (mode === 'all') {
        isBatchRunning = true; isPaused = false;
        document.getElementById('all-spin-btn').style.display = 'none';
        document.getElementById('pause-btn').style.display = 'block';
        while (currentIdx < activeCats.length && !isPaused) {
            await spin();
            currentIdx++;
            if (currentIdx < activeCats.length) draw(activeCats[currentIdx]);
        }
        if (currentIdx >= activeCats.length) {
            setTimeout(() => { showFinal(); resetBatchUI(); }, 600);
        }
    } else {
        isPaused = true; await spin(); currentIdx++;
        if (currentIdx < activeCats.length) draw(activeCats[currentIdx]); else showFinal();
    }
}

function togglePause() {
    isPaused = !isPaused;
    const pBtn = document.getElementById('pause-btn');
    pBtn.innerText = isPaused ? 'RESUME' : 'PAUSE';
    if (!isPaused && isBatchRunning) handleSpin('all');
}

// 6. UI制御
function renderSelectors() {
    const cont = document.getElementById('attr-selector');
    if (!cont) return;
    cont.innerHTML = '';
    activeCats.forEach(cat => {
        const wrap = document.createElement('div');
        wrap.className = 'tag-container';
        wrap.innerHTML = `<div class="attr-tag">${cat}</div><div class="result-label">${resultsMap[cat] || ""}</div>`;
        cont.appendChild(wrap);
    });
    const plusWrap = document.createElement('div');
    plusWrap.className = 'plus-wrap';
    plusWrap.innerHTML = `<div class="plus-btn" onclick="openAddCat()">+</div><div class="result-label"></div>`;
    cont.appendChild(plusWrap);
}

function openAddCat() {
    const cont = document.getElementById('add-cat-content');
    cont.innerHTML = '';
    categories.forEach(cat => {
        const isActive = activeCats.includes(cat);
        const item = document.createElement('div');
        item.className = `cat-manage-item ${isActive ? 'active' : 'inactive'}`;
        item.innerText = cat;
        item.onclick = () => {
            if (isActive) activeCats = activeCats.filter(c => c !== cat);
            else activeCats.push(cat);
            openAddCat(); renderSelectors(); resetWheel();
        };
        cont.appendChild(item);
    });
    document.getElementById('add-cat-overlay').style.display = 'flex';
}

function closeAddCat() { document.getElementById('add-cat-overlay').style.display = 'none'; }

function openOrder() {
    const cont = document.getElementById('order-content');
    cont.innerHTML = '';
    activeCats.forEach((cat, idx) => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `<span>${cat}</span><div class="order-btns"><button onclick="moveOrder(${idx},-1)">▲</button><button onclick="moveOrder(${idx},1)">▼</button></div>`;
        cont.appendChild(div);
    });
    document.getElementById('order-overlay').style.display = 'flex';
}

function moveOrder(idx, dir) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= activeCats.length) return;
    const temp = activeCats[idx]; activeCats[idx] = activeCats[newIdx]; activeCats[newIdx] = temp;
    openOrder();
}

function closeOrder() { document.getElementById('order-overlay').style.display = 'none'; renderSelectors(); resetWheel(); }

// カスタムアラートの制御
function closeConfirm() {
    document.getElementById('confirm-overlay').style.display = 'none';
    deleteTargetCat = null;
}

function deleteCategory(cat) {
    deleteTargetCat = cat;
    document.getElementById('confirm-msg').innerText = `Are you sure you want to delete "${cat}"?`;
    document.getElementById('confirm-overlay').style.display = 'flex';

    document.getElementById('confirm-yes').onclick = () => {
        const target = deleteTargetCat;
        activeCats = activeCats.filter(c => c !== target);
        categories = categories.filter(c => c !== target);
        delete themeData[target];
        delete selectionState[target];

        saveToStorage();
        closeConfirm();
        openEdit();
    };
}

function openEdit() {
    const cont = document.getElementById('edit-content');
    cont.innerHTML = '';
    categories.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'edit-item';
        div.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><strong>${cat}</strong><button onclick="deleteCategory('${cat}')" style="font-size:0.65rem; background:#000; color:#fff; border:none; padding:5px 10px; font-weight:900; cursor:pointer;">DELETE</button></div>`;
        const tagList = document.createElement('div');
        tagList.className = 'tag-list' + (themeData[cat].length > 10 && !expandedStates[cat] ? ' collapsed' : '');
        themeData[cat].forEach((el, i) => {
            const isSel = selectionState[cat].includes(el);
            const span = document.createElement('span');
            span.className = `tag ${isSel ? 'selected' : ''}`;
            span.innerHTML = `${el}<span class="del-el" onclick="event.stopPropagation(); deleteElement('${cat}', ${i})">×</span>`;
            span.onclick = () => {
                if (isSel) selectionState[cat] = selectionState[cat].filter(v => v !== el);
                else selectionState[cat].push(el);
                saveToStorage(); openEdit();
            };
            tagList.appendChild(span);
        });
        div.appendChild(tagList);
        if (themeData[cat].length > 10) {
            const b = document.createElement('button');
            b.className = 'expand-trigger'; b.innerText = expandedStates[cat] ? '▲ CLOSE' : '▼ VIEW ALL';
            b.onclick = () => { expandedStates[cat] = !expandedStates[cat]; openEdit(); };
            div.appendChild(b);
        }
        const ig = document.createElement('div'); ig.className = 'input-group';
        ig.innerHTML = `<input type="text" id="add-in-${cat}" placeholder="NEW ITEM"><button onclick="addElement('${cat}')">ADD</button>`;
        div.appendChild(ig); cont.appendChild(div);
    });
    document.getElementById('edit-overlay').style.display = 'flex';
}

function addCategory() {
    const n = document.getElementById('new-cat-name').value.trim();
    if (n && !categories.includes(n)) {
        categories.push(n); themeData[n] = ["ITEM 1"]; selectionState[n] = ["ITEM 1"];
        document.getElementById('new-cat-name').value = '';
        saveToStorage(); openEdit();
    }
}
function addElement(cat) {
    const v = document.getElementById('add-in-' + cat).value.trim();
    if (v) { themeData[cat].push(v); if (!selectionState[cat].includes(v)) selectionState[cat].push(v); saveToStorage(); openEdit(); }
}
function deleteElement(cat, i) {
    const val = themeData[cat][i]; themeData[cat].splice(i, 1);
    selectionState[cat] = selectionState[cat].filter(v => v !== val);
    saveToStorage(); openEdit();
}

function resetBatchUI() { isBatchRunning = false; isPaused = false; document.getElementById('all-spin-btn').style.display = 'block'; document.getElementById('pause-btn').style.display = 'none'; }
function resetWheel() { currentIdx = 0; activeRotation = 0; resultsMap = {}; renderSelectors(); resetBatchUI(); if (activeCats.length > 0) draw(activeCats[0]); }
function closeEdit() { document.getElementById('edit-overlay').style.display = 'none'; renderSelectors(); resetWheel(); }
function closeResult() { document.getElementById('result-overlay').style.display = 'none'; resetWheel(); }
function showFinal() {
    const grid = document.getElementById('final-results');
    grid.innerHTML = activeCats.map(c => `<div class="res-item"><b>${c}</b><div>${resultsMap[c] || '---'}</div></div>`).join('');
    document.getElementById('result-overlay').style.display = 'flex';
}

// 7. 起動・登録処理
window.addEventListener('load', () => {
    loadFromStorage();
    renderSelectors();
    if (activeCats.length > 0) draw(activeCats[0]);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => console.log(err));
    }
});
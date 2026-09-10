// ================================================================
// 0. FIREBASE CONFIGURATION
// ================================================================
const firebaseConfig = {
  apiKey: "AIzaSyCs0eFfBQO2vt97siWuNrIu_DCztnrJ9tk",
  authDomain: "flock-268bc.firebaseapp.com",
  projectId: "flock-268bc",
  storageBucket: "flock-268bc.firebasestorage.app",
  messagingSenderId: "957965944461",
  appId: "1:957965944461:web:59d0e5403af2d06a44c4c4",
  measurementId: "G-6QJG5RYZ5H"
};

let db = null, collectionRef = null, isFirebaseReady = false;

function updateFirebaseStatus(state, text) {
    const el = document.getElementById('firebaseStatus');
    if (!el) return;
    el.className = 'firebase-status ' + state;
    el.textContent = text;
}

function initFirebase() {
    const isDummy = !firebaseConfig.apiKey || firebaseConfig.apiKey === "AIzaSyDummyKeyReplaceThisWithYourOwn" || firebaseConfig.projectId === "your-project-id";
    if (typeof firebase === 'undefined') {
        console.warn('⚠️ Firebase SDK غير محمّل');
        updateFirebaseStatus('offline', '🟠 محلي (لا SDK)');
        isFirebaseReady = false;
        return false;
    }
    if (isDummy) {
        console.warn('⚠️ Firebase: مفتاح وهمي. وضع LocalStorage.');
        updateFirebaseStatus('offline', '🟠 محلي');
        isFirebaseReady = false;
        return false;
    }
    try {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        try { db.settings({ ignoreUndefinedProperties: true }); } catch (e) {}
        collectionRef = db.collection('sheep');
        isFirebaseReady = true;
        updateFirebaseStatus('online', '🟢 Firebase');
        console.log('✅ Firebase متصل');
        return true;
    } catch (err) {
        console.error('❌ فشل تهيئة Firebase:', err);
        updateFirebaseStatus('error', '🔴 خطأ Firebase');
        isFirebaseReady = false;
        db = null; collectionRef = null;
        return false;
    }
}
initFirebase();

const DEFAULT_DATA = [
    { id:'01', name:'العيابة', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'خروفة جات معاها ماتت', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف',date:'1/2025',notes:''},{type:'خروفة',date:'11/2025',notes:''},{type:'خروف',date:'06/2025',notes:''}], vaccines:[] },
    { id:'02', name:'الجربة (غليزان)', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف',date:'3/2025',notes:''},{type:'خروف',date:'10/2025',notes:''}], vaccines:[] },
    { id:'03', name:'الكبيرة البيضة', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'بيضاء', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروفة كبيرة',date:'12/2024',notes:''},{type:'خروف',date:'7/2025',notes:''}], vaccines:[] },
    { id:'04', name:'الحلابة', type:'نعجة', gender:'أنثى', birth:'', status:'ماتت', notes:'ماتت في مارس 2026 - ولد كبش مباع 85000', color:'', breed:'', weight:0, price:0, salePrice:85000, financeNotes:'ولد كبش مباع 85000', kids:[{type:'ولد كبش (مباع)',date:'4/2024',notes:'مباع'},{type:'نعجة',date:'10/2024',notes:''},{type:'خروفة',date:'12/2025',notes:''},{type:'خروف',date:'12/2025',notes:''}], vaccines:[] },
    { id:'05', name:'المروية (ماتت)', type:'نعجة', gender:'أنثى', birth:'', status:'ماتت', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف',date:'10/2025',notes:''}], vaccines:[] },
    { id:'07', name:'مولات القملة', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف',date:'10/2025',notes:''}], vaccines:[] },
    { id:'08', name:'الكبيرة الحمرة (غليزان)', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'الكبش ليمات جا معاها 3.000.000', color:'حمراء', breed:'', weight:0, price:3000000, salePrice:0, financeNotes:'الكبش ليمات 3.000.000', kids:[{type:'خروفة',date:'5/2025',notes:''},{type:'خروفة',date:'2/2026',notes:''}], vaccines:[] },
    { id:'09', name:'الصافية', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف',date:'2/2026',notes:''}], vaccines:[] },
    { id:'10', name:'الكبيرة بحيلو', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف',date:'2/2026',notes:''}], vaccines:[] },
    { id:'11', name:'تاع عائشة', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف',date:'1/2026',notes:''}], vaccines:[] },
    { id:'12', name:'الموسخة', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروفة',date:'9/2025',notes:''},{type:'خروفة',date:'2/2026',notes:''}], vaccines:[] },
    { id:'13', name:'الزليطة من الراس', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروفة',date:'10/2025',notes:''},{type:'خروف (جوان 2026)',date:'جوان 2026',notes:''}], vaccines:[] },
    { id:'14', name:'رخلة', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'بنت الحمرا', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروفة (بنت الحمرا)',date:'5/2025',notes:''},{type:'خروف (جوان 2026)',date:'جوان 2026',notes:''}], vaccines:[] },
    { id:'15', name:'المتاومة الجربة (باريقو)', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'توأم', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف + خروفة (توأم)',date:'02/2026',notes:'توأم'}], vaccines:[] },
    { id:'16', name:'رخلة بنت', type:'نعجة', gender:'أنثى', birth:'', status:'حية', notes:'البيضة الكبيرة 12/2024', color:'', breed:'', weight:0, price:0, salePrice:0, financeNotes:'', kids:[{type:'خروف + خروفة',date:'22/08/2026',notes:''}], vaccines:[] },
];

let sheepData = [], filteredData = [], currentView = 'grid', unsubscribeSnapshot = null;
let charts = {};
let settings = { currency: 'دج', soundAlerts: true, alertDays: 7 };
// مصدر البيانات الحالي: 'firebase' | 'local' — يمنع أي اختلاط بين المصدرين
let dataSource = 'local';

// ================================================================
// 1. UTILITY FUNCTIONS
// ================================================================
function normalizeSheep(s) {
    return { ...s, kids: s.kids||[], vaccines: s.vaccines||[], price: Number(s.price)||0, salePrice: Number(s.salePrice)||0, color: s.color||'', breed: s.breed||'', weight: Number(s.weight)||0, financeNotes: s.financeNotes||'' };
}
function formatMoney(n) { if (!n || n===0) return '0'; return Number(n).toLocaleString('ar-DZ'); }
function getStatusClass(status) { if (status==='حية') return 'status-alive'; if (status==='ماتت') return 'status-dead'; if (status==='مباعة') return 'status-sold'; return ''; }
function getAge(birth) {
    if (!birth) return 0;
    const b = new Date(birth);
    const now = new Date();
    let months = (now.getFullYear() - b.getFullYear()) * 12 + (now.getMonth() - b.getMonth());
    return months < 0 ? 0 : months;
}
function getSheepSVG(color='#f5efe6', accent='#c9a84c') {
    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="55" fill="${color}" stroke="${accent}" stroke-width="3"/>
        <ellipse cx="60" cy="70" rx="30" ry="22" fill="#fff" stroke="#d5c8b8" stroke-width="2"/>
        <ellipse cx="60" cy="50" rx="18" ry="18" fill="#fff" stroke="#d5c8b8" stroke-width="2"/>
        <circle cx="60" cy="35" r="14" fill="#f0ebe4" stroke="#d5c8b8" stroke-width="2"/>
        <ellipse cx="45" cy="32" rx="6" ry="3" fill="#e8d5a3" transform="rotate(-20 45 32)"/>
        <ellipse cx="75" cy="32" rx="6" ry="3" fill="#e8d5a3" transform="rotate(20 75 32)"/>
        <circle cx="54" cy="33" r="2.5" fill="#1e2a2a"/><circle cx="66" cy="33" r="2.5" fill="#1e2a2a"/>
        <circle cx="54" cy="32" r="1" fill="white"/><circle cx="66" cy="32" r="1" fill="white"/>
        <ellipse cx="60" cy="39" rx="3" ry="1.5" fill="#c9a84c"/>
        <path d="M48 28 Q42 15 35 20" stroke="#8b7a66" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M72 28 Q78 15 85 20" stroke="#8b7a66" stroke-width="3" fill="none" stroke-linecap="round"/>
        <rect x="46" y="88" width="5" height="18" rx="2" fill="#d5c8b8"/><rect x="55" y="88" width="5" height="18" rx="2" fill="#d5c8b8"/>
        <rect x="65" y="88" width="5" height="18" rx="2" fill="#d5c8b8"/><rect x="74" y="88" width="5" height="18" rx="2" fill="#d5c8b8"/>
        <ellipse cx="60" cy="94" rx="6" ry="8" fill="#e8d5a3" transform="rotate(180 60 94)"/>
    </svg>`;
}

// ================================================================
// 2. DATA MANAGEMENT
// ================================================================
function loadData() {
    if (isFirebaseReady && collectionRef) {
        dataSource = 'firebase';
        // عند الاتصال بـ Firebase نمسح بيانات LocalStorage الخاصة بالقطيع لمنع أي اختلاط لاحق
        try { localStorage.removeItem('sheepFarmData'); } catch (e) {}
        if (unsubscribeSnapshot) unsubscribeSnapshot();
        unsubscribeSnapshot = collectionRef.onSnapshot((snapshot) => {
            // لا نزرع DEFAULT_DATA تلقائياً أبداً — نبدأ فارغاً أو نحمّل الموجود فقط
            sheepData = [];
            snapshot.forEach(doc => sheepData.push(normalizeSheep({ ...doc.data(), firebaseId: doc.id })));
            afterDataLoad();
        }, (error) => {
            console.error('❌ خطأ Firestore:', error);
            updateFirebaseStatus('error', '🔴 خطأ اتصال');
            // عند فشل الاتصال ننتقل إلى LocalStorage فقط (بدون خلط)
            dataSource = 'local';
            loadFromLocalStorage();
        });
    } else {
        dataSource = 'local';
        loadFromLocalStorage();
    }
}

function loadFromLocalStorage() {
    dataSource = 'local';
    const stored = localStorage.getItem('sheepFarmData');
    if (stored) {
        try {
            sheepData = JSON.parse(stored).map(normalizeSheep);
        } catch (e) {
            console.warn('فشل قراءة LocalStorage، نبدأ ببيانات فارغة');
            sheepData = [];
        }
    } else {
        // لا نزرع DEFAULT_DATA تلقائياً — القطيع يبدأ فارغاً حتى يضيف المستخدم
        sheepData = [];
    }
    afterDataLoad();
}

function afterDataLoad() {
    filterData(); renderView(); calcStats(); updateCharts(); renderVaccinesTab(); renderFinanceTab(); renderAnalytics(); generateAlerts(); updateBreedFilter();
}

function saveToLocalStorage() {
    // لا نحفظ في LocalStorage إلا إذا كنا في وضع local فقط
    if (dataSource !== 'local') return;
    localStorage.setItem('sheepFarmData', JSON.stringify(sheepData));
}

function saveSheepToFirebase(item) {
    if (dataSource === 'firebase' && isFirebaseReady && collectionRef) {
        return collectionRef.where('id', '==', item.id).get().then(snap => {
            if (snap.empty) return collectionRef.add(item);
            return snap.docs[0].ref.update(item);
        }).catch(console.error);
    }
    return Promise.resolve();
}

function deleteSheepFromFirebase(id) {
    if (dataSource === 'firebase' && isFirebaseReady && collectionRef) {
        return collectionRef.where('id', '==', id).get().then(snap => snap.forEach(d => d.ref.delete())).catch(console.error);
    }
    return Promise.resolve();
}

/**
 * استيراد البيانات الافتراضية الحقيقية (16 رأس فقط) — يُستدعى يدوياً عند الحاجة
 * لا يعمل تلقائياً أبداً لتجنب إضافة خرفان عشوائية
 */
function importDefaultData() {
    if (!confirm('هل تريد استيراد البيانات الافتراضية (16 رأس حقيقية فقط)؟\nسيتم إضافة الرؤوس غير الموجودة حالياً فقط.')) return;
    const existingIds = new Set(sheepData.map(s => s.id));
    const toAdd = DEFAULT_DATA.filter(d => !existingIds.has(d.id));
    if (toAdd.length === 0) {
        alert('جميع البيانات الافتراضية موجودة مسبقاً.');
        return;
    }
    if (dataSource === 'firebase' && isFirebaseReady && collectionRef) {
        Promise.all(toAdd.map(item => collectionRef.add(item))).then(() => {
            alert(`تم استيراد ${toAdd.length} رأس بنجاح عبر Firebase.`);
        }).catch(err => {
            console.error(err);
            alert('حدث خطأ أثناء الاستيراد.');
        });
    } else {
        toAdd.forEach(item => sheepData.push(normalizeSheep(item)));
        saveToLocalStorage();
        afterDataLoad();
        alert(`تم استيراد ${toAdd.length} رأس محلياً.`);
    }
}

/**
 * تنظيف الخرفان العشوائية / غير المسجلة / المكررة (مثل "غير مسجل" و 26b/26c)
 * يعمل على المصدر الحالي فقط
 */
function cleanupRandomSheep() {
    const isJunk = (s) => {
        const name = (s.name || '').trim();
        return name.startsWith('غير مسجل') || name === 'مكرر 26' || s.id === '26b' || s.id === '26c' ||
               /^غير مسجل/.test(name) || (name.includes('مكرر') && !name.includes('رخلة'));
    };
    const junk = sheepData.filter(isJunk);
    if (junk.length === 0) {
        alert('لا توجد خرفان عشوائية للحذف.');
        return;
    }
    if (!confirm(`سيتم حذف ${junk.length} رأس عشوائي/غير مسجل. هل أنت متأكد؟`)) return;

    if (dataSource === 'firebase' && isFirebaseReady && collectionRef) {
        Promise.all(junk.map(s => deleteSheepFromFirebase(s.id))).then(() => {
            alert(`تم حذف ${junk.length} رأس من Firebase.`);
        }).catch(console.error);
    } else {
        sheepData = sheepData.filter(s => !isJunk(s));
        saveToLocalStorage();
        afterDataLoad();
        alert(`تم حذف ${junk.length} رأس محلياً.`);
    }
}

// ================================================================
// 3. STATS & CHARTS
// ================================================================
function calcStats() {
    const total = sheepData.length;
    const males = sheepData.filter(s => s.gender==='ذكر').length;
    const females = sheepData.filter(s => s.gender==='أنثى').length;
    const alive = sheepData.filter(s => s.status==='حية').length;
    const dead = sheepData.filter(s => s.status==='ماتت' || s.status==='مباعة').length;
    let kidsCount = 0; sheepData.forEach(s => { kidsCount += (s.kids||[]).length; });
    const aliveValue = sheepData.filter(s => s.status==='حية').reduce((sum,s) => sum+(s.price||0), 0);
    const upcoming = countUpcomingVaccines();
    const avgWeight = sheepData.filter(s => s.weight>0).reduce((s,x) => s+x.weight, 0) / (sheepData.filter(s => s.weight>0).length || 1);
    const breeds = new Set(sheepData.map(s => s.breed).filter(Boolean));
    const avgAge = sheepData.map(s => getAge(s.birth)).reduce((a,b) => a+b, 0) / (sheepData.filter(s => s.birth).length || 1);
    const ratio = total ? ((females/total)*100).toFixed(1) : 0;

    const el = id => document.getElementById(id);
    if (el('totalSheep')) el('totalSheep').textContent = total;
    if (el('totalMales')) el('totalMales').textContent = males;
    if (el('totalFemales')) el('totalFemales').textContent = females;
    if (el('totalAlive')) el('totalAlive').textContent = alive;
    if (el('totalDead')) el('totalDead').textContent = dead;
    if (el('totalKids')) el('totalKids').textContent = kidsCount;
    if (el('totalValue')) el('totalValue').textContent = formatMoney(aliveValue);
    if (el('upcomingVaccines')) el('upcomingVaccines').textContent = upcoming;
    if (el('genderRatio')) el('genderRatio').textContent = ratio + '%';
    if (el('avgWeight')) el('avgWeight').textContent = avgWeight.toFixed(1);
    if (el('breedCount')) el('breedCount').textContent = breeds.size;
    if (el('avgAge')) el('avgAge').textContent = avgAge.toFixed(1);
}

function countUpcomingVaccines() {
    const today = new Date(); today.setHours(0,0,0,0);
    let count = 0;
    sheepData.forEach(s => { (s.vaccines||[]).forEach(v => { if (v.nextDate) { const d = new Date(v.nextDate); if (d >= today) count++; } }); });
    return count;
}

function destroyChart(key) { if (charts[key]) { charts[key].destroy(); charts[key]=null; } }

function updateCharts() {
    if (typeof Chart==='undefined') return;
    const isDark = document.documentElement.getAttribute('data-theme')==='dark';
    const textColor = isDark ? '#ece3d9' : '#1e2a2a';
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Cairo', sans-serif";

    const males = sheepData.filter(s => s.gender==='ذكر').length;
    const females = sheepData.filter(s => s.gender==='أنثى').length;
    destroyChart('gender');
    const gCtx = document.getElementById('genderChart');
    if (gCtx) charts.gender = new Chart(gCtx, { type:'doughnut', data:{ labels:['ذكور','إناث'], datasets:[{ data:[males,females], backgroundColor:['#3b82f6','#ec4899'], borderWidth:0 }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' } } } });

    const alive = sheepData.filter(s => s.status==='حية').length;
    const dead = sheepData.filter(s => s.status==='ماتت').length;
    const sold = sheepData.filter(s => s.status==='مباعة').length;
    destroyChart('status');
    const sCtx = document.getElementById('statusChart');
    if (sCtx) charts.status = new Chart(sCtx, { type:'doughnut', data:{ labels:['حية','ماتت','مباعة'], datasets:[{ data:[alive,dead,sold], backgroundColor:['#22c55e','#ef4444','#f59e0b'], borderWidth:0 }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' } } } });

    const types = {}; sheepData.forEach(s => { types[s.type]=(types[s.type]||0)+1; });
    destroyChart('type');
    const tCtx = document.getElementById('typeChart');
    if (tCtx) charts.type = new Chart(tCtx, { type:'bar', data:{ labels:Object.keys(types), datasets:[{ label:'العدد', data:Object.values(types), backgroundColor:'#c9a84c', borderRadius:8 }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, grid:{ color:gridColor }, ticks:{ stepSize:1 } }, x:{ grid:{ display:false } } } } });

    const years = {};
    sheepData.forEach(s => { (s.kids||[]).forEach(k => { const m=String(k.date||'').match(/20\d{2}/); const y=m?m[0]:'غير محدد'; years[y]=(years[y]||0)+1; }); });
    const sortedYears = Object.keys(years).sort();
    destroyChart('births');
    const bCtx = document.getElementById('birthsChart');
    if (bCtx) charts.births = new Chart(bCtx, { type:'bar', data:{ labels:sortedYears, datasets:[{ label:'عدد الولادات', data:sortedYears.map(y=>years[y]), backgroundColor:'#1e7b4a', borderRadius:8 }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, grid:{ color:gridColor }, ticks:{ stepSize:1 } }, x:{ grid:{ display:false } } } } });
}

// ================================================================
// 4. FILTER & VIEW
// ================================================================
function filterData() {
    const searchEl = document.getElementById('searchInput');
    const statusEl = document.getElementById('statusFilter');
    const typeEl = document.getElementById('typeFilter');
    const breedEl = document.getElementById('breedFilter');
    const priceMin = parseFloat(document.getElementById('priceMin')?.value) || 0;
    const priceMax = parseFloat(document.getElementById('priceMax')?.value) || Infinity;
    if (!searchEl) return;
    const search = searchEl.value.toLowerCase();
    const status = statusEl.value;
    const type = typeEl.value;
    const breed = breedEl?.value || 'all';
    filteredData = sheepData.filter(s => {
        const matchSearch = (s.name||'').toLowerCase().includes(search) || (s.id||'').includes(search);
        const matchStatus = status==='all' || s.status===status;
        const matchType = type==='all' || s.type===type;
        const matchBreed = breed==='all' || s.breed===breed;
        const matchPrice = (s.price||0) >= priceMin && (s.price||0) <= priceMax;
        return matchSearch && matchStatus && matchType && matchBreed && matchPrice;
    });
    renderView();
}

function updateBreedFilter() {
    const sel = document.getElementById('breedFilter');
    if (!sel) return;
    const breeds = new Set(sheepData.map(s => s.breed).filter(Boolean));
    const current = sel.value;
    sel.innerHTML = '<option value="all">جميع السلالات</option>' + Array.from(breeds).map(b => `<option value="${b}">${b}</option>`).join('');
    sel.value = current;
}

function renderView() {
    if (currentView==='grid') renderGrid(); else renderTable();
    calcStats();
}

function renderGrid() {
    const container = document.getElementById('gridContainer');
    if (!container) return;
    if (filteredData.length===0) { container.innerHTML = `<div class="empty-state"><i class="fas fa-sheep"></i> لا توجد نتائج مطابقة</div>`; return; }
    container.innerHTML = filteredData.map(s => {
        const kidsCount = (s.kids||[]).length;
        const vacCount = (s.vaccines||[]).length;
        const svg = getSheepSVG();
        return `<div class="sheep-card" onclick="showDetail('${s.id}')">
            <div class="card-img">${svg}<span class="card-badge-status ${getStatusClass(s.status)}">${s.status}</span></div>
            <div class="card-body">
                <h3>${s.name}</h3>
                <div class="subtitle"><span>#${s.id}</span> <span>${s.type}</span></div>
                <div class="info-row"><span><i class="fas fa-baby"></i> النسل</span> <span>${kidsCount}</span></div>
                <div class="info-row"><span><i class="fas fa-syringe"></i> تلقيح</span> <span>${vacCount}</span></div>
                <div class="info-row"><span><i class="fas fa-weight"></i> الوزن</span> <span>${s.weight||'—'}</span></div>
                <div class="info-row"><span><i class="fas fa-coins"></i> السعر</span> <span>${s.price ? formatMoney(s.price) : '—'}</span></div>
                <button class="btn btn-primary" onclick="event.stopPropagation(); showDetail('${s.id}')"><i class="fas fa-eye"></i> تفاصيل</button>
            </div>
        </div>`;
    }).join('');
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    if (filteredData.length===0) { tbody.innerHTML = `<tr><td colspan="10" class="empty-state">لا توجد نتائج</td></tr>`; return; }
    tbody.innerHTML = filteredData.map(s => {
        const kidsCount = (s.kids||[]).length;
        const vacCount = (s.vaccines||[]).length;
        return `<tr>
            <td><strong>#${s.id}</strong></td><td>${s.name}</td><td>${s.type}</td><td>${s.breed||'—'}</td><td>${s.weight||'—'}</td>
            <td><span class="${getStatusClass(s.status)}" style="padding:4px 14px;border-radius:30px;color:white;font-weight:700;font-size:12px;">${s.status}</span></td>
            <td>${kidsCount}</td><td>${s.price ? formatMoney(s.price) : '—'}</td><td>${vacCount}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="showDetail('${s.id}')"><i class="fas fa-eye"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteSheep('${s.id}')"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`;
    }).join('');
}

function setView(view) {
    currentView = view;
    const grid = document.getElementById('gridContainer');
    const table = document.getElementById('tableContainer');
    if (grid) grid.style.display = view==='grid' ? 'grid' : 'none';
    if (table) table.style.display = view==='list' ? 'block' : 'none';
    document.getElementById('gridViewBtn').className = view==='grid' ? 'active' : '';
    document.getElementById('listViewBtn').className = view==='list' ? 'active' : '';
    renderView();
}

function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    const content = document.getElementById('tab-'+tab);
    if (content) content.classList.add('active');
    const btn = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
    if (btn) btn.classList.add('active');
    if (tab==='dashboard') { updateCharts(); generateAlerts(); }
    if (tab==='vaccines') renderVaccinesTab();
    if (tab==='finance') renderFinanceTab();
    if (tab==='analytics') renderAnalytics();
    if (tab==='flock') renderView();
}

// ================================================================
// 5. DETAIL MODAL
// ================================================================
function showDetail(id) {
    const s = sheepData.find(d => d.id===id);
    if (!s) return;
    const kidsHtml = (s.kids||[]).length > 0
        ? s.kids.map((k,i) => `<span class="kid-chip">${k.type} (${k.date})${k.notes?' - '+k.notes:''} <button onclick="event.stopPropagation();removeKid('${s.id}',${i})" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:14px;">×</button></span>`).join('')
        : '<span style="color:var(--text-secondary)">لا يوجد نسل مسجل</span>';
    const vacHtml = (s.vaccines||[]).length > 0
        ? s.vaccines.map((v,i) => {
            const overdue = v.nextDate && new Date(v.nextDate) < new Date();
            return `<span class="vac-chip" style="${overdue?'border-color:#ef4444;':''}">${v.name} | ${v.date}${v.nextDate?' → '+v.nextDate:''} <button onclick="event.stopPropagation();removeVaccine('${s.id}',${i})" style="background:none;border:none;color:#ef4444;cursor:pointer;">×</button></span>`;
        }).join('')
        : '<span style="color:var(--text-secondary)">لا يوجد تلقيحات مسجلة</span>';

    document.getElementById('detailContent').innerHTML = `
        <h2>${s.name} <span style="font-size:16px;color:var(--text-secondary);font-weight:400;">#${s.id}</span></h2>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
            <span class="${getStatusClass(s.status)}" style="padding:5px 16px;border-radius:30px;color:white;font-weight:700;font-size:13px;">${s.status}</span>
            <span style="background:var(--bg-body);padding:5px 16px;border-radius:30px;font-size:13px;">${s.type}</span>
            <span style="background:var(--bg-body);padding:5px 16px;border-radius:30px;font-size:13px;">${s.gender}</span>
            ${s.color?`<span style="background:var(--bg-body);padding:5px 16px;border-radius:30px;font-size:13px;">${s.color}</span>`:''}
            ${s.breed?`<span style="background:var(--bg-body);padding:5px 16px;border-radius:30px;font-size:13px;">${s.breed}</span>`:''}
            ${s.weight?`<span style="background:var(--bg-body);padding:5px 16px;border-radius:30px;font-size:13px;">${s.weight} كغ</span>`:''}
        </div>
        <div class="detail-tabs">
            <button class="detail-tab active" onclick="switchDetailTab(this,'info')">البيانات</button>
            <button class="detail-tab" onclick="switchDetailTab(this,'kids')">النسل (${(s.kids||[]).length})</button>
            <button class="detail-tab" onclick="switchDetailTab(this,'vaccines')">التلقيح (${(s.vaccines||[]).length})</button>
            <button class="detail-tab" onclick="switchDetailTab(this,'finance')">المالية</button>
        </div>
        <div id="panel-info" class="detail-panel active">
            <div class="detail-grid">
                <div class="detail-item"><strong>تاريخ الميلاد:</strong> ${s.birth||'غير محدد'}</div>
                <div class="detail-item"><strong>العمر:</strong> ${getAge(s.birth)} شهر</div>
                <div class="detail-item"><strong>اللون:</strong> ${s.color||'—'}</div>
                <div class="detail-item"><strong>السلالة:</strong> ${s.breed||'—'}</div>
                <div class="detail-item"><strong>الوزن:</strong> ${s.weight||'—'} كغ</div>
                <div class="detail-item" style="grid-column:span 2;"><strong>الملاحظات:</strong> ${s.notes||'لا يوجد'}</div>
            </div>
        </div>
        <div id="panel-kids" class="detail-panel">
            <div style="margin-bottom:12px;"><button class="btn btn-primary btn-sm" onclick="openKidModal('${s.id}')"><i class="fas fa-plus"></i> إضافة نسل</button></div>
            <div class="kids-list">${kidsHtml}</div>
        </div>
        <div id="panel-vaccines" class="detail-panel">
            <div style="margin-bottom:12px;"><button class="btn btn-primary btn-sm" onclick="openVaccineModal('${s.id}')"><i class="fas fa-plus"></i> إضافة تلقيح</button></div>
            <div class="vaccines-list">${vacHtml}</div>
        </div>
        <div id="panel-finance" class="detail-panel">
            <div class="detail-grid">
                <div class="detail-item"><strong>سعر الشراء:</strong> ${s.price?formatMoney(s.price)+' دج':'—'}</div>
                <div class="detail-item"><strong>سعر البيع:</strong> ${s.salePrice?formatMoney(s.salePrice)+' دج':'—'}</div>
                <div class="detail-item"><strong>الربح:</strong> ${s.salePrice&&s.price?formatMoney(s.salePrice-s.price)+' دج':'—'}</div>
                <div class="detail-item" style="grid-column:span 2;"><strong>ملاحظات مالية:</strong> ${s.financeNotes||'—'}</div>
            </div>
        </div>
        <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn btn-danger" onclick="deleteSheep('${s.id}');closeModal();"><i class="fas fa-trash-alt"></i> حذف</button>
            <button class="btn btn-primary" onclick="editSheep('${s.id}');closeModal();"><i class="fas fa-edit"></i> تعديل</button>
        </div>`;
    document.getElementById('detailModal').classList.add('active');
}

function switchDetailTab(btn, panel) {
    document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.detail-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const el = document.getElementById('panel-'+panel);
    if (el) el.classList.add('active');
}
function closeModal() { document.getElementById('detailModal').classList.remove('active'); }

// ================================================================
// 6. CRUD OPERATIONS
// ================================================================
function openAddModal() {
    document.getElementById('addModalTitle').textContent = 'تسجيل رأس جديد';
    document.getElementById('editId').value = '';
    document.getElementById('addForm').reset();
    document.getElementById('addModal').classList.add('active');
}
function closeAddModal() { document.getElementById('addModal').classList.remove('active'); }

function editSheep(id) {
    const s = sheepData.find(d => d.id===id);
    if (!s) return;
    document.getElementById('addModalTitle').textContent = 'تعديل البيانات';
    document.getElementById('editId').value = id;
    document.getElementById('fTag').value = s.id;
    document.getElementById('fName').value = s.name;
    document.getElementById('fType').value = s.type;
    document.getElementById('fGender').value = s.gender;
    document.getElementById('fBirth').value = s.birth||'';
    document.getElementById('fStatus').value = s.status;
    document.getElementById('fColor').value = s.color||'';
    document.getElementById('fBreed').value = s.breed||'';
    document.getElementById('fWeight').value = s.weight||'';
    document.getElementById('fPrice').value = s.price||'';
    document.getElementById('fSalePrice').value = s.salePrice||'';
    document.getElementById('fFinanceNotes').value = s.financeNotes||'';
    document.getElementById('fNotes').value = s.notes||'';
    document.getElementById('addModal').classList.add('active');
}

function saveSheep(e) {
    e.preventDefault();
    const editId = document.getElementById('editId').value;
    const id = editId || document.getElementById('fTag').value.trim();
    const name = document.getElementById('fName').value.trim();
    const type = document.getElementById('fType').value;
    const gender = document.getElementById('fGender').value;
    const birth = document.getElementById('fBirth').value;
    const status = document.getElementById('fStatus').value;
    const color = document.getElementById('fColor').value.trim();
    const breed = document.getElementById('fBreed').value.trim();
    const weight = Number(document.getElementById('fWeight').value)||0;
    const price = Number(document.getElementById('fPrice').value)||0;
    const salePrice = Number(document.getElementById('fSalePrice').value)||0;
    const financeNotes = document.getElementById('fFinanceNotes').value.trim();
    const notes = document.getElementById('fNotes').value.trim();
    if (!id || !name) { alert('الرجاء إدخال الرقم والاسم'); return; }
    const existing = sheepData.find(s => s.id===id && s.id!==editId);
    if (existing) { alert('هذا الرقم موجود مسبقاً!'); return; }
    const oldItem = sheepData.find(s => s.id===(editId||id));
    const newItem = { id, name, type, gender, birth, status, color, breed, weight, price, salePrice, financeNotes, notes, kids: oldItem?(oldItem.kids||[]):[], vaccines: oldItem?(oldItem.vaccines||[]):[] };
    saveSheepToFirebase(newItem).then(() => {
        if (dataSource === 'local') {
            if (editId) { const index = sheepData.findIndex(s => s.id===editId); if (index>-1) sheepData[index]=newItem; }
            else sheepData.push(newItem);
            saveToLocalStorage(); afterDataLoad();
        }
        // في وضع Firebase الـ onSnapshot يحدّث البيانات تلقائياً
        closeAddModal();
    }).catch(err => { alert('حدث خطأ في حفظ البيانات'); console.error(err); });
}

function deleteSheep(id) {
    if (!confirm(`هل أنت متأكد من حذف #${id}؟`)) return;
    deleteSheepFromFirebase(id).then(() => {
        if (dataSource === 'local') {
            sheepData = sheepData.filter(s => s.id!==id);
            saveToLocalStorage();
            afterDataLoad();
        }
        closeModal();
    }).catch(err => { alert('خطأ في الحذف'); console.error(err); });
}

// ================================================================
// 7. KIDS & VACCINES
// ================================================================
function openKidModal(parentId) {
    document.getElementById('kidParentId').value = parentId;
    document.getElementById('kidForm').reset();
    document.getElementById('kidModal').classList.add('active');
}
function closeKidModal() { document.getElementById('kidModal').classList.remove('active'); }

function saveKid(e) {
    e.preventDefault();
    const parentId = document.getElementById('kidParentId').value;
    const type = document.getElementById('kidType').value;
    const date = document.getElementById('kidDate').value.trim();
    const notes = document.getElementById('kidNotes').value.trim();
    if (!date) return;
    const s = sheepData.find(d => d.id===parentId);
    if (!s) return;
    if (!s.kids) s.kids = [];
    s.kids.push({ type, date, notes });
    saveSheepToFirebase(s).then(() => {
        if (dataSource === 'local') { saveToLocalStorage(); afterDataLoad(); }
        closeKidModal(); showDetail(parentId);
    });
}

function removeKid(parentId, index) {
    if (!confirm('حذف هذا النسل؟')) return;
    const s = sheepData.find(d => d.id===parentId);
    if (!s || !s.kids) return;
    s.kids.splice(index, 1);
    saveSheepToFirebase(s).then(() => {
        if (dataSource === 'local') { saveToLocalStorage(); afterDataLoad(); }
        showDetail(parentId);
    });
}

function openVaccineModal(preselectId) {
    const select = document.getElementById('vSheepId');
    select.innerHTML = sheepData.filter(s => s.status==='حية')
        .map(s => `<option value="${s.id}" ${s.id===preselectId?'selected':''}>#${s.id} - ${s.name}</option>`).join('');
    document.getElementById('vaccineForm').reset();
    if (preselectId) select.value = preselectId;
    document.getElementById('vaccineModal').classList.add('active');
}
function closeVaccineModal() { document.getElementById('vaccineModal').classList.remove('active'); }

function saveVaccine(e) {
    e.preventDefault();
    const sheepId = document.getElementById('vSheepId').value;
    const name = document.getElementById('vName').value.trim();
    const date = document.getElementById('vDate').value;
    const nextDate = document.getElementById('vNextDate').value;
    const notes = document.getElementById('vNotes').value.trim();
    if (!name || !date) return;
    const s = sheepData.find(d => d.id===sheepId);
    if (!s) return;
    if (!s.vaccines) s.vaccines = [];
    s.vaccines.push({ name, date, nextDate, notes });
    saveSheepToFirebase(s).then(() => {
        if (dataSource === 'local') { saveToLocalStorage(); afterDataLoad(); }
        closeVaccineModal();
        if (document.getElementById('detailModal').classList.contains('active')) showDetail(sheepId);
        renderVaccinesTab();
    });
}

function removeVaccine(sheepId, index) {
    if (!confirm('حذف هذا التلقيح؟')) return;
    const s = sheepData.find(d => d.id===sheepId);
    if (!s || !s.vaccines) return;
    s.vaccines.splice(index, 1);
    saveSheepToFirebase(s).then(() => {
        if (dataSource === 'local') { saveToLocalStorage(); afterDataLoad(); }
        showDetail(sheepId); renderVaccinesTab();
    });
}

// ================================================================
// 8. VACCINES TAB
// ================================================================
function renderVaccinesTab() {
    const tbody = document.getElementById('vaccinesTableBody');
    const summary = document.getElementById('vaccinesSummary');
    if (!tbody) return;
    const rows = [];
    const today = new Date(); today.setHours(0,0,0,0);
    let urgent=0, soon=0, ok=0;
    sheepData.forEach(s => {
        (s.vaccines||[]).forEach(v => {
            let statusLabel='—', statusClass='';
            if (v.nextDate) {
                const d = new Date(v.nextDate);
                const diff = Math.ceil((d-today)/(1000*60*60*24));
                if (diff<0) { statusLabel='متأخر'; statusClass='color:#ef4444;'; urgent++; }
                else if (diff<=settings.alertDays) { statusLabel=`خلال ${diff} يوم`; statusClass='color:#f59e0b;'; soon++; }
                else { statusLabel='قادم'; statusClass='color:#22c55e;'; ok++; }
            }
            rows.push(`<tr><td>#${s.id}</td><td>${s.name}</td><td>${v.name}</td><td>${v.date}</td><td>${v.nextDate||'—'}</td><td style="${statusClass};font-weight:700;">${statusLabel}</td><td>${v.notes||'—'}</td></tr>`);
        });
    });
    tbody.innerHTML = rows.length===0 ? `<tr><td colspan="7" class="empty-state">لا توجد تلقيحات مسجلة بعد. اضغط "إضافة تلقيح"</td></tr>` : rows.join('');
    if (summary) {
        summary.innerHTML = `
            <div class="vaccine-alert urgent"><div class="v-icon">⚠️</div><div class="v-text"><strong>${urgent}</strong><span>تلقيحات متأخرة</span></div></div>
            <div class="vaccine-alert soon"><div class="v-icon">📅</div><div class="v-text"><strong>${soon}</strong><span>خلال ${settings.alertDays} يوم</span></div></div>
            <div class="vaccine-alert ok"><div class="v-icon">✅</div><div class="v-text"><strong>${ok}</strong><span>قادمة / طبيعية</span></div></div>
            <div class="vaccine-alert"><div class="v-icon">💉</div><div class="v-text"><strong>${rows.length}</strong><span>إجمالي السجلات</span></div></div>`;
    }
}

// ================================================================
// 9. FINANCE TAB
// ================================================================
function renderFinanceTab() {
    const aliveValue = sheepData.filter(s => s.status==='حية').reduce((sum,s) => sum+(s.price||0), 0);
    const sales = sheepData.reduce((sum,s) => sum+(s.salePrice||0), 0);
    const purchases = sheepData.reduce((sum,s) => sum+(s.price||0), 0);
    const profit = sales - purchases;
    const margin = sales ? ((profit/sales)*100).toFixed(1) : 0;
    const el = id => document.getElementById(id);
    if (el('finTotalValue')) el('finTotalValue').textContent = formatMoney(aliveValue);
    if (el('finSales')) el('finSales').textContent = formatMoney(sales);
    if (el('finPurchases')) el('finPurchases').textContent = formatMoney(purchases);
    if (el('finProfit')) el('finProfit').textContent = formatMoney(profit);
    if (el('finMargin')) el('finMargin').textContent = margin + '%';

    destroyChart('finance');
    const fCtx = document.getElementById('financeChart');
    if (fCtx && typeof Chart!=='undefined') {
        const aliveP = sheepData.filter(s => s.status==='حية').reduce((s,x) => s+(x.price||0), 0);
        const deadP = sheepData.filter(s => s.status==='ماتت').reduce((s,x) => s+(x.price||0), 0);
        const soldP = sheepData.filter(s => s.status==='مباعة').reduce((s,x) => s+(x.salePrice||0), 0);
        charts.finance = new Chart(fCtx, { type:'bar', data:{ labels:['قيمة الأحياء','قيمة المتوفين (شراء)','إيرادات المبيعات'], datasets:[{ label:'دج', data:[aliveP,deadP,soldP], backgroundColor:['#22c55e','#ef4444','#c9a84c'], borderRadius:10 }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, ticks:{ callback:v => formatMoney(v) } } } } });
    }

    const tbody = document.getElementById('financeTableBody');
    if (!tbody) return;
    const withMoney = sheepData.filter(s => s.price>0 || s.salePrice>0);
    if (withMoney.length===0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-state">لا توجد بيانات مالية بعد. أضف أسعار الشراء/البيع من تعديل الرأس</td></tr>`;
        return;
    }
    tbody.innerHTML = withMoney.map(s => {
        const p = (s.salePrice||0) - (s.price||0);
        return `<tr>
            <td>#${s.id}</td><td>${s.name}</td>
            <td><span class="${getStatusClass(s.status)}" style="padding:3px 12px;border-radius:20px;color:white;font-size:12px;font-weight:700;">${s.status}</span></td>
            <td>${s.price?formatMoney(s.price):'—'}</td><td>${s.salePrice?formatMoney(s.salePrice):'—'}</td>
            <td style="color:${p>=0?'#22c55e':'#ef4444'};font-weight:700;">${s.salePrice?formatMoney(p):'—'}</td>
            <td>${s.financeNotes||'—'}</td>
        </tr>`;
    }).join('');
}

// ================================================================
// 10. ANALYTICS TAB
// ================================================================
function renderAnalytics() {
    if (typeof Chart==='undefined') return;
    const isDark = document.documentElement.getAttribute('data-theme')==='dark';
    const textColor = isDark ? '#ece3d9' : '#1e2a2a';
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Cairo', sans-serif";

    // Weight Chart
    destroyChart('weight');
    const wCtx = document.getElementById('weightChart');
    if (wCtx) {
        const weights = sheepData.filter(s => s.weight>0).map(s => s.weight);
        const bins = [0,20,30,40,50,60,70,80,100];
        const counts = bins.map((b,i) => {
            if (i===bins.length-1) return weights.filter(w => w>=b).length;
            return weights.filter(w => w>=b && w<bins[i+1]).length;
        });
        charts.weight = new Chart(wCtx, { type:'bar', data:{ labels:bins.map((b,i)=> i===bins.length-1 ? b+'+' : b+'-'+(bins[i+1]-1)), datasets:[{ label:'العدد', data:counts, backgroundColor:'#3b82f6', borderRadius:8 }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, grid:{ color:gridColor }, ticks:{ stepSize:1 } }, x:{ grid:{ display:false } } } } });
    }

    // Age Chart
    destroyChart('age');
    const aCtx = document.getElementById('ageChart');
    if (aCtx) {
        const ages = sheepData.map(s => getAge(s.birth)).filter(a => a>0);
        const ageBins = [0,6,12,24,36,60];
        const ageCounts = ageBins.map((b,i) => {
            if (i===ageBins.length-1) return ages.filter(a => a>=b).length;
            return ages.filter(a => a>=b && a<ageBins[i+1]).length;
        });
        charts.age = new Chart(aCtx, { type:'bar', data:{ labels:['0-6 شهور','6-12','12-24','24-36','36+'], datasets:[{ label:'العدد', data:ageCounts, backgroundColor:'#8b5cf6', borderRadius:8 }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, grid:{ color:gridColor }, ticks:{ stepSize:1 } }, x:{ grid:{ display:false } } } } });
    }

    // Breed Chart
    destroyChart('breed');
    const bCtx = document.getElementById('breedChart');
    if (bCtx) {
        const breeds = {}; sheepData.forEach(s => { if (s.breed) breeds[s.breed]=(breeds[s.breed]||0)+1; });
        charts.breed = new Chart(bCtx, { type:'pie', data:{ labels:Object.keys(breeds), datasets:[{ data:Object.values(breeds), backgroundColor:['#c9a84c','#3b82f6','#ec4899','#22c55e','#f59e0b','#8b5cf6'] }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' } } } });
    }

    // Price by Type
    destroyChart('priceType');
    const pCtx = document.getElementById('priceTypeChart');
    if (pCtx) {
        const types = {}; sheepData.forEach(s => { if (s.price>0) { types[s.type]=(types[s.type]||0)+s.price; } });
        const avg = {}; Object.keys(types).forEach(t => { avg[t] = types[t] / sheepData.filter(s => s.type===t).length; });
        charts.priceType = new Chart(pCtx, { type:'bar', data:{ labels:Object.keys(avg), datasets:[{ label:'متوسط السعر (دج)', data:Object.values(avg), backgroundColor:'#c9a84c', borderRadius:8 }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true, grid:{ color:gridColor }, ticks:{ callback:v => formatMoney(v) } }, x:{ grid:{ display:false } } } } });
    }

    // KPI
    const kpiContainer = document.getElementById('kpiContainer');
    if (kpiContainer) {
        const total = sheepData.length;
        const alive = sheepData.filter(s => s.status==='حية').length;
        const avgWeight = sheepData.filter(s => s.weight>0).reduce((s,x) => s+x.weight, 0) / (sheepData.filter(s => s.weight>0).length || 1);
        const avgPrice = sheepData.filter(s => s.price>0).reduce((s,x) => s+x.price, 0) / (sheepData.filter(s => s.price>0).length || 1);
        const kidsTotal = sheepData.reduce((s,x) => s+(x.kids||[]).length, 0);
        kpiContainer.innerHTML = `
            <div class="stat-card"><span class="icon"><i class="fas fa-percent"></i></span><div class="number">${total?((alive/total)*100).toFixed(1):0}%</div><div class="label">نسبة البقاء</div></div>
            <div class="stat-card"><span class="icon"><i class="fas fa-weight"></i></span><div class="number">${avgWeight.toFixed(1)}</div><div class="label">متوسط الوزن</div></div>
            <div class="stat-card"><span class="icon"><i class="fas fa-coins"></i></span><div class="number">${formatMoney(avgPrice)}</div><div class="label">متوسط السعر</div></div>
            <div class="stat-card"><span class="icon"><i class="fas fa-baby"></i></span><div class="number">${kidsTotal}</div><div class="label">إجمالي النسل</div></div>
            <div class="stat-card"><span class="icon"><i class="fas fa-syringe"></i></span><div class="number">${countUpcomingVaccines()}</div><div class="label">تلقيحات قادمة</div></div>
        `;
    }
}

// ================================================================
// 11. ALERTS
// ================================================================
function generateAlerts() {
    const container = document.getElementById('alertsContainer');
    if (!container) return;
    const alerts = [];
    const today = new Date(); today.setHours(0,0,0,0);

    // Vaccine alerts
    sheepData.forEach(s => {
        (s.vaccines||[]).forEach(v => {
            if (v.nextDate) {
                const d = new Date(v.nextDate);
                const diff = Math.ceil((d-today)/(1000*60*60*24));
                if (diff < 0) {
                    alerts.push({ type:'danger', icon:'⚠️', text:`تلقيح ${v.name} لـ ${s.name} (#${s.id}) متأخر منذ ${Math.abs(diff)} يوم`, date:v.nextDate });
                } else if (diff <= settings.alertDays) {
                    alerts.push({ type:'warning', icon:'📅', text:`تلقيح ${v.name} لـ ${s.name} (#${s.id}) خلال ${diff} يوم`, date:v.nextDate });
                }
            }
        });
    });

    // Low weight alerts
    sheepData.forEach(s => {
        if (s.weight>0 && s.weight<20 && s.status==='حية') {
            alerts.push({ type:'warning', icon:'⚖️', text:`الرأس ${s.name} (#${s.id}) وزنه منخفض (${s.weight} كغ)`, date:'' });
        }
    });

    // Dead or sold with notes
    sheepData.forEach(s => {
        if ((s.status==='ماتت' || s.status==='مباعة') && s.notes) {
            alerts.push({ type:'info', icon:'📝', text:`${s.name} (#${s.id}) ${s.status} - ملاحظة: ${s.notes}`, date:'' });
        }
    });

    // Limit to 10 latest
    const sorted = alerts.slice(0, 10);
    container.innerHTML = sorted.length===0 ? '<div class="alert-item" style="border-right-color:#22c55e;"><span class="alert-icon">✅</span><span class="alert-text">لا توجد تنبيهات حالية</span></div>' :
        sorted.map(a => `<div class="alert-item ${a.type}"><span class="alert-icon">${a.icon}</span><span class="alert-text">${a.text}</span>${a.date?`<span class="alert-date">${a.date}</span>`:''}</div>`).join('');
}

// ================================================================
// 12. EXPORT & PDF
// ================================================================
function exportData() {
    const dataStr = JSON.stringify(sheepData, null, 2);
    const blob = new Blob([dataStr], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `قطيع_الديوان_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

async function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');

    // تحميل خط عربي (Amiri - خط جميل وواضح للعربية)
    // يمكنك تغيير الرابط إذا أردت خطاً آخر
    const fontUrl = 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/amiri/Amiri-Regular.ttf';
    
    try {
        const fontResponse = await fetch(fontUrl);
        const fontBuffer = await fontResponse.arrayBuffer();
        const fontBase64 = btoa(String.fromCharCode(...new Uint8Array(fontBuffer)));
        
        doc.addFileToVFS('Amiri-Regular.ttf', fontBase64);
        doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
        doc.setFont('Amiri');
    } catch (e) {
        console.warn('فشل تحميل الخط العربي، سيتم استخدام الخط الافتراضي', e);
        doc.setFont('helvetica');
    }

    // إعداد الاتجاه من اليمين لليسار
    doc.setR2L(true); // مهم جداً للعربية

    let y = 50;

    // العنوان
    doc.setFontSize(22);
    doc.text('تقرير القطيع - الديوان', 297, y, { align: 'center' });
    y += 35;

    // التاريخ
    doc.setFontSize(12);
    const dateStr = new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.text(`التاريخ: ${dateStr}`, 555, y, { align: 'right' });
    y += 30;

    // الإحصائيات
    const total = sheepData.length;
    const alive = sheepData.filter(s => s.status === 'حية').length;
    const females = sheepData.filter(s => s.gender === 'أنثى').length;
    const males = sheepData.filter(s => s.gender === 'ذكر').length;
    const dead = total - alive;

    doc.setFontSize(14);
    doc.text('ملخص القطيع:', 555, y, { align: 'right' });
    y += 25;

    doc.setFontSize(12);
    const stats = [
        `إجمالي الرؤوس: ${total}`,
        `الأحياء: ${alive}`,
        `المتوفون / المفقودون: ${dead}`,
        `الإناث: ${females}`,
        `الذكور: ${males}`
    ];

    stats.forEach(stat => {
        doc.text(stat, 555, y, { align: 'right' });
        y += 20;
    });

    y += 15;
    doc.setFontSize(14);
    doc.text('قائمة الرؤوس:', 555, y, { align: 'right' });
    y += 25;

    doc.setFontSize(11);

    // عرض أول 25 رأس (لتجنب صفحة طويلة جداً)
    const list = sheepData.slice(0, 25);
    
    list.forEach((s, index) => {
        const line = `#${s.id}  |  ${s.name}  |  ${s.type || '-'}  |  ${s.status || '-'}  |  ${s.breed || '-'}`;
        doc.text(line, 555, y, { align: 'right' });
        y += 18;

        if (y > 780) {
            doc.addPage();
            doc.setFont('Amiri');
            y = 50;
        }
    });

    if (sheepData.length > 25) {
        y += 10;
        doc.setFontSize(11);
        doc.text(`... و ${sheepData.length - 25} رأس آخر`, 555, y, { align: 'right' });
    }

    // تذييل الصفحة
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`صفحة ${i} من ${pageCount}  |  الديوان - إدارة القطيع`, 297, 820, { align: 'center' });
        doc.setTextColor(0);
    }

    // حفظ الملف
    const fileName = `تقرير_الديوان_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
}

function exportAnalyticsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.text('تقرير التحليلات المتقدمة - الديوان', 40, 40);
    doc.setFontSize(12);
    doc.text(`التاريخ: ${new Date().toLocaleDateString('ar-EG')}`, 40, 70);
    const total = sheepData.length;
    const avgWeight = sheepData.filter(s=>s.weight>0).reduce((s,x)=>s+x.weight,0)/(sheepData.filter(s=>s.weight>0).length||1);
    const avgPrice = sheepData.filter(s=>s.price>0).reduce((s,x)=>s+x.price,0)/(sheepData.filter(s=>s.price>0).length||1);
    const alive = sheepData.filter(s=>s.status==='حية').length;
    doc.text(`المؤشرات الرئيسية:`, 40, 100);
    doc.text(`- إجمالي القطيع: ${total}`, 40, 120);
    doc.text(`- نسبة البقاء: ${total?((alive/total)*100).toFixed(1):0}%`, 40, 140);
    doc.text(`- متوسط الوزن: ${avgWeight.toFixed(1)} كغ`, 40, 160);
    doc.text(`- متوسط السعر: ${formatMoney(avgPrice)} دج`, 40, 180);
    doc.text(`- عدد السلالات: ${new Set(sheepData.map(s=>s.breed).filter(Boolean)).size}`, 40, 200);
    doc.text(`- إجمالي النسل: ${sheepData.reduce((s,x)=>s+(x.kids||[]).length,0)}`, 40, 220);
    doc.save(`تحليل_الديوان_${new Date().toISOString().slice(0,10)}.pdf`);
}

// ================================================================
// 13. SETTINGS
// ================================================================
function openSettings() {
    document.getElementById('settingsModal').classList.add('active');
    document.getElementById('currencyUnit').value = settings.currency;
    document.getElementById('soundAlerts').checked = settings.soundAlerts;
    document.getElementById('alertDays').value = settings.alertDays;
    const srcEl = document.getElementById('dataSourceLabel');
    if (srcEl) {
        srcEl.textContent = dataSource === 'firebase' ? 'Firebase (سحابي)' : 'LocalStorage (محلي)';
        srcEl.style.color = dataSource === 'firebase' ? '#22c55e' : '#f59e0b';
    }
}
function closeSettings() { document.getElementById('settingsModal').classList.remove('active'); }
function saveSettings() {
    settings.currency = document.getElementById('currencyUnit').value;
    settings.soundAlerts = document.getElementById('soundAlerts').checked;
    settings.alertDays = parseInt(document.getElementById('alertDays').value) || 7;
    localStorage.setItem('diwanSettings', JSON.stringify(settings));
    closeSettings();
    generateAlerts();
    renderVaccinesTab();
}

function loadSettings() {
    const stored = localStorage.getItem('diwanSettings');
    if (stored) { try { settings = JSON.parse(stored); } catch(e) {} }
}

// ================================================================
// 14. THEME TOGGLE
// ================================================================
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    if (current==='dark') { html.removeAttribute('data-theme'); document.getElementById('themeLabel').textContent='ليلي'; }
    else { html.setAttribute('data-theme','dark'); document.getElementById('themeLabel').textContent='نهاري'; }
    setTimeout(() => { updateCharts(); renderAnalytics(); }, 50);
}

// ================================================================
// 15. INIT
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    ['detailModal','addModal','vaccineModal','kidModal','settingsModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', function(e) { if (e.target===this) this.classList.remove('active'); });
    });
    loadData();
    setView('grid');
    // تحديث السلالات بعد التحميل
    setTimeout(updateBreedFilter, 500);
});

console.log('نظام الديوان - النسخة المتطورة v2.1 — فصل صارم Firebase / LocalStorage بدون خلط أو خرفان عشوائية');

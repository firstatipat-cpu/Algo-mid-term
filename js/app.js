/* ============================================
   THEME TOGGLE
============================================ */
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('algo-theme') || 'light';
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme','dark');
  themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
}
themeBtn.addEventListener('click', () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (dark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('algo-theme','light');
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  } else {
    document.documentElement.setAttribute('data-theme','dark');
    localStorage.setItem('algo-theme','dark');
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  }
  if (window.bigoChartInstance) {
    updateChartTheme();
  }
});

/* ============================================
   NAVIGATION
============================================ */
const navItems = document.querySelectorAll('.nav-item, .toc-card, .hero-cta [data-target]');
const sections = document.querySelectorAll('.section, #hero');

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const target = item.dataset.target;
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Intersection observer for active nav
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(n => n.classList.toggle('active', n.dataset.target === id));
    }
  });
}, { rootMargin: '-100px 0px -60% 0px' });
sections.forEach(s => observer.observe(s));

/* ============================================
   PROGRESS BAR
============================================ */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scroll = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scroll + '%';
});

/* ============================================
   KATEX RENDER
============================================ */
function renderMath() {
  if (window.katex && window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false
    });
  } else {
    setTimeout(renderMath, 100);
  }
}
renderMath();

/* ============================================
   PRINT BUTTON
============================================ */
document.getElementById('printBtn').addEventListener('click', () => window.print());

/* ============================================
   SEARCH
============================================ */
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  const query = prompt('ค้นหาในหน้า: (เช่น "Merge", "Hash", "Big-O")');
  if (!query) return;
  window.find(query);
});

/* ============================================
   GCD VISUALIZER
============================================ */
let gcdState = null;
function gcdInit() {
  const m = parseInt(document.getElementById('gcdM').value);
  const n = parseInt(document.getElementById('gcdN').value);
  gcdState = { m, n, r: m % n, done: false };
  document.getElementById('gcdM-v').textContent = m;
  document.getElementById('gcdN-v').textContent = n;
  document.getElementById('gcdR-v').textContent = m % n;
  document.getElementById('gcdRStep').style.opacity = 0;
  document.getElementById('gcdResult').textContent = '—';
  document.getElementById('gcdM-v').classList.add('active');
  document.getElementById('gcdN-v').classList.add('active');
  document.getElementById('gcdM-v').classList.remove('result');
  document.getElementById('gcdN-v').classList.remove('result');
}
function gcdStepFn() {
  if (!gcdState || gcdState.done) return;
  const { m, n } = gcdState;
  const r = m % n;
  document.getElementById('gcdRStep').style.opacity = 1;
  document.getElementById('gcdR-v').textContent = r;
  
  setTimeout(() => {
    gcdState.m = n;
    gcdState.n = r;
    document.getElementById('gcdM-v').textContent = n;
    document.getElementById('gcdN-v').textContent = r;
    if (r === 0) {
      gcdState.done = true;
      document.getElementById('gcdN-v').classList.remove('active');
      document.getElementById('gcdN-v').classList.add('result');
      document.getElementById('gcdResult').textContent = n;
    }
  }, 400);
}
gcdInit();
document.getElementById('gcdStep').addEventListener('click', gcdStepFn);
document.getElementById('gcdReset').addEventListener('click', gcdInit);
document.getElementById('gcdM').addEventListener('input', gcdInit);
document.getElementById('gcdN').addEventListener('input', gcdInit);

/* ============================================
   SIEVE VISUALIZER
============================================ */
let sieveTimer = null;
let sievePaused = false;
function sieveInit() {
  const n = parseInt(document.getElementById('sieveN').value);
  const grid = document.getElementById('sieveGrid');
  grid.innerHTML = '';
  for (let i = 2; i <= n; i++) {
    const cell = document.createElement('div');
    cell.className = 'sieve-cell';
    cell.textContent = i;
    cell.dataset.val = i;
    grid.appendChild(cell);
  }
  document.getElementById('sieveCount').textContent = '0';
  sievePaused = false;
  document.getElementById('sievePause').textContent = '⏸ หยุดชั่วคราว';
  if (sieveTimer) { clearInterval(sieveTimer); sieveTimer = null; }
}
function sieveRun() {
  sieveInit();
  const n = parseInt(document.getElementById('sieveN').value);
  const cells = document.querySelectorAll('.sieve-cell');
  const isComposite = new Array(n + 1).fill(false);
  let p = 2;
  let marking = false;
  let j = p * p;
  
  sieveTimer = setInterval(() => {
    if (sievePaused) return;
    if (!marking) {
      while (p <= Math.floor(Math.sqrt(n)) && isComposite[p]) p++;
      if (p > Math.floor(Math.sqrt(n))) {
        cells.forEach(c => {
          const v = parseInt(c.dataset.val);
          if (!isComposite[v] && !c.classList.contains('prime')) {
            c.classList.add('prime');
          }
        });
        const count = document.querySelectorAll('.sieve-cell.prime').length;
        document.getElementById('sieveCount').textContent = count;
        clearInterval(sieveTimer);
        sieveTimer = null;
        return;
      }
      cells.forEach(c => c.classList.remove('current'));
      const pCell = cells[p - 2];
      if (pCell) pCell.classList.add('current');
      j = p * p;
      marking = true;
    } else {
      if (j <= n) {
        const cell = cells[j - 2];
        if (cell) {
          cell.classList.add('marking');
          setTimeout(() => {
            cell.classList.remove('marking');
            cell.classList.add('composite');
          }, 200);
        }
        isComposite[j] = true;
        j += p;
      } else {
        const pCell = cells[p - 2];
        if (pCell) pCell.classList.add('prime');
        pCell?.classList.remove('current');
        p++;
        marking = false;
      }
    }
  }, 80);
}
sieveInit();
document.getElementById('sieveRun').addEventListener('click', sieveRun);
document.getElementById('sievePause').addEventListener('click', () => {
  sievePaused = !sievePaused;
  document.getElementById('sievePause').textContent = sievePaused ? '▶ เล่นต่อ' : '⏸ หยุดชั่วคราว';
});
document.getElementById('sieveReset').addEventListener('click', sieveInit);
document.getElementById('sieveN').addEventListener('input', () => {
  if (sieveTimer) { clearInterval(sieveTimer); sieveTimer = null; }
  sieveInit();
});

/* ============================================
   SORTING VISUALIZER
============================================ */
let sortArray = [];
let sortAlgo = 'bubble';
let sortState = null;
let sortRunning = false;
let sortComp = 0, sortSwap = 0;

const algoInfo = {
  bubble: { name: 'Bubble Sort', complexity: 'O(n²)' },
  selection: { name: 'Selection Sort', complexity: 'O(n²)' },
  insertion: { name: 'Insertion Sort', complexity: 'O(n²)' },
  merge: { name: 'Merge Sort', complexity: 'O(n log n)' },
  quick: { name: 'Quick Sort', complexity: 'O(n log n) avg' }
};

function generateArray(size) {
  sortArray = [];
  for (let i = 0; i < size; i++) {
    sortArray.push(Math.floor(Math.random() * 90) + 10);
  }
  renderBars();
  sortComp = 0; sortSwap = 0;
  updateSortStats();
}
function renderBars(highlights = {}) {
  const canvas = document.getElementById('sortCanvas');
  canvas.innerHTML = '';
  const maxVal = Math.max(...sortArray);
  sortArray.forEach((val, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.title = val;
    bar.style.height = (val / maxVal * 100) + '%';
    if (highlights.comparing && (i === highlights.comparing[0] || i === highlights.comparing[1])) {
      bar.classList.add('comparing');
    }
    if (highlights.swapping && (i === highlights.swapping[0] || i === highlights.swapping[1])) {
      bar.classList.add('swapping');
    }
    if (highlights.sorted && highlights.sorted.includes(i)) {
      bar.classList.add('sorted');
    }
    if (highlights.pivot && i === highlights.pivot) {
      bar.classList.add('pivot');
    }
    // Add value label
    const label = document.createElement('div');
    label.className = 'bar-value';
    label.textContent = val;
    bar.appendChild(label);
    canvas.appendChild(bar);
  });
}
function updateSortStats() {
  document.getElementById('sortComp').textContent = sortComp;
  document.getElementById('sortSwap').textContent = sortSwap;
  document.getElementById('sortName').textContent = algoInfo[sortAlgo].name;
  document.getElementById('sortComplexity').textContent = algoInfo[sortAlgo].complexity;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function bubbleSort() {
  const n = sortArray.length;
  const sorted = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (!sortRunning) return;
      sortComp++;
      renderBars({ comparing: [j, j+1], sorted });
      updateSortStats();
      await sleep(101 - parseInt(document.getElementById('sortSpeed').value));
      if (sortArray[j] > sortArray[j+1]) {
        sortSwap++;
        [sortArray[j], sortArray[j+1]] = [sortArray[j+1], sortArray[j]];
        renderBars({ swapping: [j, j+1], sorted });
        await sleep(50);
      }
    }
    sorted.unshift(n - 1 - i);
  }
  sorted.unshift(0);
  renderBars({ sorted });
}

async function selectionSort() {
  const n = sortArray.length;
  const sorted = [];
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (!sortRunning) return;
      sortComp++;
      renderBars({ comparing: [min, j], sorted });
      updateSortStats();
      await sleep(101 - parseInt(document.getElementById('sortSpeed').value));
      if (sortArray[j] < sortArray[min]) min = j;
    }
    if (min !== i) {
      sortSwap++;
      [sortArray[i], sortArray[min]] = [sortArray[min], sortArray[i]];
      renderBars({ swapping: [i, min], sorted });
      await sleep(80);
    }
    sorted.push(i);
  }
  sorted.push(n-1);
  renderBars({ sorted });
}

async function insertionSort() {
  const n = sortArray.length;
  for (let i = 1; i < n; i++) {
    let v = sortArray[i];
    let j = i - 1;
    while (j >= 0 && sortArray[j] > v) {
      if (!sortRunning) return;
      sortComp++;
      sortSwap++;
      renderBars({ comparing: [j, j+1] });
      updateSortStats();
      await sleep(101 - parseInt(document.getElementById('sortSpeed').value));
      sortArray[j+1] = sortArray[j];
      j--;
    }
    sortArray[j+1] = v;
    renderBars({ swapping: [j+1, j+1] });
    await sleep(30);
  }
  const sorted = Array.from({length: n}, (_, i) => i);
  renderBars({ sorted });
}

async function mergeSort(l = 0, r = sortArray.length - 1) {
  if (l >= r) return;
  const mid = Math.floor((l + r) / 2);
  await mergeSort(l, mid);
  await mergeSort(mid + 1, r);
  await merge(l, mid, r);
  if (l === 0 && r === sortArray.length - 1) {
    const sorted = Array.from({length: sortArray.length}, (_, i) => i);
    renderBars({ sorted });
  }
}
async function merge(l, mid, r) {
  const left = sortArray.slice(l, mid + 1);
  const right = sortArray.slice(mid + 1, r + 1);
  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (!sortRunning) return;
    sortComp++;
    renderBars({ comparing: [k] });
    updateSortStats();
    await sleep(101 - parseInt(document.getElementById('sortSpeed').value));
    if (left[i] <= right[j]) {
      sortArray[k++] = left[i++];
    } else {
      sortArray[k++] = right[j++];
    }
    renderBars({ swapping: [k-1] });
    sortSwap++;
    updateSortStats();
  }
  while (i < left.length) {
    if (!sortRunning) return;
    sortArray[k++] = left[i++];
    renderBars({ swapping: [k-1] });
    await sleep(30);
  }
  while (j < right.length) {
    if (!sortRunning) return;
    sortArray[k++] = right[j++];
    renderBars({ swapping: [k-1] });
    await sleep(30);
  }
}

async function quickSort(l = 0, r = sortArray.length - 1) {
  if (l >= r) return;
  const p = sortArray[l];
  let i = l, j = r + 1;
  while (true) {
    do { i++; sortComp++; } while (i <= r && sortArray[i] < p);
    do { j--; sortComp++; } while (sortArray[j] > p);
    if (i >= j) break;
    sortSwap++;
    renderBars({ comparing: [i, j], pivot: l });
    updateSortStats();
    await sleep(101 - parseInt(document.getElementById('sortSpeed').value));
    [sortArray[i], sortArray[j]] = [sortArray[j], sortArray[i]];
  }
  sortSwap++;
  [sortArray[l], sortArray[j]] = [sortArray[j], sortArray[l]];
  renderBars({ swapping: [l, j] });
  await sleep(80);
  await quickSort(l, j - 1);
  await quickSort(j + 1, r);
  if (l === 0 && r === sortArray.length - 1) {
    const sorted = Array.from({length: sortArray.length}, (_, i) => i);
    renderBars({ sorted });
  }
}

document.querySelectorAll('#sortTabs .tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('#sortTabs .tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    sortAlgo = t.dataset.algo;
    sortRunning = false;
    generateArray(parseInt(document.getElementById('sortSize').value));
    updateSortStats();
  });
});
document.getElementById('sortPlay').addEventListener('click', async () => {
  if (sortRunning) return;
  sortRunning = true;
  const fn = { bubble: bubbleSort, selection: selectionSort, insertion: insertionSort, merge: () => mergeSort(), quick: () => quickSort() };
  await fn[sortAlgo]();
  sortRunning = false;
});
document.getElementById('sortPause').addEventListener('click', () => { sortRunning = false; });
document.getElementById('sortReset').addEventListener('click', () => {
  sortRunning = false;
  generateArray(parseInt(document.getElementById('sortSize').value));
});
document.getElementById('sortSize').addEventListener('input', () => {
  sortRunning = false;
  generateArray(parseInt(document.getElementById('sortSize').value));
});
generateArray(30);

/* ============================================
   BIG-O CHART — Enhanced
============================================ */
const bigOColors = {
  'O(1)': '#10B981',
  'O(log n)': '#14B8A6',
  'O(n)': '#0E4F49',
  'O(n log n)': '#A16207',
  'O(n²)': '#C2410C',
  'O(n³)': '#7C3AED',
  'O(2ⁿ)': '#BE123C',
  'O(n!)': '#DB2777'
};
function factSmall(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) { r *= i; if (r > 1e15) return 1e15; }
  return r;
}

function buildChart() {
  const ctx = document.getElementById('bigoChart').getContext('2d');
  const data = [];
  for (let n = 1; n <= 50; n++) {
    data.push({
      n,
      'O(1)': 1,
      'O(log n)': Math.log2(n) || 0.1,
      'O(n)': n,
      'O(n log n)': n * Math.log2(n) || 0.1,
      'O(n²)': n * n,
      'O(n³)': n * n * n,
      'O(2ⁿ)': Math.min(Math.pow(2, n), 1e15),
      'O(n!)': Math.min(n > 0 ? factSmall(n) : 1, 1e15)
    });
  }
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
  const textColor = isDark ? '#8E8576' : '#6B6358';
  
  window.bigoChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.n),
      datasets: Object.keys(bigOColors).map(key => ({
        label: key,
        data: data.map(d => d[key]),
        borderColor: bigOColors[key],
        backgroundColor: bigOColors[key] + '15',
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: bigOColors[key],
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        fill: false
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1A1614' : '#1A1614',
          titleColor: '#F4EEE0',
          bodyColor: '#F4EEE0',
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: '600' },
          bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
          padding: 14,
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          boxWidth: 20,
          boxHeight: 4,
          boxPadding: 6,
          callbacks: {
            label: function(ctx) {
              const val = ctx.parsed.y;
              if (val > 1e6) return `  ${ctx.dataset.label} = ${val.toExponential(2)}`;
              if (val > 1) return `  ${ctx.dataset.label} = ${val.toFixed(1)}`;
              return `  ${ctx.dataset.label} = ${val.toFixed(3)}`;
            }
          }
        }
      },
      scales: {
        x: { 
          title: { display: true, text: 'Input Size (n)', color: textColor, font: { family: "'Space Grotesk', sans-serif", size: 12, weight: '600' } },
          ticks: { color: textColor, maxTicksLimit: 11, font: { family: "'JetBrains Mono', monospace", size: 11 } },
          grid: { color: gridColor, drawBorder: false }
        },
        y: { 
          title: { display: true, text: 'Operations (log scale)', color: textColor, font: { family: "'Space Grotesk', sans-serif", size: 12, weight: '600' } },
          ticks: { 
            color: textColor, 
            font: { family: "'JetBrains Mono', monospace", size: 11 },
            callback: function(val) {
              if (val >= 1e6) return val.toExponential(0);
              if (val >= 1000) return (val/1000) + 'K';
              return val;
            }
          },
          grid: { color: gridColor, drawBorder: false },
          type: 'logarithmic',
          min: 0.1
        }
      }
    }
  });
  
  // Build custom legend
  const legendEl = document.getElementById('chartLegend');
  legendEl.innerHTML = '';
  Object.keys(bigOColors).forEach(key => {
    const item = document.createElement('div');
    item.className = 'chart-legend-item';
    item.innerHTML = `<div class="chart-legend-color" style="background:${bigOColors[key]}"></div><span>${key}</span>`;
    legendEl.appendChild(item);
  });
}
function updateChartTheme() {
  if (window.bigoChartInstance) {
    window.bigoChartInstance.destroy();
    buildChart();
  }
}
setTimeout(buildChart, 300);

/* ============================================
   BINARY SEARCH VIZ
============================================ */
let bsState = null;
const bsBaseArray = [3, 7, 12, 18, 24, 31, 42, 56, 64, 73, 88, 95];
function bsInit() {
  const k = parseInt(document.getElementById('bsK').value) || 42;
  bsState = { low: 0, high: bsBaseArray.length - 1, mid: -1, done: false, found: false, discarded: [] };
  renderBSArray();
  document.getElementById('bsStatus').innerHTML = `กด <strong>Step</strong> เพื่อเริ่มการค้นหา K = ${k}`;
}
function renderBSArray() {
  const arr = document.getElementById('bsArray');
  arr.innerHTML = '';
  bsBaseArray.forEach((v, i) => {
    const cell = document.createElement('div');
    cell.className = 'bs-cell';
    cell.textContent = v;
    if (bsState) {
      if (bsState.discarded.includes(i)) cell.classList.add('discarded');
      if (i === bsState.low) cell.classList.add('low');
      if (i === bsState.high) cell.classList.add('high');
      if (i === bsState.mid) cell.classList.add('mid');
      if (bsState.found && i === bsState.mid) cell.classList.add('found');
      if (i === bsState.low) {
        const p = document.createElement('div');
        p.className = 'bs-pointer';
        p.style.color = 'var(--primary)';
        p.textContent = 'L';
        cell.appendChild(p);
      }
      if (i === bsState.high) {
        const p = document.createElement('div');
        p.className = 'bs-pointer';
        p.style.color = 'var(--rose)';
        p.textContent = 'H';
        cell.appendChild(p);
      }
      if (i === bsState.mid) {
        const p = document.createElement('div');
        p.className = 'bs-pointer';
        p.style.color = 'var(--accent)';
        p.textContent = 'M';
        cell.appendChild(p);
      }
    }
    arr.appendChild(cell);
  });
}
function bsStepFn() {
  if (!bsState || bsState.done) return;
  const k = parseInt(document.getElementById('bsK').value);
  if (bsState.low > bsState.high) {
    bsState.done = true;
    document.getElementById('bsStatus').innerHTML = `<strong style="color:var(--rose)">ไม่พบค่า ${k} ใน Array</strong>`;
    renderBSArray();
    return;
  }
  bsState.mid = Math.floor((bsState.low + bsState.high) / 2);
  const midVal = bsBaseArray[bsState.mid];
  if (midVal === k) {
    bsState.done = true;
    bsState.found = true;
    document.getElementById('bsStatus').innerHTML = `<strong style="color:var(--gold)">พบค่า ${k} ที่ตำแหน่ง index ${bsState.mid}</strong>`;
  } else if (midVal < k) {
    for (let i = bsState.low; i <= bsState.mid; i++) if (!bsState.discarded.includes(i)) bsState.discarded.push(i);
    bsState.low = bsState.mid + 1;
    document.getElementById('bsStatus').innerHTML = `mid = ${bsState.mid} → A[${bsState.mid}] = <strong>${midVal}</strong> &lt; ${k} → ทิ้งฝั่งซ้าย (จางลง) → ไปด้านขวา`;
  } else {
    for (let i = bsState.mid; i <= bsState.high; i++) if (!bsState.discarded.includes(i)) bsState.discarded.push(i);
    bsState.high = bsState.mid - 1;
    document.getElementById('bsStatus').innerHTML = `mid = ${bsState.mid} → A[${bsState.mid}] = <strong>${midVal}</strong> &gt; ${k} → ทิ้งฝั่งขวา (จางลง) → ไปด้านซ้าย`;
  }
  renderBSArray();
}
bsInit();
document.getElementById('bsStep').addEventListener('click', bsStepFn);
document.getElementById('bsReset').addEventListener('click', bsInit);
document.getElementById('bsK').addEventListener('input', bsInit);

/* ============================================
   GRAPH TRAVERSAL VIZ — Enhanced
============================================ */
const graphData = {
  nodes: [
    { id: 'A', x: 80, y: 70 },
    { id: 'B', x: 220, y: 50 },
    { id: 'C', x: 360, y: 90 },
    { id: 'D', x: 500, y: 60 },
    { id: 'E', x: 120, y: 200 },
    { id: 'F', x: 260, y: 220 },
    { id: 'G', x: 420, y: 200 },
    { id: 'H', x: 530, y: 270 },
    { id: 'I', x: 80, y: 310 },
    { id: 'J', x: 320, y: 310 }
  ],
  edges: [
    ['A','B'], ['A','E'], ['B','C'], ['B','F'], ['C','D'], ['C','G'],
    ['D','H'], ['E','F'], ['E','I'], ['F','G'], ['F','J'], ['G','H'],
    ['H','J'], ['I','J']
  ],
  adj: {}
};
graphData.nodes.forEach(n => graphData.adj[n.id] = []);
graphData.edges.forEach(([a,b]) => {
  graphData.adj[a].push(b);
  graphData.adj[b].push(a);
});

let graphMode = 'dfs';
let graphState = null;
let graphTimer = null;

function renderGraph() {
  const svg = document.getElementById('graphSvg');
  svg.innerHTML = '';
  // edges
  graphData.edges.forEach(([a,b]) => {
    const na = graphData.nodes.find(n => n.id === a);
    const nb = graphData.nodes.find(n => n.id === b);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', na.x); line.setAttribute('y1', na.y);
    line.setAttribute('x2', nb.x); line.setAttribute('y2', nb.y);
    line.setAttribute('class', 'graph-edge');
    line.setAttribute('data-edge', `${a}-${b}`);
    if (graphState && (graphState.traversedEdges.has(`${a}-${b}`) || graphState.traversedEdges.has(`${b}-${a}`))) {
      line.classList.add('traversed');
    }
    svg.appendChild(line);
  });
  // nodes
  graphData.nodes.forEach(n => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'graph-node');
    g.setAttribute('data-id', n.id);
    if (graphState) {
      if (graphState.current === n.id) g.classList.add('current');
      else if (graphState.visited.has(n.id)) g.classList.add('visited');
    }
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', n.x); circle.setAttribute('cy', n.y); circle.setAttribute('r', 20);
    g.appendChild(circle);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', n.x); text.setAttribute('y', n.y);
    text.textContent = n.id;
    g.appendChild(text);
    svg.appendChild(g);
  });
}

function graphStart() {
  if (graphTimer) { clearInterval(graphTimer); graphTimer = null; }
  graphState = {
    visited: new Set(),
    current: null,
    stack: ['A'],
    traversedEdges: new Set()
  };
  renderGraph();
  document.getElementById('graphCount').textContent = '0';
  
  graphTimer = setInterval(() => {
    if (graphMode === 'dfs') {
      if (graphState.stack.length === 0) {
        clearInterval(graphTimer); graphTimer = null;
        graphState.current = null;
        renderGraph();
        renderQueue();
        return;
      }
      const node = graphState.stack.pop();
      if (graphState.visited.has(node)) return;
      graphState.visited.add(node);
      graphState.current = node;
      const neighbors = graphData.adj[node].filter(n => !graphState.visited.has(n)).sort().reverse();
      neighbors.forEach(n => {
        graphState.traversedEdges.add(`${node}-${n}`);
        graphState.stack.push(n);
      });
      renderGraph();
      renderQueue();
      document.getElementById('graphCount').textContent = graphState.visited.size;
    } else {
      if (graphState.stack.length === 0) {
        clearInterval(graphTimer); graphTimer = null;
        graphState.current = null;
        renderGraph();
        renderQueue();
        return;
      }
      const node = graphState.stack.shift();
      if (graphState.visited.has(node)) return;
      graphState.visited.add(node);
      graphState.current = node;
      const neighbors = graphData.adj[node].filter(n => !graphState.visited.has(n) && !graphState.stack.includes(n)).sort();
      neighbors.forEach(n => {
        graphState.traversedEdges.add(`${node}-${n}`);
        graphState.stack.push(n);
      });
      renderGraph();
      renderQueue();
      document.getElementById('graphCount').textContent = graphState.visited.size;
    }
  }, 700);
}

function renderQueue() {
  const container = document.getElementById('queueItems');
  container.innerHTML = '';
  document.getElementById('queueLabel').textContent = graphMode === 'dfs' ? 'Stack:' : 'Queue:';
  graphState.stack.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'queue-item';
    if (graphMode === 'dfs' && i === graphState.stack.length - 1) el.classList.add('active');
    if (graphMode === 'bfs' && i === 0) el.classList.add('active');
    el.textContent = item;
    container.appendChild(el);
  });
}

function graphReset() {
  if (graphTimer) { clearInterval(graphTimer); graphTimer = null; }
  graphState = null;
  renderGraph();
  document.getElementById('graphCount').textContent = '0';
  document.getElementById('queueItems').innerHTML = '';
}
renderGraph();
document.querySelectorAll('#graphTabs .tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('#graphTabs .tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    graphMode = t.dataset.mode;
    graphReset();
  });
});
document.getElementById('graphStart').addEventListener('click', graphStart);
document.getElementById('graphReset').addEventListener('click', graphReset);

/* ============================================
   HASH TABLE VIZ — Enhanced
============================================ */
const HASH_SIZE = 7;
let hashMethod = 'chaining';
let hashData = [];

function hashFn(k) { return k % HASH_SIZE; }

function hashRender(activeIdx = -1, newIdx = -1, probePath = []) {
  const table = document.getElementById('hashTable');
  table.innerHTML = '';
  const loadEl = document.getElementById('hashLoad');
  if (loadEl) loadEl.textContent = hashData.filter(b => b.length > 0).length + '/' + HASH_SIZE;
  
  if (hashMethod === 'chaining') {
    for (let i = 0; i < HASH_SIZE; i++) {
      const row = document.createElement('div');
      row.className = 'hash-row';
      if (activeIdx === i) row.classList.add('active');
      if (hashData[i] && hashData[i].length > 1) row.classList.add('collision');
      const idx = document.createElement('div');
      idx.className = 'hash-idx';
      idx.textContent = i;
      row.appendChild(idx);
      const vals = document.createElement('div');
      vals.className = 'hash-vals';
      if (hashData[i] && hashData[i].length > 0) {
        hashData[i].forEach((v, vi) => {
          const val = document.createElement('div');
          val.className = 'hash-val' + (newIdx === i && vi === hashData[i].length - 1 ? ' new' : '');
          val.textContent = v;
          vals.appendChild(val);
        });
      } else {
        const empty = document.createElement('span');
        empty.className = 'hash-empty';
        empty.textContent = '— empty —';
        vals.appendChild(empty);
      }
      row.appendChild(vals);
      table.appendChild(row);
    }
  } else {
    const slots = new Array(HASH_SIZE).fill(null);
    hashData.flat().forEach(v => {
      let idx = hashFn(v);
      while (slots[idx] !== null) idx = (idx + 1) % HASH_SIZE;
      slots[idx] = v;
    });
    for (let i = 0; i < HASH_SIZE; i++) {
      const row = document.createElement('div');
      row.className = 'hash-row';
      if (activeIdx === i) row.classList.add('active');
      if (probePath.includes(i)) row.classList.add('probe');
      const idx = document.createElement('div');
      idx.className = 'hash-idx';
      idx.textContent = i;
      row.appendChild(idx);
      const vals = document.createElement('div');
      vals.className = 'hash-vals';
      if (slots[i] !== null) {
        const val = document.createElement('div');
        val.className = 'hash-val';
        val.textContent = slots[i];
        vals.appendChild(val);
      } else {
        const empty = document.createElement('span');
        empty.className = 'hash-empty';
        empty.textContent = '— empty —';
        vals.appendChild(empty);
      }
      row.appendChild(vals);
      table.appendChild(row);
    }
  }
}

function hashStatus(msg) {
  const el = document.getElementById('hashStatus');
  if (el) el.textContent = msg;
}

function hashInsert() {
  const input = document.getElementById('hashInput');
  const v = parseInt(input.value);
  if (isNaN(v) || v < 1) { alert('กรุณาใส่เลข 1-99'); return; }
  if (hashMethod === 'chaining') {
    const idx = hashFn(v);
    if (!hashData[idx]) hashData[idx] = [];
    hashData[idx].push(v);
    hashStatus('Insert ' + v + ' → ถังที่ ' + idx + (hashData[idx].length > 1 ? ' (ชนกับ ' + hashData[idx].slice(0, -1).join(', ') + ' ต่อท้ายลิสต์)' : ' (ไม่ชน)'));
    hashRender(idx, idx);
  } else {
    const used = hashData.filter(b => b.length > 0).length;
    if (used >= HASH_SIZE) { hashStatus('⚠ ตารางเต็ม (α = ' + HASH_SIZE + '/' + HASH_SIZE + ') — ต้องขยายตารางก่อนแทรก'); return; }
    hashData.push([v]);
    const probePath = [];
    let idx = hashFn(v);
    let steps = 0;
    while (used > 0 && steps < HASH_SIZE) {
      const cur = hashData.find(b => b[0] === idx);
      if (!cur) break;
      probePath.push(idx);
      idx = (idx + 1) % HASH_SIZE;
      steps++;
    }
    hashStatus('Insert ' + v + ' → h(' + v + ')=' + hashFn(v) + (probePath.length ? ' ชนแล้ว ลองช่อง ' + probePath.join(' → ') + ' → ลงช่อง ' + idx : ' → ลงช่อง ' + idx + ' (ไม่ชน)'));
    hashRender(idx, idx, probePath);
  }
  input.value = '';
  input.focus();
}

function hashSearch() {
  const input = document.getElementById('hashInput');
  const v = parseInt(input.value);
  if (isNaN(v) || v < 1) { alert('กรุณาใส่เลข 1-99'); return; }
  if (hashMethod === 'chaining') {
    const idx = hashFn(v);
    const found = hashData[idx] && hashData[idx].includes(v);
    hashStatus(found ? '✓ พบ ' + v + ' ในถังที่ ' + idx : '✗ ไม่พบ ' + v + ' (ถัง ' + idx + ' ไม่มี)');
    hashRender(idx, found ? -1 : idx);
  } else {
    const probePath = [];
    let idx = hashFn(v);
    let steps = 0;
    while (steps < HASH_SIZE) {
      probePath.push(idx);
      const cur = hashData.find(b => b[0] === idx);
      if (!cur) break;
      if (cur[0] === v) {
        hashStatus('✓ พบ ' + v + ' ที่ช่อง ' + idx + ' (ตรวจช่อง ' + probePath.join(' → ') + ')');
        hashRender(idx, idx, probePath);
        input.value = '';
        return;
      }
      idx = (idx + 1) % HASH_SIZE;
      steps++;
    }
    hashStatus('✗ ไม่พบ ' + v + ' (ตรวจช่อง ' + probePath.join(' → ') + ' แล้วว่าง → หยุด)');
    hashRender(-1, -1, probePath);
  }
  input.value = '';
}

function hashDelete() {
  const input = document.getElementById('hashInput');
  const v = parseInt(input.value);
  if (isNaN(v) || v < 1) { alert('กรุณาใส่เลข 1-99'); return; }
  if (hashMethod === 'chaining') {
    const idx = hashFn(v);
    if (hashData[idx]) {
      const before = hashData[idx].length;
      hashData[idx] = hashData[idx].filter(x => x !== v);
      if (hashData[idx].length === before) {
        hashStatus('✗ ไม่พบ ' + v + ' ในถังที่ ' + idx);
      } else {
        hashStatus('🗑 ลบ ' + v + ' ออกจากถังที่ ' + idx);
      }
    } else {
      hashStatus('✗ ไม่พบ ' + v + ' (ถังว่าง)');
    }
    hashRender(idx);
  } else {
    const foundIdx = hashData.findIndex(b => b[0] === v);
    if (foundIdx === -1) { hashStatus('✗ ไม่พบ ' + v); hashRender(); input.value = ''; return; }
    hashData.splice(foundIdx, 1);
    hashStatus('🗑 ลบ ' + v + ' ออกจากช่องที่ ' + foundIdx);
    hashRender(foundIdx);
  }
  input.value = '';
}

function hashClear() {
  hashData = [];
  for (let i = 0; i < HASH_SIZE; i++) hashData[i] = [];
  hashStatus('');
  hashRender();
}
hashClear();
document.getElementById('hashInsert').addEventListener('click', hashInsert);
document.getElementById('hashSearch').addEventListener('click', hashSearch);
document.getElementById('hashDelete').addEventListener('click', hashDelete);
document.getElementById('hashClear').addEventListener('click', hashClear);
document.getElementById('hashInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') hashInsert();
});
document.querySelectorAll('#w7 .tab[data-method]').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('#w7 .tab[data-method]').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    hashMethod = t.dataset.method;
    hashClear();
  });
});

/* ============================================
   JOSEPHUS CALCULATOR (W4)
============================================ */
function josephusCompute() {
  const n = parseInt(document.getElementById('josN').value) || 1;
  const el = document.getElementById('josResult');
  const k = Math.floor(Math.log2(n));
  const pow = Math.pow(2, k);
  const l = n - pow;
  const j = 2 * l + 1;
  let steps = `<strong style="color:var(--primary)">n = ${n}</strong><br>`;
  steps += `1) หา k = ⌊log₂${n}⌋ = <strong>${k}</strong><br>`;
  steps += `2) 2<sup>k</sup> = <strong>${pow}</strong> → l = ${n} − ${pow} = <strong>${l}</strong><br>`;
  steps += `3) J(${n}) = 2·${l} + 1 = <strong style="color:var(--accent)">${j}</strong><br>`;
  steps += `คำตอบ: คนที่รอดคือ <strong style="font-size:18px;color:var(--accent)">ตำแหน่ง ${j}</strong>`;
  el.innerHTML = steps;
}
document.getElementById('josRun').addEventListener('click', josephusCompute);
document.getElementById('josN').addEventListener('keypress', e => {
  if (e.key === 'Enter') josephusCompute();
});

/* ============================================
   PROBLEM TYPE CLASSIFIER (W1)
============================================ */
const ptProblems = [
  { t: 'Sorting', q: 'เรียงลำดับข้อมูล 5000 ชื่อจาก ก-ฮ' },
  { t: 'Searching', q: 'ค้นหาหมายเลขโทรศัพท์ในสมุดรายชื่อ' },
  { t: 'String', q: 'นับจำนวนครั้งที่คำว่า "algorithm" ปรากฏในบทความ' },
  { t: 'Graph', q: 'หาเส้นทางที่สั้นที่สุดระหว่าง 2 เมืองในแผนที่' },
  { t: 'Combinatorial', q: 'หาการจัดเรียงลำดับสินค้า 10 ชิ้นที่ให้กำไรมากที่สุด' },
  { t: 'Geometric', q: 'หาว่าจุด 2 จุดใดใกล้กันที่สุดบนระนาบ' },
  { t: 'Numerical', q: 'คำนวณรากที่สองของตัวเลขแบบแม่นยำสูง' },
  { t: 'Searching', q: 'ตรวจว่าเลข 42 อยู่ในรายการคะแนนสอบหรือไม่' },
  { t: 'Graph', q: 'ระบายสีแผนที่ให้จังหวัดที่ติดกันมีสีต่างกัน' },
  { t: 'Sorting', q: 'จัดเรียงรายการสินค้าตามราคาจากถูกไปแพง' }
];
let ptIdx = 0;
function ptShow() {
  document.getElementById('ptProblem').textContent = ptProblems[ptIdx].q;
  document.getElementById('ptStatus').innerHTML = 'โจทย์ข้อที่ ' + (ptIdx + 1) + '/' + ptProblems.length + ' — เลือกประเภทที่ถูกต้อง';
  document.querySelectorAll('.pt-type').forEach(b => {
    b.classList.remove('active');
    b.style.opacity = 1;
  });
}
document.getElementById('ptNext').addEventListener('click', () => {
  ptIdx = (ptIdx + 1) % ptProblems.length;
  ptShow();
});
document.querySelectorAll('.pt-type').forEach(btn => {
  btn.addEventListener('click', () => {
    const correct = ptProblems[ptIdx].t === btn.dataset.t;
    const status = document.getElementById('ptStatus');
    status.innerHTML = correct
      ? '<strong style="color:var(--accent)">✓ ถูกต้อง!</strong> ' + ptProblems[ptIdx].q
      : '<strong style="color:var(--danger,#d9534f)">✗ ลองใหม่</strong> ข้อนี้คือ <strong>' + ptProblems[ptIdx].t + '</strong>';
  });
});
ptShow();

/* ============================================
   COMPLEXITY CALCULATOR (W2)
============================================ */
function ccCompute() {
  const n = parseInt(document.getElementById('ccN').value) || 1;
  const cls = document.getElementById('ccClass').value;
  const el = document.getElementById('ccResult');
  let ops, label;
  const fmt = v => v >= 1e9 ? (v / 1e9).toFixed(2) + ' พันล้าน' :
    v >= 1e6 ? (v / 1e6).toFixed(2) + ' ล้าน' :
    v >= 1e4 ? (v / 1e3).toFixed(1) + ' พัน' : v;
  switch (cls) {
    case '1': ops = 1; label = 'O(1)'; break;
    case 'logn': ops = Math.ceil(Math.log2(n)); label = 'O(log n)'; break;
    case 'n': ops = n; label = 'O(n)'; break;
    case 'nlogn': ops = Math.ceil(n * Math.log2(n)); label = 'O(n log n)'; break;
    case 'n2': ops = n * n; label = 'O(n²)'; break;
    case 'n3': ops = n * n * n; label = 'O(n³)'; break;
    case '2n': ops = Math.pow(2, Math.min(n, 60)); label = 'O(2ⁿ)'; break;
    case 'n!': ops = (() => { let f = 1; for (let i = 2; i <= Math.min(n, 30); i++) f *= i; return f; })(); label = 'O(n!)'; break;
  }
  el.innerHTML = `<strong style="color:var(--primary)">${label}</strong> กับ n = ${fmt(n)}<br>ทำงานประมาณ <strong style="color:var(--accent);font-size:18px">${fmt(ops)}</strong> ครั้ง`;
  if (cls === 'n2' && n > 1000) el.innerHTML += '<br><span style="color:var(--rose)">⚠ O(n²) เริ่มทำงานหนักเมื่อ n > 1,000</span>';
  if ((cls === '2n' || cls === 'n!') && n > 25) el.innerHTML += '<br><span style="color:var(--rose)">⚠ ระเบิด! O(2ⁿ)/O(n!) ใช้ไม่ได้จริงกับ n ที่ใหญ่</span>';
}
document.getElementById('ccRun').addEventListener('click', ccCompute);
document.getElementById('ccN').addEventListener('keypress', e => {
  if (e.key === 'Enter') ccCompute();
});

/* ============================================
   STRING MATCHING VIZ (W3)
============================================ */
let smState = null;
function smInit() {
  const T = document.getElementById('smText').value;
  const P = document.getElementById('smPattern').value;
  smState = { T, P, i: 0, j: 0, done: false };
  smRender();
  document.getElementById('smStatus').textContent = 'กด Step เพื่อเริ่ม — ตำแหน่งที่ 0';
}
function smRender() {
  const { T, P, i, j, done } = smState;
  const el = document.getElementById('smDisplay');
  const m = P.length;
  let html = '';
  for (let row = 0; row < m; row++) {
    const shift = i + row;
    html += (row === 0 ? 'T: ' : '&nbsp;&nbsp;') + T.split('').map((c, idx) => {
      if (idx === shift && row === 0) return '<span style="color:var(--accent);font-weight:700">' + c + '</span>';
      return c;
    }).join('') + '<br>';
  }
  html += 'P: ' + ' '.repeat(i).split('').map(() => '&nbsp;').join('') + P.split('').map((c, k) => {
    if (k < j && !done) return '<span style="color:var(--accent)">' + c + '</span>';
    if (done && k < j) return '<span style="color:var(--accent);font-weight:700">' + c + '</span>';
    return c;
  }).join('');
  el.innerHTML = html;
}
function smStep() {
  const { T, P, i, j } = smState;
  const m = P.length;
  if (i > T.length - m) {
    document.getElementById('smStatus').innerHTML = '<strong style="color:var(--rose)">ไม่พบ Pattern ใน Text</strong> — เลื่อนครบทุกตำแหน่งแล้ว';
    return;
  }
  if (P[j] === T[i + j]) {
    smState.j = j + 1;
    if (smState.j === m) {
      smState.done = true;
      document.getElementById('smStatus').innerHTML = '<strong style="color:var(--accent)">✓ พบ Pattern ที่ตำแหน่ง ' + i + '</strong>';
      smRender();
      return;
    }
    document.getElementById('smStatus').textContent = 'ตัวตรง (P[' + j + '] = T[' + (i + j) + ']) → เทียบตัวถัดไป';
  } else {
    document.getElementById('smStatus').innerHTML = 'ไม่ตรง (P[' + j + '] ≠ T[' + (i + j) + ']) → <strong>เลื่อนไปตำแหน่ง ' + (i + 1) + '</strong>';
    smState.i = i + 1;
    smState.j = 0;
  }
  smRender();
}
document.getElementById('smStep').addEventListener('click', smStep);
document.getElementById('smReset').addEventListener('click', smInit);
document.getElementById('smText').addEventListener('change', smInit);
document.getElementById('smPattern').addEventListener('change', smInit);
smInit();

/* ============================================
   MASTER THEOREM SOLVER (W5)
============================================ */
function mtCompute() {
  const a = parseInt(document.getElementById('mtA').value) || 1;
  const b = parseInt(document.getElementById('mtB').value) || 2;
  const f = document.getElementById('mtF').value;
  const el = document.getElementById('mtResult');
  const p = Math.log(a) / Math.log(b);
  const isNlogn = f === 'nlogn';
  const fVal = { '1': 0, 'n': 1, 'nlogn': 1, 'n2': 2, 'n3': 3 }[f];
  let caseNo, result;
  if (p > fVal) {
    caseNo = 1;
    result = 'Θ(n^' + p.toFixed(3) + ')';
  } else if (p < fVal) {
    caseNo = 3;
    result = isNlogn ? 'Θ(n log n)' : f === '1' ? 'Θ(1)' : 'Θ(' + f.replace('n2', 'n²').replace('n3', 'n³') + ')';
  } else if (isNlogn) {
    caseNo = 2;
    result = 'Θ(n log² n)';
  } else {
    caseNo = 2;
    result = 'Θ(n^' + p.toFixed(3) + ' log n)';
  }
  const cmp = isNlogn ? 'n (พร้อม log n)' : f;
  el.innerHTML = `<strong style="color:var(--primary)">T(n) = ${a}·T(n/${b}) + ${f}</strong><br>` +
    `log<sub>b</sub>a = log<sub>${b}</sub>${a} = <strong>${p.toFixed(3)}</strong> → n<sup>${p.toFixed(3)}</sup> เทียบกับ f(n) = ${cmp}<br>` +
    (isNlogn && p.toFixed(3) === fVal.toFixed(3) ? `<em style="color:var(--muted)">f(n) = Θ(n<sup>${p.toFixed(3)}</sup>·log n) → case 2 มี log พิเศษ: Θ(n log² n)</em><br>` : '') +
    `<strong style="color:var(--accent)">Case ${caseNo === 1 ? '01' : caseNo === 2 ? '02' : '03'} → T(n) = ${result}</strong>`;
}
document.getElementById('mtRun').addEventListener('click', mtCompute);

/* ============================================
   HORNER STEP-THROUGH (W6)
============================================ */
let horState = null;
function horInit() {
  const raw = document.getElementById('horCoeffs').value.split(',').map(s => parseFloat(s.trim()));
  const x = parseFloat(document.getElementById('horX').value) || 0;
  horState = { coeffs: raw, x, idx: 0, result: 0 };
  const p = raw.map((c, i) => (i === 0 ? '' : ' + ') + c + 'x^' + (raw.length - 1 - i)).join('').replace(/\+ -/g, '- ');
  document.getElementById('horBody').innerHTML = `<div class="trace-row"><div class="trace-step">0</div><div>p(x) = ${p} ที่ x = ${x} — กด Step เพื่อเริ่ม</div></div>`;
}
function horStep() {
  const { coeffs, x, idx, result } = horState;
  if (idx >= coeffs.length) {
    document.getElementById('horBody').innerHTML += `<div class="trace-row"><div class="trace-step">✓</div><div><strong>จบ — p(x) = ${result}</strong></div></div>`;
    return;
  }
  const c = coeffs[idx];
  const next = result * x + c;
  const stepNum = idx + 1;
  const expr = idx === 0 ? `${c}` : `(${result} × ${x}) + ${c}`;
  horState.result = next;
  horState.idx = idx + 1;
  document.getElementById('horBody').innerHTML += `<div class="trace-row"><div class="trace-step">${stepNum}</div><div>อ่าน ${c} → ${expr} = <strong>${next}</strong></div></div>`;
  if (idx === coeffs.length - 1) {
    document.getElementById('horBody').innerHTML += `<div class="trace-row"><div class="trace-step">✓</div><div><strong style="color:var(--accent)">คำตอบ p(${x}) = ${next}</strong></div></div>`;
  }
}
document.getElementById('horStep').addEventListener('click', horStep);
document.getElementById('horReset').addEventListener('click', horInit);
document.getElementById('horCoeffs').addEventListener('input', horInit);
document.getElementById('horX').addEventListener('input', horInit);
horInit();

/* ============================================
   QUIZ
============================================ */
const quizContainer = document.getElementById('quizContainer');
let quizAnswered = {};
let quizFilter = 'all';
let quizWrongOnly = false;
let quizOrder = quizQuestions.map((_, i) => i);
let quizTimer = null;
let quizTimerLeft = 0;

function quizLoad() {
  try {
    quizAnswered = JSON.parse(localStorage.getItem('algoQuizAnswers')) || {};
  } catch (e) { quizAnswered = {}; }
}
function quizSave() {
  try { localStorage.setItem('algoQuizAnswers', JSON.stringify(quizAnswered)); } catch (e) {}
}

function quizVisible(qi) {
  const q = quizQuestions[qi];
  if (quizWrongOnly && (quizAnswered[qi] === undefined || quizAnswered[qi] === q.a)) return false;
  if (quizFilter !== 'all' && q.w !== quizFilter) return false;
  return true;
}

function renderQuizFilters() {
  const bar = document.getElementById('quizFilters');
  if (!bar) return;
  const weeks = [['all', 'ทั้งหมด'], ['w1', 'W1'], ['w2', 'W2'], ['w3', 'W3'], ['w4', 'W4'], ['w5', 'W5'], ['w6', 'W6'], ['w7', 'W7'], ['gen', 'โครงสร้างข้อมูล']];
  bar.innerHTML = weeks.map(([key, label]) =>
    `<button class="quiz-filter${quizFilter === key ? ' active' : ''}" data-w="${key}">${label}</button>`).join('') +
    `<button class="quiz-filter${quizWrongOnly ? ' active' : ''}" id="quizWrongBtn" style="margin-left:auto">ทบทวนข้อที่ผิด</button>` +
    `<button class="quiz-filter" id="quizShuffleBtn">สลับข้อ</button>` +
    `<button class="quiz-filter${quizTimer ? ' active' : ''}" id="quizTimerBtn">จับเวลา</button>`;
  bar.querySelectorAll('.quiz-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id === 'quizWrongBtn') { quizWrongOnly = !quizWrongOnly; renderQuizFilters(); renderQuiz(); return; }
      if (btn.id === 'quizShuffleBtn') { quizOrder = quizOrder.sort(() => Math.random() - 0.5); renderQuiz(); return; }
      if (btn.id === 'quizTimerBtn') { toggleQuizTimer(); return; }
      quizFilter = btn.dataset.w;
      renderQuizFilters();
      renderQuiz();
    });
  });
}

function toggleQuizTimer() {
  if (quizTimer) {
    clearInterval(quizTimer); quizTimer = null;
    document.getElementById('quizTimerDisplay').textContent = '';
  } else {
    quizTimerLeft = 45 * 60;
    const show = () => {
      const m = String(Math.floor(quizTimerLeft / 60)).padStart(2, '0');
      const s = String(quizTimerLeft % 60).padStart(2, '0');
      const el = document.getElementById('quizTimerDisplay');
      if (el) el.textContent = '⏱ ' + m + ':' + s;
    };
    show();
    quizTimer = setInterval(() => {
      quizTimerLeft--;
      if (quizTimerLeft <= 0) { clearInterval(quizTimer); quizTimer = null; }
      show();
    }, 1000);
  }
  renderQuizFilters();
}

function renderQuiz() {
  quizContainer.innerHTML = '';
  quizOrder.forEach(qi => {
    const q = quizQuestions[qi];
    if (!quizVisible(qi)) return;
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-q">
        <span class="quiz-q-num">คำถามที่ ${String(qi+1).padStart(2,'0')}<span class="quiz-week-tag">${q.w === 'gen' ? 'ทั่วไป' : 'W' + q.w.slice(1)}</span></span>
        ${q.q}
      </div>
      <div class="quiz-options">
        ${q.opts.map((opt, oi) => `
          <button class="quiz-opt" data-qi="${qi}" data-oi="${oi}">
            <div class="quiz-opt-mark">${String.fromCharCode(65+oi)}</div>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-explain" id="explain-${qi}"><strong>เฉลย:</strong> ${q.e}</div>
    `;
    quizContainer.appendChild(card);
  });
  
  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const qi = parseInt(btn.dataset.qi);
      const oi = parseInt(btn.dataset.oi);
      if (quizAnswered[qi] !== undefined) return;
      quizAnswered[qi] = oi;
      quizSave();
      
      const opts = document.querySelectorAll(`.quiz-opt[data-qi="${qi}"]`);
      opts.forEach((o, i) => {
        o.classList.add('disabled');
        if (i === quizQuestions[qi].a) o.classList.add('correct');
        else if (i === oi && oi !== quizQuestions[qi].a) o.classList.add('wrong');
      });
      document.getElementById(`explain-${qi}`).classList.add('show');
      updateQuizScore();
    });
  });
}

function updateQuizScore() {
  let score = 0;
  Object.keys(quizAnswered).forEach(qi => {
    if (quizAnswered[qi] === quizQuestions[parseInt(qi)].a) score++;
  });
  const answered = Object.keys(quizAnswered).length;
  document.getElementById('scoreNum').textContent = score;
  document.getElementById('scorePct').textContent = answered ? '(' + Math.round(score / quizCount * 100) + '%)' : '';
  document.getElementById('answeredNum').textContent = answered;
  const weekEl = document.getElementById('quizWeekScore');
  if (weekEl) {
    const weeks = ['w1','w2','w3','w4','w5','w6','w7','gen'];
    weekEl.innerHTML = weeks.map(w => {
      const idx = quizQuestions.map((q, i) => q.w === w ? i : -1).filter(i => i >= 0);
      const got = idx.filter(i => quizAnswered[i] === quizQuestions[i].a).length;
      return `<span class="quiz-week-mini"><b>${w === 'gen' ? 'ทั่วไป' : w.toUpperCase()}</b> ${got}/${idx.length}</span>`;
    }).join('');
  }
}

const quizCount = quizQuestions.length;
document.getElementById('heroQuizCount').textContent = quizCount;
document.getElementById('tocQuizCount').textContent = quizCount;
document.getElementById('quizMetaCount').textContent = quizCount;
document.getElementById('quizTotal').textContent = '/' + quizCount;

quizLoad();
renderQuizFilters();
renderQuiz();
updateQuizScore();

document.getElementById('quizReset').addEventListener('click', () => {
  quizAnswered = {};
  quizSave();
  renderQuizFilters();
  renderQuiz();
  updateQuizScore();
  document.getElementById('quiz').scrollIntoView({behavior:'smooth'});
});

document.getElementById('quizReveal').addEventListener('click', () => {
  quizQuestions.forEach((q, qi) => {
    if (quizAnswered[qi] === undefined) {
      quizAnswered[qi] = -1;
      const opts = document.querySelectorAll(`.quiz-opt[data-qi="${qi}"]`);
      opts.forEach((o, i) => {
        o.classList.add('disabled');
        if (i === q.a) o.classList.add('correct');
      });
      document.getElementById(`explain-${qi}`).classList.add('show');
    }
  });
  quizSave();
  updateQuizScore();
  renderQuizFilters();
  renderQuiz();
});

/* ============================================
   KEYBOARD NAVIGATION
============================================ */
const sectionIds = ['hero','w1','w2','w3','w4','w5','w6','w7','ss','quiz','exam','reference'];
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const current = sectionIds.findIndex(id => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= 100 && rect.bottom >= 100;
  });
  if (current === -1) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const next = Math.min(current + 1, sectionIds.length - 1);
    document.getElementById(sectionIds[next]).scrollIntoView({behavior:'smooth'});
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const prev = Math.max(current - 1, 0);
    document.getElementById(sectionIds[prev]).scrollIntoView({behavior:'smooth'});
  }
});

/* ============================================
   FADE IN ANIMATIONS
============================================ */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.card, .section-head').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

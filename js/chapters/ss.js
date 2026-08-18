/* ss content + State Space Search graphs (ported from state digram.ipynb) */

document.getElementById('ss').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">Bonus</div>
        <h2 class="section-title">State Space Search</h2>
        <div class="section-meta">State Diagram · BFS หาเส้นทางสั้นสุด</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">แนวคิด — เปลี่ยนปัญหามาเป็นกราฟสถานะ</h3>
        <p class="card-lead">3 โจทย์จาก "มีปัญหาแนว State Space Search" — แต่ละข้อ: นิยาม State → คำนวณ State ทั้งหมดที่ไปถึงได้ → วาด <strong>State Space Graph</strong></p>
        <div class="step-grid">
          <div class="step-item"><div class="step-num">Step 1</div><div class="step-text"><strong>นิยาม State</strong> — เลือกตัวแปรแทนสถานะให้ครบ (ใครอยู่ฝั่งไหน, เรืออยู่ไหน)</div></div>
          <div class="step-item"><div class="step-num">Step 2</div><div class="step-text"><strong>ระบุ Actions</strong> — ทุกวิธีที่ State เปลี่ยนไป State อื่น</div></div>
          <div class="step-item"><div class="step-num">Step 3</div><div class="step-text"><strong>ตรวจ Constraints</strong> — ตัด Branch ที่ไม่ valid ทิ้ง</div></div>
          <div class="step-item"><div class="step-num">Step 4</div><div class="step-text"><strong>BFS</strong> — หาเส้นทางสั้นสุดจาก Start ไป Goal</div></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">BFS คืออะไร? ทำไมรับประกัน "สั้นสุด"?</h3>
        <p class="card-lead">BFS (Breadth-First Search) สำรวจกราฟเป็น <strong>"ชั้น" (layer)</strong> — State ที่ห่าง 1 ขั้นก่อน, แล้ว 2 ขั้น, 3 ขั้น…</p>
        <div class="step-trace">
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>หลักการ:</strong> เริ่มที่ Start → เก็บทุก State ที่ต่อกัน 1 ขั้นไว้ใน <strong>Queue (คิว)</strong> → ดึงออกมาสำรวจทีละตัว → เก็บ State ที่ต่อจากมันเข้า Queue ต่อท้าย</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>ทำไมใช้ Queue?</strong> FIFO — ตัวที่เข้ามาก่อนถูกสำรวจก่อน → สำรวจครบชั้นที่ 1 จึงเริ่มชั้นที่ 2 (ถ้าเป็น Stack/DFS จะลึกมาก่อน ไม่เป็นชั้น)</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div><strong>ทำไมรับประกันสั้นสุด?</strong> เพราะเราไม่เคยข้ามชั้น — Goal ตัวแรกที่เจอต้องอยู่ชั้นที่ต่ำที่สุด = ใช้จำนวนขั้น (hop) น้อยที่สุด</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div><strong>visited set</strong> = ชุดจดจำ State ที่ "ไปมาแล้ว" — ป้องกันสำรวจซ้ำ (โดยเฉพาะกราฟมีวงจร/cycle) มิฉะนั้น BFS จะวนไม่จบ</div></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">1) Missionaries and Cannibals</h3>
        <p class="card-lead">บาทหลวง 3 + มนุษย์กินคน 3 · State <code>(M, C, B)</code> — M, C = ฝั่งซ้าย, B = 1 เรือซ้าย / 0 เรือขวา · เริ่ม <code>(3,3,1)</code> → เป้าหมาย <code>(0,0,0)</code></p>
        <div class="callout callout-warn" style="margin-bottom:12px">
          <div class="callout-icon">!</div>
          <div class="callout-body">ฝั่งไหนมีบาทหลวง (M&gt;0) ต้องมี C ≤ M — ถ้า C &gt; M มนุษย์กินคนจะกินบาทหลวง → ตัด branch ทิ้ง</div>
        </div>
        <div class="viz-stat" id="ssStat1"></div>
        <div style="overflow-x:auto"><div class="ss-graph-box" id="ssGraph1"></div></div>
        <div class="ss-info" id="ssInfo1"><p class="ss-info-hint" style="text-align:center;margin:0">👆 คลิกที่ Node เพื่อดูรายละเอียด State และ Actions ที่เชื่อมต่อ</p></div>
      </div>

      <div class="card">
        <h3 class="card-title">2) Water Jug Problem</h3>
        <p class="card-lead">เหยือก 5L + 3L → ให้ได้ 4L · State <code>(X, Y)</code> — น้ำในเหยือก 5L / 3L · เริ่ม <code>(0,0)</code> → เป้าหมาย <code>(4, y)</code> (กราฟนี้แสดง <code>(4,3)</code>)</p>
        <div class="callout callout-warn" style="margin-bottom:12px">
          <div class="callout-icon">!</div>
          <div class="callout-body">มี <strong>Cycle</strong> ในกราฟ เช่น (0,0)→(5,0)→(0,0) → ต้องใช้ <strong>visited set</strong> กันวนลูปไม่รู้จบ</div>
        </div>
        <div class="step-trace">
          <div class="step-trace-head">▶ กติกาเทน้ำ (Actions มีแค่ 6 แบบ) + ทำไมเป้าหมายเป็น (4,3)?</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>เติม</strong>: เติมเหยือกใดให้เต็ม (5L หรือ 3L) · <strong>เททิ้ง</strong>: เทเหยือกใดให้หมด</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>เทข้าม</strong>: เทจากเหยือกหนึ่งไปอีกเหยือก จน "เหยือกปลายทางเต็ม" หรือ "เหยือกต้นทางหมด" (เททีละน้อยไม่ได้)</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div><strong>หน่วย:</strong> State (X, Y) = X ลิตรในเหยือก 5L, Y ลิตรในเหยือก 3L — เป้าหมาย "ได้น้ำ 4 ลิตร" คือ X = 4 (5L เหลือน้ำ 4L) ไม่ใช่ผลรวม X+Y</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>BFS ไปถึง (4,3) ใน 6 ขั้น: เติม5 → (5,0) · เท5→3 → (2,3) · เท3 → (2,0) · เท5→3 → (0,2) · เติม5 → (5,2) · เท5→3 → <strong>(4,3)</strong> ✅ ตัวกราฟจึงจบที่ (4,3) — เหยือก 3L เต็มเป็นแค่ผลพลอยได้</div></div>
          </div>
        </div>
        <div class="viz-stat" id="ssStat2"></div>
        <div style="overflow-x:auto"><div class="ss-graph-box" id="ssGraph2"></div></div>
        <div class="ss-info" id="ssInfo2"><p class="ss-info-hint" style="text-align:center;margin:0">👆 คลิกที่ Node เพื่อดู Actions (Fill/Empty/Pour) และสังเกต Cycle ที่เกิดขึ้น</p></div>
      </div>

      <div class="card">
        <h3 class="card-title">3) River Crossing 2.0 (F, W, G, D)</h3>
        <p class="card-lead">ชาวนา F, หมาป่า W, แกะ G, หมาบ้าน D · State <code>(F, W, G, D)</code> — แต่ละตัว 0 = ฝั่งซ้าย, 1 = ฝั่งขวา · เริ่ม <code>(0,0,0,0)</code> → เป้าหมาย <code>(1,1,1,1)</code></p>
        <div class="callout callout-warn" style="margin-bottom:12px">
          <div class="callout-icon">!</div>
          <div class="callout-body">เมื่อ F ไม่อยู่: ห้าม W=G (หมาป่ากินแกะ) และห้าม D=G (หมากัดแกะ) — W กับ D อยู่ด้วยกันได้ · เรือจุ 2 ที่นั่งรวม F (พาได้ 0 หรือ 1 ตัว)</div>
        </div>
        <div class="viz-stat" id="ssStat3"></div>
        <div style="overflow-x:auto"><div class="ss-graph-box" id="ssGraph3"></div></div>
        <div class="ss-info" id="ssInfo3"><p class="ss-info-hint" style="text-align:center;margin:0">👆 คลิกที่ Node เพื่อดูสถานการณ์บนฝั่งซ้าย/ขวา และ Actions ที่ชาวนาทำได้</p></div>
      </div>

      <div class="card">
        <h3 class="card-title">สรุป 3 ข้อ</h3>
        <table class="complexity-table">
          <thead><tr><th>ข้อ</th><th>State</th><th>Action (Edge)</th><th>จุดสำคัญ</th></tr></thead>
          <tbody>
            <tr><td><span class="badge badge-primary">1. Missionaries</span></td><td>(M, C, B)</td><td>เรือพา 1–2 คน</td><td>ตัด branch ที่ C &gt; M</td></tr>
            <tr><td><span class="badge badge-primary">2. Water Jug</span></td><td>(X, Y)</td><td>เติม / เททิ้ง / เทข้าม</td><td>มี cycle → ต้องมี visited set</td></tr>
            <tr><td><span class="badge badge-primary">3. River Crossing</span></td><td>(F, W, G, D)</td><td>F พา 0–1 ตัว</td><td>เช็คปลอดภัยเมื่อ F ไม่อยู่</td></tr>
          </tbody>
        </table>
        <div class="callout callout-tip" style="margin-top:12px">
          <div class="callout-icon">!</div>
          <div class="callout-body">เส้นทางสั้นสุด (BFS): ข้อ 1 = <strong>11 ขั้น</strong> · ข้อ 2 = <strong>6 ขั้น</strong> · ข้อ 3 = <strong>7 เที่ยว</strong></div>
        </div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — State Space Search
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>State</strong>ตัวแปรแทนสถานะครบ (ใครอยู่ไหน/เรืออยู่ไหน)</div>
          <div class="mem-chip"><strong>Transition</strong>ทุก Action ที่เปลี่ยน State</div>
          <div class="mem-chip"><strong>Constraint</strong>ตัด branch ไม่ valid ก่อน BFS</div>
          <div class="mem-chip"><strong>BFS</strong>รับประกันเส้นทางสั้นสุด (hop count)</div>
          <div class="mem-chip"><strong>Cycle</strong>ใช้ visited set กันวนลูป (Water Jug)</div>
          <div class="mem-chip"><strong>Missionaries</strong>M=0 หรือ C ≤ M เสมอ</div>
        </div>
      </div>
`;

/* ---- graph engine (layout ported from state_space_graphs (1).html) ---- */

function ssKey(s) { return s.join(','); }

function ssBuildEdges(states, neighbors) {
  const map = new Map(states.map(s => [ssKey(s), s]));
  const edges = [];
  for (const s of states) {
    for (const [v, lab] of neighbors(s)) {
      if (map.has(ssKey(v))) edges.push({ from: s, to: v, label: lab });
    }
  }
  return edges;
}

function ssShortestPath(start, goal, neighbors) {
  const par = { [ssKey(start)]: null };
  const q = [start];
  while (q.length) {
    const u = q.shift();
    if (ssKey(u) === ssKey(goal)) break;
    for (const [v] of neighbors(u)) {
      if (!(ssKey(v) in par)) { par[ssKey(v)] = u; q.push(v); }
    }
  }
  if (!(ssKey(goal) in par)) return null;
  const p = []; let c = goal;
  while (c !== null) { p.push(c); c = par[ssKey(c)]; }
  return p.reverse();
}

function ssRenderCircle(containerId, statId, infoId, cfg) {
  const path = ssShortestPath(cfg.start, cfg.goal, cfg.neighbors);
  const optimalSet = new Set(path.map(ssKey));
  const optimalEdges = new Set();
  for (let i = 0; i < path.length - 1; i++) optimalEdges.add(ssKey(path[i]) + '>' + ssKey(path[i + 1]));
  const r = cfg.nodeSize / 2;
  let W = 0, H = 0;
  for (const s of cfg.states) {
    const [x, y] = cfg.positions[ssKey(s)];
    W = Math.max(W, x); H = Math.max(H, y);
  }
  W += cfg.nodeSize + 40; H += cfg.nodeSize + 40;
  const sKeyStart = ssKey(cfg.start), sKeyGoal = ssKey(cfg.goal);

  const o = [];
  o.push('<svg class="ss-svg" xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '">');
  (cfg.bankLabels || []).forEach(l =>
    o.push('<text x="' + l[0] + '" y="' + l[1] + '" font-size="13" font-weight="bold" fill="var(--muted)" text-anchor="' + (l[3] || 'start') + '">' + l[2] + '</text>'));
  for (const e of cfg.edges) {
    const [x1, y1] = cfg.positions[ssKey(e.from)];
    const [x2, y2] = cfg.positions[ssKey(e.to)];
    const isOpt = optimalEdges.has(ssKey(e.from) + '>' + ssKey(e.to));
    o.push('<line data-from="' + ssKey(e.from) + '" data-to="' + ssKey(e.to) + '" class="ss-edge' + (isOpt ? ' ss-edge-opt' : '') + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (isOpt ? '#2196F3' : '#BDBDBD') + '" stroke-width="' + (isOpt ? '3' : '1') + '" opacity="' + (isOpt ? '0.9' : '0.35') + '"/>');
  }
  for (const s of cfg.states) {
    const [x, y] = cfg.positions[ssKey(s)];
    const k = ssKey(s);
    const isStart = k === sKeyStart;
    const isGoal = cfg.goalTest ? cfg.goalTest(s) : k === sKeyGoal;
    const isOnOpt = optimalSet.has(k);
    let fill = '#fff', stroke = isOnOpt ? '#2196F3' : '#9E9E9E', color = '#333';
    if (isStart) { fill = '#4CAF50'; stroke = '#2E7D32'; color = '#fff'; }
    if (isGoal) { fill = '#FF9800'; stroke = '#E65100'; color = '#fff'; }
    o.push('<g data-key="' + k + '" class="ss-node" style="cursor:pointer">');
    o.push('<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="3"/>');
    o.push(cfg.nodeHtml(s, x, y, color));
    o.push('</g>');
  }
  o.push('</svg>');

  document.getElementById(statId).textContent = 'State ทั้งหมด ' + cfg.states.length + ' จุด · ' + cfg.edges.length + ' edge · เส้นทางสั้นสุด ' + (path.length - 1) + ' ขั้น';
  document.getElementById(containerId).innerHTML = o.join('');
  ssWire(containerId, infoId, cfg.states, cfg.describe);
}

function ssWire(containerId, infoId, states, describe) {
  const box = document.getElementById(containerId);
  const info = document.getElementById(infoId);
  const nodes = box.querySelectorAll('.ss-node');
  const edgePaths = box.querySelectorAll('.ss-edge');
  const stateOf = {};
  states.forEach(s => { stateOf[ssKey(s)] = s; });
  nodes.forEach(g => {
    g.addEventListener('click', () => {
      nodes.forEach(n => n.classList.add('ss-node-dim'));
      edgePaths.forEach(e => e.classList.add('ss-edge-dim'));
      g.classList.remove('ss-node-dim');
      const c = g.querySelector('circle');
      c.style.stroke = '#2196F3';
      c.style.strokeWidth = '3';
      edgePaths.forEach(e => {
        if (e.dataset.from === g.dataset.key || e.dataset.to === g.dataset.key) {
          e.classList.remove('ss-edge-dim');
          if (e.classList.contains('ss-edge-opt')) e.classList.add('ss-edge-hot');
        }
      });
      info.innerHTML = describe(stateOf[g.dataset.key]);
    });
  });
}

function ssActionChips(s, neighbors) {
  const out = neighbors(s);
  if (!out.length) return '<span class="ss-action">ไม่มี (dead end)</span>';
  return out.map(([v, lab]) => '<span class="ss-action">' + lab + ' → ' + v.join(',') + '</span>').join('');
}

function ssInfoHtml(key, isStart, isGoal, rowsHtml, actionsHtml) {
  const badge = (isStart ? '<span class="badge badge-primary">START</span> ' : '') + (isGoal ? '<span class="badge badge-gold">GOAL</span>' : '');
  return '<div class="ss-info-title">State <code>' + key + '</code> ' + badge + '</div>' +
    '<div class="ss-info-grid">' + rowsHtml + '</div>' +
    '<div class="ss-info-hint">Actions ที่ทำได้:</div><div class="ss-actions">' + actionsHtml + '</div>';
}

/* ---- 1) Missionaries & Cannibals ---- */
function p1Valid(s) {
  const [M, C, B] = s;
  if (M > 0 && C > M) return false;
  if ((3 - M) > 0 && (3 - C) > (3 - M)) return false;
  return true;
}
function p1Nb(M, C, B) {
  const out = [];
  if (B === 1) {
    for (let m = 0; m <= M; m++)
      for (let c = 0; c <= C; c++)
        if (m + c >= 1 && m + c <= 2) out.push([[M - m, C - c, 0], m + 'M' + c + 'C']);
  } else {
    for (let m = 0; m < 4 - M; m++)
      for (let c = 0; c < 4 - C; c++)
        if (m + c >= 1 && m + c <= 2) out.push([[M + m, C + c, 1], m + 'M' + c + 'C']);
  }
  return out;
}
const p1States = [];
for (let m = 0; m <= 3; m++)
  for (let c = 0; c <= 3; c++)
    for (let b = 0; b <= 1; b++)
      if (p1Valid([m, c, b])) p1States.push([m, c, b]);
const p1Map = new Set(p1States.map(ssKey));
const nb1 = s => p1Nb(...s).filter(e => p1Map.has(ssKey(e[0])));
const p1Pos = {};
p1States.forEach(s => { p1Pos[ssKey(s)] = [s[2] === 1 ? 120 + s[1] * 90 : 520 + s[1] * 90, 80 + (3 - s[0]) * 110]; });
ssRenderCircle('ssGraph1', 'ssStat1', 'ssInfo1', {
  states: p1States,
  edges: ssBuildEdges(p1States, nb1),
  positions: p1Pos,
  start: [3, 3, 1], goal: [0, 0, 0],
  neighbors: nb1,
  nodeSize: 56,
  bankLabels: [[20, 20, '🏝️ Left Bank (Boat=1)'], [760, 20, '🏝️ Right Bank (Boat=0)', 'end']],
  nodeHtml: (s, x, y, color) =>
    '<text x="' + x + '" y="' + (y - 2) + '" text-anchor="middle" font-size="11" font-weight="bold" fill="' + color + '" pointer-events="none">M:' + s[0] + ' C:' + s[1] + '</text>' +
    '<text x="' + x + '" y="' + (y + 12) + '" text-anchor="middle" font-size="9" fill="' + color + '" opacity="0.85" pointer-events="none">B:' + s[2] + '</text>',
  describe: (s) => {
    const isStart = ssKey(s) === '3,3,1', isGoal = ssKey(s) === '0,0,0';
    return ssInfoHtml('(' + s.join(',') + ')', isStart, isGoal,
      '<div>🏝️ <b>ฝั่งซ้าย:</b> M=' + s[0] + ', C=' + s[1] + '</div>' +
      '<div>🏝️ <b>ฝั่งขวา:</b> M=' + (3 - s[0]) + ', C=' + (3 - s[1]) + '</div>' +
      '<div>🚣 <b>เรือ:</b> ' + (s[2] === 1 ? 'ซ้าย' : 'ขวา') + '</div>',
      ssActionChips(s, nb1));
  }
});

/* ---- 2) Water Jug ---- */
function p2Nb(x, y) {
  const out = [];
  if (x < 5) out.push([[5, y], 'เติม 5L']);
  if (y < 3) out.push([[x, 3], 'เติม 3L']);
  if (x > 0) out.push([[0, y], 'เท 5L']);
  if (y > 0) out.push([[x, 0], 'เท 3L']);
  if (x > 0 && y < 3) { const t = Math.min(x, 3 - y); out.push([[x - t, y + t], '5→3']); }
  if (y > 0 && x < 5) { const t = Math.min(y, 5 - x); out.push([[x + t, y - t], '3→5']); }
  return out;
}
const p2States = [];
for (let x = 0; x <= 5; x++) for (let y = 0; y <= 3; y++) p2States.push([x, y]);
const p2Pos = {};
p2States.forEach(s => { p2Pos[ssKey(s)] = [80 + s[0] * 130, 60 + (3 - s[1]) * 130]; });
ssRenderCircle('ssGraph2', 'ssStat2', 'ssInfo2', {
  states: p2States,
  edges: ssBuildEdges(p2States, s => p2Nb(...s)),
  positions: p2Pos,
  start: [0, 0], goal: [4, 3],
  neighbors: s => p2Nb(...s),
  goalTest: s => s[0] === 4,
  nodeSize: 60,
  nodeHtml: (s, x, y, color) =>
    '<text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="13" font-weight="bold" fill="' + color + '" pointer-events="none">(' + s[0] + ',' + s[1] + ')</text>',
  describe: (s) => {
    const isStart = ssKey(s) === '0,0', isGoal = s[0] === 4;
    return ssInfoHtml('(' + s.join(',') + ')', isStart, isGoal,
      '<div>🫗 <b>เหยือก 5L:</b> ' + s[0] + '/5 ลิตร</div>' +
      '<div>🫗 <b>เหยือก 3L:</b> ' + s[1] + '/3 ลิตร</div>',
      ssActionChips(s, p2Nb));
  }
});

/* ---- 3) River Crossing 2.0 ---- */
function p3Valid(s) {
  const [F, W, G, D] = s;
  if (W === G && F !== W) return false;
  if (D === G && F !== D) return false;
  return true;
}
function p3Nb(F, W, G, D) {
  const out = [];
  for (const p of [null, 'W', 'G', 'D']) {
    let W2 = W, G2 = G, D2 = D;
    if (p === 'W') W2 ^= 1;
    if (p === 'G') G2 ^= 1;
    if (p === 'D') D2 ^= 1;
    const ns = [F ^ 1, W2, G2, D2];
    if (ns.join(',') === [F, W, G, D].join(',') || !p3Valid(ns)) continue;
    const lab = (p === null)
      ? (F === 0 ? 'ข้ามคนเดียว' : 'กลับคนเดียว')
      : (F === 0 ? 'พา ' + p : 'กลับ ' + p);
    out.push([ns, lab]);
  }
  return out;
}
const p3StatesAll = [];
for (let f = 0; f <= 1; f++) for (let w = 0; w <= 1; w++) for (let g = 0; g <= 1; g++) for (let d = 0; d <= 1; d++)
  if (p3Valid([f, w, g, d])) p3StatesAll.push([f, w, g, d]);
const p3Pos = {};
function p3Layout(list, baseX) {
  list.sort((a, b) => {
    const ca = [a[1], a[2], a[3]].filter(v => v === (a[0] === 0 ? 0 : 1)).length;
    const cb = [b[1], b[2], b[3]].filter(v => v === (b[0] === 0 ? 0 : 1)).length;
    return ca - cb;
  });
  const rows = 5;
  list.forEach((s, i) => { p3Pos[ssKey(s)] = [baseX + Math.floor(i / rows) * 110, 80 + (i % rows) * 90]; });
}
p3Layout(p3StatesAll.filter(s => s[0] === 0), 100);
p3Layout(p3StatesAll.filter(s => s[0] === 1), 520);
const p3Map = new Set(p3StatesAll.map(ssKey));
const nb3 = s => p3Nb(...s).filter(e => p3Map.has(ssKey(e[0])));
function ssP3Node(s, x, y, color) {
  const E = ['🧑', '🐺', '🐑', '🐕'];
  const left = s.map((v, i) => v === 0 ? E[i] : '').join('');
  const right = s.map((v, i) => v === 1 ? E[i] : '').join('');
  return '<text x="' + x + '" y="' + (y - 2) + '" text-anchor="middle" font-size="13" font-weight="bold" fill="' + color + '" pointer-events="none">' + (left || '·') + '</text>' +
    '<text x="' + x + '" y="' + (y + 14) + '" text-anchor="middle" font-size="13" font-weight="bold" fill="' + color + '" opacity="0.9" pointer-events="none">' + (right || '·') + '</text>';
}
ssRenderCircle('ssGraph3', 'ssStat3', 'ssInfo3', {
  states: p3StatesAll,
  edges: ssBuildEdges(p3StatesAll, nb3),
  positions: p3Pos,
  start: [0, 0, 0, 0], goal: [1, 1, 1, 1],
  neighbors: nb3,
  nodeSize: 68,
  bankLabels: [[20, 20, '🏝️ Left Bank (Farmer=0)'], [760, 20, '🏝️ Right Bank (Farmer=1)', 'end']],
  nodeHtml: (s, x, y, color) => ssP3Node(s, x, y, color),
  describe: (s) => {
    const isStart = ssKey(s) === '0,0,0,0', isGoal = ssKey(s) === '1,1,1,1';
    const names = ['F', 'W', 'G', 'D'];
    const left = [], right = [];
    s.forEach((v, i) => (v === 0 ? left : right).push(names[i]));
    const a1 = '🏝️ <b>ฝั่งซ้าย:</b> ' + (left.join(', ') || 'ว่าง');
    const a2 = '🏝️ <b>ฝั่งขวา:</b> ' + (right.join(', ') || 'ว่าง');
    const a3 = '🚣 <b>ชาวนาอยู่:</b> ' + (s[0] === 0 ? 'ซ้าย' : 'ขวา');
    return ssInfoHtml('(' + s.join(',') + ')', isStart, isGoal,
      a1 + a2 + a3, ssActionChips(s, nb3));
  }
});
/* ===== Exam Simulation : Midterm Mock (Week 1-6 · ถึง Transform-and-Conquer) ===== */

document.getElementById('exam').innerHTML = String.raw`
<div class="section-head">
  <div class="section-num">Exam Simulation</div>
  <h2 class="section-title">จำลองการสอบ Midterm</h2>
  <div class="section-meta">ปรนัย 40 ข้อ · เขียนคำตอบ 5 ข้อ · เต็ม 20 คะแนน</div>
</div>

<div class="card card-accent">
  <h3 class="card-title">กติกาการสอบ <span class="tag">Rules</span></h3>
  <ul class="ex-rules">
    <li><strong>แบบเลือกตอบ 40 ข้อ</strong> — ข้อละ 0.25 คะแนน รวม 10 คะแนน</li>
    <li><strong>แบบเขียนคำตอบ / อธิบายสั้น 5 ข้อ</strong> — ข้อละ 2 คะแนน รวม 10 คะแนน</li>
    <li>ข้อเขียนต้อง <strong>ถูกทุกคำถามย่อย</strong> ถึงจะได้คะแนน — ผิดค่า หรือ ผิดลำดับ = ผิด (ลำดับ A D C ตอบ D C A ถือว่าผิด)</li>
    <li>กระดาษทดคนละ 1 แผ่น — ต้อง <strong>เขียนชื่อ-รหัสก่อนเริ่มสอบ</strong> ไม่เขียนถือว่าทุจริต</li>
    <li>ขอบเขต: Week 1–6 · ตั้งแต่เรื่องแรกถึง Transform-and-Conquer</li>
    <li>(ในห้องสอบจริง ห้ามใช้อุปกรณ์อิเล็กทรอนิกส์ทุกชนิด — หน้านี้ใช้ฝึกที่บ้านเท่านั้น)</li>
  </ul>
</div>

<div class="card" id="exGateCard">
  <h3 class="card-title">เซ็นชื่อ-รหัสกระดาษทดก่อนเริ่ม <span class="tag">Required</span></h3>
  <p class="card-lead">เหมือนเขียนชื่อ-รหัสบนกระดาษทดก่อนลงมือทำ — ไม่กรอกทั้งสองช่อง เริ่มสอบไม่ได้</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:10px;align-items:center">
    <input type="text" id="exName" placeholder="ชื่อ-นามสกุล" style="flex:1;min-width:180px">
    <input type="text" id="exId" placeholder="รหัสนักศึกษา" style="flex:1;min-width:140px">
    <button class="btn btn-primary" id="exStart" disabled>เริ่มทำข้อสอบ →</button>
  </div>
  <div id="exGateMsg" style="color:var(--rose);font-size:13px;margin-top:8px"></div>
</div>

<div id="exPaper" hidden>
  <div class="quiz-score">
    <div>
      <div class="quiz-score-label">ผู้สอบ</div>
      <div style="font-size:16px;font-weight:600"><span id="exPaperName"></span> · <span id="exPaperId" style="font-family:'JetBrains Mono',monospace"></span></div>
    </div>
    <div style="text-align:right">
      <div class="quiz-score-label">ตอบแล้ว</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:14px;margin-top:4px"><span id="exProgress">0/45</span></div>
    </div>
  </div>

  <div id="exMcq"></div>
  <div id="exWritten"></div>

  <div style="display:flex;gap:12px;margin-top:24px">
    <button class="btn btn-primary" id="exSubmit">✓ ส่งข้อสอบ (ตรวจคะแนน)</button>
  </div>
  <div id="exStatus" style="color:var(--rose);font-size:13px;margin-top:8px"></div>
</div>

<div id="exResult"></div>
`;

/* ============ STATE ============ */
const exState = {
  started: false,
  graded: false,
  answers: Array(EXAM_MCQ.length).fill(-1),
  written: EXAM_WRITTEN.map(w => w.subs.map(() => ''))
};

const exLetters = ['A', 'B', 'C', 'D'];
function exWeekTag(i) {
  if (i < 4) return 'W01';
  if (i < 11) return 'W02';
  if (i < 14) return 'Graph';
  if (i < 20) return 'W03';
  if (i < 28) return 'W04';
  if (i < 32) return 'W05';
  return 'W06';
}

/* ============ NORMALISATION ============ */
function exNorm(s) {
  return s.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/²/g, '^2').replace(/³/g, '^3')
    .replace(/[θΘϑ]/g, 'theta').replace(/[ωΩ]/g, 'omega');
}
function exSeqNorm(s) {
  return s.replace(/[,;/|]+/g, ' ').split(/\s+/).filter(Boolean).join(' ');
}
function exCheckSub(sub, val) {
  if (sub.seq) {
    const v = exSeqNorm(val);
    return sub.accept.some(a => exSeqNorm(a) === v);
  }
  const v = exNorm(val);
  return sub.accept.some(a => exNorm(a) === v);
}

/* ============ RENDER ============ */
function exRender() {
  const mcq = EXAM_MCQ.map((it, i) =>
    '<div class="card ex-q" data-q="' + i + '" style="margin-bottom:14px">' +
      '<h3 class="card-title" style="font-size:16px"><span class="tag">' + exWeekTag(i) + '</span> ข้อ ' + (i + 1) + '</h3>' +
      '<p class="card-lead" style="margin-bottom:0">' + it.q + '</p>' +
      '<div class="ex-opt-grid">' +
        it.c.map((c, oi) =>
          '<div class="quiz-opt" data-i="' + oi + '"><div class="quiz-opt-mark">' + exLetters[oi] + '</div><div>' + c + '</div></div>'
        ).join('') +
      '</div>' +
      '<div class="ex-fb" style="font-size:13px;margin-top:8px"></div>' +
    '</div>'
  ).join('');

  const written = EXAM_WRITTEN.map((w, qi) =>
    '<div class="card ex-q" data-q="' + qi + '" style="margin-top:18px">' +
      '<h3 class="card-title" style="font-size:16px"><span class="tag">เขียนคำตอบ</span> ข้อ ' + (qi + 1) + ' <span style="font-weight:400;font-size:13px;color:var(--muted)">(2 คะแนน · ต้องถูกทุกคำถามย่อย)</span></h3>' +
      '<p class="card-lead" style="margin-bottom:0">' + w.q + '</p>' +
      w.subs.map((s, si) =>
        '<div class="ex-subrow" data-s="' + si + '">' +
          '<label>' + s.label + '</label>' +
          '<input type="text" class="ex-in" data-s="' + si + '" placeholder="พิมพ์คำตอบ">' +
          '<span class="ex-sub-ok" style="font-size:12px;white-space:nowrap"></span>' +
        '</div>'
      ).join('') +
      '<div class="ex-model">' + w.model + '</div>' +
      '<div class="ex-fb" style="font-size:13px;margin-top:8px"></div>' +
    '</div>'
  ).join('');

  document.getElementById('exMcq').innerHTML =
    '<div class="tag-row" style="margin:18px 0 10px"><span class="badge badge-accent">PART I · ปรนัย 40 ข้อ × 0.25 = 10 คะแนน</span></div>' + mcq;
  document.getElementById('exWritten').innerHTML =
    '<div class="tag-row" style="margin:28px 0 10px"><span class="badge badge-rose">PART II · เขียนคำตอบ 5 ข้อ × 2 = 10 คะแนน</span></div>' + written;
  exProgress();
}

function exProgress() {
  let n = 0;
  exState.answers.forEach(a => { if (a >= 0) n++; });
  exState.written.forEach(arr => arr.forEach(v => { if (v.trim()) n++; }));
  document.getElementById('exProgress').textContent = n + '/45';
}

/* ============ GATE ============ */
const exNameEl = document.getElementById('exName');
const exIdEl = document.getElementById('exId');
const exStartBtn = document.getElementById('exStart');
function exGate() { exStartBtn.disabled = !(exNameEl.value.trim() && exIdEl.value.trim()); }
exNameEl.addEventListener('input', exGate);
exIdEl.addEventListener('input', exGate);
exStartBtn.addEventListener('click', () => {
  if (exStartBtn.disabled) return;
  document.getElementById('exPaperName').textContent = exNameEl.value.trim();
  document.getElementById('exPaperId').textContent = exIdEl.value.trim();
  exNameEl.disabled = true; exIdEl.disabled = true;
  document.getElementById('exPaper').hidden = false;
  exState.started = true;
  exRender();
  document.getElementById('exPaper').scrollIntoView({ behavior: 'smooth' });
});

/* ============ SELECTION ============ */
document.getElementById('exMcq').addEventListener('click', (e) => {
  const opt = e.target.closest('.quiz-opt');
  if (!opt || exState.graded) return;
  const qEl = opt.closest('.ex-q');
  const qi = +qEl.dataset.q, oi = +opt.dataset.i;
  exState.answers[qi] = oi;
  qEl.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
  opt.classList.add('selected');
  exProgress();
});
document.getElementById('exWritten').addEventListener('input', (e) => {
  if (!e.target.classList.contains('ex-in')) return;
  const qEl = e.target.closest('.ex-q');
  const qi = +qEl.dataset.q, si = +e.target.dataset.s;
  exState.written[qi][si] = e.target.value;
  exProgress();
});

/* ============ GRADE ============ */
document.getElementById('exSubmit').addEventListener('click', () => {
  const st = document.getElementById('exStatus');
  const miss = [];
  EXAM_MCQ.forEach((_, i) => { if (exState.answers[i] < 0) miss.push('ปรนัย#' + (i + 1)); });
  EXAM_WRITTEN.forEach((w, qi) => w.subs.forEach((_, si) => { if (!exState.written[qi][si].trim()) miss.push('เขียน' + (qi + 1) + '.' + (si + 1)); }));
  if (miss.length) {
    st.textContent = '⚠ ยังไม่ได้ตอบครบ: ' + miss.join(', ');
    return;
  }
  st.textContent = '';
  exState.graded = true;

  let mcqCorrect = 0;
  document.querySelectorAll('#exMcq .ex-q').forEach(qEl => {
    const qi = +qEl.dataset.q, ans = EXAM_MCQ[qi].a, mine = exState.answers[qi];
    if (mine === ans) mcqCorrect++;
    qEl.querySelectorAll('.quiz-opt').forEach((o, oi) => {
      o.classList.add('disabled'); o.classList.remove('selected');
      if (oi === ans) o.classList.add('correct');
      else if (oi === mine) o.classList.add('wrong');
    });
    qEl.querySelector('.ex-fb').innerHTML = mine === ans
      ? '<span style="color:var(--primary)">✓ ถูกต้อง (+0.25)</span>'
      : '<span style="color:var(--rose)">✗ ผิด — คำตอบถูก: ' + exLetters[ans] + '</span>';
  });

  let wPts = 0;
  document.querySelectorAll('#exWritten .ex-q').forEach(qEl => {
    const qi = +qEl.dataset.q, W = EXAM_WRITTEN[qi];
    let all = true;
    qEl.querySelectorAll('.ex-subrow').forEach(row => {
      const si = +row.dataset.s, ok = exCheckSub(W.subs[si], exState.written[qi][si]);
      const okEl = row.querySelector('.ex-sub-ok');
      if (!ok) {
        all = false; row.classList.add('ex-bad');
        okEl.innerHTML = '<span style="color:var(--rose)">✗ คำตอบที่ถูก: ' + W.subs[si].accept[0] + '</span>';
      } else {
        okEl.innerHTML = '<span style="color:var(--primary)">✓</span>';
      }
    });
    if (all) wPts += 2;
    qEl.querySelector('.ex-model').classList.add('show');
    qEl.querySelector('.ex-fb').innerHTML = all
      ? '<span style="color:var(--primary)">✓ ถูกทุกคำถามย่อย (+2)</span>'
      : '<span style="color:var(--rose)">✗ ผิด (ต้องถูกทุกคำถามย่อยจึงได้ +2)</span>';
  });

  const mcqPts = Math.round(mcqCorrect * 0.25 * 100) / 100;
  const total = Math.round((mcqPts + wPts) * 100) / 100;
  const name = exNameEl.value.trim(), id = exIdEl.value.trim();
  document.getElementById('exResult').innerHTML =
    '<div class="quiz-score" style="margin-top:24px;border-color:var(--accent)">' +
      '<div><div class="quiz-score-label">ใบคะแนน · ' + name + ' (' + id + ')</div>' +
      '<div class="quiz-score-num"><span id="scoreNum">' + total + '</span><span style="font-size:24px;opacity:.6">/20</span>' +
      '<span style="font-size:14px;opacity:.6;margin-left:8px">' + (total >= 12 ? 'ผ่านเกณฑ์' : 'ต้องทบทวนเพิ่ม') + '</span></div></div>' +
      '<div style="text-align:right;font-size:13px;color:var(--ink-2);line-height:1.8">' +
        'ปรนัย: ' + mcqCorrect + '/40 = ' + mcqPts + ' คะแนน<br>' +
        'เขียนคำตอบ: ' + (wPts / 2) + '/5 ข้อ = ' + wPts + ' คะแนน</div>' +
    '</div>' +
    '<div style="margin-top:16px"><button class="btn" id="exRetry">↻ ทำใหม่</button></div>';
  document.getElementById('exSubmit').disabled = true;
  document.getElementById('exRetry').addEventListener('click', exReset);
  document.getElementById('exResult').scrollIntoView({ behavior: 'smooth' });
});

function exReset() {
  exState.graded = false;
  exState.answers = Array(EXAM_MCQ.length).fill(-1);
  exState.written = EXAM_WRITTEN.map(w => w.subs.map(() => ''));
  document.getElementById('exResult').innerHTML = '';
  document.getElementById('exSubmit').disabled = false;
  exRender();
  document.getElementById('exPaper').scrollIntoView({ behavior: 'smooth' });
}

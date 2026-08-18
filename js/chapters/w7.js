/* w7 content */

document.getElementById('w7').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">07 / 07</div>
        <h2 class="section-title">Space and Time Trade-Offs</h2>
        <div class="section-meta">แลกพื้นที่ → เวลา</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">แนวคิด Trade-Off</h3>
        <p class="card-lead">ยอมเสีย <strong>พื้นที่หน่วยความจำ (Space)</strong> เพิ่ม เพื่อสร้างโครงสร้างหรือตารางช่วยเสริม (Auxiliary space) แลกกับ <strong>ความเร็ว (Time)</strong> ที่มากขึ้น — แบ่งเป็น 2 กลุ่ม:</p>
        <div class="grid-2">
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px;border-top:3px solid var(--primary)">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:18px;color:var(--primary)">Input Enhancement</div>
            <div style="font-size:13px;color:var(--ink-2);margin-top:6px">สแกนข้อมูลและจดจำล่วงหน้า</div>
          </div>
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px;border-top:3px solid var(--accent)">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:18px;color:var(--accent)">Prestructuring</div>
            <div style="font-size:13px;color:var(--ink-2);margin-top:6px">เปลี่ยนโครงสร้างข้อมูลเพื่อรองรับการค้นหาที่เร็วขึ้น</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Sorting by Counting</h3>
        <div class="grid-2">
          <div>
            <div class="tag-row"><span class="badge badge-primary">Comparison Counting</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">นับจำนวนตัวที่น้อยกว่าค่าปัจจุบัน แล้วนำผลรวมไปเป็น Index</p>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-primary">Distribution Counting</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">นับความถี่ หาผลรวมสะสม แล้วค่อย ๆ นำข้อมูลไปลง Array ผลลัพธ์</p>
            <div class="code-block">
              <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
              <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">distribution_count</span>(A, l, u):
    <span class="tok-com"># ค่าทั้งหมดอยู่ในช่วง [l, u]</span>
    D <span class="tok-op">=</span> [<span class="tok-num">0</span>] <span class="tok-op">*</span> (u <span class="tok-op">-</span> l <span class="tok-op">+</span> <span class="tok-num">1</span>)
    <span class="tok-key">for</span> x <span class="tok-key">in</span> A: D[x <span class="tok-op">-</span> l] <span class="tok-op">+=</span> <span class="tok-num">1</span>      <span class="tok-com"># นับความถี่</span>
    <span class="tok-key">for</span> j <span class="tok-key">in</span> range(<span class="tok-num">1</span>, len(D)): D[j] <span class="tok-op">+=</span> D[j <span class="tok-op">-</span> <span class="tok-num">1</span>]  <span class="tok-com"># สะสม</span>
    S <span class="tok-op">=</span> [<span class="tok-num">0</span>] <span class="tok-op">*</span> len(A)
    <span class="tok-key">for</span> i <span class="tok-key">in</span> range(len(A) <span class="tok-op">-</span> <span class="tok-num">1</span>, <span class="tok-op">-</span><span class="tok-num">1</span>, <span class="tok-op">-</span><span class="tok-num">1</span>):
        S[D[A[i] <span class="tok-op">-</span> l] <span class="tok-op">-</span> <span class="tok-num">1</span>] <span class="tok-op">=</span> A[i]     <span class="tok-com"># วางจากขวาไปซ้าย</span>
        D[A[i] <span class="tok-op">-</span> l] <span class="tok-op">-=</span> <span class="tok-num">1</span>
    <span class="tok-key">return</span> S</pre></div>
            </div>
          </div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode · Distribution Counting</div></div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">DistributionCountingSort</span>(A[0..n-1], l, u)
<span class="tok-key">for</span> j <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> u-l <span class="tok-key">do</span> D[j] <span class="tok-op">←</span> <span class="tok-num">0</span>
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> n-<span class="tok-num">1</span> <span class="tok-key">do</span> D[A[i] - l] <span class="tok-op">←</span> D[A[i] - l] + <span class="tok-num">1</span>
<span class="tok-key">for</span> j <span class="tok-op">←</span> <span class="tok-num">1</span> <span class="tok-key">to</span> u-l <span class="tok-key">do</span> D[j] <span class="tok-op">←</span> D[j-<span class="tok-num">1</span>] + D[j]
<span class="tok-key">for</span> i <span class="tok-op">←</span> n-<span class="tok-num">1</span> <span class="tok-key">downto</span> <span class="tok-num">0</span> <span class="tok-key">do</span>
    j <span class="tok-op">←</span> A[i] - l
    S[D[j] - <span class="tok-num">1</span>] <span class="tok-op">←</span> A[i]
    D[j] <span class="tok-op">←</span> D[j] - <span class="tok-num">1</span>
<span class="tok-key">return</span> S</pre></div>
        </div>
        <div class="step-trace">
          <div class="step-trace-head">▶ ตัวอย่าง A = [5, 2, 3, 2, 5] ช่วง [2,5]</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>นับความถี่</strong>: D = [2:1, 3:1, 4:0, 5:2] → D = [1,1,0,2]</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>สะสม</strong>: D = [1, 2, 2, 4] — D[j] = "จำนวนตัวที่มีค่า ≤ j+l" (เช่น ≤3 มี 2 ตัว)</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div><strong>วางจากขวาไปซ้าย</strong> (ทำไมขวาไปซ้าย? → เพื่อความ <strong>stable</strong> ตัวที่อยู่ขวาใน A เดิมไปอยู่ขวาในผลลัพธ์)</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>i=4 (5): ตำแหน่ง D[3]−1=3 → S[3]=5, D[3]=3 · i=3 (2): D[0]−1=0 → S[0]=2 …</div></div>
            <div class="trace-row"><div class="trace-step">5</div><div>ผลลัพธ์ S = [2, 2, 3, 5, 5] ✅ <strong>O(n)</strong> เร็วกว่าเปรียบเทียบ — แต่เสียพื้นที่ O(u−l) และใช้ได้เฉพาะค่าช่วงแคบ</div></div>
          </div>
        </div>
        <div style="margin-top:14px;font-size:13px;color:var(--ink-2)">
          <div style="font-weight:700;color:var(--accent);font-family:'Fraunces',serif;margin-bottom:8px">มองเป็นตาราง 3 แถว — เห็นที่มาของ stable</div>
          <div class="dc-table">
            <div class="dc-row"><span class="dc-head">A</span><span class="dc-cell">5</span><span class="dc-cell">2</span><span class="dc-cell">3</span><span class="dc-cell">2</span><span class="dc-cell">5</span></div>
            <div class="dc-row"><span class="dc-head">D สะสม</span><span class="dc-cell">1</span><span class="dc-cell">2</span><span class="dc-cell">2</span><span class="dc-cell">4</span><span class="dc-cell">—</span></div>
            <div class="dc-row"><span class="dc-head">S</span><span class="dc-cell dc-s1">2</span><span class="dc-cell dc-s1">2</span><span class="dc-cell dc-s2">3</span><span class="dc-cell dc-s3">5</span><span class="dc-cell dc-s3">5</span></div>
          </div>
          <div style="font-size:12px;color:var(--muted);margin-top:6px">อ่าน S จาก D: D = [1,2,2,4] แปลว่า "≤2 มี 1 ตัว, ≤3 มี 2 ตัว, ≤4 มี 2 ตัว, ≤5 มี 4 ตัว" → วาง 5 ตัวหลังก่อน (ขวาไปซ้าย) จึงได้ 5 สองตัวรักษาลำดับเดิม</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">String Matching — ข้ามตัวอักษรทีละมาก ๆ</h3>
        <div class="grid-2">
          <div>
            <div class="tag-row"><span class="badge badge-accent">Horspool</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">สร้าง Shift Table พิจารณาตัวอักษรท้ายสุดของ Pattern เทียบกับ Text</p>
            <div class="code-block">
              <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python · Shift Table</div></div>
              <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">shift_table</span>(P):
    m <span class="tok-op">=</span> len(P)
    T <span class="tok-op">=</span> {ch: m <span class="tok-key">for</span> ch <span class="tok-key">in</span> set(P)}   <span class="tok-com"># ค่าเริ่มต้น = m</span>
    <span class="tok-key">for</span> j <span class="tok-key">in</span> range(m <span class="tok-op">-</span> <span class="tok-num">1</span>):
        T[P[j]] <span class="tok-op">=</span> m <span class="tok-op">-</span> <span class="tok-num">1</span> <span class="tok-op">-</span> j   <span class="tok-com"># อักขระที่เหลือก่อนท้ายสุด</span>
    <span class="tok-key">return</span> T</pre></div>
            </div>
            <div class="code-block"><div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">ShiftTable</span>(P[0..m-1])
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> size-<span class="tok-num">1</span> <span class="tok-key">do</span>
    Table[i] <span class="tok-op">←</span> m
<span class="tok-key">for</span> j <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> m-<span class="tok-num">2</span> <span class="tok-key">do</span>
    Table[P[j]] <span class="tok-op">←</span> m - <span class="tok-num">1</span> - j
<span class="tok-key">return</span> Table</pre></div></div>
            <div class="step-trace">
              <div class="step-trace-head">▶ ตัวอย่าง Pattern = BARBER (m = 6)</div>
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div><strong>Shift คืออะไร?</strong> จำนวนช่องที่เลื่อน Pattern ไปทางขวาเมื่อตัวอักษรท้ายสุดไม่ตรง — คำนวณจากตำแหน่งตัวอักษรใน Pattern</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>ค่าเริ่มต้นทุกตัว = m = 6 (ตัวที่ไม่ได้อยู่ใน Pattern → ข้ามได้ m ตัว)</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>B อยู่ที่ j=0 → m−1−0 = 5 · A อยู่ j=1 → 4 · R j=2 → 3 · B j=3 → 2 (B โดนทับ 5→2 เพราะเอาตัวที่อยู่ขวาสุด)</div></div>
                <div class="trace-row"><div class="trace-step">4</div><div>ตาราง: B=2 · A=4 · R=3 · E=1 · ตัวอื่น=6 — ตัวท้ายสุดคือ R (j=5 → m−1−5 = 0 ไม่เข้าตาราง จึงใช้ค่าเริ่มต้น 6; ถ้าชน R ที่ท้ายสุดจริง ข้ามได้เต็ม m)</div></div>
              </div>
            </div>
            <div style="margin-top:14px;font-size:13px;color:var(--ink-2)">
              <div style="font-weight:700;color:var(--accent);font-family:'Fraunces',serif;margin-bottom:8px">ตาราง shift ของ BARBER</div>
              <div class="dc-row" style="flex-wrap:wrap;gap:6px">
                <span class="dc-cell">B = 2</span><span class="dc-cell">A = 4</span><span class="dc-cell">R = 3</span><span class="dc-cell">E = 1</span><span class="dc-cell">อื่น ๆ = 6</span>
              </div>
              <div style="font-size:12px;color:var(--muted);margin-top:6px">ตัวอย่าง: Text ชนตัว B ที่ท้ายสุดของ pattern → เลื่อน 2 ช่อง (จับคู่ B ตำแหน่งถัดไป); ชนตัวที่ไม่ใช่ B/A/R/E → เลื่อนเต็ม 6 ช่อง</div>
            </div>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-accent">Boyer-Moore</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">ใช้ 2 ตารางควบคู่กัน: <strong>Bad-Symbol</strong> และ <strong>Good-Suffix</strong> — เลื่อนด้วยค่ามากสุดระหว่าง 2 ตาราง</p>
            <div class="step-trace">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div><strong>Bad-Symbol</strong> = ดูตัวอักษรใน Text ที่ "ชน" กับ Pattern (คล้าย Horspool แต่ดูตัวอักษรที่ชน ไม่ใช่ตัวท้ายสุด)</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div><strong>Good-Suffix</strong> = ส่วนท้ายที่ตรงกันแล้ว หาว่าไปตรงกับส่วนอื่นของ Pattern ได้ไหม — เลื่อนให้ suffix ไปตรงตำแหน่งใหม่</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>เลื่อน = <strong>max(ทั้งสอง)</strong> → เลื่อนได้ไกลสุด แต่ปลอดภัยเสมอ → worst case ยังคง O(nm) แต่เฉลี่ยดีกว่า Horspool</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- HASH TABLE VIZ -->
      <div class="card">
        <h3 class="card-title">Hashing — Interactive Hash Table <span class="tag">Interactive</span> <span class="badge-exam">ออกสอบบ่อย</span></h3>
        <p class="card-lead">แปลง Key ให้เป็น Index ผ่าน Hash Function — ปัญหาที่ต้องระวังคือ <strong>Collision</strong> — ลองเปลี่ยนวิธีแก้ Collision และสังเกตพฤติกรรมของข้อมูล</p>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body"><strong>คำศัพท์ที่ต้องรู้ก่อน:</strong> <code>mod</code> (มอดูลัส) = เอาเศษจากการหาร เช่น 23 mod 7 = 2 · <code>Hash(k) = k mod m</code> = โยน Key เข้า "ถัง" หนึ่งใน m ถัง · <strong>Collision</strong> = Key ต่างกัน แต่ตกถังเดียวกัน (เช่น 23 mod 7 = 2 และ 30 mod 7 = 2) — ต้องมีวิธีจัดการ · <strong>Load factor α = n/m</strong> = จำนวนข้อมูลต่อถัง ยิ่ง α มาก ยิ่งชนบ่อย</div>
        </div>
        <div class="step-trace">
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>ลองกด <strong>Insert 23</strong>: 23 mod 7 = 2 → ลงถังที่ 2 โดยตรง (ไม่ชน) — จากนั้น <strong>Insert 30</strong>: 30 mod 7 = 2 → ชนกับ 23</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>ในโหมด <strong>Chaining</strong>: 30 ต่อท้าย Linked List ของถัง 2 → ตรวจว่ามี 30 ไหม = เดินลิสต์ (ยาว α)</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>ในโหมด <strong>Linear Probing</strong>: ถัง 2 เต็ม → ลองถัง 3, 4, … (สูตร (h(k)+i) mod m) → หาช่องว่าง → ค้นหาต้องเดินไล่ช่อง จนเจอค่าว่าง</div></div>
          </div>
        </div>
        
        <div class="viz-controls">
          <input type="number" id="hashInput" placeholder="ใส่เลข Key (1-99)" value="23" style="width:140px">
          <button class="btn btn-accent btn-sm" id="hashInsert">Insert</button>
          <button class="btn btn-sm" id="hashSearch">Search</button>
          <button class="btn btn-sm" id="hashDelete">Delete</button>
          <button class="btn btn-sm" id="hashClear">Clear</button>
          <div class="tabs" style="margin:0;background:transparent;padding:0">
            <button class="tab active" data-method="chaining">Separate Chaining</button>
            <button class="tab" data-method="linear">Linear Probing</button>
          </div>
          <span style="margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted)">Hash(k) = k mod <strong id="hashSize" style="color:var(--accent)">7</strong> · Load factor α = <strong id="hashLoad" style="color:var(--accent)">0/7</strong></span>
        </div>

        <div class="hash-viz">
          <div class="hash-table" id="hashTable"></div>
          <div class="hash-status" id="hashStatus"></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Collision Resolution — 2 วิธีหลัก</h3>
        <div class="grid-2">
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:17px;color:var(--primary)">Open Hashing</div>
            <div style="font-size:13px;color:var(--muted);margin:2px 0 8px">Separate Chaining</div>
            <div style="font-size:13px;color:var(--ink-2)">ใช้ Linked List ต่อท้ายในช่อง Index ที่ชนกัน</div>
            <svg viewBox="0 0 280 80" style="width:100%;margin-top:12px"><g stroke="var(--line)" stroke-width="1.5"><rect x="10" y="10" width="40" height="20" fill="var(--bg-card)"/><rect x="10" y="40" width="40" height="20" fill="var(--bg-card)"/><rect x="10" y="70" width="40" height="20" fill="var(--bg-card)"/></g><text x="30" y="24" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="var(--muted)">0</text><text x="30" y="54" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="var(--muted)">1</text><text x="30" y="84" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="var(--muted)">2</text><g><rect x="70" y="6" width="30" height="22" rx="3" fill="var(--primary)"/><rect x="105" y="6" width="30" height="22" rx="3" fill="var(--primary)"/><line x1="100" y1="17" x2="105" y2="17" stroke="var(--primary)" stroke-width="2"/><rect x="70" y="36" width="30" height="22" rx="3" fill="var(--accent)"/><rect x="105" y="36" width="30" height="22" rx="3" fill="var(--accent)"/><line x1="100" y1="47" x2="105" y2="47" stroke="var(--accent)" stroke-width="2"/><rect x="70" y="66" width="30" height="22" rx="3" fill="var(--gold)"/></g><text x="85" y="21" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">14</text><text x="120" y="21" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">21</text><text x="85" y="51" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">8</text><text x="120" y="51" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">15</text><text x="85" y="81" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">9</text><line x1="50" y1="17" x2="70" y2="17" stroke="var(--ink)" stroke-width="1"/><line x1="50" y1="47" x2="70" y2="47" stroke="var(--ink)" stroke-width="1"/><line x1="50" y1="77" x2="70" y2="77" stroke="var(--ink)" stroke-width="1"/></svg>
          </div>
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:17px;color:var(--accent)">Closed Hashing</div>
            <div style="font-size:13px;color:var(--muted);margin:2px 0 8px">Open Addressing (Linear Probing)</div>
            <div style="font-size:13px;color:var(--ink-2)">หากชน ให้เลื่อนไปหาช่องว่างถัดไปใน Array</div>
            <svg viewBox="0 0 280 30" style="width:100%;margin-top:12px"><g><rect x="10" y="2" width="35" height="26" fill="var(--primary)"/><rect x="47" y="2" width="35" height="26" fill="var(--accent)"/><rect x="84" y="2" width="35" height="26" fill="var(--gold)"/><rect x="121" y="2" width="35" height="26" fill="none" stroke="var(--line)" stroke-dasharray="3 2"/><rect x="158" y="2" width="35" height="26" fill="var(--accent)"/><rect x="195" y="2" width="35" height="26" fill="none" stroke="var(--line)" stroke-dasharray="3 2"/><rect x="232" y="2" width="35" height="26" fill="none" stroke="var(--line)" stroke-dasharray="3 2"/></g><text x="27" y="19" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">14</text><text x="64" y="19" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">21</text><text x="101" y="19" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">7</text><text x="175" y="19" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="white" font-weight="bold">8</text></svg>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Indexing with B-Trees <span class="badge-exam">ออกสอบบ่อย</span></h3>
        <ul class="check-list">
          <li>ใช้มากในการทำดัชนี (Index) ของฐานข้อมูล</li>
          <li>B-tree เป็นต้นไม้ที่ <strong>1 โหนดเก็บ Key ได้หลายค่า</strong> และมีลูกได้หลายโหนด</li>
          <li>ช่วยลดความสูงของ Tree ได้มาก</li>
          <li>ทำให้การค้นหาข้อมูลในฮาร์ดดิสก์มีจำนวนครั้ง (I/O access) น้อยลง</li>
        </ul>
<div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body">B-Tree ออกแบบมาเพื่อ <strong>minimize disk I/O</strong> — แต่ละโหนดมีขนาดเท่ากับหนึ่ง block ของ disk</div>
        </div>
        <div class="step-trace">
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>B-tree (ดีกรี 3) มี Key 2-3 ตัว/โหนด ลูกได้ 3-4 โหนด — Root มี 2 keys: [20 | 40]</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>ค้นหา 35: 35 อยู่ระหว่าง 20 กับ 40 → เดินลงลูกกลาง → เจอ [30 | 35 | 38] → <strong>1 โหลด = รู้ผลทั้งช่อง</strong></div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>ต้นไม้ height 3 จุ key ได้หลายแสน — ต่างจาก BST ที่เก็บ 1 key/โหนด ต้องโหลด disk หลายครั้ง</div></div>
          </div>
        </div>
        <svg viewBox="0 0 420 120" style="width:100%;max-width:460px;margin:8px auto;display:block"><g stroke="var(--line)" stroke-width="1.5"><rect x="150" y="8" width="120" height="28" rx="4" fill="var(--bg-alt)" stroke="var(--primary)" stroke-width="2"/><rect x="30" y="72" width="100" height="28" rx="4" fill="var(--bg-alt)"/><rect x="160" y="72" width="100" height="28" rx="4" fill="var(--bg-alt)" stroke="var(--accent)" stroke-width="2"/><rect x="290" y="72" width="100" height="28" rx="4" fill="var(--bg-alt)"/></g><g stroke="var(--line)" stroke-width="1.5"><line x1="185" y1="36" x2="85" y2="72"/><line x1="195" y1="36" x2="200" y2="72"/><line x1="225" y1="36" x2="330" y2="72"/></g><text x="210" y="26" text-anchor="middle" font-size="12" font-family="JetBrains Mono" fill="var(--ink)" font-weight="bold">20 40</text><text x="80" y="90" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="var(--ink)">&lt;20</text><text x="210" y="90" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="var(--accent)" font-weight="bold">30 35 38</text><text x="340" y="90" text-anchor="middle" font-size="11" font-family="JetBrains Mono" fill="var(--ink)">&gt;40</text><text x="150" y="118" text-anchor="middle" font-size="10" fill="var(--muted)">แต่ละโหนด = 1 block · หา 35 ใช้ disk อ่านเพียง 2 ครั้ง</text></svg>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — ก่อนสอบ W7
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>Distribution Sort</strong>O(n) + O(u−l) space — stable</div>
          <div class="mem-chip"><strong>Horspool shift</strong>T[c] = m−1−j (ไม่นับตัวท้าย) · ตัวอื่น = m</div>
          <div class="mem-chip"><strong>Boyer-Moore</strong>เลื่อน = max(Bad-symbol, Good-suffix)</div>
          <div class="mem-chip"><strong>Hashing</strong>k mod m · load factor α = n/m</div>
          <div class="mem-chip"><strong>Collision</strong>Chaining (ตาราง+List) · Linear Probing ((h(k)+i) mod m)</div>
          <div class="mem-chip"><strong>B-Tree</strong>ลด disk I/O · โหนดเก็บหลาย key</div>
        </div>
      </div>
`;

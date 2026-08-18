/* w6 content */

document.getElementById('w6').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">06 / 07</div>
        <h2 class="section-title">Transform-and-Conquer</h2>
        <div class="section-meta">แปลงปัญหาให้ง่ายขึ้น</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">แนวคิดหลัก — "แปลง" ปัญหาก่อนแก้</h3>
        <p class="card-lead">เปลี่ยนรูปปัญหาให้เป็นอีกรูปแบบหนึ่งที่แก้ง่ายกว่า — แบ่งเป็น 3 Flavours:</p>
        <div class="step-grid">
          <div class="step-item"><div class="step-num">Flavour 01</div><div class="step-text"><strong>Instance Simplification</strong> — ทำให้อินสแตนซ์ง่ายขึ้น</div></div>
          <div class="step-item"><div class="step-num">Flavour 02</div><div class="step-text"><strong>Representation Change</strong> — เปลี่ยนโครงสร้างข้อมูล</div></div>
          <div class="step-item"><div class="step-num">Flavour 03</div><div class="step-text"><strong>Problem Reduction</strong> — แปลงเป็นปัญหาอื่นที่รู้วิธีแก้</div></div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="card-title">Presorting — Element Uniqueness</h3>
          <p class="card-lead">จัดเรียงล่วงหน้า แล้วตรวจเพียงคู่ข้างเคียง</p>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
            <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">PresortElementUniqueness</span>(A[0..n-1])
<span class="tok-fn">sort</span> <span class="tok-key">the</span> <span class="tok-key">array</span> A
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> n-<span class="tok-num">2</span> <span class="tok-key">do</span>
    <span class="tok-key">if</span> A[i] = A[i+<span class="tok-num">1</span>] <span class="tok-key">return</span> <span class="tok-key">false</span>
<span class="tok-key">return</span> <span class="tok-key">true</span></pre></div>
          </div>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
            <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">unique</span>(A):
    A <span class="tok-op">=</span> sorted(A)          <span class="tok-com"># sort O(n log n)</span>
    <span class="tok-key">for</span> i <span class="tok-key">in</span> range(len(A) <span class="tok-op">-</span> <span class="tok-num">1</span>):
        <span class="tok-key">if</span> A[i] <span class="tok-op">==</span> A[i + <span class="tok-num">1</span>]:
            <span class="tok-key">return</span> <span class="tok-key">False</span>
    <span class="tok-key">return</span> <span class="tok-key">True</span></pre></div>
          </div>
          <div class="callout callout-tip">
            <div class="callout-icon">!</div>
            <div class="callout-body">Brute Force ใช้ <strong>O(n²)</strong> แต่ Presort ใช้ <strong>O(n log n)</strong> เท่ากับขั้นตอนการ sort</div>
          </div>
          <div class="step-trace">
            <div class="step-trace-head">▶ ทำไมตรวจแค่คู่ข้างเคียงถึงพอ? + ตัวอย่าง</div>
            <div class="step-trace-body">
              <div class="trace-row"><div class="trace-step">1</div><div><strong>Brute force</strong> ต้องเทียบทุกคู่ (i,j): A=[5,3,8,3] → 4×4 = 16 คู่ → O(n²)</div></div>
              <div class="trace-row"><div class="trace-step">2</div><div>แต่พอ <strong>sort แล้ว</strong>: [3,3,5,8] — ค่าที่เท่ากันต้อง<b>อยู่ติดกัน</b>เสมอ (ไม่มีตัวอื่นคั่นกลางได้)</div></div>
              <div class="trace-row"><div class="trace-step">3</div><div>ดังนั้นเทียบแค่ A[i] กับ A[i+1]: 3=3 → เจอซ้ำ → false. สแกน 1 รอบ = O(n) → รวม O(n log n)</div></div>
            </div>
          </div>
        </div>
        <div class="card">
          <h3 class="card-title">Presorting — Mode (หาตัวซ้ำมากสุด)</h3>
          <p class="card-lead">หลังเรียงแล้ว ตัวที่ซ้ำมากสุดจะอยู่ติด ๆ กัน</p>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
            <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">PresortMode</span>(A[0..n-1])
<span class="tok-fn">sort</span> <span class="tok-key">the</span> <span class="tok-key">array</span> A
i <span class="tok-op">←</span> <span class="tok-num">0</span>; modefrequency <span class="tok-op">←</span> <span class="tok-num">0</span>
<span class="tok-key">while</span> i <span class="tok-op">≤</span> n-<span class="tok-num">1</span> <span class="tok-key">do</span>
    runlength <span class="tok-op">←</span> <span class="tok-num">1</span>; runvalue <span class="tok-op">←</span> A[i]
    <span class="tok-key">while</span> i+runlength <span class="tok-op">≤</span> n-<span class="tok-num">1</span>
         <span class="tok-key">and</span> A[i+runlength] = runvalue
        runlength <span class="tok-op">←</span> runlength + <span class="tok-num">1</span>
    <span class="tok-key">if</span> runlength <span class="tok-op">&gt;</span> modefrequency
        modefrequency <span class="tok-op">←</span> runlength
        modevalue <span class="tok-op">←</span> runvalue
    i <span class="tok-op">←</span> i + runlength
<span class="tok-key">return</span> modevalue</pre></div>
          </div>
          <div class="callout callout-note">
            <div class="callout-icon">i</div>
            <div class="callout-body"><strong>Run คืออะไร?</strong> = กลุ่มของค่าที่ซ้ำกันเรียงติดกันหลัง sort. ตัวอย่าง [1,1,2,2,2,3]: run ของ 1 ยาว 2, run ของ 2 ยาว 3, run ของ 3 ยาว 1 → mode = 2 (ยาวสุด). ลูปนอกกระโดดข้าม run ไปทั้งก้อน (i ← i + runlength) → สแกนครั้งเดียว O(n)</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Gaussian Elimination — แก้สมการเชิงเส้น</h3>
        <p class="card-lead">แปลง Matrix ให้เป็น <strong>Upper-triangular</strong> (Forward Elimination) แล้วค่อยแทนค่ากลับ (Backward Substitution)</p>
        <div class="step-trace">
          <div class="step-trace-head">▶ ทำไม upper-triangular ถึงแก้เองได้? (3 สมการ 3 ตัวแปร)</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>ระบบเดิม: x + y + z = 6 · 2x + 3y + z = 11 · x + 2y + 2z = 9</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>Forward elimination</strong> — กำจัด x จาก R2: R2 − 2·R1 → (2x−2x) + (3y−2y) + (z−2z) = 11−12 → <strong>y − z = −1</strong></div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>กำจัด x จาก R3: R3 − 1·R1 → (x−x) + (2y−y) + (2z−z) = 9−6 → <strong>y + z = 3</strong></div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>กำจัด y จาก R3 ใหม่: R3 − 1·R2' → (y−y) + (z+z) = 3+1 → <strong>2z = 4</strong> — ครบ: x + y + z = 6 · y − z = −1 · 2z = 4 → <strong>แถวล่างสุดเหลือ z ตัวเดียว</strong></div></div>
            <div class="trace-row"><div class="trace-step">5</div><div><strong>Backward substitution</strong>: z = 2 → y − 2 = −1 → y = 1 → x + 1 + 2 = 6 → x = 3 ✅ (ตรวจ: 2(3)+3(1)+2 = 11 ✓)</div></div>
            <div class="trace-row"><div class="trace-step">6</div><div><strong>Partial pivoting</strong> = สลับแถวให้ตัวนำ (pivot) มีค่าสัมบูรณ์มากสุด ก่อนลบ — ป้องกันการหารด้วยเลขเกือบ 0 ที่ทำให้ผลผิดเพี้ยน</div></div>
            <div class="trace-row"><div class="trace-step">7</div><div>ความซับซ้อน: ลูปซ้อน 3 ชั้น (i,j,k) → <strong>Θ(n³)</strong></div></div>
          </div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode · with partial pivoting</div></div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">BetterForwardElimination</span>(A[1..n, 1..n], b[1..n])
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">1</span> <span class="tok-key">to</span> n <span class="tok-key">do</span> A[i, n+<span class="tok-num">1</span>] <span class="tok-op">←</span> b[i]
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">1</span> <span class="tok-key">to</span> n-<span class="tok-num">1</span> <span class="tok-key">do</span>
    pivotrow <span class="tok-op">←</span> i
    <span class="tok-key">for</span> j <span class="tok-op">←</span> i+<span class="tok-num">1</span> <span class="tok-key">to</span> n <span class="tok-key">do</span>
        <span class="tok-key">if</span> |A[j, i]| <span class="tok-op">&gt;</span> |A[pivotrow, i]| pivotrow <span class="tok-op">←</span> j
    <span class="tok-key">for</span> k <span class="tok-op">←</span> i <span class="tok-key">to</span> n+<span class="tok-num">1</span> <span class="tok-key">do</span>
        <span class="tok-fn">swap</span>(A[i, k], A[pivotrow, k])
    <span class="tok-key">for</span> j <span class="tok-op">←</span> i+<span class="tok-num">1</span> <span class="tok-key">to</span> n <span class="tok-key">do</span>
        temp <span class="tok-op">←</span> A[j, i] / A[i, i]
        <span class="tok-key">for</span> k <span class="tok-op">←</span> i <span class="tok-key">to</span> n+<span class="tok-num">1</span> <span class="tok-key">do</span>
            A[j, k] <span class="tok-op">←</span> A[j, k] - A[i, k] <span class="tok-op">*</span> temp</pre></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Representation Change — เปลี่ยนโครงสร้างข้อมูล</h3>
        <ul class="check-list">
          <li><strong>Balanced Search Trees</strong> — AVL, 2-3 Trees ป้องกัน Worst case ของ BST</li>
          <li><strong>Heaps & Heapsort</strong> — สร้าง Heap (Complete Binary Tree) แล้วลบ Root ไปท้ายสุดเรื่อย ๆ</li>
          <li><strong>Horner's Rule</strong> — แยกตัวประกอบพหุนาม ลดรอบการคูณ</li>
          <li><strong>Binary Exponentiation</strong> — แปลงเลขยกกำลังเป็นเลขฐานสอง ลดรอบการคูณ</li>
        </ul>
        <div style="margin-top:14px">
          <div class="tag-row"><span class="badge badge-accent">Heap = ต้นไม้เต็มที่ root ใหญ่สุด (max-heap)</span></div>
          <div style="text-align:center;margin-top:8px">
            <svg viewBox="0 0 260 134" style="max-width:300px;width:100%">
              <g stroke="var(--line)" stroke-width="1.5" fill="none">
                <path d="M70 28 L40 70 M70 28 L100 70 M40 70 L25 112 M40 70 L55 112 M100 70 L85 112 M100 70 L115 112"/>
              </g>
              <g font-size="12" font-family="JetBrains Mono" font-weight="bold">
                <circle cx="70" cy="28" r="16" fill="var(--accent)"/><text x="70" y="33" text-anchor="middle" fill="#fff">9</text>
                <circle cx="40" cy="70" r="16" fill="var(--primary)"/><text x="40" y="75" text-anchor="middle" fill="#fff">7</text>
                <circle cx="100" cy="70" r="16" fill="var(--primary)"/><text x="100" y="75" text-anchor="middle" fill="#fff">6</text>
                <circle cx="25" cy="112" r="15" fill="var(--bg-alt)" stroke="var(--ink)"/><text x="25" y="117" text-anchor="middle" fill="var(--ink)">4</text>
                <circle cx="55" cy="112" r="15" fill="var(--bg-alt)" stroke="var(--ink)"/><text x="55" y="117" text-anchor="middle" fill="var(--ink)">2</text>
                <circle cx="85" cy="112" r="15" fill="var(--bg-alt)" stroke="var(--ink)"/><text x="85" y="117" text-anchor="middle" fill="var(--ink)">3</text>
                <circle cx="115" cy="112" r="15" fill="var(--bg-alt)" stroke="var(--ink)"/><text x="115" y="117" text-anchor="middle" fill="var(--ink)">1</text>
              </g>
              <text x="220" y="30" text-anchor="middle" font-size="9" fill="var(--muted)">Complete</text>
              <text x="220" y="42" text-anchor="middle" font-size="9" fill="var(--muted)">Binary Tree</text>
              <text x="220" y="88" text-anchor="middle" font-size="9" fill="var(--muted)">root &gt; ลูกเสมอ</text>
            </svg>
          </div>
          <div class="step-trace">
            <div class="step-trace-head">▶ Heapsort ทำงานยังไง (sift-down ครั้งแรก)</div>
            <div class="step-trace-body">
              <div class="trace-row"><div class="trace-step">1</div><div><strong>Sift-down</strong> = ดัน root ลงตามลูกที่ใหญ่กว่า ไล่จนกว่าจะถูกที่ — ครั้งแรก: 9 &gt; ลูกทั้งสอง → ถูกที่แล้ว</div></div>
              <div class="trace-row"><div class="trace-step">2</div><div><strong>Delete max</strong>: สลับ root กับตัวท้ายสุด (9↔1) → เอาออก → เหลือ n−1 → ทำ sift-down ใหม่</div></div>
              <div class="trace-row"><div class="trace-step">3</div><div>ทำซ้ำจนหมด → ข้อมูลเรียงจากมากไปน้อย → <strong>Θ(n log n)</strong> และใช้พื้นที่ O(1)</div></div>
            </div>
          </div>
        </div>
        <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
            <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">horner</span>(coeffs, x):
    <span class="tok-com"># coeffs = [a_n, ..., a_1, a_0]</span>
    result <span class="tok-op">=</span> <span class="tok-num">0</span>
    <span class="tok-key">for</span> c <span class="tok-key">in</span> coeffs:
        result <span class="tok-op">=</span> result <span class="tok-op">*</span> x <span class="tok-op">+</span> c   <span class="tok-com"># คูณ x แล้วบวกค่าสัมประสิทธิ์</span>
    <span class="tok-key">return</span> result</pre></div>
          </div>
          <div class="step-trace">
            <div class="step-trace-head">▶ ทำไม Horner ถึงลดการคูณ 2n → n? (ตัวอย่าง p(x) = 2x³−6x²+2x−1)</div>
            <div class="step-trace-body">
              <div class="trace-row"><div class="trace-step">1</div><div><strong>แบบตรง</strong> ต้องคำนวณ x², x³ (2 คูณ) แล้วคูณแต่ละเทอม (3 คูณ) = 5 คูณ = 2n−1 ครั้ง สำหรับพหุนามดีกรี 3</div></div>
              <div class="trace-row"><div class="trace-step">2</div><div><strong>แบบ Horner</strong> แยกตัวประกอบ: 2x³−6x²+2x−1 = <span class="trace-code">((2x−6)x+2)x−1</span></div></div>
              <div class="trace-row"><div class="trace-step">3</div><div>นับคูณ: (2x−6) 1 ครั้ง · ×x 1 ครั้ง · ×x 1 ครั้ง = <strong>3 คูณ</strong> = n ครั้ง — บวก 1 ครั้ง/เทอม</div></div>
              <div class="trace-row"><div class="trace-step">4</div><div>โจทย์ใหญ่: ดีกรี 1000 → แบบตรง ~2000 คูณ vs Horner 1000 คูณ → เร็วเกือบ 2 เท่า</div></div>
            </div>
          </div>
        </div>

      <!-- HORNER STEP-THROUGH -->
      <div class="card">
        <h3 class="card-title">Horner's Rule — ลองเล่น <span class="tag">Interactive</span></h3>
        <p class="card-lead">ใส่สัมประสิทธิ์ (คั่นด้วยจุลภาค จากสูงสุดถึงค่าคงที่) กับค่า x → ดูการคำนวณแบบ nested ทีละขั้น</p>
        <div class="viz-controls" style="flex-wrap:wrap;gap:8px">
          <label class="slider-row">coeffs:
            <input type="text" id="horCoeffs" value="2,-6,2,-1" style="width:140px;font-family:'JetBrains Mono',monospace">
          </label>
          <label class="slider-row">x = <input type="number" id="horX" value="3" style="width:60px"></label>
          <button class="btn btn-accent btn-sm" id="horStep">Step →</button>
          <button class="btn btn-sm" id="horReset">↻ Reset</button>
        </div>
        <div class="step-trace">
          <div class="step-trace-head">▶ แสดงผลการคำนวณ</div>
          <div class="step-trace-body" id="horBody"><div class="trace-row"><div class="trace-step">0</div><div>กด Step เพื่อเริ่มคำนวณ p(x) = 2x³ − 6x² + 2x − 1 ที่ x = 3</div></div></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Problem Reduction — แปลงเป็นปัญหาอื่น</h3>
        <div class="grid-2">
          <div>
            <div class="tag-row"><span class="badge badge-gold">LCM via GCD</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">หา LCM โดยแปลงไปหา GCD ก่อน แล้วใช้สูตร</p>
            <div class="math-block"><span class="math-inline" id="eq-lcm">$lcm(m, n) = \frac{m \times n}{gcd(m, n)}$</span></div>
          </div>
<div>
            <div class="tag-row"><span class="badge badge-gold">To Graph Problem</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">แปลงปัญหาลอจิกเป็น State-space graph เช่น ปัญหาชาวนา-แพะ-ผัก-หมาป่าข้ามแม่น้ำ</p>
          </div>
        </div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — ก่อนสอบ W6
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>Presort Uniqueness</strong>O(n log n) vs Brute O(n²)</div>
          <div class="mem-chip"><strong>Presort Mode</strong>เรียงก่อน → นับ run ติดกัน</div>
          <div class="mem-chip"><strong>Gaussian</strong>Forward elimination → Backward substitution · O(n³)</div>
          <div class="mem-chip"><strong>Heapsort</strong>O(n log n) · Space O(1)</div>
          <div class="mem-chip"><strong>Horner</strong>p(x) = ((aₙx+aₙ₋₁)x+…)x+a₀ · ลดคูณจาก 2n → n ครั้ง</div>
          <div class="mem-chip"><strong>LCM via GCD</strong>lcm = m·n / gcd(m,n)</div>
        </div>
      </div>
`;

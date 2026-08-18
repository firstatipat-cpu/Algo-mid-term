/* w1 content */

document.getElementById('w1').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">01 / 07</div>
        <h2 class="section-title">Introduction to Algorithms</h2>
        <div class="section-meta">บทนำ · อัลกอริทึมพื้นฐาน</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">อัลกอริทึมคืออะไร? <span class="tag">Definition</span></h3>
        <p class="card-lead">
          อัลกอริทึม (Algorithm) คือชุดคำสั่งที่มีความชัดเจนและมีการจัดเรียงลำดับการทำงาน เพื่อนำไปใช้ในการแก้ปัญหาหรือหาคำตอบ โดยรับ <strong>Input</strong> เข้าไปประมวลผล และแสดง <strong>Output</strong> ออกมา
        </p>
        <div class="formula-card">
          <div class="formula-card-label">Input → Process → Output</div>
          <div class="formula-card-eq">f(Input) = Output</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">คุณสมบัติของอัลกอริทึมที่ดี</h3>
        <ol class="fancy-list">
          <li><strong>Clear and Unambiguous</strong> — ชัดเจน ไม่คลุมเครือ</li>
          <li><strong>Well-Defined Inputs</strong> — มีการกำหนดอินพุตอย่างชัดเจน</li>
          <li><strong>Well-Defined Outputs</strong> — มีการกำหนดเอาต์พุตอย่างชัดเจน</li>
          <li><strong>Finite-ness</strong> — ต้องมีการทำงานที่สิ้นสุด (ไม่ติด Infinite Loop)</li>
          <li><strong>Feasible</strong> — เรียบง่าย สามารถนำไปปฏิบัติได้จริง</li>
          <li><strong>Language Independent</strong> — ไม่ยึดติดกับภาษาใดภาษาหนึ่ง</li>
        </ol>
      </div>

      <!-- NOTATION PRIMER -->
      <div class="card">
        <h3 class="card-title">รู้จักสัญลักษณ์ก่อนอ่าน Pseudocode <span class="tag">ก่อนเริ่ม</span></h3>
        <p class="card-lead"><strong>Pseudocode</strong> คือ "สูตรอาหารแบบกึ่งโค้ด" — เขียนเป็นภาษาไทย/ภาษาอังกฤษผสมกับสัญลักษณ์ เพื่ออธิบายลำดับขั้นตอนให้คนอ่านเข้าใจ โดยไม่ต้องเป็นโค้ดที่รันได้จริง ไม่ยึดติดภาษาโปรแกรม</p>
        <div class="formula-card">
          <div class="formula-card-label">สัญลักษณ์ที่ใช้บ่อยในบทนี้</div>
          <div class="formula-card-eq" style="font-size:14px;line-height:2">
            <code>←</code> = กำหนดค่า (เอา<b>ด้านขวา</b>ไปเก็บใน<b>ด้านซ้าย</b>) &nbsp;·&nbsp;
            <code>≠</code> = ไม่เท่ากับ &nbsp;·&nbsp;
            <code>≤</code> = น้อยกว่าหรือเท่ากับ &nbsp;·&nbsp;
            <code>mod</code> = เศษเหลือจากการหาร (เช่น 48 mod 18 = <b>12</b>) &nbsp;·&nbsp;
            <code>floor(x)</code> = ปัดลงเป็นจำนวนเต็ม (เช่น floor(2.9) = <b>2</b>) &nbsp;·&nbsp;
            <code>sqrt(n)</code> = รากที่สอง
          </div>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body"><strong>While loop</strong> = วนซ้ำ <em>"ตราบใดที่เงื่อนไขยังเป็นจริง"</em> — เช็คเงื่อนไข → ทำในลูป → กลับไปเช็คเงื่อนไขอีก → ถ้าเงื่อนไขเป็นเท็จจึงหยุด ตัวอย่าง: ลูป <code>while n ≠ 0</code> ด้านล่างจะทำงานซ้ำจนกว่า n จะกลายเป็น 0</div>
        </div>
      </div>

      <!-- Euclid GCD VIZ -->
      <div class="card">
        <h3 class="card-title">Euclid's Algorithm — หา ห.ร.ม. (GCD) <span class="tag">Interactive</span></h3>
        <p class="card-lead">แก้ปัญหาหาตัวหารร่วมมากด้วยการหาร Modular ซ้ำ ๆ จนกว่าเศษเหลือเป็น 0</p>
        
        <div class="code-block">
          <div class="code-head">
            <div class="code-dots"><span></span><span></span><span></span></div>
            <div class="code-lang">Pseudocode</div>
          </div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">Euclid</span>(m, n)
<span class="tok-com">// หาค่าห.ร.ม. (Greatest Common Divisor)</span>
<span class="tok-key">while</span> n <span class="tok-op">≠</span> <span class="tok-num">0</span> <span class="tok-key">do</span>
    r <span class="tok-op">←</span> m <span class="tok-key">mod</span> n
    m <span class="tok-op">←</span> n
    n <span class="tok-op">←</span> r
<span class="tok-key">return</span> m</pre></div>
        </div>

        <div class="code-block">
          <div class="code-head">
            <div class="code-dots"><span></span><span></span><span></span></div>
            <div class="code-lang">Python</div>
          </div>
          <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">gcd</span>(m, n):
    <span class="tok-key">while</span> n <span class="tok-op">!=</span> <span class="tok-num">0</span>:
        r <span class="tok-op">=</span> m <span class="tok-op">%</span> n
        m <span class="tok-op">=</span> n
        n <span class="tok-op">=</span> r
    <span class="tok-key">return</span> m</pre></div>
        </div>

        <div class="step-trace">
          <div class="step-trace-head">▶ ตัวอย่าง: Euclid(48, 18) ทีละรอบ</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>m=<span class="trace-code">48</span>, n=<span class="trace-code">18</span> → r = 48 mod 18 = <strong>12</strong> → ตั้ง m=18, n=12</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>m=<span class="trace-code">18</span>, n=<span class="trace-code">12</span> → r = 18 mod 12 = <strong>6</strong> → ตั้ง m=12, n=6</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>m=<span class="trace-code">12</span>, n=<span class="trace-code">6</span> → r = 12 mod 6 = <strong>0</strong> → ตั้ง m=6, n=0</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>n = 0 → <strong>จบ</strong> → return m = <span class="trace-code" style="font-weight:700;color:var(--accent)">6</span></div></div>
          </div>
        </div>

        <div class="viz-controls">
          <label class="slider-row">m = <input type="number" id="gcdM" value="48" min="1" max="999" style="width:70px"></label>
          <label class="slider-row">n = <input type="number" id="gcdN" value="18" min="1" max="999" style="width:70px"></label>
          <button class="btn btn-accent btn-sm" id="gcdStep">Step →</button>
          <button class="btn btn-sm" id="gcdReset">Reset</button>
          <span style="margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted)">GCD = <strong id="gcdResult" style="color:var(--accent);font-size:16px">—</strong></span>
        </div>

        <div class="gcd-viz" id="gcdViz">
          <div class="gcd-step">
            <div class="gcd-num active" id="gcdM-v">48</div>
            <div class="gcd-label">m</div>
          </div>
          <div class="gcd-arrow">↔</div>
          <div class="gcd-step">
            <div class="gcd-num active" id="gcdN-v">18</div>
            <div class="gcd-label">n</div>
          </div>
          <div class="gcd-arrow" style="opacity:0">→</div>
          <div class="gcd-step" id="gcdRStep" style="opacity:0">
            <div class="gcd-num" id="gcdR-v">0</div>
            <div class="gcd-label">r = m mod n</div>
          </div>
        </div>
      </div>

      <!-- Sieve VIZ -->
      <div class="card">
        <h3 class="card-title">Sieve of Eratosthenes — หาจำนวนเฉพาะ <span class="tag">Interactive</span></h3>
        <p class="card-lead">คัดกรองจำนวนเฉพาะทั้งหมดที่ ≤ n โดยเริ่มจาก 2 แล้วตัดทวีคูณของแต่ละจำนวนเฉพาะทีละตัว</p>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body"><strong>Array คืออะไร?</strong> ช่องเก็บข้อมูลเรียงกันเป็นแถว เรียกช่องที่ i ว่า <code>a[i]</code> (นับจาก 0: a[0], a[1], …) — ด้านล่าง <code>a[p] ← p</code> แปลว่า "เอาค่า p ไปเก็บในช่องลำดับ p" และ <code>primes + [p]</code> คือ "เอาลิสต์เดิมมาต่อท้ายด้วย p"</div>
        </div>
        
        <div class="code-block">
          <div class="code-head">
            <div class="code-dots"><span></span><span></span><span></span></div>
            <div class="code-lang">Pseudocode</div>
          </div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">Sieve</span>(n)
<span class="tok-com">// หา prime number ที่มีค่าน้อยกว่าหรือเท่ากับ n</span>
<span class="tok-key">for</span> p <span class="tok-op">←</span> <span class="tok-num">2</span> <span class="tok-key">to</span> n <span class="tok-key">do</span> a[p] <span class="tok-op">←</span> p
<span class="tok-key">for</span> p <span class="tok-op">←</span> <span class="tok-num">2</span> <span class="tok-key">to</span> floor(sqrt(n)) <span class="tok-key">do</span>
    <span class="tok-key">if</span> a[p] <span class="tok-op">≠</span> <span class="tok-num">0</span>
        j <span class="tok-op">←</span> p <span class="tok-op">*</span> p
        <span class="tok-key">while</span> j <span class="tok-op">≤</span> n <span class="tok-key">do</span>
            a[j] <span class="tok-op">←</span> <span class="tok-num">0</span>
            j <span class="tok-op">←</span> j <span class="tok-op">+</span> p
<span class="tok-com">// เก็บค่าที่ยังไม่ถูกตัด (a[p] ≠ 0) ไว้ในลิสต์ primes</span>
primes <span class="tok-op">←</span> [ ]
<span class="tok-key">for</span> p <span class="tok-op">←</span> <span class="tok-num">2</span> <span class="tok-key">to</span> n <span class="tok-key">do</span>
    <span class="tok-key">if</span> a[p] <span class="tok-op">≠</span> <span class="tok-num">0</span> <span class="tok-key">then</span> primes <span class="tok-op">←</span> primes <span class="tok-op">+</span> [p]
<span class="tok-key">return</span> primes</pre></div>
        </div>

        <div class="code-block">
          <div class="code-head">
            <div class="code-dots"><span></span><span></span><span></span></div>
            <div class="code-lang">Python</div>
          </div>
          <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">sieve</span>(n):
    a <span class="tok-op">=</span> [i <span class="tok-key">for</span> i <span class="tok-key">in</span> range(n + <span class="tok-num">1</span>)]
    <span class="tok-key">for</span> p <span class="tok-key">in</span> range(<span class="tok-num">2</span>, int(n <span class="tok-op">**</span> <span class="tok-num">0.5</span>) + <span class="tok-num">1</span>):
        <span class="tok-key">if</span> a[p] <span class="tok-op">!=</span> <span class="tok-num">0</span>:
            <span class="tok-key">for</span> j <span class="tok-key">in</span> range(p <span class="tok-op">*</span> p, n + <span class="tok-num">1</span>, p):
                a[j] <span class="tok-op">=</span> <span class="tok-num">0</span>
    <span class="tok-key">return</span> [p <span class="tok-key">for</span> p <span class="tok-key">in</span> a <span class="tok-key">if</span> p <span class="tok-op">&gt;=</span> <span class="tok-num">2</span>]</pre></div>
        </div>

        <div class="step-trace">
          <div class="step-trace-head">▶ ตัวอย่าง: Sieve(30) คัดกรองทีละจำนวนเฉพาะ</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>เริ่ม: 2,3,4,…,30 ยังไม่ถูกตัด → เริ่มที่ p=<strong>2</strong></div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>p=2 → ตัดทวีคูณของ 2 ตั้งแต่ 2²=4: <span class="trace-code">4,6,8,…,30</span> ถูกตัด (2 เองยังอยู่)</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>p=3 (ยังไม่ถูกตัด) → ตัดทวีคูณของ 3 ตั้งแต่ 3²=9: <span class="trace-code">9,12,15,…,30</span></div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>p=4 ถูกตัดแล้ว → ข้ามไป (a[4]=0) → p=5 → ตัดตั้งแต่ 25: <span class="trace-code">25,30</span></div></div>
            <div class="trace-row"><div class="trace-step">5</div><div>p=6,7,… ที่เหลือล้วนเกิน √30≈5.47 → <strong>หยุดได้</strong> เพราะทวีคูณของมันถูกตัดไปหมดแล้ว (วน p แค่ถึง √n)</div></div>
            <div class="trace-row"><div class="trace-step">6</div><div>เก็บค่าที่ยังไม่ถูกตัด: <span class="trace-code">2,3,5,7,11,13,17,19,23,29</span> ✓</div></div>
          </div>
        </div>

        <div class="viz-controls">
          <label class="slider-row">n = 
            <input type="range" id="sieveN" min="20" max="100" value="50" step="2" oninput="document.getElementById('sieveNLabel').textContent=this.value">
            <span id="sieveNLabel" style="font-family:'JetBrains Mono',monospace;color:var(--accent);font-weight:600;min-width:24px">50</span>
          </label>
          <button class="btn btn-accent btn-sm" id="sieveRun">เริ่ม Sieve →</button>
          <button class="btn btn-sm" id="sievePause">⏸ หยุดชั่วคราว</button>
          <button class="btn btn-sm" id="sieveReset">Reset</button>
          <span style="margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted)">Primes: <strong id="sieveCount" style="color:var(--primary)">0</strong></span>
        </div>

        <div class="sieve-grid" id="sieveGrid"></div>
      </div>

      <div class="card">
        <h3 class="card-title">หลักการพื้นฐานของการแก้ปัญหา (Problem Solving Process)</h3>
        <div class="step-grid">
          <div class="step-item"><div class="step-num">Step 01</div><div class="step-text">ทำความเข้าใจปัญหา (Understand the problem)</div></div>
          <div class="step-item"><div class="step-num">Step 02</div><div class="step-text">ตัดสินใจเลือก Exact หรือ Approximate</div></div>
          <div class="step-item"><div class="step-num">Step 03</div><div class="step-text">ออกแบบ Algorithm & Data structures</div></div>
          <div class="step-item"><div class="step-num">Step 04</div><div class="step-text">พิสูจน์ความถูกต้อง (Prove correctness)</div></div>
          <div class="step-item"><div class="step-num">Step 05</div><div class="step-text">วิเคราะห์อัลกอริทึม (Analyze)</div></div>
          <div class="step-item"><div class="step-num">Step 06</div><div class="step-text">เขียนโค้ดจากอัลกอริทึม (Code)</div></div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="card-title">ประเภทของปัญหาสำคัญ</h3>
          <ul class="check-list">
            <li><strong>Sorting</strong> — การจัดเรียงข้อมูล</li>
            <li><strong>Searching</strong> — การค้นหาข้อมูล</li>
            <li><strong>String Processing</strong> — ประมวลผลข้อความ</li>
            <li><strong>Graph problems</strong> — TSP, การให้สีกราฟ</li>
            <li><strong>Combinatorial</strong> — จัดหมู่/เรียงสับเปลี่ยน</li>
            <li><strong>Geometric</strong> — closest-pair, convex-hull</li>
            <li><strong>Numerical</strong> — ปัญหาเชิงตัวเลข</li>
          </ul>
        </div>
        <div class="card">
          <h3 class="card-title">โครงสร้างข้อมูลพื้นฐาน</h3>
          <ul class="check-list">
            <li><strong>Linear</strong> — Array, Linked List, Stack, Queue</li>
            <li><strong>Graphs</strong> — Vertex + Edge (Directed, Undirected, Weighted)</li>
            <li><strong>Trees</strong> — โครงสร้างแบบลำดับชั้น</li>
            <li><strong>Sets & Dictionaries</strong> — Key-Value, ไม่ซ้ำกัน</li>
          </ul>
<div class="callout callout-note">
            <div class="callout-icon">i</div>
            <div class="callout-body">Graph ที่ <strong>Dense</strong> มี Edge ใกล้เต็มจำนวนที่เป็นไปได้ ส่วน <strong>Sparse</strong> มี Edge น้อย</div>
          </div>
        </div>
      </div>

      <!-- PROBLEM TYPE CLASSIFIER -->
      <div class="card">
        <h3 class="card-title">ฝึกจำแนกประเภทปัญหา <span class="tag">Interactive</span></h3>
        <p class="card-lead">ดูโจทย์ตัวอย่างแล้วเลือกว่าเป็นปัญหาแบบไหน — กด "ถัดไป" เพื่อโจทย์ใหม่</p>
        <div style="padding:16px;background:var(--bg-alt);border-radius:12px;margin-bottom:12px;font-size:14px;color:var(--ink);line-height:1.6" id="ptProblem">โหลดโจทย์…</div>
        <div class="viz-controls" style="flex-wrap:wrap;gap:8px">
          <button class="btn btn-sm pt-type" data-t="Sorting">Sorting</button>
          <button class="btn btn-sm pt-type" data-t="Searching">Searching</button>
          <button class="btn btn-sm pt-type" data-t="String">String</button>
          <button class="btn btn-sm pt-type" data-t="Graph">Graph</button>
          <button class="btn btn-sm pt-type" data-t="Combinatorial">Combinatorial</button>
          <button class="btn btn-sm pt-type" data-t="Geometric">Geometric</button>
          <button class="btn btn-sm pt-type" data-t="Numerical">Numerical</button>
          <button class="btn btn-accent btn-sm" id="ptNext" style="margin-left:auto">ถัดไป →</button>
        </div>
        <div id="ptStatus" style="margin-top:10px;font-size:13px;color:var(--ink-2)">เลือกคำตอบของคุณ!</div>
      </div>

      <!-- BRIDGE TO W2 -->
      <div class="callout callout-warn" style="margin:16px 0">
        <div class="callout-icon">→</div>
        <div class="callout-body">
          <strong>แล้วทำไมต้องสนใจ "เร็วแค่ไหน"?</strong> ลองคิด: Sieve หาจำนวนเฉพาะถึง n=100 ใช้เวลานิดเดียว แต่ถ้า n=10,000,000 ล่ะ? หรือ Euclid บนเลข 30 หลัก? ขนาดข้อมูลโตขึ้นแบบนี้ จำนวนขั้นตอนการทำงานก็โตตาม — บท <strong>Week 02</strong> จะเป็นเรื่องการวัด "จำนวนขั้นตอน" นั้นเอง (เรียกว่า <strong>Time Complexity</strong>) และสัปดาห์นี้เองคือจุดเริ่มต้นของคำถามนี้: <em>"อัลกอริทึมนี้ใช้กี่ขั้นตอนเมื่อข้อมูล n ใหญ่ขึ้น?"</em>
        </div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — ก่อนสอบ W1
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>Algorithm</strong>ชุดคำสั่งชัดเจน รับ Input → Output</div>
          <div class="mem-chip"><strong>6 คุณสมบัติ</strong>ชัดเจน, อินพุต/เอาต์พุตนิยาม, จบได้, ทำได้จริง, เป็นกลางภาษา</div>
          <div class="mem-chip"><strong>Euclid</strong>gcd = m mod n ซ้ำจน n = 0</div>
          <div class="mem-chip"><strong>Sieve</strong>วน p จนถึง √n แล้วตัดทวีคูณของ p ตั้งแต่ p² ถึง n</div>
          <div class="mem-chip"><strong>7 ประเภทปัญหา</strong>Sort · Search · String · Graph · Combinatorial · Geometric · Numerical</div>
          <div class="mem-chip"><strong>6 ขั้นตอน</strong>เข้าใจ → เลือกวิธี → ออกแบบ → พิสูจน์ → วิเคราะห์ → เขียนโค้ด</div>
        </div>
      </div>
`;

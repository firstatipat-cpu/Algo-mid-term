/* w3 content */

document.getElementById('w3').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">03 / 07</div>
        <h2 class="section-title">Brute Force & Exhaustive Search</h2>
        <div class="section-meta">ตรงไปตรงมา · ลองทุกเส้นทาง</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">แนวคิด Brute Force</h3>
        <p class="card-lead">
          เป็นแนวคิดการแก้ปัญหาแบบ <strong>"ตรงไปตรงมา" (Straightforward)</strong> โดยอิงจากคำจำกัดความของปัญหาโดยตรง ไม่มีความซับซ้อน — มักใช้เวลามาก แต่ <em>เขียนง่ายและเป็นมาตรฐานเปรียบเทียบ</em>
        </p>
        <div class="callout callout-tip" style="margin-top:12px">
          <div class="callout-icon">!</div>
          <div class="callout-body"><strong>ตัวอย่างที่เห็นภาพ:</strong> เดา PIN 3 หลักแบบ brute force = ลอง 000, 001, …, 999 ไปเรื่อยจนเจอ — ตรงไปตรงมา (แต่ถ้าเป็น 6 หลัก… 1,000,000 แบบ!) นี่คือ "ลองทุกวิธี" ที่บทนี้หมายถึง</div>
        </div>
      </div>

      <!-- NOTATION PRIMER -->
      <div class="callout callout-note">
        <div class="callout-icon">i</div>
        <div class="callout-body">
          <strong>ศัพท์ที่ต้องรู้ก่อน:</strong> <strong>Array (อาร์เรย์)</strong> = ช่องเก็บข้อมูลเรียงกัน เรียกช่องที่ i ว่า <code>A[i]</code> โดย <strong>นับจาก 0</strong> (ช่องแรกคือ A[0]) · <strong>Sorting</strong> = การเรียงข้อมูลให้เป็นลำดับ (น้อยไปมาก) · <strong>compare</strong> = เปรียบเทียบสองค่า · <strong>swap</strong> = สลับตำแหน่ง · ใน pseudocode <code>for i ← 0 to n-2</code> หมายถึงให้ i มีค่า 0,1,…,n−2 (ไม่รวม n−1) และ <code>←</code> = กำหนดค่า. <em>Merge Sort และ Quick Sort ใน Visualizer ด้านล่างไม่ใช่ Brute Force — เป็นเทคนิค Divide & Conquer ที่จะเรียนใน Week 05 นะ</em>
        </div>
      </div>

      <!-- SORTING VIZ -->
      <div class="card">
        <h3 class="card-title">Sorting Visualizer <span class="tag">Interactive</span></h3>
        <p class="card-lead">เปรียบเทียบพฤติกรรมของ Bubble Sort, Selection Sort, Insertion Sort, Merge Sort และ Quick Sort แบบเรียลไทม์ — วางเมาส์เหนือแท่งเพื่อดูค่าตัวเลข</p>
        
        <div class="tabs" id="sortTabs">
          <button class="tab active" data-algo="bubble">Bubble Sort</button>
          <button class="tab" data-algo="selection">Selection Sort</button>
          <button class="tab" data-algo="insertion">Insertion Sort</button>
          <button class="tab" data-algo="merge">Merge Sort</button>
          <button class="tab" data-algo="quick">Quick Sort</button>
        </div>

        <div class="viz-controls">
          <button class="btn btn-accent btn-sm" id="sortPlay">▶ Play</button>
          <button class="btn btn-sm" id="sortPause">⏸ Pause</button>
          <button class="btn btn-sm" id="sortReset">↻ New Array</button>
          <label class="slider-row">Size 
            <input type="range" id="sortSize" min="10" max="60" value="30" oninput="document.getElementById('sortSizeLabel').textContent=this.value">
            <span id="sortSizeLabel" style="font-family:'JetBrains Mono',monospace;color:var(--accent);font-weight:600;min-width:24px">30</span>
          </label>
          <label class="slider-row">Speed 
            <input type="range" id="sortSpeed" min="1" max="100" value="60" oninput="document.getElementById('sortSpeedLabel').textContent=this.value">
            <span id="sortSpeedLabel" style="font-family:'JetBrains Mono',monospace;color:var(--accent);font-weight:600;min-width:24px">60</span>
          </label>
        </div>

        <div class="viz-canvas-wrap" id="sortCanvas"></div>
        <div class="viz-stats">
          <div class="viz-stat">Comparisons: <strong id="sortComp">0</strong></div>
          <div class="viz-stat">Swaps: <strong id="sortSwap">0</strong></div>
          <div class="viz-stat">Algorithm: <strong id="sortName">Bubble Sort</strong></div>
          <div class="viz-stat">Complexity: <strong id="sortComplexity">O(n²)</strong></div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="card-title">Bubble Sort</h3>
          <p class="card-lead">เปรียบเทียบและสลับคู่ติดกันไปเรื่อย ๆ จนกว่าจะเรียงเสร็จ <span class="badge badge-rose">O(n²)</span></p>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
            <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">BubbleSort</span>(A[0..n-1])
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> n-<span class="tok-num">2</span> <span class="tok-key">do</span>
    <span class="tok-key">for</span> j <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> n-<span class="tok-num">2</span>-i <span class="tok-key">do</span>
        <span class="tok-key">if</span> A[j+<span class="tok-num">1</span>] <span class="tok-op">&lt;</span> A[j]
            <span class="tok-key">swap</span> A[j] <span class="tok-key">and</span> A[j+<span class="tok-num">1</span>]</pre></div>
          </div>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
            <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">bubble_sort</span>(A):
    n <span class="tok-op">=</span> len(A)
    <span class="tok-key">for</span> i <span class="tok-key">in</span> range(n <span class="tok-op">-</span> <span class="tok-num">1</span>):
        <span class="tok-key">for</span> j <span class="tok-key">in</span> range(n <span class="tok-op">-</span> <span class="tok-num">1</span> <span class="tok-op">-</span> i):
            <span class="tok-key">if</span> A[j] <span class="tok-op">&gt;</span> A[j + <span class="tok-num">1</span>]:
                A[j], A[j + <span class="tok-num">1</span>] <span class="tok-op">=</span> A[j + <span class="tok-num">1</span>], A[j]</pre></div>
          </div>
        </div>
        <div class="card">
          <h3 class="card-title">Selection Sort</h3>
          <p class="card-lead">หาตัวน้อยสุดในแต่ละรอบ แล้วสลับไว้ด้านหน้า <span class="badge badge-rose">O(n²)</span></p>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
            <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">SelectionSort</span>(A[0..n-1])
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> n-<span class="tok-num">2</span> <span class="tok-key">do</span>
    min <span class="tok-op">←</span> i
    <span class="tok-key">for</span> j <span class="tok-op">←</span> i+<span class="tok-num">1</span> <span class="tok-key">to</span> n-<span class="tok-num">1</span> <span class="tok-key">do</span>
        <span class="tok-key">if</span> A[j] <span class="tok-op">&lt;</span> A[min] min <span class="tok-op">←</span> j
    <span class="tok-key">swap</span> A[i] <span class="tok-key">and</span> A[min]</pre></div>
          </div>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
            <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">selection_sort</span>(A):
    n <span class="tok-op">=</span> len(A)
    <span class="tok-key">for</span> i <span class="tok-key">in</span> range(n <span class="tok-op">-</span> <span class="tok-num">1</span>):
        min_idx <span class="tok-op">=</span> i
        <span class="tok-key">for</span> j <span class="tok-key">in</span> range(i + <span class="tok-num">1</span>, n):
            <span class="tok-key">if</span> A[j] <span class="tok-op">&lt;</span> A[min_idx]:
                min_idx <span class="tok-op">=</span> j
        A[i], A[min_idx] <span class="tok-op">=</span> A[min_idx], A[i]</pre></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Bubble Sort — อธิบายทีละขั้น</h3>
        <p class="card-lead">สมมติเรียง <span class="trace-code">[5, 3, 8, 1]</span> — รอบแรก (i=0) เลื่อนค่าที่มากสุดไปท้ายสุด</p>
        <div class="step-trace">
          <div class="step-trace-head">▶ เปรียบเทียบทีละคู่</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>เทียบ <span class="trace-code">5 > 3</span> → สลับ → <span class="trace-code">[3, 5, 8, 1]</span></div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>เทียบ <span class="trace-code">5 > 8?</span> ไม่ → คงเดิม</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>เทียบ <span class="trace-code">8 > 1</span> → สลับ → <span class="trace-code">[3, 5, 1, 8]</span> — 8 ถึงตำแหน่งสุดท้ายแล้ว</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>รอบที่ 2 (i=1): เทียบ <span class="trace-code">3 > 5?</span> ไม่ · <span class="trace-code">5 > 1</span> → สลับ → <span class="trace-code">[3, 1, 5, 8]</span></div></div>
            <div class="trace-row"><div class="trace-step">5</div><div>รอบที่ 3 (i=2): <span class="trace-code">3 > 1</span> → สลับ → <span class="trace-code">[1, 3, 5, 8]</span> ✅</div></div>
            <div class="trace-row"><div class="trace-step">6</div><div>จำนวนการเปรียบเทียบ = (n−1)+(n−2)+…+1 = <span class="trace-code">n(n−1)/2</span> ≈ O(n²)</div></div>
            <div class="trace-row"><div class="trace-step">7</div><div><strong>ที่มาของ O(n²):</strong> แต่ละรอบ เทียบคู่ติดกันไปเรื่อย — รอบแรก n−1 ครั้ง, รอบสอง n−2 ครั้ง (ตัวใหญ่สุดไปอยู่ท้ายแล้ว ไม่ต้องแตะ), …, รอบสุดท้าย 1 ครั้ง. สำหรับ n=4: 3+2+1 = 6 ครั้ง. รวม = n(n−1)/2 — เทอมใหญ่สุดคือ n² → <strong>O(n²)</strong> หมายถึง "ข้อมูล 2 เท่า → งาน ~4 เท่า"</div></div>
            <div class="trace-row"><div class="trace-step">8</div><div><strong>ทำไมลูปนอกถึงแค่ n−2?</strong> เพราะเมื่อเหลือตัวสุดท้าย มันต้องเป็นตัวน้อยสุดแล้วโดยอัตโนมัติ (ตัวอื่นถูก "พัด" ไปตำแหน่งที่ถูกครบ) — รอบสุดท้ายไม่จำเป็น. และลูปในลดลงทุกครั้ง (n−2−i) เพราะท้ายอาร์เรย์เรียงเสร็จแล้วทีละตำแหน่ง</div></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Sequential Search (มี Sentinel)</h3>
        <p class="card-lead">ค้นหาไล่ไปทีละตัว ใส่ Sentinel ที่ท้ายสุดเพื่อลดการเปรียบเทียบเงื่อนไข out-of-bounds</p>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body">
            <strong>ปัญหาที่ Sentinel แก้:</strong> ลูปแบบปกติต้องเช็ค <strong>2 เงื่อนไขทุกครั้ง</strong> — "เจอ K ยัง?" และ "ยังไม่เกินขอบอาร์เรย์?" (i &lt; n). <strong>Sentinel</strong> = ค่าตัวเองที่เอาไปวางไว้ท้ายอาร์เรย์เป็น "ผู้คุมเส้นชัย" — ถ้าไปเจอมัน แปลว่าไม่พบ K จริงๆ. วิธีนี้เหลือเช็คเงื่อนไขเดียว (A[i] ≠ K) ต่อรอบ → ประหยัดการเปรียบเทียบได้ ~n ครั้ง. เขียน A[n] = K ได้เพราะเราสร้างอาร์เรย์เผื่อช่องพิเศษไว้
          </div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">SequentialSearch2</span>(A[0..n], K)
A[n] <span class="tok-op">←</span> K  <span class="tok-com">// ใส่ Sentinel ไว้ท้ายสุด</span>
i <span class="tok-op">←</span> <span class="tok-num">0</span>
<span class="tok-key">while</span> A[i] <span class="tok-op">≠</span> K <span class="tok-key">do</span>
    i <span class="tok-op">←</span> i + <span class="tok-num">1</span>
<span class="tok-key">if</span> i <span class="tok-op">&lt;</span> n <span class="tok-key">return</span> i
<span class="tok-key">else</span> <span class="tok-key">return</span> -<span class="tok-num">1</span></pre></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Brute-Force String Matching</h3>
        <p class="card-lead">นำ Pattern ไปเทียบกับ Text ทีละตัวอักษร หากไม่ตรงก็เลื่อนตำแหน่งไป 1 ช่อง <span class="badge badge-rose">O(nm)</span></p>
        <div class="callout callout-tip">
          <div class="callout-icon">!</div>
          <div class="callout-body">
            <strong>สองตัวแปรคืออะไร:</strong> <code>i</code> = ตำแหน่งใน <strong>Text</strong> ที่กำลังลองเทียบ (จุดเริ่มของหน้าต่าง) · <code>j</code> = จำนวนตัวอักษรที่ตรงกันแล้วใน <strong>Pattern</strong>. สูตร <code>P[j] = T[i+j]</code> = เทียบ "ตัวที่ j ของ pattern" กับ "ตัวที่อยู่ถัดจากจุดเริ่ม i ไปอีก j". <strong>ทำไม i แค่ถึง n−m?</strong> เพราะถ้า i เกินนี้ หน้าต่างจะล้นขอบ Text (ต้องมีที่ว่างพอสำหรับ m ตัว) — ลอง n=10, m=3 → i=7 ก็ยังมีช่อง 7,8,9 พอดี เริ่ม 8 ไม่ได้แล้ว
          </div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">BruteForceStringMatch</span>(T[0..n-1], P[0..m-1])
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">0</span> <span class="tok-key">to</span> n-m <span class="tok-key">do</span>
    j <span class="tok-op">←</span> <span class="tok-num">0</span>
    <span class="tok-key">while</span> j <span class="tok-op">&lt;</span> m <span class="tok-key">and</span> P[j] = T[i+j] <span class="tok-key">do</span>
        j <span class="tok-op">←</span> j + <span class="tok-num">1</span>
    <span class="tok-key">if</span> j = m <span class="tok-key">return</span> i
<span class="tok-key">return</span> -<span class="tok-num">1</span></pre></div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
          <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">brute_match</span>(T, P):
    n, m <span class="tok-op">=</span> len(T), len(P)
    <span class="tok-key">for</span> i <span class="tok-key">in</span> range(n <span class="tok-op">-</span> m + <span class="tok-num">1</span>):
        j <span class="tok-op">=</span> <span class="tok-num">0</span>
        <span class="tok-key">while</span> j <span class="tok-op">&lt;</span> m <span class="tok-key">and</span> P[j] <span class="tok-op">==</span> T[i <span class="tok-op">+</span> j]:
            j <span class="tok-op">+=</span> <span class="tok-num">1</span>
        <span class="tok-key">if</span> j <span class="tok-op">==</span> m:
            <span class="tok-key">return</span> i
    <span class="tok-key">return</span> -<span class="tok-num">1</span></pre></div>
        </div>
      </div>

      <!-- STRING MATCHING VIZ -->
      <div class="card">
        <h3 class="card-title">Brute-Force String Matching — ลองเล่น <span class="tag">Interactive</span></h3>
        <p class="card-lead">ดูว่า Pattern ถูกเลื่อนและเทียบทีละตำแหน่งอย่างไร — กด Step เพื่อเลื่อนไปตำแหน่งถัดไป</p>
        <div class="viz-controls">
          <label class="slider-row">Text:
            <input type="text" id="smText" value="NOBODY NOTICED HIM" style="width:200px;font-family:'JetBrains Mono',monospace">
          </label>
          <label class="slider-row">Pattern:
            <input type="text" id="smPattern" value="NOT" style="width:90px;font-family:'JetBrains Mono',monospace">
          </label>
          <button class="btn btn-accent btn-sm" id="smStep">Step →</button>
          <button class="btn btn-sm" id="smReset">↻ Reset</button>
        </div>
        <div id="smDisplay" style="margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:14px;line-height:2"></div>
        <div id="smStatus" style="margin-top:8px;font-size:13px;color:var(--ink-2)"></div>
      </div>

      <div class="card">
        <h3 class="card-title">Closest-Pair Problem (Brute Force)</h3>
        <p class="card-lead">หาคู่ของจุดที่อยู่ใกล้กันที่สุด โดยคำนวณระยะห่างระหว่างจุดทุกคู่ <span class="badge badge-rose">O(n²)</span></p>
        <div class="step-trace">
          <div class="step-trace-head">▶ ตัวอย่าง: จุด (0,0), (3,4), (1,1) — หาคู่ที่ใกล้สุด</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>คู่ (0,0)-(3,4): d = √((0−3)²+(0−4)²) = √(9+16) = <strong>5</strong></div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>คู่ (0,0)-(1,1): d = √((0−1)²+(0−1)²) = √2 ≈ <strong>1.41</strong> ← น้อยกว่า → เก็บไว้</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>คู่ (3,4)-(1,1): d = √((3−1)²+(4−1)²) = √(4+9) ≈ <strong>3.61</strong> — ไม่น้อยกว่า</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>ได้คู่ที่ใกล้สุด = (0,0)-(1,1) ระยะ <strong>√2</strong>. จำนวนคู่ทั้งหมด = C(n,2) = n(n−1)/2 → <strong>Θ(n²)</strong></div></div>
            <div class="trace-row"><div class="trace-step">5</div><div><strong>C(n,2) อ่านว่า "เลือก 2 จาก n"</strong> = จำนวนวิธีจับคู่ 2 จุดจาก n จุด = n(n−1)/2 (เช่น n=4 → 4×3/2 = 6 คู่) — สูตรเดียวกับผลบวก 1+2+…+(n−1)</div></div>
          </div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">BruteForceClosestPair</span>(P)
d <span class="tok-op">←</span> ∞
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">1</span> <span class="tok-key">to</span> n-<span class="tok-num">1</span> <span class="tok-key">do</span>
    <span class="tok-key">for</span> j <span class="tok-op">←</span> i+<span class="tok-num">1</span> <span class="tok-key">to</span> n <span class="tok-key">do</span>
        d <span class="tok-op">←</span> <span class="tok-fn">min</span>(d, <span class="tok-fn">sqrt</span>((xi-xj)² + (yi-yj)²))
<span class="tok-key">return</span> d</pre></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Exhaustive Search — ค้นทุกเส้นทางที่เป็นไปได้</h3>
        <p class="card-lead">แตกยอดมาจาก Brute Force ใช้กับปัญหา Combinatorial — ต้องค้นหาหรือลองทุกเส้นทางที่เป็นไปได้ทั้งหมด เพื่อหาคำตอบที่ดีที่สุด</p>
        <div class="grid-3">
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:16px;color:var(--accent)">TSP</div>
            <div style="font-size:12px;color:var(--muted);margin:4px 0">Traveling Salesman</div>
            <div style="font-size:13px;color:var(--ink-2)">หาเส้นทางผ่านทุกจุดกลับจุดเริ่มต้นให้สั้นสุด</div>
            <div class="math-block" style="margin:10px 0 0"><span class="math-inline" id="eq-tsp">$\Theta(n!)$</span></div>
            <div style="font-size:12px;color:var(--ink-2);margin-top:8px;line-height:1.6"><strong>ทำไม n!?</strong> เพราะต้องลองเรียงลำดับจุด n−1 จุด (ไม่นับจุดเริ่ม) ทุกแบบที่เป็นไปได้ = (n−1)! เส้นทาง. 4 เมือง → 3! = 6 เส้นทาง</div>
          </div>
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:16px;color:var(--accent)">Knapsack</div>
            <div style="font-size:12px;color:var(--muted);margin:4px 0">0/1 Knapsack</div>
            <div style="font-size:13px;color:var(--ink-2)">เลือกของใส่กระเป๋าให้ค่าสูงสุด น้ำหนักไม่เกิน</div>
            <div class="math-block" style="margin:10px 0 0"><span class="math-inline" id="eq-knapsack">$\Theta(2^n)$</span></div>
            <div style="font-size:12px;color:var(--ink-2);margin-top:8px;line-height:1.6"><strong>ทำไม 2ⁿ?</strong> ของแต่ละชิ้นมี 2 ทางเลือก — หยิบ หรือ ไม่หยิบ → 2×2×…×2 = 2ⁿ. ของ 3 ชิ้น → 8 แบบ (000…111)</div>
          </div>
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:16px;color:var(--accent)">Assignment</div>
            <div style="font-size:12px;color:var(--muted);margin:4px 0">Assignment Problem</div>
            <div style="font-size:13px;color:var(--ink-2)">จับคู่งาน-คนให้ต้นทุนต่ำสุด</div>
            <div class="math-block" style="margin:10px 0 0"><span class="math-inline" id="eq-assign">$\Theta(n!)$</span></div>
            <div style="font-size:12px;color:var(--ink-2);margin-top:8px;line-height:1.6"><strong>ทำไม n!?</strong> คนแรกเลือกได้ n งาน, คนที่สองเหลือ n−1, … → n×(n−1)×…×1 = n! วิธีจับคู่</div>
          </div>
        </div>
      </div>

      <!-- GRAPH TRAVERSAL VIZ -->
      <div class="card">
        <h3 class="card-title">Graph Traversals — DFS & BFS <span class="tag">Interactive</span></h3>
        <p class="card-lead">ท่องไปในกราฟทั้งสองแบบ: <strong>DFS</strong> ลึกก่อน (Stack) / <strong>BFS</strong> กว้างก่อน (Queue) — เห็นการทำงานของ Stack/Queue แบบเรียลไทม์</p>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body">
            <strong>กราฟ (Graph)</strong> = ชุดของ <strong>node (จุด/โหนด)</strong> เชื่อมกันด้วย <strong>edge (เส้น/ขอบ)</strong> — คิดเหมือนแผนที่จุดหมายปลายทางกับถนน. <strong>Traversal</strong> = การเดินเยี่ยมทุกจุด. <strong>ทำไม DFS ต้องใช้ Stack?</strong> Stack ทำงานแบบ "เข้าทีหลัง ออกก่อน" (LIFO) → จุดที่เพิ่งเจอถูกดันขึ้นมาอันบนสุด จึงถูกเยี่ยมก่อนเสมอ = ธรรมชาติของการ "เจาะลึกก่อน". <strong>ทำไม BFS ต้องใช้ Queue?</strong> Queue ทำงานแบบ "เข้าทีแรก ออกก่อน" (FIFO) → จุดที่เจอทั้งหมดถูกเยี่ยมตามลำดับที่พบ = "แผ่กว้างทีละชั้น"
          </div>
        </div>
        <div class="tabs" id="graphTabs">
          <button class="tab active" data-mode="dfs">DFS (Depth-First)</button>
          <button class="tab" data-mode="bfs">BFS (Breadth-First)</button>
        </div>
        <div class="viz-controls">
          <button class="btn btn-accent btn-sm" id="graphStart">▶ เริ่มท่องกราฟ</button>
          <button class="btn btn-sm" id="graphReset">↻ Reset</button>
          <span style="margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted)">เยือนแล้ว: <strong id="graphCount" style="color:var(--accent)">0</strong></span>
        </div>
<div class="graph-viz">
          <svg class="graph-svg" id="graphSvg" viewBox="0 0 600 360"></svg>
          <div class="graph-queue">
            <span id="queueLabel">Stack:</span>
            <div class="graph-queue-items" id="queueItems"></div>
          </div>
        </div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — ก่อนสอบ W3
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>Bubble / Selection / Insertion</strong>O(n²) — Brute Force sorting</div>
          <div class="mem-chip"><strong>String Matching</strong>Θ(nm) — เลื่อนทีละ 1 ช่อง</div>
          <div class="mem-chip"><strong>Closest-Pair</strong>Θ(n²) — d = √((xi−xj)²+(yi−yj)²)</div>
          <div class="mem-chip"><strong>TSP / Assignment</strong>Θ(n!) — exhaustive</div>
          <div class="mem-chip"><strong>Knapsack</strong>Θ(2ⁿ) — subset ทั้งหมด</div>
          <div class="mem-chip"><strong>DFS</strong>Stack ลึกก่อน · <strong>BFS</strong>Queue กว้างก่อน</div>
        </div>
      </div>
`;

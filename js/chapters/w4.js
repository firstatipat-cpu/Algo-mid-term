/* w4 content */

document.getElementById('w4').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">04 / 07</div>
        <h2 class="section-title">Decrease-and-Conquer</h2>
        <div class="section-meta">ลดขนาดปัญหาทีละน้อย</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">แนวคิดหลัก</h3>
        <p class="card-lead">ทำปัญหาให้มีขนาดเล็กลงเรื่อย ๆ จนแก้ได้ — แบ่งเป็น 3 กลุ่ม:</p>
        <div class="step-grid">
          <div class="step-item"><div class="step-num">Group 01</div><div class="step-text"><strong>Decrease by a Constant</strong> — ลดทีละค่าคงที่ (มักเป็น 1)</div></div>
          <div class="step-item"><div class="step-num">Group 02</div><div class="step-text"><strong>Decrease by a Constant Factor</strong> — หารด้วยค่าคงที่ (มักเป็น 2)</div></div>
          <div class="step-item"><div class="step-num">Group 03</div><div class="step-text"><strong>Variable-Size Decrease</strong> — ลดในขนาดที่ไม่คงที่</div></div>
        </div>
        <div class="callout callout-tip">
          <div class="callout-icon">i</div>
          <div class="callout-body">จำง่าย: <strong>Decrease</strong> ≠ Divide — Decrease แก้ปัญหาเพียง <strong>ซีกเดียว</strong> ส่วน Divide-and-Conquer ต้องแก้ทุกซีกแล้วรวมคำตอบ</div>
        </div>
        <div style="overflow-x:auto;margin-top:16px">
          <table class="complexity-table">
            <thead>
              <tr><th>หัวข้อในบทนี้</th><th>อยู่ในกลุ่มไหน</th><th>ทำไม</th></tr>
            </thead>
            <tbody>
              <tr><td>Insertion Sort</td><td><span class="complexity-class cc-good">Decrease by 1</span></td><td>แทรกตัวที่ i เข้ากลุ่มเรียงแล้ว n−1 ตัว → ปัญหาเล็กลงทีละ 1</td></tr>
              <tr><td>Generating Permutations</td><td><span class="complexity-class cc-good">Decrease by 1</span></td><td>ลำดับของ n ตัว สร้างจากลำดับของ n−1 ตัว (แทรกตัวที่ n เข้าไป)</td></tr>
              <tr><td>Russian Peasant</td><td><span class="complexity-class cc-fair">Decrease by Half</span></td><td>หาร m ด้วย 2 ทุกรอบ → ปัญหาเล็กลงครึ่งหนึ่ง</td></tr>
              <tr><td>Fake-Coin</td><td><span class="complexity-class cc-fair">Decrease by Half</span></td><td>ชั่งแล้วทิ้งฝั่งที่หนัก → เหลือเหรียญครึ่งเดียว</td></tr>
              <tr><td>Binary Search</td><td><span class="complexity-class cc-fair">Decrease by Half</span></td><td>ทิ้งครึ่งที่ไม่เป็นไปได้ทุกรอบ</td></tr>
              <tr><td>Josephus</td><td><span class="complexity-class cc-fair">Decrease by Half</span></td><td>ฆ่าทีละครึ่ง (ตำแหน่งคู่) จนเหลือคนเดียว</td></tr>
              <tr><td>Quickselect / Interpolation / BST / Nim</td><td><span class="complexity-class cc-bad">Variable-size</span></td><td>ขนาดลดลงจริงแต่ไม่คงที่ — ขึ้นกับ pivot/สัดส่วน/โครงสร้าง</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- BINARY SEARCH VIZ -->
      <div class="card">
        <h3 class="card-title">Binary Search <span class="tag">Interactive</span> <span class="badge-exam">ออกสอบบ่อย</span></h3>
        <p class="card-lead">ค้นหาข้อมูลที่จัดเรียงแล้ว โดยแบ่งครึ่งแล้วเทียบ — ทำซ้ำเฉพาะฝั่งที่เป็นไปได้ <span class="badge badge-primary">O(log n)</span></p>
        
        <div class="viz-controls">
          <label class="slider-row">หาค่า K = 
            <input type="number" id="bsK" value="42" style="width:70px">
          </label>
          <button class="btn btn-accent btn-sm" id="bsStep">Step →</button>
          <button class="btn btn-sm" id="bsReset">↻ Reset</button>
        </div>

        <div class="bs-viz">
          <div class="bs-array" id="bsArray"></div>
          <div class="bs-status" id="bsStatus">กด <strong>Step</strong> เพื่อเริ่มการค้นหา</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Binary Search — อธิบายทีละขั้น</h3>
        <p class="card-lead">สมมติค้นหา <strong>K = 42</strong> ในอาร์เรย์ <span class="trace-code">[3, 7, 12, 18, 24, 31, 42, 56, 64, 73, 88, 95]</span></p>
        <div class="step-trace">
          <div class="step-trace-head">▶ ขั้นตอนทำงานของ Binary Search</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>กำหนดขอบ</strong> — ตั้ง l = 0, r = n−1 แล้วหา <span class="trace-code">mid = ⌊(l+r)/2⌋</span></div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>เทียบ</strong> — ถ้า <span class="trace-code">A[mid] = K</span> → เจอแล้ว คืนตำแหน่ง mid</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div><strong>ขยับซ้าย</strong> — ถ้า <span class="trace-code">A[mid] &gt; K</span> → K อยู่ฝั่งซ้าย ตั้ง <span class="trace-code">r = mid−1</span> ทิ้งครึ่งขวา</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div><strong>ขยับขวา</strong> — ถ้า <span class="trace-code">A[mid] &lt; K</span> → K อยู่ฝั่งขวา ตั้ง <span class="trace-code">l = mid+1</span> ทิ้งครึ่งซ้าย</div></div>
            <div class="trace-row"><div class="trace-step">5</div><div><strong>ทำซ้ำ</strong> — กลับไป Step 1 จนกว่าจะเจอ หรือ <span class="trace-code">l &gt; r</span> → ไม่เจอ</div></div>
          </div>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body"><strong>ทำไมต้องมีข้อมูลที่เรียงแล้ว?</strong> เพราะถ้าอาร์เรย์เรียงจากน้อยไปมาก แล้ว A[mid] &gt; K — ทุกตัวทางขวาของ mid ยิ่งใหญ่กว่า A[mid] อีก → K <em>ไม่มีทาง</em> อยู่ฝั่งขวา → ทิ้งครึ่งขวาได้อย่างปลอดภัย. ถ้าไม่เรียง "ทิ้งครึ่ง" คือการเสี่ยงเดา ไม่ใช่การค้นหา</div>
        </div>
        <div class="step-trace" style="margin-top:12px">
          <div class="step-trace-head">▶ ที่มาของ log₂n — "แต่ละรอบตัดครึ่ง ต้องตัดกี่รอบ?"</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>รอบ 1: เหลือ n/2 ตัว · รอบ 2: เหลือ n/4 · รอบ 3: เหลือ n/8 …</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>ถามว่า "หาร 2 ไปเรื่อยๆ กี่ครั้งถึงเหลือ 1?" → คำตอบคือ log₂n (เช่น 8→4→2→1 = 3 รอบ = log₂8)</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>เขียนเป็น recurrence: T(n) = T(n/2) + O(1) — ทำงาน O(1) แล้วเหลือปัญหาครึ่งเดียว → แก้แบบ backward substitution ได้ <strong>O(log n)</strong></div></div>
          </div>
        </div>
        <div class="step-trace" style="margin-top:12px">
          <div class="step-trace-head">▶ เมื่อค้นหา K ที่ "ไม่มีในอาร์เรย์" (เช่น K=50 ในตัวอย่าง)</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>A[mid]=42 &lt; 50 → ไปขวา: l=7 (ขอบซ้ายเลย 42)</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>A[mid]=73 &gt; 50 → ไปซ้าย: r=6 · แต่ตอนนี้ l=7 &gt; r=6 → <strong>l &gt; r</strong></div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>สรุป: ไม่เจอ → return −1 — นี่คือเงื่อนไขจบของลูปที่เรียกว่า l &gt; r</div></div>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="card-title">Insertion Sort <span class="badge badge-primary">O(n²)</span></h3>
          <p class="card-lead">ค่อย ๆ หยิบข้อมูลมาแทรกในตำแหน่งที่ถูกต้องในกลุ่มที่เรียงแล้ว</p>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
            <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">InsertionSort</span>(A[0..n-1])
<span class="tok-key">for</span> i <span class="tok-op">←</span> <span class="tok-num">1</span> <span class="tok-key">to</span> n-<span class="tok-num">1</span> <span class="tok-key">do</span>
    v <span class="tok-op">←</span> A[i]
    j <span class="tok-op">←</span> i-<span class="tok-num">1</span>
    <span class="tok-key">while</span> j <span class="tok-op">≥</span> <span class="tok-num">0</span> <span class="tok-key">and</span> A[j] <span class="tok-op">&gt;</span> v <span class="tok-key">do</span>
        A[j+<span class="tok-num">1</span>] <span class="tok-op">←</span> A[j]
        j <span class="tok-op">←</span> j-<span class="tok-num">1</span>
    A[j+<span class="tok-num">1</span>] <span class="tok-op">←</span> v</pre></div>
          </div>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
            <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">insertion_sort</span>(A):
    <span class="tok-key">for</span> i <span class="tok-key">in</span> range(<span class="tok-num">1</span>, len(A)):
        v <span class="tok-op">=</span> A[i]
        j <span class="tok-op">=</span> i <span class="tok-op">-</span> <span class="tok-num">1</span>
        <span class="tok-key">while</span> j <span class="tok-op">&gt;=</span> <span class="tok-num">0</span> <span class="tok-key">and</span> A[j] <span class="tok-op">&gt;</span> v:
            A[j + <span class="tok-num">1</span>] <span class="tok-op">=</span> A[j]
            j <span class="tok-op">-=</span> <span class="tok-num">1</span>
        A[j + <span class="tok-num">1</span>] <span class="tok-op">=</span> v</pre></div>
          </div>
        </div>
        <div class="card">
          <h3 class="card-title">Insertion Sort — อธิบายทีละขั้น</h3>
          <p class="card-lead">สมมติเรียง <span class="trace-code">[5, 2, 4, 1]</span> ตัวที่ทำอยู่ <strong>ตัวหนา</strong></p>
          <div class="step-trace">
            <div class="step-trace-head">▶ ลองทำตาม</div>
            <div class="step-trace-body">
              <div class="trace-row"><div class="trace-step">1</div><div>เริ่ม <span class="trace-code">i=1</span> (ค่า <strong>2</strong>) → เลื่อน 5 ไปทางขวา → วาง 2 ข้างหน้า</div></div>
              <div class="trace-row"><div class="trace-step">2</div><div>ผลลัพธ์: <span class="trace-code">[2, 5, 4, 1]</span> — 2 ตัวแรกเรียงแล้ว</div></div>
              <div class="trace-row"><div class="trace-step">3</div><div><span class="trace-code">i=2</span> (ค่า <strong>4</strong>) → 5 &gt; 4 เลื่อน 5 → แทรก 4 ระหว่าง 2 กับ 5</div></div>
              <div class="trace-row"><div class="trace-step">4</div><div>ผลลัพธ์: <span class="trace-code">[2, 4, 5, 1]</span></div></div>
              <div class="trace-row"><div class="trace-step">5</div><div><span class="trace-code">i=3</span> (ค่า <strong>1</strong>) → เลื่อน 5, 4, 2 ไปขวาหมด → วาง 1 ต้นสุดท้าย</div></div>
              <div class="trace-row"><div class="trace-step">6</div><div>เสร็จ: <span class="trace-code">[1, 2, 4, 5]</span> 🎉</div></div>
            </div>
          </div>
          <div class="callout callout-tip">
            <div class="callout-icon">i</div>
            <div class="callout-body"><strong>จำ:</strong> Worst-case (ข้อมูลเรียงกลับด้าน) = Σ i = n(n+1)/2 ≈ <strong>O(n²)</strong> แต่ถ้าเรียงอยู่แล้ว = O(n)</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Generating Permutations</h3>
        <p class="card-lead">สร้างลำดับสับเปลี่ยนทั้งหมดด้วย 2 วิธี</p>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body"><strong>Permutation (การเรียงสับเปลี่ยน)</strong> = ลำดับที่จัดสับตำแหน่งของสมาชิก — เช่น ของ {1,2,3} มี 3! = 6 ลำดับ: <span class="trace-code">123, 132, 213, 231, 312, 321</span>. ตอน TSP ใน W3 เรา "ลองทุกเส้นทาง" = ลองทุก permutation ของเมืองนั่นเอง</div>
        </div>
        <div class="grid-2">
          <div>
            <div class="step-trace">
              <div class="step-trace-head">Johnson-Trotter (ตัวอย่าง n=3)</div>
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div>เริ่ม <span class="trace-code">1← 2← 3←</span> — <strong>mobile</strong> = "ตัวที่เดินได้": ตัวที่ลูกศรชี้ไปหาค่าที่เล็กกว่าตัวเอง → 2 (ชี้ไป 1), 3 (ชี้ไป 2) → เลือก mobile ตัวใหญ่สุด = <strong>3</strong></div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>สลับ 3 กับตัวที่ชี้ (2) → <span class="trace-code">1← 3← 2←</span> · กลับลูกศรของตัวที่ใหญ่กว่า 3 (ไม่มี)</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>mobile: 1? (ชี้ไปตัวเอง ไม่ได้) · 3 (ชี้ไป 1 ตัวเล็ก) → สลับ 3 กับ 1 → <span class="trace-code">3← 1← 2←</span></div></div>
                <div class="trace-row"><div class="trace-step">4</div><div>ได้ลำดับ: 123 → 132 → 312 → … ต่อแบบนี้จนครบ 6 ลำดับ</div></div>
              </div>
            </div>
          </div>
          <div>
            <div class="step-trace">
              <div class="step-trace-head">Lexicographic Order (ตัวอย่าง n=3)</div>
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div>เริ่ม <span class="trace-code">123</span> → หา i ตัวท้ายสุดที่ a[i] &lt; a[i+1]: 1&lt;2 ✓, 2&lt;3 ✓ → i = 1 (ค่า 2)</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>หา j มากสุดที่ a[j] &gt; a[i]: j=2 (ค่า 3 &gt; 2) → สลับ → <span class="trace-code">132</span></div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>132 → i=0 (1&lt;3) → j=1 (3&gt;1) สลับ → <span class="trace-code">312</span> → reverse ส่วนหลัง → <span class="trace-code">213</span></div></div>
                <div class="trace-row"><div class="trace-step">4</div><div>ลำดับ: 123 → 132 → 213 → 231 → 312 → 321 — เรียงตามพจนานุกรม</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python — lexicographic (next permutation)</div></div>
          <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">next_perm</span>(a):
    n <span class="tok-op">=</span> len(a)
    i <span class="tok-op">=</span> n <span class="tok-op">-</span> <span class="tok-num">2</span>
    <span class="tok-key">while</span> i <span class="tok-op">&gt;=</span> <span class="tok-num">0</span> <span class="tok-key">and</span> a[i] <span class="tok-op">&gt;=</span> a[i+<span class="tok-num">1</span>]:
        i <span class="tok-op">-=</span> <span class="tok-num">1</span>
    <span class="tok-key">if</span> i <span class="tok-op">&lt;</span> <span class="tok-num">0</span>: <span class="tok-key">return</span> <span class="tok-key">None</span>   <span class="tok-com"># หมดแล้ว</span>
    j <span class="tok-op">=</span> n <span class="tok-op">-</span> <span class="tok-num">1</span>
    <span class="tok-key">while</span> a[j] <span class="tok-op">&lt;=</span> a[i]:
        j <span class="tok-op">-=</span> <span class="tok-num">1</span>
    a[i], a[j] <span class="tok-op">=</span> a[j], a[i]
    a[i+<span class="tok-num">1</span>:] <span class="tok-op">=</span> reversed(a[i+<span class="tok-num">1</span>:])
    <span class="tok-key">return</span> a</pre></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Decrease by a Constant Factor — ตัวอย่าง</h3>
        <div class="grid-3">
          <div style="padding:16px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:15px;color:var(--accent)">Fake-Coin</div>
            <div style="font-size:13px;color:var(--ink-2);margin-top:4px">หาเหรียญปลอมด้วยตาชั่งสมดุล แบ่ง 2 กองเท่ากัน</div>
            <div class="step-trace" style="margin-top:10px">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div>แบ่ง 9 เหรียญเป็น 2 กองๆ ละ 4 + เหลือ 1</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>ชั่งกองซ้าย-ขวา: ฝั่งเบากว่า → เหรียญปลอมอยู่กองนั้น (เสมอกัน → ตัวที่เหลือคือปลอม)</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>ทิ้งฝั่งหนัก → เหลือ 4 เหรียญ → แบ่ง 2+2 ชั่ง → เหลือ 2 → ชั่ง 1+1 จบ</div></div>
                <div class="trace-row"><div class="trace-step">4</div><div>ชั่ง ⌈log₂9⌉ = <strong>4 ครั้ง</strong> — ใช้ได้เมื่อรู้ว่าเหรียญปลอม"เบากว่า"</div></div>
              </div>
            </div>
          </div>
          <div style="padding:16px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:15px;color:var(--accent)">Russian Peasant</div>
            <div style="font-size:13px;color:var(--ink-2);margin-top:4px">คูณเลขโดยหาร 2 (ปัดเศษ) และคูณ 2 สลับกันไป</div>
            <div class="step-trace" style="margin-top:10px">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div><span class="trace-code">45</span> คี่ → +13 · <span class="trace-code">22</span> คู่ → ข้าม · <span class="trace-code">11</span> คี่ → +52</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div><span class="trace-code">5</span> คี่ → +104 · <span class="trace-code">2</span> คู่ → ข้าม · <span class="trace-code">1</span> คี่ → +416</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>รวมเฉพาะแถวที่ m คี่: 13+52+104+416 = <strong>585</strong> = 45×13 ✓</div></div>
                <div class="trace-row"><div class="trace-step">4</div><div><strong>ทำไม?</strong> 45 ในเลขฐานสอง = 101101 → แต่ละ "1 บิต" หมายถึงเอา n ที่คูณ 2 ไปแล้วมารวม</div></div>
              </div>
            </div>
          </div>
          <div style="padding:16px;background:var(--bg-alt);border-radius:12px">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:15px;color:var(--accent)">Josephus</div>
            <div style="font-size:13px;color:var(--ink-2);margin-top:4px">วงกลมฆ่าคนตำแหน่งคู่ คนรอดคำนวณด้วยสูตร</div>
            <div class="step-trace" style="margin-top:10px">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div><strong>ทำไมต้องรู้ 2ᵏ?</strong> 2ᵏ คือ "กำลังของ 2 ที่มากที่สุดที่ ≤ n" เช่น n=9 → 2³=8</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>สูตร J(n)=2(n−2ᵏ)+1: n−2ᵏ = 1 → J(9) = 2(1)+1 = <strong>3</strong></div></div>
                <div class="trace-row"><div class="trace-step">3</div><div><strong>หลักการ:</strong> รอบแรกฆ่าตำแหน่งคู่หมด → เหลือ n/2 → เกมเริ่มใหม่โดยเลื่อนหมายเลข → ตรงกับ recurrence J(2n)=2J(n)−1</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python — Russian Peasant (คูณ 45 × 13)</div></div>
          <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">russian_peasant</span>(m, n):
    result <span class="tok-op">=</span> <span class="tok-num">0</span>
    <span class="tok-key">while</span> m <span class="tok-op">&gt;</span> <span class="tok-num">0</span>:
        <span class="tok-key">if</span> m <span class="tok-op">%</span> <span class="tok-num">2</span> <span class="tok-op">==</span> <span class="tok-num">1</span>:       <span class="tok-com"># m เป็นคี่ → เอา n ไปรวม</span>
            result <span class="tok-op">+=</span> n
        m <span class="tok-op">//=</span> <span class="tok-num">2</span>               <span class="tok-com"># m หาร 2</span>
        n <span class="tok-op">*=</span> <span class="tok-num">2</span>                 <span class="tok-com"># n คูณ 2</span>
    <span class="tok-key">return</span> result</pre></div>
        </div>
      </div>

      <!-- JOSEPHUS CALCULATOR -->
      <div class="card">
        <h3 class="card-title">Josephus Calculator <span class="tag">Interactive</span> <span class="badge-exam">ออกสอบบ่อย</span></h3>
        <p class="card-lead">ใส่จำนวนคน n → ดูผู้รอดชีวิตตามสูตร J(n) = 2·(n − 2<sup>⌊log₂n⌋</sup>) + 1</p>
        <div class="viz-controls">
          <label class="slider-row">n = 
            <input type="number" id="josN" value="9" min="1" max="50" style="width:70px">
          </label>
          <button class="btn btn-accent btn-sm" id="josRun">คำนวณ →</button>
        </div>
        <div id="josResult" style="margin-top:10px;font-size:14px;color:var(--ink-2);line-height:1.8">ใส่ค่า n แล้วกด <strong>คำนวณ</strong></div>
        <div style="margin-top:12px;text-align:center">
          <svg viewBox="0 0 300 178" style="max-width:340px;width:100%">
            <g stroke="var(--line)" stroke-width="1.5" fill="none">
              <circle cx="150" cy="95" r="70" stroke-dasharray="3 3"/>
            </g>
            <text x="150" y="14" text-anchor="middle" font-size="12" font-family="Space Grotesk" fill="var(--muted)">นับ 1 → ฆ่าเลขคู่ 2,4,6,8 …</text>
            <g font-size="12" font-family="JetBrains Mono" font-weight="bold">
              <circle cx="150" cy="25" r="13" fill="var(--accent)"/><text x="150" y="30" text-anchor="middle" fill="#fff">1</text>
              <circle cx="195" cy="41" r="13" fill="#FECACA"/><text x="195" y="46" text-anchor="middle" fill="#991B1B">2✕</text>
              <circle cx="219" cy="83" r="13" fill="#FEF3C7"/><text x="219" y="88" text-anchor="middle" fill="#92400E">3</text>
              <circle cx="211" cy="130" r="13" fill="#FECACA"/><text x="211" y="135" text-anchor="middle" fill="#991B1B">4✕</text>
              <circle cx="174" cy="161" r="13" fill="var(--primary)"/><text x="174" y="166" text-anchor="middle" fill="#fff">5</text>
              <circle cx="126" cy="161" r="13" fill="#FECACA"/><text x="126" y="166" text-anchor="middle" fill="#991B1B">6✕</text>
              <circle cx="89" cy="130" r="13" fill="var(--primary)"/><text x="89" y="135" text-anchor="middle" fill="#fff">7</text>
              <circle cx="81" cy="83" r="13" fill="#FECACA"/><text x="81" y="88" text-anchor="middle" fill="#991B1B">8✕</text>
              <circle cx="105" cy="41" r="13" fill="var(--primary)"/><text x="105" y="46" text-anchor="middle" fill="#fff">9</text>
            </g>
            <text x="150" y="174" text-anchor="middle" font-size="10" fill="var(--muted)">ตัวอย่าง n=9 → ตัวที่ 3 รอด  (J(9) = 2(9−8)+1 = 3)</text>
          </svg>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Variable-Size Decrease</h3>
        <div class="grid-2">
          <div>
            <div class="tag-row"><span class="badge badge-accent">Quickselect</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">หาค่ามัธยฐานหรือลำดับที่ k โดยใช้ Partition แบบเดียวกับ Quicksort แต่ทำต่อแค่ซีกเดียว</p>
            <div class="step-trace">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div><strong>Partition</strong> = เลือก pivot แล้วจัดให้ตัวเล็กกว่าอยู่ซ้าย ตัวใหญ่กว่าอยู่ขวา (เช่น pivot=5 ใน [7,1,5,3,9] → [1,3]<strong>5</strong>[7,9])</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>pivot อยู่ตำแหน่งที่ 2 → ถ้าต้องการ k=3 → เดินเข้าไปเฉพาะซีกขวา (ละซ้ายไปเลย)</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>งานรวม = n + n/2 + n/4 + … = 2n → <strong>Θ(n)</strong> โดยเฉลี่ย</div></div>
              </div>
            </div>
            <div class="math-block" style="margin-top:8px"><span class="math-inline" id="eq-quickselect">$T_{avg}(n) = \Theta(n)$</span></div>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-accent">Interpolation Search</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">ค้นหาแบบเทียบสัดส่วน (คล้ายเปิดสมุดหน้าเหลือง)</p>
            <div class="step-trace">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div>Binary Search เดา "กลางเสมอ" แต่ Interpolation เดา "ตามสัดส่วน" — ถ้าอาร์เรย์ 0..100 กับค่า 90 → เดาตรงช่วงปลาย</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>pos = l + (K−A[l])·(r−l)/(A[r]−A[l]) — เลื่อนตามสัดส่วนตำแหน่งของ K</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>ได้ <strong>O(log log n)</strong> เมื่อข้อมูลกระจายสม่ำเสมอ — ดีกว่า binary search ที่ O(log n)</div></div>
              </div>
            </div>
            <div class="math-block" style="margin-top:8px"><span class="math-inline" id="eq-interp">$T_{avg}(n) = O(\log \log n)$</span></div>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-accent">BST Search/Insert</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">ต้นไม้ที่โหนดซ้ายน้อยกว่า ขวามากกว่า — ขนาดลดตามโครงสร้าง</p>
            <div class="step-trace">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div><strong>BST</strong> = ต้นไม้ที่ทุกโหนด: ลูกซ้ายมีค่าน้อยกว่า, ลูกขวามีค่ามากกว่า → ค้นหาโดยเลื่อนลงทีละชั้นตามทิศทาง</div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>หาค่า 40 ใน root=30: 40&gt;30 → ไปขวา · 40&lt;55 → ไปซ้าย · เจอ 40. แต่ละชั้นกำจัด "ทั้งกิ่ง" ที่เป็นไปไม่ได้</div></div>
                <div class="trace-row"><div class="trace-step">3</div><div>สมดุลดี → O(log n) · ไม่สมดุล (เพิ่มแบบเรียงลำดับ) → กลายเป็นลิสต์ O(n)</div></div>
              </div>
            </div>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-accent">Game of Nim</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">เกมหยิบก้อนหิน ผู้หยิบก้อนสุดท้ายเป็นผู้ชนะ — มีกลยุทธ์ชนะ</p>
            <div class="step-trace">
              <div class="step-trace-body">
                <div class="trace-row"><div class="trace-step">1</div><div>กลยุทธ์ชนะ: ทำให้ XOR ของทุกกอง = 0 (เช่น กอง 1,2,3 → 1⊕2⊕3 = 0 → ผู้เล่นนั้นชนะ)</div></div>
                <div class="trace-row"><div class="trace-step">1.5</div><div><strong>⊕ (XOR) = "ต่างกันได้ 1"</strong> — เปรียบเทียบเลขฐานสองทีละบิต: บิตที่ต่างกันให้ 1, เหมือนกันให้ 0 เช่น 1⊕2 = 01⊕10 = <strong>11 = 3</strong></div></div>
                <div class="trace-row"><div class="trace-step">2</div><div>เป็น Variable-size เพราะแต่ละเทิร์นขนาดของ "เกมย่อย" ลดลงตามจำนวนที่หยิบ (ไม่คงที่)</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — ก่อนสอบ W4
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>Insertion Sort</strong>Θ(n²) worst · O(n) best (เรียงแล้ว)</div>
          <div class="mem-chip"><strong>Binary Search</strong>O(log n) · ใช้กับข้อมูลที่เรียงแล้ว</div>
          <div class="mem-chip"><strong>Josephus</strong>J(n) = 2l + 1 โดย n = 2<sup>k</sup> + l</div>
          <div class="mem-chip"><strong>Quickselect</strong>T_avg = Θ(n) · T_worst = Θ(n²)</div>
          <div class="mem-chip"><strong>Interpolation</strong>O(log log n) · คล้าย binary search</div>
          <div class="mem-chip"><strong>Nim / BST</strong>ลดแบบ Variable-size · ใช้กลยุทธ์/โครงสร้าง</div>
        </div>
      </div>
`;
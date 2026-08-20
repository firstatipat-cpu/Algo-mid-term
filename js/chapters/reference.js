/* reference content */

document.getElementById('reference').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">Cheat Sheet</div>
        <h2 class="section-title">สรุปเชิงกราฟ</h2>
        <div class="section-meta">เปรียบเทียบทุกอย่างในมุมมองเดียว</div>
      </div>

      <div class="card">
        <h3 class="card-title">Glossary — พจนานุกรมศัพท์ที่ต้องรู้</h3>
        <table class="complexity-table">
          <thead><tr><th>ศัพท์</th><th>แปลง่าย ๆ</th></tr></thead>
          <tbody>
            <tr><td>Algorithm</td><td>ขั้นตอนการแก้ปัญหาที่ชัดเจนและจบได้</td></tr>
            <tr><td>Pseudocode</td><td>"สูตรอาหารกึ่งโค้ด" — บรรยายขั้นตอนไม่ต้องรันได้จริง</td></tr>
            <tr><td>Array</td><td>ช่องเก็บข้อมูลเรียงกัน เรียกช่อง i ว่า a[i] (เริ่ม 0)</td></tr>
            <tr><td>Index</td><td>หมายเลขช่องของ array (a[0] คือช่องแรก)</td></tr>
            <tr><td>Basic Operation</td><td>การทำงานหลักที่ใช้นับครั้ง เช่น เปรียบเทียบ บวก</td></tr>
            <tr><td>worst / best / average case</td><td>กรณีแย่สุด / ดีสุด / เฉลี่ยของเวลาทำงาน</td></tr>
            <tr><td>Recursion / Recurrence</td><td>เรียกตัวเองซ้ำ / สมการเวลาที่อ้างปัญหาย่อย</td></tr>
            <tr><td>Partition / Pivot</td><td>แบ่ง array ตามค่ากลาง (pivot) ให้ฝั่งน้อย/มาก</td></tr>
            <tr><td>Collision</td><td>key ต่างกันได้ช่อง hash เดียวกัน</td></tr>
            <tr><td>Load factor (α)</td><td>จำนวนข้อมูล / ขนาดตาราง hash — ยิ่งสูงยิ่งชน</td></tr>
            <tr><td>LIFO / FIFO</td><td>เข้าทีหลังออกก่อน (Stack) / เข้าก่อนออกก่อน (Queue)</td></tr>
            <tr><td>Vertex / Edge</td><td>จุด / เส้นเชื่อมในกราฟ</td></tr>
            <tr><td>Stable sort</td><td>ข้อมูลค่าเท่ากันรักษาลำดับเดิมไว้</td></tr>
            <tr><td>Basic Op. ↔ Complexity</td><td>C(n) = จำนวน basic op → T(n) ≈ c_op × C(n)</td></tr>
            <tr><td>Big-O / Ω / Θ</td><td>O = ขอบบน (≤) · Ω = ขอบล่าง (≥) · Θ = ทั้งสอง (≈) ของเวลาทำงาน</td></tr>
            <tr><td>Master Theorem</td><td>T(n)=aT(n/b)+f(n) แก้ recurrence แบบ divide-and-conquer 3 กรณี</td></tr>
            <tr><td>Heap</td><td>ต้นไม้ไบนารีสมบูรณ์ที่ทุกโหนด ≥ ลูก (max-heap)</td></tr>
            <tr><td>Sentinel</td><td>ค่าตั้งไว้ปลาย array เพื่อเลี่ยงเช็คขอบในลูป</td></tr>
            <tr><td>Convex Hull</td><td>polygon นูนที่ครอบจุดทั้งหมด — ขอบ = เส้นที่ทุกจุดอื่นอยู่ข้างเดียวกัน</td></tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <h3 class="card-title">แผนผังเทคนิคการออกแบบอัลกอริทึม</h3>
        <div style="font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.9;color:var(--ink-2);background:var(--bg-alt);padding:20px;border-radius:12px;overflow-x:auto">
<pre style="margin:0">
Algorithm Design Techniques
├── Brute Force ................ ตรงไปตรงมา → O(n²), O(n!)
├── Decrease-and-Conquer ....... ลดขนาดทีละน้อย
│   ├── by Constant (1) ........ Insertion Sort, Permutations
│   ├── by Constant Factor (2) . Binary Search, Fake-Coin, Josephus
│   └── Variable Size .......... Quickselect, BST, Interpolation
├── Divide-and-Conquer ......... แบ่ง → พิชิต → รวม
│   ├── Mergesort .............. O(n log n) แบ่งครึ่ง + Merge
│   ├── Quicksort .............. O(n log n) avg, O(n²) worst
│   ├── Strassen Matrix ........ O(n^2.807)
│   └── Closest-Pair / Quickhull
├── Transform-and-Conquer ...... แปลงปัญหา
│   ├── Instance Simplification  Presorting, Gaussian
│   ├── Representation Change ... AVL, Heap, Horner
│   └── Problem Reduction ....... LCM via GCD, Graph
└── Space-Time Trade-Off ....... แลก Space → Time
    ├── Input Enhancement ...... Counting Sort, Horspool, Boyer-Moore
    └── Prestructuring ......... Hashing, B-Trees
</pre>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="card-title">สูตรสำคัญทั้งหมด</h3>
          <div class="math-block"><span class="math-inline" id="ref-f1">$T(n) \approx c_{op} \cdot C(n)$</span></div>
          <div class="math-block"><span class="math-inline" id="ref-f2">$T(n) = a \cdot T(n/b) + f(n)$</span></div>
          <div class="math-block"><span class="math-inline" id="ref-f3">$lcm(m,n) = \frac{m \cdot n}{gcd(m,n)}$</span></div>
          <div class="math-block"><span class="math-inline" id="ref-f4">$J(n) = 2(n - 2^{\lfloor \log_2 n \rfloor}) + 1$</span></div>
          <div class="math-block"><span class="math-inline" id="ref-f5">$\Theta(n^{\log_2 7}) \approx \Theta(n^{2.807})$</span></div>
        </div>
        <div class="card">
          <h3 class="card-title">ความซับซ้อนแบ่งตาม Class</h3>
          <table class="complexity-table">
            <thead><tr><th>Class</th><th>ตัวอย่าง</th><th>n=10</th><th>n=100</th></tr></thead>
            <tbody>
              <tr><td><span class="complexity-class cc-excellent">O(1)</span></td><td>Hash lookup</td><td>1</td><td>1</td></tr>
              <tr><td><span class="complexity-class cc-excellent">O(log n)</span></td><td>Binary search</td><td>3</td><td>7</td></tr>
              <tr><td><span class="complexity-class cc-good">O(n)</span></td><td>Sequential search</td><td>10</td><td>100</td></tr>
              <tr><td><span class="complexity-class cc-fair">O(n log n)</span></td><td>Merge sort</td><td>33</td><td>664</td></tr>
              <tr><td><span class="complexity-class cc-bad">O(n²)</span></td><td>Bubble sort</td><td>100</td><td>10K</td></tr>
              <tr><td><span class="complexity-class cc-bad">O(n³)</span></td><td>Matrix mult.</td><td>1K</td><td>1M</td></tr>
              <tr><td><span class="complexity-class cc-bad">O(2ⁿ)</span></td><td>Knapsack</td><td>1K</td><td>∞</td></tr>
              <tr><td><span class="complexity-class cc-bad">O(n!)</span></td><td>TSP</td><td>3.6M</td><td>∞</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">คำถามสัมภาษณ์/สอบที่พบบ่อย</h3>
        <ol class="fancy-list">
          <li><strong>ต่างระหว่าง Divide กับ Decrease?</strong> — Divide แบ่งเป็นหลายปัญหาย่อยพร้อมกัน, Decrease ลดทีละขั้น</li>
          <li><strong>ทำไม Quicksort ถึง Worst case O(n²)?</strong> — เมื่อเลือก Pivot แย่ ทุกตัวไปอยู่ซีกเดียว</li>
          <li><strong>Hash table vs BST?</strong> — Hash O(1) เฉลี่ย, BST O(log n) แต่เรียงลำดับได้</li>
          <li><strong>Heapsort vs Mergesort?</strong> — Heap ใช้ Space O(1), Merge ใช้ O(n) แต่ Stable</li>
          <li><strong>Bubble vs Insertion?</strong> — ทั้งคู่ O(n²) แต่ Insertion เร็วกว่าในข้อมูลใกล้เรียงแล้ว</li>
          <li><strong>B-Tree เหมาะกับอะไร?</strong> — Database index เพราะลด I/O access</li>
          <li><strong>Horspool ต่างจาก Brute Force อย่างไร?</strong> — ใช้ Shift Table ข้ามหลายตัวได้</li>
          <li><strong>Master Theorem ใช้เมื่อไร?</strong> — วิเคราะห์ Recurrence แบบ T(n)=aT(n/b)+f(n)</li>
        </ol>
      </div>

      <div class="card">
        <h3 class="card-title">Master Theorem — 3 กรณี จับเทียบทีละบรรทัด</h3>
        <p style="font-size:13px;color:var(--ink-2);margin:8px 0">ให้ <span class="math-inline">$T(n) = a \cdot T(n/b) + f(n)$</span> → คำนวณ <code>n<sup>log<sub>b</sub>a</sup></code> เปรียบกับ f(n):</p>
        <table class="complexity-table">
          <thead><tr><th>Case</th><th>เงื่อนไข</th><th>ผลลัพธ์ Θ(...)</th><th>ตัวอย่าง</th></tr></thead>
          <tbody>
            <tr><td>Case 01</td><td>n<sup>log<sub>b</sub>a</sup> &gt; f(n)</td><td>Θ(n<sup>log<sub>b</sub>a</sup>)</td><td>T(n)=4T(n/2)+n → n<sup>log₂4</sup>=n² &gt; n → Θ(n²)</td></tr>
            <tr><td>Case 02</td><td>n<sup>log<sub>b</sub>a</sup> = f(n)</td><td>Θ(n<sup>log<sub>b</sub>a</sup> log n)</td><td>T(n)=2T(n/2)+n → n=n → Case 02 → Θ(n log n)</td></tr>
            <tr><td>Case 03</td><td>n<sup>log<sub>b</sub>a</sup> &lt; f(n)</td><td>Θ(f(n))</td><td>T(n)=2T(n/2)+n² → Case 03 → Θ(n²)</td></tr>
          </tbody>
        </table>
        <div class="callout callout-note"><div class="callout-icon">i</div><div class="callout-body"><strong>จำง่าย:</strong> ฝั่งไหน "ใหญ่กว่า" ชนะ — ย่อยเด่น → n^log; เท่ากัน → คูณ log; รวมเด่น → f(n)</div></div>
      </div>

      <div class="card">
        <h3 class="card-title">ตาราง Big-O รวมทุกอัลกอริทึม (หน้าสุดท้ายก่อนเข้าห้องสอบ)</h3>
        <div style="overflow-x:auto">
        <table class="complexity-table">
          <thead><tr><th>อัลกอริทึม</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>เทคนิค</th></tr></thead>
          <tbody>
            <tr><td>Sequential Search</td><td>O(1)</td><td>O(n)</td><td>O(n)</td><td>O(1)</td><td>Brute</td></tr>
            <tr><td>Binary Search</td><td>O(1)</td><td>O(log n)</td><td>O(log n)</td><td>O(1)</td><td>Decrease (÷2)</td></tr>
            <tr><td>Bubble Sort</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Brute</td></tr>
            <tr><td>Selection Sort</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Brute</td></tr>
            <tr><td>Insertion Sort</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Decrease (−1)</td></tr>
            <tr><td>Mergesort</td><td>Θ(n log n)</td><td>Θ(n log n)</td><td>Θ(n log n)</td><td>O(n)</td><td>Divide</td></tr>
            <tr><td>Quicksort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>Divide</td></tr>
            <tr><td>Heapsort</td><td>Θ(n log n)</td><td>Θ(n log n)</td><td>Θ(n log n)</td><td>O(1)</td><td>Transform</td></tr>
            <tr><td>Counting Sort</td><td>Θ(n+k)</td><td>Θ(n+k)</td><td>Θ(n+k)</td><td>O(n+k)</td><td>Space-Time</td></tr>
            <tr><td>Comparison Counting Sort</td><td>Θ(n²)</td><td>Θ(n²)</td><td>Θ(n²)</td><td>O(n)</td><td>Space-Time</td></tr>
            <tr><td>Strassen Matrix</td><td>—</td><td>Θ(n^2.807)</td><td>Θ(n^2.807)</td><td>O(n²)</td><td>Divide</td></tr>
            <tr><td>Euclid GCD</td><td>Θ(log n)</td><td>—</td><td>Θ(log n)</td><td>O(1)</td><td>Decrease</td></tr>
            <tr><td>Sieve (prime ≤ n)</td><td>—</td><td>—</td><td>Θ(n log log n)</td><td>O(n)</td><td>Brute-ish</td></tr>
            <tr><td>TSP (exhaustive)</td><td>—</td><td>O(n!)</td><td>O(n!)</td><td>O(n)</td><td>Brute</td></tr>
            <tr><td>Knapsack (subset)</td><td>—</td><td>O(2ⁿ)</td><td>O(2ⁿ)</td><td>O(n)</td><td>Brute</td></tr>
            <tr><td>Assignment (exhaustive)</td><td>—</td><td>O(n!)</td><td>O(n!)</td><td>O(n²)</td><td>Brute</td></tr>
            <tr><td>Closest-Pair</td><td>—</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Brute</td></tr>
            <tr><td>Convex Hull (brute)</td><td>—</td><td>O(n³)</td><td>O(n³)</td><td>O(n)</td><td>Brute</td></tr>
            <tr><td>DFS / BFS</td><td>—</td><td>Θ(V+E)</td><td>Θ(V+E)</td><td>O(V)</td><td>Search</td></tr>
            <tr><td>Horspool / Boyer-Moore</td><td>O(n)</td><td>O(n)</td><td>O(nm)</td><td>O(m)</td><td>Space-Time</td></tr>
            <tr><td>BST Search</td><td>O(1)</td><td>O(log n)</td><td>O(n)</td><td>O(1)</td><td>Variable-size</td></tr>
            <tr><td>Hash (chaining)</td><td>O(1)</td><td>O(1)</td><td>O(n)</td><td>O(n)</td><td>Space-Time</td></tr>
            <tr><td>Gaussian</td><td>—</td><td>Θ(n³)</td><td>Θ(n³)</td><td>O(n²)</td><td>Transform</td></tr>
            <tr><td>Horner</td><td>Θ(n)</td><td>Θ(n)</td><td>Θ(n)</td><td>O(1)</td><td>Transform</td></tr>
          </tbody>
        </table>
        </div>
        <div class="callout callout-note"><div class="callout-icon">i</div><div class="callout-body"><strong>ใช้ยังไง:</strong> จำแถวที่ออกสอบบ่อย — Merge Θ(n log n) ทุกกรณี · Quick O(n log n) แต่ worst O(n²) · Insertion best O(n) ข้อมูลใกล้เรียง · Hash O(1) เฉลี่ย · BST worst O(n) ถ้าข้อมูลเรียงเข้าแบบไม่สมดุล</div></div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          Cheat Sheet ใจ — 7 สัปดาห์ในหน้าเดียว
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>W1 · Intro</strong>Euclid · Sieve · สมบัติอัลกอริทึม</div>
          <div class="mem-chip"><strong>W2 · Efficiency</strong>O/Ω/Θ · Basic Op · Recurrence</div>
          <div class="mem-chip"><strong>W3 · Brute Force</strong>Sequential · Bubble O(n²) · Exhaustive 2ⁿ/n!</div>
          <div class="mem-chip"><strong>W4 · Decrease</strong>Insertion O(n²) · BST O(h) · Josephus J(n)=2l+1 · Quickselect</div>
          <div class="mem-chip"><strong>W5 · Divide</strong>Merge/Quick O(n log n) · Master Th. · Strassen n^2.807</div>
          <div class="mem-chip"><strong>W6 · Transform</strong>Presort O(n log n) · Gaussian O(n³) · Horner</div>
          <div class="mem-chip"><strong>W7 · Trade-off</strong>Counting O(n) · Horspool · Hash O(1) · B-Tree</div>
        </div>
      </div>
`;

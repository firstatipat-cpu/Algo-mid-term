/* w5 content */

document.getElementById('w5').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">05 / 07</div>
        <h2 class="section-title">Divide-and-Conquer</h2>
        <div class="section-meta">แบ่ง · พิชิต · รวม</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">แนวคิดหลัก — 3 ขั้นตอน</h3>
        <div class="step-grid">
          <div class="step-item"><div class="step-num">Step 01 · Divide</div><div class="step-text">แบ่งปัญหาออกเป็นปัญหาย่อย (Subproblems) ชนิดเดียวกันที่ขนาดเท่า ๆ กัน</div></div>
          <div class="step-item"><div class="step-num">Step 02 · Conquer</div><div class="step-text">แก้ปัญหาย่อยแต่ละปัญหา (มักเป็นแบบ Recursive)</div></div>
          <div class="step-item"><div class="step-num">Step 03 · Combine</div><div class="step-text">นำคำตอบของปัญหาย่อยมารวมกันเป็นคำตอบของปัญหาเดิม</div></div>
        </div>
        <div class="formula-card">
          <div class="formula-card-label">Master Theorem Recurrence</div>
          <div class="formula-card-eq">T(n) = a·T(n/b) + f(n)</div>
        </div>
        <div class="callout callout-note" style="margin-top:12px">
          <div class="callout-icon">i</div>
          <div class="callout-body">
            <strong>อ่านสูตรยังไง?</strong> <code>T(n)</code> = เวลาที่ใช้แก้ปัญหาขนาด n · <code>a</code> = แบ่งเป็นปัญหาย่อย <strong>กี่ปัญหา</strong> · <code>b</code> = แต่ละปัญหาย่อยมีขนาด <strong>เล็กลงกี่เท่า</strong> (หาร b) · <code>f(n)</code> = ค่าใช้จ่ายในการ <strong>Divide + Combine</strong> (รวมคำตอบ). เช่น Mergesort: แบ่งเป็น 2 ปัญหาครึ่งเดียว แล้ว merge ใช้ Θ(n) → T(n) = 2T(n/2) + Θ(n). คำว่า <strong>Recurrence</strong> = สมการที่นิยาม T(n) จาก T(ปัญหาที่เล็กกว่า) — เจอครั้งแรกใน W2
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Master Theorem — วิธีใช้วิเคราะห์ Recurrence <span class="badge-exam">ออกสอบบ่อย</span></h3>
        <p class="card-lead">ให้เขียน n = b<sup>k</sup> แล้วเทียบ a<sup>k</sup> กับ f(n) ว่าฝั่งไหนเด่นกว่ากัน (a<sup>k</sup> = n<sup>log<sub>b</sub>a</sup>)</p>
        <div class="step-grid">
          <div class="step-item"><div class="step-num">Case 01 · a<sup>k</sup> &gt; f(n)</div><div class="step-text">งานส่วนใหญ่อยู่ที่แก้ปัญหาย่อย → T(n) = Θ(n<sup>log<sub>b</sub>a</sup>)</div></div>
          <div class="step-item"><div class="step-num">Case 02 · a<sup>k</sup> = f(n)</div><div class="step-text">งานทั้งสองฝั่งพอดีกัน → T(n) = Θ(n<sup>log<sub>b</sub>a</sup> log n)</div></div>
          <div class="step-item"><div class="step-num">Case 03 · a<sup>k</sup> &lt; f(n)</div><div class="step-text">งานส่วนใหญ่คือการรวม (f(n)) → T(n) = Θ(f(n))</div></div>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body"><strong>อ่านตัวแปรก่อน:</strong> T(n) = a·T(n/b) + f(n) → a = แบ่งกี่สาย · b = ปัญหาย่อยเล็กกี่เท่า · f(n) = งานรวมผล ตัวอย่าง n = 8, b = 2 → แบ่งครึ่ง 3 ครั้ง = 8 → <strong>k = log<sub>b</sub>n = log₂8 = 3</strong></div>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body">ตัวอย่าง Strassen: T(n) = 7T(n/2) + Θ(n²) → a = 7, b = 2 → a<sup>k</sup> = 7<sup>log₂n</sup> = n<sup>log₂7</sup> ≈ n<sup>2.807</sup> &gt; f(n) = n² → Case 01 → T(n) = Θ(n<sup>2.807</sup>)</div>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">?</div>
          <div class="callout-body"><strong>ทำไม 7<sup>log₂n</sup> = n<sup>log₂7</sup>?</strong> เพราะสมบัติเลขยกกำลัง <code>x<sup>log<sub>y</sub>z</sup> = z<sup>log<sub>y</sub>x</sup></code> — สลับ "ฐาน" กับ "ตัวใน log" ได้ ลองแทน n=1024: 7¹⁰ = n<sup>2.807</sup> — เลขเท่ากันครับ</div>
        </div>
      </div>

      <!-- MASTER THEOREM SOLVER -->
      <div class="card">
        <h3 class="card-title">Master Theorem Solver <span class="tag">Interactive</span></h3>
        <p class="card-lead">ใส่ค่าของสมการ <strong>T(n) = a·T(n/b) + f(n)</strong> แล้วกดวิเคราะห์ → บอก Case และผลลัพธ์ Θ</p>
        <div class="viz-controls" style="flex-wrap:wrap;gap:8px">
          <label class="slider-row">a = <input type="number" id="mtA" value="2" min="1" max="10" style="width:60px"></label>
          <label class="slider-row">b = <input type="number" id="mtB" value="2" min="2" max="10" style="width:60px"></label>
          <label class="slider-row">f(n) = <select id="mtF" style="width:120px">
            <option value="1">O(1)</option>
            <option value="n" selected>O(n)</option>
            <option value="nlogn">O(n log n)</option>
            <option value="n2">O(n²)</option>
            <option value="n3">O(n³)</option>
          </select></label>
          <button class="btn btn-accent btn-sm" id="mtRun">วิเคราะห์ →</button>
        </div>
        <div id="mtResult" style="margin-top:10px;font-size:14px;color:var(--ink-2);line-height:1.9">ตั้งค่าสมการแล้วกด <strong>วิเคราะห์</strong></div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="card-title">Mergesort <span class="badge badge-primary">O(n log n)</span></h3>
          <p class="card-lead">แบ่ง Array ออกเป็น 2 ครึ่งไปเรื่อย ๆ จนเหลือ 1 ตัว แล้วนำมาเรียงผสาน (Merge) กลับ</p>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
            <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">Mergesort</span>(A[0..n-1])
<span class="tok-key">if</span> n <span class="tok-op">&gt;</span> <span class="tok-num">1</span>
    <span class="tok-key">copy</span> A[0..⌊n/2⌋-1] <span class="tok-key">to</span> B
    <span class="tok-key">copy</span> A[⌊n/2⌋..n-1] <span class="tok-key">to</span> C
    <span class="tok-fn">Mergesort</span>(B)
    <span class="tok-fn">Mergesort</span>(C)
    <span class="tok-fn">Merge</span>(B, C, A)</pre></div>
          </div>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
            <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">merge_sort</span>(A):
    <span class="tok-key">if</span> len(A) <span class="tok-op">&lt;=</span> <span class="tok-num">1</span>:
        <span class="tok-key">return</span> A
    mid <span class="tok-op">=</span> len(A) <span class="tok-op">//</span> <span class="tok-num">2</span>
    L <span class="tok-op">=</span> <span class="tok-fn">merge_sort</span>(A[:mid])
    R <span class="tok-op">=</span> <span class="tok-fn">merge_sort</span>(A[mid:])
    <span class="tok-key">return</span> <span class="tok-fn">merge</span>(L, R)

<span class="tok-key">def</span> <span class="tok-fn">merge</span>(L, R):
    res <span class="tok-op">=</span> []; i <span class="tok-op">=</span> j <span class="tok-op">=</span> <span class="tok-num">0</span>
    <span class="tok-key">while</span> i <span class="tok-op">&lt;</span> len(L) <span class="tok-key">and</span> j <span class="tok-op">&lt;</span> len(R):
        <span class="tok-key">if</span> L[i] <span class="tok-op">&lt;=</span> R[j]:
            res.<span class="tok-fn">append</span>(L[i]); i <span class="tok-op">+=</span> <span class="tok-num">1</span>
        <span class="tok-key">else</span>:
            res.<span class="tok-fn">append</span>(R[j]); j <span class="tok-op">+=</span> <span class="tok-num">1</span>
    <span class="tok-key">return</span> res <span class="tok-op">+</span> L[i:] <span class="tok-op">+</span> R[j:]</pre></div>
          </div>
        </div>
        <div class="card">
          <h3 class="card-title">Quicksort <span class="badge badge-primary">O(n log n) avg</span></h3>
          <p class="card-lead">เลือก Pivot แล้วทำ Partition แยกข้อมูลน้อย-มาก จากนั้นเรียกตัวเองไปทำซีกซ้าย-ขวา</p>
          <div class="step-trace">
            <div class="step-trace-body">
              <div class="trace-row"><div class="trace-step">1</div><div><strong>Partition คือหัวใจของ Quicksort:</strong> เลือก pivot (เช่น ตัวแรก) แล้วจัดให้ตัว ≤ pivot อยู่ซ้าย, ตัว &gt; pivot อยู่ขวา — ทุกตัวได้ "ย้าย" ผ่าน pivot ครั้งเดียว</div></div>
              <div class="trace-row"><div class="trace-step">2</div><div>ตัวอย่าง [<strong>5</strong>, 3, 8, 1] pivot=5 → เลื่อนตัวเล็กไปซ้าย: [3, 1]<strong>5</strong>[8] — 5 อยู่ตำแหน่งถูกต้องถาวรแล้ว</div></div>
              <div class="trace-row"><div class="trace-step">3</div><div><strong>Worst case O(n²) เกิดเมื่อไหร่?</strong> เมื่อ pivot แบ่งไม่สมดุล (เช่น ข้อมูลเรียงอยู่แล้ว + pivot ตัวแรก) → แบ่งได้ n−1 กับ 0 ทุกรอบ → n+(n−1)+… = Θ(n²)</div></div>
              <div class="trace-row"><div class="trace-step">4</div><div><strong>Average O(n log n)</strong> เพราะ pivot ปกติแบ่งพอๆ ครึ่ง → เหมือน mergesort. <strong>Space O(log n)</strong> = หน่วยความจำจาก recursive call</div></div>
            </div>
          </div>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
            <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">Quicksort</span>(A[l..r])
<span class="tok-key">if</span> l <span class="tok-op">&lt;</span> r
    s <span class="tok-op">←</span> <span class="tok-fn">HoarePartition</span>(A[l..r])
    <span class="tok-fn">Quicksort</span>(A[l..s-<span class="tok-num">1</span>])
    <span class="tok-fn">Quicksort</span>(A[s+<span class="tok-num">1</span>..r])</pre></div>
          </div>
          <div class="code-block">
            <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
            <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">quick_sort</span>(A):
    <span class="tok-key">if</span> len(A) <span class="tok-op">&lt;=</span> <span class="tok-num">1</span>:
        <span class="tok-key">return</span> A
    pivot <span class="tok-op">=</span> A[<span class="tok-num">0</span>]
    left <span class="tok-op">=</span> [x <span class="tok-key">for</span> x <span class="tok-key">in</span> A[<span class="tok-num">1</span>:] <span class="tok-key">if</span> x <span class="tok-op">&lt;=</span> pivot]
    right <span class="tok-op">=</span> [x <span class="tok-key">for</span> x <span class="tok-key">in</span> A[<span class="tok-num">1</span>:] <span class="tok-key">if</span> x <span class="tok-op">&gt;</span> pivot]
    <span class="tok-key">return</span> <span class="tok-fn">quick_sort</span>(left) <span class="tok-op">+</span> [pivot] <span class="tok-op">+</span> <span class="tok-fn">quick_sort</span>(right)</pre></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Mergesort — อธิบายทีละขั้น</h3>
        <p class="card-lead">เรียง <span class="trace-code">[38, 27, 43, 3]</span></p>
        <div class="step-trace">
          <div class="step-trace-head">▶ แบ่งแล้วผสาน</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>Divide</strong> — แบ่งครึ่ง: <span class="trace-code">[38, 27]</span> | <span class="trace-code">[43, 3]</span></div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>Divide อีก</strong> — <span class="trace-code">[38]</span> <span class="trace-code">[27]</span> | <span class="trace-code">[43]</span> <span class="trace-code">[3]</span> (เหลือ 1 ตัว → หยุด)</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div><strong>Conquer+Merge</strong> — <span class="trace-code">[38]</span>+<span class="trace-code">[27]</span> → <span class="trace-code">[27, 38]</span></div></div>
            <div class="trace-row"><div class="trace-step">4</div><div><strong>Merge</strong> — <span class="trace-code">[43]</span>+<span class="trace-code">[3]</span> → <span class="trace-code">[3, 43]</span></div></div>
            <div class="trace-row"><div class="trace-step">5</div><div><strong>Combine</strong> — <span class="trace-code">[27, 38]</span>+<span class="trace-code">[3, 43]</span> → <span class="trace-code">[3, 27, 38, 43]</span> ✅</div></div>
            <div class="trace-row"><div class="trace-step">6</div><div><strong>Merge ทำงานยังไง?</strong> เปรียบ "หัว" ของทั้งสองลิสต์ เอาตัวเล็กกว่าไปก่อน: 27 vs <strong>3</strong> → เอา 3 · 27 vs 43 → เอา <strong>27</strong> · <strong>38</strong> vs 43 → เอา 38 · เหลือ 43 → เอา 43</div></div>
            <div class="trace-row"><div class="trace-step">7</div><div>ทำไม merge ใช้แค่ Θ(n)? เพราะแต่ละตัวถูก "ดู" และ "วาง" ครั้งเดียว — การผสานสองลิสต์ที่เรียงแล้วไม่ต้องเทียบทุกคู่แบบ O(n²)</div></div>
            <div class="trace-row"><div class="trace-step">8</div><div>Recurrence: T(n) = 2T(n/2) + Θ(n) → Master Theorem Case 02 → <span class="trace-code">Θ(n log n)</span></div></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Binary Tree Traversals — 3 รูปแบบ</h3>
        <div class="grid-3">
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px;text-align:center">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:18px;color:var(--primary)">Preorder</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--ink);margin:8px 0">Root → Left → Right</div>
            <svg viewBox="0 0 100 80" style="width:100%;max-width:120px;margin:8px auto"><g stroke="var(--line)" stroke-width="1.5" fill="none"><path d="M50 20 L25 50 M50 20 L75 50"/></g><g fill="var(--primary)"><circle cx="50" cy="20" r="8"/><circle cx="25" cy="50" r="8" fill="var(--bg-card)" stroke="var(--ink)"/><circle cx="75" cy="50" r="8" fill="var(--bg-card)" stroke="var(--ink)"/></g><text x="50" y="20" text-anchor="middle" dy="3" font-size="8" fill="white" font-weight="bold">1</text><text x="25" y="50" text-anchor="middle" dy="3" font-size="8" font-weight="bold">2</text><text x="75" y="50" text-anchor="middle" dy="3" font-size="8" font-weight="bold">3</text></svg>
          </div>
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px;text-align:center">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:18px;color:var(--accent)">Inorder</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--ink);margin:8px 0">Left → Root → Right</div>
            <svg viewBox="0 0 100 80" style="width:100%;max-width:120px;margin:8px auto"><g stroke="var(--line)" stroke-width="1.5" fill="none"><path d="M50 20 L25 50 M50 20 L75 50"/></g><g><circle cx="50" cy="20" r="8" fill="var(--bg-card)" stroke="var(--ink)"/><circle cx="25" cy="50" r="8" fill="var(--accent)"/><circle cx="75" cy="50" r="8" fill="var(--bg-card)" stroke="var(--ink)"/></g><text x="50" y="20" text-anchor="middle" dy="3" font-size="8" font-weight="bold">2</text><text x="25" y="50" text-anchor="middle" dy="3" font-size="8" fill="white" font-weight="bold">1</text><text x="75" y="50" text-anchor="middle" dy="3" font-size="8" font-weight="bold">3</text></svg>
          </div>
          <div style="padding:18px;background:var(--bg-alt);border-radius:12px;text-align:center">
            <div style="font-family:'Fraunces',serif;font-weight:700;font-size:18px;color:var(--gold)">Postorder</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--ink);margin:8px 0">Left → Right → Root</div>
            <svg viewBox="0 0 100 80" style="width:100%;max-width:120px;margin:8px auto"><g stroke="var(--line)" stroke-width="1.5" fill="none"><path d="M50 20 L25 50 M50 20 L75 50"/></g><g><circle cx="50" cy="20" r="8" fill="var(--bg-card)" stroke="var(--ink)"/><circle cx="25" cy="50" r="8" fill="var(--gold)"/><circle cx="75" cy="50" r="8" fill="var(--bg-card)" stroke="var(--ink)"/></g><text x="50" y="20" text-anchor="middle" dy="3" font-size="8" font-weight="bold">3</text><text x="25" y="50" text-anchor="middle" dy="3" font-size="8" fill="white" font-weight="bold">1</text><text x="75" y="50" text-anchor="middle" dy="3" font-size="8" font-weight="bold">2</text></svg>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">ตัวอย่างเพิ่มเติมของ Divide-and-Conquer</h3>
        <div class="grid-2">
          <div>
            <div class="tag-row"><span class="badge badge-primary">Tree Height</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">หาความสูงของ Tree โดยแบ่งเป็น subtree ซ้าย-ขวา</p>
            <div class="code-block"><div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">Height</span>(T)
<span class="tok-key">if</span> T = empty <span class="tok-key">return</span> -<span class="tok-num">1</span>
<span class="tok-key">else return</span> <span class="tok-fn">max</span>{Height(T_left),
                Height(T_right)} + <span class="tok-num">1</span></pre></div></div>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-primary">Large Integer Mult.</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">แบ่งเลข 2n หลักเป็นเลข n หลักสองซีก (a·10<sup>n</sup>+b) ลดการคูณจาก 4 → 3 ครั้งต่อชั้น</p>
            <div class="math-block"><span class="math-inline" id="eq-karatsuba">$T(n) = 3T(n/2) + O(n) = O(n^{\log_2 3}) \approx O(n^{1.585})$</span></div>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-primary">Strassen's Matrix</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">ลดการคูณ Matrix ย่อยจาก 8 ครั้ง → 7 ครั้ง ประสิทธิภาพดีกว่า O(n³)</p>
            <div class="math-block"><span class="math-inline" id="eq-strassen">$T(n) = \Theta(n^{\log_2 7}) \approx \Theta(n^{2.807})$</span></div>
          </div>
<div>
            <div class="tag-row"><span class="badge badge-primary">Closest-Pair & Quickhull</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">แบ่งจุดตามแกน x ออกเป็นซ้าย-ขวา คำนวณแยก แล้ววิเคราะห์รอยต่อ (strip) ตรงกลาง</p>
            <div class="math-block"><span class="math-inline" id="eq-cp">$T(n) = 2T(n/2) + O(n) = O(n \log n)$</span></div>
          </div>
        </div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — ก่อนสอบ W5
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>Mergesort</strong>O(n log n) ทุกกรณี · Space O(n)</div>
          <div class="mem-chip"><strong>Quicksort</strong>O(n log n) avg · O(n²) worst · Space O(log n)</div>
          <div class="mem-chip"><strong>Master Theorem</strong>T(n) = a·T(n/b) + f(n) — เทียบ a<sup>k</sup> กับ f(n)</div>
          <div class="mem-chip"><strong>Strassen</strong>T(n) = Θ(n^log₂7) ≈ Θ(n^2.807)</div>
          <div class="mem-chip"><strong>Traversals</strong>Pre: Root-L-R · In: L-Root-R · Post: L-R-Root</div>
          <div class="mem-chip"><strong>Height(T)</strong>max(ซ้าย,ขวา) + 1 · ว่าง = −1</div>
        </div>
      </div>
`;

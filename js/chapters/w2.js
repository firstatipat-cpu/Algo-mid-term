/* w2 content */

document.getElementById('w2').innerHTML = String.raw`
      <div class="section-head">
        <div class="section-num">02 / 07</div>
        <h2 class="section-title">Fundamentals of Efficiency Analysis</h2>
        <div class="section-meta">Big-O · การวิเคราะห์เชิงทฤษฎี</div>
      </div>

      <div class="card card-accent">
        <h3 class="card-title">วัตถุประสงค์ของการวิเคราะห์</h3>
        <ul class="check-list">
          <li>รู้วิธีการวัดประสิทธิภาพของอัลกอริทึม</li>
          <li>ระบุประสิทธิภาพด้านเวลา (<strong>Time</strong>) และพื้นที่ (<strong>Space</strong>)</li>
          <li>เปรียบเทียบประสิทธิภาพระหว่างอัลกอริทึมได้</li>
        </ul>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="card-title">วิธีการวิเคราะห์</h3>
          <div class="step-grid" style="grid-template-columns:1fr">
            <div class="step-item"><div class="step-num">Approach 01</div><div class="step-text"><strong>Theoretical Analysis</strong> — คำนวณความซับซ้อนผ่านสมการคณิตศาสตร์</div></div>
            <div class="step-item"><div class="step-num">Approach 02</div><div class="step-text"><strong>Empirical Analysis</strong> — วัดจากการรันจริง (เช่น เป็นมิลลิวินาที)</div></div>
          </div>
        </div>
        <div class="card">
          <h3 class="card-title">สูตรหาเวลาโดยประมาณ</h3>
          <div class="math-block">
            <span class="math-inline" id="eq-time">$T(n) \approx c_{op} \times C(n)$</span>
          </div>
          <p class="card-lead" style="margin-top:12px">
            <span class="kbd">c<sub>op</sub></span> = เวลาที่ใช้ใน Basic Operation 1 ครั้ง<br>
            <span class="kbd">C(n)</span> = จำนวนครั้งที่เรียก Basic Operation (ขึ้นกับขนาด Input <span class="kbd">n</span>)
          </p>
        </div>
      </div>

      <div class="callout callout-note">
        <div class="callout-icon">i</div>
        <div class="callout-body">
          <strong>Basic Operation คืออะไร?</strong> คือ "การกระทำที่สำคัญที่สุด" ในลูป — ปกติคือการ<b>เปรียบเทียบ</b> หรือ <b>การบวก/คูณ</b> ที่อยู่ในวงวนในสุด เพราะมันถูกทำซ้ำหลายครั้งที่สุด กฎคร่าวๆ: <em>ดูโค้ดแล้วหาว่าบรรทัดไหนถูกเรียกบ่อยสุดและมีค่าใช้จ่ายสูงสุด → นั่นคือ basic operation</em> เช่น ในลูปหาค่ามากสุดในอาร์เรย์ คำสั่ง <code>if A[i] &gt; max</code> คือ basic operation (ถูกเรียก n ครั้ง) ส่วนการขยับตัวแปรอื่นไม่สำคัญเท่า
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">ประสิทธิภาพ 3 รูปแบบ <span class="tag">Cases</span></h3>
        <div class="grid-3">
          <div style="padding:16px;background:var(--bg-alt);border-radius:12px;border-top:3px solid var(--rose)">
            <div style="font-family:'Fraunces',serif;font-size:14px;color:var(--rose);font-weight:600">Worst-case</div>
            <div class="math-inline" style="margin:8px 0;display:block" id="eq-worst">$T_{worst}(n)$</div>
            <div style="font-size:13px;color:var(--ink-2)">กรณีแย่สุด — อัลกอริทึมใช้เวลามากที่สุด</div>
          </div>
          <div style="padding:16px;background:var(--bg-alt);border-radius:12px;border-top:3px solid var(--primary)">
            <div style="font-family:'Fraunces',serif;font-size:14px;color:var(--primary);font-weight:600">Best-case</div>
            <div class="math-inline" style="margin:8px 0;display:block" id="eq-best">$T_{best}(n)$</div>
            <div style="font-size:13px;color:var(--ink-2)">กรณีดีสุด — ใช้เวลาน้อยที่สุด</div>
          </div>
          <div style="padding:16px;background:var(--bg-alt);border-radius:12px;border-top:3px solid var(--gold)">
            <div style="font-family:'Fraunces',serif;font-size:14px;color:var(--gold);font-weight:600">Average-case</div>
            <div class="math-inline" style="margin:8px 0;display:block" id="eq-avg">$T_{avg}(n)$</div>
            <div style="font-size:13px;color:var(--ink-2)">เฉลี่ย — พิจารณาความน่าจะเป็นของ Input</div>
          </div>
        </div>
        <div class="callout callout-tip">
          <div class="callout-icon">!</div>
          <div class="callout-body"><strong>ตัวอย่าง Sequential Search:</strong> Worst-case ค้นไม่เจอเลย เปรียบเทียบ n ครั้ง / Best-case เจอที่ตำแหน่งแรก เปรียบเทียบ 1 ครั้ง</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">สัญลักษณ์เชิงเส้นกำกับ (Asymptotic Notations) <span class="badge-exam">ออกสอบบ่อย</span></h3>
        <div class="grid-3" style="margin-bottom:16px">
          <div class="math-block" style="text-align:center;margin:0"><span class="math-inline" id="eq-o">$O(g(n))$</span><div style="font-size:12px;color:var(--muted);margin-top:8px">Upper bound<br>≤ growth</div></div>
          <div class="math-block" style="text-align:center;margin:0;border-left-color:var(--accent)"><span class="math-inline" id="eq-omega">$\Omega(g(n))$</span><div style="font-size:12px;color:var(--muted);margin-top:8px">Lower bound<br>≥ growth</div></div>
          <div class="math-block" style="text-align:center;margin:0;border-left-color:var(--gold)"><span class="math-inline" id="eq-theta">$\Theta(g(n))$</span><div style="font-size:12px;color:var(--muted);margin-top:8px">Tight bound<br>= growth</div></div>
        </div>
        <div class="formula-card">
          <div class="formula-card-label">ความสัมพันธ์</div>
          <div class="formula-card-eq">f(n) = Θ(g(n)) ⟺ f(n) = O(g(n)) ∧ f(n) = Ω(g(n))</div>
        </div>
        <div class="callout callout-tip">
          <div class="callout-icon">!</div>
          <div class="callout-body">
            <strong>อ่านยังไงให้เข้าใจ? (อย่าท่องสัญลักษณ์)</strong> ให้มอง O / Ω / Θ เป็นการ<b>เปรียบเทียบอัตราการเติบโต</b>ของฟังก์ชันเวลากับฟังก์ชันอ้างอิง เมื่อ n ใหญ่พอ:
            <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8">
              <li><code>f(n) = O(g(n))</code> — "f เติบโต<b>ไม่เกิน</b> g" (เหมือนความเร็วสูงสุด 60 กม./ชม. หมายถึง ไม่เกิน 60) เช่น f(n)=3n+5 เป็น O(n) เพราะ 3n+5 ≤ 4n เมื่อ n ≥ 5</li>
              <li><code>f(n) = Ω(g(n))</code> — "f เติบโต<b>ไม่น้อยกว่า</b> g" เช่น 3n+5 เป็น Ω(n) เพราะ ≥ 1·n เสมอ</li>
              <li><code>f(n) = Θ(g(n))</code> — "f เติบโต<b>พอๆ กับ</b> g" (ทั้งบนและล่างเป็น g ตัวเดียวกัน) เช่น 3n+5 เป็น Θ(n) — นี่คือค่าที่บอกขนาดจริง</li>
            </ul>
          </div>
        </div>
        <div class="step-trace">
          <div class="step-trace-head">▶ วิธีนับจากโค้ดให้ได้ O(…) — ขั้นตอนที่ควรทำเป็น</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>นับจำนวนครั้งแบบเป๊ะ</strong> จากโค้ด เช่น <code>count_pairs</code> ด้านล่าง: ลูปนอกวิ่ง n ครั้ง, ลูปในวิ่ง n ครั้ง/รอบนอก → C(n) = n·n = <strong>n²</strong> ครั้ง</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>ทิ้งค่าคงที่และเทอมเล็กสุด</strong> — คงเหลือแค่ "เทอมใหญ่สุด" เช่น 3n²+5n+100 → <strong>n²</strong></div></div>
            <div class="trace-row"><div class="trace-step">3</div><div><strong>ใส่สัญลักษณ์</strong> → 3n²+5n+100 = <strong>O(n²)</strong> (และเป็น Θ(n²) ด้วย เพราะเทอมใหญ่สุดคือ n²)</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div><strong>แปลผล</strong> — O(n²) หมายถึง "ข้อมูล 2 เท่า → งาน <strong>4 เท่า</strong>" (2²=4), O(n) หมายถึง "2 เท่า → 2 เท่า", O(log n) หมายถึง "2 เท่า → เพิ่มอีก 1 ขั้นเท่านั้น"</div></div>
          </div>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body">
            <strong>ลอการิทึม (log) คืออะไร?</strong> log<sub>2</sub>n = จำนวนครั้งที่ "หารครึ่ง" ได้ก่อนเหลือ 1 เช่น log<sub>2</sub>8 = 3 เพราะ 8 → 4 → 2 → 1 (หารครึ่ง 3 ครั้ง) — ตรงกับ Binary Search ที่ตัดครึ่งไปเรื่อยๆ นั่นคือที่มาของ O(log n)
          </div>
        </div>
      </div>

      <!-- BIG-O CHART -->
      <div class="card">
        <h3 class="card-title">กราฟเปรียบเทียบอัตราการเติบโต <span class="tag">Chart</span></h3>
        <p class="card-lead">เปรียบเทียบจำนวนครั้งที่ Basic Operation ทำงานเมื่อ Input Size (n) เพิ่มขึ้น — ใช้สเกล Logarithmic บนแกน Y เพื่อให้มองเห็นความแตกต่างระหว่างแต่ละค่า O(1) ถึง O(n!) ได้ชัดเจน</p>
        <div class="chart-wrap">
          <div class="chart-title-row">
            <h4>Growth Rate Comparison (Log Scale)</h4>
            <div class="chart-badges">
              <span class="badge badge-primary">Y: Log Scale</span>
              <span class="badge badge-accent">X: Linear</span>
            </div>
          </div>
          <canvas id="bigoChart"></canvas>
          <div class="chart-legend" id="chartLegend"></div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">ตารางสรุปความซับซ้อนของอัลกอริทึมทั่วไป</h3>
        <div style="overflow-x:auto">
          <table class="complexity-table">
            <thead>
              <tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr>
            </thead>
            <tbody>
              <tr><td>Bubble Sort</td><td><span class="complexity-class cc-good">O(n)</span></td><td><span class="complexity-class cc-bad">O(n²)</span></td><td><span class="complexity-class cc-bad">O(n²)</span></td><td>O(1)</td></tr>
              <tr><td>Selection Sort</td><td><span class="complexity-class cc-bad">O(n²)</span></td><td><span class="complexity-class cc-bad">O(n²)</span></td><td><span class="complexity-class cc-bad">O(n²)</span></td><td>O(1)</td></tr>
              <tr><td>Insertion Sort</td><td><span class="complexity-class cc-good">O(n)</span></td><td><span class="complexity-class cc-bad">O(n²)</span></td><td><span class="complexity-class cc-bad">O(n²)</span></td><td>O(1)</td></tr>
              <tr><td>Merge Sort</td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td>O(n)</td></tr>
              <tr><td>Quick Sort</td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td><span class="complexity-class cc-bad">O(n²)</span></td><td>O(log n)</td></tr>
              <tr><td>Heap Sort</td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td><span class="complexity-class cc-fair">O(n log n)</span></td><td>O(1)</td></tr>
              <tr><td>Binary Search</td><td><span class="complexity-class cc-excellent">O(1)</span></td><td><span class="complexity-class cc-good">O(log n)</span></td><td><span class="complexity-class cc-good">O(log n)</span></td><td>O(1)</td></tr>
              <tr><td>Sequential Search</td><td><span class="complexity-class cc-excellent">O(1)</span></td><td><span class="complexity-class cc-bad">O(n)</span></td><td><span class="complexity-class cc-bad">O(n)</span></td><td>O(1)</td></tr>
              <tr><td>Hash Table (avg)</td><td><span class="complexity-class cc-excellent">O(1)</span></td><td><span class="complexity-class cc-excellent">O(1)</span></td><td><span class="complexity-class cc-bad">O(n)</span></td><td>O(n)</td></tr>
              <tr><td>BST Search</td><td><span class="complexity-class cc-good">O(log n)</span></td><td><span class="complexity-class cc-good">O(log n)</span></td><td><span class="complexity-class cc-bad">O(n)</span></td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body">
            <strong>วิธีอ่านสี:</strong> <span class="complexity-class cc-excellent">เขียวเข้ม</span> = เร็วมาก (O(1)) · <span class="complexity-class cc-good">เขียว</span> = เร็ว (O(log n)) · <span class="complexity-class cc-fair">เหลือง</span> = ปานกลาง (O(n log n)) · <span class="complexity-class cc-bad">แดง</span> = ช้า (O(n²) ขึ้นไป) · คอลัมน์ <strong>Space</strong> = พื้นที่หน่วยความจำพิเศษที่ต้องใช้. <em>อัลกอริทึมเหล่านี้ยังไม่ได้สอนในตอนนี้ — ตารางนี้คือ "ภาพรวมที่เราจะเจอทีละบท" ไว้กลับมาดูเมื่อเรียนจบ Week 03–07</em>
          </div>
        </div>
      </div>

      <!-- COMPLEXITY CALCULATOR -->
      <div class="card">
        <h3 class="card-title">Complexity Calculator <span class="tag">Interactive</span></h3>
        <p class="card-lead">ใส่ขนาด Input n แล้วเลือกความซับซ้อน → ดูจำนวนการทำงานโดยประมาณ (ช่วยให้เข้าใจว่าทำไม O(n²) ถึงช้ากว่า O(n log n))</p>
        <div class="viz-controls">
          <label class="slider-row">n = 
            <input type="number" id="ccN" value="100" min="1" max="1000000" style="width:90px">
          </label>
          <select id="ccClass" class="btn btn-sm" style="max-width:220px">
            <option value="1">O(1) — คงที่</option>
            <option value="logn">O(log n) — ลอการิทึม</option>
            <option value="n">O(n) — เชิงเส้น</option>
            <option value="nlogn" selected>O(n log n) — เชิงเส้น×ลอการิทึม</option>
            <option value="n2">O(n²) — กำลังสอง</option>
            <option value="n3">O(n³) — กำลังสาม</option>
            <option value="2n">O(2ⁿ) — เอกซ์โพเนนเชียล</option>
            <option value="n!">O(n!) — แฟกทอเรียล</option>
          </select>
          <button class="btn btn-accent btn-sm" id="ccRun">คำนวณ →</button>
        </div>
        <div id="ccResult" style="margin-top:10px;font-size:14px;color:var(--ink-2);line-height:1.8">ใส่ค่า n แล้วกด <strong>คำนวณ</strong></div>
      </div>

      <div class="card">
        <h3 class="card-title">วิเคราะห์ Sequential Search — อธิบายทีละขั้น</h3>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Pseudocode</div></div>
          <div class="code-body"><pre><span class="tok-key">ALGORITHM</span> <span class="tok-fn">SequentialSearch</span>(A[0..n-1], K)
i <span class="tok-op">←</span> <span class="tok-num">0</span>
<span class="tok-key">while</span> i <span class="tok-op">&lt;</span> n <span class="tok-key">and</span> A[i] <span class="tok-op">≠</span> K <span class="tok-key">do</span>
    i <span class="tok-op">←</span> i <span class="tok-op">+</span> <span class="tok-num">1</span>
<span class="tok-key">if</span> i <span class="tok-op">&lt;</span> n <span class="tok-key">return</span> i
<span class="tok-key">else</span> <span class="tok-key">return</span> -<span class="tok-num">1</span></pre></div>
        </div>
        <div class="step-trace">
          <div class="step-trace-head">▶ วิเคราะห์: basic operation คือการเปรียบเทียบ A[i] ≠ K</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>Worst-case</strong> — K ไม่อยู่ในอาร์เรย์ → เทียบครบทุกตัว: C<sub>worst</sub>(n) = <span class="trace-code">n</span></div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>Best-case</strong> — K อยู่ตำแหน่งแรก: C<sub>best</sub>(n) = <span class="trace-code">1</span></div></div>
            <div class="trace-row"><div class="trace-step">3</div><div><strong>Average-case</strong> — K อยู่ตำแหน่งใดก็ได้โอกาสเท่ากัน: เฉลี่ย (1+2+…+n)/n. ลองแทนค่า n=4: (1+2+3+4)/4 = 10/4 = 2.5 และ (4+1)/2 = 2.5 → ตรงกัน → สูตร <span class="trace-code">(n+1)/2</span></div></div>
            <div class="trace-row"><div class="trace-step">4</div><div><strong>สรุป</strong> — T(n) = c<sub>op</sub>·C(n) → Worst = <span class="trace-code">Θ(n)</span>, Best = <span class="trace-code">Θ(1)</span>, Avg = <span class="trace-code">Θ(n)</span> (เพราะ (n+1)/2 มีเทอมใหญ่สุดเป็น n)</div></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">วิเคราะห์ Summations — Python ตัวอย่าง</h3>
        <p class="card-lead">loop ซ้อน 2 ชั้นแบบนี้ทำงาน n·n = <strong>n²</strong> ครั้ง (Nonrecursive analysis)</p>
        <div class="code-block">
          <div class="code-head"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">Python</div></div>
          <div class="code-body"><pre><span class="tok-key">def</span> <span class="tok-fn">count_pairs</span>(n):
    count <span class="tok-op">=</span> <span class="tok-num">0</span>
    <span class="tok-key">for</span> i <span class="tok-key">in</span> range(n):        <span class="tok-com"># รอบนอก: n ครั้ง</span>
        <span class="tok-key">for</span> j <span class="tok-key">in</span> range(n):    <span class="tok-com"># รอบใน: n ครั้ง/รอบนอก</span>
            count <span class="tok-op">+=</span> <span class="tok-num">1</span>
    <span class="tok-key">return</span> count</pre></div>
        </div>
        <div class="step-trace">
          <div class="step-trace-head">▶ นับจริงด้วย n = 3 — "นับให้เป๊ะก่อน แล้วค่อยทิ้งค่าคงที่"</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div>i=0 → ลูปในวิ่ง j=0,1,2 → <strong>3</strong> ครั้ง</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div>i=1 → ลูปในวิ่ง j=0,1,2 → <strong>3</strong> ครั้ง · i=2 → อีก <strong>3</strong> ครั้ง</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>รวม = 3+3+3 = <strong>9</strong> = 3×3 = n·n = n² ครั้ง</div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>ใส่สัญลักษณ์: C(n)=n² → <strong>Θ(n²)</strong> (และ O(n²)) — ถ้า n เป็น 2 เท่า งานเป็น 4 เท่า</div></div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">สัญลักษณ์ใหม่ในบทนี้ <span class="tag">แปลก่อนใช้</span></h3>
        <div class="formula-card">
          <div class="formula-card-label">Σ · lim · ⌊⌋ — อ่านยังไงให้ไม่กลัว</div>
          <div class="formula-card-eq" style="font-size:14px;line-height:2">
            <code>Σ</code> = ผลรวม "เอามาบวกกัน" — <code>Σ_{i=1}^{n} i</code> หมายถึง <b>1+2+3+…+n</b> (อ่านว่า "ซิกม่า") &nbsp;·&nbsp;
            <code>lim</code> = ค่าที่เข้าใกล้เมื่อ n <b>โตขึ้นเรื่อย ๆ ถึงอนันต์</b> — ดูทิศทางตอน n ใหญ่มาก แทนค่าความแม่นยำที่ n ใด n หนึ่ง &nbsp;·&nbsp;
            <code>⌊x⌋</code> = ปัดลงเป็นจำนวนเต็ม (floor) — เช่น <code>⌊7/2⌋ = 3</code> เหมือน floor() ในบทก่อน
          </div>
        </div>
        <div class="callout callout-note">
          <div class="callout-icon">i</div>
          <div class="callout-body"><strong>เห็นสัญลักษณ์แล้วไอเดียเดียวกัน</strong>: <code>Σ_{i=1}^{n} i = n(n+1)/2</code> แปลว่า "บวกเลข 1 ถึง n ได้ n(n+1)/2" ไม่ต้องกลัวรูป — มันคือสูตรย่อของลูปบวกที่เราเขียนในโค้ดมาแล้ว</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">การวิเคราะห์แบบ Nonrecursive และ Recursive</h3>
        <div class="grid-2">
          <div>
            <div class="tag-row"><span class="badge badge-primary">Nonrecursive</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">วิเคราะห์โดยใช้สูตรผลรวม (Summations)</p>
            <div class="math-block"><span class="math-inline" id="eq-sum">$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">เช่น ลูปบวก 1+2+…+n → มีค่าเท่ากับ n(n+1)/2 ≈ n²/2 → เป็น <strong>Θ(n²)</strong></p>
          </div>
          <div>
            <div class="tag-row"><span class="badge badge-accent">Recursive</span></div>
            <p style="font-size:13px;color:var(--ink-2);margin:8px 0">ตั้งสมการ Recurrence Relation แล้วแก้ด้วย Backward Substitutions</p>
<div class="math-block"><span class="math-inline" id="eq-rec">$T(n) = a \cdot T(n/b) + f(n)$</span></div>
          </div>
        </div>
        <div class="step-trace">
          <div class="step-trace-head">▶ Recurrence คืออะไร + แก้ด้วย Backward Substitution (ตัวอย่าง factorial)</div>
          <div class="step-trace-body">
            <div class="trace-row"><div class="trace-step">1</div><div><strong>Recurrence Relation</strong> = สมการที่นิยามเวลา T(n) จากเวลา "ปัญหาย่อยที่เล็กกว่า" — เช่น factorial: T(n) = T(n−1) + 1 (ทำงาน 1 หน่วย แล้วเรียกปัญหาย่อยขนาด n−1)</div></div>
            <div class="trace-row"><div class="trace-step">2</div><div><strong>Backward Substitution</strong> = แทน T(n−1) = T(n−2)+1 ลงไป: T(n) = T(n−2) + 1 + 1 = T(n−2) + 2</div></div>
            <div class="trace-row"><div class="trace-step">3</div><div>แทนซ้ำ: T(n) = T(n−3) + 3 … จนถึง T(1) = 1 (base case) → T(n) = 1 + (n−1) = <strong>n</strong></div></div>
            <div class="trace-row"><div class="trace-step">4</div><div>สรุป: factorial ใช้เวลา <strong>Θ(n)</strong> — การ "แกะสมการออกมาทีละชั้น" คือหลักการของ backward substitution ที่จะเจออีกใน Week 05 (Master Theorem)</div></div>
          </div>
        </div>
        <div class="callout callout-warn">
          <div class="callout-icon">→</div>
          <div class="callout-body">
            <strong>เปรียบเทียบ order of growth ด้วยลิมิต (ใช้ตอนเรียนสอบ)</strong> ถ้าให้เทียบ f(n) กับ g(n) ให้คำนวณ <span class="math-inline">$\lim_{n \to \infty} \frac{f(n)}{g(n)}$</span>:
            <span class="kbd">= 0</span> → f เติบโตช้ากว่า g (f = O(g) แต่ไม่ใช่ Ω(g)) · <span class="kbd">= ∞</span> → f เติบโตเร็วกว่า g (f = Ω(g)) · <span class="kbd">= ค่าคงที่ c &gt; 0</span> → เติบโตเท่ากัน (f = Θ(g)). ตัวอย่าง: f(n)=n², g(n)=n → ลิมิต n²/n = ∞ → n² เติบโตเร็วกว่า n
          </div>
        </div>
      </div>

      <!-- MEM BOX -->
      <div class="mem-box">
        <div class="mem-box-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>
          สูตรจำ — ก่อนสอบ W2
        </div>
        <div class="mem-grid">
          <div class="mem-chip"><strong>T(n)</strong>T(n) ≈ c<sub>op</sub> × C(n)</div>
          <div class="mem-chip"><strong>Big-O</strong>Upper bound (≤) · ใช้ตอบ "เร็วสุดเท่าไหร่"</div>
          <div class="mem-chip"><strong>Big-Ω</strong>Lower bound (≥)</div>
          <div class="mem-chip"><strong>Big-Θ</strong>Tight bound (=) · ใช้เมื่อมีทั้งบนและล่าง</div>
          <div class="mem-chip"><strong>ลำดับการเติบโต</strong>1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; n³ &lt; 2ⁿ &lt; n!</div>
          <div class="mem-chip"><strong>Nonrecursive</strong>Σ i = n(n+1)/2 ≈ n²/2</div>
        </div>
      </div>
`;

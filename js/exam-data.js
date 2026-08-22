/* ===== Exam Simulation Data : Midterm (Week 1-6 · ถึง Transform-and-Conquer) ===== */

const EXAM_MCQ = [
  /* --- Week 1: Introduction --- */
  { q: 'ข้อใด "ไม่ใช่" คุณสมบัติของอัลกอริทึม',
    c: ['ขั้นตอนชัดเจน ไม่กำกวม', 'จบได้ในจำนวนขั้นตอนที่จำกัด', 'ให้ผลลัพธ์ที่ถูกต้อง', 'ต้องเขียนด้วยภาษาโปรแกรมเท่านั้น'], a: 3 },
  { q: 'Euclid: gcd(60, 24) = gcd(24, 12) = gcd(12, 0) — ค่า gcd(60,24) เท่ากับข้อใด',
    c: ['6', '12', '24', '36'], a: 1 },
  { q: 'Sieve of Eratosthenes มีเวลาทำงานเป็นข้อใด',
    c: ['Θ(n)', 'Θ(n log n)', 'Θ(n log log n)', 'Θ(n²)'], a: 2 },
  { q: 'ปัญหา TSP (Travelling Salesman) จัดเป็นปัญหาประเภทใด',
    c: ['Geometric', 'Combinatorial', 'Graph', 'Numerical'], a: 1 },

  /* --- Week 2: Efficiency Analysis --- */
  { q: 'Sequential Search กรณี best case (เจอที่ช่องแรก) มีเวลาเป็นข้อใด',
    c: ['Ω(1)', 'Ω(log n)', 'O(n)', 'Θ(n)'], a: 0 },
  { q: 'Selection Sort จำนวนครั้งการเปรียบเทียบ C(n) เป็นข้อใด',
    c: ['ขึ้นกับข้อมูล input', 'n(n−1)/2 เสมอ', 'n−1 เสมอ', 'log n'], a: 1 },
  { q: 'Big-O (O) หมายถึงอะไร',
    c: ['ขอบบน (upper bound) ของเวลาทำงาน', 'ขอบล่าง (lower bound)', 'ขอบบนและล่างที่แน่น (tight bound)', 'จำนวนขั้นตอนจริง'], a: 0 },
  { q: 'Big-Omega (Ω) หมายถึงอะไร',
    c: ['ขอบบน', 'ขอบล่าง (lower bound)', 'tight bound', 'ค่าเฉลี่ย'], a: 1 },
  { q: 'Big-Theta (Θ) หมายถึงอะไร',
    c: ['ขอบบนอย่างเดียว', 'ขอบล่างอย่างเดียว', 'ขอบบนและล่างที่แน่นเท่ากัน', 'เวลาเฉลี่ย'], a: 2 },
  { q: 'เรียงอัตราการเติบโตจาก "ช้าไปเร็ว" ข้อใดถูกต้อง',
    c: ['n log n < n² < 2ⁿ < n!', 'n² < n log n < n! < 2ⁿ', '2ⁿ < n! < n² < n log n', 'n! < 2ⁿ < n² < n log n'], a: 0 },
  { q: 'Big-O ของ 5n² + 999n + 7 คือข้อใด',
    c: ['O(5n²)', 'O(n³)', 'O(n²)', 'O(n)'], a: 2 },

  /* --- Graph traversal --- */
  { q: 'การท่องไปกราฟแบบ DFS ใช้โครงสร้างข้อมูลใด',
    c: ['Queue', 'Stack', 'Heap', 'Hash Table'], a: 1 },
  { q: 'การท่องไปกราฟแบบ BFS เดินกราฟอย่างไร',
    c: ['ลึกไปก่อน แล้วค่อยย้อนกลับ', 'ระดับต่อระดับ (level-by-level)', 'สุ่มลำดับ', 'เรียงตามน้ำหนักเส้นเชื่อม'], a: 1 },
  { q: 'Topological Sorting ใช้ได้กับกราฟลักษณะใด',
    c: ['กราฟมีวงจร (cyclic)', 'DAG — กราฟระบุทิศไม่มีวงจร', 'Undirected graph ทุกชนิด', 'Complete graph'], a: 1 },

  /* --- Week 3: Brute Force --- */
  { q: 'Bubble Sort กรณี worst case ต้องเปรียบเทียบกี่ครั้ง',
    c: ['n', 'n log n', 'n(n−1)/2', '2ⁿ'], a: 2 },
  { q: 'Brute Force Closest-Pair Problem มีเวลาทำงานเป็นข้อใด',
    c: ['O(n log n)', 'O(n²)', 'O(n³)', 'O(n!)'], a: 1 },
  { q: 'Convex Hull แบบ Brute Force (เช็คทุกคู่เส้น) มีเวลาเป็นข้อใด',
    c: ['O(n log n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)'], a: 2 },
  { q: 'TSP แบบ Exhaustive Search ต้องตรวจเส้นทางจำนวนเท่าใด (n เมือง)',
    c: ['(n−1)!/2', 'n!', '2ⁿ', 'n²'], a: 0 },
  { q: 'Knapsack แบบ Exhaustive Search ต้องตรวจชุดย่อยจำนวนเท่าใด',
    c: ['n!', '(n−1)!/2', '2ⁿ', 'n(n−1)/2'], a: 2 },
  { q: 'Assignment Problem แบบ Exhaustive Search ต้องตรวจการจับคู่จำนวนเท่าใด',
    c: ['n!', '2ⁿ', '(n−1)!/2', 'n log n'], a: 0 },

  /* --- Week 4: Decrease-and-Conquer --- */
  { q: 'Insertion Sort จัดเป็นเทคนิค decrease-and-conquer แบบใด',
    c: ['Decrease by a constant (−1)', 'Decrease by a factor (÷2)', 'Variable size decrease', 'Divide-and-conquer'], a: 0 },
  { q: 'Insertion Sort กรณี best case มีเวลา O(n) เมื่อ input เป็นอย่างไร',
    c: ['เรียงจากมากไปน้อยแล้ว', 'เรียงจากน้อยไปมากอยู่แล้ว (sorted)', 'สุ่มทุกครั้ง', 'มีค่าซ้ำกันทั้งหมด'], a: 1 },
  { q: 'Insertion Sort กรณี worst case (input เรียงมากไปน้อย) ต้องเปรียบเทียบกี่ครั้ง',
    c: ['n', 'n log n', 'n(n−1)/2', 'n² − n/2'], a: 2 },
  { q: 'Binary Search จัดเป็น decrease-and-conquer แบบใด',
    c: ['Decrease by a constant', 'Decrease by a factor of 2', 'Divide-and-conquer', 'Transform-and-conquer'], a: 1 },
  { q: 'Recurrence ของ Binary Search คือข้อใด',
    c: ['T(n) = T(n−1) + 1', 'T(n) = 2T(n/2) + n', 'T(n) = T(n/2) + 1', 'T(n) = T(n−1) + n'], a: 2 },
  { q: 'Johnson-Trotter สร้าง permutation ครั้งถัดไปด้วยวิธีใด',
    c: ['สลับตัวเลขตำแหน่งไกลกัน', 'สลับ element ที่อยู่ติดกัน (adjacent transposition)', 'เรียงเลขฐานสอง', 'สุ่มลำดับใหม่'], a: 1 },
  { q: 'Fake Coin: มีเหรียญ 9 เหรียญ (ของปลอมเบากว่า) ถ้าแบ่ง 3 กอง ๆ ละ 3 ต้องชั่งอย่างน้อยกี่ครั้ง',
    c: ['1', '2', '3', '⌈log₂9⌉ = 4'], a: 1 },
  { q: 'Quickselect หา k-th smallest มีเวลากรณี average เป็นข้อใด',
    c: ['Θ(n log n)', 'Θ(n)', 'Θ(n²)', 'Θ(log n)'], a: 1 },

  /* --- Week 5: Divide-and-Conquer --- */
  { q: 'Merge Sort: กรณี worst case มีเวลาและพื้นที่เป็นข้อใด',
    c: ['Θ(n log n) · Space O(1)', 'Θ(n²) · Space O(n)', 'Θ(n log n) · Space O(n)', 'Θ(n) · Space O(log n)'], a: 2 },
  { q: 'Quicksort กรณี worst case O(n²) เกิดเมื่อใด',
    c: ['pivot เป็น median ทุกครั้ง', 'input เรียงอยู่แล้วและเลือก pivot เป็นตัวแรก', 'ข้อมูลสุ่มทั้งหมด', 'มีค่าซ้ำกันเยอะเสมอ'], a: 1 },
  { q: 'Master Theorem: T(n) = 2T(n/2) + n มีผลลัพธ์เป็นข้อใด',
    c: ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(log n)'], a: 1 },
  { q: 'อัลกอริทึม Strassen (คูณเมทริกซ์) มีเวลาประมาณข้อใด',
    c: ['Θ(n²)', 'Θ(n^2.807)', 'Θ(n³)', 'Θ(n log n)'], a: 1 },

  /* --- Week 6: Transform-and-Conquer --- */
  { q: 'Presorting: ตรวจว่า array มีค่าซ้ำไหม ถ้า sort ก่อน (O(n log n)) แล้วสแกนเทียบข้างเคียง (O(n)) รวมเป็นข้อใด',
    c: ['O(n²)', 'O(n log n)', 'O(n)', 'O(n² log n)'], a: 1 },
  { q: 'Max-Heap มีคุณสมบัติอย่างไร',
    c: ['parent ≤ children ทุกโหนด', 'parent ≥ children ทุกโหนด', 'ระดับใดมีค่ามากสุดเสมอ', 'inorder traversal เรียงน้อยไปมาก'], a: 1 },
  { q: 'Heapsort มีเวลาและพื้นที่เป็นข้อใด',
    c: ['Θ(n log n) · Space O(1) — in-place', 'Θ(n log n) · Space O(n)', 'Θ(n²) · Space O(1)', 'Θ(n) · Space O(n)'], a: 0 },
  { q: 'Priority Queue นิยม implement ด้วยโครงสร้างข้อมูลใด',
    c: ['Sorted array', 'Unsorted linked list', 'Heap', 'BST ไม่สมดุล'], a: 2 },
  { q: "Horner's Rule ประเมิน polynomial ดีกรี n ต้องใช้การคูณกี่ครั้ง",
    c: ['n ครั้ง', '2n ครั้ง', 'n² ครั้ง', 'log n ครั้ง'], a: 0 },
  { q: 'AVL Tree ต้อง rebalance (หมุน) เมื่อ balance factor ของโหนดเป็นอย่างไร',
    c: ['|bf| = 0', '|bf| = 1', '|bf| > 1 (เช่น ±2)', 'bf เป็นลบเสมอ'], a: 2 },
  { q: 'AVL Tree กรณี LL (Left of Left) แก้ด้วยการหมุนแบบใด',
    c: ['Single right rotation', 'Single left rotation', 'Left-Right double rotation', 'Right-Left double rotation'], a: 0 },
  { q: '2-3 Tree มีคุณสมบัติสำคัญข้อใด',
    c: ['ใบ (leaf) ทุกใบอยู่ระดับเดียวกัน', 'โหนดในมี 1 ลูกเสมอ', 'root เก็บค่าน้อยสุด', 'ความสูง = O(n)'], a: 0 }
];

const EXAM_WRITTEN = [
  {
    q: 'Selection Sort กับ array [7, 3, 9, 1] (เรียงน้อยไปมาก)',
    subs: [
      { label: 'จำนวนครั้งการเปรียบเทียบทั้งหมด', accept: ['6'] },
      { label: 'จำนวนครั้งที่เกิดการ swap', accept: ['2'] },
      { label: 'array หลังเรียงเสร็จ (เว้นวรรคระหว่างตัวเลข เช่น 3 1 2)', seq: true, accept: ['1 3 7 9'] }
    ],
    model: 'C(4) = 4×3/2 = 6 ครั้งเปรียบเทียบ · Pass1: สลับ 7↔1 → [1,3,9,7] · Pass2: 3 อยู่ถูกที่ (ไม่ swap) · Pass3: สลับ 9↔7 → [1,3,7,9] · swap เกิด 2 ครั้ง'
  },
  {
    q: "Horner's Rule: p(x) = 2x³ − 3x² + x − 5 ที่ x = 2",
    subs: [
      { label: 'ค่า b หลังอ่านสัมประสิทธิ์ −3', accept: ['1'] },
      { label: 'ค่า b หลังอ่านสัมประสิทธิ์ +1', accept: ['3'] },
      { label: 'ค่า p(2)', accept: ['1'] },
      { label: 'จำนวนครั้งการคูณทั้งหมด', accept: ['3'] }
    ],
    model: 'b₀=2 → b₁=(2·2)+(−3)=1 → b₂=(1·2)+1=3 → b₃=(3·2)+(−5)=1 · p(2)=1 · คูณ 3 ครั้ง (เท่ากับดีกรี)'
  },
  {
    q: 'Max-Heap: สร้าง heap จาก array [2, 9, 4, 7] แบบ bottom-up แล้ว extract-max 1 ครั้ง',
    subs: [
      { label: 'ค่า root หลังสร้าง heap เสร็จ', accept: ['9'] },
      { label: 'array หลังสร้าง heap (เรียงลำดับใน array)', seq: true, accept: ['9 7 4 2'] },
      { label: 'array หลัง extract-max 1 ครั้ง (ทั้ง array รวมท้ายที่ sort แล้ว)', seq: true, accept: ['7 2 4 9'] }
    ],
    model: 'Build: 2 มีลูก 9,4 → สลับกับ 9 → [9,2,4,7]; 2 มีลูก 7 → สลับ → [9,7,4,2] · Extract-max: สลับ 9↔2 → sift-down 2 ลง (สลับกับ 7) → [7,2,4 | 9]'
  },
  {
    q: 'กราฟ (undirected) มีเส้นเชื่อม: A-B, A-C, B-D, C-D — เริ่มท่องไปที่ A โดยเลือก neighbor ตามตัวอักษร',
    subs: [
      { label: 'ลำดับการเยี่ยมชมแบบ DFS', seq: true, accept: ['A B D C'] },
      { label: 'ลำดับการเยี่ยมชมแบบ BFS', seq: true, accept: ['A B C D'] },
      { label: 'BFS ใช้โครงสร้างข้อมูลใด (ภาษาอังกฤษหรือไทยก็ได้)', accept: ['queue', 'q', 'คิว'] }
    ],
    model: 'DFS: A → B → D → C (ลึกก่อน) · BFS: A → B → C → D (ระดับก่อน) · BFS ใช้ Queue'
  },
  {
    q: 'Master Theorem: T(n) = 4T(n/2) + n',
    subs: [
      { label: 'ค่า a', accept: ['4'] },
      { label: 'ค่า b', accept: ['2'] },
      { label: 'ค่า log_b(a) = log₂4', accept: ['2'] },
      { label: 'ผลลัพธ์ (เช่น theta(n^2))', accept: ['theta(n^2)', 'theta(n2)', 'thetan^2', 'thetan2', 'o(n^2)', 'on^2', 'n^2', 'n2', 'theta(n^log(2)4)'] }
    ],
    model: 'a=4, b=2 → n^(log₂4) = n² > f(n)=n → Case 1 (f เล็กกว่า polynomial) → T(n) = Θ(n²)'
  }
];

const EXAM_RULES = {
  mcqCount: 40, mcqPoints: 10,
  writtenCount: 5, writtenPoints: 10,
  scope: 'Week 1 – 6 · ตั้งแต่เรื่องแรกถึง Transform-and-Conquer'
};

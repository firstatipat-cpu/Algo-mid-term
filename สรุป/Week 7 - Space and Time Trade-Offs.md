# **สรุปเนื้อหา Week 7: Space and Time Trade-Offs**

แนวคิดของการแลกเปลี่ยน (Trade-Off) ระหว่าง "เวลา (Time)" กับ "พื้นที่หน่วยความจํา (Space)" คือการยอมเสียพื้นที่หน่วยความจําเพิ่มขึ้นเพื่อสร้างโครงสร้างหรือตารางช่วยเสริม (Auxiliary space) แลกกับความเร็วในการประมวลผลที่มากขึ้น แบ่งเป็น 2 กลุ่ม:

## **1\. Input Enhancement**

สแกนข้อมูลและจดจําล่วงหน้า

* **Sorting by Counting:**  
  * **Comparison Counting Sort:** นับจํานวนตัวที่น้อยกว่าค่าปัจจุบัน แล้วนําผลรวมไปเป็น Index

ALGORITHM ComparisonCountingSort(A\[0..n-1\])  
for i \<- 0 to n-1 do Count\[i\] \<- 0  
for i \<- 0 to n-2 do  
    for j \<- i+1 to n-1 do  
        if A\[i\] \< A\[j\]  
            Count\[j\] \<- Count\[j\] \+ 1  
        else Count\[i\] \<- Count\[i\] \+ 1  
for i \<- 0 to n-1 do S\[Count\[i\]\] \<- A\[i\]  
return S

\*   \*\*Distribution Counting Sort:\*\* นับความถี่ หาผลรวมสะสม แล้วค่อยๆ นําข้อมูลไปลง Array ผลลัพธ์

ALGORITHM DistributionCountingSort(A\[0..n-1\], l, u)  
for j \<- 0 to u-l do D\[j\] \<- 0  
for i \<- 0 to n-1 do D\[A\[i\] \- l\] \<- D\[A\[i\] \- l\] \+ 1  
for j \<- 1 to u-l do D\[j\] \<- D\[j-1\] \+ D\[j\]  
for i \<- n-1 downto 0 do  
    j \<- A\[i\] \- l  
    S\[D\[j\] \- 1\] \<- A\[i\]  
    D\[j\] \<- D\[j\] \- 1  
return S

* **String Matching (การค้นหาข้อความ):** สร้างตารางช่วยเสริมล่วงหน้าเพื่อให้ข้ามตัวอักษรได้ทีละมากๆ  
  * **Horspool’s algorithm:** สร้าง Shift Table พิจารณาตัวอักษรท้ายสุดของ Pattern เทียบกับ Text

ALGORITHM ShiftTable(P\[0..m-1\])  
for i \<- 0 to size-1 do Table\[i\] \<- m  
for j \<- 0 to m-2 do Table\[P\[j\]\] \<- m \- 1 \- j  
return Table

ALGORITHM HorspoolMatching(P\[0..m-1\], T\[0..n-1\])  
ShiftTable(P\[0..m-1\])  
i \<- m \- 1  
while i \<= n \- 1 do  
    k \<- 0  
    while k \<= m \- 1 and P\[m \- 1 \- k\] \= T\[i \- k\] do  
        k \<- k \+ 1  
    if k \= m  
        return i \- m \+ 1  
    else i \<- i \+ Table\[T\[i\]\]  
return \-1

\*   \*\*Boyer-Moore Algorithm:\*\* ใช้ 2 ตารางควบคู่กัน คือ Bad-Symbol Table และ Good-Suffix Table แล้วเลื่อน (Shift) โดยเลือกค่าการเลื่อนที่ \*มากที่สุด\* ระหว่างค่าใน 2 ตารางนี้

## **2\. Prestructuring**

เปลี่ยนโครงสร้างข้อมูลเพื่อรองรับการค้นหา/เข้าถึงที่เร็วขึ้น

* **Hashing (แฮชชิง):** แปลงค่า Key ให้เป็น Index ในหน่วยความจํา (Hash Table) ผ่าน Hash Function ปัญหาที่ต้องระวังคือการชนกัน (Collision) มีวิธีแก้คือ:  
  * **Open Hashing (Separate Chaining):** ใช้ Linked List ต่อท้ายในช่อง Index ที่ชนกัน  
  * **Closed Hashing (Open Addressing):** หากชน ให้เลื่อนไปหาช่องว่างถัดไปใน Array  
* **Indexing with B-Trees:**  
  * ใช้มากในการทําดัชนี (Index) ของฐานข้อมูล  
  * B-tree เป็นต้นไม้ที่ 1 โหนดเก็บค่า Key ได้มากกว่า 1 ค่า และมีลูกได้หลายโหนด ช่วยลดความสูงของ Tree ได้มาก ทําให้การค้นหาข้อมูลในฮาร์ดดิสก์มีจํานวนครั้ง (I/O access) น้อยลง
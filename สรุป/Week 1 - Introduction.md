# **สรุปเนื้อหา Week 1: Introduction to Algorithms**

## **อัลกอริทึม (Algorithm) คืออะไร?**

ชุดคําสั่งที่มีความชัดเจนและมีการจัดเรียงลําดับการทํางานเพื่อนําไปใช้ในการแก้ไขปัญหาหรือหาคําตอบ โดยรับอินพุต (Input) เข้าไปประมวลผลในคอมพิวเตอร์ และแสดงผลลัพธ์ (Output) ออกมา

## **คุณสมบัติของอัลกอริทึมที่ดี**

1. **Clear and Unambiguous:** ชัดเจน ไม่คลุมเครือ  
2. **Well-Defined Inputs:** มีการกําหนดอินพุตอย่างชัดเจน  
3. **Well-Defined Outputs:** มีการกําหนดเอาต์พุตอย่างชัดเจน  
4. **Finite-ness:** ต้องมีการทํางานที่สิ้นสุด (ไม่ติด Infinite Loop)  
5. **Feasible:** เรียบง่าย สามารถนําไปปฏิบัติได้จริง ไม่ยึดติดกับเทคโนโลยีใดๆ  
6. **Language Independent:** ไม่ยึดติดกับภาษาคอมพิวเตอร์ภาษาใดภาษาหนึ่ง

## **ตัวอย่างอัลกอริทึมพื้นฐาน**

### **Euclid's Algorithm (หา ห.ร.ม. หรือ GCD)**

ALGORITHM Euclid(m, n)  
// หาค่าห.ร.ม. (Greatest Common Divisor)  
While n \!= 0 do  
    r \= m mod n  
    m \= n  
    n \= r  
return m

### **Sieve of Eratosthenes (หาจํานวนเฉพาะ)**

ALGORITHM Sieve(n)  
// หา prime number ที่มีค่าน้อยกว่าหรือเท่ากับ n  
for p \= 2 to n do a\[p\] \= p  
for p \= 2 to floor(sqrt(n)) do  
    if a\[p\] \!= 0  
        j \= p \* p  
        while j \<= n do  
            a\[j\] \= 0  
            j \= j \+ p  
i \= 0  
for p \= 2 to n do  
    if a\[p\] \!= 0  
        l\[i\] \= a\[p\]  
        i \= i \+ 1  
return l

## **หลักการพื้นฐานของการแก้ไขปัญหา (Problem Solving Process)**

1. ทําความเข้าใจปัญหา (Understand the problem)  
2. ตัดสินใจเลือกความสามารถของอุปกรณ์ที่ใช้คํานวณ และเลือกวิธีการแก้ปัญหาระหว่าง Exact (หาค่าเป๊ะ) หรือ Approximate (หาค่าประมาณ)  
3. ออกแบบอัลกอริทึมและโครงสร้างข้อมูล (Design an algorithm & Data structures)  
4. พิสูจน์ความถูกต้องของอัลกอริทึม (Prove correctness)  
5. วิเคราะห์อัลกอริทึม (Analyze the algorithm)  
6. เขียนโค้ดจากอัลกอริทึม (Code the algorithm)

## **ชนิดของปัญหาที่สําคัญ (Important Problem Types)**

* **Sorting:** การจัดเรียงข้อมูล  
* **Searching:** การค้นหาข้อมูล  
* **String Processing:** การประมวลผลข้อความ (เช่น หาคําในประโยค)  
* **Graph problems:** ปัญหากราฟ (เช่น TSP, การให้สี)  
* **Combinatorial problems:** ปัญหาการจัดหมู่/เรียงสับเปลี่ยน  
* **Geometric problems:** ปัญหาเชิงเรขาคณิต (เช่น closest-pair, convex-hull)  
* **Numerical problems:** ปัญหาเชิงตัวเลข

## **หลักการพื้นฐานของโครงสร้างข้อมูล (Basic Data Structures)**

* **Linear Data Structures:** Array, Linked List (รวมถึง Stack และ Queue)  
* **Graphs:** ประกอบด้วย Vertex (Node) และ Edge (Arc) มีทั้งแบบ Undirected, Directed, Weighted, Complete, Dense และ Sparse  
* **Trees:** โครงสร้างแบบลําดับชั้น  
* **Sets and Dictionaries:** โครงสร้างสําหรับเก็บค่าแบบไม่ซ้ํากัน หรือแบบ Key-Value
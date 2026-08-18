# **สรุปเนื้อหา Week 6: Transform-and-Conquer**

แนวคิดนี้คือ "การแปลง" ปัญหาให้เป็นอีกรูปแบบหนึ่งก่อน เพื่อให้แก้ปัญหาได้ง่ายขึ้น แบ่งเป็น 3 รูปแบบ (Flavours):

## **1\. Instance Simplification (ทําให้อินสแตนซ์ง่ายขึ้น)**

แปลงอินพุตให้อยู่ในรูปแบบที่ง่ายต่อการแก้ปัญหา

* **Presorting (การจัดเรียงล่วงหน้า):**  
  เช่น การหาความไม่ซ้ําซ้อน (Element uniqueness):

ALGORITHM PresortElementUniqueness(A\[0..n-1\])  
sort the array A  
for i \<- 0 to n-2 do  
    if A\[i\] \= A\[i+1\] return false  
return true

หรือ การหาตัวที่ซ้ํามากที่สุด (Mode):

ALGORITHM PresortMode(A\[0..n-1\])  
sort the array A  
i \<- 0  
modefrequency \<- 0  
while i \<= n-1 do  
    runlength \<- 1; runvalue \<- A\[i\]  
    while i \+ runlength \<= n-1 and A\[i+runlength\] \= runvalue  
        runlength \<- runlength \+ 1  
    if runlength \> modefrequency  
        modefrequency \<- runlength; modevalue \<- runvalue  
    i \<- i \+ runlength  
return modevalue

* **Gaussian Elimination:** ใช้แก้สมการเชิงเส้น โดยแปลง Matrix ![][image1] ให้เป็น Upper-triangular matrix (Forward Elimination) จากนั้นค่อยแทนค่ากลับ (Backward Substitution)

ALGORITHM BetterForwardElimination(A\[1..n, 1..n\], b\[1..n\])  // with partial pivoting  
for i \<- 1 to n do A\[i, n+1\] \<- b\[i\]  
for i \<- 1 to n-1 do  
    pivotrow \<- i  
    for j \<- i+1 to n do  
        if |A\[j, i\]| \> |A\[pivotrow, i\]| pivotrow \<- j  
    for k \<- i to n+1 do  
        swap(A\[i, k\], A\[pivotrow, k\])  
    for j \<- i+1 to n do  
        temp \<- A\[j, i\] / A\[i, i\]  
        for k \<- i to n+1 do  
            A\[j, k\] \<- A\[j, k\] \- A\[i, k\] \* temp

ALGORITHM BackwardSubst(A\[1..n, 1..n+1\])  
for i \<- n downto 1 do  
    s \<- A\[i, n+1\]  
    for j \<- i+1 to n do  
        s \<- s \- A\[i, j\] \* x\[j\]  
    x\[i\] \<- s / A\[i, i\]  
return x

## **2\. Representation Change (เปลี่ยนโครงสร้างข้อมูล)**

เปลี่ยนรูปแบบการเก็บข้อมูลของ Input เป็นโครงสร้างใหม่

* **Balanced Search Trees:** ป้องกันปัญหา Worst case ของ BST ด้วยการปรับสมดุล (เช่น AVL tree, 2-3 Trees)  
* **Heaps and Heapsort:** สร้าง Heap (Complete Binary Tree ที่ Root มากกว่าลูก) แล้วลบตัวบนสุดไปไว้ท้ายสุดเรื่อยๆ  
* **Horner’s Rule & Binary Exponentiation:** อัลกอริทึมแยกตัวประกอบ (Horner's Rule) และการแปลงเลขยกกําลังเป็นเลขฐานสอง (Binary Exponentiation) เพื่อลดรอบการคูณ

## **3\. Problem Reduction (แปลงเป็นปัญหาอื่น)**

เปลี่ยนปัญหาตั้งต้นให้กลายเป็นปัญหาอื่นที่รู้วิธีแก้แล้ว

* **Computing LCM:** แปลงไปหาตัวหารร่วมมาก (GCD) ก่อน แล้วใช้สูตร ![][image2]  
* **Reduction to Graph Problems:** แปลงปัญหาแนวลอจิกเป็น State-space graph เช่น ปัญหาชาวนาพาแพะ ผัก หมาป่าข้ามแม่น้ํา

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAbCAYAAACjkdXHAAABaUlEQVR4Xu2Sv0oDQRDGA/5pjE1MPIM7881csBMkyUWwsbBWC1t9AHshWPsEYpdC8EkM6RQFLXwBwScQ4p/qnD0xJhs9e8kPltvbb77dnZ0pFP4vjaQ+y8xby45cqP0JAQcgSgm0E2q51Gq1SCEPAFJSOgr1XERwIqSpNwtzO9RzAfMVM669GSwXof4rzrndKCoXGdLOzKS9ShQVw7gxXLVagqLr54DuZdcG9xbKi3Nh7BiO5VhYT/2c2G1/5oxH+y6FsSMwuxUS7THH6v+J0DLTq5XsiSyXMH6YKVF0OI4PvxYASszct8frM1FzOHgEItqEyhuxpKqaMmX1zUpl48UaZT30ZFgdDy34vJG0pofXzVAC0222gWJ/WBsA4RswVsP1clSZN3MXkJSFRhulmdRnINS0q965Hx5EWCIzXvqTY0bnW4hlzYr/bFdLxXIjxbu96sZAh95bnS1ftg7zjeIHnQ02mDAhjw+PgFX6iLPFTAAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,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>
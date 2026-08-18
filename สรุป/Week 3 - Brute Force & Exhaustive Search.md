# **สรุปเนื้อหา Week 3: Brute Force and Exhaustive Search**

## **แนวคิด Brute Force**

เป็นแนวคิดการแก้ปัญหาแบบ **"ตรงไปตรงมา" (Straightforward)** โดยอิงจากคําจํากัดความของปัญหาโดยตรง ไม่มีความซับซ้อน

## **อัลกอริทึมที่ใช้แนวคิด Brute Force**

### **1\. Sorting (การจัดเรียง)**

**Bubble Sort:** เปรียบเทียบและสลับที่ตัวติดกันไปเรื่อยๆ จนกว่าจะเรียงเสร็จ ประสิทธิภาพ: ![][image1]

ALGORITHM BubbleSort(A\[0..n-1\])  
for i \<- 0 to n-2 do  
    for j \<- 0 to n-2-i do  
        if A\[j+1\] \< A\[j\] swap A\[j\] and A\[j+1\]

**Selection Sort:** ค้นหาตัวที่น้อยที่สุด แล้วนํามาสลับไว้ด้านหน้า ประสิทธิภาพ: ![][image1]

ALGORITHM SelectionSort(A\[0..n-1\])  
for i \<- 0 to n-2 do  
    min \<- i  
    for j \<- i+1 to n-1 do  
        if A\[j\] \< A\[min\] min \<- j  
    swap A\[i\] and A\[min\]

### **2\. Searching (การค้นหา)**

**Sequential Search (มี Sentinel):** ค้นหาไล่ไปทีละตัวจากต้นจนจบ

ALGORITHM SequentialSearch2(A\[0..n\], K)  
A\[n\] \<- K  // ใส่ Sentinel ไว้ท้ายสุด  
i \<- 0  
while A\[i\] \!= K do  
    i \<- i \+ 1  
if i \< n return i  
else return \-1

### **3\. String Matching**

**Brute-Force String Matching:** นํา Pattern ไปเทียบกับ Text ทีละตัวอักษร หากไม่ตรงก็เลื่อนตําแหน่งไป 1 ช่อง ประสิทธิภาพ: ![][image2]

ALGORITHM BruteForceStringMatch(T\[0..n-1\], P\[0..m-1\])  
for i \<- 0 to n-m do  
    j \<- 0  
    while j \< m and P\[j\] \= T\[i+j\] do  
        j \<- j \+ 1  
    if j \= m return i  
return \-1

### **4\. Geometric Problems**

**Closest-Pair Problem:** หาคู่ของจุดที่อยู่ใกล้กันที่สุด โดยคํานวณระยะห่างระหว่างจุดทุกคู่ ![][image3] ประสิทธิภาพ: ![][image1]

ALGORITHM BruteForceClosestPair(P)  
d \<- infinity  
for i \<- 1 to n-1 do  
    for j \<- i+1 to n do  
        d \<- min(d, sqrt((xi-xj)^2 \+ (yi-yj)^2))  
return d

## **แนวคิด Exhaustive Search**

เป็นแนวคิดที่แตกยอดมาจาก Brute Force มักใช้กับปัญหาแบบ Combinatorial คือ **"ต้องค้นหาหรือลองทุกเส้นทางที่เป็นไปได้ทั้งหมด"** เพื่อหาคําตอบที่ดีที่สุด

1. **Traveling Salesman Problem (TSP):** หาเส้นทางเดินทางผ่านทุกจุดแล้วกลับมาจุดเริ่มต้นให้สั้นที่สุด ต้องหา Permutation ทั้งหมด ประสิทธิภาพ: ![][image4]  
2. **Knapsack Problem:** ปัญหาการเลือกของใส่กระเป๋าให้ได้มูลค่าสูงสุดโดยน้ําหนักไม่เกิน ต้องหา Subset ทั้งหมด ประสิทธิภาพ: ![][image5]  
3. **Assignment Problem:** ปัญหาการจับคู่งานกับคนให้ต้นทุนต่ําที่สุด ประสิทธิภาพ: ![][image4]

## **Graph Traversals (การท่องไปในกราฟ)**

1. **Depth-First Search (DFS):** ท่องไปในแนวลึก ไล่ไปจนสุดเส้นทางแล้วค่อยถอยกลับ (Backtrack) มักใช้โครงสร้าง Stack  
2. **Breadth-First Search (BFS):** ท่องไปในแนวกว้าง เยือนโหนดลูกให้หมดก่อนลงไปชั้นหลาน มักใช้โครงสร้าง Queue

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAaCAYAAAAXHBSTAAAE1UlEQVR4Xu2XS2hcVRjHZyYpqLFJSzqTydzzvc5k2qYrYxKxFFyoxYWloUawEl8bK7gQKdRkIypYcSFWSLvQCpJsKqgLN1pQtEWw2FVX1brQxlfBohVaIzbR6/9OmOHOyTtNcJNfErj5/nPueXyvM5nMOmuLiTyvqm8qybNdlcrGUP/fYO/bjPmm0L4YIjYqTJ0zz7KTlf9u1GXZ75yFt3KBlUo4ubZQmw+c9D7v7cOydS15TA1hfk3K5W3VZ5ISNnExrbtS5Ij5/rRtyZS9biXW94j4M1MdJ6GLzPx7pcsvGA5Cto+IzqlXCbWlkKv+zoD5+rCpa2k9wZt8KyaDoX0Bss2s7hlmmVKx8bTCUdSvTieIqS9tT4PT/VodD4X25YKdZXEwR9jzhVAj0kcxzzdelUNtTlh1mFljInmrt7enOdSx0QvQrqi3/lADWRM7o95vCoXlwqaDKnQO3qqEmpXLbYicM9jT8VwmtyHUG8DJtIlwDJe/HGo1hNxmJT3LojGzvZjWlHkYY7enbSsBeXWMo9Lm5Dmikgv1BGHZjtT4zbO+EGoNkNPdyId/lHV3qKUxkuNYfMxkZ2u2jnzHRizm9LZKd2v6s1WyuSzeu6Wj0FHPx57+ng2odIX2fHtDjpogFoyfRDEYRAo8hDB7J63XqHR3tzLxFzjIU6HWAFw6jNC6Kqa3YRFHnM7eHErPPaqUeCRWpqs1Ow6ijLG/pD+b0N/X12zEo6b8JYrIlBAdNPVvYPxPZPKzKE9731U/CIT+26oSwxOIBI4xLk6/Lw1CdAxrvhTaGxDVMRH9ARMWvcg4Ti0mxZ9ZTGIxPJRMtBd/e5JNmUl9QhbeBdt0+n0Jnv1+bGa0a2ul1ZQ+J5ErEdFAJoufqq5PYJ6nwnFLAesYQbT8FdobQH85jIVdInaGgjHORI8zU5GFiknPwEuKwm4PwmyomnvMU7WxaJLVjabfV7UTD6PHbUY47cKGph3LybSO0vyKmF/ZpmjuORuIIjcgxJOO5I5QSyOsh2fCQydqNlbEv84/AXrLgeQg4PmRmq2Qz7eY2WnkxbwtYiGSqFl0U8hQg0dir3wg1Gqwi25xzB9Xc0roRM3unM4/QS7TJEIfwP3/IlfreYqCsBNTXqeIVnT1gfcfmHfONKj9MTs+6Xjuicjx7QjTP5HMkw7PdbvIvJsquShiQtMmmSiVuFSzs9pLiceTZ2z4Ltz56u9bCrjxjKAIzTlnA+oFeaOfoipdh3sfS2uFfOetSX9CBTuEfxsas5WtA5v6Do+zmiGKz8GqZ1XquWOmFRa5rCKniOUR6Efh0qbUsIXJ5ZpF6X2MPx9Kc+I4uhmheAgne41En0ZlexALexVJ/QcWcHf6flYnm2mCt94tFkvtoYSyPIawnkTZr+cOil8zQu8o8uky2sQJPM/ubwuA/E8u2d8jYUZDbUH6e3ubvdh+bGYIt40BhIiFn0mDUHoYBWNWb8tvaW/B15DqDSEgVyo5HEK2Wt6XA+a6F6kyhUO5L9RWlXKlXCC1Y5nEEWtLFo17lIS/8l5v+J65KMiNX9HbdoT21cSx7sA3iR+RHntDbU3w5jehH30ipM9l1sBjuVwmi4LzUdcqfBNYFoXOfItz7nUz6gm1GwW5dGdnR7EltK+zzjprz3+z1QcPeauPRgAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAaCAYAAAAAPoRaAAAFjUlEQVR4Xu2XS2yUVRTH2wqFKhVoZ/qYued1Z4qoUTIzNJqgxkQXkkA3xo0QXxtMkIUSH2Fp0gVLMUKiYIqJCNGVQk0kJoSYII8lNcZVK6BsMAShEQTG/x39vn69tYCmaTf9pZPpPefc77v3ntedpqZ55pkRyuXS0lpt9YJYPhuo8qJ8Pn9PLP9fVKvVBSWzbhPr7cznlsT6GBPZzMQ7KpXqwlg3G+D9KsxHY/l/ohl/JHyMlcdZ9QxO9KyI/OmYH4tts5DQib6+Uj6Wzybm/SNm2h/L74giOVKTL73KQEtTSxq+RIUOZr6OQ3g2a5/ArlBW556O5bNPczORfFsq+aWx5paw2CoRHsP3iVgXIJHTLPybMVey8hApiI73CsXC3Vn5XEGqP4v5TbF8WtjbUeR2HWmzIdYlqON18HxdxU7i/2WJHKmxRc1+zdrOJd7rWhW9pqp3Fonwal1Ivlev6aZiVGR92Dw+YyLU05CxtpnyMMaHY/tAvqtriVddnowr/ZWFZtKFA1yctUvI5XKTqrWIdeU6O9uTMaKspVjo7ejtLXZg0Jy1TRDHnsR+MZXBWDcFgcvDplDkNse6LMz0+t+b51FRLQQZoRhANoon7InthfQN9f4n5OAVdIGdmLMdRfEsDvocMTxj8n7GvBnP2Cpql9m5neVyuR3e225msLcbzLqr5H0rDm6UHY/BUZdh/2NmfsqKFfe1K9F3WO9BzFsU6ycBg43Y0EUhejDWZXGOhhqbNztFThrexKaqkIWu8E5sD/lXmJNjtr3Y8A02fTHUh4bOaBur3ExsyXA0Sp+L+E/EUFiZR9j7l4IO9WQbk9WVeXe5r68RBU6kijlXQiQkz0hpabpLlL8goxFXcNN3ny6EJU7xCEJ6X8s/C5sOYb2JBdSxoYFEhnGjDmDpqSwBG7if0QaIbEzVTmZ1CLY9SJl6OmZ9AfYPEOko6scpJZemn7LtMaOb6u2ZRIZoegrvTQ8vBhEER+kFRM/KWJeCnGzHCR7B4vbGuojmsEl48bhZeaLYCaMOKA6Ep2w+AHeuQVRcY6GPEhkibbmFDTKPZkwbUCi6JruTMaKxo2GLVCkUi5TIkaeD4b3JOAbvRATJuGOpxboUFJ42POiQGQ/FuiwoaDWE7Q3k+KQK6lgHGofidF1WnoDNvwWv1jHv+USGza/BnOssMpQxbWCh9hBtTMalkj2MlLyE+jHsvbQFmfelZZAdQzqcm5g5meBMEzpD5FysmwRCcBALGsbD/rUC57vy7cryDRb8dpwakD2OzzUUoq1ZeQBdYDHum8NIq9+9+lUTctoBz6CI2VpEzHPQNzqHeV2EVLjkcd9IbFEgN6Di1011WyJDFDwKr19Fqu03tYdQd9YkugT28DzjzkLSG+smg5bBCCFi/qynO5/e4ct9pXvxor0ocH+gE2zJTkko9PTmUMx+MJJ9sQ7egYct3ArTToCDXslmF+D1T0OxQh6/mrXnjG0ARfEkDmkUh5R60MwPYVPnCVVQiQ/k8hOtMFDo6cnBkSP4pOlzS3BKr6nQODaKHm6DCNf98NpVpMUBLFhj+4QQCbjzf4zWcjrWIXxfabRQovWJrFbrb8XzPkSknWeWQ7VKpTXRCdPLRdwlknEAvfqcMu3DQaU/lhA1Awjpi3DIwdCls/YNvXNVRMw49Gn63BacVBt675N43sbw3R1dOKZDijyANnU1ltdqlYVMrrNpajtqKTjXyZ7Ty0+gtrrWGqcVFYqdWM+UdMznu5fAUY10iUHqbEKansVhaqybcayv1IVwHYnlcwWK89dC9kHTbVr3jIGo2YAw1lg+F+CnOFJXbnlhm3Fwhz8s0/zknQ1aAIt7s9rfn9aRWQN1sRfFZlfBFYuxbjZAu30CF6J3Y/k888wzT+AvoPwzBrq/eKYAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAaCAYAAAD1wA/qAAAErklEQVR4Xu2XTWhcVRTHZ8amNNpWS2Ymycw9X28mpNFFmS9c1IKgRZE2G3FjC4KbCtWFCq3oSrSLLm1ARam0BasiuFAsQoSWbtSkyyjUVaMtdlMRbIsNjeP/vfqmN3em5sO4kfxImMz/3Pfevef+z7kvmcwa/3Oq1cq9jUZzXaivlEI+vynUlk29Xl9XMRs0seEw1gsT2c/ER2q1el8YWwqOeTsx78jkMnelGhOdKTM3/XFLJosfEv6Gla+z6s+qfDEym8KDHgrH+pDQ1MhIpRDqS0VF2qbcNrMnOprZg2x83kxa/thFKZMjNfk8UhnPZXIdi4jJZ8x8U0Se9MensCtV1blHQ305iHAb92+zyC5Pzonam8QyWalEmz39zrDYNtxsFp9TYaxSqRZJZIaFfzXmmh+LdxC79lapXLrb15cLFnHt1kLocV8npohUZlV1n6/3hCM7i1pARnRPGEtRx7viB6nYNP6+L9VhvxdggV/8sStBmC8hkVdU6P4wpmqPGeuNUO8C2W4LybcaaWeCIfDw7ngh+J0VoaFEY+2Hr0/h+2Q4PqZQLG6MVLek32utWh/8XkQyNvjjYkz0J9z7gqh2NRdlRi+xy6G+APjf4gmiwPeHMR9mevHWQjh+WCnWiKiUPNzkaDheSF/SKPqRSK6hm72Naw6jIVxE0i4R61yz2VzQ3VTltKhMO3ZdyRwdHd0oRGeVpSsBHZh1Lyb3GwY+EMZSctlMzjk6lizE7Bw5SbKMCdahxd3tlfAa6F/gmjySeRyTn2fTZ+J6SmJGrzLJguaAOvtamE4X8gMbfT0hm+tDF/3UlUoDYSihiK2Hpc7ANidzfz+kF/DvI8L6J7a4jcmNpzq+J3WDbHe0FFwzxmhnRIZCtWk/BhMcxZmxM9AmhKPjvuaDexxHEreGegI8vIkMC8GgMOaDxU4kHYXtO7Pq7UIXRt0oFsddC4lBp9mO3ZpDJ3o/1eCALTgrzjmisj8W9z8IG77maz7M0TGcZfVQT0DR9aNAvjTjY2HMB4V4FdaYR00ssINjHU8W6NTv/R2wkAPoNm1c93SqYSHbcc1NGDYXjB1DIxjzNR8k+4QrOxfqHbClh3DzU/Boz0IqFAubhJNudTC0H7Qd+J3DBF729Rh0sw0q6Ggkv0cabbut0xHs0nwmm12HnXwK8aQDLgYaxwnY+x/GZjNZhj3g2Y+GBgudQquOVDajdmJf/hFmL6U0NJxHIf9gJCfDGBoIMm/x20CnoyFpW9nsCk7vD2HJ1zWy59IYzqL4VMfu3q7BFDc8NICkfB/qXaAwn8dBdB2Txhlhh7DNH+PCG7DeJ3i4huNT4h2Cbz9QopkwBjs9G9sOn7tTrdForcf93oMDLpvp4Uattj6NYQdnmOV8NYpGUy0FO9dEp7sa6j2BtfrxnvUwzoS98edgPn9POKYXUuZxVeo6dRuNWh+Ti9tluJu5kkv0JYOk7sPhezHUVxUbqRRhicW3fYWgg/fDLV+hKU2EsVUHu7kHttBQXw2YdKdTxcusdr2D/SfgnWpS7vCav1LwWnTAsbxbb7RW7b/ORUFPGGbn3im58oKD7t+gpm+0WvVOQ1hjjTVWxl/L4v0eHjW23wAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAZCAYAAACclhZ6AAAEwElEQVR4Xu1XXYhUZRg+57i7GLYlrjNjc877981opoLsnllNogj6IaGUMArC6/CiulBYiG7sxqsMLYRiy9aIfqi7/n+glKCSvTAiMPvBDTUpMoxdL6KcnjPumZ35drPZdqWLfJgDM8/7nfd7v+993+f7Jggu43+AvkKp1+fmCqFkcRCEXT7fMdKBtMdUlvUtLXYcnFNda07Y5+cKFhli5n21Wq3Ht10MoXNykxB9KqwTLHaAlY+TyBk4201Cy/wXcohV2Ey+8PkgDBeUy0nCTm9msuz9Ba1mEUOsckxZ7hHlffj9PObeEURBmI9J04EeVXoG/ofTwf7OMpQw7zexuqi+sKK64qqMi4IoYtUNSaI/CPG4/06G/sG0m8ReZdY9vk1MjyrrSRH6GVHXEfvZKAqjpj2Rh4nsdWT1a7OKZBwTHSyUSoumvAQBxeUKqXyLOba08jOChG/HDv2p4jb6tkl0IZhXRPhzVb06J5lpIZG+a8wvB2HU3LUIO0tq+1jlhpzLgKw/iIUdFdFSzinJGJmtyr4Xi8VeIRmaemMKLLTalH9Rtft8WxuI7SlROQ1HzrflQNa2K/FEHMe1nEO21gjpr1jg1taxpVKhl5U+UraDfcWlzV2mmGtqfF5Vbm1yJIdWXntdoxJUeUNCtEbVray6SnPTMsQUL0xI3sF8b7Xy04AdPACnx7Fz1/i2HMjCJmSvjlRvyjnn9AEVOmsVW9s6NozCEAvciz57GknqznnhpJb5oEkfYRh1C/Pe3G6m211leYmUH3cVtzjnm3axXcjqjz7fBjTes0R0krAtvi0HCw8p0+8QhRtzDj0wguC+N+eaZZMjbHyCZn9kwEbchuyPo2TS7PeyctKHee/K7UlMm4VtNwSnYfeBd+/GfOd9vg2V6vJStmOQ422+LQOytgQ9M+rU7Wzjzb6D7cXgQuAXBYTgeswx7sz+tXwnLCn6dkYhagO0tY4yexPlcYVvQxBZeUxUK8vbAgF3HPV9oJWbCWrwqnYMQvylb5sNoGhZHOd8fhrYyfsQgVPYwWkiQEYPoTfqPg/HY8wy4vOtwCIWozQ/gPwewvdp5TgbJMIDHS3GhNeZ0DkVub+Vj2PIL/N7KKc3WvkMFzKjf5uZ2kB/F6R4GAfha85VGw0N0VjPFMf+2E7wj4tZAVkUs5fwNURW9hAn+yEzzR7AobYKAX+TZKVmsh3KtyO3wfEoFObDYqlwZc61AtX1CBMPl4kW5hxuFM+hkde1jusUUL5sMRM+3wZkYwh1fQo7eAKy+JMzbUotlO5RPONovDEzO2NMK3MbmTzJJCdw9kxTQYjJFvR6HWOyXqxnAjP5HIYyTpPdTmCm24z1N59vA4LdiFKqQzIxmU3gRjCQ2yAMw9YIiPHIYUp0SW4jijebyB+4fd2ScxkKpcIijP2YskVQdjbBN8MHE84YedsxNzPVOcIoSWQEd7hR3zIvwCLKRjSG82aXb5tvJOW4gHviVyb6mG+bL4S49u/Bbn1m1WrjSnKpgPK8A2JyGs9q3zav4ES2QhyO+Px8QZzeC3E6Up6hN+cdg7VB/OfgnWk6OKs/UJ0ANwa4tk+gqOt92yVDmqY9uG7c6fNzhYo+4UT6ff4yLuM/wl8qi/6G8RBFbwAAAABJRU5ErkJggg==>
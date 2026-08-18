# **สรุปเนื้อหา Week 4: Decrease-and-Conquer**

แนวคิดนี้คือการทําปัญหาให้มีขนาดเล็กลงเรื่อยๆ จนแก้ปัญหาได้ แบ่งเป็น 3 กลุ่มหลัก ดังนี้:

## **1\. Decrease by a Constant**

ทําให้ปัญหาเล็กลงทีละค่าคงที่ (มักจะเป็นการลดทีละ 1 หรือ Decrease-by-one)

**Insertion Sort:** ค่อยๆ หยิบข้อมูลมาแทรก (Insert) ลงในตําแหน่งที่ถูกต้องในกลุ่มข้อมูลด้านหน้าที่เรียงแล้ว ประสิทธิภาพ: ![][image1]

ALGORITHM InsertionSort(A\[0..n-1\])  
for i \<- 1 to n-1 do  
    v \<- A\[i\]  
    j \<- i-1  
    while j \>= 0 and A\[j\] \> v do  
        A\[j+1\] \<- A\[j\]  
        j \<- j-1  
    A\[j+1\] \<- v

**Generating Permutations (การสร้างลําดับสับเปลี่ยน):**

* **Johnson-Trotter algorithm:**

ALGORITHM JohnsonTrotter(n)  
initialize the first permutation with \<1 \<2 ... \<n  
while the last permutation has a mobile element do  
    find its largest mobile element k  
    swap k with the adjacent element k's arrow points to  
    reverse the direction of all the elements that are larger than k  
    add the new permutation to the list

* **Lexicographic order:**

ALGORITHM LexicographicPermute(n)  
initialize the first permutation with 1 2 ... n  
while last permutation has two consecutive elements in increasing order do  
    let i be its largest index such that a\_i \< a\_i+1  
    find the largest index j such that a\_i \< a\_j  
    swap a\_i with a\_j  
    reverse the order of the elements from a\_i+1 to a\_n inclusive  
    add the new permutation to the list

## **2\. Decrease by a Constant Factor**

ทําให้ปัญหาเล็กลงโดยการหารด้วยค่าคงที่ (มักจะลดลงทีละครึ่ง หรือ Decrease-by-half)

* **Binary Search:** ค้นหาข้อมูลที่จัดเรียงแล้ว โดยแบ่งครึ่งข้อมูลแล้วเทียบ ประสิทธิภาพ: ![][image2]  
* **Fake-Coin Problem:** หายเหรียญปลอมด้วยตาชั่งสมดุล โดยแบ่งเหรียญออกเป็น 2 กองเท่าๆ กัน  
* **Russian Peasant Multiplication:** อัลกอริทึมคูณเลข โดยนําตัวตั้งหารสอง (ปัดเศษทิ้ง) และตัวคูณคูณสองไปเรื่อยๆ  
* **Josephus Problem:** ปัญหาการยืนเป็นวงกลมแล้วฆ่าคนตําแหน่งคู่ มีสูตรรูปแบบ ![][image3] โดยคนที่รอดคือ ![][image4] (หรือใช้การเลื่อนบิต 1-bit cyclic shift left)

## **3\. Variable-Size Decrease**

ทําให้ปัญหาเล็กลงในขนาดที่ไม่คงที่

* **Computing a Median and Selection Problem (Quickselect):** หาค่ามัธยฐานหรือลําดับที่ ![][image5] โดยใช้การ Partition (Lomuto) แบบเดียวกับ Quicksort แตกต่างที่ทําต่อแค่ซีกเดียว  
* **Interpolation Search:** ค้นหาข้อมูลแบบเทียบสัดส่วน (คล้ายการเปิดสมุดหน้าเหลือง)  
* **Searching/Insertion in a Binary Search Tree (BST):** ต้นไม้ที่โหนดซ้ายค่าน้อยกว่า ขวาค่ามากกว่า  
* **The Game of Nim:** เกมหยิบก้อนหิน ผู้หยิบก้อนสุดท้ายเป็นผู้ชนะ

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAaCAYAAAAXHBSTAAAE1UlEQVR4Xu2XS2hcVRjHZyYpqLFJSzqTydzzvc5k2qYrYxKxFFyoxYWloUawEl8bK7gQKdRkIypYcSFWSLvQCpJsKqgLN1pQtEWw2FVX1brQxlfBohVaIzbR6/9OmOHOyTtNcJNfErj5/nPueXyvM5nMOmuLiTyvqm8qybNdlcrGUP/fYO/bjPmm0L4YIjYqTJ0zz7KTlf9u1GXZ75yFt3KBlUo4ubZQmw+c9D7v7cOydS15TA1hfk3K5W3VZ5ISNnExrbtS5Ij5/rRtyZS9biXW94j4M1MdJ6GLzPx7pcsvGA5Cto+IzqlXCbWlkKv+zoD5+rCpa2k9wZt8KyaDoX0Bss2s7hlmmVKx8bTCUdSvTieIqS9tT4PT/VodD4X25YKdZXEwR9jzhVAj0kcxzzdelUNtTlh1mFljInmrt7enOdSx0QvQrqi3/lADWRM7o95vCoXlwqaDKnQO3qqEmpXLbYicM9jT8VwmtyHUG8DJtIlwDJe/HGo1hNxmJT3LojGzvZjWlHkYY7enbSsBeXWMo9Lm5Dmikgv1BGHZjtT4zbO+EGoNkNPdyId/lHV3qKUxkuNYfMxkZ2u2jnzHRizm9LZKd2v6s1WyuSzeu6Wj0FHPx57+ng2odIX2fHtDjpogFoyfRDEYRAo8hDB7J63XqHR3tzLxFzjIU6HWAFw6jNC6Kqa3YRFHnM7eHErPPaqUeCRWpqs1Ow6ijLG/pD+b0N/X12zEo6b8JYrIlBAdNPVvYPxPZPKzKE9731U/CIT+26oSwxOIBI4xLk6/Lw1CdAxrvhTaGxDVMRH9ARMWvcg4Ti0mxZ9ZTGIxPJRMtBd/e5JNmUl9QhbeBdt0+n0Jnv1+bGa0a2ul1ZQ+J5ErEdFAJoufqq5PYJ6nwnFLAesYQbT8FdobQH85jIVdInaGgjHORI8zU5GFiknPwEuKwm4PwmyomnvMU7WxaJLVjabfV7UTD6PHbUY47cKGph3LybSO0vyKmF/ZpmjuORuIIjcgxJOO5I5QSyOsh2fCQydqNlbEv84/AXrLgeQg4PmRmq2Qz7eY2WnkxbwtYiGSqFl0U8hQg0dir3wg1Gqwi25xzB9Xc0roRM3unM4/QS7TJEIfwP3/IlfreYqCsBNTXqeIVnT1gfcfmHfONKj9MTs+6Xjuicjx7QjTP5HMkw7PdbvIvJsquShiQtMmmSiVuFSzs9pLiceTZ2z4Ltz56u9bCrjxjKAIzTlnA+oFeaOfoipdh3sfS2uFfOetSX9CBTuEfxsas5WtA5v6Do+zmiGKz8GqZ1XquWOmFRa5rCKniOUR6Efh0qbUsIXJ5ZpF6X2MPx9Kc+I4uhmheAgne41En0ZlexALexVJ/QcWcHf6flYnm2mCt94tFkvtoYSyPIawnkTZr+cOil8zQu8o8uky2sQJPM/ubwuA/E8u2d8jYUZDbUH6e3ubvdh+bGYIt40BhIiFn0mDUHoYBWNWb8tvaW/B15DqDSEgVyo5HEK2Wt6XA+a6F6kyhUO5L9RWlXKlXCC1Y5nEEWtLFo17lIS/8l5v+J65KMiNX9HbdoT21cSx7sA3iR+RHntDbU3w5jehH30ipM9l1sBjuVwmi4LzUdcqfBNYFoXOfItz7nUz6gm1GwW5dGdnR7EltK+zzjprz3+z1QcPeauPRgAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAaCAYAAADYMiBQAAAEqklEQVR4Xu2YS2hcVRjHZ8ZYMaY0JHNnMjPne91JY1VUzENBDRFEiNIHbdOV1lVpg+JCxCY7FVQEd7oQBF8LdxYXxVJQaSJdaNexLiUJpBuNCx9guxj/Z5KZTo4xnZmkaS33B5c79/vOPbnnO9/rJJW6RRgaHtmBWyaUJ2whMes7anRF2C72FVw21CdsIczcrSIXYuXjoS5hi4nL5QdFdYlUHw91CS0S5bI7zWyEie4PdR5lfU6MLhaLxShm2SOOZkx5LBx3PRGiOccyj/sVjfn1UP+/gEXfNeFlYrdATH8T6ZcqcV/jGHXyCRZ5yjh+hJ0eV+OKCD3TOOZ6o7EeiFW+Q92osKMDof6mJ51KdcCIH3GJ7vTPzK6TRSok9LWZdtfGidkF5O1ZVncUL6XZ8ejw0EMd9YmapFQqUaHgolDeDFEu3yViM6L8K6vcE+pveoRpn8C4qrK3LhP93Mtw/woF8Q4vY5O5YrGQxaY8rKLzrgTfguWuztQc2MwpFbcvlDcDCe9f+S57P9Sti3PFXnhGvU/tL1vU2xvd1ThmO2Hl+8R4GW3dYE2GQvipXxQTz2SjlW+D93+B2+1OeQgp5CdifkGIrT5RkyAypoV5fyhvBmN9Cw5QwTcfCnX/wsQOEcmymJ5xjnpM5EVGwieTy1jc6f64f1f4znYA41ZTSA0UyTNmMLbjj5Fm0vlcrgvfeszrSlTC59r3WPRkuo3DDTNNIde35dkqdA7t5zKZbpxCyv27I+S8s9iVKXhJBdePKEiveZ2YHERoIJR1MnwvoCMWewJ/dALhP6HKR4TdBOY9rAqZcu035HQYG3nE1DSc5FqI8G9wisvoOEavSjP1/Dw4PLgDZm7Z0B4YexrfWE9ZrSAkSyw0m8tHO0PdGuAt4xqXx9RkFl6yJM7FNR126+VqLor1Bh8YMih89KoZv5Jpw2sbyUe5LlEpoMspGlEfNr8AhypinW9iM59XEsilD7aAnPuy2WsYMFW1U4WohahAW3UJk3+bz0edq6IO5MxTSvSHsAyvGbzNID1MYEF/tZMeQhClb7BDK6m0gDw9j2sRz4tM8iciGd0ELTqmeRRMr1uIVU+EczTS6zfP+BdSuzfU/Sfeg83o7dqzIyqjyl4ystko6r1hhbJsMmKiP6PoVUMcHVoPiuCj+Nlye7cRQnoS6al571wFKdeQHWCjXPM2glf73Dxee0ZKnUTb5duZl/zzRjtXcqVOx+4s3q8YLvFXtRVC6yYrv5GmVuWGMShyrAfDeUJKrrgbRes8cuJjNRk8bpTFPkRLvWkvbwQ1Bt0ItdyNMNo+FG3f8mVwuBmPBwY2/mcY8pSx8TeFqFBLIT5053BgOD8wcHcXCtrRVPWcsX1Yub9bCMV5ddPWXCzPhuM3CxqEk9jINjyb30PRHoYTPQ2n+CCVTm8ccdidMXI8vUbGPIXj8u9Y7Gl462eNuu0AtWIvjOoNiyhAl4TIQx9cQfHyUfFUOH6zwAbT6KZa7kYkLj8A+/yAtu9c2WIO9euQuS2zTg4UjXehyvb4njbU3Wqody6SltOIR9HZIEVWT7QJTRCbnEDEPBnKExISEhISEhISEtrgH5hP/TajV0dJAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAaCAYAAAD43n+tAAADOklEQVR4Xu2WO28TQRDHfc5DURIJEeti+3zzulAgGhRHaSJBRUGRR4FoEBKiQnyC0NBSQREiCioSSh5fICKKBUUkqlTpk/AQ4tEQGoIw/7Udx9m8bAWQEP5Jlm9nZvd2dmZnLpVq06bN7yKIC4UBEhozMfaVatYjSg+YdQM2b03krG/zN+BC3BszD/nyPWCTy0b2UVXeMMsPY5sNBwd7G0w6lPkckUyLyFZUyGcadH+c4ZFiNwlfELEVFir5+l0kppIkycUgnU67cUxxQVjLZro4ZHai0VZIpuBQOUingkb5URSiKKPKZ3x5M4jpDSIqm/BX925VXfJt6uSz+X5iW2S1NRjntuUm+qoyWeR5Kgi6nCwMB/tZeAnybzsrNAcOaNJM5n15KyjJhNuTiJZ8XQNBYEJ3WWRhMMz0b0tJpFRz6EU2l62kHsanjfQTi73emd8cwgyHeM6XtwKJVhzSwx1KudxxuVZJt23IbLV6GjSzLcPduuJkrDTbaNsMHCNCiR4rQnj/ZC3lSr7uSET5J5l8wZ0ZrsuMZipOmlxttG0GVMdxPWaEYqRt9ZDl4DvkUxwd7WaThyLx5SAV1KMGB4tYaJOZl8Iw7Guc44NInFThPNIsb0Q5HEqE+ddwEM9QTXNYJ4eKGQlszCx/KhnK+mvsB2v1DqGFlHzd/qSDDoTzFtrQB1+FKlNJN1W74+t2kU53EPE9OL5GzOusvIbfhqh8JtPvWpWtxxxvODmx4Jlf+svsh4tyLUIlX7eHAOGIWaZR41eiuNq44gJlmOMxVPMuJnrkFoNsyp/bDBrzOBr2nC9vBTheTblm7pCaXE9YF3Bq9dKtShMYz7lnlPZVlN33aG4JKmAeudhZn9wEivxPEp3z5a1ANYdU7PA7JKSXaqHc/WNUNGzE2SjxVsIyj4j1sNlTf42jwDsmkmP0oeLISCcO5KbblzEt+/o6YTbsw6Utwfsy0q2M0y/j8wb/bqybuIhFZwfnngjRO0IUYXPfX+coXGNNatFuFVQ3FAN8KWCP6JloG1omw7PZUiaTObRAHYjrU1FEA1EhyqQrras1cAeRvvrYl/+zMMl5fI3c9uVt2rRp0+a/5hd9d8IZlF9qJgAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAcCAYAAAC3f0UFAAABX0lEQVR4Xu2QsUoDURBFk8WIMdGAcXez7pu589YYsTOGCNYi2NhrYyf4BeIHaGMv9pZCWpsUwUqInWBpE7FNaWGROKsYshs/QMFTvTdzGGZuJvOHAew6w/QIeIfFcbqfwJilMoAHEbwx0Wa6P4HKXZ38bK346d4EKvdBaGWyTi7dm0DlISAn6fqPgGggwttjJWejXp8a+3+xVlstAvwShmTiP4VowtpHgG49zyskZGPMnsrnOn3LCl0YDvMQ2mXCfTVaLiVkjexMd76xRJdeUJmNa81GY9rCLiXEil8pEFFbjxtai64FH1AY5hPSN9owusIrG1oQ0BFbDDTvq2zWmTxORHZUHsRv1y0Xde+O5t1j5kAYh67nzo1kBp/GGcfvRc8v6CodTeEpCE05kuiaRWY+xWzGyYGkBUY//lcCv8iCtk6+W6nW5gV2fzQ1BlZKEnHiIN8vFzUyd7z2zy/kA0sUPxPeNC6BAAAAAElFTkSuQmCC>
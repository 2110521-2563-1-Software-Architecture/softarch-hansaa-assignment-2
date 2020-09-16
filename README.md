# softarch-hansaa-assignment-2

### Members

6031035821 Budsakorn Khosagrid  
6030097521 Janejira Aroonnual  
6030090021 Chirapa Peisiripatana  
6031036421 Palmmanee Thapphachaya  
6031038721 Prawsang Chayakulkeeree

## 1. Graph showing the benchmarking results with the explanation of your experimental settings.

#### scenario a. Single client with a small call to insert a book item, a bigger call to insert a list of multiple book items.

วัด response time ของแต่ละ call ที่มีขนาดของ booklist ที่แตกต่างกัน โดยแต่ละ call จะทำการทดลอง 3 ครั้งและหาค่าเฉลี่ย

![Graph](https://github.com/2110521-2563-1-Software-Architecture/softarch-hansaa-assignment-2/blob/master/Image/Response%20Time%20(ms)%20of%20scenario%20a.png?raw=true)

#### scenario b. Multiple clients with different kind of calls

กำหนดจำนวน client ที่จะทำการทดลองในแต่ละครั้ง จากนั้น fork process เพื่อสร้าง client จากนั้นทำการวัด response time

![Graph2](https://github.com/2110521-2563-1-Software-Architecture/softarch-hansaa-assignment-2/blob/master/Image/Response%20Time%20(ms)%20of%20scenario%20b.png?raw=true)

#### scenario c. Vary the number of concurrent calls from 1 to 4096 calls

ทำการทดลองโดยให้ client ส่ง resquest ต่อไปเรื่อยๆ โดยไม่ต้องรอทำหลัง response ของ request ก่อนหน้า จากนำวัด response time ของ client

![Graph2](Image/Response Time (ms) of scenario c.png)


## 2. Discussion of the results why one method is better the other in which scenarios. 



## 3. Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance.
Language neutral - gRPC has support by most popular languages and platforms but Rest has support from nearly every type of environment.
Ease of use - In side writing code, gRPC is simpler and faster to implement compared to REST.
Performance - In overrall performance, both servers are fairly simple.

## 4. Does your results comply with the results in https://medium.com/@bimeshde/grpc-vs-rest-performance-simplifiedfd35d01bbd4? How?

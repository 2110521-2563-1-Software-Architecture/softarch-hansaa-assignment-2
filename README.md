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

![Graph3](https://github.com/2110521-2563-1-Software-Architecture/softarch-hansaa-assignment-2/blob/master/Image/Response%20Time%20(ms)%20of%20scenario%20c.png)


## 2. Discussion of the results why one method is better the other in which scenarios. 
โดยปกติแล้ว gRPC จะมี performace ที่ดีในกรณีที่มีการส่ง request แบบ streaming อย่าง scenario a. แต่ถ้าเป็นกรณีที่เป็นการส่งหลายๆ request พร้อมกันอย่าง scenario b. และ c. REST จะมี performace ดีกว่า เหตุผลคือ gRPC มีการใช้ HTTP2 และ Protobuf ซึ่งรองรับการส่งข้อมูลแบบ streaming แต่ REST ใช้ HTTP 1.1 ซึ่งสนับสนุนเพียงแค่ request-response model 
แต่อย่างไรก็ตาม ในการทดลองนี้จะเห็นว่า REST มี performace ที่ดีกว่าทุกๆ กรณี เนื่องจากในส่วนของ REST ได้มีการใช้ mongoDB ในการเก็บข้อมูล และมีการใช้ฟังก์ชันของ mongoDB ทำให้สามารถทำงานได้เร็วกว่า


## 3. Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance.
Language neutral - ในขณะที่ภาษาและ platform ส่วนใหญ่มีการรองรับ gRPC แต่ในหลายกรณียังไม่เพียงพอสำหรับการใช้งานจริงเนื่องจาก libraries ที่เกี่ยวข้องเช่น Protocol Buffers ยังใหม่และไม่ได้รับการพัฒนามากนัก, ส่วน Rest ซึ่งส่วนใหญ่ใช้ JSON เป็นประเภทข้อมูลพื้นฐาน ถูกรองรับด้วยหลายแพลตฟอ์มตั้งแต่ web programming ถึง mobile ทำให้มีเอกสารอ้างอิงที่จำนวนมากกว่า กล่าวคือ REST API และ HTTP1.1 มีความรองรับทั่วไปมากกว่า
Ease of use - ในแง่ของการเขียนโค้ด เนื่องจาก Rest API เป็นเพียงมาตรฐานที่ค่อนข้างหละหลวมเพื่อให้ใช้งานได้หลายแพลตฟอร์ม ทำให้ในหลายครั้งจำเป็นต้องเขียนโค้ด Serialize ข้อมูลไปกลับระหว่าง JSON กับภาษาต้นทาง ทำให้มีจำนวนบรรทัดโค้ดส่วนเกินค่อนข้างมาก ในขณะที่ gRPC มีความกระชับมากกว่าเนื่องจากมีบริการ language native ทำให้สามารถพัฒนาโปรแกรมได้เร็วกว่าถึงแม้อาจ debug โดยตรงได้ยากกว่า และมี documentation น้อยกว่า 
Performance - ถึงการใช้ REST คู่กับ HTTP/2 จะให้แนวโน้มความเร็วใกล้เคียงกับ gRPC แต่หากดูในเชิงประสิทธิภาพเพียงอย่างเดียวพบว่า gRPC เร็วกว่าค่อนข้างมากที่ทุกจำนวน request

## 4. Does your results comply with the results in https://medium.com/@bimeshde/grpc-vs-rest-performance-simplifiedfd35d01bbd4? How?

![Graph4](https://github.com/2110521-2563-1-Software-Architecture/softarch-hansaa-assignment-2/blob/master/Image/Response%20Time%20(ms)%20of%20scenario%20c%20(log).png)

จากกราฟข้างต้นจะเห็นได้ว่าเมื่อพิจารณากราฟกรณีการส่ง request แบบ concurrent ผลลัพธ์ในช่วงก่อน 512 requests จะไม่เหมือนกัน โดยใน medium ในช่วงต้นจะมี response time มาก และค่อยลดลงจนถึง 512 requests จากนั้นกราฟทั้งสองก็จะเริ่มคล้ายกัน โดย response time ก็จะเพิ่มขึ้นเมื่อ concurrent มากขึ้น  

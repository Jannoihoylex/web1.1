const express = require('express');
const jsonja = express();
const sql = require('mssql');

// การเชื่อมต่อกับฐานข้อมูล
const config = {
  user: 'Clientdata',
  password: 'databaseserver',
  server: 'DESKTOP-TVIKP7G',
  database: 'TESTDEMO',
  options: {
    encrypt: true,         // ถ้าใช้การเชื่อมต่อที่ปลอดภัย (HTTPS)
    trustServerCertificate: true // เพื่อยอมรับ self-signed certificate
  }
};

sql.connect(config, (err) => {
  if (err) console.log(err);
  console.log('เชื่อมต่อกับฐานข้อมูลแล้ว');
});

// สร้าง API เพื่อดึงข้อมูล
jsonja.get('/data', (req, res) => {
  const request = new sql.Request();
  const query = 'SELECT * FROM testset';
  
  request.query(query, (err, result) => {
    if (err) console.log(err);
    res.send(result.recordset);
  });
});

// เริ่มเซิร์ฟเวอร์
jsonja.listen(5000, () => {
  console.log('เซิร์ฟเวอร์ทำงานที่พอร์ต 5000');
});
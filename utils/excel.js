import { saveAs } from 'file-saver';
// import XLSX from 'xlsx';
const XLSX = require('xlsx');
export default function downloadOrders(orders) {
  // 將訂單數據轉換為工作表
  const worksheet = XLSX.utils.json_to_sheet(orders);

  // 將工作表添加到工作簿
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

  // 寫工作簿並轉換為blob對象
  const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelData], { type: 'application/octet-stream' });

  // 使用file-saver保存文件
  saveAs(blob, 'orders.xlsx');
}
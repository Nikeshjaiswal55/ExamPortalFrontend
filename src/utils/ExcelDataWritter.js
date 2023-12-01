import * as xlsx from 'xlsx'
export function ExcelDataWritter(excelData) {
    var wb = xlsx.utils.book_new();
    var ws = xlsx.utils.json_to_sheet(excelData);
    xlsx.utils.book_append_sheet(wb,ws,"MyStudents");
    xlsx.writeFile(wb,"MyExcel.xlsx");
    console.log(excelData);
}
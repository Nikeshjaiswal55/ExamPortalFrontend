import * as xlsx from 'xlsx'

function findKeyIgnoreCase(obj,keyName) {
    const lowerKeyName = keyName.toLowerCase();
    for(const key in obj) {
        if(key.toLowerCase() === lowerKeyName) {
            return key; // Return the key if found (case-insensitive)
        }
    }
}
export const ExcelDataReader = async (file) => {
    let excelData = [];
    const fileTypes = ["application/vnd.ms-excel",'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    if(file) {
        // console.log(file.type);
        if(file && fileTypes.includes(file.type)) {
            console.log("=========valid file===============");
            const data = await file.arrayBuffer(file);
            const excelFile = xlsx.read(data);
            const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
            let excelJson = xlsx.utils.sheet_to_json(excelSheet);
            // console.log(excelJson)
            excelJson.forEach((value) => {

                const keyEmail = findKeyIgnoreCase(value,'email');
                const flagEmail = value[keyEmail]?.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
                const keyName = findKeyIgnoreCase(value,'name');
                const keyBranch = findKeyIgnoreCase(value,'branch');
                const keyYear = findKeyIgnoreCase(value,'year');

                if((keyEmail && flagEmail) && (keyName) && (keyBranch) && (keyYear)) {
                    excelData.push({
                        "email": value[keyEmail],
                        "name": value[keyName],
                        "branch": value[keyBranch],
                        "year": value[keyYear],
                    });
                }
            });
        } else {
            console.log("=============not valid file ===========")
            excelData = [];
        }
        return excelData;
    }
}
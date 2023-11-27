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
    // const fileTypes = ["application/vnd.ms-excel",'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    if(file) {
        // console.log(file.type);
        // if(file && fileTypes.includes(file.type)) {
        try {
            if(file) {
            console.log("=========valid file===============");
            const data = await file.arrayBuffer(file);
            const excelFile = xlsx.read(data);
                console.log(excelFile);
            const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
                console.log(excelSheet)
            let excelJson = xlsx.utils.sheet_to_json(excelSheet);
                console.log(excelJson);
                if(excelJson.length) {
                    excelJson.forEach((value) => {
                const keyEmail = findKeyIgnoreCase(value,'email');
                const flagEmail = value[keyEmail]?.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
                const keyName = findKeyIgnoreCase(value,'name');
                const keyBranch = findKeyIgnoreCase(value,'branch');
                const keyYear = findKeyIgnoreCase(value,'year');
                    console.log(value);

                    if((keyEmail) && (keyName) && (keyBranch) && (keyYear)) {
                        if(flagEmail) {
                            excelData.push({
                        "email": value[keyEmail],
                        "name": value[keyName],
                        "branch": value[keyBranch],
                        "year": value[keyYear],
                    });
                        }

                    }
                    else {
                        if(!keyEmail && excelData.length) {
                            console.log(excelData);
                            // alert("Please provide email for all students")
                            excelData = new String("Please provide email for all students");
                            throw new Error("Please provide email for all students");

                        }
                        if(!keyBranch && excelData.length) {
                            // alert("Please provide branch for all students")
                            excelData = new String("Please provide branch for all students");
                            throw new Error("Please provide branch for all students");
                        } if(!keyName && excelData.length) {
                            // alert("Please provide name for all students")
                            excelData = new String("Please provide name for all students");
                            throw new Error("Please provide name for all students");
                        } if(!keyYear && excelData.length) {
                            // alert("Please provide year for all students")
                            excelData = new String("Please provide year for all students");
                            throw new Error("Please provide year for all students");
                        }

                        // alert("file must contain columns for \n1. Email \n2. Name \n3.year \n 4.Branch \n \bNote:- if you have columns please check spelling mistake also.");
                        excelData = new String("file must contain columns for :- 1. Email  2. Name 3. year  4. Branch  Note:- if you have columns please check spelling mistake  and don't give blank between them");
                        throw new Error("file must contain columns for   1. Email  2. Name 3. year  4.Branch  Note:- if you have columns please check spelling mistake also.");
                    }

                }
                );

            } else {
                    excelData = new String("File must Contain some data");
                    throw new Error("Data is not present");
                }
            }
        } catch(err) {
            console.log(err);
        }
        return excelData;
    }
}
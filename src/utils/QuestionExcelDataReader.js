import * as xlsx from 'xlsx'

function findKeyIgnoreCase(obj, keyName) {
    const lowerKeyName = keyName.toLowerCase();
    for (const key in obj) {
        if (key.toLowerCase() === lowerKeyName) {
            return key; // Return the key if found (case-insensitive)
        }
    }
}
export const QuestionExcelDataReader = async (file) => {
    let excelData = [];
    if (file) {
        try {
            if (file) {
                const data = await file.arrayBuffer(file);
                const excelFile = xlsx.read(data);
                const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
                let excelJson = xlsx.utils.sheet_to_json(excelSheet);
                if (excelJson.length) {
                    excelJson.forEach((value,index) => {
                        const keyQuestion = findKeyIgnoreCase(value, 'question');
                        const keyOption1 = findKeyIgnoreCase(value, 'option1');
                        const keyOption2 = findKeyIgnoreCase(value, 'option2');
                        const keyOption3 = findKeyIgnoreCase(value, 'option3');
                        const keyOption4 = findKeyIgnoreCase(value, 'option4');
                        const keyAnswer = findKeyIgnoreCase(value, 'answer');

                        if ((keyQuestion) && (keyOption1) && (keyOption2) && (keyOption3) && (keyOption4) && (keyAnswer)) {
                                excelData.push({
                                    "question": value[keyQuestion],
                                    "option1": value[keyOption1],
                                    "option2": value[keyOption2],
                                    "option3": value[keyOption3],
                                    "option4": value[keyOption4],
                                    "answer": value[keyAnswer]
                                });
                        }
                        else {
                            if (!keyQuestion && excelData.length) {
                                // alert("Please provide email for all students")
                                excelData = new String(`Please provide questionfor row no ${index + 1}`);
                                throw new Error("Please provide question for all");

                            }
                            if (!keyOption1 && excelData.length) {
                                // alert("Please provide branch for all students")
                                excelData = new String(`Please provide option 1 value for row no ${index + 1}`);
                                throw new Error(`Please provide option1 for row no ${index + 1}`);
                            } if (!keyOption2 && excelData.length) {
                                // alert(`Please provide name for all students")
                                excelData = new String(`Please  provide option 2 value for row no ${index + 1}`);
                                throw new Error("Please provide name for all students");
                            } if (!keyOption3 && excelData.length) {
                                // alert("Please provide year for all students")
                                excelData = new String(`Please provide option 3 value for row no ${index + 1}`);
                                throw new Error("Please provide year for all students");
                            } if (!keyOption4 && excelData.length) {
                                // alert(`Please provide year for all students")
                                excelData = new String(`Please provide option 4 value for row no ${index + 1}`);
                                throw new Error("Please provide year for all students");
                            } if (!keyAnswer && excelData.length) {
                                // alert(`Please provide year for all students")
                                excelData = new String(`Please provide answer for row no ${index + 1}`);
                                throw new Error("Please provide answer for all students");
                            }

                            // alert("file must contain columns for \n1. Email \n2. Name \n3.year \n 4.Branch \n \bNote:- if you have columns please check spelling mistake also.");
                            excelData = new String("file must contain columns for :- 1. Question 2. Option1 3. Option2 4. Option3 5. Option4 6. Answer  Note:- if you have columns please check spelling mistake  and don't give blank between them");
                            throw new Error("file must contain columns for 1. Question 2. Option1 3. Option2 4. Option3 5. Option4 6. Answer  Note:- if you have columns please check spelling mistake also.");
                        }

                    }
                    );

                } else {
                    excelData = new String("File must Contain some data");
                    throw new Error("Data is not present");
                }
            }
        } catch (err) {
            console.log(err);
        }
        return excelData;
    }
}
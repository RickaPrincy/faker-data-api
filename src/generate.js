import fs from "fs";

/**
 * Give a clean fileName based on the tableName
 * @param {tableName} tableName name of the table to make insert
 * @returns String
 */
function formatFileName(tableName){
    const alpha = "abcdefghijklmnopqrstuvwxyz._";
    tableName = tableName.replaceAll("/","");
    tableName = tableName.replaceAll(" ","");
    tableName = tableName.toLowerCase();

    for(let i = 0; i < tableName.length; i++)
        if(alpha.indexOf(tableName[i]) === -1)
            tableName = tableName.slice(0,i) + tableName.slice(i + 1);
    
    return tableName[0].toUpperCase() + tableName.slice(1);
}

/**
 * Return the first sql instruction
 * @param {TableName} tableName Name of the table to make insert
 * @param {columns} columns All columns in the table
 * @returns String
 */

function headInsert(tableName,columns){
    let query = `INSERT INTO ${tableName} ( `;

    for(let i = 0; i < columns.length; i++){
        query += columns[i].name;
        i === columns.length - 1 ? query += " ) VALUES " : query += ", ";
    }

    return query;
}

/**
 * Write all the query (sql instruction) in a file with file name 
 * based on the table name
 * @param {tableName} tableName Name of the table to make insert
 * @param {SQL} query String which contain all the instruction for the insert 
 */
function writeFile(tableName,query){
    const fileName = "inser" + formatFileName(tableName) + ".sql";
    const path = "file/" + fileName;

    fs.writeFile(path,query,error=>{
        if(error) console.log(error);
    });

    return fileName;
}

/**
 * Call all the necessary function which create a make the insert
 * @param {data} param0 data which contain all the information
 * @returns fileName
 */
export default function generate({tableName,numberOfRows,columns}){
    let query = headInsert(tableName,columns);
    return writeFile(tableName, query);
}
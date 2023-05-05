import { Generator } from "./functionGenerator.js";
import {breakConstraint, continueConstraint} from "./constraint.js";

const VIRGULE = " , ";
export function bodyInsert(numberOfRows,columns,query){

    for(let i = 1; i <= numberOfRows; i++){
        
        query += `\n--INSERT NUM ${i}\n(\n\t`;

        for(let j = 0 ; j < columns.length; j++){
            let column = columns[j];

            let tempQuery = breakConstraint(column,i);
            if(tempQuery.isConstraint) query += tempQuery.newQuery;
            else{
                tempQuery = continueConstraint(column,i);

                if(typeof(tempQuery.newQuery) !== "number"){
                    
                    const typeMap = {
                        int: () => Generator.int(column.constraint),
                        date: () => Generator.date(column.constraint),
                        timestamp: () => Generator.timestamp(column.constraint),
                        char: () => Generator.char(column.constraint),
                        varchar: () => Generator.varchar(column.constraint),
                        float: () => Generator.float(column.constraint),
                        boolean: Generator.boolean,
                        text: Generator.text,
                        city : Generator.city,
                        country : Generator.country,
                        countryCode : Generator.countryCode,
                        animal : Generator.animal,
                        color : Generator.color,
                        colorRgb : Generator.colorRgb,
                        product : Generator.product,
                        productDescription : Generator.productDescription,
                        price : Generator.price,
                        databaseType : Generator.databaseType,
                        transactionType : Generator.transactionType,
                        imageUrl : Generator.imageUrl,
                        ipv4 : Generator.ipv4,
                        ipv6 : Generator.ipv6,
                        email : Generator.email,
                        adresseMac : Generator.adresseMac,
                        word : Generator.word,
                        words : Generator.words,
                        songType : Generator.songType,
                        songName : Generator.songName,
                        gender : Generator.gender,
                        first_name : Generator.first_name,
                        last_name : Generator.last_name,
                        full_name : Generator.full_name,
                        middleName : Generator.middleName,
                        jobDescriptor : Generator.jobDescriptor,
                        jobType : Generator.jobType,
                        sex : Generator.sex,
                        vehicule : Generator.vehicule,
                        fileName : Generator.fileName,
                        phoneNumber : Generator.phoneNumber
                    };

                    const typeFn = typeMap[column.type];
                    query += typeFn ? typeFn(i) : `donnee${column.type}`;

                    query += tempQuery.isConstraint ? `${i}'`
                    : ["boolean", "int", "bigInt","date","timestamp","float"].includes(column.type) ? ""
                    : "'";

                }else query += tempQuery.newQuery
            }

            query += j !== columns.length - 1 ? " , \n\t" : "";
            
        }

        query += "\n)";
        query += i === numberOfRows ? ";" : ",";
    }
    
    return query;
}

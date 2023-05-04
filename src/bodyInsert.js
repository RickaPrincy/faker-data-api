import { Generator } from "./functionGenerator.js";
import fs from "fs";

function virgule(){ return " , " };

export function bodyInsert(numberOfRows,columns,query){

    for(let i = 1; i <= numberOfRows; i++){

        query += "\n--INSERT NUM " + i + "\n(\n\t";

        for(let j = 0 ; j < columns.length; j++){
            let column = columns[j];
            //constraint not null
            if(!column.constraint.includes("not null") && !column.constraint.includes("primary key")){
                if(Generator.randomNumber(0,2) === 1){
                    query += "null" + virgule() + "\n\t" 
                    continue;
                }
            }

            //constraint check in
            if(column.constraint.includes("check in (")){
                query += Generator.checkIn(column) + virgule() + "\n\t";
                continue;
            }

            //différents type
            switch(column.type){
                case "email":
                    query += Generator.email(i);
                    break;
                case "country": 
                    query += Generator.country();
                    break;
                case "int": 
                    query += Generator.int(column.constraint);
                    break;
                case "boolean": 
                    query += Generator.boolean();
                    break;
                default : 
                    query += "donnee" + column.type;
                    break;
            }

            if(j !== columns.length - 1)
                query += virgule() + "\n\t" 
            
        }

        query += "\n)";
        i === numberOfRows ? query +=";" : query +=",";
    }
    
    return query;
}

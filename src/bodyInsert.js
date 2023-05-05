import { Generator } from "./functionGenerator.js";
import specialConstraint from "./specialConstraint.js";

function virgule(){ return " , " };

export function bodyInsert(numberOfRows,columns,query){

    for(let i = 1; i <= numberOfRows; i++){

        query += "\n--INSERT NUM " + i + "\n(\n\t";

        for(let j = 0 ; j < columns.length; j++){
            let column = columns[j];

            const tempQuery = specialConstraint(column);
            if(tempQuery.isConstraint) query += tempQuery.newQuery;
            else {
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
            }

            if(j !== columns.length - 1)
                query += virgule() + "\n\t" 
            
        }

        query += "\n)";
        i === numberOfRows ? query +=";" : query +=",";
    }
    
    return query;
}

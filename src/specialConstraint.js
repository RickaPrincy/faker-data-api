import { faker } from "@faker-js/faker";
import { Generator } from "./functionGenerator.js";

function notNull(){
    let status = false;
    let query = "";
    if(Generator.randomNumber(0,6) === 0){
        query += "null";
        status = true;
    }
    return {isConstraint : status, newQuery : query}; 
}

function checkIn(column){
    let tab = column.constraint.split("check in ( ")[1].split(" )")[0].split(" , ");

    if(column.type === "int" || column.type === "bigInt")
        return +tab[Generator.randomNumber(0,tab.length)];
    else if(column.type === "float" || column.type === "double")
        return parseFloat(tab[Generator.randomNumber(0,tab.length)]);
    return tab[Generator.randomNumber(0,tab.length)];
}

export default function specialConstraint(column){
    if(
        !column.constraint.includes("not null") && 
        !column.constraint.includes("primary key")
    ) return notNull();

    if(column.constraint.includes("check in ("))
        return {isConstraint : true, newQuery : checkIn(column)}
    
    return {isConstraint : false};
}

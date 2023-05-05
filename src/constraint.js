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
    let tab = column.constraint.split("in ( ")[1].split(" )")[0].split(" , ");

    if(column.type === "int" || column.type === "bigInt")
        return +tab[Generator.randomNumber(0,tab.length)];
    else if(column.type === "float" || column.type === "double")
        return parseFloat(tab[Generator.randomNumber(0,tab.length)]);
    return tab[Generator.randomNumber(0,tab.length)];
}

function primaryKey(column,i){
    if(column.type === "int" || column.type === "bigInt")
        return i;
    return "'" + i + "'";
}

export function breakConstraint(column,i){

    if(column.constraint.includes("primary key"))
        return {isConstraint: true , newQuery : primaryKey(column,i)}

    if(!column.constraint.includes("not null"))
        return notNull();

    if(column.constraint.includes("in ("))
        return {isConstraint : true, newQuery : checkIn(column)}
    
    return {isConstraint : false};
}

export function continueConstraint(column,i){
    if(column.constraint.includes("unique")){
        if(column.type === "email")
            return {isConstraint : false}
        else if(column.type === "int" || column.type === "bigInt")
            return {isConstraint : true, newQuery : i}
        else
            return {isConstraint : true, newQuery : `${i}`}
    }
    return {isConstraint : false}
}

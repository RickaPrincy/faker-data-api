import { faker } from "@faker-js/faker";

function valideSQL(string){
    return string = string.replaceAll("'","''");
}

function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
//-------------------------------------------------------
function checkIn(column){
    let tab = column.constraint.split("check in ( ")[1].split(" )")[0].split(" , ");

    if(column.type === "int" || column.type === "bigInt")
        return +tab[randomNumber(0,tab.length)];
    else if(column.type === "float" || column.type === "double")
        return parseFloat(tab[randomNumber(0,tab.length)]);
    return tab[randomNumber(0,tab.length)];
}

function boolean(){
    let tab = [true,false];
    return tab[randomNumber(0,1)];
}

function email(i){
    return "'" + valideSQL(faker.internet.email().replace("@",i + "@")) + "'";
}

function country(){
    return "'" + valideSQL(faker.address.country()) + "'";
}

function int(constraint){
    let min,max;
    if(constraint.includes(" >= "))
        min = +constraint.split(" >= ")[1].split(" ")[0];
    else if(constraint.includes(" > "))
        min = +constraint.split(" > ")[1].split(" ")[0];
    
    if(constraint.includes(" <= "))
        max = +constraint.split(" <= ")[1].split(" ")[0];
    else if(constraint.includes(" < "))
        max = +constraint.split(" < ")[1].split(" ")[0];

    return randomNumber(min ?? -1000, max ?? 1000);
}

export let Generator = {
    randomNumber,
    checkIn,
    valideSQL,
    email,
    country,
    int,
    boolean
}
import { faker } from "@faker-js/faker";

function valideSQL(string){
    return string = string.replaceAll("'","''");
}

function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
//-------------------------------------------------------
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
        min = +constraint.split(" > ")[1].split(" ")[0] + 1;
    
    if(constraint.includes(" <= "))
        max = +constraint.split(" <= ")[1].split(" ")[0];
    else if(constraint.includes(" < "))
        max = +constraint.split(" < ")[1].split(" ")[0] - 1;

    return randomNumber(min ?? -1000, max ?? 1000);
}

export let Generator = {
    randomNumber,
    valideSQL,
    email,
    country,
    int,
    boolean
}
import { faker } from "@faker-js/faker";

function valideSQL(string){
    return  "'" +  string.replaceAll("'","''");
}
function getMinMax(constraint){
    let min,max;
    if(constraint.includes(" >"))
        min = constraint.split(" >")[1].split(" ")[1].replaceAll("'","");
    if(constraint.includes(" <"))
        max = constraint.split(" <")[1].split(" ")[1].replaceAll("'","");

    return {min:min,max:max};
}
function getDate(constraint){
    let {min,max} = getMinMax(constraint);
    
    if(min !== undefined && min.includes("current_date"))
        min = `${new Date().toLocaleDateString().split("/").reverse().join("-")}`;
    if(max !== undefined && max.includes("current_date"))
        max = `${new Date().toLocaleDateString().split("/").reverse().join("-")}`;
    let fakeDate = faker.date.between(min ?? "2000-01-01", max ?? "2050-01-01").toISOString();
    return fakeDate;
}
function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
//-------------------------------------------------
//---- Adress
function city(){
    return valideSQL(faker.address.city());
}
function countryCode(){
    return valideSQL(faker.address.countryCode());
}
function country(){
    return valideSQL(faker.address.country());
}
//---- animal
function animal(){
    return valideSQL(faker.animal.type());
}
//---- color
function color(){
    return valideSQL(faker.color.human());
}
function colorRgb(){
    return valideSQL(faker.color.rgb());
}
//---- commerce
function product(){
    return valideSQL(faker.commerce.product());
}
function productDescription(){
    return valideSQL(faker.commerce.productDescription());
}
function price(){
    return valideSQL(faker.commerce.price(10,2000,0)) +" Ar";
}
//----- database
function databaseType(){
    return valideSQL(faker.database.type());
}
//----- transaction
function transactionType(){
    return valideSQL(faker.finance.transactionType());
}
//----- image
function imageUrl(){
    return valideSQL(faker.image.image());
}
//----- internet
function ipv4(){
    return valideSQL(faker.internet.ipv4());
}
function ipv6(){
    return valideSQL(faker.internet.ipv6());
}
function email(i){
    return valideSQL(faker.internet.email().replace("@",i + "@"));
}
function adresseMac(i){
    return valideSQL(faker.internet.mac());
}
//----- word
function word(){
    return valideSQL(faker.lorem.word());
}
function words(){
    return valideSQL(faker.lorem.words());
}
//----- music
function songType(){
    return valideSQL(faker.music.genre());
}
function songName(){
    return valideSQL(faker.music.songName());
}
//----- name
function gender(){
    return valideSQL(faker.name.gender());
}
function first_name(){
    return valideSQL(faker.name.firstName());
}
function last_name(){
    return valideSQL(faker.name.lastName());
}
function full_name(){
    return valideSQL(faker.name.fullName());
}
function jobType(){
    return valideSQL(faker.name.jobType());
}
function jobDescriptor(){
    return valideSQL(faker.name.jobDescriptor());
}
function middleName(){
    return valideSQL(faker.name.middleName());
}
function sex(){
    return valideSQL(faker.name.sex());
}
function vehicule(){
    return valideSQL(faker.vehicle.vehicle());
}
function fileName(){
    return valideSQL(faker.system.commonFileName());
}
function phoneNumber(){
    return valideSQL(faker.phone.number("03########"));
}

//----- default type
function text(){
    return valideSQL(faker.lorem.text());
}
function boolean(){
    return [true,false][randomNumber(0,2)];
}
function int(constraint){
    let {min,max} = getMinMax(constraint);
    if(constraint.includes(" >"))
        min = +min + 1;
    if(constraint.includes(" >= "))
        min = +min - 1;
    if(constraint.includes(" <= "))
        max = +max + 1;
        
    console.log("*"+  min +"*" + " *" + max + "*");
    return randomNumber(min ?? -1000, max ?? 1000);
}

function date(constraint){
    let fakeDate = getDate(constraint);
    return `'${fakeDate.split("T")[0]}'`
}
function timestamp(constraint){
    let fakeDate = getDate(constraint);
    return `'${fakeDate.replace("T"," ").replace("Z","")}'`
}

//----------------------------------------------------
export let Generator = {
    randomNumber,
    int,
    boolean,
    text,
    date,
    timestamp,
    city,
    country,
    countryCode,
    animal,
    color,
    colorRgb,
    product,
    productDescription,
    price,
    databaseType,
    transactionType,
    imageUrl,
    ipv4,
    ipv6,
    email,
    adresseMac,
    word,
    words,
    songType,
    songName,
    gender,
    first_name,
    last_name,
    full_name,
    middleName,
    jobType,
    jobDescriptor,
    sex,
    vehicule,
    fileName,
    phoneNumber
}
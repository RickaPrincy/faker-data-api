import { faker } from "@faker-js/faker";
import { basicFunction, getDate, getMinMax, randomFloat, randomNumber } from "./utils";

export const fakerGenerator = {
  city: ()=> basicFunction({ type:"location", value: "city" }),
  countryCode: ()=> basicFunction({ type: "location",value: "countryCode" }),
  country: ()=> basicFunction({ type: "location",value:"country" }),
  animal: ()=> basicFunction({ type: "animal",value: "type" }),
  color: ()=> basicFunction({ type:"color",value: "human" }),
  colorRgb: ()=> basicFunction({type: "color",value: "rgb" }),
  product: ()=> basicFunction({type: "commerce",value: "product" }),
  productDescription: ()=> basicFunction({type: "commerce",value: "productDescription"}),
  database: ()=> basicFunction({type: "database", value: "type"}),
  transactionType: ()=> basicFunction({type: "finance", value: "transactionType"}),
  imageUrl: ()=> basicFunction({type: "image", value: "url"}),
  ipv4: ()=> basicFunction({type: "internet", value: "ipv4"}),
  ipv6: ()=> basicFunction({type: "internet", value: "ipv6"}),
  adresseMac: ()=> basicFunction({type: "internet", value: "mac"}),
  word: ()=> basicFunction({type: "lorem", value: "word"}),
  words: ()=> basicFunction({type: "lorem", value: "words"}),
  songType: ()=> basicFunction({type: "music", value: "genre"}),
  songName: ()=> basicFunction({type: "music", value: "songName"}),
  gender: ()=> basicFunction({type: "person", value: "gender"}),
  fistName: ()=> basicFunction({type: "person", value: "firstName"}),
  lastName: ()=> basicFunction({type: "person", value: "lastName"}),
  fullName: ()=> basicFunction({type: "person", value: "fullName"}),
  middleName: ()=> basicFunction({type: "person", value: "middleName"}),
  jobType: ()=> basicFunction({type: "person", value: "jobType"}),
  jobDescription: ()=> basicFunction({type: "person", value: "jobDescriptor"}),
  sex: ()=> basicFunction({type: "person", value: "sex"}),
  vehicule: ()=> basicFunction({type: "vehicle", value: "vehicle"}),
  fileName: ()=> basicFunction({type: "system", value: "commonFileName"}),
  phoneNumber: ()=> basicFunction({type: "phone", value: "number"}),
  text: ()=> basicFunction({type: "lorem", value: "text"}),
  email: (i: number = 0)=> basicFunction({type: "internet", value: "email"}).replace("@",i + "@"),
  boolean: ()=> basicFunction({type: "datatype", value: "boolean", notValidate: true}),
  date(constraint: string){
    const fakeDate = getDate(constraint);
    return `'${fakeDate.split("T")[0]}'`;
  },
  timestamp(constraint: string){
    const fakeDate = getDate(constraint);
    return `'${fakeDate.replace("T"," ").replace("Z","")}'`;
  },
  varchar(constraint: string){
    if(constraint.includes("length=")){
      const length = +constraint.split("length=")[1].split(" ")[0];
      return `'${faker.lorem.paragraphs(10).slice(0,length - randomNumber({min: 0,max: length - 2 }))}`;
    }
    return "";
  },
  char(constraint: string){
    if(constraint.includes("length=")){
      const length = +constraint.split("length=")[1].split(" ")[0];
      return `'${faker.lorem.paragraphs(10).slice(0,length)}`;
    }
    return "";
  },
  float(constraint:string){
    const {min,max} = getMinMax(constraint);
    let minFloat, maxFloat;
    if(min){
      !min.equal ? minFloat = (parseFloat(min.value) + 1) : (minFloat = parseFloat(min.value));
    }
    if(max){
      max.equal ? (maxFloat = +max.value + 1) : (maxFloat= +max.value);
    }
    return randomFloat({min: minFloat ?? -100,max: maxFloat ?? 100 });
  },
  int: (constraint: string)=>{
    const { min, max } = getMinMax(constraint);
    let minInt, maxInt;
    if(min){
      !min.equal ? (minInt = +min.value + 1) : (minInt = +min.value);
    }
    if(max){
      max.equal ? (minInt = +max.value + 1) : (minInt = +max.value);
    }
    return randomNumber({ min: minInt ?? -1000, max: maxInt ?? 1000 });
  },
};

import { Faker, faker } from "@faker-js/faker";

export type ValueArgType = object

type BasicFunctionArg<T extends keyof Faker,K extends keyof Faker[T]> = {
  type: T,
  value: K,
  valueArg?: ValueArgType
  notValidate?: boolean
}

type MinMaxType = {
  min?: { equal: boolean, value: string },
  max?: { equal: boolean, value: string }
}

type RandomNumberType = {
  min: number,
  max: number
}

export function getMinMax(constraint?: string): MinMaxType{
  const result: MinMaxType = {};
  if(constraint){
    if(constraint.includes(">=")) 
      result.min = { equal: true, value: constraint.split(">=")[1] };
    else if(constraint.includes(">")) 
      result.min = { equal: false, value: constraint.split(">")[1] };
    if(constraint.includes("<=")) 
      result.min = { equal: true, value: constraint.split("<=")[1] };
    else if(constraint.includes("<")) 
      result.min = { equal: false, value: constraint.split("<")[1] };
  }

  return result;
}

export function valideSQL(value: string){
  return  "'" +  value.replaceAll("'","''");
}

export function randomNumber( arg: RandomNumberType): number{
  const {min,max} = arg;
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomFloat(arg: RandomNumberType){
  const {min, max} = arg;
  return Math.random() * (max - min) + min;
}

export function getDate(constraint: string): string{
  const { min, max } = getMinMax(constraint);

  if(min !== undefined && min.value.includes("current_date"))
    min.value = `${new Date().toLocaleDateString().split("/").reverse().join("-")}`;
  if(max !== undefined && max.value.includes("current_date"))
    max.value = `${new Date().toLocaleDateString().split("/").reverse().join("-")}`;
  return faker.date.between({ from: min?.value ?? "2000-01-01", to: max?.value ?? "2050-01-01" }).toISOString();
}

export function basicFunction<T extends keyof Faker,K extends keyof Faker[T]>(arg: BasicFunctionArg<T,K>){
  const { type, value, valueArg, notValidate } = arg;
  const method = faker[type][value];
  if(typeof method === "function"){
    if(!notValidate)
      return valideSQL(method(valueArg) as string);
    return method(valueArg);
  }
  return "";
}

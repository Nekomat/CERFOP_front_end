import { entity } from "./entity"

export interface User {
    first_name:string
    last_name:string
    phone_number:string 
    email:string 
    role:string 
    entity:entity
    createdAt:string
}

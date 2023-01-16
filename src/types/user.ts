export type Role='Customer'|'Admin'
        
export interface User {
        id: number,
        email: string,
        password: string,
        name: string,
        role: Role,
        avatar:string,
}
export interface BaseUser{
        email: string,
        password: string,
        re_password:string,
        name: string, 
        avatar:FileList|string
}
export interface UserReducer{
        userList:User[]
        currentUser?:User
        access_token?:string
}
export interface Credentials{
        email:string
        password:string
}
export interface ReturnedCredential{
        access_token:string
}
export interface IsEmailAvailable{
        isAvailable:boolean
}
export interface CreateUser{
        email: string,
        password: string,
        name: string,
        avatar:string,
      }
      
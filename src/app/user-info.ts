export class UserInfo {
    constructor (public login: string, public followers: number, public following: number, public bio:string, public created_at: Date, public avatar_url:string){
    }
}
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInfo } from './user-info';
import { Repsitory } from './repsitory';



@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  private username:string;
  userInfo:UserInfo;
  repoInfo:Repsitory;

  constructor(private http:HttpClient) {
    console.log("Service Running");
    this.username = "Aaron";
    this.userInfo=new UserInfo("",0,0,"",new Date(),"");
    this.repoInfo=new Repsitory("","");
   }



   getProfileInfo() {
    interface ApiResponse{
      login:string;
      followers:number;
      following:number;
      bio:string;
      created_at:Date;
      avatar_url:string;
    }
    let promise = new Promise<void>((resolve,reject)=>{
      this.http.get<ApiResponse>("https://api.github.com/users/"+ this.username + "?client_id="+environment.clientid + "&client_secret=" + environment.clientsecret).toPromise().then(response=>{ 
    this.userInfo=response;
        console.log(response)

        resolve()
      },
      error=>{
        // this.quote.quote = "Never, never, never give up"
        // this.quote.author = "Winston Churchill"

        reject(error)
      })
    })
    return promise
     return this.http.get("https://api.github.com/users/"+ this.username + "?client_id="+environment.clientid + "&client_secret=" + environment.clientsecret)
   }
   getProfileRepos() {
    interface ApiResponse{
      html_url:string;
      name:string;
    }
    let promise = new Promise<void>((resolve,reject)=>{
      this.http.get<ApiResponse>("https://api.github.com/users/"+ this.username + "/repos?client_id="+environment.clientid + "&client_secret=" + environment.clientsecret).toPromise().then(response=>{
        this.repoInfo=response;
        console.log(response)
        resolve()
      },
      error=>{
        // this.quote.quote = "Never, never, never give up"
        // this.quote.author = "Winston Churchill"

        reject(error)
      })
    })
    return promise
    return this.http.get("https://api.github.com/users/"+ this.username + "/repos?client_id="+environment.clientid + "&client_secret=" + environment.clientsecret)
   }
   updateProfile(username:string) {
       this.username=username;
   }
}

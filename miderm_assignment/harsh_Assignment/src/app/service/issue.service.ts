
// connect to an external API to get the list of employees
import { HttpClient } from "@angular/common/http";
import { Injectable} from "@angular/core";
import {observable} from 'rxjs';
import { Issues } from "../model/issue.model";

@Injectable(
{ 
    providedIn:'root'
}
)
export class IssueService
{
  [x: string]: any;   baseUrl:string="http://localhost:3000/issues";
    constructor(private httpClient:HttpClient){}

    getIssues()
    { 
        return this.httpClient.get<Issues[]>(this.baseUrl);
    }

    getIssuesById(id:number)
    { 
        return this.httpClient.get<Issues>(this.baseUrl+"/"+id);
    }

    createIssues(issue:Issues)
    { 
        return this.httpClient.post(this.baseUrl,issue);
    }
    //
    //employee - issue
    //employees - issues
    //Employee - Issues

    updateIssues(id:number,issue:any)
    { 
        return this.httpClient.put(this.baseUrl+"/"+id,issue);
    }
    
    deleteIssue(id: number){
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
      }

}
     
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

//authguard helps in disabling directing through https://localhost/login

@Injectable({
    providedIn:'root'
})

export class AuthGuardService implements CanActivate{
    
    constructor(private router:Router){}
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean
    { 
      if(sessionStorage.getItem('loggedIn')=='yes'){
        return true;
      }
      else{ 
        this.router.navigate(['/login']);
        return false;
      }
    
    }

}

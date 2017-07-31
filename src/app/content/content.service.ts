import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { MyChallenge } from "./../models/MyChallenge.model";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';


@Injectable()
export class ContetService {

  myChallengesURL:string = 'api/MyChallenges';
  teamChallengesURL:string = 'api/TeamChallenges';

  private headers = new Headers({ 'Content-type': 'application/json' });
  constructor( private htttp: Http) { }   

  getMyChallenges(): Observable<Response>{
    return this.htttp.get(this.myChallengesURL)
      .map((challenges: Response) => challenges.json().data)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      
  }

  getTeamChallenges(): Observable<Response>{
    return this.htttp.get(this.teamChallengesURL)
      .map((challenge: Response) => challenge.json().data)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}

import { element } from 'protractor';
import { MdSort } from '@angular/material';
import { ContetService } from './content.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Response } from "@angular/http";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ExampleDataSource } from './dataSource';
import { MyChallenge } from './../models/MyChallenge.model';
import { TeamChallenge } from "./../models/TeamChallenges.model";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  result;
  response;
  fullName: string;
  entries: number[];
  completed: number[];
  acum = 0;
  count = 0;
  toComplete:number = 0;

  myChallenges: ExampleDataSource;
  teamChallenges: ExampleDataSource;
  dataSource: ExampleDataSource | null;

  @ViewChild(MdSort) sort;
  

  constructor(private contetService: ContetService) { }

  ngOnInit() {
    this.getMyChallenges();
    this.getTeamChallenge();  
    this.getNumberOfEntries();
    this.getMyChallengesCompletedDate();
  }


  getMyChallenges() {
    this.contetService.getMyChallenges()
      .subscribe(response => {
        this.result = response;
        this.result.forEach(element => {
          this.myChallenges = element.results;
        });
      });
  }

  getTeamChallenge(){
    this.contetService.getTeamChallenges()
    .subscribe(respones =>{
      this.result = respones;
      this.result.forEach(element => {
        this.teamChallenges = element.results;
      });
    });
  }

  getNumberOfEntries(){
    this.contetService.getTeamChallenges()
      .subscribe(response => {
        this.acum = 0;
        this.count = 0;
        this.response = response
        this.response.forEach(element => {
          this.result = element.results;
          this.result.forEach(element => {
            this.fullName = element.userFullName;
            if(element.numberOfEntries !== 0){
              this.acum += element.numberOfEntries;
            }else{
              this.count++; 
            }
          });
        });
        this.entries = [this.acum, this.count];
      });
  }

  getMyChallengesCompletedDate(){
    this.contetService.getMyChallenges()
    .subscribe(response =>{
      this.acum = 0;
      this.count = 0;
      response[0].results.forEach(element => {
        this.acum += element.overallScore;
        if(element.completedDate){
          this.count++;
        }else{
          this.toComplete++;
        }
      });
      this.completed = [this.acum, this.count, this.toComplete];
    });
  }

}

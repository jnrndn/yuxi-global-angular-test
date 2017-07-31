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


  dataChange: BehaviorSubject<MyChallenge[]> = new BehaviorSubject<MyChallenge[]>([]);
  result;
  response;
  entries = 0;
  acum = 0;
  count = 0;

  myChallenges: ExampleDataSource;
  teamChallenges: ExampleDataSource;
  dataSource: ExampleDataSource | null;

  @ViewChild(MdSort) sort;

  constructor(private contetService: ContetService) { }

  ngOnInit() {
    this.getMyChallenges();
    // this.getTeamChallenge();
    // this.getNumberOfEntries();

  }


  getMyChallenges() {
    this.contetService.getMyChallenges()
      .subscribe(response => {
        this.result = response;
        this.result.forEach(element => {
          this.dataChange.next(element.results);
          this.myChallenges = new ExampleDataSource(this.dataChange, this.sort);
        })
        this.dataSource = this.myChallenges;
      })
  }

  getTeamChallenge(){
    this.contetService.getTeamChallenges()
    .subscribe(respones =>{
      this.result = respones;
      this.result.forEach(element => {
        this.dataChange.next(element.results);
        this.teamChallenges = new ExampleDataSource(this.dataChange, this.sort);
      });
      console.log('ahi va la data teamChallenge', this.teamChallenges);
    });
  }

  getNumberOfEntries(){
    this.contetService.getTeamChallenges()
      .subscribe(response => {
        this.response = response
        this.response.forEach(element => {
          this.result = element.results;
          this.result.forEach(element => {
            this.count += element.numberInvited
            if(element.numberInvited != element.numberOfEntries){
              this.acum += element.numberInvited - element.numberOfEntries;
            }
          });
        });
        console.log(this.acum, this.count);
      });
      
  }

}

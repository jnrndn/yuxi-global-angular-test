import { MyChallenge } from './../../models/MyChallenge.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { element } from 'protractor';
import { ExampleDataSource } from './../dataSource';
import { ContetService } from './../content.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Sort, MdSort } from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataSource: ExampleDataSource | null;

  displayedColumns: string[];
  results;
  dataChange: BehaviorSubject<MyChallenge[]> = new BehaviorSubject<MyChallenge[]>([]);


  @Input()myChallengeData: ExampleDataSource;
  @Input()teamChallengeData: ExampleDataSource ;

  @ViewChild(MdSort) sort;


  constructor(private contentService: ContetService) { }

  ngOnInit() {
    this.ChallengeData();
    // if(this.myChallengeData){
    //   this.displayedColumns = ['title', 'createdBy', 'average', 'invited', 'completed'];
    //    console.log('llego la data de myChallenge', this.myChallengeData);
    // }
    if(this.teamChallengeData){
      this.displayedColumns= ['titleTC', 'name', 'modified', 'invitedTC', 'entries', 'review']
      console.log('llego la data de teamChallenge', this.teamChallengeData);
    }
  }

  ChallengeData(): void {
    
    this.displayedColumns = ['title', 'createdBy', 'average', 'invited', 'completed'];

    this.contentService.getMyChallenges().subscribe(response => {
        this.results = response;
        this.results.forEach(element => {
          this.dataChange.next(element.results)
          this.dataSource = new ExampleDataSource(this.dataChange, this.sort);
        });
      });
  }

  // teamChallengeData(data):void{
  //   this.displayedColumns= ['titleTC', 'name', 'modified', 'invitedTC', 'entries', 'review']
  //   this.myChallengeData =  data;
  //   this.myChallengeData
  //     .subscribe(response => {
  //     this.results = response;
  //     this.results.forEach(element => {
  //       this.dataChange.next(element.results)
  //       this.dataSource = new ExampleDataSource(this.dataChange, this.sort);
  //     });
  //   });
  // }

}

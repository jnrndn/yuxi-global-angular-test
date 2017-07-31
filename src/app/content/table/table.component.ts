import { DataSource } from '@angular/cdk';
import { MdSort, MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ExampleDataSource } from './../dataSource';
import { Component, OnInit, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataSource: ExampleDataSource | null;
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  displayedColumns: string[];

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @Input()challenges: any;
  @Input()table:boolean;

  constructor() { }

  ngOnInit() {
    this.dataChange.next(this.challenges)
    this.dataSource = new ExampleDataSource(this.dataChange, this.sort)
    // console.log(this.dataSource);
    
    if(this.table){
      this.displayedColumns = ['title', 'createdBy', 'average', 'invited', 'completed'];
    }
    else {
      this.displayedColumns= ['titleTC', 'name', 'modified', 'invitedTC', 'entries', 'review'];
    }
  }
}

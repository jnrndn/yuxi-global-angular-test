import { DataSource } from '@angular/cdk';
import { MdSort, MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ExampleDataSource } from './../dataSource';


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
  @ViewChild('filter') filter: ElementRef;
  @Input()challenges: any;
  @Input()table:boolean;

  constructor() { }

  ngOnInit() {
    this.dataChange.next(this.challenges)
    this.dataSource = new ExampleDataSource(this.dataChange, this.sort)
        
    if(this.table){
      this.displayedColumns = ['title', 'createdBy', 'average', 'invited', 'completed'];
    }
    else {
      this.displayedColumns= ['titleTC', 'name', 'modified', 'invitedTC', 'entries', 'review', 'button'];
    }

    this.listenerFilter()
  }

  listenerFilter(): void {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

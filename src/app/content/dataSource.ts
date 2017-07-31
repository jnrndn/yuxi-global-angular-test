import { MyChallenge } from './../models/MyChallenge.model';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/filter';

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase, private _sort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MyChallenge[]> {
    const displayDataChanges = [
      this._exampleDatabase,
      this._sort.mdSortChange
    ];

     return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(sort?): MyChallenge[] {
    const data = this._exampleDatabase.value;
    const sortTable = sort || this._sort
    if (!sortTable.active || sortTable.direction === '') { return data; }
    console.log(sortTable)
    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (sortTable.active) {
        case 'title': [propertyA, propertyB] = [a.challengeName, b.challengeName]; break;
        // case 'average': [propertyA, propertyB] = [a.average, b.average]; break;
        // case 'photo': [propertyA, propertyB] = [a.photo, b.photo]; break;
        // case 'homeworkCompleted': [propertyA, propertyB] = [a.homeworkCompleted, b.homeworkCompleted]; break;
        // case 'homeworkMissing': [propertyA, propertyB] = [a.homeworkMissing, b.homeworkMissing]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  addData(newChallenge: MyChallenge): ExampleDataSource {
   return new  ExampleDataSource(this._exampleDatabase.push(newChallenge), this._sort);
  }
}
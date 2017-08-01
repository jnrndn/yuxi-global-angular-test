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
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._exampleDatabase,
      this._sort.mdSortChange,
      this._filterChange,
    ];

     return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData()
        .filter(item =>{
          if(item.name){
            const searchString = item.name.toLowerCase();
            return searchString.indexOf(this.filter.toLowerCase()) !== -1;
            }
          if(item.challengeName){
            const searchString = item.challengeName.toLowerCase();
            return searchString.indexOf(this.filter.toLowerCase()) !== -1;
          }
        });      
      });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(sort?): any[] {
    const data = this._exampleDatabase.value;
    const sortTable = sort || this._sort
    if (!sortTable.active || sortTable.direction === '') { return data; }
    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (sortTable.active) {
        case 'title': [propertyA, propertyB] = [a.challengeName, b.challengeName]; break;
        case 'titleTC': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'average': [propertyA, propertyB] = [a.overallScore, b.overallScore]; break;
        case 'invited': [propertyA, propertyB] = [a.modifiedDate, b.modifiedDate]; break;
        case 'completed': [propertyA, propertyB] = [a.completedDate, b.completedDate]; break;
        case 'modified': [propertyA, propertyB] = [a.modifiedDate, b.modifiedDate]; break;
        case 'invitedTC': [propertyA, propertyB] = [a.numberInvited, b.numberInvited]; break;
        case 'entries': [propertyA, propertyB] = [a.numberInvited, b.numberInvited]; break;
        case 'review': [propertyA, propertyB] = [a.numberToReview, b.numberToReview]; break;
        case 'createdBy': [propertyA, propertyB] = [a.challengerFirstName, b.challengerFirstName]; break;
        case 'name': [propertyA, propertyB] = [a.userFullName, b.userFullName]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  addData(newChallenge): ExampleDataSource {
   return new  ExampleDataSource(this._exampleDatabase.push(newChallenge), this._sort);
  }
}
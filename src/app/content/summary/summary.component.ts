import { Component, OnInit, Input } from '@angular/core';
import { ContetService } from "./../content.service";


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  
  @Input()entries;
  @Input()invited;
  
  response;
  result;
  acum;
  count;

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales'];
  public doughnutChartData:number[] = [+this.acum, +this.count];
  public doughnutChartType:string = 'doughnut';


  constructor( private contetService:ContetService ) { }


  ngOnInit() {
    this.getNumberOfEntries();
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  getNumberOfEntries(){
    this.contetService.getTeamChallenges()
      .subscribe(response => {
        this.response = response        
        this.response.forEach(element => {
          this.result = element.results;
          this.result.forEach(element => {
            console.log(element.numberInvited);
            this.count += +element.numberInvited
            if(element.numberInvited != element.numberOfEntries){
              this.acum += +element.numberInvited - +element.numberOfEntries;
            }
          });
        });
        console.log(this.acum, this.count);
      });
      
  }
}

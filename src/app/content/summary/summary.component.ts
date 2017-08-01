import { Component, OnInit, Input } from '@angular/core';
import { ContetService } from "./../content.service";


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  
  @Input()entries: number[];
  @Input()invited: boolean;
  @Input()fullName: string;

  name:string[];
  toReview:number;
  avg:number;
  toComplete:number;
  

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public lineChartColors:any[] = [
    {
      backgroundColor:['green','orange'] 
    }
  ];
  public doughnutChartType:string = 'doughnut';


  constructor( private contetService:ContetService ) { }


  ngOnInit() {
    if(this.invited){
      this.name = this.fullName.split(' ');
      this.lineChartColors = [{backgroundColor:['orange','green']}];
      this.doughnutChartLabels = ['Entries', 'Invided'];
      this.doughnutChartData = [this.entries[0], this.entries[1]];
      this.toReview =  this.entries[0] - this.entries[1];
      
    } else {
      this.lineChartColors = [{backgroundColor:['green','orange']}];
      this.doughnutChartLabels = ['Completed', 'Incompleted'];
      this.toComplete = this.entries[2];
      this.avg = this.entries[0]/this.entries[1];
      this.doughnutChartData = [ this.entries[1], this.entries[2] ];
    }
  }
}

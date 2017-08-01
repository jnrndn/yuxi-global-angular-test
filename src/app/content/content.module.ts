import { ContetService } from './content.service';
import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { SummaryComponent } from './summary/summary.component';
import { TableComponent } from './table/table.component';
import { MdTableModule, MdInputModule, MdCardModule, MdSortModule, MdTabsModule, MdIconModule, MdPaginatorModule, MdMenuModule, MdButtonModule, MdCheckboxModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdTableModule,
    MdInputModule,
    MdCardModule,
    MdSortModule,
    CdkTableModule,
    MdTabsModule,
    MdPaginatorModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule,
    ChartsModule,
    MdCheckboxModule
  ],
  declarations:[
    ContentComponent,
    SummaryComponent,
    TableComponent 
  ],
  providers:[ContetService],
  exports:[ContentComponent]
})
export class ContentModule { }

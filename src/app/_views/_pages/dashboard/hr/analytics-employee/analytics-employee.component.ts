import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { BackendService } from 'src/app/_core/_services/backend.service';

@Component({
  selector: 'hrm-analytics-employee',
  templateUrl: './analytics-employee.component.html',
  styleUrls: ['./analytics-employee.component.scss']
})
export class AnalyticsEmployeeComponent implements OnInit, OnChanges {

  @Input() employeesCount: any;

  public doughnutChartLabels: Label[] = ['Male', 'Female', 'All'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    //const employeCountChanges = changes[''];

    if(this.employeesCount){
      this.doughnutChartData = [
        [this.employeesCount.male, this.employeesCount.female, this.employeesCount.male + this.employeesCount.female]
      ];
    }
  }

}

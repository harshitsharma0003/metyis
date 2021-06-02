import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit, OnDestroy {
  constructor(
  ) {
  }
  // @ts-ignore
  @ViewChild('createPlanModalCancel') createPlanModalCancel: ElementRef;
  // @ts-ignore
  @ViewChild('createPlanModalBtn') createPlanModalBtn: ElementRef;
  // @ts-ignore
  @ViewChild('PlanNameModalBtn') PlanNameModalBtn: ElementRef;
  // @ts-ignore
  @ViewChild('commentFormModalBtn') commentFormModalBtn: ElementRef;
  // @ts-ignore
  @ViewChild('commentFormModalCancel') commentFormModalCancel: ElementRef;
  // Constants
  public mlDataPointColor = '#D8B1FD';
  public lastyearDataPointColor = '#C0504E';
  public currentWeek: number;
  // Charts
  public chart1;
  public chart2;
  // Graph Data Data points
  public graphData: any = [];
  public weekArray: any = [];
  public finalForcastArray: any = [];
  public mlForcastArray: any = [];
  public apoForcastArray: any = [];
  public actualsForcastArray: any = [];
  public lastyearForcastArray: any = [];
  public finalForcastDataPoints = [];
  public plan_data = [];
  // Filter Options
  public skus: any = [];
  public filters: any = [];
  public searchText = '';
  // Events
  public promos: any = [];
  public weathers: any = [];
  public events: any = [];
  // Selected Data point
  public selectedDataPoint: any = {};
  ngOnInit() {
  }
  ngOnDestroy(): void {
  }
}
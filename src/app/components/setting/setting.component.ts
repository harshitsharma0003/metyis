import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SKUService } from '../../services/sku.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  @ViewChild('loadFilterModal', { static: false }) loadFilterModal: ElementRef;
  @ViewChild('loadFilterModalCancel', { static: false }) loadFilterModalCancel: ElementRef;
  @ViewChild('saveFilterModalCancel', { static: false }) saveFilterModalCancel: ElementRef;
  constructor(
    private skuService: SKUService,
  ) { }
  public allLogs: any = [];
  public columnDefs;
  public columnDefs2;
  public secondgraph = "Baseline";
  public columnDefs1;
  rowData: any;
  rowData1: any;
  rowData2: any;
  public allusers: any = [];
  public allComments;
  public username;
  public datafetch1;
  public block12 = false;
  public password;
  public role = "Admin";
  public block;
  public addUserAct;
  public final_role;
  public allCommentshtml;
  public comments_table = false;
  public up_table = false;
  public last_apo_display = false;
  public last_data_display = false;
  public info_page = false;
  public prevactuals;
  public plan;
  public horizon = false;
  public defsetAct;
  public width_final;
  public searchfilter;
  public gridApi;
  public gridColumnApi;
  public showCrossIcon = false;
  public domLayout;
  public selectrole;
  public selectroletoshow = "Choose Role";
  public autoGroupColumnDef ="autoGroupColumnDef";
  ngOnInit() {
    this.selectrole = [
      {
        name: 'ROLE',
        key: 'role',
        isExpanded: false,
        values: [
          "Admin", "Demand Planner", "Viewer"
        ]
      }
    ]
    this.addUserAct = false;
    this.defsetAct = false;
    this.final_role = sessionStorage.getItem("role");
    document.getElementById('side_user').style.fontWeight = 'bold';
    this.width_final = window.innerWidth;
    this.columnDefs2 = [
      { headerName: 'Email', field: 'username', width: this.width_final * 3 / 10, filter: true, sortable: true, sort: "desc", cellStyle: { 'height': '56px', 'font-weight': 'bold', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Password', field: 'password', width: this.width_final * 3 / 10, filter: true, sortable: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Role', field: 'role', width: this.width_final * 3 / 10, filter: true, sortable: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      {
        headerName: 'Delete', field: 'deleteit', width: this.width_final / 10,cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px', 'cursor': 'pointer' },
        cellRenderer: function () {
          return '<i style="cursor:pointer;" class="fa fa-trash" ></i>'
        },
      }
    ];
    this.columnDefs = [
      { headerName: 'Username/Email', headerClass: "headerClass", field: 'username', filter: true, sortable: true, sort: "desc", cellStyle: { 'height': '56px', 'font-weight': 'bold', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Activity', field: 'activity', filter: true, sortable: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Date/Time Stamp', field: 'datetimestamp', filter: true, sortable: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
    ];
    this.columnDefs1 = [
      { headerName: 'Week', field: 'week', sortable: true, filter: true, sort: "desc", cellStyle: { 'height': '56px', 'font-weight': 'bold', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Comment', field: 'comment', sortable: true, filter: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Forecasting group', field: 'forecasting', sortable: true, filter: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Cpg', field: 'cpg', sortable: true, filter: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      { headerName: 'Plant', field: 'plant', sortable: true, filter: true, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } },
      {
        headerName: 'User', field: 'btn',
        cellRenderer: function () {
          return '<p style="height:56px;font-size:14px;line-height:24px;padding-top:16px;padding-bottom:16px;padding-left:16px">admin@gmail.com</p>'
        }
      }
    ];
    if (this.final_role === 'Admin' || this.final_role == "Admin") {
      this.block = true;
    }
    else {
      this.block = false;
    }
    this.domLayout = "autoHeight";
    if (sessionStorage.getItem('setting') == "user") {
      this.secondgraph = "Baseline";
      this.openuser();
    }
    else if (sessionStorage.getItem('setting') == "comment") {
      this.secondgraph = "Weather";
      this.comments1();
    }
    else if (sessionStorage.getItem('setting') == "logs") {
      this.secondgraph = "Promo";
      this.logs1();
    }
    else if (sessionStorage.getItem('setting') == "info") {
      this.secondgraph = "Open";
      this.infopage();
    }
    else if (sessionStorage.getItem('setting') == "default") {
      this.secondgraph = "Open1";
      this.datefield();
    }
    this.skuService.fetchHorizon().subscribe((response: any) => {
      this.prevactuals = response.horizon.toString().substr(0, 4) + "-W" + response.horizon.toString().substr(4, 6);
      this.plan = response.plan.toString().substr(0, 4) + "-W" + response.plan.toString().substr(4, 6);
    });
    this.skuService.getCommnents().subscribe((res: any) => {
      var ghj = [];

      this.allComments = res.map((item) => {
        item.isSelected = false;
        item.isFiltered = false;
        return item;
      });
      for (const g of this.allComments) {
        ghj.push({
          week: g.name.split('|')[1],
          comment: g.name.split('|')[0],
          forecasting: g.name.split('|')[2],
          cpg: g.name.split('|')[3],
          plant: g.name.split('|')[4],
        });
      }
      this.rowData1 = ghj;
    }, () => {
    });
    this.skuService.getlogs().subscribe((res: any) => {
      this.allLogs = res;
      this.rowData = res;
    });
    this.skuService.fetchuser().subscribe((res: any) => {
      this.allusers = res;
      this.rowData2 = res;
    });
  }
  public helpselectrole(value) {
    this.selectroletoshow = value;
    if (value == "Admin") {
      this.role = "Admin";
      this.checkman();
    }
    else if (value == "Demand Planner") {
      this.role = "Demand";
      this.checkman();
    }
    else if (value == "Viewer") {
      this.role = "View";
      this.checkman();
    }
    this.selectrole.isExpanded = false;
    document.getElementById('rolefilter').className = 'panel-collapse collapse';
    document.getElementById("userSelectRole").style.color = " #1C2025";
  }
  public showhideCrossIcon() {
    if (this.searchfilter.length > 0) {
      this.showCrossIcon = true;
    }
    else {
      this.showCrossIcon = false;
    }
  }
  public clearSearch() {
    this.searchfilter = "";
    this.showCrossIcon = false;
    this.onFilterTextBoxChanged();
  }
  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  public checkmanDEFSET() {
    this.defsetAct = true;
  }
  public onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(this.searchfilter);
  }
  public checkman() {
    if (this.username != undefined && this.username.length > 0 && this.password != undefined && this.password.length > 0) {
      this.addUserAct = true;
    }
  }
  public closeModal() {
    this.saveFilterModalCancel.nativeElement.click();
  }
  public deleteuser(username) {
    this.skuService.deleteuser(username).subscribe(() => {
      window.location.reload();
    });
  }
  getRowHeight() {
    return 56;
  }
  firstDataRendered(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    try {
      var paginationPanel = Array.from(document.getElementsByClassName('ag-paging-panel') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < paginationPanel.length; i++) {
        paginationPanel[i].style.paddingTop = '32px';
        paginationPanel[i].style.backgroundColor = '#F8F9FA';
      }
    } catch (e) { console.log(e); }
    try {
      var agcells2 = Array.from(document.getElementsByClassName('ag-paging-button') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < agcells2.length; i++) {
        agcells2[i].style.display = 'none';
      }
    } catch (e) { console.log(e); }
    try {
      var agcells2 = Array.from(document.getElementsByClassName('ag-paging-page-summary-panel') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < agcells2.length; i++) {
        agcells2[i].style.marginRight = '50vw';
      }
    } catch (e) { console.log(e); }
    try {
      var agrows = Array.from(document.getElementsByClassName('ag-rows') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < agrows.length; i++) {
        agrows[i].style.height = '46px';
      }
    } catch (e) { console.log(e); }
    var header = Array.from(document.getElementsByClassName('ag-header') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < header.length; i++) {
      header[i].style.height = '32px';
      header[i].style.minHeight = '32px';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-viewport') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#F8F9FA';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-container') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#F8F9FA';
    }
    var headerRows = Array.from(document.getElementsByClassName('ag-header-row') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headerRows.length; i++) {
      headerRows[i].style.height = '32px';
      headerRows[i].style.minHeight = '32px';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.paddingLeft = '16px';
      headercells[i].style.paddingRight = '16px';
    }
    var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.color = '#8BA0B9';
      agcells2[i].style.paddingTop = '4px';
      agcells2[i].style.paddingBottom = '4px';
      agcells2[i].style.fontSize = '12px';
      agcells2[i].style.lineHeight = '24px';
    }
    var cells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.paddingLeft = '16px';
      cells[i].style.paddingRight = '16px';
    }
    var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.border = '0';
    }
    try {
      this.gridApi.sizeColumnsToFit();
    } catch (e) { console.log(e); }
  }
  onCellClickedBro(params) {
    if (params.colDef.field == "deleteit") {
      if (confirm("Are you sure you want to delete this user?")) {
        this.deleteuser(params.data.username);
      }
    }
  }
  public adduser_12() {
    this.loadFilterModal.nativeElement.click();
  }
  public adduser() {
    this.addUserAct = false;
    for (const abc of this.allusers) {
      if (this.username == abc.username) {
        window.alert("User already exists, please try a different username");
        return;
      }
    }
    var a = {
      username: this.username,
      password: this.password,
      role: this.role
    }
    this.skuService.adduser(a).subscribe(() => {
      window.alert("Successfully added");
      this.skuService.fetchuser().subscribe((res: any) => {
        this.allusers = res;
      });
    }, () => {
      window.alert("Successfully added");
      this.skuService.fetchuser().subscribe((res: any) => {
        this.allusers = res;
      });
    });
  }
  public download() {
    this.skuService.download('{}').subscribe((res: any) => {
      let data, filename, link;
      let csv = '';
      const columns = ['APO Product', 'APO Location', 'Customer Planning Group', 'Company Code', 'Technical Period', 'Machine Learning', 'Forecast Value Add', 'Final Forecast', 'UOM'];
      columns.push(" ");
      // //columns.push(JSON.stringify)
      // csv += JSON.stringify(this.skus);
      // csv +='\n';
      csv += columns.join(',');
      csv += '\n';
      for (const point of res.row) {
        const row = [
          point.id,
          point.plant,
          point.cpg,
          'G001',
          point.calenderYearWeek,
          point.ml,
          point.fva,
          point.final_Forecast,
          "HL"
        ];
        csv += row.join(',');
        csv += '\n';
      }
      // for(const point of res.row1)
      // {    
      //     const first="ML";
      //     const row = [
      //       point.id,
      //       point.plant,
      //       point.cpg,
      //       'G001',
      //       point.calenderYearWeek,
      //       point.ml,
      //       0,
      //       point.ml,
      //       "HL"
      //     ];
      //     csv += row.join(',');
      //     csv += '\n';
      //   }
      // for (const point of this.graphData) {
      //   const first="ML";
      //   ar.splice(0, 0, "three");
      //   const row = [
      //     point.calenderYearWeek,
      //     point.actuals,
      //     point.apo,
      //     point.ml,
      //     point.actualslastyear,
      //     point.finalForecast
      //   ];
      //   csv += row.join(',');
      //   csv += '\n';
      // }
      filename = 'chart-data.csv';
      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);
      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      document.body.appendChild(link); // Required for FF
      link.click();
      document.body.removeChild(link);
    });
  }
  public done() {
    this.defsetAct = false;
    this.prevactuals;
    var a = this.prevactuals.substr(6);
    var b = this.prevactuals.substr(0, 4);
    var c = b + a;
    var a1 = this.plan.substr(6);
    var b1 = this.plan.substr(0, 4);
    var c1 = b1 + a1;
    var y = {
      user: "admin",
      horizon: parseInt(c),
      plan: parseInt(c1)
    };
    this.skuService.saveHorizon(y).subscribe(() => {
      window.alert("Updated horizon");
    });
  }
  public datefield() {
    sessionStorage.removeItem('setting');
    sessionStorage.setItem('setting', "default");
    document.getElementById('side_user').style.fontWeight = 'normal';
    document.getElementById('side_logs').style.fontWeight = 'normal';
    document.getElementById('side_comments').style.fontWeight = 'normal';
    document.getElementById('side_info').style.fontWeight = 'normal';
    document.getElementById('side_default').style.fontWeight = 'bold';
    if (this.horizon == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = true;
      this.info_page = false;
    }
    else {
      this.horizon = false;
    }
  }
  public logs1() {
    sessionStorage.removeItem('setting');
    sessionStorage.setItem('setting', "logs");
    document.getElementById('side_user').style.fontWeight = 'normal';
    document.getElementById('side_logs').style.fontWeight = 'bold';
    document.getElementById('side_comments').style.fontWeight = 'normal';
    document.getElementById('side_info').style.fontWeight = 'normal';
    document.getElementById('side_default').style.fontWeight = 'normal';
    if (this.up_table == false) {
      this.horizon = false;
      this.block12 = false;
      this.up_table = true;
      this.comments_table = false;
      this.last_data_display = false;
      this.last_apo_display = false;
      this.info_page = false;
    }
    else {
      this.up_table = false;
    }
  }
  public apo_display() {
    if (this.last_apo_display == false) {
      this.last_apo_display = true;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.last_apo_display = false;
    }
  }
  public data_display() {
    if (this.last_data_display == false) {
      this.last_apo_display = false;
      this.last_data_display = true;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.last_data_display = false;
    }
  }
  public comments1() {
    sessionStorage.removeItem('setting');
    sessionStorage.setItem('setting', "comment");
    document.getElementById('side_user').style.fontWeight = 'normal';
    document.getElementById('side_logs').style.fontWeight = 'normal';
    document.getElementById('side_comments').style.fontWeight = 'bold';
    document.getElementById('side_info').style.fontWeight = 'normal';
    document.getElementById('side_default').style.fontWeight = 'normal';
    if (this.comments_table == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = true;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.comments_table = false;
    }
  }
  public openuser() {
    sessionStorage.removeItem('setting');
    sessionStorage.setItem('setting', "user");
    document.getElementById('side_user').style.fontWeight = 'bold';
    document.getElementById('side_logs').style.fontWeight = 'normal';
    document.getElementById('side_comments').style.fontWeight = 'normal';
    document.getElementById('side_info').style.fontWeight = 'normal';
    document.getElementById('side_default').style.fontWeight = 'normal';
    if (this.block12 == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = true;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = false;
    }
    else {
      this.block12 = false;
    }
  }
  public infopage() {
    sessionStorage.removeItem('setting');
    sessionStorage.setItem('setting', "info");
    document.getElementById('side_user').style.fontWeight = 'normal';
    document.getElementById('side_logs').style.fontWeight = 'normal';
    document.getElementById('side_comments').style.fontWeight = 'normal';
    document.getElementById('side_info').style.fontWeight = 'bold';
    document.getElementById('side_default').style.fontWeight = 'normal';
    if (this.info_page == false) {
      this.last_apo_display = false;
      this.last_data_display = false;
      this.block12 = false;
      this.up_table = false;
      this.comments_table = false;
      this.horizon = false;
      this.info_page = true;
    }
    else {
      this.info_page = false;
    }
  }
  public filter_clicked;
  public hogya = 0;
  public unexpanded(filter: string) {
    if (filter == "temp" && this.filter_clicked == "temp") {
      this.hogya = 10;
    }
    else if (filter != this.filter_clicked) {
      this.hogya = 11;
      this.filter_clicked = filter;
    }
  }
}
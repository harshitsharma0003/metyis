import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import { SKUService } from '../../services/sku.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';
import { FilterService } from '../../services/filter.service';
import { ViewService } from '../../services/view.service';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { ThrowStmt } from '@angular/compiler';
import { $ } from 'protractor';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('selectOptionsModalCancel', { static: false }) selectOptionsModalCancel: ElementRef;
    @ViewChild('selectOptionsModalBtn', { static: false }) selectOptionsModalBtn: ElementRef;
    @ViewChild('PlanNameModalBtn', { static: false }) PlanNameModalBtn: ElementRef;
    @ViewChild('ViewNameModalBtn', { static: false }) ViewNameModalBtn: ElementRef;
    @ViewChild('commentFormModalBtn', { static: false }) commentFormModalBtn: ElementRef;
    @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
    @ViewChild('table', { static: false }) table: ElementRef;
    @ViewChild('commentFormModalCancel', { static: false }) commentFormModalCancel: ElementRef;
    @ViewChild('finalForecastCommentModalBtn', { static: false }) finalForecastCommentModalBtn: ElementRef;
    @ViewChild('loadFilterModal', { static: false }) loadFilterModal: ElementRef;
    @ViewChild('loadFilterModal_h5', { static: false }) loadFilterModal_h5: ElementRef;
    @ViewChild('loadFilterModalCancel', { static: false }) loadFilterModalCancel: ElementRef;
    @ViewChild('lockModalCancel', { static: false }) lockModalCancel: ElementRef;
    @ViewChild('lockModal', { static: false }) lockModal: ElementRef;
    @ViewChild('editCommentModalBtn', { static: false }) editCommentModalBtn: ElementRef;
    @ViewChild('finalForecastCommentModalCancel', { static: false }) finalForecastCommentModalCancel: ElementRef;
    @ViewChild('editCommentModalBtnCancel', { static: false }) editCommentModalBtnCancel: ElementRef;
    @ViewChild('saveFilterModalCancel', { static: false }) saveFilterModalCancel: ElementRef;
    @ViewChild('saveFilterModal_second', { static: false }) saveFilterModal_second: ElementRef;
    public avgselected = 0;
    public createPlanRequestData_temp: any;
    public inter: any;
    public lotCompleted = 0;
    private gridApi;
    private static t1: DashboardComponent;
    private defaultColDef;
    private gridColumnApi;
    public role;
    public reactivate_filter_button = 0;
    public gridApi1;
    public gridColumnApi1;
    public up = 0;
    public not_available_filter = false;
    public main_1_cal_sku = 0;
    public search_icon_load = true;
    public cut_icon_load = false;
    public main_graph = true;
    public save_filter_id = "";
    public featureanalysis = 'Feature Analysis (HL)';
    public checking = 0;
    public summ2 = 0;
    public avar;
    public commens_main_table = false;
    public change_extra = '';
    public groupHeight;
    public final_one = 0;
    public allpacksize = 0;
    public suballbrand = 0;
    public feature_legends = true;
    public allbrand = 0;
    public allleadsku = 0;
    public allfilter0 = 0;
    public allfilter1 = 0;
    public allfilter2 = 0;
    public allfilter3 = 0;
    public allfilter4 = 0;
    public allfilter5 = 0;
    public allfilter6 = 0;
    public allfilter7 = 0;
    public allfilter8 = 0;
    public allfilter9 = 0;
    public allfilter10 = 0;
    public allfilter_sales = 0;
    public allfilter_trade = 0;
    public filter_clicked = "";
    public bothYes = true;
    public rowGroupPanelShow;
    public allComments_harshit;
    public prev_year = 0;
    public autoGroupColumnDef;
    public fals = false;
    public compress = false;
    public expand = true;
    public enabled = 1;
    public commentsall_combination: any = [];
    public skuview_save: any = [];
    public disable_filter = true;
    public skuname_down = '';
    public tables;
    public arr12: any = [];
    public views = "Aggregated";
    public main_1 = 0;
    public main_1_cal = 0;
    public copy_ml_week = '';
    public copy_ml = '';
    public subbrand_cal = [];
    public brand_cal = [];
    public leadsku_cal = [];
    public zero_cal = [];
    public one_cal = [];
    public one2_cal = [];
    public two_cal = [];
    public two2_cal = [];
    public three_cal = [];
    public four_cal = [];
    public hogya = 0;
    public five_cal = [];
    public six_cal = [];
    public seven_cal = [];
    public eigth_cal = [];
    public nine_cal = [];
    public ten_cal = [];
    public greystart;
    public countselected = 0;
    public minselected = 0;
    public maxselected = 0;
    public brandstext;
    public leadtext;
    public type123 = "week";
    public selectallcpg = 0;
    public allselectedweek: any = [];
    public searchplant;
    public selecteddblclick;
    public jkl = '';
    public granular1 = 'week';
    public createPlanRequestData_featurechange: any;
    public edit_comment;
    public selectedWeekIndex: number;
    public currentWeek: number;
    public searchText1;
    public change_comment = 0;
    public commented_week;
    public searchText34;
    public searchText345;
    public commentSearchText;
    public dropdown_table = 'allweek';
    public second_ag = false;
    public getRowNodeId;
    public third_ag = false;
    public first_ag = true;
    public fourth_ag;
    public selectallskus = 0;
    public skus_search = [];
    public sumselected = 0;
    public selected_array = [];
    public pressed = false;
    public searchcpg;
    public plan;
    public UOM = 'HL';
    public loading = false;
    // Filters
    public loadedFilters: any = [];
    public plants = [];
    public changed_weeks = [];
    public selectallplant = 0;
    public selectedskus = [];
    public secondgraph = 'Baseline';
    public cpgss;
    public plantss;
    public fgssselected;
    public tickedskus;
    public sku_semi: any = [];
    public createdata: any = [];
    public allComments: any = [];
    public plan_val;
    public main = true;
    public plant_string;
    public cpg_string;
    public log = false;
    public weeknoC;
    public table_up = true;
    public table_down = false;
    public materialgroupfilter = false;
    public second_sku: any = [];
    public weeklycomment = false;
    public planningtable = 'Planning Table (HL)';
    public forecastinganalysis = 'Forecast Analysis (HL)';
    public comment12 = false;
    public weeks = [];
    public uomfilter = [];
    public filters1_subbrand = [];
    public filters1_leadsku = [];
    public usertext;
    public filters1_brands = [];
    public filters1_brands_1 = [];
    public filters_plant = [];
    //no of empty objects added to array = no of filter objects to be pushed
    public filters1 = [
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        }
    ];
    //no of empty objects added to array = no of filter objects to be pushed
    public filters2 = [
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        },
        {
            name: '',
            key: '',
            isExpanded: false,
            values: []
        }
    ];

    public forecastadd = 0;
    public forecastadd2 = 0;
    public forecastadd3 = 0;
    public forecastadd_total = 0;
    public forecastadd_table = 0;
    public valuestring = '';
    // Loader

    public changing_fva = 0;
    public savePlanLoader = false;
    public saveViewLoader = false;
    // EventEmitter
    public eventsSubject: Subject<any> = new Subject<any>();
    // Constants
    private lastyearDataPointColor = '#022F70';
    private finalForecastPointColor = '#1BCDCD';
    private aopDataPointColor = '#0B88BA';
    private actualDataPointColor = '#EB4B45';
    private mlDataPointColor = '#FEA947';
    // Charts
    public chart1;
    public chart2;
    public up_table = false;
    public down_table = false;
    public color_tick = 0;
    // Graph Data Data points
    public graphData: any = [];
    public createPlanRequestData: any = [];
    public finalForecastArray: any = [];
    private actualDataPoints: any = [];
    public promovalue: any = [];
    public finalForecastArray_table: any = [];
    private actualDataPoints_table: any = [];
    private property: any = [];
    private property2: any = [];
    private property3: any = [];
    public update;
    private hh: any = [];
    public endWeek;
    public prevactuals;
    public prevactuals_val;
    private mlDataPoints: any = [];
    private aopDataPoints: any = [];
    private mlDataPoints_table: any = [];
    private aopDataPoints_table: any = [];
    public sameName = false;
    private fvaDataPoints: any = [];
    private fvaDataPoints_table: any = [];
    public showRightComponent = true;
    public middle = true;
    public sort_filter = true;
    public second = true;
    private lastYearDataPoints: any = [];
    public finalForecastDataPoints = [];
    private lastYearDataPoints_table: any = [];
    private arr12_sku: any = [];
    public getRowHeight(params) {
        return 56;
    }
    public finalForecastDataPoints_table = [];
    public totalData: any = {
        finalCastTotal: 0,
        harshit: 0,
        fsvtValueAdd: 0,
        apoTotal: 0,
        mlTotal: 0,
        actuals: 0,
        lastYearTotal: 0,
    };
    public totalData_table: any = {
        finalCastTotal: 0,
        harshit: 0,
        fsvtValueAdd: 0,
        apoTotal: 0,
        mlTotal: 0,
        actuals: 0,
        lastYearTotal: 0,
    };
    // Filter Options
    public skus: any = [];
    public filters: any = [];
    public comm1: any = [];
    public finn: any = [];
    public toggleZoomScreen() {
        window.alert("zooming in; buckle up!");
    }
    public statusBar = {
        statusPanels: [
            {
                statusPanel: 'agTotalAndFilteredRowCountComponent',
                align: 'left',
            },
            {
                statusPanel: 'agTotalRowCountComponent',
                align: 'center',
            },
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            { statusPanel: 'agAggregationComponent' },
        ],
    };
    title = 'app';
    columnDefs: any;
    columnDefs5: any;
    columnDefs6: any;
    rowData: any;
    rowData4: any;
    rowData5: any;
    rowData6: any;
    public allCommentshtml: any = [];
    public comm2: any = [];
    public fetched_forecasting: any = [];
    public searchText = '';
    public searchText_filter = "";
    public thi = 0;
    public ho1 = 0;
    public filters1_list: any = [];
    public filters2_list: any = [];
    // Events
    public weathers: any = [];
    public events: any = [];
    // Selected Data point
    public selectedDataPoint: any = {};
    public selectedWeekComments: any = [];
    public DBloadWeek;
    public theLoadWeek;
    constructor(
        private router: Router,
        private skuService: SKUService,
        private sidebarService: SidebarService,
        private filterService: FilterService,
        private viewService: ViewService,
        private http: HttpClient,
    ) {
    }
    public showcombinationcolumn_combination = false;
    public showcombinationcolumn_filter = true;
    public filter_open = false;
    public filter_close = true;
    public combination_down = false;
    public filter_sortby;
    public selectuom;
    public selectyear;
    public selectgran;
    public selectview;
    public gran;
    public vyu;
    public selectsortby;
    public selectCommentTable;
    public closeDropDowns = true;
    t1 = this;
    @HostListener('document:click', [])
    clickout() {
        this.pressed = false;
    }
    ngOnInit() {
        var initialfilterscpg = [];
        var initialfiltersplant = [];
        this.gran = "Weekly View";
        this.vyu = "Aggregated";
        this.selectuom = [
            {
                name: 'UOM',
                key: 'uom',
                isExpanded: false,
                values: [
                    "HL", "L", "PC", "PAL", "BOT", "PPU", "CU", "HLV"
                ]
            }
        ]
        this.selectyear = [
            {
                name: 'YEAR',
                key: 'year',
                isExpanded: false,
                values: [
                    "", "2018", "2019", "2020", "2021", "2022"
                ]
            }
        ]
        this.selectgran = [
            {
                name: 'GRAN',
                key: 'gran',
                isExpanded: false,
                values: [
                    "Weekly View", "Monthly View"
                ]
            }
        ]
        this.selectview = [
            {
                name: 'VIEW',
                key: 'view',
                isExpanded: false,
                values: [
                    "Aggregated", "Forecasting Group View", "Detailed View", "Detailed View Material"
                ]
            }
        ]
        this.selectsortby = [
            {
                name: 'SORTBY',
                key: 'sortby',
                isExpanded: false,
                values: [
                    "Date Created", "Alphabetically", "Last Modified"
                ]
            }
        ]
        this.selectCommentTable = [
            {
                name: 'COMMENT',
                key: 'comment',
                isExpanded: false,
                values: [
                    "Selected Week", "All Comments"
                ]
            }
        ]
        this.addedSkuIDsToSearch = [];
        this.filter_sortby = "Date Created";
        this.autoGroupColumnDef = {
            pinned: 'left'
        };
        this.willusave = false;
        document.body.style.zoom = "75% !important";
        this.update = new Date().toJSON('yyyy/MM/dd HH:mm');
        this.role = sessionStorage.getItem('role');
        this.getRowNodeId = function (data) {
            return data.key;
        };
        this.defaultColDef = {
            filter: true,
            resizable: true,
        };
        this.rowGroupPanelShow = 'always';
        this.usertext = sessionStorage.getItem('username');
        this.skuService.getPlants().subscribe((response: any) => {
            this.plants = response;
            const plant = this.plants;
            initialfiltersplant.push({
                name: 'Plants',
                key: 'plant',
                isExpanded: false,
                values: response
            });
            for (const b of initialfiltersplant[0].values) {
                if (b.name == 'G001') {
                    b.isChecked = true;
                }
            }
            this.createdata.plants;
        });
        this.skuService.getLoadWeek().subscribe((response: String) => {
            this.DBloadWeek = response;
            var z = this.DBloadWeek.toString();
            var x = z.substring(0, 4);
            var y = z.substring(4, 6);
            this.theLoadWeek = " W" + y + ", " + x;
            this.createdata.startWeek = this.DBloadWeek;
        })
        ///////////////////////////////////////////////////////////////////
        this.filterService.getFilters({
            user: 'admin'
        }).subscribe((res: any) => {
            this.loadedFilters = res.map((item) => {
                item.isSelected = false;
                return item;
            });
        });
        /////////////////////////////////////////////////////////////////////////
        this.skuService.getCustomerPlanningGroup().subscribe((response: any) => {
            const a = response;
            initialfilterscpg.push({
                name: 'CPG',
                key: 'customerPlanningGroup',
                isExpanded: false,
                values: a
            });
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.loading = true;
        this.skuService.getBrands().subscribe((response: any) => {
            this.filters1_brands.push({
                name: 'Brand',
                key: 'brands',
                isExpanded: false,
                values: response
            });
        });
        this.skuService.fetchHorizon().subscribe((response: any) => {
            this.prevactuals_val = parseInt(response.horizon);
            this.plan_val = parseInt(response.plan);
            this.prevactuals = response.horizon.toString().substr(0, 4) + '-W' + response.horizon.toString().substr(4, 6);
            this.endWeek = response.plan.toString().substr(0, 4) + '-W' + response.plan.toString().substr(4, 6);
            this.loading = true;
        });
        this.skuService.getSubbrand().subscribe((response: any) => {
            this.filters1_subbrand.push({
                name: 'Sub-Brand',
                key: 'subbrand',
                isExpanded: false,
                values: response
            });
        });
        forkJoin(this.skuService.getSales(), this.skuService.getLeadSku(),this.skuService.getMaterialgroup(), 
          this.skuService.getglobalbev(), this.skuService.getlocalcat(), this.skuService.getbaseunit(), 
          this.skuService.getTradetype(), this.skuService.getpacksize(), this.skuService.getpacktype(), 
          this.skuService.getAnimalFlag(), this.skuService.getAlcP(), this.skuService.getMaterial_second(), 
          this.skuService.getsnpplanner(), this.skuService.get3pp()).subscribe(([getSalesRes, getLeadSkuRes, getMaterialgroupRes, 
          getglobalbevRes, getlocalcatRes, getbaseunitRes, getTradetypeRes, getpacksizeRes, getpacktypeRes, 
          getAnimalFlagRes, getAlcPRes, getMaterial_secondRes, getsnpplannerRes, get3ppRes]) => {
            var getSalesResArray : any = getSalesRes;
            var getTradetypeResArray : any = getTradetypeRes;
            var get3ppResArray : any = get3ppRes;
            this.filters2[0] = {
                name: 'Sales Office',
                key: 'salesoffice',
                isExpanded: false,
                values: getSalesResArray.map(item => {
                    return { name: item, isChecked: false, isFiltered: true };
                })
            };
            this.filters1_leadsku.push({
                name: 'Lead Sku',
                key: 'leadsku',
                isExpanded: false,
                values: getLeadSkuRes
            });
            this.filters1[0] = {
                name: 'Own/3PP',
                key: 'brands_1',
                isExpanded: false,
                values: get3ppResArray.map(item => {
                    return { name: item, isChecked: false, isFiltered: true };
                })
            };
            this.filters1[1] = {
                name: 'Material Group',
                key: 'materialgroup',
                isExpanded: false,
                values: getMaterial_secondRes
            };
            this.filters1[2] = {
                name: 'Global Category',
                key: 'globalbev',
                isExpanded: false,
                values: getglobalbevRes
            };
            this.filters1[3] = {
                name: 'Local Category',
                key: 'localcat',
                isExpanded: false,
                values: getlocalcatRes
            };
            this.filters1[4] = {
                name: 'Primary Unit',
                key: 'baseunit',
                isExpanded: false,
                values: getbaseunitRes
            };
            this.filters2[1] = {
                name: 'Trade Type',
                key: 'tradetype',
                isExpanded: false,
                values: getTradetypeResArray.map(item => {
                    return { name: item, isChecked: false };
                })
            };
            this.filters1[5] = {
                name: 'Pack Size',
                key: 'packsize',
                isExpanded: false,
                values: getpacksizeRes
            };
            this.filters1[6] = {
                name: 'Pack Type',
                key: 'packtype',
                isExpanded: false,
                values: getpacktypeRes
            };
            this.filters1[7] = {
                name: 'Animal Farm Segment',
                key: 'Animal_Flags',
                isExpanded: false,
                values: getAnimalFlagRes
            };
            this.filters1[8] = {
                name: 'ABV',
                key: 'alcoholper',
                isExpanded: false,
                values: getAlcPRes
            };
            var abvt = [{
                isChecked: false,
                name: "HL"
            },
            {
                isChecked: false,
                name: "L"
            },
            {
                isChecked: false,
                name: "PC"
            },
            {
                isChecked: false,
                name: "BOT"
            }
            ]
            this.uomfilter.push({
                name: 'UOM',
                key: 'uom',
                isExpanded: false,
                values: abvt
            });
            this.filters1[9] = {
                name: 'Material Group NO',
                key: 'material_second',
                isExpanded: false,
                values: getMaterial_secondRes
            };
            this.filters1[10] = {
                name: 'SNP Planner',
                key: 'snp_planner',
                isExpanded: false,
                values: getsnpplannerRes
            };
            this.copyFilterData();
        });
        this.skuService.getForecastingGroup().subscribe((res: any) => {
            this.skus_search = res;
            this.skus_search.push({
                isChecked: true,
                isFiltered: true,
                name: 'Testing'
            });
        });
        this.filterService.getFilters({
            user: 'admin'
        }).subscribe((res: any) => {
            this.loadedFilters = res.map((item) => {
                item.isSelected = false;
                return item;
            });
            this.createdata = {
                prevactuals: this.prevactuals_val,
                startWeek: this.DBloadWeek,
                endWeek: this.plan_val,
                forecastingGroups: [{ 'id': 0, 'name': 'EVE GrapefCosm BOT 6X4X0_275', 'isFiltered': true, 'isChecked': true }],
                customerPlanningGroup: [],
                plants: ['G001']
            };
            var f = 0;
            for (const ab of this.loadedFilters) {
                var a = ab.dateModified;
                f++;
                if (a == "" || a == null || a == " " || a == undefined) {
                    ab.dateModified = '-';
                }
                var a1 = ab.dateCreated;
                if (a1 == "" || a1 == null || a1 == undefined) {
                    ab.dateCreated = '-';
                }
            }
            var temp_fg = [];
            var temp_cpg = [];
            var temp_plant = [];
            for (const abc of this.loadedFilters) {
                if (abc.default_Val != null) {
                    temp_fg = JSON.parse(JSON.stringify(abc.sku));
                    temp_cpg = JSON.parse(JSON.stringify(abc.cpg));
                    temp_plant = JSON.parse(JSON.stringify(abc.plant));
                }
            }
            if (temp_cpg.length > 0) {
                var a: any = [];
                var cpg: any = [];
                var plant: any = [];
                var index = 0;
                for (const abc of temp_cpg) {
                    cpg.push({
                        id: index,
                        name: abc,
                        isFiltered: true,
                        isChecked: true
                    });
                    index++;
                }
                for (const abc of temp_plant) {
                    plant.push({
                        id: index,
                        name: abc,
                        isFiltered: true,
                        isChecked: true
                    });
                    index++;
                }
                for (const abc of temp_fg) {
                    a.push({
                        id: index,
                        name: abc,
                        isFiltered: true,
                        isChecked: true
                    });
                    index++;
                }
                this.createdata.forecastingGroups = JSON.parse(JSON.stringify(a));
                this.createdata.plants = JSON.parse(JSON.stringify(temp_plant));
                this.createdata.customerPlanningGroup = JSON.parse(JSON.stringify(temp_cpg));
                for (const b of initialfilterscpg[0].values) {
                    for (const c of temp_cpg) {
                        if (b.name == c) {
                            b.isChecked = true;
                        }
                    }
                }
                for (const b of initialfiltersplant[0].values) {
                    for (const c of temp_plant) {
                        if (b.name == c) {
                            b.isChecked = true;
                        }
                    }
                }
                this.filters_plant = initialfiltersplant;
                this.filters = initialfilterscpg;
            }
            this.cpgss = JSON.parse(JSON.stringify(this.createdata.customerPlanningGroup));
            this.plantss = JSON.parse(JSON.stringify(this.createdata.plants));
            this.fgssselected = this.createdata.forecastingGroups;
            this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups));
            for (const abc in this.createdata.customerPlanningGroup) {
                this.createdata.customerPlanningGroup[abc] = this.createdata.customerPlanningGroup[abc].split('-')[0];
            }
            for (const abc in this.createdata.plants) {
                this.createdata.plants[abc] = this.createdata.plants[abc].split('-')[0];
            }
            for (const abc in this.createdata.forecastingGroups) {
                this.createdata.forecastingGroups[abc].name = this.createdata.forecastingGroups[abc].name.split('-')[0];
            }
            this.createPlan(this.createdata);
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.skuService.getForecastingGroup().subscribe((res: any) => {
            this.skus_search = res;
            this.skus_search.push({
                isChecked: true,
                isFiltered: true,
                name: 'Testing'
            });
        });

        this.skuService.getEvents().subscribe((res: any) => {
            this.events = res;
        });
        this.skuService.getWeathers().subscribe((res: any) => {
            this.weathers = res;
        });
        this.createdata = {
            prevactuals: this.prevactuals_val,
            startWeek: 2020,
            endWeek: 202004,
            forecastingGroups: [{ 'id': 0, 'name': 'EVE GrapefCosm BOT 6X4X0_275', 'isFiltered': true, 'isChecked': true }],
            customerPlanningGroup: ['G01'],
            plants: ['G001']
        };
        this.cpgss = JSON.parse(JSON.stringify(this.createdata.customerPlanningGroup));
        this.plantss = JSON.parse(JSON.stringify(this.createdata.plants));
        this.fgssselected = this.createdata.forecastingGroups;
        this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups));
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + (1 + 7 - currentDate.getDay()) % 7);
        this.currentWeek = DashboardComponent.getCurrentWeek(currentDate);
        // SideBar Service
        this.sidebarService.getSideBarClickEvent$().subscribe((page) => {
            this.eventsSubject.next({
                page
            });
            this.selectOptionsModalBtn.nativeElement.click();
        });
        this.columnDefComments = [
            { headerName: 'Week', field: 'week', sortable: true, filter: true, sort: "desc", cellStyle: { 'font-weight': 'bold', 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } }, //260
            { headerName: 'Comment', field: 'comment', sortable: true, filter: true, cellStyle: { 'paddingLeft': '0', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } }, //260
            { headerName: 'Forecasting Group', field: 'sku', sortable: true, filter: true, cellStyle: { 'paddingLeft': '0', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //260
            { headerName: 'Plant', field: 'plant', sortable: true, filter: true, cellStyle: { 'paddingLeft': '0', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //260
            { headerName: 'CPG', field: 'cpg', sortable: true, filter: true, cellStyle: { 'paddingLeft': '0', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //260
            { headerName: 'User', field: 'user', sortable: true, filter: true, cellStyle: { 'paddingLeft': '0', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //150
        ];
    }
    public editModalBD() {
        var modalbd = Array.from(document.getElementsByClassName('modal-backdrop') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < modalbd.length; i++) {
            modalbd[i].style.height = '135vh';
            modalbd[i].style.width = '135vw';
        }
    }
    ngAfterViewInit(): void {
    }
    ngOnDestroy(): void {
    }
    public copyFilterData() {
        var ier = 0;
        for (var key in this.filters1) {
            if (this.filters1.hasOwnProperty(key)) {
                this.filters1_list[ier] = [];
                this.filters1_list[ier].push(this.filters1[key]);
                ier = ier + 1;
            }
        }
        var ier1 = 0;
        for (var key2 in this.filters2) {
            if (this.filters2.hasOwnProperty(key2)) {
                this.filters2_list[ier1] = [];
                this.filters2_list[ier1].push(this.filters2[key2]);
                ier1 = ier1 + 1;
            }
        }
    }
    public changeGran(value) {
        if (value == "Weekly View") {
            this.granular1 = "week";
        }
        else {
            this.granular1 = "month";
        }
        this.gran = value;
        this.updateTheTable();
    }
    public changeView(value) {
        if (value == "Aggregated") {
            this.views = value;
        }
        else if (value == "Forecasting Group View") {
            this.views = "Sku View";
        }
        else if (value == "Detailed View") {
            this.views = value;
        }
        else {
            this.views = "Detailed View_material";
        }
        this.vyu = value;
        this.updateTheTable();
    }
    public toggleDD() {
        var pop = Array.from(document.getElementsByClassName("mdd") as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < pop.length; i++) {
            if (i == this.avar) {
                pop[i].classList.toggle("show");
            }
        }
    }
    public formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    public sortFilters() {
        var tmp = [];
        if (this.loadedFilters) {
            tmp = this.loadedFilters;
        }
        if (this.filter_sortby == "Alphabetically") {
            tmp.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        }
        if (this.filter_sortby == "Date Created") {
            tmp.sort(function (a, b) {
                return a.dateCreated.localeCompare(b.dateCreated);
            });
        }
        if (this.filter_sortby == "Last Modified") {
            tmp.sort(function (a, b) {
                return a.dateModified.localeCompare(b.dateModified);
            });
        }
        this.loadedFilters = tmp;
    }
    public filter_toggle_function() {
        this.showcombinationcolumn_filter = !this.showcombinationcolumn_filter;
        this.showcombinationcolumn_combination = !this.showcombinationcolumn_combination;
        this.filter_open = !this.filter_open;
        this.combination_down = !this.combination_down;
    }
    public filterorcomb() {
        this.showcombinationcolumn_filter = !this.showcombinationcolumn_filter;
        this.showcombinationcolumn_combination = !this.showcombinationcolumn_combination;
        this.filter_open = false;
        this.combination_down = false;
        if (this.reactivate_filter_button == 1) {
            //document.getElementById('apply_filter').style.background = '#00DD76';
        }
    }
    public filterorcomb_generate() {
        try {
            this.onFilterCheckBoxChange121_sku();
        }
        catch (e) {
        }
        this.filterorcomb();
        this.disable_filter = false;
    }
    public aggrid2excel() {
        var params = {
            sheetName: 'Planning Table',
            exportMode: undefined,
        };
        this.gridApi.exportDataAsExcel(params);
    }
    public showAreusure() {
        var tt = this.willusave;
        window.addEventListener("beforeunload", function (e) {
            if (!tt) {
                return undefined;
            }
            var confirmationMessage = 'Are you sure you want to leave this page without saving the plan? ' +
                'If you leave, your changes will not be saved.';
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        });
    }
    private static getCurrentWeek(date: Date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
    private static parseStringToFloat(text) {
        return parseFloat(parseFloat(text).toFixed(0));
    }
    public calculate_number() {
        this.disable_filter = true;



        this.hogya = 11;
        this.brand_cal = this.filters1_brands[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        this.subbrand_cal = this.filters1_subbrand[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        this.leadsku_cal = this.filters1_leadsku[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        try {
            this.zero_cal = this.filters1_list[0][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.one2_cal = this.filters2_list[0][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.two2_cal = this.filters2_list[1][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.one_cal = this.filters1_list[1][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.two_cal = this.filters1_list[2][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.three_cal = this.filters1_list[3][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.four_cal = this.filters1_list[4][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.five_cal = this.filters1_list[5][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.six_cal = this.filters1_list[6][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.seven_cal = this.filters1_list[7][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.eigth_cal = this.filters1_list[8][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.nine_cal = this.filters1_list[9][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
        try {
            this.ten_cal = this.filters1_list[10][0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        } catch (err) {
        }
    }
    public download_graph() {
        this.chart1.title.set('text', 'Forecasting Group - ' + this.createPlanRequestData.forecastingGroups + '\n' + 'Customer Planning Group- ' + this.createPlanRequestData.customerPlanningGroup + '\n' + 'Plants- ' + this.createPlanRequestData.plants);
        this.chart1.title.set('fontSize', 20);
        this.chart1.exportChart({ format: 'jpg' });
        this.chart1.title.set('text', ' ');
        this.chart1.title.set('fontSize', 1);
    }
    public download_graph2() {
        this.chart2.title.set('text', 'Forecasting Group - ' + this.createPlanRequestData.forecastingGroups + '\n' + 'Customer Planning Group- ' + this.createPlanRequestData.customerPlanningGroup + '\n' + 'Plants- ' + this.createPlanRequestData.plants);
        this.chart2.title.set('fontSize', 20);
        this.chart2.exportChart({ format: 'jpg' });
        this.chart2.title.set('text', ' ');
        this.chart2.title.set('fontSize', 1);
    }
    public reactivate_filter(a: number) {
        this.disable_filter = false;
        this.reactivate_filter_button = 1;
        // document.getElementById('apply_filter').style.background = '#00DD76';

        console.log("CPG---", this.filters[0]);

        this.cpgss = this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        this.plantss = this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        for (const abc of fgssselected2) {
            fgssselected1.push(abc);
        }
        for (const abc of fgssselected3) {
            fgssselected1.push(abc);
        }
        this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));
    }
    public brandsub(feature: any) {
        var t = this.getFiltersObject_brands();
        if (feature == 'brand') {
            var g = this.getFiltersObject_brands();
            var h = {
                what: 'brand',
                brandssub: t
            };
            this.skuService.brandssub(h).subscribe((res: any) => {
                this.filters1_subbrand = [];
                this.filters1_subbrand.push({
                    name: 'Sub-Brand',
                    key: 'subbrand',
                    isExpanded: false,
                    values: res
                });
            });
            this.skuService.brandslead(h).subscribe((res: any) => {
                this.filters1_leadsku = [];
                this.filters1_leadsku.push({
                    name: 'Lead Sku',
                    key: 'leadsku',
                    isExpanded: false,
                    values: res
                });
            });
        } else {
            var g = this.getFiltersObject_subbrands();
            var h = {
                what: 'subbrand',
                brandssub: g
            };
            this.skuService.brandssub(h).subscribe((res: any) => {
                this.filters1_brands = [];
                this.filters1_brands.push({
                    name: 'Brand',
                    key: 'brands',
                    isExpanded: false,
                    values: res
                });
            });
            this.skuService.brandslead(h).subscribe((res: any) => {
                this.filters1_leadsku = [];
                this.filters1_leadsku.push({
                    name: 'Lead Sku',
                    key: 'leadsku',
                    isExpanded: false,
                    values: res
                });
            });
        }
    }
    public change_color() {
        if (this.save_filter_id == "") {
            document.getElementById('btn_save_id').style.background = '#D5DBE2';
        }
        else {
            document.getElementById('btn_save_id').style.background = '#212833';
        }
    }
    public deactivate() {
        this.reactivate_filter_button = 0;
        document.getElementById('apply_filter').style.background = '#808080';
        this.disable_filter = false;
        const login = {
            Username: 'admin',
            activity: 'Applied Filter',
            datetimestamp: JSON.stringify(this.update)
        };
        this.skuService.sendLog(login).subscribe((res: any) => {
        });
    }
    // Event Handlers
    public onChangeParameters(name = 'change-horizon') {
        this.eventsSubject.next({
            page: name,
            data: JSON.parse(JSON.stringify(this.createPlanRequestData))
        });
        this.selectOptionsModalBtn.nativeElement.click();
    }
    public test(feature: any) {
        this.createPlanRequestData.uom = this.UOM;
        if (feature == 'Open' && this.granular1 == 'week') {
            document.getElementById('sopen').style.fontWeight = 'bold';
            document.getElementById('spromo').style.fontWeight = 'normal';
            document.getElementById('ssplit').style.fontWeight = 'normal';
            document.getElementById('stemp').style.fontWeight = 'normal';
            if (this.UOM == 'HL') {
                this.featureanalysis = 'Feature Analysis (HL)';
            } else if (this.UOM == 'PC') {
                this.featureanalysis = 'Feature Analysis (PC)';
            } else if (this.UOM == 'L') {
                this.featureanalysis = 'Feature Analysis (L)';
            } else if (this.UOM == 'PAL') {
                this.featureanalysis = 'Feature Analysis (PAL)';
            } else if (this.UOM == 'PPU') {
                this.featureanalysis = 'Feature Analysis (PPU)';
            } else if (this.UOM == 'BOT') {
                this.featureanalysis = 'Feature Analysis (BOT)';
            } else if (this.UOM == 'CU') {
                this.featureanalysis = 'Feature Analysis (CU)';
            }
            this.createPlanRequestData.which_feature = 'Open';
            this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {
                this.valuestring = 'Open Order';
                this.processFeatureGraphData(res);
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries1.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201452,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201552,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201652,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201752,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201852,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201952,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202053,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202152,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202252,
                                    endValue: 202301
                                },
                                {
                                    startValue: 202352,
                                    endValue: 202401
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201452,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201552,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201652,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201752,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201852,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';
                            content = e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>';
                            for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                }
                                content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [{
                        name: 'Open',
                        type: 'column',
                        gridColor: '#ffffff',
                        labelFontColor: 'black',
                        color: '#FF0076',
                        dataPoints: this.property
                    }]
                });
                this.chart2.render();
            });
        } else if (feature == 'Open' && this.granular1 == 'month') {
            document.getElementById('sopen').style.fontWeight = 'bold';
            document.getElementById('spromo').style.fontWeight = 'normal';
            document.getElementById('ssplit').style.fontWeight = 'normal';
            document.getElementById('stemp').style.fontWeight = 'normal';
            this.featureanalysis = 'Feature Analysis (HL)';
            if (this.UOM == 'HL') {
                this.featureanalysis = 'Feature Analysis (HL)';
            } else if (this.UOM == 'PC') {
                this.featureanalysis = 'Feature Analysis (PC)';
            } else if (this.UOM == 'L') {
                this.featureanalysis = 'Feature Analysis (L)';
            } else if (this.UOM == 'PAL') {
                this.featureanalysis = 'Feature Analysis (PAL)';
            } else if (this.UOM == 'PPU') {
                this.featureanalysis = 'Feature Analysis (PPU)';
            } else if (this.UOM == 'BOT') {
                this.featureanalysis = 'Feature Analysis (BOT)';
            } else if (this.UOM == 'CU') {
                this.featureanalysis = 'Feature Analysis (CU)';
            }
            this.createPlanRequestData.which_feature = 'Open';
            this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
                this.valuestring = 'Open Order';
                this.processFeatureGraphData(res);
                if (this.UOM == 'HL' && this.granular1 == 'week') {
                    this.enabled = 1;
                } else {
                    this.enabled = 0;
                }
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries1.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201413,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201513,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201613,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201713,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201813,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201913,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202013,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202113,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202213,
                                    endValue: 202301
                                },
                                {
                                    startValue: 202312,
                                    endValue: 202401
                                },
                                {
                                    startValue: 202412,
                                    endValue: 202501
                                },
                                {
                                    startValue: 202512,
                                    endValue: 202601
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201413,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201513,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201613,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201713,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201813,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201913,
                                color: '#F2F3F5'
                            }, {
                                startValue: 202000,
                                endValue: 202008,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontSize: 14,
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                }
                                content += '<span style="font-family: Montserrat;width:30px">' + e.entries[i].dataSeries.name + '</span>' + ' ' + '<span style="padding-left:34px"><strong>' + e.entries[i].dataPoint.y + '</strong>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [{
                        name: 'Open',
                        type: 'column',
                        gridColor: '#ffffff',
                        labelFontColor: 'black',
                        color: '#FF0076',
                        dataPoints: this.property
                    }]
                });
                this.chart2.render();
                this.chart2.render();
            });
        } else if (feature == 'Baseline' && this.granular1 == 'month') {
            document.getElementById('sopen').style.fontWeight = 'normal';
            document.getElementById('spromo').style.fontWeight = 'normal';
            document.getElementById('ssplit').style.fontWeight = 'bold';
            document.getElementById('stemp').style.fontWeight = 'normal';
            this.featureanalysis = 'Feature Analysis (HL)';
            if (this.UOM == 'HL') {
                this.featureanalysis = 'Feature Analysis (HL)';
            } else if (this.UOM == 'PC') {
                this.featureanalysis = 'Feature Analysis (PC)';
            } else if (this.UOM == 'L') {
                this.featureanalysis = 'Feature Analysis (L)';
            } else if (this.UOM == 'PAL') {
                this.featureanalysis = 'Feature Analysis (PAL)';
            } else if (this.UOM == 'PPU') {
                this.featureanalysis = 'Feature Analysis (PPU)';
            } else if (this.UOM == 'BOT') {
                this.featureanalysis = 'Feature Analysis (BOT)';
            } else if (this.UOM == 'CU') {
                this.featureanalysis = 'Feature Analysis (CU)';
            }
            this.createPlanRequestData.which_feature = 'Baseline';
            this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
                if (this.UOM == 'HL' && this.granular1 == 'week') {
                    this.enabled = 1;
                } else {
                    this.enabled = 0;
                }
                if (feature == 'Baseline') {
                    this.valuestring = 'Baseline';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Weather') {
                    this.valuestring = 'Weather';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Promo') {
                    this.valuestring = 'Promo';
                    this.processFeatureGraphData_open(res);
                }
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries1.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201412,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201512,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201612,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201712,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201812,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201912,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202012,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202112,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202212,
                                    endValue: 202301
                                },
                                {
                                    startValue: 202312,
                                    endValue: 202401
                                },
                                {
                                    startValue: 202412,
                                    endValue: 202501
                                },
                                {
                                    startValue: 202512,
                                    endValue: 202601
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201412,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201512,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201612,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201712,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201812,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201913,
                                color: '#F2F3F5'
                            }, {
                                startValue: 202000,
                                endValue: 202008,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 3px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076;"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right;font-size: 12px;">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/></div>';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;margin-left:3px;margin-top: 9px;color: #012F6F"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right;margin-right:3px;font-size: 12px;margin-top:5px;">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/></div>';
                                }
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Baseline', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: '#FF0076',
                            lineColor: '#FF0076',
                            dataPoints: this.property
                        },
                        {
                            name: 'Promo Effect', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: ' #012F6F',
                            lineColor: '#012F6F',
                            dataPoints: this.property3
                        }
                    ]
                });
                this.chart2.render();
            });
        } else if (feature == 'Baseline' && this.granular1 == 'week') {
            document.getElementById('sopen').style.fontWeight = 'normal';
            document.getElementById('spromo').style.fontWeight = 'normal';
            document.getElementById('ssplit').style.fontWeight = 'bold';
            document.getElementById('stemp').style.fontWeight = 'normal';
            this.featureanalysis = 'Feature Analysis (HL)';
            if (this.UOM == 'HL') {
                this.featureanalysis = 'Feature Analysis (HL)';
            } else if (this.UOM == 'PC') {
                this.featureanalysis = 'Feature Analysis (PC)';
            } else if (this.UOM == 'L') {
                this.featureanalysis = 'Feature Analysis (L)';
            } else if (this.UOM == 'PAL') {
                this.featureanalysis = 'Feature Analysis (PAL)';
            } else if (this.UOM == 'PPU') {
                this.featureanalysis = 'Feature Analysis (PPU)';
            } else if (this.UOM == 'BOT') {
                this.featureanalysis = 'Feature Analysis (BOT)';
            } else if (this.UOM == 'CU') {
                this.featureanalysis = 'Feature Analysis (CU)';
            }
            this.createPlanRequestData.which_feature = 'Baseline';
            this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {
                if (feature == 'Baseline') {
                    this.valuestring = 'Baseline';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Weather') {
                    this.valuestring = 'Weather';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Promo') {
                    this.valuestring = 'Promo';
                    this.processFeatureGraphData_open(res);
                }
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries1.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201452,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201552,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201652,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201752,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201852,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201952,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202053,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202152,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202252,
                                    endValue: 202301
                                },
                                {
                                    startValue: 202352,
                                    endValue: 202401
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201452,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201552,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201652,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201752,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201852,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 3px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076;"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right;margin-right:5px;;font-weight:700;font-style:bold;">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/></div>';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;margin-left:3px;margin-top: 9px;color: #012F6F"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right;margin-right:5px;margin-top:5px;;font-weight:700;font-style:bold;">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/></div>';
                                }
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Baseline', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: '#FF0076',
                            lineColor: '#FF0076',
                            dataPoints: this.property
                        },
                        {
                            name: 'Promo Effect', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: ' #012F6F',
                            lineColor: '#012F6F',
                            dataPoints: this.property3
                        }
                    ]
                });
                this.chart2.render();
            });
        } else if (feature == 'Promo' && this.granular1 == 'month') {
            document.getElementById('sopen').style.fontWeight = 'normal';
            document.getElementById('spromo').style.fontWeight = 'bold';
            document.getElementById('ssplit').style.fontWeight = 'normal';
            document.getElementById('stemp').style.fontWeight = 'normal';
            this.featureanalysis = 'Feature Analysis (C)';
            this.createPlanRequestData.which_feature = 'Promo';
            this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
                if (this.UOM == 'HL' && this.granular1 == 'week') {
                    this.enabled = 1;
                } else {
                    this.enabled = 0;
                }
                if (feature == 'Baseline') {
                    this.valuestring = 'Baseline';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Weather') {
                    this.valuestring = 'Weather';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Promo') {
                    this.valuestring = 'Promo';
                    this.processFeatureGraphData_open(res);
                }
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201413,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201513,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201613,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201713,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201813,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201913,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202013,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202113,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202213,
                                    endValue: 202301
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201413,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201513,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201613,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201713,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201813,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201913,
                                color: '#F2F3F5'
                            }, {
                                startValue: 202000,
                                endValue: 202008,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                }
                                content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Average',
                            type: 'line',
                            gridColor: '#ffffff',
                            labelFontColor: 'black',
                            lineColor: '#FF0076',
                            dataPoints: this.property3
                        }
                    ]
                });
                this.chart2.render();
            });
        } else if (feature == 'Promo' && this.granular1 == 'week') {
            document.getElementById('sopen').style.fontWeight = 'normal';
            document.getElementById('spromo').style.fontWeight = 'bold';
            document.getElementById('ssplit').style.fontWeight = 'normal';
            document.getElementById('stemp').style.fontWeight = 'normal';
            this.featureanalysis = 'Feature Analysis (C)';
            this.createPlanRequestData.which_feature = 'Promo';
            this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {
                if (feature == 'Baseline') {
                    this.valuestring = 'Baseline';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Weather') {
                    this.valuestring = 'Weather';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Promo') {
                    this.valuestring = 'Promo';
                    this.processFeatureGraphData_open(res);
                }
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201452,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201552,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201652,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201752,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201852,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201952,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202053,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202152,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202252,
                                    endValue: 202301
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201452,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201552,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201652,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201752,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201852,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                }
                                content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Average',
                            type: 'line',
                            gridColor: '#ffffff',
                            labelFontColor: 'black',
                            lineColor: '#FF0076',
                            dataPoints: this.property3
                        }
                    ]
                });
                this.chart2.render();
            });
        } else if (feature == 'Weather' && this.granular1 == 'month') {
            document.getElementById('sopen').style.fontWeight = 'normal';
            document.getElementById('spromo').style.fontWeight = 'normal';
            document.getElementById('ssplit').style.fontWeight = 'normal';
            document.getElementById('stemp').style.fontWeight = 'bold';
            this.skuService.getFeatureGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
                if (this.UOM == 'HL' && this.granular1 == 'week') {
                    this.enabled = 1;
                } else {
                    this.enabled = 0;
                }
                this.featureanalysis = 'Feature Analysis (Count)';
                if (feature == 'Baseline') {
                    this.valuestring = 'Baseline';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Weather') {
                    this.valuestring = 'Weather';
                    this.processFeatureGraphData_open_boolean(res);
                } else if (feature == 'Promo') {
                    this.valuestring = 'Promo';
                    this.processFeatureGraphData_open(res);
                }
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201413,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201513,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201613,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201713,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201813,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201913,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202013,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202113,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202213,
                                    endValue: 202300
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201452,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201552,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201652,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201752,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201852,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                }
                                content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            type: 'column',
                            color: '#46a5b9',
                            gridColor: '#ffffff',
                            labelFontColor: 'black',
                            dataPoints: this.property
                        }
                    ]
                });
                this.chart2.render();
            });
        } else if (feature == 'Weather' && this.granular1 == 'week') {
            document.getElementById('sopen').style.fontWeight = 'normal';
            document.getElementById('spromo').style.fontWeight = 'normal';
            document.getElementById('ssplit').style.fontWeight = 'normal';
            document.getElementById('stemp').style.fontWeight = 'bold';
            this.featureanalysis = 'Feature Analysis (Count)';
            this.skuService.getFeatureGraphData(this.createPlanRequestData).subscribe((res: any) => {
                if (feature == 'Baseline') {
                    this.valuestring = 'Baseline';
                    this.processFeatureGraphData_open(res);
                } else if (feature == 'Weather') {
                    this.valuestring = 'Weather';
                    this.processFeatureGraphData_open_boolean(res);
                } else if (feature == 'Promo') {
                    this.valuestring = 'Promo';
                    this.processFeatureGraphData_open(res);
                }
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201453,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201552,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201652,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201752,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201852,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201952,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202053,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202152,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202253,
                                    endValue: 202300
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201452,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201552,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201652,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201752,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201852,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                }
                                content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            type: 'column',
                            color: '#46a5b9',
                            gridColor: '#ffffff',
                            labelFontColor: 'black',
                            dataPoints: this.property
                        }
                    ]
                });
                this.chart2.render();
            });
        }
    }
    public refresh() {
        window.location.reload();
    }
    public bigImg(s) {
        var a = {
            material: s
        };
        this.skuService.fetchmaterialname(a).subscribe((res: any) => {
            this.skuname_down = res[0];
        }, (error) => {
        });
    }
    public normalImg() {
    }
    public setFilterValues(params) {
        this.disable_filter = true;
        if (params.selectName == "Sales Office") {
            this.filters2_list[0] = params.selectItems;
            this.reactivate_filter(1);
            this.onFilterCheckBoxChange121();
            this.calculate_number();
        }
        else if (params.selectName == "Trade Type") {
            this.filters2_list[1] = params.selectItems;
            this.reactivate_filter(1);
            this.onFilterCheckBoxChange121();
            this.calculate_number();
        }
        else if (params.selectName == "Brand") {
            var allBrandsNotSelected = false;
            this.filters1_brands = params.selectItems;
            for (const sku of this.filters1_brands[0].values) {
                if (!sku.isChecked) {
                    allBrandsNotSelected = true;
                }
            }
            if (!allBrandsNotSelected) {
                this.hogya = 100;
            }
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Sub-Brand") {
            var allSubsNotSelected = false;
            this.filters1_subbrand = params.selectItems;
            for (const sku of this.filters1_subbrand[0].values) {
                if (!sku.isChecked) {
                    allSubsNotSelected = true;
                }
            }
            if (allSubsNotSelected) {
                this.reactivate_filter(1);
            }
            this.calculate_number();
        }
        else if (params.selectName == "Lead Sku") {
            this.filters1_leadsku = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Own/3PP") {
            this.filters1_list[0] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Material Group") {
            this.filters1_list[1] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Global Category") {
            this.filters1_list[2] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Local Category") {
            this.filters1_list[3] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Primary Unit") {
            this.filters1_list[4] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Pack Size") {
            this.filters1_list[5] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Pack Type") {
            this.filters1_list[6] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Animal Farm Segment") {
            this.filters1_list[7] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "ABV") {
            this.filters1_list[8] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "Material Group NO") {
            this.filters1_list[9] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }
        else if (params.selectName == "SNP Planner") {
            this.filters1_list[10] = params.selectItems;
            this.reactivate_filter(1);
            this.calculate_number();
        }

    }
    public addedSkuIDsToSearch = [];
    public addItems(itemId: number) {
        this.addedSkuIDsToSearch.push(itemId);
        const itemIndex = this.skus_search.findIndex((item) => item.id === itemId);
        var item1 = this.skus_search[itemIndex];
        var arr = item1.name.split('-');
        var fin_item = arr[0] + '-' + arr[1];
        item1.name = fin_item;
        item1.isFiltered = false;
        this.selectedskus.push(item1);
        var flag = 0;
        for (const ab of this.skus) {
            if (item1.name === ab.name) {
                flag = 1;
            }
        }
        if (flag == 0) {
            document.getElementById('apply_filter').style.background = '#00DD76';
            this.second_sku.push(item1);
        } else if (flag == 1) {
        }
    }
    public fgshow() {
        this.pressed = true;
        document.getElementById("searchTheFG").style.borderRadius = "12px 12px 0px 0px";
        document.getElementById("searchTheFG").style.boxShadow = "0 0 0 0.2rem white";
        document.getElementById("searchTheFG").style.borderColor = "#ced4da";
    }
    public fghide() {
        this.pressed = false;
        document.getElementById("searchTheFG").style.borderRadius = "12px 12px 12px 12px";
    }
    public commentsall() {
        var aab: any = [];
        for (const abc of this.graphData) {
            if (abc.comments[0]) {
                aab.push({
                    name: abc.comments[0],
                    isSelected: false,
                    isFiltered: false
                });
            }
        }
        this.allselectedweek = JSON.parse(JSON.stringify(aab));
        this.allselectedweek = JSON.parse(JSON.stringify(this.allComments));
    }
    public checkratio(uomvalue) {
        this.UOM = uomvalue;
        var ratiodata = {
            leadsku: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
            uom: this.UOM
        };
        this.loading = true;
        this.skuService.checkratio(ratiodata).subscribe((res: any) => {
            this.loading = false;
            if (res == true) {
                this.updateTheTable();
            }
            else {
                window.alert("Error: UOM ratio for the materials doesn't match");
                this.UOM = 'HL';
                this.updateTheTable();
            }
        });
    }
    public updateTheTable() {
        if (this.views == "Aggregated") {
            if (this.granular1 == "week") {
                if (this.UOM == "HL") {
                    this.planningtable = 'Planning Table (HL)';
                    try {
                        document.getElementById('planningtable').innerHTML = 'Planning Table (HL)';
                        try {
                            document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL)';
                            this.forecastinganalysis = 'Forecast Analysis (HL)';
                            this.featureanalysis = 'Feature Analysis (HL)';
                        } catch (err) {
                        }
                        this.deactivate();
                        this.featureanalysis = 'Feature Analysis (HL)';
                    } catch (err) {
                    }
                    this.loading = true;
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0])
                    };
                    this.loading = true;
                    this.main_graph = true;
                    this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.loading = false;
                        this.processGraphData(res);
                        try {
                            document.getElementById('arrow').style.color = 'grey';
                        } catch (e) {
                        }
                        this.processFeatureGraphData(res);
                        this.valuestring = 'Promo';
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries1.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                theme: 'light2',
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.loading = false;
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#fff',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201453,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202253,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202353,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    visible: false,
                                    type: 'line',
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                    });
                }
                else if (this.UOM == "L") {
                    this.type123 = "week";
                    this.planningtable = 'Planning Table (L)';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (L)';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (L)';
                        this.forecastinganalysis = 'Forecast Analysis (L)';
                        this.featureanalysis = 'Feature Analysis (L)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_L(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202253,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202353,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201453,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202253,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202353,
                                            endValue: 202402
                                        },
                                        {
                                            startValue: 202453,
                                            endValue: 202500
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    type: 'line',
                                    visible: false,
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PC") {
                    this.planningtable = 'Planning Table (PC)';
                    this.type123 = "week";
                    document.getElementById('planningtable').innerHTML = 'Planning Table (PC)';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (PC)';
                        this.forecastinganalysis = 'Forecast Analysis (PC)';
                        this.featureanalysis = 'Feature Analysis (PC)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_week_uom(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201453,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202253,
                                            endValue: 202300
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201453,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202253,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202353,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PPU") {
                    this.planningtable = 'Planning Table (PPU)';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (PPU)';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (PPU)';
                        this.forecastinganalysis = 'Forecast Analysis (PPU)';
                        this.featureanalysis = 'Feature Analysis (PPU)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_week_ppu(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                interval: this.inter,
                                gridColor: '#ffffff',
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201453,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202253,
                                            endValue: 202300
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "BOT") {
                    this.planningtable = 'Planning Table (BOT)';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (BOT)';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (BOT)';
                        this.forecastinganalysis = 'Forecast Analysis (BOT)';
                        this.featureanalysis = 'Feature Analysis (BOT)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_week_bot(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                interval: this.inter,
                                gridColor: '#ffffff',
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PAL") {
                    this.planningtable = 'Planning Table (PAL)';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (PAL)';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (PAL)';
                        this.forecastinganalysis = 'Forecast Analysis (PAL)';
                        this.featureanalysis = 'Feature Analysis (PAL)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_pal(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                interval: this.inter,
                                gridColor: '#ffffff',
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "CU") {
                    this.planningtable = 'Planning Table (CU)';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (CU)';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (CU)';
                        this.forecastinganalysis = 'Forecast Analysis (CU)';
                        this.featureanalysis = 'Feature Analysis (CU)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_cu(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                interval: this.inter,
                                gridColor: '#ffffff',
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "HLV") {
                    this.planningtable = 'Planning Table (HLV)';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (HLV)';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HLV)';
                        this.forecastinganalysis = 'Forecast Analysis (HLV)';
                        this.featureanalysis = 'Feature Analysis (HLV)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_hlv(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                interval: this.inter,
                                gridColor: '#ffffff',
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202053,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202100,
                                        endValue: 202103,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else {
                    window.alert("Something went wrong. Please try again - aggregated - week");
                }
            }
            else if (this.granular1 == "month") {
                if (this.UOM == "HL") {
                    this.featureanalysis = 'Feature Analysis (HL)';
                    this.type123 = "month";
                    this.planningtable = 'Planning Table (HL) Month';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (HL) Month ';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL) Month';
                        this.forecastinganalysis = 'Forecast Analysis (HL) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: this.fgssselected.map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201500
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202313,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202312,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    type: 'line',
                                    visible: false,
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                    this.chart1.render();
                    this.chart1.render();
                }
                else if (this.UOM == "L") {
                    this.type123 = "month";
                    this.planningtable = 'Planning Table (L) Month';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (L) Month';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (L) Month';
                        this.forecastinganalysis = 'Forecast Analysis (L) Month';
                        this.featureanalysis = 'Feature Analysis (L) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_L_month(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202312,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202312,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PC") {
                    this.planningtable = 'Planning Table (PC) Month';
                    this.type123 = "month";
                    document.getElementById('planningtable').innerHTML = 'Planning Table (PC) Month';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (PC) Month';
                        this.forecastinganalysis = 'Forecast Analysis (PC) Month';
                        this.featureanalysis = 'Feature Analysis (PC) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_week_uom_monthly(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202312,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PPU") {
                    this.type123 = "month";
                    this.planningtable = 'Planning Table (PPU) Month';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (PPU) Month';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (PPU) Month';
                        this.forecastinganalysis = 'Forecast Analysis (PPU) Month';
                        this.featureanalysis = 'Feature Analysis (PPU) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_ppu_month(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202312,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "BOT") {
                    this.planningtable = 'Planning Table (BOT) Month';
                    this.type123 = "month";
                    document.getElementById('planningtable').innerHTML = 'Planning Table (BOT) Month';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (BOT) Month';
                        this.forecastinganalysis = 'Forecast Analysis (BOT) Month';
                        this.featureanalysis = 'Feature Analysis (BOT) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_bot_month(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202312,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PAL") {
                    this.type123 = "month";
                    this.planningtable = 'Planning Table (PAL) Month';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (PAL)  Month';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (PAL) Month';
                        this.forecastinganalysis = 'Forecast Analysis (PAL) Month';
                        this.featureanalysis = 'Feature Analysis (PAL) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_pal_monthly(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202313,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "CU") {
                    this.type123 = "month";
                    this.planningtable = 'Planning Table (CU) Month';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (CU) Month';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (CU)';
                        this.forecastinganalysis = 'Forecast Analysis (CU) Month';
                        this.featureanalysis = 'Feature Analysis (CU) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_cu_monthly(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202313,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "HLV") {
                    this.type123 = "month";
                    this.planningtable = 'Planning Table (HLV) Month';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (HLV) Month';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HLV)';
                        this.forecastinganalysis = 'Forecast Analysis (HLV) Month';
                        this.featureanalysis = 'Feature Analysis (HLV) Month';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_hlv_monthly(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.chart2.render();
                        this.secondgraph = 'Baseline';
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201413,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201513,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201613,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201713,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201813,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201913,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202013,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202113,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202213,
                                            endValue: 202300
                                        },
                                        {
                                            startValue: 202313,
                                            endValue: 202402
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201413,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201513,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201613,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201713,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201813,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201913,
                                        color: '#F2F3F5'
                                    }, {
                                        startValue: 202000,
                                        endValue: 202007,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else {
                    window.alert("Something went wrong. Please try again - aggregated - month");
                }
            }
            else {
                window.alert("Something went wrong. Please try again - aggregated");
            }
        }
        else if (this.views == "Sku View") {
            if (this.granular1 == "week") {
                if (this.UOM == "HL") {
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0])
                    };
                    this.loading = true;
                    this.skuService.getGraphData12345(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.UOM = 'HL';
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        try {
                            this.planningtable = 'Planning Table (HL)';
                            document.getElementById('planningtable').innerHTML = 'Planning Table (HL)';
                            try {
                                document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL)';
                                this.forecastinganalysis = 'Forecast Analysis (HL)';
                                this.featureanalysis = 'Feature Analysis (HL)';
                            } catch (err) {
                            }
                            this.greystart = res.start;
                            this.granular1 = 'week';
                            this.greystart = res.start;
                            if (res.res.length > 20) {
                                this.inter = (res.res.length / 10);
                            } else {
                                this.inter = 1;
                            }
                        } catch (err) {
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData_2(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PC" || this.UOM == "BOT" || this.UOM == "PAL" || this.UOM == "L" || this.UOM == "CU" || this.UOM == "PPU" || this.UOM == "HLV") {
                    this.planningtable = 'Planning Table (' + this.UOM + ')';
                    this.type123 = "week";
                    document.getElementById('planningtable').innerHTML = 'Planning Table (' + this.UOM + ')';
                    try {
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (' + this.UOM + ')';
                        this.forecastinganalysis = 'Forecast Analysis (' + this.UOM + ')';
                    } catch (err) {
                    }
                    this.featureanalysis = 'Feature Analysis (' + this.UOM + ')';
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        uom1: this.UOM
                    };
                    this.loading = true;
                    this.skuService.getGraphData_week_uom2(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData_2(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else {
                    window.alert("Something went wrong. Please try again - sku view - week");
                }
            }
            else if (this.granular1 == "month") {
                this.type123 = "month";
                this.planningtable = 'Planning Table (' + this.UOM + ')';
                document.getElementById('planningtable').innerHTML = 'Planning Table (' + this.UOM + ')';
                try {
                    document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (' + this.UOM + ')';
                    this.forecastinganalysis = 'Forecast Analysis (' + this.UOM + ')';
                } catch (err) {
                }
                this.featureanalysis = 'Feature Analysis (' + this.UOM + ')';
                this.createPlanRequestData = {
                    startWeek: this.createPlanRequestData.startWeek,
                    endWeek: this.createPlanRequestData.endWeek,
                    prevactuals: this.createPlanRequestData.prevactuals,
                    forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                    customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    uom1: this.UOM
                };
                this.loading = true;
                this.skuService.getDemandTable_UOM_skuview_month(this.createPlanRequestData).subscribe((res: any) => {
                    this.eventsSubject.next({
                        page: null,
                        reset: true,
                    });
                    this.loading = false;
                    if (this.UOM == 'HL' && this.granular1 == 'week') {
                        this.enabled = 1;
                    } else {
                        this.enabled = 0;
                    }
                    this.allComments = res.combinedcomment;
                    this.allComments_harshit = [];
                    for (const abc of this.allComments) {
                        this.allComments_harshit.push({
                            name: abc,
                            isSelected: false,
                            isFiltered: false
                        });
                    }
                    this.greystart = res.start;
                    this.greystart = res.start;
                    if (res.res.length > 20) {
                        this.inter = (res.res.length / 10);
                    } else {
                        this.inter = 1;
                    }
                    this.createPlanRequestData.brands = res.req.brands;
                    this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                    this.createPlanRequestData.subbrand = res.req.subbrand;
                    this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                    this.createPlanRequestData.Trade = res.req.trade;
                    this.createPlanRequestData.Sales = res.req.sales;
                    this.createPlanRequestData.globalBev = res.req.globalBev;
                    this.createPlanRequestData.materialgroup = res.req.materialgroup;
                    this.createPlanRequestData.baseunit = res.req.baseunit;
                    this.createPlanRequestData.pack_type = res.req.pack_type;
                    this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                    this.createPlanRequestData.pack_size = res.req.pack_size;
                    this.createPlanRequestData.cpgname = res.req.cpgname;
                    this.processGraphData_2(res);
                    this.processFeatureGraphData(res);
                    this.createFilterObject(res);
                    this.commentsall();
                    this.chart2 = new CanvasJS.Chart('chartContainer2', {
                        animationEnabled: true,
                        backgroundColor: '#FFFFFF',
                        legend: {
                            cursor: 'pointer',
                            itemclick: this.toggleDataSeries.bind(this)
                        },
                        axisX: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                            interval: this.inter,
                            scaleBreaks: {
                                type: 'blank',
                                spacing: 0,
                                customBreaks: [
                                    {
                                        startValue: 201413,
                                        endValue: 201501
                                    },
                                    {
                                        startValue: 201513,
                                        endValue: 201600
                                    },
                                    {
                                        startValue: 201613,
                                        endValue: 201700
                                    },
                                    {
                                        startValue: 201713,
                                        endValue: 201800
                                    },
                                    {
                                        startValue: 201813,
                                        endValue: 201900
                                    },
                                    {
                                        startValue: 201913,
                                        endValue: 202000
                                    },
                                    {
                                        startValue: 202013,
                                        endValue: 202100
                                    },
                                    {
                                        startValue: 202152,
                                        endValue: 202200
                                    },
                                    {
                                        startValue: 202213,
                                        endValue: 202300
                                    }
                                ]
                            },
                            stripLines: [
                                {
                                    startValue: 201400,
                                    endValue: 201413,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201500,
                                    endValue: 201513,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201600,
                                    endValue: 201613,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201700,
                                    endValue: 201713,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201800,
                                    endValue: 201813,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201900,
                                    endValue: 201913,
                                    color: '#F2F3F5'
                                }, {
                                    startValue: 202000,
                                    endValue: 202007,
                                    color: '#F2F3F5'
                                },
                            ]
                        },
                        axisY: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                        },
                        toolTip: {
                            shared: true,
                            borderColor: "#FFFFFF",
                            fontFamily: "Montserrat", contentFormatter: function (e) {
                                var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                    if (e.entries[i].dataSeries.name == 'Baseline') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                    }
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/><div>';
                                }
                                return content;
                            }
                        },
                        data: [
                            {
                                name: 'Baseline', visible: true,
                                type: 'line', markerSize: 7,
                                gridColor: '#ffffff',
                                color: '#FF0076',
                                lineColor: '#FF0076',
                                dataPoints: this.property
                            },
                            {
                                name: 'Promo Effect', visible: true,
                                type: 'line', markerSize: 7,
                                gridColor: '#ffffff',
                                color: ' #012F6F',
                                lineColor: '#012F6F',
                                dataPoints: this.property3
                            }
                        ]
                    });
                    this.chart2.render();
                    this.secondgraph = 'Baseline';
                    this.chart1 = new CanvasJS.Chart('chartContainer1', {
                        title: { text: ' ', fontStyle: 'no', },
                        animationEnabled: true,
                        backgroundColor: '#FFFFFF',
                        legend: {
                            cursor: 'pointer',
                            itemclick: this.toggleDataSeries.bind(this)
                        },
                        axisX: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                            interval: this.inter,
                            scaleBreaks: {
                                type: 'blank',
                                spacing: 0,
                                customBreaks: [
                                    {
                                        startValue: 201452,
                                        endValue: 201501
                                    },
                                    {
                                        startValue: 201552,
                                        endValue: 201600
                                    },
                                    {
                                        startValue: 201652,
                                        endValue: 201700
                                    },
                                    {
                                        startValue: 201752,
                                        endValue: 201800
                                    },
                                    {
                                        startValue: 201852,
                                        endValue: 201900
                                    },
                                    {
                                        startValue: 201952,
                                        endValue: 202000
                                    },
                                    {
                                        startValue: 202053,
                                        endValue: 202100
                                    },
                                    {
                                        startValue: 202152,
                                        endValue: 202200
                                    },
                                    {
                                        startValue: 202252,
                                        endValue: 202301
                                    }
                                ]
                            },
                            stripLines: [
                                {
                                    startValue: 201400,
                                    endValue: 201452,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201500,
                                    endValue: 201552,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201600,
                                    endValue: 201652,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201700,
                                    endValue: 201752,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201800,
                                    endValue: 201852,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201900,
                                    endValue: 201952,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 202000,
                                    endValue: 202034,
                                    color: '#F2F3F5'
                                },
                            ]
                        },
                        axisY: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                        },
                        toolTip: {
                            shared: true,
                            borderColor: "#FFFFFF",
                            fontFamily: "Montserrat", contentFormatter: function (e) {
                                var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                    if (e.entries[i].dataSeries.name == 'Actual LY') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Actuals') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                    }
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/><div>';
                                }
                                return content;
                            }
                        },
                        data: [
                            {
                                name: 'Actual LY',
                                type: 'line',
                                visible: false,
                                color: this.lastyearDataPointColor,
                                lineColor: this.lastyearDataPointColor,
                                dataPoints: this.lastYearDataPoints
                            },
                            {
                                name: 'ML Forecast', visible: true,
                                type: 'line',
                                color: this.mlDataPointColor,
                                lineColor: this.mlDataPointColor,
                                dataPoints: this.mlDataPoints
                            },
                            {
                                name: 'APO Forecast',
                                visible: false,
                                type: 'line',
                                color: this.aopDataPointColor,
                                lineColor: this.aopDataPointColor,
                                dataPoints: this.aopDataPoints
                            },
                            {
                                name: 'Final Forecast', visible: true,
                                type: 'line',
                                color: this.finalForecastPointColor,
                                lineColor: this.finalForecastPointColor,
                                dataPoints: this.finalForecastDataPoints
                            },
                            {
                                name: 'Actuals', visible: true,
                                type: 'line',
                                color: this.actualDataPointColor,
                                lineColor: this.actualDataPointColor,
                                dataPoints: this.actualDataPoints
                            }
                        ]
                    });
                    this.chart1.render();
                    this.CanvasJSDataAsCSV();
                    this.selectOptionsModalCancel.nativeElement.click();
                });
            }
            else {
                window.alert("Something went wrong. Please try again - sku view");
            }
        }
        else if (this.views == "Detailed View") {
            if (this.granular1 == "week") {
                if (this.UOM == "HL") {
                    try {
                        this.planningtable = 'Planning Table (HL)';
                        document.getElementById('planningtable').innerHTML = 'Planning Table (HL)';
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL)';
                        this.forecastinganalysis = 'Forecast Analysis (HL)';
                        this.featureanalysis = 'Feature Analysis (HL)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        uom1: this.UOM
                    };
                    this.loading = true;
                    this.skuService.getGraphData1234(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData_1(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PC" || this.UOM == "BOT" || this.UOM == "PAL" || this.UOM == "L" || this.UOM == "CU" || this.UOM == "PPU" || this.UOM == "HLV") {
                    try {
                        this.planningtable = 'Planning Table (' + this.UOM + ')';
                        document.getElementById('planningtable').innerHTML = 'Planning Table (' + this.UOM + ')';
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (' + this.UOM + ')';
                        this.forecastinganalysis = 'Forecast Analysis (' + this.UOM + ')';
                        this.featureanalysis = 'Feature Analysis (' + this.UOM + ')';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        uom1: this.UOM,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_week_uom3(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData_1(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else {
                    window.alert("Something went wrong. Please try again - detailed view - week");
                }
            }
            else if (this.granular1 == "month") {
                try {
                    this.planningtable = 'Planning Table (' + this.UOM + ')';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (' + this.UOM + ')';
                    document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (' + this.UOM + ')';
                    this.forecastinganalysis = 'Forecast Analysis (' + this.UOM + ')';
                    this.featureanalysis = 'Feature Analysis (' + this.UOM + ')';
                } catch (err) {
                }
                this.createPlanRequestData = {
                    startWeek: this.createPlanRequestData.startWeek,
                    endWeek: this.createPlanRequestData.endWeek,
                    prevactuals: this.createPlanRequestData.prevactuals,
                    forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                    customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    uom1: this.UOM
                };
                this.loading = true;
                this.skuService.getGraphData1234_detail_month(this.createPlanRequestData).subscribe((res: any) => {
                    this.eventsSubject.next({
                        page: null,
                        reset: true,
                    });
                    this.loading = false;
                    if (this.UOM == 'HL' && this.granular1 == 'week') {
                        this.enabled = 1;
                    } else {
                        this.enabled = 0;
                    }
                    this.allComments = res.combinedcomment;
                    this.allComments_harshit = [];
                    for (const abc of this.allComments) {
                        this.allComments_harshit.push({
                            name: abc,
                            isSelected: false,
                            isFiltered: false
                        });
                    }
                    this.greystart = res.start;
                    this.greystart = res.start;
                    if (res.res.length > 20) {
                        this.inter = (res.res.length / 10);
                    } else {
                        this.inter = 1;
                    }
                    this.createPlanRequestData.brands = res.req.brands;
                    this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                    this.createPlanRequestData.subbrand = res.req.subbrand;
                    this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                    this.createPlanRequestData.Trade = res.req.trade;
                    this.createPlanRequestData.Sales = res.req.sales;
                    this.createPlanRequestData.globalBev = res.req.globalBev;
                    this.createPlanRequestData.materialgroup = res.req.materialgroup;
                    this.createPlanRequestData.baseunit = res.req.baseunit;
                    this.createPlanRequestData.pack_type = res.req.pack_type;
                    this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                    this.createPlanRequestData.pack_size = res.req.pack_size;
                    this.createPlanRequestData.cpgname = res.req.cpgname;
                    this.processGraphData_1(res);
                    this.processFeatureGraphData(res);
                    this.createFilterObject(res);
                    this.commentsall();
                    this.chart2 = new CanvasJS.Chart('chartContainer2', {
                        animationEnabled: true,
                        backgroundColor: '#FFFFFF',
                        legend: {
                            cursor: 'pointer',
                            itemclick: this.toggleDataSeries.bind(this)
                        },
                        axisX: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                            interval: this.inter,
                            scaleBreaks: {
                                type: 'blank',
                                spacing: 0,
                                customBreaks: [
                                    {
                                        startValue: 201413,
                                        endValue: 201501
                                    },
                                    {
                                        startValue: 201513,
                                        endValue: 201600
                                    },
                                    {
                                        startValue: 201613,
                                        endValue: 201700
                                    },
                                    {
                                        startValue: 201713,
                                        endValue: 201800
                                    },
                                    {
                                        startValue: 201813,
                                        endValue: 201900
                                    },
                                    {
                                        startValue: 201913,
                                        endValue: 202000
                                    },
                                    {
                                        startValue: 202013,
                                        endValue: 202100
                                    },
                                    {
                                        startValue: 202152,
                                        endValue: 202200
                                    },
                                    {
                                        startValue: 202213,
                                        endValue: 202300
                                    }
                                ]
                            },
                            stripLines: [
                                {
                                    startValue: 201400,
                                    endValue: 201413,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201500,
                                    endValue: 201513,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201600,
                                    endValue: 201613,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201700,
                                    endValue: 201713,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201800,
                                    endValue: 201813,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201900,
                                    endValue: 20202,
                                    color: '#F2F3F5'
                                },
                            ]
                        },
                        axisY: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                        },
                        toolTip: {
                            shared: true,
                            borderColor: "#FFFFFF",
                            fontFamily: "Montserrat", contentFormatter: function (e) {
                                var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                    if (e.entries[i].dataSeries.name == 'Baseline') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                    }
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/><div>';
                                }
                                return content;
                            }
                        },
                        data: [
                            {
                                name: 'Baseline', visible: true,
                                type: 'line', markerSize: 7,
                                gridColor: '#ffffff',
                                color: '#FF0076',
                                lineColor: '#FF0076',
                                dataPoints: this.property
                            },
                            {
                                name: 'Promo Effect', visible: true,
                                type: 'line', markerSize: 7,
                                gridColor: '#ffffff',
                                color: ' #012F6F',
                                lineColor: '#012F6F',
                                dataPoints: this.property3
                            }
                        ]
                    });
                    this.chart2.render();
                    this.secondgraph = 'Baseline';
                    this.chart1 = new CanvasJS.Chart('chartContainer1', {
                        title: { text: ' ', fontStyle: 'no', },
                        animationEnabled: true,
                        backgroundColor: '#FFFFFF',
                        legend: {
                            cursor: 'pointer',
                            itemclick: this.toggleDataSeries.bind(this)
                        },
                        axisX: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                            interval: this.inter,
                            scaleBreaks: {
                                type: 'blank',
                                spacing: 0,
                                customBreaks: [
                                    {
                                        startValue: 201452,
                                        endValue: 201501
                                    },
                                    {
                                        startValue: 201552,
                                        endValue: 201600
                                    },
                                    {
                                        startValue: 201652,
                                        endValue: 201700
                                    },
                                    {
                                        startValue: 201752,
                                        endValue: 201800
                                    },
                                    {
                                        startValue: 201852,
                                        endValue: 201900
                                    },
                                    {
                                        startValue: 201952,
                                        endValue: 202000
                                    },
                                    {
                                        startValue: 202053,
                                        endValue: 202100
                                    },
                                    {
                                        startValue: 202152,
                                        endValue: 202200
                                    },
                                    {
                                        startValue: 202252,
                                        endValue: 202301
                                    }
                                ]
                            },
                            stripLines: [
                                {
                                    startValue: 201400,
                                    endValue: 201452,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201500,
                                    endValue: 201552,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201600,
                                    endValue: 201652,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201700,
                                    endValue: 201752,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201800,
                                    endValue: 201852,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201900,
                                    endValue: 201952,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 202000,
                                    endValue: 202034,
                                    color: '#F2F3F5'
                                },
                            ]
                        },
                        axisY: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                        },
                        toolTip: {
                            shared: true,
                            borderColor: "#FFFFFF",
                            fontFamily: "Montserrat", contentFormatter: function (e) {
                                var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                    if (e.entries[i].dataSeries.name == 'Actual LY') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Actuals') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                    }
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/><div>';
                                }
                                return content;
                            }
                        },
                        data: [
                            {
                                name: 'Actual LY',
                                type: 'line',
                                visible: false,
                                color: this.lastyearDataPointColor,
                                lineColor: this.lastyearDataPointColor,
                                dataPoints: this.lastYearDataPoints
                            },
                            {
                                name: 'ML Forecast', visible: true,
                                type: 'line',
                                color: this.mlDataPointColor,
                                lineColor: this.mlDataPointColor,
                                dataPoints: this.mlDataPoints
                            },
                            {
                                name: 'APO Forecast',
                                visible: false,
                                type: 'line',
                                color: this.aopDataPointColor,
                                lineColor: this.aopDataPointColor,
                                dataPoints: this.aopDataPoints
                            },
                            {
                                name: 'Final Forecast', visible: true,
                                type: 'line',
                                color: this.finalForecastPointColor,
                                lineColor: this.finalForecastPointColor,
                                dataPoints: this.finalForecastDataPoints
                            },
                            {
                                name: 'Actuals', visible: true,
                                type: 'line',
                                color: this.actualDataPointColor,
                                lineColor: this.actualDataPointColor,
                                dataPoints: this.actualDataPoints
                            }
                        ]
                    });
                    this.chart1.render();
                    this.CanvasJSDataAsCSV();
                    this.selectOptionsModalCancel.nativeElement.click();
                });
            }
            else {
                window.alert("Something went wrong. Please try again - detailed view");
            }
        }
        else if (this.views == "Detailed View_material") {
            if (this.granular1 == "week") {
                if (this.UOM == "HL") {
                    try {
                        this.planningtable = 'Planning Table (HL)';
                        document.getElementById('planningtable').innerHTML = 'Planning Table (HL)';
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL)';
                        this.forecastinganalysis = 'Forecast Analysis (HL)';
                        this.featureanalysis = 'Feature Analysis (HL)';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        uom1: this.UOM
                    };
                    this.loading = true;
                    this.skuService.getGraphData1234_material(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData_1_material(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else if (this.UOM == "PC" || this.UOM == "BOT" || this.UOM == "PAL" || this.UOM == "L" || this.UOM == "CU" || this.UOM == "PPU" || this.UOM == "HLV") {
                    try {
                        this.planningtable = 'Planning Table (' + this.UOM + ')';
                        document.getElementById('planningtable').innerHTML = 'Planning Table (' + this.UOM + ')';
                        document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (' + this.UOM + ')';
                        this.forecastinganalysis = 'Forecast Analysis (' + this.UOM + ')';
                        this.featureanalysis = 'Feature Analysis (' + this.UOM + ')';
                    } catch (err) {
                    }
                    this.createPlanRequestData = {
                        startWeek: this.createPlanRequestData.startWeek,
                        endWeek: this.createPlanRequestData.endWeek,
                        prevactuals: this.createPlanRequestData.prevactuals,
                        uom1: this.UOM,
                        forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                        customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    };
                    this.loading = true;
                    this.skuService.getGraphData_week_uom3_material(this.createPlanRequestData).subscribe((res: any) => {
                        this.eventsSubject.next({
                            page: null,
                            reset: true,
                        });
                        this.loading = false;
                        this.granular1 = 'week';
                        if (this.UOM == 'HL' && this.granular1 == 'week') {
                            this.enabled = 1;
                        } else {
                            this.enabled = 0;
                        }
                        this.allComments = res.combinedcomment;
                        this.allComments_harshit = [];
                        for (const abc of this.allComments) {
                            this.allComments_harshit.push({
                                name: abc,
                                isSelected: false,
                                isFiltered: false
                            });
                        }
                        this.greystart = res.start;
                        this.greystart = res.start;
                        if (res.res.length > 20) {
                            this.inter = (res.res.length / 10);
                        } else {
                            this.inter = 1;
                        }
                        this.createPlanRequestData.brands = res.req.brands;
                        this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                        this.createPlanRequestData.subbrand = res.req.subbrand;
                        this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                        this.createPlanRequestData.Trade = res.req.trade;
                        this.createPlanRequestData.Sales = res.req.sales;
                        this.createPlanRequestData.globalBev = res.req.globalBev;
                        this.createPlanRequestData.materialgroup = res.req.materialgroup;
                        this.createPlanRequestData.baseunit = res.req.baseunit;
                        this.createPlanRequestData.pack_type = res.req.pack_type;
                        this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                        this.createPlanRequestData.pack_size = res.req.pack_size;
                        this.createPlanRequestData.cpgname = res.req.cpgname;
                        this.processGraphData_1_material(res);
                        this.processFeatureGraphData(res);
                        this.createFilterObject(res);
                        this.commentsall();
                        this.chart2 = new CanvasJS.Chart('chartContainer2', {
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        },
                                        {
                                            startValue: 202352,
                                            endValue: 202401
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Baseline') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Baseline', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: '#FF0076',
                                    lineColor: '#FF0076',
                                    dataPoints: this.property
                                },
                                {
                                    name: 'Promo Effect', visible: true,
                                    type: 'line', markerSize: 7,
                                    gridColor: '#ffffff',
                                    color: ' #012F6F',
                                    lineColor: '#012F6F',
                                    dataPoints: this.property3
                                }
                            ]
                        });
                        this.secondgraph = 'Baseline';
                        this.chart2.render();
                        this.chart1 = new CanvasJS.Chart('chartContainer1', {
                            title: { text: ' ', fontStyle: 'no', },
                            animationEnabled: true,
                            backgroundColor: '#FFFFFF',
                            legend: {
                                cursor: 'pointer',
                                itemclick: this.toggleDataSeries.bind(this)
                            },
                            axisX: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                                interval: this.inter,
                                scaleBreaks: {
                                    type: 'blank',
                                    spacing: 0,
                                    customBreaks: [
                                        {
                                            startValue: 201452,
                                            endValue: 201501
                                        },
                                        {
                                            startValue: 201552,
                                            endValue: 201600
                                        },
                                        {
                                            startValue: 201652,
                                            endValue: 201700
                                        },
                                        {
                                            startValue: 201752,
                                            endValue: 201800
                                        },
                                        {
                                            startValue: 201852,
                                            endValue: 201900
                                        },
                                        {
                                            startValue: 201952,
                                            endValue: 202000
                                        },
                                        {
                                            startValue: 202053,
                                            endValue: 202100
                                        },
                                        {
                                            startValue: 202152,
                                            endValue: 202200
                                        },
                                        {
                                            startValue: 202252,
                                            endValue: 202301
                                        }
                                    ]
                                },
                                stripLines: [
                                    {
                                        startValue: 201400,
                                        endValue: 201452,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201500,
                                        endValue: 201552,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201600,
                                        endValue: 201652,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201700,
                                        endValue: 201752,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201800,
                                        endValue: 201852,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 201900,
                                        endValue: 201952,
                                        color: '#F2F3F5'
                                    },
                                    {
                                        startValue: 202000,
                                        endValue: 202034,
                                        color: '#F2F3F5'
                                    },
                                ]
                            },
                            axisY: {
                                valueFormatString: '######', labelFontFamily: 'Montserrat',
                                labelFontWeight: "400",
                                labelFontSize: 12,
                                labelFontColor: "#8BA0B9",
                                gridColor: '#ffffff',
                            },
                            toolTip: {
                                shared: true,
                                borderColor: "#FFFFFF",
                                fontFamily: "Montserrat", contentFormatter: function (e) {
                                    var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                    content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                        if (e.entries[i].dataSeries.name == 'Actual LY') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                        }
                                        if (e.entries[i].dataSeries.name == 'Actuals') {
                                            content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                        }
                                        content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                        content += '<br/><div>';
                                    }
                                    return content;
                                }
                            },
                            data: [
                                {
                                    name: 'Actual LY',
                                    type: 'line',
                                    visible: false,
                                    color: this.lastyearDataPointColor,
                                    lineColor: this.lastyearDataPointColor,
                                    dataPoints: this.lastYearDataPoints
                                },
                                {
                                    name: 'ML Forecast', visible: true,
                                    type: 'line',
                                    color: this.mlDataPointColor,
                                    lineColor: this.mlDataPointColor,
                                    dataPoints: this.mlDataPoints
                                },
                                {
                                    name: 'APO Forecast',
                                    visible: false,
                                    type: 'line',
                                    color: this.aopDataPointColor,
                                    lineColor: this.aopDataPointColor,
                                    dataPoints: this.aopDataPoints
                                },
                                {
                                    name: 'Final Forecast', visible: true,
                                    type: 'line',
                                    color: this.finalForecastPointColor,
                                    lineColor: this.finalForecastPointColor,
                                    dataPoints: this.finalForecastDataPoints
                                },
                                {
                                    name: 'Actuals', visible: true,
                                    type: 'line',
                                    color: this.actualDataPointColor,
                                    lineColor: this.actualDataPointColor,
                                    dataPoints: this.actualDataPoints
                                }
                            ]
                        });
                        this.chart1.render();
                        this.CanvasJSDataAsCSV();
                        this.selectOptionsModalCancel.nativeElement.click();
                    });
                }
                else {
                    window.alert("Something went wrong. Please try again - detailed view material - week");
                }
            }
            else if (this.granular1 == "month") {
                try {
                    this.planningtable = 'Planning Table (' + this.UOM + ')';
                    document.getElementById('planningtable').innerHTML = 'Planning Table (' + this.UOM + ')';
                    document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (' + this.UOM + ')';
                    this.forecastinganalysis = 'Forecast Analysis (' + this.UOM + ')';
                    this.featureanalysis = 'Feature Analysis (' + this.UOM + ')';
                } catch (err) {
                }
                this.createPlanRequestData = {
                    startWeek: this.createPlanRequestData.startWeek,
                    endWeek: this.createPlanRequestData.endWeek,
                    prevactuals: this.createPlanRequestData.prevactuals,
                    forecastingGroups: JSON.parse(JSON.stringify(this.fgssselected)).map(item => item.name),
                    customerPlanningGroup: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    plants: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    uom1: this.UOM
                };
                this.loading = true;
                this.skuService.getGraphData1234_detail_month_material(this.createPlanRequestData).subscribe((res: any) => {
                    this.eventsSubject.next({
                        page: null,
                        reset: true,
                    });
                    this.loading = false;
                    if (this.UOM == 'HL' && this.granular1 == 'week') {
                        this.enabled = 1;
                    } else {
                        this.enabled = 0;
                    }
                    this.allComments = res.combinedcomment;
                    this.allComments_harshit = [];
                    for (const abc of this.allComments) {
                        this.allComments_harshit.push({
                            name: abc,
                            isSelected: false,
                            isFiltered: false
                        });
                    }
                    this.greystart = res.start;
                    this.greystart = res.start;
                    if (res.res.length > 20) {
                        this.inter = (res.res.length / 10);
                    } else {
                        this.inter = 1;
                    }
                    this.createPlanRequestData.brands = res.req.brands;
                    this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                    this.createPlanRequestData.subbrand = res.req.subbrand;
                    this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                    this.createPlanRequestData.Trade = res.req.trade;
                    this.createPlanRequestData.Sales = res.req.sales;
                    this.createPlanRequestData.globalBev = res.req.globalBev;
                    this.createPlanRequestData.materialgroup = res.req.materialgroup;
                    this.createPlanRequestData.baseunit = res.req.baseunit;
                    this.createPlanRequestData.pack_type = res.req.pack_type;
                    this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                    this.createPlanRequestData.pack_size = res.req.pack_size;
                    this.createPlanRequestData.cpgname = res.req.cpgname;
                    this.processGraphData_1_material(res);
                    this.processFeatureGraphData(res);
                    this.createFilterObject(res);
                    this.commentsall();
                    this.chart2 = new CanvasJS.Chart('chartContainer2', {
                        animationEnabled: true,
                        backgroundColor: '#FFFFFF',
                        legend: {
                            cursor: 'pointer',
                            itemclick: this.toggleDataSeries.bind(this)
                        },
                        axisX: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                            interval: this.inter,
                            scaleBreaks: {
                                type: 'blank',
                                spacing: 0,
                                customBreaks: [
                                    {
                                        startValue: 201413,
                                        endValue: 201501
                                    },
                                    {
                                        startValue: 201513,
                                        endValue: 201600
                                    },
                                    {
                                        startValue: 201613,
                                        endValue: 201700
                                    },
                                    {
                                        startValue: 201713,
                                        endValue: 201800
                                    },
                                    {
                                        startValue: 201813,
                                        endValue: 201900
                                    },
                                    {
                                        startValue: 201913,
                                        endValue: 202000
                                    },
                                    {
                                        startValue: 202013,
                                        endValue: 202100
                                    },
                                    {
                                        startValue: 202152,
                                        endValue: 202200
                                    },
                                    {
                                        startValue: 202213,
                                        endValue: 202300
                                    }
                                ]
                            },
                            stripLines: [
                                {
                                    startValue: 201400,
                                    endValue: 201413,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201500,
                                    endValue: 201513,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201600,
                                    endValue: 201613,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201700,
                                    endValue: 201713,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201800,
                                    endValue: 201813,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201900,
                                    endValue: 20202,
                                    color: '#F2F3F5'
                                },
                            ]
                        },
                        axisY: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                        },
                        toolTip: {
                            shared: true,
                            borderColor: "#FFFFFF",
                            fontFamily: "Montserrat", contentFormatter: function (e) {
                                var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                    if (e.entries[i].dataSeries.name == 'Baseline') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                    }
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/><div>';
                                }
                                return content;
                            }
                        },
                        data: [
                            {
                                name: 'Baseline', visible: true,
                                type: 'line', markerSize: 7,
                                gridColor: '#ffffff',
                                color: '#FF0076',
                                lineColor: '#FF0076',
                                dataPoints: this.property
                            },
                            {
                                name: 'Promo Effect', visible: true,
                                type: 'line', markerSize: 7,
                                gridColor: '#ffffff',
                                color: ' #012F6F',
                                lineColor: '#012F6F',
                                dataPoints: this.property3
                            }
                        ]
                    });
                    this.chart2.render();
                    this.secondgraph = 'Baseline';
                    this.chart1 = new CanvasJS.Chart('chartContainer1', {
                        title: { text: ' ', fontStyle: 'no', },
                        animationEnabled: true,
                        backgroundColor: '#FFFFFF',
                        legend: {
                            cursor: 'pointer',
                            itemclick: this.toggleDataSeries.bind(this)
                        },
                        axisX: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                            interval: this.inter,
                            scaleBreaks: {
                                type: 'blank',
                                spacing: 0,
                                customBreaks: [
                                    {
                                        startValue: 201452,
                                        endValue: 201501
                                    },
                                    {
                                        startValue: 201552,
                                        endValue: 201600
                                    },
                                    {
                                        startValue: 201652,
                                        endValue: 201700
                                    },
                                    {
                                        startValue: 201752,
                                        endValue: 201800
                                    },
                                    {
                                        startValue: 201852,
                                        endValue: 201900
                                    },
                                    {
                                        startValue: 201952,
                                        endValue: 202000
                                    },
                                    {
                                        startValue: 202053,
                                        endValue: 202100
                                    },
                                    {
                                        startValue: 202152,
                                        endValue: 202200
                                    },
                                    {
                                        startValue: 202252,
                                        endValue: 202301
                                    }
                                ]
                            },
                            stripLines: [
                                {
                                    startValue: 201400,
                                    endValue: 201452,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201500,
                                    endValue: 201552,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201600,
                                    endValue: 201652,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201700,
                                    endValue: 201752,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201800,
                                    endValue: 201852,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 201900,
                                    endValue: 201952,
                                    color: '#F2F3F5'
                                },
                                {
                                    startValue: 202000,
                                    endValue: 202034,
                                    color: '#F2F3F5'
                                },
                            ]
                        },
                        axisY: {
                            valueFormatString: '######', labelFontFamily: 'Montserrat',
                            labelFontWeight: "400",
                            labelFontSize: 12,
                            labelFontColor: "#8BA0B9",
                            gridColor: '#ffffff',
                        },
                        toolTip: {
                            shared: true,
                            borderColor: "#FFFFFF",
                            fontFamily: "Montserrat", contentFormatter: function (e) {
                                var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                                content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                    if (e.entries[i].dataSeries.name == 'Actual LY') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                    }
                                    if (e.entries[i].dataSeries.name == 'Actuals') {
                                        content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                    }
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/><div>';
                                }
                                return content;
                            }
                        },
                        data: [
                            {
                                name: 'Actual LY',
                                type: 'line',
                                visible: false,
                                color: this.lastyearDataPointColor,
                                lineColor: this.lastyearDataPointColor,
                                dataPoints: this.lastYearDataPoints
                            },
                            {
                                name: 'ML Forecast', visible: true,
                                type: 'line',
                                color: this.mlDataPointColor,
                                lineColor: this.mlDataPointColor,
                                dataPoints: this.mlDataPoints
                            },
                            {
                                name: 'APO Forecast',
                                visible: false,
                                type: 'line',
                                color: this.aopDataPointColor,
                                lineColor: this.aopDataPointColor,
                                dataPoints: this.aopDataPoints
                            },
                            {
                                name: 'Final Forecast', visible: true,
                                type: 'line',
                                color: this.finalForecastPointColor,
                                lineColor: this.finalForecastPointColor,
                                dataPoints: this.finalForecastDataPoints
                            },
                            {
                                name: 'Actuals', visible: true,
                                type: 'line',
                                color: this.actualDataPointColor,
                                lineColor: this.actualDataPointColor,
                                dataPoints: this.actualDataPoints
                            }
                        ]
                    });
                    this.chart1.render();
                    this.CanvasJSDataAsCSV();
                    this.selectOptionsModalCancel.nativeElement.click();
                });
            }
            else {
                window.alert("Something went wrong. Please try again - detailed view material");
            }
        }
        else {
            window.alert("Something went wrong. Please try again");
        }
    }
    firstDataRendered(params) {
        this.gridApi = params.api; // To access the grids API
        this.gridColumnApi = params.columnApi;
        var threebars = Array.from(document.getElementsByClassName('ag-pinned-left-header') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < threebars.length; i++) {
            threebars[i].style.borderRight = '0';
        }
        var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < headercells.length; i++) {
            headercells[i].style.paddingLeft = '0px';
            headercells[i].style.paddingRight = '0px';
            headercells[i].style.backgroundColor = 'white';
        }
        var agcells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells.length; i++) {
            agcells[i].style.paddingLeft = '0px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.color = '#8BA0B9';
            agcells2[i].style.color = '#8BA0B9';
            agcells2[i].style.lineHeight = '24px';
            agcells2[i].style.fontSize = '12px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-cell-last-left-pinned') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.paddingLeft = '16px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.border = '0';
        }
    }
    firstDataRenderedDetailedViews(params) {
        this.gridApi = params.api; // To access the grids API
        this.gridColumnApi = params.columnApi;
        var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < headercells.length; i++) {
            headercells[i].style.paddingLeft = '0px';
            headercells[i].style.paddingRight = '0px';
            headercells[i].style.backgroundColor = 'white';
        }
        var agcells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells.length; i++) {
            agcells[i].style.paddingLeft = '0px';
            agcells[i].style.paddingRight = '5px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-cell-last-left-pinned') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.paddingLeft = '5px';
        }
        var threebars = Array.from(document.getElementsByClassName('ag-column-drop-horizontal') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < threebars.length; i++) {
            threebars[i].style.zoom = '133%';
            threebars[i].style.backgroundColor = 'white';
        }
        var threebars = Array.from(document.getElementsByClassName('ag-column-drop-horizontal-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < threebars.length; i++) {
            threebars[i].style.backgroundColor = 'white';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.border = '0';
        }
    }
    // Create Plan Component Event Subscriber
    public eventListener(eventData: any) {
        if (eventData.type === 'create-plan') {
            this.createPlan(eventData.data);
        } else if (eventData.type === 'view-plan') {
            this.viewPlan(eventData.data);
        } else {
        }
    }
    public comment1() {
        document.getElementById('m').style.background = '';
        document.getElementById('l').style.background = '';
        document.getElementById('w').style.background = '';
        document.getElementById('c').style.background = '#fff';
        this.update = new Date().toJSON('yyyy/MM/dd HH:mm');
        this.main = false;
        this.comment12 = true;
        this.weeklycomment = false;
        this.log = false;
    }
    public unexpanded1() {
        this.pressed = false;
    }
    public unexpanded_drop() {
        document.getElementById('sortbyfilter').className = 'panel-collapse collapse';
        this.selectsortby[0].isExpanded = false;
    }
    public unexpanded(filter: string) {
        if (filter == "temp" && this.filter_clicked == "temp") {
            this.hogya = 10;
        }
        else if (filter == "temp" && this.filter_clicked != "temp") {
            if (this.hogya == 1) {
                this.pressed = false;
                document.getElementById('salesofficefilter').className = 'panel-collapse collapse';
                document.getElementById('tradetypefilter').className = 'panel-collapse collapse';
                this.filters2[0].isExpanded = false;
                this.filters2[1].isExpanded = false;
                this.filters1_brands[0].isExpanded = false;
                this.filters1_subbrand[0].isExpanded = false;
                this.filters1_leadsku[0].isExpanded = false;
                this.filters1_list[0].isExpanded = false;
                this.filters1_list[1].isExpanded = false;
                this.filters1_list[2].isExpanded = false;
                this.filters1_list[3].isExpanded = false;
                this.filters1_list[4].isExpanded = false;
                this.filters1_list[5].isExpanded = false;
                this.filters1_list[6].isExpanded = false;
                this.filters1_list[7].isExpanded = false;
                this.filters1_list[8].isExpanded = false;
                this.filters1_list[9].isExpanded = false;
                this.filters1_list[10].isExpanded = false;
                document.getElementById('brandsfilter').className = 'panel-collapse collapse';
                document.getElementById('subbrandfilter').className = 'panel-collapse collapse';
                document.getElementById('leadskufilter').className = 'panel-collapse collapse';
                document.getElementById('brands_1filter').className = 'panel-collapse collapse';
                document.getElementById('globalbevfilter').className = 'panel-collapse collapse';
                document.getElementById('localcatfilter').className = 'panel-collapse collapse';
                document.getElementById('materialgroupfilter').className = 'panel-collapse collapse';
                document.getElementById('baseunitfilter').className = 'panel-collapse collapse';
                document.getElementById('packtypefilter').className = 'panel-collapse collapse';
                document.getElementById('packsizefilter').className = 'panel-collapse collapse';
                document.getElementById('alcoholperfilter').className = 'panel-collapse collapse';
                document.getElementById('Animal_Flagsfilter').className = 'panel-collapse collapse';
                document.getElementById('material_secondfilter').className = 'panel-collapse collapse';
                document.getElementById('snp_plannerfilter').className = 'panel-collapse collapse';
            }
            else {
            }
        }
        else if (filter != this.filter_clicked) {
            this.hogya = 11;
            this.ho1 = 1;
            this.filter_clicked = filter;
            this.pressed = false;
            document.getElementById('uomfilter').className = 'panel-collapse collapse';
            document.getElementById('yearfilter').className = 'panel-collapse collapse';
            document.getElementById('granfilter').className = 'panel-collapse collapse';
            document.getElementById('viewfilter').className = 'panel-collapse collapse';
            this.selectgran[0].isExpanded = false;
            this.selectyear[0].isExpanded = false;
            this.selectuom[0].isExpanded = false;
            this.selectview[0].isExpanded = false;
            document.getElementById('salesofficefilter').className = 'panel-collapse collapse';
            document.getElementById('tradetypefilter').className = 'panel-collapse collapse';
            this.filters2[0].isExpanded = false;
            this.filters2[1].isExpanded = false;
            this.filters1_brands[0].isExpanded = false;
            this.filters1_subbrand[0].isExpanded = false;
            this.filters1_leadsku[0].isExpanded = false;
            this.filters1_list[0].isExpanded = false;
            this.filters1_list[1].isExpanded = false;
            this.filters1_list[2].isExpanded = false;
            this.filters1_list[3].isExpanded = false;
            this.filters1_list[4].isExpanded = false;
            this.filters1_list[5].isExpanded = false;
            this.filters1_list[6].isExpanded = false;
            this.filters1_list[7].isExpanded = false;
            this.filters1_list[8].isExpanded = false;
            this.filters1_list[9].isExpanded = false;
            this.filters1_list[10].isExpanded = false;
            document.getElementById('brandsfilter').className = 'panel-collapse collapse';
            document.getElementById('subbrandfilter').className = 'panel-collapse collapse';
            document.getElementById('leadskufilter').className = 'panel-collapse collapse';
            document.getElementById('brands_1filter').className = 'panel-collapse collapse';
            document.getElementById('globalbevfilter').className = 'panel-collapse collapse';
            document.getElementById('localcatfilter').className = 'panel-collapse collapse';
            document.getElementById('materialgroupfilter').className = 'panel-collapse collapse';
            document.getElementById('baseunitfilter').className = 'panel-collapse collapse';
            document.getElementById('packtypefilter').className = 'panel-collapse collapse';
            document.getElementById('packsizefilter').className = 'panel-collapse collapse';
            document.getElementById('alcoholperfilter').className = 'panel-collapse collapse';
            document.getElementById('Animal_Flagsfilter').className = 'panel-collapse collapse';
            document.getElementById('material_secondfilter').className = 'panel-collapse collapse';
            document.getElementById('snp_plannerfilter').className = 'panel-collapse collapse';
        }
    }
    public keepDropDownOpen() {
        this.closeDropDowns = false;
    }
    public unexpanded_out() {
        if (this.closeDropDowns && !this.showcombinationcolumn_combination) {
            document.getElementById('salesofficefilter').className = 'panel-collapse collapse';
            document.getElementById('tradetypefilter').className = 'panel-collapse collapse';
            document.getElementById('customerPlanningGroupfilter').className = 'panel-collapse collapse';
            document.getElementById('plantfilter').className = 'panel-collapse collapse';
            document.getElementById('uomfilter').className = 'panel-collapse collapse';
            document.getElementById('yearfilter').className = 'panel-collapse collapse';
            document.getElementById('granfilter').className = 'panel-collapse collapse';
            document.getElementById('viewfilter').className = 'panel-collapse collapse';
            this.filters2[0].isExpanded = false;
            this.filters2[1].isExpanded = false;
            this.filters1_brands[0].isExpanded = false;
            this.filters1_subbrand[0].isExpanded = false;
            this.filters1_leadsku[0].isExpanded = false;
            this.filters1_list[0].isExpanded = false;
            this.filters1_list[1].isExpanded = false;
            this.filters1_list[2].isExpanded = false;
            this.filters1_list[3].isExpanded = false;
            this.filters1_list[4].isExpanded = false;
            this.filters1_list[5].isExpanded = false;
            this.filters1_list[6].isExpanded = false;
            this.filters1_list[7].isExpanded = false;
            this.filters1_list[8].isExpanded = false;
            this.filters1_list[9].isExpanded = false;
            this.filters1_list[10].isExpanded = false;
            this.filters[0].isExpanded = false;
            this.filters_plant[0].isExpanded = false;
            this.selectuom[0].isExpanded = false;
            this.selectgran[0].isExpanded = false;
            this.selectview[0].isExpanded = false;
            this.selectyear[0].isExpanded = false;
            document.getElementById('brandsfilter').className = 'panel-collapse collapse';
            document.getElementById('subbrandfilter').className = 'panel-collapse collapse';
            document.getElementById('leadskufilter').className = 'panel-collapse collapse';
            document.getElementById('brands_1filter').className = 'panel-collapse collapse';
            document.getElementById('globalbevfilter').className = 'panel-collapse collapse';
            document.getElementById('localcatfilter').className = 'panel-collapse collapse';
            document.getElementById('materialgroupfilter').className = 'panel-collapse collapse';
            document.getElementById('baseunitfilter').className = 'panel-collapse collapse';
            document.getElementById('packtypefilter').className = 'panel-collapse collapse';
            document.getElementById('packsizefilter').className = 'panel-collapse collapse';
            document.getElementById('alcoholperfilter').className = 'panel-collapse collapse';
            document.getElementById('Animal_Flagsfilter').className = 'panel-collapse collapse';
            document.getElementById('material_secondfilter').className = 'panel-collapse collapse';
            document.getElementById('snp_plannerfilter').className = 'panel-collapse collapse';
        }
        this.closeDropDowns = true;
    }
    public log1() {
        document.getElementById('m').style.background = '';
        document.getElementById('l').style.background = '#fff';
        document.getElementById('c').style.background = '';
        document.getElementById('w').style.background = '';
        this.update = new Date().toJSON('yyyy/MM/dd HH:mm');
        this.main = false;
        this.comment12 = false;
        this.weeklycomment = false;
        this.log = true;
    }
    public main1() {
        document.getElementById('m').style.background = '#fff';
        document.getElementById('l').style.background = '';
        document.getElementById('c').style.background = '';
        document.getElementById('w').style.background = '';
        this.main = true;
        this.comment12 = false;
        this.weeklycomment = false;
        this.log = false;
    }
    public columnDefComments;
    public weeklycomment1() {
        this.commens_main_table = true;
        this.up_table = false;
        this.down_table = true;
    }
    public hide_all_comments() {
        if (this.up_table == false && this.down_table == false) {
            this.up_table = true;
            this.commens_main_table = true;
            this.down_table = false;
        } else {
            this.commens_main_table = true;
            this.up_table = false;
            this.down_table = false;
            this.dropdown_table = 'allweek';
        }
    }
    public changecomment(feature) {
        this.commens_main_table = true;
        if (feature == 'All Comments') {
            this.up_table = true;
            this.down_table = false;
        } else {
            this.up_table = false;
            this.down_table = true;
        }
    }
    public expandLeftComponent() {
        if (this.showRightComponent == true) {
            this.showRightComponent = false;
            this.second = false;
            this.bothYes = false;
            document.getElementById('maincontent').classList.remove("col-8");
            document.getElementById('maincontent').classList.add("col-12");
            document.getElementById('middle').style.margin = '0 20px';
            document.getElementById('upper_middle').style.margin = '0 20px';
            this.chart1.render();
            this.chart2.render();
            this.compress = true;
            this.expand = false;
        } else {
            this.showRightComponent = true;
            this.second = true;
            document.getElementById('maincontent').classList.remove("col-12");
            document.getElementById('maincontent').classList.add("col-8");
            document.getElementById('middle').removeAttribute("style");
            document.getElementById('upper_middle').removeAttribute("style");
            this.bothYes = true;
            this.chart1.render();
            this.chart2.render();
            this.compress = false;
            this.expand = true;
        }
    }
    private static transformWeek(weekString: string) {
        const data = weekString.split('-');
        const year = data[0];
        const week = data[1].substr(1);
        return parseInt(year + week, 10);
    }
    public whichYear;
    public goToYear(yearvalue) {

        try {
            this.whichYear = yearvalue;
        } catch (e) { }

        if (this.whichYear == "2020") {
            this.prevactuals = this.whichYear + '-W01';
            this.endWeek = this.whichYear + '-W52';
            if (this.whichYear == '2020') {
                this.endWeek = this.whichYear + '-W53';
            }
            this.tick1();
        }
        if (this.whichYear == "2022") {
            this.prevactuals = this.whichYear + '-W01';
            this.endWeek = this.whichYear + '-W52';
            if (this.whichYear == '2022') {
                this.endWeek = this.whichYear + '-W53';
            }
            this.tick1();
        }
        if (this.whichYear == "2019") {
            this.prevactuals = this.whichYear + '-W01';
            this.endWeek = this.whichYear + '-W52';
            if (this.whichYear == '2020') {
                this.endWeek = this.whichYear + '-W53';
            }
            this.tick1();
        }
        if (this.whichYear == "2018") {
            this.prevactuals = this.whichYear + '-W01';
            this.endWeek = this.whichYear + '-W52';
            if (this.whichYear == '2020') {
                this.endWeek = this.whichYear + '-W53';
            }
            this.tick1();
        }
        if (this.whichYear == "2021") {
            this.prevactuals = this.whichYear + '-W01';
            this.endWeek = this.whichYear + '-W52';
            if (this.whichYear == '2020') {
                this.endWeek = this.whichYear + '-W53';
            }
            this.tick1();
        }
    }
    public tick() {
        if (this.color_tick == 0) {
            return;
        }
        this.color_tick = 0;
        if (DashboardComponent.transformWeek(this.prevactuals) < 201710) {
            this.prevactuals = '2017-W10';
        }
        if (DashboardComponent.transformWeek(this.prevactuals) > DashboardComponent.transformWeek(this.endWeek)) {
            window.alert("Please choose a valid actual and plan date");
            return;
        }
        this.createPlanRequestData.endWeek = DashboardComponent.transformWeek(this.endWeek);
        this.createPlanRequestData.prevactuals = DashboardComponent.transformWeek(this.prevactuals);
        this.whichYear = "";
        if (this.reactivate_filter_button == 0) {
            this.createPlanRequestData.forecastingGroups = JSON.parse(JSON.stringify(this.fgssselected));
            this.updateTheTable();
        } else {
            window.alert('Please plan selection first, then only you can click this');
        }
    }
    public tick1() {
        this.color_tick = 0;
        if (DashboardComponent.transformWeek(this.prevactuals) < 201710) {
            this.prevactuals = '2017-W10';
        }
        if (DashboardComponent.transformWeek(this.prevactuals) > DashboardComponent.transformWeek(this.endWeek)) {
            window.alert("Please choose a valid actual and plan date");
            return;
        }
        this.createPlanRequestData.endWeek = DashboardComponent.transformWeek(this.endWeek);
        this.createPlanRequestData.prevactuals = DashboardComponent.transformWeek(this.prevactuals);
        if (this.reactivate_filter_button == 0) {
            this.createPlanRequestData.forecastingGroups = JSON.parse(JSON.stringify(this.fgssselected));
            this.updateTheTable();
        } else {
            window.alert('Please plan selection first, then only you can click this');
        }
    }
    public chart_slider_baseline() {
        if (this.chart2.options.data[0].visible == true) {
            this.chart2.options.data[0].visible = false;
        }
        else {
            this.chart2.options.data[0].visible = true;
        }
        this.chart2.render();
    }
    public chart_slider_promo() {
        if (this.chart2.options.data[1].visible == true) {
            this.chart2.options.data[1].visible = false;
        }
        else {
            this.chart2.options.data[1].visible = true;
        }
        this.chart2.render();
    }
    public chart_slider_actuallastyear() {
        try {
        } catch (err) {
        }
        if (this.chart1.options.data[0].visible == true) {
            this.chart1.options.data[0].visible = false;
        }
        else {
            this.chart1.options.data[0].visible = true;
        }
        this.chart1.render();
    }
    public chart_slider_ml() {
        try {
        } catch (err) {
        }
        if (this.chart1.options.data[1].visible == true) {
            this.chart1.options.data[1].visible = false;
        }
        else {
            this.chart1.options.data[1].visible = true;
        }
        this.chart1.render();
    }
    public chart_slider_apo() {
        try {
        } catch (err) {
        }
        if (this.chart1.options.data[2].visible == true) {
            this.chart1.options.data[2].visible = false;
        }
        else {
            this.chart1.options.data[2].visible = true;
        }
        this.chart1.render();
    }
    public chart_slider_final() {
        try {
        } catch (err) {
        }
        if (this.chart1.options.data[3].visible == true) {
            this.chart1.options.data[3].visible = false;
        }
        else {
            this.chart1.options.data[3].visible = true;
        }
        this.chart1.render();
    }
    public chart_slider_actuals() {
        try {
        } catch (err) {
        }
        if (this.chart1.options.data[4].visible == true) {
            this.chart1.options.data[4].visible = false;
        }
        else {
            this.chart1.options.data[4].visible = true;
        }
        this.chart1.render();
    }
    public createPlan(data: any) {
        this.main_graph = true;
        var login = {
            Username: 'admin',
            activity: 'Create Plan',
            datetimestamp: JSON.stringify(this.update)
        };
        this.skuService.sendLog(login).subscribe((res: any) => {
        });
        this.planningtable = 'Planning Table (HL)';
        try {
            document.getElementById('planningtable').innerHTML = 'Planning Table (HL)';
            try {
                document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL)';
                this.forecastinganalysis = 'Forecast Analysis (HL)';
                this.featureanalysis = 'Feature Analysis (HL)';
            } catch (err) {
            }
            this.deactivate();
            this.featureanalysis = 'Feature Analysis (HL)';
        } catch (err) {
        }
        this.loading = true;
        this.createPlanRequestData = {
            startWeek: data.startWeek,
            endWeek: data.endWeek,
            prevactuals: data.prevactuals,
            forecastingGroups: this.fgssselected.map(item => item.name),
            customerPlanningGroup: data.customerPlanningGroup,
            plants: data.plants,
        };
        this.hh = data.forecastingGroups;
        this.loading = true;
        if (this.granular1 == 'month') {
            this.loading = true;
            this.skuService.getGraphData_monthly(this.createPlanRequestData).subscribe((res: any) => {
                this.eventsSubject.next({
                    page: null,
                    reset: true,
                });
                this.loading = false;
                if (this.UOM == 'HL' && this.granular1 == 'week') {
                    this.enabled = 1;
                } else {
                    this.enabled = 0;
                }
                this.allComments = res.combinedcomment;
                this.allComments_harshit = [];
                for (const abc of this.allComments) {
                    this.allComments_harshit.push({
                        name: abc,
                        isSelected: false,
                        isFiltered: false
                    });
                }
                this.greystart = res.start;
                if (res.res.length > 20) {
                    this.inter = (res.res.length / 10);
                } else {
                    this.inter = 1;
                }
                this.createPlanRequestData.brands = res.req.brands;
                this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                this.createPlanRequestData.subbrand = res.req.subbrand;
                this.createPlanRequestData.Trade = res.req.trade;
                this.createPlanRequestData.Sales = res.req.sales;
                this.createPlanRequestData.globalBev = res.req.globalBev;
                this.createPlanRequestData.materialgroup = res.req.materialgroup;
                this.createPlanRequestData.baseunit = res.req.baseunit;
                this.createPlanRequestData.pack_type = res.req.pack_type;
                this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                this.createPlanRequestData.pack_size = res.req.pack_size;
                this.createPlanRequestData.cpgname = res.req.cpgname;
                this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                this.processGraphData(res);
                this.processFeatureGraphData(res);
                this.createFilterObject(res);
                this.commentsall();
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        fontSize: 10,
                        itemclick: this.toggleDataSeries1.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        theme: 'light2',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201413,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201513,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201613,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201713,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201813,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201913,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202053,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202152,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202253,
                                    endValue: 202300
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201413,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201513,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201613,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201713,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201813,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #012F6F"></i>' + ' ';
                                }
                                content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Baseline', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: '#FF0076',
                            lineColor: '#FF0076',
                            dataPoints: this.property
                        },
                        {
                            name: 'Promo Effect', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: ' #012F6F',
                            lineColor: '#012F6F',
                            dataPoints: this.property3
                        }
                    ]
                });
                this.chart2.render();
                this.secondgraph = 'Baseline';
                this.chart1 = new CanvasJS.Chart('chartContainer1', {
                    title: { text: ' ', fontStyle: 'no', },
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201412,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201512,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201612,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201712,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201812,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201912,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202012,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202112,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202253,
                                    endValue: 202300
                                },
                                {
                                    startValue: 202353,
                                    endValue: 202402
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 202001,
                                endValue: 202012,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: 202112,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202200,
                                endValue: 202212,
                                color: '#F2F3F5'
                            }
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 8px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Actual LY') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                }
                                if (e.entries[i].dataSeries.name == 'Actuals') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                }
                                content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Actual LY',
                            visible: false,
                            type: 'line',
                            color: this.lastyearDataPointColor,
                            lineColor: this.lastyearDataPointColor,
                            dataPoints: this.lastYearDataPoints
                        },
                        {
                            name: 'ML Forecast', visible: true,
                            type: 'line',
                            color: this.mlDataPointColor,
                            lineColor: this.mlDataPointColor,
                            dataPoints: this.mlDataPoints
                        },
                        {
                            name: 'APO Forecast',
                            type: 'line',
                            visible: false,
                            color: this.aopDataPointColor,
                            lineColor: this.aopDataPointColor,
                            dataPoints: this.aopDataPoints
                        },
                        {
                            name: 'Final Forecast', visible: true,
                            type: 'line',
                            color: this.finalForecastPointColor,
                            lineColor: this.finalForecastPointColor,
                            dataPoints: this.finalForecastDataPoints
                        },
                        {
                            name: 'Actuals', visible: true,
                            type: 'line',
                            color: this.actualDataPointColor,
                            lineColor: this.actualDataPointColor,
                            dataPoints: this.actualDataPoints
                        }
                    ]
                });
                this.chart1.render();
                this.CanvasJSDataAsCSV();
                this.selectOptionsModalCancel.nativeElement.click();
            });
            this.chart1.render();
            this.chart1.render();
        } else {
            this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
                this.eventsSubject.next({
                    page: null,
                    reset: true,
                });
                if (res.res.length == 0) {
                    window.alert('No Combination is available');
                    this.loading = false;
                    this.reactivate_filter(1);
                    return;
                }
                if (this.UOM == 'HL' && this.granular1 == 'week') {
                    this.enabled = 1;
                } else {
                    this.enabled = 0;
                }
                this.allComments = res.combinedcomment;
                this.allComments_harshit = [];
                for (const abc of this.allComments) {
                    this.allComments_harshit.push({
                        name: abc,
                        isSelected: false,
                        isFiltered: false
                    });
                }
                this.createPlanRequestData.brands = res.req.brands;
                this.greystart = res.start;
                if (res.req.startWeek < res.start) {
                    this.greystart = res.req.startWeek;
                }
                if (res.start == 0) {
                    this.greystart = res.req.startWeek;
                }
                if (res.res.length > 20) {
                    this.inter = (res.res.length / 10);
                } else {
                    this.inter = 1;
                }
                this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
                this.createPlanRequestData.subbrand = res.req.subbrand;
                this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
                this.createPlanRequestData.Trade = res.req.trade;
                this.createPlanRequestData.Sales = res.req.sales;
                this.createPlanRequestData.globalBev = res.req.globalBev;
                this.createPlanRequestData.materialgroup = res.req.materialgroup;
                this.createPlanRequestData.baseunit = res.req.baseunit;
                this.createPlanRequestData.pack_type = res.req.pack_type;
                this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
                this.createPlanRequestData.pack_size = res.req.pack_size;
                this.createPlanRequestData.cpgname = res.req.cpgname;
                this.loading = false;
                this.processGraphData(res);
                try {
                    document.getElementById('arrow').style.color = 'grey';
                } catch (e) {
                }
                this.processFeatureGraphData(res);
                this.valuestring = 'Promo';
                this.createFilterObject(res);
                this.commentsall();
                this.chart2 = new CanvasJS.Chart('chartContainer2', {
                    animationEnabled: true,
                    backgroundColor: '#FFFFFF',
                    legend: {
                        cursor: 'pointer',
                        fontSize: 10,
                        itemclick: this.toggleDataSeries1.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        theme: 'light2',
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201452,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201552,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201652,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201752,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201852,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201952,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202053,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202152,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202252,
                                    endValue: 202301
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201452,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201552,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201652,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201752,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201852,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:140px;padding: 3px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Baseline') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FF0076;"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right;font-size: 12px;;font-weight:700;">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/></div>';
                                }
                                if (e.entries[i].dataSeries.name == 'Promo Effect') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;margin-left:3px;margin-top: 9px;color: #012F6F"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right;margin-right:3px;font-size: 12px;margin-top:5px;;font-weight:700;">' + e.entries[i].dataPoint.y + '</span>';
                                    content += '<br/></div>';
                                }
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Baseline', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: '#FF0076',
                            lineColor: '#FF0076',
                            dataPoints: this.property
                        },
                        {
                            name: 'Promo Effect', visible: true,
                            type: 'line', markerSize: 7,
                            gridColor: '#ffffff',
                            color: ' #012F6F',
                            lineColor: '#012F6F',
                            dataPoints: this.property3
                        }
                    ]
                });
                this.chart2.render();
                this.secondgraph = 'Baseline';
                this.loading = false;
                this.chart1 = new CanvasJS.Chart('chartContainer1', {
                    title: { text: ' ', fontStyle: 'no', },
                    animationEnabled: true,
                    backgroundColor: '#fff',
                    legend: {
                        cursor: 'pointer',
                        itemclick: this.toggleDataSeries.bind(this)
                    },
                    axisX: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                        interval: this.inter,
                        scaleBreaks: {
                            type: 'blank',
                            spacing: 0,
                            customBreaks: [
                                {
                                    startValue: 201453,
                                    endValue: 201501
                                },
                                {
                                    startValue: 201552,
                                    endValue: 201600
                                },
                                {
                                    startValue: 201652,
                                    endValue: 201700
                                },
                                {
                                    startValue: 201752,
                                    endValue: 201800
                                },
                                {
                                    startValue: 201852,
                                    endValue: 201900
                                },
                                {
                                    startValue: 201952,
                                    endValue: 202000
                                },
                                {
                                    startValue: 202053,
                                    endValue: 202100
                                },
                                {
                                    startValue: 202152,
                                    endValue: 202200
                                },
                                {
                                    startValue: 202253,
                                    endValue: 202300
                                },
                                {
                                    startValue: 202353,
                                    endValue: 202402
                                }
                            ]
                        },
                        stripLines: [
                            {
                                startValue: 201400,
                                endValue: 201452,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201500,
                                endValue: 201552,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201600,
                                endValue: 201652,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201700,
                                endValue: 201752,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201800,
                                endValue: 201852,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 201900,
                                endValue: 201952,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202000,
                                endValue: 202053,
                                color: '#F2F3F5'
                            },
                            {
                                startValue: 202100,
                                endValue: this.DBloadWeek,
                                color: '#F2F3F5'
                            },
                        ]
                    },
                    axisY: {
                        valueFormatString: '######', labelFontFamily: 'Montserrat',
                        labelFontWeight: "400",
                        labelFontSize: 12,
                        labelFontColor: "#8BA0B9",
                        gridColor: '#ffffff',
                    },
                    toolTip: {
                        shared: true,
                        borderColor: "#FFFFFF",
                        fontFamily: "Montserrat", contentFormatter: function (e) {
                            var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                            content = '<div style="width:173px;padding: 3px;"><span style="font-family: Montserrat;font-style: normal;font-weight: bold;margin-bottom:12px;font-size: 14px;line-height: 22px;color: #8BA0B9;">' + e.entries[0].dataPoint.x.toString().slice(0, 4) + " " + e.entries[0].dataPoint.x.toString().slice(4, 6) + '</span><br/>'; for (var i = 0; i < e.entries.length; i++) {
                                if (e.entries[i].dataSeries.name == 'Actual LY') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '</span><span style="float:right;font-size:12px;font-style:bold;font-weight:700;">' + e.entries[i].dataPoint.y + '</span>';
                                }
                                if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '</span><span style="float:right;font-size:12px;font-style:bold;font-weight:700;">' + e.entries[i].dataPoint.y + '</span>';
                                }
                                if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '</span><span style="float:right;font-size:12px;font-style:bold;font-weight:700;">' + e.entries[i].dataPoint.y + '</span>';
                                }
                                if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '</span><span style="float:right;font-size:12px;font-style:bold;font-weight:700;">' + e.entries[i].dataPoint.y + '</span>';
                                }
                                if (e.entries[i].dataSeries.name == 'Actuals') {
                                    content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                                    content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '</span><span style="float:right;font-size:12px;font-style:bold;font-weight:700;">' + e.entries[i].dataPoint.y + '</span>';
                                }
                                content += '<br/><div>';
                            }
                            return content;
                        }
                    },
                    data: [
                        {
                            name: 'Actual LY',
                            visible: false,
                            type: 'line',
                            color: this.lastyearDataPointColor,
                            lineColor: this.lastyearDataPointColor,
                            dataPoints: this.lastYearDataPoints
                        },
                        {
                            name: 'ML Forecast', visible: true,
                            type: 'line',
                            color: this.mlDataPointColor,
                            lineColor: this.mlDataPointColor,
                            dataPoints: this.mlDataPoints
                        },
                        {
                            name: 'APO Forecast',
                            visible: false,
                            type: 'line',
                            color: this.aopDataPointColor,
                            lineColor: this.aopDataPointColor,
                            dataPoints: this.aopDataPoints
                        },
                        {
                            name: 'Final Forecast', visible: true,
                            type: 'line',
                            color: this.finalForecastPointColor,
                            lineColor: this.finalForecastPointColor,
                            dataPoints: this.finalForecastDataPoints
                        },
                        {
                            name: 'Actuals', visible: true,
                            type: 'line',
                            color: this.actualDataPointColor,
                            lineColor: this.actualDataPointColor,
                            dataPoints: this.actualDataPoints
                        }
                    ]
                });
                this.chart1.render();
                this.CanvasJSDataAsCSV();
                this.selectOptionsModalCancel.nativeElement.click();
            });
        }
        this.skuService.getCommnents().subscribe((res: any) => {
            this.allComments = res.map((item) => {
                item.isSelected = false;
                item.isFiltered = false;
                return item;
            });
            for (const g of this.allComments) {
                this.allCommentshtml.push(g.name);
            }
        }, (error) => {
        });
    }
    public hide_comments() {
        this.commens_main_table = true;
        if (this.up_table == false) {
            this.up_table = true;
            this.down_table = false;
        } else if (this.up_table == true) {
            this.up_table = false;
            this.down_table = true;
        }
    }
    public table_up_click() {
        this.table_up = false;
        this.table_down = true;
    }
    public table_down_click() {
        this.table_up = true;
        this.table_down = false;
    }
    public viewPlan(data: any) {
        Object.assign(this.createPlanRequestData, {
            startWeek: data.startWeek,
            endWeek: data.endWeek,
            prevactuals: data.prevactuals,
            forecastingGroups: data.forecastingGroups,
            customerPlanningGroup: data.customerPlanningGroup,
            plants: data.plants,
        });
        this.loading = true;
        this.skuService.getGraphData(this.createPlanRequestData).subscribe((res: any) => {
            this.eventsSubject.next({
                page: null,
                reset: true,
            });
            this.loading = false;
            this.allComments = res.combinedcomment;
            this.allComments_harshit = [];
            for (const abc of this.allComments) {
                this.allComments_harshit.push({
                    name: abc,
                    isSelected: false,
                    isFiltered: false
                });
            }
            this.greystart = res.start;
            this.createPlanRequestData.brands = res.req.brands;
            this.createPlanRequestData.Alcohol_percentage = res.req.alcoholper;
            this.createPlanRequestData.subbrand = res.req.subbrand;
            this.createPlanRequestData.forecastingGroups = res.req.forecastingGroups;
            this.createPlanRequestData.Trade = res.req.trade;
            this.createPlanRequestData.Sales = res.req.sales;
            this.createPlanRequestData.globalBev = res.req.globalBev;
            this.createPlanRequestData.materialgroup = res.req.materialgroup;
            this.createPlanRequestData.baseunit = res.req.baseunit;
            this.createPlanRequestData.pack_type = res.req.pack_type;
            this.createPlanRequestData.animal_Flags = res.req.animal_Flags;
            this.createPlanRequestData.pack_size = res.req.pack_size;
            this.createPlanRequestData.cpgname = res.req.cpgname;
            this.processGraphData(res);
            this.createFilterObject(res);
            this.skus = data.forecastingGroups.map((item) => {
                return {
                    isChecked: true,
                    isFiltered: true,
                    name: item
                };
            });
            this.commentsall();
            this.chart1 = new CanvasJS.Chart('chartContainer1', {
                title: { text: ' ', fontStyle: 'no', },
                animationEnabled: true,
                backgroundColor: '#FFFFFF',
                legend: {
                    cursor: 'pointer',
                    itemclick: this.toggleDataSeries.bind(this)
                },
                axisX: {
                    valueFormatString: '######', labelFontFamily: 'Montserrat',
                    labelFontWeight: "400",
                    labelFontSize: 12,
                    labelFontColor: "#8BA0B9",
                    gridColor: '#ffffff',
                    scaleBreaks: {
                        type: 'blank',
                        spacing: 0,
                        customBreaks: [
                            {
                                startValue: 201453,
                                endValue: 201501
                            },
                            {
                                startValue: 201552,
                                endValue: 201600
                            },
                            {
                                startValue: 201652,
                                endValue: 201700
                            },
                            {
                                startValue: 201752,
                                endValue: 201800
                            },
                            {
                                startValue: 201852,
                                endValue: 201900
                            },
                            {
                                startValue: 201952,
                                endValue: 202000
                            },
                            {
                                startValue: 202053,
                                endValue: 202100
                            },
                            {
                                startValue: 202152,
                                endValue: 202200
                            },
                            {
                                startValue: 202253,
                                endValue: 202300
                            },
                            {
                                startValue: 202353,
                                endValue: 202402
                            }
                        ]
                    },
                    stripLines: [
                        {
                            startValue: 201400,
                            endValue: 201452,
                            color: '#F2F3F5'
                        },
                        {
                            startValue: 201500,
                            endValue: 201552,
                            color: '#F2F3F5'
                        },
                        {
                            startValue: 201600,
                            endValue: 201652,
                            color: '#F2F3F5'
                        },
                        {
                            startValue: 201700,
                            endValue: 201752,
                            color: '#F2F3F5'
                        },
                        {
                            startValue: 201800,
                            endValue: 201852,
                            color: '#F2F3F5'
                        },
                        {
                            startValue: 201900,
                            endValue: 201952,
                            color: '#F2F3F5'
                        },
                        {
                            startValue: 202000,
                            endValue: 202053,
                            color: '#F2F3F5'
                        },
                        {
                            startValue: 202100,
                            endValue: this.DBloadWeek,
                            color: '#F2F3F5'
                        },
                    ]
                },
                axisY: {
                    valueFormatString: '######', labelFontFamily: 'Montserrat',
                    labelFontWeight: "400",
                    labelFontSize: 12,
                    labelFontColor: "#8BA0B9",
                    gridColor: '#ffffff',
                },
                toolTip: {
                    shared: true,
                    borderColor: "#FFFFFF",
                    fontFamily: "Montserrat", contentFormatter: function (e) {
                        var content = '<span style="font-family: Montserrat;font-style: normal;font-weight: bold;font-size: 14px;line-height: 22px;color: #8BA0B9;"> ';;
                        content = e.entries.dataPoint.x.toString.slice(4, 6) + '-' + e.entries.dataPoint.x.toString.slice(0, 4);
                        for (var i = 0; i < e.entries.length; i++) {
                            if (e.entries[i].dataSeries.name == 'Actual LY') {
                                content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #022F70"></i>' + ' ';
                            }
                            if (e.entries[i].dataSeries.name == 'ML Forecast') {
                                content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #FEA947"></i>' + ' ';
                            }
                            if (e.entries[i].dataSeries.name == 'APO Forecast') {
                                content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #0B88BA"></i>' + ' ';
                            }
                            if (e.entries[i].dataSeries.name == 'Final Forecast') {
                                content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #1BCDCD"></i>' + ' ';
                            }
                            if (e.entries[i].dataSeries.name == 'Actuals') {
                                content += '<i class="fa fa-circle" aria-hidden="true" style="height:16px;color: #EB4B45"></i>' + ' ';
                            }
                            content += '<span style="width:60px;font-size: 12px;font-weight: 400;letter-spacing: 0px;">' + e.entries[i].dataSeries.name + '' + ' ' + '<span style="float:right">' + e.entries[i].dataPoint.y + '</span>';
                            content += '<br/><div>';
                        }
                        return content;
                    }
                },
                data: [
                    {
                        name: 'Actual LY',
                        visible: false,
                        type: 'line',
                        color: this.lastyearDataPointColor,
                        lineColor: this.lastyearDataPointColor,
                        dataPoints: this.lastYearDataPoints
                    },
                    {
                        name: 'ML Forecast', visible: true,
                        type: 'line',
                        color: this.mlDataPointColor,
                        lineColor: this.mlDataPointColor,
                        dataPoints: this.mlDataPoints
                    },
                    {
                        name: 'APO Forecast',
                        type: 'line',
                        visible: false,
                        color: this.aopDataPointColor,
                        lineColor: this.aopDataPointColor,
                        dataPoints: this.aopDataPoints
                    },
                    {
                        name: 'Final Forecast', visible: true,
                        type: 'line',
                        color: this.finalForecastPointColor,
                        lineColor: this.finalForecastPointColor,
                        dataPoints: this.finalForecastDataPoints
                    },
                    {
                        name: 'Actuals', visible: true,
                        type: 'line',
                        color: this.actualDataPointColor,
                        lineColor: this.actualDataPointColor,
                        dataPoints: this.actualDataPoints
                    }
                ]
            });
            this.chart1.render();
            this.CanvasJSDataAsCSV();
            this.selectOptionsModalCancel.nativeElement.click();
        });
    }
    public down() {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, 'SheetJS.xlsx');
    }
    // Download CSV Handlers
    public CanvasJSDataAsCSV() {
        const toolBar = document.getElementsByClassName('canvasjs-chart-toolbar')[0];
        const exportCSV = document.createElement('div');
        const text = document.createTextNode('Save as CSV');
        exportCSV.setAttribute('style', 'padding: 12px 8px; ');
        exportCSV.appendChild(text);
        exportCSV.addEventListener('mouseover', function () {
            exportCSV.setAttribute('style', 'padding: 12px 8px; background-color: #2196F3; color: white');
        });
        exportCSV.addEventListener('mouseout', function () {
            exportCSV.setAttribute('style', 'padding: 12px 8px; background-color: white; color: black');
        });
        exportCSV.addEventListener('click', () => {
            this.downloadCSV({ filename: 'planning_table.csv' });
        });
        toolBar.lastChild.appendChild(exportCSV);
    }
    public downloadCSV(args) {
        let data, filename, link;
        let csv = '';
        csv += '\n';
        csv += 'Start Week ' + this.createPlanRequestData.startWeek;
        csv += '\n';
        csv += 'End Week ' + this.createPlanRequestData.endWeek;
        csv += '\n';
        csv += 'Prev Week ' + this.createPlanRequestData.prevactuals;
        csv += '\n';
        csv += 'Forecasting  ' + JSON.stringify(this.createPlanRequestData.forecastingGroups);
        csv += '\n';
        csv += 'CPG ' + JSON.stringify(this.createPlanRequestData.customerPlanningGroup);
        csv += '\n';
        csv += 'plant' + JSON.stringify(this.createPlanRequestData.plants);
        csv += '\n';
        csv += '\n';
        csv += '\n';
        var weeks = [];
        weeks.push('Week');
        for (const point of this.graphData) {
            weeks.push(point.calenderYearWeek);
        }
        weeks.push('Total');
        csv += weeks.join(',');
        csv += '\n';
        var ml = [];
        ml.push('ML');
        for (const point of this.graphData) {
            ml.push(point.ml);
        }
        ml.push(this.totalData.mlTotal);
        csv += ml.join(',');
        csv += '\n';
        var apo = [];
        apo.push('APO');
        for (const point of this.graphData) {
            apo.push(point.apo);
        }
        apo.push(this.totalData.apoTotal);
        csv += apo.join(',');
        csv += '\n';
        var finalforecast = [];
        finalforecast.push('Final forecast');
        for (const point of this.graphData) {
            finalforecast.push(point.finalForecast);
        }
        finalforecast.push(this.totalData.finalCastTotal);
        csv += finalforecast.join(',');
        csv += '\n';
        var fcsvt = [];
        fcsvt.push('FVA1');
        for (const point of this.graphData) {
            fcsvt.push(point.fcstValueAdd);
        }
        fcsvt.push(this.forecastadd);
        csv += fcsvt.join(',');
        csv += '\n';
        var actualslastyear = [];
        actualslastyear.push('Actual Last Year');
        for (const point of this.graphData) {
            actualslastyear.push(point.actualslastyear);
        }
        actualslastyear.push(this.totalData.lastYearTotal);
        csv += actualslastyear.join(',');
        csv += '\n';
        var actualslastyear1 = [];
        actualslastyear1.push('---');
        for (const point of this.graphData) {
            actualslastyear1.push('---');
        }
        actualslastyear1.push('---');
        csv += actualslastyear1.join(',');
        csv += '\n';
        var actuals = [];
        actuals.push('Actuals');
        for (const point of this.graphData) {
            actuals.push(point.actuals);
        }
        actuals.push(this.totalData.actuals);
        csv += '\n';
        csv += actuals.join(',');
        csv += '\n';
        filename = args.filename || 'planning_table.csv';
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
    }
    // Toggle Data Series from Graph
    private toggleDataSeries(e) {
        e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
        this.chart1.render();
    }
    private toggleDataSeries1(e) {
        e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
        this.chart2.render();
    }
    getRowHeight1(params) {
        return this.groupHeight;
    }
    public showCrossIcon = false;
    public showhideCrossIcon() {
        this.sort_filter = true;
        this.not_available_filter = false;
        if (this.searchText_filter.length > 0) {
            this.showCrossIcon = true;
            this.sort_filter = false;
            for (const savedFilter of this.loadedFilters) {
                var savedFilterName = savedFilter.name;
                if (savedFilterName.toLowerCase().indexOf(this.searchText_filter.toLowerCase()) > -1) {
                    this.not_available_filter = false;
                    this.sort_filter = true;
                    break;
                } else {
                    this.not_available_filter = true;
                }
            }
        } else {
            this.not_available_filter = false;
        }
    }
    public clearSearch() {
        this.searchText_filter = "";
        this.showCrossIcon = false;
    }
    public filter_focus() {
    }
    public cross_load() {
        if (this.searchText_filter == '' || this.searchText_filter == " " || this.searchText_filter == "") {
            this.cut_icon_load = false;
            this.search_icon_load = true;
        }
        else {
            this.cut_icon_load = true;
            this.search_icon_load = false;
            try {
                document.getElementById('h5_click').click();
                document.getElementById('check_font_filter').style.position = 'relative';
                document.getElementById('check_font_filter').style.zIndex = '5';
                this.loadFilterModal_h5.nativeElement.click();
            } catch (err) {
            }
        }
    }
    setZimbabweHeight(height) {
        this.gridApi.forEachNode(function (rowNode) {
            rowNode.setRowHeight(height);
        });
        this.gridApi.onRowHeightChanged();
    }
    public setGroupHeight(height) {

        this.groupHeight = height;
        this.gridApi.resetRowHeights();
    }
    public processGraphData(res) {
        this.changed_weeks = [];
        this.views = "Aggregated";
        try {
            res.forEach(function (dataItem, index) {
                dataItem.rowHeight = 35;
            });
        } catch (err) {
        }
        this.second_ag = false;
        this.main_graph = true;
        if (this.granular1 == "week") {
            this.first_ag = true;
            this.fourth_ag = false;
        }
        else {
            this.first_ag = false;
            this.fourth_ag = true;
        }
        this.third_ag = false;
        const data = res.res;
        var columndef_clone: any = [];
        var row_clone = [];
        var row_clone1 = [];
        const newData = [];
        this.aopDataPoints.length = 0;
        this.fvaDataPoints.length = 0;
        this.mlDataPoints.length = 0;
        this.actualDataPoints.length = 0;
        this.promovalue.length = 0;
        this.lastYearDataPoints.length = 0;
        this.finalForecastDataPoints.length = 0;
        this.graphData = [];
        this.totalData = {
            finalCastTotal: 0,
            harshit: 0,
            fsvtValueAdd: 0,
            fsvtValueAdd2: 0,
            fsvtValueAdd3: 0,
            fsvtValueAdd_total: 0,
            apoTotal: 0,
            mlTotal: 0,
            promovalue: 0,
            actuals: 0,
            lastYearTotal: 0,
        };
        this.forecastadd = 0;
        this.forecastadd2 = 0;
        this.forecastadd3 = 0;
        this.forecastadd_total = 0;
        columndef_clone.push(
            { headerName: "", field: 'key', enableRowGroup: true, pinned: 'left', filter: true, width: 120, cellStyle: { 'font-weight': 'bold', 'position-left': '5px', 'padding-bottom': '16px', 'padding-top': '16px', 'padding-left': '16px', 'line-height': '24px' } },
        );
        var thn = res.start;
        var thn1 = res.req.startWeek;
        var final = 0;
        if (res.req.startWeek < res.start) {
            final = res.req.startWeek;
        }
        else {
            final = res.start;
        }
        if (final == 0) {
            final = res.req.startWeek;
        }
        for (const week of data) {
            if (week.calenderYearWeek <= final) {
                columndef_clone.push({
                    field: JSON.stringify(week.calenderYearWeek),
                    enableRowGroup: true,
                    cellStyle: { 'background-color': '#BEBEBE', 'padding-bottom': '16px', 'padding-top': '16px', 'font-size': '12px', 'line-height': '24px' },
                    width: 64,
                    type: 'rightAligned',
                    valueFormatter: function (params) {
                        if (params.data.key != 'Comments') {
                            return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
                        }
                    },
                    cellRenderer: function (params) {
                        if (params.data.key == 'Comments') {
                            if (params.value != "") {
                                return '<span><img style="width: 32px;" src="assets/images/comment.png"></span>';
                            }
                            else {
                                return "";
                            }
                        }
                        else {
                            return params.valueFormatted;
                        }
                        // 
                    }
                });
            }
            else {
                if (this.prev_year == 1 && this.granular1 == 'month') {
                    if (week.calenderYearWeek != 202101) {
                        columndef_clone.push({
                            field: JSON.stringify(week.calenderYearWeek),
                            enableRowGroup: true,
                            width: 64,
                            type: 'rightAligned',
                            cellStyle: function (params) {
                                if (params.data.key == 'FVA1' || params.data.key == 'FVA2' || params.data.key == 'FVA3') {
                                    return { 'border': '1px solid', 'border-color': '#CFD9E7', 'padding-bottom': '16px', 'padding-top': '16px', 'font-size': '12px', 'line-height': '24px' };
                                }
                                else {
                                    return { 'padding-bottom': '16px', 'padding-top': '16px', 'font-size': '12px', 'line-height': '24px' };
                                }
                            },
                            editable: function (params) {

                                if (params.data.key == "FVA") {
                                    return true;
                                }
                                else if (params.data.key == "FVA2") {
                                    return true;
                                }
                                else if (params.data.key == "FVA3") {
                                    return true;
                                }
                                else if (params.data.key == "Comments") {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            },
                            cellEditorSelector: function (params) {
                                if (params.data.key == "FVA") {
                                    return {
                                        component: 'numericCellEditor'
                                    };
                                }
                                else if (params.data.key == "FVA2") {
                                    return {
                                        component: 'numericCellEditor'
                                    };
                                }
                                else if (params.data.key == "FVA3") {
                                    return {
                                        component: 'numericCellEditor'
                                    };
                                }

                                else {
                                    return null;
                                }

                            },
                            valueFormatter: function (params) {
                                if (params.data.key != 'Comments') {
                                    return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
                                }
                            },
                            cellRenderer: function (params) {
                                if (params.data.key == 'Comments') {
                                    if (params.value != "") {
                                        return '<span><img style="width: 32px;" src="assets/images/comment.png"></span>';
                                    }
                                    else {
                                        return "";
                                    }
                                }
                                else {
                                    return params.valueFormatted;
                                }
                                // 
                            }
                        });
                    }
                }
                else {
                    columndef_clone.push({
                        field: JSON.stringify(week.calenderYearWeek),
                        enableRowGroup: true,
                        width: 64,
                        type: 'rightAligned',
                        cellStyle: function (params) {
                            if (params.data.key == 'FVA1' || params.data.key == 'FVA2' || params.data.key == 'FVA3') {
                                return { 'border': '1px solid', 'border-color': '#CFD9E7', 'padding-bottom': '16px', 'padding-top': '16px', 'font-size': '12px', 'line-height': '24px' };
                            }
                            else {
                                return { 'padding-bottom': '16px', 'padding-top': '16px', 'font-size': '12px', 'line-height': '24px' };
                            }
                        },
                        editable: function (params) {
                            if (params.data.key != 'FVA1' && params.data.key != 'FVA2' && params.data.key != 'FVA3' && params.data.key != 'Comments') {
                                return false;
                            }
                            else {
                                return true;
                            }
                        },
                        cellEditorSelector: function (params) {
                            if (params.data.key != 'FVA1' && params.data.key != 'FVA2' && params.data.key != 'FVA3') {
                                return {
                                    component: 'numericCellEditor'
                                };
                            }
                            return null;
                        },
                        valueFormatter: function (params) {
                            if (params.data.key != 'Comments') {
                                return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                            }
                        },
                        cellRenderer: function (params) {
                            if (params.data.key == 'Comments') {
                                if (params.value != "") {
                                    return '<span><img style="width: 32px;" src="assets/images/comment.png"></span>';
                                }
                                else {
                                    return "";
                                }
                            }
                            else {
                                return params.valueFormatted;
                            }
                            // 
                        }
                    });
                }
            }
        }
        var fv = [{
            sku: "",
            plant: "",
            cpg: ""
        }];
        var a = data[0].calenderYearWeek;
        var f2 = 0;
        for (const abc of data) {
            if (f2 == 0) {
                f2 = 1;
                continue;
            }
            if (abc.calenderYearWeek == a) {
                fv.push({
                    sku: abc.sku,
                    plant: abc.plant,
                    cpg: abc.cpg
                });
            }
        }
        var aab: any = [];
        var f12 = { key: 'Comments' };
        var f123 = { key: 'Final Forecast', cellStyle: { 'color': '#4CAF50' } };
        var f1234 = { key: 'FVA1' };
        var f1234_2 = { key: 'FVA2' };
        var f1234_3 = { key: 'FVA3' };
        var f1234_total = { key: 'FVA Total' };
        var f12345 = { key: 'ML' };
        var f123456 = { key: 'APO', cellStyle: { 'color': '#4CAF50' } };
        var f1234567 = { key: 'Actual' };
        var f12345678 = { key: 'Actual LY' };
        var f123456789 = { key: 'Open' };
        var f1234567890 = { key: 'Promo' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            try {
                if (week.comment.length > 0) {
                    f12[week.calenderYearWeek] = week.comment[0].slice(0, 6);
                }
                else {
                    f12[week.calenderYearWeek] = "";
                }
            }
            catch (err) {
                f12[week.calenderYearWeek] = "";
            }
            var th = week.fva === undefined ? parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0)));
            f123[week.calenderYearWeek] = th;
            if (week.fva === NaN || week.fva === NaN || week.fva === undefined || week.fva === null) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0))
            }
            f1234[week.calenderYearWeek] = t;



            if (week.fva === NaN || week.fva === NaN || week.fva === undefined || week.fva === null) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0))
            }
            f1234_2[week.calenderYearWeek] = t;



            if (week.fva === NaN || week.fva === NaN || week.fva === undefined || week.fva === null) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0))
            }
            f1234_3[week.calenderYearWeek] = t;


            if (week.fva === NaN || week.fva === NaN || week.fva === undefined || week.fva === null) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0))
            }
            f1234_total[week.calenderYearWeek] = t;



            if (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0))
            }
            f12345[week.calenderYearWeek] = t;
            f123456[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.apo).toFixed(0))
            if (week.actuals === NaN || week.actuals === NaN || week.actuals === undefined || week.actuals === null) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0))
            }
            f1234567[week.calenderYearWeek] = t;
            if (week.actualslastyear === NaN || week.actualslastyear === NaN || week.actualslastyear === undefined || week.actualslastyear === null) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0))
            }
            f12345678[week.calenderYearWeek] = t;
            f123456789[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
            f1234567890[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0))
        }
        row_clone.push(f123);
        row_clone.push(f1234);
        row_clone.push(f1234_2);
        row_clone.push(f1234_3);
        row_clone.push(f1234_total);



        row_clone.push(f12345);
        row_clone.push(f123456);
        row_clone.push(f1234567);
        row_clone.push(f12345678);
        row_clone.push(f123456789);
        row_clone.push(f1234567890);
        row_clone.push(f12);
        this.rowData4 = row_clone1;
        this.rowData = row_clone;
        this.columnDefs = columndef_clone;
        var params = {
            force: false,
            suppressFlash: false,
        };
        this.gridApi.refreshCells(params);
        const abc = [];
        for (const week of data) {
            const newPoint: any = {
                comments: [],
                userComment: []
            };
            const key: string = week.calenderYearWeek;
            newPoint.calenderYearWeek = key;
            newPoint.week = key;
            newPoint.newweek = key.toString().slice(4, 6) + '-' + key.toString().slice(0, 4);
            newPoint.calenderYear = key;
            if (week.ml !== undefined) {
                newPoint.ml = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0));
                this.mlDataPoints.push({
                    x: key,
                    y: newPoint.ml,
                    color: this.mlDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.mlTotal += newPoint.ml;
            }
            if (week.ml !== undefined) {
                newPoint.initialFinalForecast = week.fva === undefined ? newPoint.ml : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0)));
                newPoint.finalForecast = parseFloat(DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast).toFixed(0));
                this.finalForecastDataPoints.push({
                    x: key,
                    y: newPoint.finalForecast,
                    color: this.finalForecastPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.finalCastTotal += newPoint.finalForecast;
            }
            if (week.actuals !== undefined) {
                newPoint.actuals = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0));
                this.actualDataPoints.push({
                    x: key,
                    y: newPoint.actuals,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.actuals += newPoint.actuals;
            }
            if (week.promo !== undefined) {
                newPoint.promovalue = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0));
                if (newPoint.promovalue == null || newPoint.promovalue === null || newPoint.promovalue == undefined || newPoint.promovalue === undefined) {
                    newPoint.promovalue = 0;
                }
                this.promovalue.push({
                    x: key,
                    y: newPoint.promovalue,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.promovalue += newPoint.promovalue;
            }
            if (week.fva !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd = parseFloat(this.forecastadd.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd = this.totalData.fsvtValueAdd + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd = value;
                    this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
                }
            }


            if (week.fva2 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd2 = parseFloat(this.forecastadd2.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd2 = this.totalData.fsvtValueAdd2 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd2 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd2 = value;
                    this.totalData.fsvtValueAdd2 += newPoint.fcstValueAdd2;
                }
            }


            if (week.fva3 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd3 = parseFloat(this.forecastadd.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd3 = this.totalData.fsvtValueAdd3 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd3 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd3 = value;
                    this.totalData.fsvtValueAdd3 += newPoint.fcstValueAdd3;
                }
            }






            if (week.fva_total !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd_total = parseFloat(this.forecastadd.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd_total = this.totalData.fsvtValueAdd_total + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd_total += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd_total = value;
                    this.totalData.fsvtValueAdd_total += newPoint.fcstValueAdd_total;
                }
            }


            if (week.apo !== undefined) {
                newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
                this.aopDataPoints.push({
                    x: key,
                    y: newPoint.apo,
                    color: this.aopDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key,
                });
                this.totalData.apoTotal += newPoint.apo;
            }
            if (week.actualslastyear !== undefined) {
                newPoint.actualslastyear = DashboardComponent.parseStringToFloat(week.actualslastyear);
                this.lastYearDataPoints.push({
                    x: key,
                    y: newPoint.actualslastyear,
                    color: this.lastyearDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.lastYearTotal += newPoint.actualslastyear;
            }
            if (week.harshit !== undefined) {
                newPoint.harshit = DashboardComponent.parseStringToFloat(week.harshit);
                this.totalData.harshit += newPoint.harshit;
            }
            if (week.comment) {
                newPoint.comments = week.comment;
            }
            if (week.lockcell) {
                newPoint.lockcell = week.lockcell;
            }
            this.graphData.push(newPoint);
        }
        this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(0));
        this.totalData.lastYearTotal = parseFloat(this.totalData.lastYearTotal.toFixed(0));
        this.totalData.actuals = parseFloat(this.totalData.actuals.toFixed(0));
        this.totalData.mlTotal = parseFloat(this.totalData.mlTotal.toFixed(0));
        this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(0));
        this.totalData.harshit = parseFloat(this.totalData.harshit.toFixed(0));

        var params = {
            force: false,
            suppressFlash: false,
        };
        this.gridApi.refreshCells(params);

    }
    public processGraphData_1(res) {
        this.second_ag = true;
        this.main_graph = false;
        this.fourth_ag = false;
        this.first_ag = false;
        this.third_ag = false;
        this.views = "Detailed View";
        const data = res.res;
        var columndef_clone: any = [];
        var row_clone = [];
        var row_clone5 = [];
        var row_clone1 = [];
        const newData = [];
        this.aopDataPoints.length = 0;
        this.fvaDataPoints.length = 0;
        this.mlDataPoints.length = 0;
        this.actualDataPoints.length = 0;
        this.promovalue.length = 0;
        this.lastYearDataPoints.length = 0;
        this.finalForecastDataPoints.length = 0;
        this.graphData = [];
        this.totalData = {
            finalCastTotal: 0,
            harshit: 0,
            fsvtValueAdd: 0,
            fsvtValueAdd2: 0,
            fsvtValueAdd3: 0,
            fsvtValueAdd_total: 0,
            apoTotal: 0,
            mlTotal: 0,
            promovalue: 0,
            actuals: 0,
            lastYearTotal: 0,
        };
        this.forecastadd = 0;
        this.forecastadd2 = 0;
        this.forecastadd3 = 0;
        this.forecastadd_total = 0;
        columndef_clone.push(
            { headerName: "Key Figure", field: 'key', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
            { headerName: "CPG", field: 'cpg', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
            { headerName: "Plant", field: 'plant', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
            { headerName: "Forecasting Group", field: 'sku', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
        );
        var final = 0;
        var temp_date = 0;
        if (res.req.startWeek < res.start && res.start != 0) {
            final = res.req.startWeek;
            temp_date = data[0].calenderYearWeek;
            columndef_clone.push({
                field: JSON.stringify(data[0].calenderYearWeek),
                cellStyle: { 'background-color': '#fff' },
                aggFunc: 'sum',
                width: 105, //150
                type: 'rightAligned',
            });
        }
        else if (res.start != 0) {
            final = res.start;
            temp_date = data[0].calenderYearWeek;
            columndef_clone.push({
                field: JSON.stringify(data[0].calenderYearWeek),
                cellStyle: { 'background-color': '#BEBEBE' },
                aggFunc: 'sum',
                width: 105, //150
                type: 'rightAligned',
            });
        }
        else {
            final = res.req.startWeek;
            temp_date = data[0].calenderYearWeek;
            columndef_clone.push({
                field: JSON.stringify(data[0].calenderYearWeek),
                cellStyle: { 'background-color': '#BEBEBE' },
                aggFunc: 'sum',
                width: 105, //150
                type: 'rightAligned',
            });
        }
        for (const week of data) {
            if (week.calenderYearWeek <= final) {
                if (week.calenderYearWeek != temp_date) {
                    columndef_clone.push({
                        field: JSON.stringify(week.calenderYearWeek),
                        cellStyle: { 'background-color': '#BEBEBE' },
                        width: 105, //150
                        type: 'rightAligned',
                        aggFunc: 'sum',
                        valueFormatter: function (params) {
                            return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                        }
                    });
                    temp_date = week.calenderYearWeek;
                }
            }
            else {
                if (week.calenderYearWeek != temp_date) {
                    columndef_clone.push({
                        field: JSON.stringify(week.calenderYearWeek),
                        width: 105, //150
                        type: 'rightAligned',
                        aggFunc: 'sum',
                        valueFormatter: function (params) {
                            return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                        }
                    });
                    temp_date = week.calenderYearWeek;
                }
            }
        }
        var ghj = [];
        var fg1 = data[0].calenderYearWeek;
        for (let yh of data) {
            if (fg1 == yh.calenderYearWeek) {
                ghj.push({
                    sku: yh.sku,
                    plant: yh.plant,
                    cpg: yh.cpg
                });
            }
        }
        let flah = 0;
        for (let yh of data) {
            flah = 0;
            for (let row of ghj) {
                if (yh.sku == row.sku && yh.plant == row.plant && yh.cpg == row.cpg) {
                    flah = 1;
                }
            }
            if (flah == 1) {
            }
            else {
                ghj.push({
                    sku: yh.sku,
                    plant: yh.plant,
                    cpg: yh.cpg
                });
            }
        }
        for (let row of ghj) {
            var f123 = { key: 'Final Forecast' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    var th = week.fva === undefined ? parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0)));
                    f123[week.calenderYearWeek] = th;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'FVA1' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva === NaN || week.fva === NaN || week.fva === undefined || week.fva === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }








        for (let row of ghj) {
            var f123 = { key: 'FVA2' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva2 === NaN || week.fva2 === NaN || week.fva2 === undefined || week.fva2 === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }










        for (let row of ghj) {
            var f123 = { key: 'FVA3' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva3 === NaN || week.fva3 === NaN || week.fva3 === undefined || week.fva3 === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }




        for (let row of ghj) {
            var f123 = { key: 'FVA Total' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva_total === NaN || week.fva_total === NaN || week.fva_total === undefined || week.fva_total === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }




        for (let row of ghj) {
            var f123 = { key: 'ML' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.ml === NaN || week.ml === NaN || week.ml === undefined || week.ml === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Actual' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.actuals === NaN || week.actuals === NaN || week.actuals === undefined || week.actuals === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Actual LY' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.actualslastyear === NaN || week.actualslastyear === NaN || week.actualslastyear === undefined || week.actualslastyear === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Open orders' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.harshit === NaN || week.harshit === NaN || week.harshit === undefined || week.harshit === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Promo' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.promo === NaN || week.promo === NaN || week.promo === undefined || week.promo === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        var fv = [{
            sku: "",
            plant: "",
            cpg: ""
        }];
        var a = data[0].calenderYearWeek;
        var f2 = 0;
        for (const abc of data) {
            if (f2 == 0) {
                f2 = 1;
                continue;
            }
            if (abc.calenderYearWeek == a) {
                fv.push({
                    sku: abc.sku,
                    plant: abc.plant,
                    cpg: abc.cpg
                });
            }
        }
        var f123 = { key: 'ML' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Actual' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Promo' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Actual LY' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0)) == undefined) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'APO' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.apo).toFixed(0))
        }
        row_clone.push(f123);
        var f123 = { key: 'Open order' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone.push(f123);
        var f123 = { key: 'FVA1' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone1.push(f123);



        var f123 = { key: 'FVA2' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0))
        }
        row_clone1.push(f123);



        var f123 = { key: 'FVA3' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0))
        }


        var f123 = { key: 'FVA Total' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0))
        }
        row_clone1.push(f123);
        this.rowData5 = row_clone5;
        this.rowData = row_clone;
        this.columnDefs5 = columndef_clone;
        const abc = [];
        for (const week of data) {
            const newPoint: any = {
                comments: [],
                userComment: []
            };
            const key: string = week.calenderYearWeek;
            newPoint.calenderYearWeek = key;
            newPoint.week = key;
            newPoint.newweek = key.toString().slice(4, 6) + '-' + key.toString().slice(0, 4);
            newPoint.calenderYear = key;
            if (week.ml !== undefined) {
                newPoint.ml = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0));
                this.mlDataPoints.push({
                    x: key,
                    y: newPoint.ml,
                    color: this.mlDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.mlTotal += newPoint.ml;
            }
            if (week.ml !== undefined) {
                newPoint.initialFinalForecast = week.fva === undefined ? newPoint.ml : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0)));
                newPoint.finalForecast = parseFloat(DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast).toFixed(0));
                this.finalForecastDataPoints.push({
                    x: key,
                    y: newPoint.finalForecast,
                    color: this.finalForecastPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.finalCastTotal += newPoint.finalForecast;
            }
            if (week.actuals !== undefined) {
                newPoint.actuals = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0));
                this.actualDataPoints.push({
                    x: key,
                    y: newPoint.actuals,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.actuals += newPoint.actuals;
            }
            if (week.promo !== undefined) {
                newPoint.promovalue = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0));
                if (newPoint.promovalue == null || newPoint.promovalue === null || newPoint.promovalue == undefined || newPoint.promovalue === undefined) {
                    newPoint.promovalue = 0;
                }
                this.promovalue.push({
                    x: key,
                    y: newPoint.promovalue,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.promovalue += newPoint.promovalue;
            }
            if (week.fva !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd = parseFloat(this.forecastadd.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd = this.totalData.fsvtValueAdd + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd = value;
                    this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
                }
            }


            if (week.fva2 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd2 = parseFloat(this.forecastadd2.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd2 = this.totalData.fsvtValueAdd2 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd2 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd2 = value;
                    this.totalData.fsvtValueAdd2 += newPoint.fcstValueAdd2;
                }
            }



            if (week.fva3 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd3 = parseFloat(this.forecastadd3.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd3 = this.totalData.fsvtValueAdd3 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd3 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd3 = value;
                    this.totalData.fsvtValueAdd3 += newPoint.fcstValueAdd3;
                }
            }


            if (week.fva_total !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd_total = parseFloat(this.forecastadd_total.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd_total = this.totalData.fsvtValueAdd_total + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd_total += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd_total = value;
                    this.totalData.fsvtValueAdd_total += newPoint.fcstValueAdd_total;
                }
            }
            if (week.apo !== undefined) {
                newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
                this.aopDataPoints.push({
                    x: key,
                    y: newPoint.apo,
                    color: this.aopDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key,
                });
                this.totalData.apoTotal += newPoint.apo;
            }
            if (week.actualslastyear !== undefined) {
                newPoint.actualslastyear = DashboardComponent.parseStringToFloat(week.actualslastyear);
                this.lastYearDataPoints.push({
                    x: key,
                    y: newPoint.actualslastyear,
                    color: this.lastyearDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.lastYearTotal += newPoint.actualslastyear;
            }
            if (week.harshit !== undefined) {
                newPoint.harshit = DashboardComponent.parseStringToFloat(week.harshit);
                this.totalData.harshit += newPoint.harshit;
            }
            if (week.comment) {
                newPoint.comments = week.comment;
            }
            if (week.lockcell) {
                newPoint.lockcell = week.lockcell;
            }
            this.graphData.push(newPoint);
        }
        this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(0));
        this.totalData.lastYearTotal = parseFloat(this.totalData.lastYearTotal.toFixed(0));
        this.totalData.actuals = parseFloat(this.totalData.actuals.toFixed(0));
        this.totalData.mlTotal = parseFloat(this.totalData.mlTotal.toFixed(0));
        this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(0));
        this.totalData.harshit = parseFloat(this.totalData.harshit.toFixed(0));
    }
    public processGraphData_1_material(res) {
        this.second_ag = true;
        this.main_graph = false;
        this.fourth_ag = false;
        this.first_ag = false;
        this.third_ag = false;
        this.views = "Detailed View_material";
        const data = res.res;
        var columndef_clone: any = [];
        var row_clone = [];
        var row_clone5 = [];
        var row_clone1 = [];
        const newData = [];
        this.aopDataPoints.length = 0;
        this.fvaDataPoints.length = 0;
        this.mlDataPoints.length = 0;
        this.actualDataPoints.length = 0;
        this.promovalue.length = 0;
        this.lastYearDataPoints.length = 0;
        this.finalForecastDataPoints.length = 0;
        this.graphData = [];
        this.totalData = {
            finalCastTotal: 0,
            harshit: 0,
            fsvtValueAdd: 0,
            fsvtValueAdd2: 0,
            fsvtValueAdd3: 0,
            fsvtValueAdd_total: 0,
            apoTotal: 0,
            mlTotal: 0,
            promovalue: 0,
            actuals: 0,
            lastYearTotal: 0,
        };
        this.forecastadd = 0;
        this.forecastadd2 = 0;
        this.forecastadd3 = 0;
        this.forecastadd_total = 0;
        columndef_clone.push(
            { headerName: "Key Figure", field: 'key', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
            { headerName: "CPG", field: 'cpg', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
            { headerName: "Plant", field: 'plant', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
            { headerName: "Material", field: 'sku', rowGroup: true, filter: true, width: 100, hide: true, cellStyle: { 'font-weight': 'bold', } },
        );
        var temp_date = data[0].calenderYearWeek;
        columndef_clone.push({
            field: JSON.stringify(data[0].calenderYearWeek),
            cellStyle: { 'background-color': '#BEBEBE' },
            aggFunc: 'sum',
            type: 'rightAligned',
            width: 100, //150
        });
        for (const week of data) {
            if (week.calenderYearWeek <= res.start) {
                if (week.calenderYearWeek != temp_date) {
                    columndef_clone.push({
                        field: JSON.stringify(week.calenderYearWeek),
                        cellStyle: { 'background-color': '#BEBEBE' },
                        width: 100,
                        type: 'rightAligned',
                        aggFunc: 'sum',
                        valueFormatter: function (params) {
                            return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                        }
                    });
                    temp_date = week.calenderYearWeek;
                }
            }
            else {
                if (week.calenderYearWeek != temp_date) {
                    columndef_clone.push({
                        field: JSON.stringify(week.calenderYearWeek),
                        width: 100,
                        type: 'rightAligned',
                        aggFunc: 'sum',
                        valueFormatter: function (params) {
                            return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                        }
                    });
                    temp_date = week.calenderYearWeek;
                }
            }
        }
        var ghj = [];
        var fg1 = data[0].calenderYearWeek;
        for (let yh of data) {
            if (fg1 == yh.calenderYearWeek) {
                ghj.push({
                    sku: yh.sku,
                    plant: yh.plant,
                    cpg: yh.cpg
                });
            }
        }
        let flah = 0;
        for (let yh of data) {
            flah = 0;
            for (let row of ghj) {
                if (yh.sku == row.sku && yh.plant == row.plant && yh.cpg == row.cpg) {
                    flah = 1;
                }
            }
            if (flah == 1) {
            }
            else {
                ghj.push({
                    sku: yh.sku,
                    plant: yh.plant,
                    cpg: yh.cpg
                });
            }
        }
        for (let row of ghj) {
            var f123 = { key: 'Final Forecast' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    var th = week.fva === undefined ? parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0)));
                    f123[week.calenderYearWeek] = th;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'FVA1' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva === NaN || week.fva === NaN || week.fva === undefined || week.fva === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }




        for (let row of ghj) {
            var f123 = { key: 'FVA2' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva2 === NaN || week.fva2 === NaN || week.fva2 === undefined || week.fva2 === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }



        for (let row of ghj) {
            var f123 = { key: 'FVA3' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva3 === NaN || week.fva3 === NaN || week.fva3 === undefined || week.fva3 === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }



        for (let row of ghj) {
            var f123 = { key: 'FVA Total' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.fva_total === NaN || week.fva_total === NaN || week.fva_total === undefined || week.fva_total === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }



        for (let row of ghj) {
            var f123 = { key: 'ML' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.ml === NaN || week.ml === NaN || week.ml === undefined || week.ml === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Actual' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.actuals === NaN || week.actuals === NaN || week.actuals === undefined || week.actuals === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Actual LY' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.actualslastyear === NaN || week.actualslastyear === NaN || week.actualslastyear === undefined || week.actualslastyear === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Open orders' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.harshit === NaN || week.harshit === NaN || week.harshit === undefined || week.harshit === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Promo' };
            f123['cpg'] = row.cpg;
            f123['plant'] = row.plant;
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku && week.plant == row.plant && week.cpg == row.cpg) {
                    if (week.promo === NaN || week.promo === NaN || week.promo === undefined || week.promo === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        var fv = [{
            sku: "",
            plant: "",
            cpg: ""
        }];
        var a = data[0].calenderYearWeek;
        var f2 = 0;
        for (const abc of data) {
            if (f2 == 0) {
                f2 = 1;
                continue;
            }
            if (abc.calenderYearWeek == a) {
                fv.push({
                    sku: abc.sku,
                    plant: abc.plant,
                    cpg: abc.cpg
                });
            }
        }
        var f123 = { key: 'ML' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Actual' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Promo' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Actual LY' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0)) == undefined) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'APO' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.apo).toFixed(0))
        }
        row_clone.push(f123);
        var f123 = { key: 'Open order' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone.push(f123);
        var f123 = { key: 'FVA1' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone1.push(f123);
        this.rowData5 = row_clone5;
        this.rowData = row_clone;
        this.columnDefs5 = columndef_clone;
        const abc = [];
        for (const week of data) {
            const newPoint: any = {
                comments: [],
                userComment: []
            };
            const key: string = week.calenderYearWeek;
            newPoint.calenderYearWeek = key;
            newPoint.week = key;
            newPoint.newweek = key.toString().slice(4, 6) + '-' + key.toString().slice(0, 4);
            newPoint.calenderYear = key;
            if (week.ml !== undefined) {
                newPoint.ml = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0));
                this.mlDataPoints.push({
                    x: key,
                    y: newPoint.ml,
                    color: this.mlDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.mlTotal += newPoint.ml;
            }
            if (week.ml !== undefined) {
                newPoint.initialFinalForecast = week.fva === undefined ? newPoint.ml : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0)));
                newPoint.finalForecast = parseFloat(DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast).toFixed(0));
                this.finalForecastDataPoints.push({
                    x: key,
                    y: newPoint.finalForecast,
                    color: this.finalForecastPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.finalCastTotal += newPoint.finalForecast;
            }
            if (week.actuals !== undefined) {
                newPoint.actuals = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0));
                this.actualDataPoints.push({
                    x: key,
                    y: newPoint.actuals,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.actuals += newPoint.actuals;
            }
            if (week.promo !== undefined) {
                newPoint.promovalue = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0));
                if (newPoint.promovalue == null || newPoint.promovalue === null || newPoint.promovalue == undefined || newPoint.promovalue === undefined) {
                    newPoint.promovalue = 0;
                }
                this.promovalue.push({
                    x: key,
                    y: newPoint.promovalue,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.promovalue += newPoint.promovalue;
            }
            if (week.fva !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd = parseFloat(this.forecastadd.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd = this.totalData.fsvtValueAdd + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd = value;
                    this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
                }
            }


            if (week.fva2 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd2 = parseFloat(this.forecastadd2.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd2 = this.totalData.fsvtValueAdd2 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd2 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd2 = value;
                    this.totalData.fsvtValueAdd2 += newPoint.fcstValueAdd2;
                }
            }


            if (week.fva3 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd3 = parseFloat(this.forecastadd3.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd3 = this.totalData.fsvtValueAdd3 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd3 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd3 = value;
                    this.totalData.fsvtValueAdd3 += newPoint.fcstValueAdd3;
                }
            }


            if (week.fva_total !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd_total = parseFloat(this.forecastadd_total.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd_total = this.totalData.fsvtValueAdd_total + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd_total += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd_total = value;
                    this.totalData.fsvtValueAdd_total += newPoint.fcstValueAdd_total;
                }
            }
            if (week.apo !== undefined) {
                newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
                this.aopDataPoints.push({
                    x: key,
                    y: newPoint.apo,
                    color: this.aopDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key,
                });
                this.totalData.apoTotal += newPoint.apo;
            }
            if (week.actualslastyear !== undefined) {
                newPoint.actualslastyear = DashboardComponent.parseStringToFloat(week.actualslastyear);
                this.lastYearDataPoints.push({
                    x: key,
                    y: newPoint.actualslastyear,
                    color: this.lastyearDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.lastYearTotal += newPoint.actualslastyear;
            }
            if (week.harshit !== undefined) {
                newPoint.harshit = DashboardComponent.parseStringToFloat(week.harshit);
                this.totalData.harshit += newPoint.harshit;
            }
            if (week.comment) {
                newPoint.comments = week.comment;
            }
            if (week.lockcell) {
                newPoint.lockcell = week.lockcell;
            }
            this.graphData.push(newPoint);
        }
        this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(0));
        this.totalData.lastYearTotal = parseFloat(this.totalData.lastYearTotal.toFixed(0));
        this.totalData.actuals = parseFloat(this.totalData.actuals.toFixed(0));
        this.totalData.mlTotal = parseFloat(this.totalData.mlTotal.toFixed(0));
        this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(0));
        this.totalData.harshit = parseFloat(this.totalData.harshit.toFixed(0));
    }
    public processGraphData_2(res) {
        this.third_ag = true;
        this.second_ag = false;
        this.main_graph = false;
        this.fourth_ag = false;
        this.views = "Sku View";
        this.first_ag = false;
        const data = res.res;
        var columndef_clone: any = [];
        var row_clone = [];
        var row_clone5 = [];
        var row_clone1 = [];
        const newData = [];
        this.aopDataPoints.length = 0;
        this.fvaDataPoints.length = 0;
        this.mlDataPoints.length = 0;
        this.actualDataPoints.length = 0;
        this.promovalue.length = 0;
        this.lastYearDataPoints.length = 0;
        this.finalForecastDataPoints.length = 0;
        this.graphData = [];
        this.totalData = {
            finalCastTotal: 0,
            harshit: 0,
            fsvtValueAdd: 0,
            fsvtValueAdd2: 0,
            fsvtValueAdd3: 0,
            fsvtValueAdd_total: 0,
            apoTotal: 0,
            mlTotal: 0,
            promovalue: 0,
            actuals: 0,
            lastYearTotal: 0,
        };
        this.forecastadd = 0;
        this.forecastadd2 = 0;
        this.forecastadd3 = 0;
        this.forecastadd_total = 0;
        columndef_clone.push(
            { headerName: "Key Figure", field: 'key', filter: true, width: 150, sortable: true, pinned: "left", cellStyle: { 'font-weight': 'bold', 'position-left': '5px', } },
            { headerName: "FG", field: 'sku', filter: true, width: 90, sortable: true, pinned: "left", cellStyle: { 'font-weight': 'bold', 'position-left': '5px', } },
        );
        var temp_date = data[0].calenderYearWeek;
        columndef_clone.push({
            field: JSON.stringify(data[0].calenderYearWeek),
            width: 100, //130
            type: 'rightAligned',
            cellStyle: { 'background-color': '#BEBEBE' },
        });
        for (const week of data) {
            if (week.calenderYearWeek <= res.start) {
                if (week.calenderYearWeek != temp_date) {
                    columndef_clone.push({
                        field: JSON.stringify(week.calenderYearWeek),
                        cellStyle: { 'background-color': '#BEBEBE' },
                        type: 'rightAligned',
                        width: 100,
                        valueFormatter: function (params) {
                            return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                        }
                    });
                    temp_date = week.calenderYearWeek;
                }
            } else {
                if (week.calenderYearWeek != temp_date) {
                    columndef_clone.push({
                        field: JSON.stringify(week.calenderYearWeek),
                        cellStyle: function (params) {
                            if (params.data.key == 'FVA1' || params.data.key == 'FVA2' || params.data.key == 'FVA3') {
                                return { 'border': '1px solid', 'border-color': '#CFD9E7' };
                            }
                            else {
                                return {};
                            }
                        },
                        editable: function (params) {
                            if (params.data.key != 'FVA1' && params.data.key != 'FVA2' && params.data.key != 'FVA3' && params.data.key != 'Comments') {
                                return false;
                            }
                            else {
                                return true;
                            }
                        },
                        type: 'rightAligned',
                        width: 100,
                        valueFormatter: function (params) {
                            return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                        }
                    });
                    temp_date = week.calenderYearWeek;
                }
            }
        }
        var ghj = [];
        var fg1 = data[0].calenderYearWeek;
        for (let yh of data) {
            if (fg1 == yh.calenderYearWeek) {
                ghj.push({
                    sku: yh.sku,
                });
            }
        }
        for (let row of ghj) {
            var f123 = { key: 'Final Forecast-' + row.sku };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    var th = week.fva === undefined ? parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0)));
                    f123[week.calenderYearWeek] = th
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'FVA1' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.fva === NaN || week.fva === NaN || week.fva === undefined || week.fva === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }


        for (let row of ghj) {
            var f123 = { key: 'FVA2' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.fva2 === NaN || week.fva2 === NaN || week.fva2 === undefined || week.fva2 === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }




        for (let row of ghj) {
            var f123 = { key: 'FVA3' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.fva3 === NaN || week.fva3 === NaN || week.fva3 === undefined || week.fva3 === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }



        for (let row of ghj) {
            var f123 = { key: 'FVA Total' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.fva_total === NaN || week.fva_total === NaN || week.fva_total === undefined || week.fva_total === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }


        for (let row of ghj) {
            var f123 = { key: 'ML-' + row.sku };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.ml === NaN || week.ml === NaN || week.ml === undefined || week.ml === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'APO' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.apo === NaN || week.apo === NaN || week.apo === undefined || week.apo === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.apo).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Actual' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.actuals === NaN || week.actuals === NaN || week.actuals === undefined || week.actuals === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Actual LY' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.actualslastyear === NaN || week.actualslastyear === NaN || week.actualslastyear === undefined || week.actualslastyear === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Open Order' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.harshit === NaN || week.harshit === NaN || week.harshit === undefined || week.harshit === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        for (let row of ghj) {
            var f123 = { key: 'Promo' };
            f123['sku'] = row.sku;
            for (let week of data) {
                if (week.sku == row.sku) {
                    if (week.promo === NaN || week.promo === NaN || week.promo === undefined || week.promo === null) {
                        t = 0;
                    }
                    else {
                        t = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0))
                    }
                    f123[week.calenderYearWeek] = t;
                }
            }
            row_clone5.push(f123);
        }
        var fv = [{
            sku: "",
            plant: "",
            cpg: ""
        }];
        var a = data[0].calenderYearWeek;
        var f2 = 0;
        for (const abc of data) {
            if (f2 == 0) {
                f2 = 1;
                continue;
            }
            if (abc.calenderYearWeek == a) {
                fv.push({
                    sku: abc.sku,
                    plant: abc.plant,
                    cpg: abc.cpg
                });
            }
        }
        var f123 = { key: 'ML' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Actual' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Promo' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            var t;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0)) == NaN) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'Actual LY' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            if (parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0)) == null || parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0)) == undefined) {
                t = 0;
            }
            else {
                t = parseFloat(DashboardComponent.parseStringToFloat(week.actualslastyear).toFixed(0))
            }
            f123[week.calenderYearWeek] = t;
        }
        row_clone.push(f123);
        var f123 = { key: 'APO' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.apo).toFixed(0))
        }
        row_clone.push(f123);
        var f123 = { key: 'Open order' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone.push(f123);
        var f123 = { key: 'FVA1' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone1.push(f123);



        var f123 = { key: 'FVA2' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone1.push(f123);



        var f123 = { key: 'FVA3' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone1.push(f123);



        var f123 = { key: 'FVA Total' };
        for (const week of data) {
            f123['cpg'] = week.cpg;
            f123['sku'] = week.sku;
            f123['plant'] = week.plant;
            f123[week.calenderYearWeek] = parseFloat(DashboardComponent.parseStringToFloat(week.harshit).toFixed(0))
        }
        row_clone1.push(f123);


        this.rowData6 = row_clone5;
        this.rowData = row_clone;
        this.columnDefs6 = columndef_clone;
        var params = {
            force: false,
            suppressFlash: false,
        };
        this.gridApi1.refreshCells(params);
        const abc = [];
        for (const week of data) {
            const newPoint: any = {
                comments: [],
                userComment: []
            };
            const key: string = week.calenderYearWeek;
            newPoint.calenderYearWeek = key;
            newPoint.week = key;
            newPoint.newweek = key.toString().slice(4, 6) + '-' + key.toString().slice(0, 4);
            newPoint.calenderYear = key;
            if (week.ml !== undefined) {
                newPoint.ml = parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0));
                this.mlDataPoints.push({
                    x: key,
                    y: newPoint.ml,
                    color: this.mlDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.mlTotal += newPoint.ml;
            }
            if (week.ml !== undefined) {
                newPoint.initialFinalForecast = week.fva === undefined ? newPoint.ml : (parseFloat(DashboardComponent.parseStringToFloat(week.ml).toFixed(0)) + parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0)));
                newPoint.finalForecast = parseFloat(DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast).toFixed(0));
                this.finalForecastDataPoints.push({
                    x: key,
                    y: newPoint.finalForecast,
                    color: this.finalForecastPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.finalCastTotal += newPoint.finalForecast;
            }
            if (week.actuals !== undefined) {
                newPoint.actuals = parseFloat(DashboardComponent.parseStringToFloat(week.actuals).toFixed(0));
                this.actualDataPoints.push({
                    x: key,
                    y: newPoint.actuals,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.actuals += newPoint.actuals;
            }
            if (week.promo !== undefined) {
                newPoint.promovalue = parseFloat(DashboardComponent.parseStringToFloat(week.promo).toFixed(0));
                if (newPoint.promovalue == null || newPoint.promovalue === null || newPoint.promovalue == undefined || newPoint.promovalue === undefined) {
                    newPoint.promovalue = 0;
                }
                this.promovalue.push({
                    x: key,
                    y: newPoint.promovalue,
                    color: this.actualDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.promovalue += newPoint.promovalue;
            }
            if (week.fva !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd = parseFloat(this.forecastadd.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd = this.totalData.fsvtValueAdd + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd = value;
                    this.totalData.fsvtValueAdd += newPoint.fcstValueAdd;
                }
            }


            if (week.fva2 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva2).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd2 = parseFloat(this.forecastadd2.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd2 = this.totalData.fsvtValueAdd2 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd2 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd2 = value;
                    this.totalData.fsvtValueAdd += newPoint.fcstValueAdd2;
                }
            }


            if (week.fva3 !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva3).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd3 = parseFloat(this.forecastadd3.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd3 = this.totalData.fsvtValueAdd3 + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd3 += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd3 = value;
                    this.totalData.fsvtValueAdd3 += newPoint.fcstValueAdd3;
                }
            }


            if (week.fva_total !== undefined) {
                const value = parseFloat(DashboardComponent.parseStringToFloat(week.fva_total).toFixed(0));
                if (value !== undefined) {
                    this.forecastadd_total = parseFloat(this.forecastadd_total.toFixed(0)) + parseFloat(value.toFixed(0));
                    this.totalData.fsvtValueAdd_total = this.totalData.fsvtValueAdd_total + newPoint.initialFinalForecast;
                    this.totalData.fsvtValueAdd_total += DashboardComponent.parseStringToFloat(newPoint.initialFinalForecast);
                    newPoint.fcstValueAdd_total = value;
                    this.totalData.fsvtValueAdd_total += newPoint.fcstValueAdd_total;
                }
            }
            if (week.apo !== undefined) {
                newPoint.apo = DashboardComponent.parseStringToFloat(week.apo);
                this.aopDataPoints.push({
                    x: key,
                    y: newPoint.apo,
                    color: this.aopDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key,
                });
                this.totalData.apoTotal += newPoint.apo;
            }
            if (week.actualslastyear !== undefined) {
                newPoint.actualslastyear = DashboardComponent.parseStringToFloat(week.actualslastyear);
                this.lastYearDataPoints.push({
                    x: key,
                    y: newPoint.actualslastyear,
                    color: this.lastyearDataPointColor,
                    click: this.dataPointClick.bind(this),
                    calenderYear: key
                });
                this.totalData.lastYearTotal += newPoint.actualslastyear;
            }
            if (week.harshit !== undefined) {
                newPoint.harshit = DashboardComponent.parseStringToFloat(week.harshit);
                this.totalData.harshit += newPoint.harshit;
            }
            if (week.comment) {
                newPoint.comments = week.comment;
            }
            if (week.lockcell) {
                newPoint.lockcell = week.lockcell;
            }
            this.graphData.push(newPoint);
        }
        this.totalData.apoTotal = parseFloat(this.totalData.apoTotal.toFixed(0));
        this.totalData.lastYearTotal = parseFloat(this.totalData.lastYearTotal.toFixed(0));
        this.totalData.actuals = parseFloat(this.totalData.actuals.toFixed(0));
        this.totalData.mlTotal = parseFloat(this.totalData.mlTotal.toFixed(0));
        this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(0));
        this.totalData.harshit = parseFloat(this.totalData.harshit.toFixed(0));
    }
    public processFeatureGraphData(res) {
        const data1 = res.secondGraphRes;
        try {
            var a = document.getElementById('checking').innerHTML;
        } catch (err) {
        }
        this.property.length = 0;
        this.property2.length = 0;
        this.property3.length = 0;
        for (const week1 of data1) {
            if (week1.property !== undefined) {
                this.property.push({
                    x: week1.calenderYearWeek,
                    color: '#FF0076',
                    y: DashboardComponent.parseStringToFloat(week1.property),
                });
            }
            if (week1.property2 !== undefined) {
                this.property2.push({
                    x: week1.calenderYearWeek,
                    color: '#00321E',
                    y: DashboardComponent.parseStringToFloat(week1.property2),
                });
            }
            if (week1.property3 !== undefined) {
                this.property3.push({
                    x: week1.calenderYearWeek,
                    color: '#012F6F',
                    y: DashboardComponent.parseStringToFloat(week1.property3),
                });
            }
        }
    }
    public processFeatureGraphData_open_boolean(res) {
        const data1 = res.secondGraphRes;
        try {
            var a = document.getElementById('checking').innerHTML;
        } catch (err) {
        }
        this.property.length = 0;
        this.property2.length = 0;
        this.property3.length = 0;
        for (const week1 of data1) {
            if (week1.property !== undefined) {
                if (DashboardComponent.parseStringToFloat(week1.property2) > 1.5) {
                    this.property.push({
                        x: week1.calenderYearWeek,
                        y: 1,
                    });
                } else {
                    (DashboardComponent.parseStringToFloat(week1.property2) > 1.5);
                }
                {
                    this.property.push({
                        x: week1.calenderYearWeek,
                        y: 0,
                    });
                }
            }
            if (week1.property2 !== undefined) {
                this.property2.push({
                    x: week1.calenderYearWeek,
                    y: DashboardComponent.parseStringToFloat(week1.property2),
                });
            }
            if (week1.property3 !== undefined) {
                this.property3.push({
                    x: week1.calenderYearWeek,
                    y: DashboardComponent.parseStringToFloat(week1.property3),
                });
            }
        }
    }
    public processFeatureGraphData_open(res) {
        const data1 = res.secondGraphRes;
        try {
            var a = document.getElementById('checking').innerHTML;
        } catch (err) {
        }
        this.property.length = 0;
        this.property2.length = 0;
        this.property3.length = 0;
        for (const week1 of data1) {
            if (week1.property !== undefined) {
                this.property.push({
                    x: week1.calenderYearWeek,
                    color: '#FF0076',
                    y: DashboardComponent.parseStringToFloat(week1.property),
                });
            }
            if (week1.property2 !== undefined) {
                this.property2.push({
                    x: week1.calenderYearWeek,
                    color: '#00321E',
                    y: DashboardComponent.parseStringToFloat(week1.property2),
                });
            }
            if (week1.property3 !== undefined) {
                this.property3.push({
                    x: week1.calenderYearWeek,
                    color: '#012F6F',
                    y: DashboardComponent.parseStringToFloat(week1.property3),
                });
            }
        }
    }
    public sku_map() {
    }
    public color_change() {
        this.color_tick = 1;
        this.prev_year = 0;
        try {
            document.getElementById('arrow').style.color = 'green';
        } catch (e) {
        }
    }
    public color_change1() {
        this.prev_year = 0;
        this.color_tick = 1;
        var a = this.prevactuals.split('-')[0];
        var b = this.endWeek.split('-')[0];
        if (parseInt(a) > 2012 && parseInt(b) > 2012) {
            window.alert("Getting the value between " + this.prevactuals + "-- and " + this.endWeek);
            this.tick();
        }
    }
    public createFilterObject(res: any) {
        const forecastingGroups = this.createPlanRequestData.forecastingGroups;
        this.fetched_forecasting.push({
            name: 'Forecas',
            key: 'subbrand',
            isExpanded: false,
            values: forecastingGroups.map(item => {
                return { name: item, isChecked: true, isFiltered: true };
            })
        });
        this.fetched_forecasting = this.createPlanRequestData.forecastingGroups;
    }
    // Comment on Graph
    public dataPointClick(e) {
        if (this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment) {
            alert(this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment);
        } else {
            // Show Comment Form
            this.selectedDataPoint = e;
            this.commentFormModalBtn.nativeElement.click();
        }
    }
    public onCommentFormSubmit(form: NgForm, data: any) {
        this.commentFormModalCancel.nativeElement.click();
        const e = this.selectedDataPoint;
        this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].markerType = 'triangle';
        this.chart1.options.data[e.dataSeriesIndex].dataPoints[e.dataPointIndex].comment = data.comment;
        this.chart1.render();
        form.resetForm();
        this.selectedDataPoint = null;
    }
    public locking1(form: NgForm, data: any) {
        this.lockModalCancel.nativeElement.click();
        var a = this.selecteddblclick;
        this.graphData;
        this.chart1.render();
        form.resetForm();
        this.selectedDataPoint = null;
    }
    public getCallback() {
        return this.filterSKUs.bind(this);
    }
    public getCallback_brands() {
        return this.filterSKUs_brands.bind(this);
    }
    public getCallback_leadsku() {
        return this.filterSKUs_leadsku.bind(this);
    }
    public filterSKUs_brands(sku: string) {
        if (!this.brandstext || !this.brandstext.trim()) {
            return true;
        }
        const regex = new RegExp(this.brandstext && this.brandstext.trim(), 'ig');
        return regex.test(sku);
    }
    public filterSKUs_leadsku(sku: string) {
        if (!this.leadtext || !this.leadtext.trim()) {
            return true;
        }
        const regex = new RegExp(this.leadtext && this.leadtext.trim(), 'ig');
        return regex.test(sku);
    }
    public filterSKUs(sku: string) {
        if (!this.searchText || !this.searchText.trim()) {
            return true;
        }
        const regex = new RegExp(this.searchText && this.searchText.trim(), 'ig');
        return regex.test(sku);
    }
    public filterSKUs_filter(sku: string) {
        if (!this.searchText_filter || !this.searchText_filter.trim()) {
            return true;
        }
        const regex = new RegExp(this.searchText_filter && this.searchText_filter.trim(), 'ig');
        return regex.test(sku);
    }
    public getCallback_filter() {
        return this.filterSKUs_filter.bind(this);
    }
    public getCallback_comm() {
        return this.filterSKUs_comm.bind(this);
    }
    public getCallback_plant() {
        return this.filterSKUs_plant.bind(this);
    }
    public getCallback_cpg() {
        return this.filterSKUs_cpg.bind(this);
    }
    public changeListener(files: FileList) {
        if (files && files.length > 0) {
            let file: File = files.item(0);
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let csv: string = reader.result as string;
                var g = csv.split('\n');
                var g = csv.split('\n').splice(1);
                var g1 = [];
                for (const ab of csv.split('\n').splice(1)) {
                    if (ab === 'Forecasting Group' || ab == 'Forecasting Group') {
                    } else {
                        this.second_sku = [];
                        this.skus = [];
                        var flag = 0;
                        for (var i = 0; i < ab.length; i++) {
                            if (ab.charAt(i) == '\r') {
                                flag = 1;
                            }
                        }
                        if (ab.substring(ab.length - 1, ab.length) == '\r') {
                        }
                        if (ab.length < 3) {
                            continue;
                        }
                        if (flag == 0 && ab != null) {
                            g1.push(ab);
                            var a = {
                                material: ab
                            };
                        } else if (ab != null && flag == 1) {
                            g1.push(ab.substring(0, ab.length - 1));
                            var a = {
                                material: ab.substring(0, ab.length - 1)
                            };
                        }
                    }
                }
                this.skuService.skuname(g1).subscribe((res: any) => {
                    this.reactivate_filter(1);
                    this.skus = res.map(item => {
                        return {
                            name: item,
                            isChecked: true
                            , isFiltered: true
                        };
                    });
                    this.fgssselected = JSON.parse(JSON.stringify(this.skus));
                }, (error) => {
                });
            };
        }
    }
    public start_drag_ml(cell: any) {
        this.selected_array = [];
        var num1 = this.graphData[cell].ml;
        this.sumselected = 0;
        this.avgselected = 0;
        this.selected_array.push(num1);
        this.up = 1;
    }
    public start_drag_final(cell: any) {
        this.selected_array = [];
        var num1 = this.graphData[cell].ml;
        this.sumselected = 0;
        this.avgselected = 0;
        this.selected_array.push(num1);
        this.up = 1;
    }
    public start_drag_apo(cell: any) {
        this.selected_array = [];
        var num1 = this.graphData[cell].apo;
        this.sumselected = 0;
        this.avgselected = 0;
        this.selected_array.push(num1);
        this.up = 1;
    }
    public start_drag_actuals(cell: any) {
        this.selected_array = [];
        var num1 = this.graphData[cell].actuals;
        this.sumselected = 0;
        this.avgselected = 0;
        this.selected_array.push(num1);
        this.up = 1;
    }
    public start_drag_actualsly(cell: any) {
        this.selected_array = [];
        var num1 = this.graphData[cell].actualslastyear;
        this.sumselected = 0;
        this.avgselected = 0;
        this.selected_array.push(num1);
        this.up = 1;
    }
    public start_drag_open(cell: any) {
        this.selected_array = [];
        var num1 = this.graphData[cell].harshit;
        this.sumselected = 0;
        this.avgselected = 0;
        this.selected_array.push(num1);
        this.up = 1;
    }
    public end_drag() {
        this.up = 0;
        this.sumselected = this.selected_array.reduce((a, b) => a + b);
        this.maxselected = this.selected_array.reduce((a, b) => Math.max(a, b));
        this.minselected = this.selected_array.reduce((a, b) => Math.min(a, b));
        this.avgselected = (this.sumselected / this.selected_array.length);
        this.countselected = this.selected_array.length;
        this.avgselected = parseFloat((this.avgselected).toFixed(0));
        this.sumselected = parseFloat((this.sumselected).toFixed(0));
    }
    public onPasteEnd(params) {
        var rowNode = this.gridApi.getRowNode('ML');
        for (const abr of this.arr12) {
            this.lotCompleted = 1;
            var f = abr.week;
            var th = abr.value;
            for (var y = 0; y < this.finalForecastDataPoints.length; y++) {
                if (this.finalForecastDataPoints[y].x == f) {
                    this.finalForecastDataPoints[y].y = parseInt(this.finalForecastDataPoints[y].y) + parseInt(th);
                }
            }
            this.chart1.render();
            this.change1(f, th, this.change_extra);
        }
        this.final_one = this.arr12.length;
    }
    public onPasteStart(params) {
        this.main_1_cal = 1;
        this.arr12_sku = [];
        var gk = this.gridApi.getCellRanges();
        this.copy_ml_week = params[0].startColumn.colId;
        var rowNode1 = this.gridApi.getRowNode('ML');
        this.copy_ml = rowNode1.data[params.startColumn.colId];
    }
    public onPasteEnd1(params) {
        this.lotCompleted = 1;
        for (const ab1 of this.arr12_sku) {
            this.change123(ab1.week, ab1.value, ab1.sku);
        }
        this.lotCompleted = 0;
        this.arr12_sku = [];
    }
    public onPasteStart1(params) {
        this.arr12_sku = [];
        this.main_1_cal_sku = 1;
    }
    onGridReady1(params) {
        this.gridApi1 = params.api;
        this.gridColumnApi1 = params.columnApi;
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }


    public change_fva(a, b, c) {


        var rowNode_total = this.gridApi.getRowNode('FVA Total');


        var fva = this.gridApi.getRowNode('FVA1');
        var fva2 = this.gridApi.getRowNode('FVA2');
        var fva3 = this.gridApi.getRowNode('FVA3');




        var g = parseInt(fva.data[a]) + parseInt(fva2.data[a]) + parseInt(fva3.data[a]);


        window.alert("a" + a);
        window.alert("g" + g);
        rowNode_total.setDataValue(a, g);

    }

    public change1(a, b, c) {

        // this.change_fva(a,b,c)
        //  if(this.changing_fva==1){
        var final_1 = JSON.parse(JSON.stringify(this.rowData));
        var g = 0;
        let f = 0;
        var t;
        var flag = 0;
        var th1 = 0;
        var rowNode = this.gridApi.getRowNode('Final Forecast');

        var rowNode_total = this.gridApi.getRowNode('FVA Total');



        var fva = this.gridApi.getRowNode('FVA1');
        var fva2 = this.gridApi.getRowNode('FVA2');
        var fva3 = this.gridApi.getRowNode('FVA3');

        this.changing_fva = 1;
        // var fva2 = this.gridApi.getRowNode('FVA2');
        // var fva3 = this.gridApi.getRowNode('FVA3');


        var rowNode1 = this.gridApi.getRowNode('ML');
        var g = parseInt(rowNode1.data[a]) + parseInt(fva.data[a]) + parseInt(fva2.data[a]) + parseInt(fva3.data[a]);
        rowNode.setDataValue(a + c, g);


        var g12 = parseInt(fva.data[a]) + parseInt(fva2.data[a]) + parseInt(fva3.data[a]);
        rowNode_total.setDataValue(a + c, g12);


        this.main_1 = 1;
        for (var y = 0; y < this.finalForecastDataPoints.length; y++) {
            if (this.finalForecastDataPoints[y].x == a) {
                this.finalForecastDataPoints[y].y = g;
            }
        }
        for (var y = 0; y < this.graphData.length; y++) {
            if (this.graphData[y].calenderYear == a) {
                this.graphData[y].fcstValueAdd = parseInt(fva.data[a])
                this.graphData[y].fcstValueAdd2 = parseInt(fva2.data[a])
                this.graphData[y].fcstValueAdd3 = parseInt(fva3.data[a])
                this.graphData[y].fcstValueAdd_total = parseInt(rowNode_total.data[a])
            }
        }
        //   this.changing_fva=0;
        //  }
        this.chart1.render();
        return;

    }
    public change12(a, b) {
        var final_1 = JSON.parse(JSON.stringify(this.rowData));
        var g = 0;
        let f = 0;
        var t;
        var flag = 0;
        var th1 = 0;
        var rowNode = this.gridApi.getRowNode('Final Forecast');
        var rowNode1 = this.gridApi.getRowNode('ML');
        var g = parseInt(rowNode1.data[a]) + parseInt(b);
        rowNode.setDataValue(a, g);
        this.main_1 = 1;
        return;
    }
    public onCellClicked(params) {
        if (params.node.id == "Comments") {
            var f = params.colDef.field;
            for (var y = 0; y < this.finalForecastDataPoints.length; y++) {
                if (this.finalForecastDataPoints[y].x == f) {
                    this.comments(y);
                    break;
                }
            }
        }
        else {
            this.commens_main_table = false;
        }
    }
    public onCellDoubleClicked(params) {
        if (params.node.id == "Comments") {
            document.getElementById("comments_main").scrollIntoView();
        } else if (params.node.id == "FVA" || params.node.id == "FVA2" || params.node.id == "FVA3") {
        }
        else {
            var f = params.colDef.field;
            this.weeknoC = f.substring(0, 4) + " - Week " + f.substring(4, 6);
            for (var y = 0; y < this.finalForecastDataPoints.length; y++) {
                if (this.finalForecastDataPoints[y].x == f) {
                    this.onDblClickInput(y, params.colDef.field);
                    break;
                }
            }
        }
    }
    public willusave;
    public onCellValueChanged(params) {
        this.willusave = true;
        this.showAreusure();
        if (/^\d+$/.test(params.newValue)) {
        }
        else {
            if (params.newValue.indexOf('-') > -1) {
            }
            else if (params.newValue.indexOf('%') > -1) {
            }
            else if (params.node.id == "Comments") {
            }
            else {
                var rowNode = this.gridApi.getRowNode('FVA1');
                rowNode.setDataValue(params.colDef.field, 0);
                window.alert("Please enter numerical value");
                return;
            }
        }
        var bnm = '';
        this.change_extra = '';
        var ban = params.column.userProvidedColDef.field;
        var added = params.column.colId.split('_')[1];
        var extra = '';
        if (params.column.userProvidedColDef.field == params.column.colId) {
            extra = '';
        }
        else {
            extra = '_' + added;
        }
        this.change_extra = extra;
        try {
            bnm = params.newValue.charAt(params.newValue.length - 1);
        } catch (err) {
        }
        if (this.change_comment == 1) {
            this.change_comment = 0;
        }
        else if (this.changing_fva == 1) {
            this.changing_fva = 0;
        }
        else if (this.thi > 0) {
            this.thi = this.thi - 1;
            this.main_1 = 0;
        }
        else if (this.final_one > 0) {
            this.final_one = this.final_one - 1;
            this.main_1_cal = 0;
            this.arr12 = [];
            this.main_1 = 0;
            this.lotCompleted = 0;
        }
        else if (this.lotCompleted == 1) {
        }
        else if (this.main_1_cal == 1) {
            var to = 0;
            for (const ag of this.arr12) {
                if (ag.week == ban) {
                    to = 1;
                    this.lotCompleted = 1;
                }
            }
            if (to == 1) {
            }
            else {
                this.arr12.push({
                    week: ban,
                    value: params.newValue
                });
                this.changed_weeks.push(parseInt(ban));
            }
        }
        else if (bnm == "%") {
            var f = params.colDef.field;
            this.thi = 2;
            var rowNode1 = this.gridApi.getRowNode('ML');
            var h = parseInt(rowNode1.data[params.colDef.field]);
            var mn = params.newValue.split('%')[0];
            var vl = (mn / 100) * h;
            var rowNode = this.gridApi.getRowNode('FVA1');
            this.main_1 = 1;
            rowNode.setDataValue(params.colDef.field + extra, vl.toFixed(0));
            this.changed_weeks.push(parseInt(ban));
            this.main_1_cal = ban;
            this.change1(ban, vl, extra);
        }
        else {
            var f = params.colDef.field;
            var rowNode1 = this.gridApi.getRowNode('ML');
            if (this.main_1 == 1) {
                this.main_1 = 0;
            }
            else {
                this.changed_weeks.push(parseInt(ban));
                this.main_1_cal = ban;
                this.change1(ban, params.newValue, extra);
            }
        }
    }
    public onCellValueChanged1(params) {
        this.willusave = true;
        this.showAreusure();
        var ban = params.column.userProvidedColDef.field;
        var th1 = params.data.sku;
        if (this.lotCompleted == 1) {
            this.main_1_cal_sku = 0;
            this.lotCompleted = 0;
        }
        else if (this.main_1_cal_sku == 1) {
            var to = 0;
            for (const ag of this.arr12_sku) {
                if (ag.week == ban && ag.sku == th1) {
                    to = 1;
                    this.lotCompleted = 1;
                }
            }
            if (to == 1) {
            }
            else {
                this.arr12_sku.push({
                    week: ban,
                    value: params.newValue,
                    sku: params.data.sku
                });
            }
        }
        else {
            if (this.main_1 == 1) {
                this.main_1 = 0;
                return;
            }
            var h = params.data.sku;
            this.change123(params.colDef.field, params.newValue, h)
            this.main_1 = 1;
        }
    }
    public change123(week, val, sku) {
        var rowNode1 = this.gridApi1.getRowNode('ML-' + sku);
        var h12 = rowNode1.data[week];
        var rowNode2 = this.gridApi1.getRowNode('Final Forecast-' + sku);
        var hj = parseInt(h12) + parseInt(val);
        rowNode2.setDataValue(week, hj);
        var com = [];
        com.push(sku);
        var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        for (const abc of fgssselected2) {
            fgssselected1.push(abc);
        }
        for (const abc of fgssselected3) {
            fgssselected1.push(abc);
        }
        this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));
        this.skuview_save.push({
            cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
            plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
            sku: com,
            type: this.type123,
            uom: this.UOM,
            user1: this.usertext,
            user: null,
            ml: h12,
            finalForecast: 0,
            fva: val,
            calendarWeek: week
        });
    }

    public commenting() {
        if (this.granular1 == 'month') {
        } else {
            this.lockModalCancel.nativeElement.click();
            this.finalForecastCommentModalBtn.nativeElement.click();
        }
    }
    public addvalues(cell: any) {
        if (this.up == 1) {
            var num1 = this.graphData[cell].ml;
            this.selected_array.push(num1);
        }
    }
    public addvalues_actuals(cell: any) {
        if (this.up == 1) {
            var num1 = this.graphData[cell].actuals;
            this.selected_array.push(num1);
        }
    }
    public addvalues_harshit(cell: any) {
        if (this.up == 1) {
            var num1 = this.graphData[cell].harshit;
            this.selected_array.push(num1);
        }
    }
    public addvalues_actualslastyear(cell: any) {
        if (this.up == 1) {
            var num1 = this.graphData[cell].actualslastyear;
            this.selected_array.push(num1);
        }
    }
    public addvalues_apo(cell: any) {
        if (this.up == 1) {
            var num1 = this.graphData[cell].apo;
            this.selected_array.push(num1);
        }
    }
    public addvalues_finaldforecast(cell: any) {
        if (this.up == 1) {
            var num1 = this.graphData[cell].ml;
            this.selected_array.push(num1);
        }
    }
    public fetch_values(num) {
        var num1 = this.graphData.ml[num];
        this.sumselected = this.sumselected + num1;
    }
    public filterSKUs_cpg(skuComment: string) {
        if (!this.searchcpg || !this.searchcpg.trim()) {
            return true;
        }
        const regex = new RegExp(this.searchcpg && this.searchcpg.trim(), 'ig');
        return regex.test(skuComment);
    }
    public filterSKUs_comm(skuComment: string) {
        if (!this.commentSearchText || !this.commentSearchText.trim()) {
            return true;
        }
        const regex = new RegExp(this.commentSearchText && this.commentSearchText.trim(), 'ig');
        return regex.test(skuComment);
    }
    public filterSKUs_plant(skuComment: string) {
        if (!this.searchplant || !this.searchplant.trim()) {
            return true;
        }
        const regex = new RegExp(this.searchplant && this.searchplant.trim(), 'ig');
        return regex.test(skuComment);
    }
    public onFilterCheckBoxChange() {
        this.prev_year = 0;
        if (this.reactivate_filter_button == 0) {
            return;
        }
        try {
            this.UOM = 'HL';
            this.planningtable = 'Planning Table (HL)';
            document.getElementById('planningtable').innerHTML = 'Planning Table (HL)';
            try {
                document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL)';
                this.forecastinganalysis = 'Forecast Analysis (HL)';
                this.featureanalysis = 'Feature Analysis (HL)';
            } catch (err) {
            }
            this.granular1 = 'week';
            this.secondgraph = 'Baseline';
        } catch (err) {
        }
        const data = Object.assign({ leadSkus: [] }, this.createPlanRequestData);
        this.cpgss = this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        this.plantss = this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name);
        var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name);
        var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name);
        var fgssss = this.skus.filter(item => true).map(item => item.name);
        var fgssss1 = this.second_sku.filter(item => true).map(item => item.name);
        var fgssss2 = this.sku_semi.filter(item => true).map(item => item.name);
        for (const abc of fgssselected2) {
            fgssselected1.push(abc);
        }
        for (const abc of fgssselected3) {
            fgssselected1.push(abc);
        }
        for (const abc of fgssss1) {
            fgssss.push(abc);
        }
        for (const abc of fgssss2) {
            fgssss.push(abc);
        }
        this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));
        if (this.selectallskus == 1) {
        } else {
            for (const abc of this.second_sku) {
                for (const abc1 of this.fgssselected) {
                    if (abc.name === abc1 || abc.name == abc1.toString()) {
                        const index: number = this.second_sku.indexOf(abc);
                        this.second_sku.splice(index, 1);
                    }
                }
            }
        }
        this.second_sku = [];
        var temp1 = JSON.parse(JSON.stringify(fgssss));
        var temp2 = JSON.parse(JSON.stringify(this.fgssselected));
        if (temp2.length == 2221) {
        }
        else {
        }
        fgssss = fgssss.filter(function (el) {
            return temp2.indexOf(el) < 0;
        });
        this.sku_semi = this.fgssselected.map(item => {
            return { name: item, isChecked: true, isFiltered: true };
        });
        this.fgssselected = JSON.parse(JSON.stringify(this.sku_semi));
        this.tickedskus = fgssss.map(item => {
            return { name: item, isChecked: false, isFiltered: true };
        });
        this.skus = JSON.parse(JSON.stringify(this.tickedskus));
        if (this.cpgss.length == 0 || this.plantss.length == 0 || this.fgssselected.length == 0) {
            window.alert('Please choose atleast one plant, Customer planning Group and Forecasting Group');
            return;
        }
        data.forecastingGroups = JSON.parse(JSON.stringify(this.fgssselected));
        for (const abc in this.fgssselected) {
            this.fgssselected[abc].name = this.fgssselected[abc].name.split('-')[0];
        }
        this.hh = JSON.parse(JSON.stringify(this.sku_semi));
        data.customerPlanningGroup = this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        data.plants = this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        data.startWeek = this.DBloadWeek;
        data.endWeek = this.createPlanRequestData.endWeek;
        this.plant_string = JSON.stringify(this.filters_plant[0].values.map(item => item.name));
        this.cpg_string = JSON.stringify(this.filters[0].values.map(item => item.name));
        if (this.fgssselected.length == 0 || this.plant_string.length == 0 || this.cpg_string.length == 0) {
            window.alert('Please select all CPG, Plant, Forecasting Group');
            return;
        }
        this.loading = true;
        this.first_ag = true;
        this.second_ag = false;
        this.third_ag = false;
        this.createPlan(data);
    }
    public onFilterCheckBoxChange2() {
        const reqBody = this.getFiltersObject1();
        this.skuService.getCPGlist(reqBody).subscribe((response: any) => {
            response = response.map(item => {
                return { name: item, isChecked: true, isFiltered: true };
            });
            for (const abc of this.filters) {
                if (abc.key == 'customerPlanningGroup') {
                    abc.values = JSON.parse(JSON.stringify(response));
                }
            }
        });
    }
    public getFiltersObject_color() {
        const brands = [];
        const Subbrand = [];
        const AlcoholPercentage = [];
        const AnimalFlag = [];
        const packtype = [];
        const packsize = [];
        const baseunit = [];
        const materialgroup = [];
        const salesoffice = [];
        const tradetype = [];
        const cpgname = [];
        const globalbev = [];
        const localcat = [];
        for (const brand of this.filters1) {
            if (brand.key == 'brands') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'subbrand') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'alcoholper') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'subbrand') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'Animal_Flags') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'packtype') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'baseunit') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'materialgroup') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'globalbev') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'localcat') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'packsize') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'brands_1') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            }
        }
        for (const brand of this.filters1_brands) {
            if (brand.key == 'brands') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            }
        }
        for (const brand of this.filters1_subbrand) {
            if (brand.key == 'subbrand') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            }
        }
        return {
            brands: brands,
            alcoholper: AlcoholPercentage,
            subbrand: Subbrand,
            packsize: packsize,
            materialGroup: materialgroup,
            animalFlag: AnimalFlag,
            packType: packtype,
            baseunit: baseunit,
            globalbev: globalbev,
            productcategory: localcat
        };
    }
    private getFiltersObject_subbrands() {
        const Subbrand = [];
        for (const brand of this.filters1_subbrand) {
            if (brand.key == 'subbrand') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        Subbrand.push(aa.name);
                    }
                }
            }
        }
        return Subbrand;
    }
    private getFiltersObject_leadsku() {
        const Subbrand = [];
        for (const brand of this.filters1_leadsku) {
            if (brand.key == 'leadsku') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        Subbrand.push(aa.name);
                    }
                }
            }
        }
        return Subbrand;
    }
    private getFiltersObject_brands() {
        const brands = [];
        const Subbrand = [];
        for (const brand of this.filters1_brands) {
            if (brand.key == 'brands') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        brands.push(aa.name);
                    }
                }
            }
        }
        return brands;
    }
    private getFiltersObject() {
        const brands = [];
        const Subbrand = [];
        const own3 = [];
        const AlcoholPercentage = [];
        const AnimalFlag = [];
        const packtype = [];
        const baseunit = [];
        const materialgroup = [];
        const salesoffice = [];
        const tradetype = [];
        const cpgname = [];
        const globalbev = [];
        const localcat = [];
        const material_second = [];
        const snp_planner = [];
        const packsize = [];
        const leadsku = [];
        for (const brand of this.filters1) {
            if (brand.key == 'brands') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        brands.push(aa.name);
                    }
                }
            } else if (brand.key == 'brands_1') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        own3.push(aa.name);
                    }
                }
            } else if (brand.key == 'subbrand') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        Subbrand.push(aa.name);
                    }
                }
            }
            else if (brand.key == 'leadsku') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        leadsku.push(aa.name);
                    }
                }
            }
            else if (brand.key == 'Animal_Flags') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        AnimalFlag.push(aa.name);
                    }
                }
            } else if (brand.key == 'packtype') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        packtype.push(aa.name);
                    }
                }
            } else if (brand.key == 'packsize') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        packsize.push(aa.name);
                    }
                }
            } else if (brand.key == 'baseunit') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        baseunit.push(aa.name);
                    }
                }
            } else if (brand.key == 'materialgroup') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        materialgroup.push(aa.name);
                    }
                }
            } else if (brand.key == 'globalbev') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        globalbev.push(aa.name);
                    }
                }
            } else if (brand.key == 'localcat') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        localcat.push(aa.name);
                    }
                }
            } else if (brand.key == 'material_second') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        material_second.push(aa.name);
                    }
                }
            } else if (brand.key == 'snp_planner') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        snp_planner.push(aa.name);
                    }
                }
            }
        }
        for (const brand of this.filters1_brands) {
            if (brand.key == 'brands') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        brands.push(aa.name);
                    }
                }
            }
        }
        for (const brand of this.filters1_brands_1) {
            if (brand.key == 'brands_1') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        brands.push(aa.name);
                    }
                }
            }
        }
        for (const brand of this.filters1_subbrand) {
            if (brand.key == 'subbrand') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        Subbrand.push(aa.name);
                    }
                }
            }
        }
        for (const brand of this.filters1_leadsku) {
            if (brand.key == 'leadsku') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        leadsku.push(aa.name);
                    }
                }
            }
        }
        return {
            brands: brands,
            alcoholper: AlcoholPercentage,
            subbrand: Subbrand,
            materialGroup: materialgroup,
            animalFlag: AnimalFlag,
            packType: packtype,
            leadSku: leadsku,
            packsize: packsize,
            baseunit: baseunit,
            globalbev: globalbev,
            productcategory: localcat,
            own3pp: own3,
            material_second: material_second,
            snp_planner: snp_planner
        };
    }
    private getFiltersObject1_sku() {
        const Sales = [];
        const Trade = [];
        for (const brand of this.filters2) {
            if (brand.key == 'tradetype') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            } else if (brand.key == 'salesoffice') {
                var flag = 1;
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        flag = 0;
                    }
                }
                if (flag == 1) {
                } else {
                }
            }
        }
        return {
            salesOffice: Sales,
            tradeType: Trade
        };
    }
    private getFiltersObject1() {
        const Sales = [];
        const Trade = [];
        for (const brand of this.filters2) {
            if (brand.key == 'tradetype') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        Trade.push(aa.name);
                    }
                }
            } else if (brand.key == 'salesoffice') {
                for (const aa of brand.values) {
                    if (aa.isChecked) {
                        Sales.push(aa.name);
                    }
                }
            }
        }
        return {
            salesOffice: Sales,
            tradeType: Trade
        };
    }
    public onFilterCheckBoxChange121() {
        this.cpgss = [];
        this.getFiltersObject1_sku();
        const reqBody1 = this.getFiltersObject1();
        this.loading = true;
        this.skuService.getCPGlist2(reqBody1).subscribe((response1: any) => {
            this.loading = false;
            let response2 = response1.map(item => {
                return { name: item, isChecked: false, isFiltered: true };
            });
            let response3 = response1.map(item => {
                return { name: item, isChecked: false, isFiltered: true };
            });
            let g = response1.map(item => item.name);
            for (const abc of this.filters) {
                if (abc.key == 'customerPlanningGroup') {
                    abc.values = JSON.parse(JSON.stringify(response2));
                }
            }
        });
    }
    public onFilterCheckBoxChange121_sku() {
        this.getFiltersObject_color();
        this.fgssselected = [];
        this.sku_semi = [];
        const reqBody = this.getFiltersObject();
        this.loading = true;
        this.skuService.getSkUList1(reqBody).subscribe((response: any) => {
            this.skus = response;
            this.loading = false;
            this.fgssselected = [];
        });
    }
    public onFilterCheckBoxChange1() {
        const reqBody = this.getFiltersObject();
        const reqBody1 = this.getFiltersObject1();
        this.skuService.getSkUList1(reqBody).subscribe((response: any) => {
            this.skus = response;
            this.skuService.getCPGlist2(reqBody1).subscribe((response1: any) => {
                response1 = response1.map(item => {
                    return { name: item, isChecked: true, isFiltered: true };
                });
                for (const abc of this.filters) {
                    if (abc.key == 'customerPlanningGroup') {
                        abc.values = JSON.parse(JSON.stringify(response1));
                    }
                }
                this.createPlanRequestData.forecastingGroups = response;
                this.createPlanRequestData.customerPlanningGroup = response1.map(item => item.name);
                this.createPlan(this.createPlanRequestData);
            });
        });
    }
    public clearAllSKUs() {

        if (this.selectallskus == 0) {
            //console.log('ffddghd--' + this.selectallskus);
            this.selectallskus = 1;
            let requestData = false;

            for (const sku of this.skus) {
                sku.isChecked = true;
            }

            for (const sku of this.second_sku) {
                sku.isChecked = true;

            }

            for (const sku of this.sku_semi) {
                sku.isChecked = true;

            }



        } else if (this.selectallskus == 1) {
            this.selectallskus = 0;
            let requestData = false;

            for (const sku of this.skus) {
                sku.isChecked = false;
            }

            for (const sku of this.second_sku) {
                sku.isChecked = false;

            }
            for (const sku of this.sku_semi) {
                sku.isChecked = false;

            }
        }
        this.reactivate_filter(1);
    }
    public isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    public isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
    public how(s) {
        var pointExists = false;
        if (s == null) {
            return true;
        }
        for (const i in s) {
            var ch = s.charAt(i);
            if (ch >= '0' && ch <= '9' || ch == '%') {
                continue;
            }
            if (ch == '.') {
                if (pointExists) {
                    return false;
                } else {
                    pointExists = true;
                }
            } else {
                return false;
            }
        }
        return true;
    }
    // Final Forecast
    public onValueInput(calenderYearWeek: string, index: number) {




        const dpIndex = this.finalForecastDataPoints.findIndex(item => item.calenderYear === calenderYearWeek);
        if (dpIndex > -1) {
            var value = parseFloat(this.graphData[index].fcstValueAdd);
            var decimal = /^[-+]?[0-9]+\.[0-9]+$/;
            var s = this.graphData[index].fcstValueAdd;
            var r = this.how(s);
            if (s.substr(s.length - 1, s.length) == '%') {
                var jk = this.graphData[index].fcstValueAdd.substr(0, this.graphData[index].fcstValueAdd.length - 1);
                var ml1 = this.graphData[index].ml;
                var h = (jk / 100) * ml1;
                h = parseFloat(h.toFixed(0));
                this.graphData[index].fcstValueAdd = h;
                value = h;
            }
            if (r == false) {
                this.graphData[index].fcstValueAdd = 0;
                window.alert('You have added a wrong number or empty string, it will be treated as 0');
                return;
            }
            if (!isNaN(value)) {
                if (this.graphData[index].initialFinalForecast + value < 0) {
                    this.finalForecastDataPoints[dpIndex].y = 0;
                    this.graphData[index].finalForecast = 0;
                    this.finalForecastDataPoints[dpIndex].y = 0;
                    this.graphData[index].finalForecast = 0;
                } else {
                    this.finalForecastDataPoints[dpIndex].y = this.graphData[index].initialFinalForecast + value;
                    this.graphData[index].finalForecast = parseFloat((this.graphData[index].initialFinalForecast + value).toFixed(0));
                    this.finalForecastDataPoints[index].y = this.graphData[index].initialFinalForecast + value;
                    this.graphData[index].finalForecast = parseFloat((this.graphData[index].initialFinalForecast + value).toFixed(0));
                }
            } else {
                this.finalForecastDataPoints[index].y = this.graphData[index].initialFinalForecast;
                this.graphData[index].finalForecast = this.graphData[index].initialFinalForecast;
                this.finalForecastDataPoints[index].y = this.graphData[index].initialFinalForecast;
                this.graphData[index].finalForecast = this.graphData[index].initialFinalForecast;
            }
            this.totalData.finalCastTotal = 0;
            for (const data of this.graphData) {
                if (data.finalForecast) {
                    this.totalData.finalCastTotal += parseFloat(data.finalForecast);
                }
            }
            this.totalData.finalCastTotal = 0;
            for (const data of this.graphData) {
                if (data.finalForecast) {
                    this.totalData.finalCastTotal += parseFloat(data.finalForecast);
                }
            }
            this.forecastadd = 0;
            for (const data of this.graphData) {
                if (data.fcstValueAdd) {
                    this.forecastadd += parseFloat(data.fcstValueAdd);
                }
            }


            this.forecastadd2 = 0;
            for (const data of this.graphData) {
                if (data.fcstValueAdd2) {
                    this.forecastadd2 += parseFloat(data.fcstValueAdd2);
                }
            }


            this.forecastadd3 = 0;
            for (const data of this.graphData) {
                if (data.fcstValueAdd3) {
                    this.forecastadd3 += parseFloat(data.fcstValueAdd3);
                }
            }


            this.forecastadd_total = 0;
            for (const data of this.graphData) {
                if (data.fcstValueAdd_total) {
                    this.forecastadd_total += parseFloat(data.fcstValueAdd_total);
                }
            }
            this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(0));
            this.totalData.finalCastTotal = parseFloat(this.totalData.finalCastTotal.toFixed(0));
        }
        this.chart1.render();
    }
    public onValueBlur(week: string, index: number) {
        const dpIndex = this.graphData.findIndex(item => item.calenderYearWeek === week);
        if (dpIndex > -1) {
            let finalValue = -1;
            const value = parseFloat(this.graphData[index].fcstValueAdd);
            if (!isNaN(value)) {
                finalValue = this.graphData[index].initialFinalForecast + value < 0 ? 0 : this.graphData[index].initialFinalForecast + value;
            } else {
                finalValue = this.graphData[index].initialFinalForecast;
                return;
            }
            const reqBody = {
                cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                sku: this.fgssselected.map(item => item.name),
                user: 'admin',
                finalForecast: finalValue,
                fva: value,
                calendarWeek: week
            };
        }
    }
    public locking() {
        //
    }
    public gridApiAC;
    public gridColumnApiAC;
    public gridApiWC;
    public gridColumnApiWC;
    firstDataRenderedAllComments(params) {
        this.gridApiAC = params.api; // To access the grids API
        this.gridColumnApiAC = params.columnApi;
        try {
            this.gridApiAC.sizeColumnsToFit();
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
                agcells2[i].style.marginRight = '30vw';
            }
        } catch (e) { console.log(e); }
        //here
        var threebars = Array.from(document.getElementsByClassName('ag-pinned-left-header') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < threebars.length; i++) {
            threebars[i].style.borderRight = '0';
        }
        var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < headercells.length; i++) {
            headercells[i].style.paddingLeft = '0px';
            headercells[i].style.paddingRight = '0px';
            headercells[i].style.backgroundColor = 'white';
        }
        var agcells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells.length; i++) {
            agcells[i].style.paddingLeft = '0px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.color = '#8BA0B9';
            agcells2[i].style.color = '#8BA0B9';
            agcells2[i].style.lineHeight = '24px';
            agcells2[i].style.fontSize = '12px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-cell-last-left-pinned') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.paddingLeft = '16px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.border = '0';
        }
    }
    firstDataRenderedWeeklyComments(params) {
        this.gridApiWC = params.api; // To access the grids API
        this.gridColumnApiWC = params.columnApi;
        try {
            this.gridApiWC.sizeColumnsToFit();
        } catch (error) {
        }
        var headercells = Array.from(document.getElementsByClassName('ag-header-viewport') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < headercells.length; i++) {
            headercells[i].style.background = '#fff';
        }
        try {
            var agrows = Array.from(document.getElementsByClassName('ag-rows') as HTMLCollectionOf<HTMLElement>);
            for (var i = 0; i < agrows.length; i++) {
                agrows[i].style.height = '46px';
            }
        } catch (e) { console.log(e); }
        var headerRows = Array.from(document.getElementsByClassName('ag-header-row') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < headerRows.length; i++) {
            headerRows[i].style.background = '#F8F9FA';
            headerRows[i].style.height = '32px';
            headerRows[i].style.minHeight = '32px';
        }
        var header = Array.from(document.getElementsByClassName('ag-header') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < header.length; i++) {
            header[i].style.height = '32px';
            header[i].style.minHeight = '32px';
        }
        try {
            var agcells2 = Array.from(document.getElementsByClassName('ag-paging-button') as HTMLCollectionOf<HTMLElement>);
            for (var i = 0; i < agcells2.length; i++) {
                agcells2[i].style.display = 'none';
            }
        } catch (e) { console.log(e); }
        try {
            var agcells2 = Array.from(document.getElementsByClassName('ag-paging-page-summary-panel') as HTMLCollectionOf<HTMLElement>);
            for (var i = 0; i < agcells2.length; i++) {
                agcells2[i].style.marginRight = '30vw';
            }
        } catch (e) { console.log(e); }
        //here
        var threebars = Array.from(document.getElementsByClassName('ag-pinned-left-header') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < threebars.length; i++) {
            threebars[i].style.borderRight = '0';
        }
        var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < headercells.length; i++) {
            headercells[i].style.paddingLeft = '0px';
            headercells[i].style.paddingRight = '0px';
            headercells[i].style.backgroundColor = 'white';
        }
        var agcells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells.length; i++) {
            agcells[i].style.paddingLeft = '0px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.color = '#8BA0B9';
            agcells2[i].style.color = '#8BA0B9';
            agcells2[i].style.lineHeight = '24px';
            agcells2[i].style.fontSize = '12px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-cell-last-left-pinned') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.paddingLeft = '16px';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.border = '0';
        }
        var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
        for (var i = 0; i < agcells2.length; i++) {
            agcells2[i].style.color = '#8BA0B9';
            agcells2[i].style.paddingTop = '4px';
            agcells2[i].style.paddingBottom = '4px';
            agcells2[i].style.fontSize = '12px';
            agcells2[i].style.lineHeight = '24px';
        }
    }
    public onFilterTextBoxChanged() {
        try {
            this.gridApiWC.setQuickFilter(this.commentSearchText);
        } catch (e) { }
        try {
            this.gridApiAC.setQuickFilter(this.commentSearchText);
        } catch (e) { }
    }
    public onDblClickInput(selectedWeekIndex: number, week) {
        if (this.granular1 == 'month') {
        } else {
            this.selecteddblclick = selectedWeekIndex;
            this.selectedWeekIndex = selectedWeekIndex;
            this.commented_week = week;
            this.finalForecastCommentModalBtn.nativeElement.click();
        }
    }
    public Dbledit(params) {
        this.selectedWeekIndex = params.rowIndex;
        this.editCommentModalBtn.nativeElement.click();
        this.edit_comment = this.finn[params.rowIndex].comment;
    }
    public comments(i) {
        this.dropdown_table = 'week';
        this.finn = [];
        this.selectedWeekComments = this.graphData[i].userComment;
        let thyh = this.graphData[i].newweek;
        for (var p = 0; p < this.selectedWeekComments.length; p++) {
            this.comm1 = this.selectedWeekComments[p].split('|');
            if (this.comm1[1] == undefined || this.comm1 == null) {
                this.comm1[1] = 'All SKU';
            }
            var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name);
            var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name);
            var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name);
            var fgssss = this.skus;
            var fgssss1 = this.second_sku;
            var fgssss2 = this.sku_semi;
            var tgh = [];
            for (const abc of fgssss) {
                tgh.push(abc);
            }
            for (const abc of fgssss1) {
                tgh.push(abc);
            }
            for (const abc of fgssss2) {
                tgh.push(abc);
            }
            for (const pl of this.plantss) {
                for (const cpg of this.cpgss) {
                    for (const ab of tgh) {
                        if (ab.isChecked) {
                            this.finn.push({
                                week: thyh,
                                sku: ab.name,
                                plant: pl,
                                cpg: cpg,
                                user: this.usertext,
                                comment: this.comm1[0]
                            });
                        }
                    }
                }
            }
        }
        if (this.graphData[i].comments[0].split('|')[1] != null) {
            for (const fg of this.graphData[i].comments) {
                this.finn.push({
                    week: thyh,
                    sku: fg.split('|')[1],
                    plant: fg.split('|')[2],
                    cpg: fg.split('|')[3],
                    comment: fg.split('|')[0],
                    user: this.usertext,
                });
            }
        }
        for (var g of this.allComments_harshit) {
            g.week = g.name.split('|')[1];
            g.comment = g.name.split('|')[0];
            g.sku = g.name.split('|')[2];
            g.plant = g.name.split('|')[4];
            g.cpg = g.name.split('|')[3];
            g.user = this.usertext;
        }
        this.weeklycomment1();
    }
    public onFinalForecastCommentSubmit(data: any) {
        if (this.selectedWeekIndex) {
            var rowNode = this.gridApi.getRowNode('Comments');
            rowNode.setDataValue(this.commented_week, data.comment);
            this.change_comment = 1;
            if (this.graphData[this.selectedWeekIndex].comments.length >= 1) {
                this.graphData[this.selectedWeekIndex].comments[0] = data.comment;
                this.graphData[this.selectedWeekIndex].userComment[0] = data.comment;
                var rowNode = this.gridApi.getRowNode('Comments');
                rowNode.setDataValue("this.DBloadWeek", data.comment);
                while (this.graphData[this.selectedWeekIndex].comments.length > 1) {
                    this.graphData[this.selectedWeekIndex].comments.pop();
                }
            } else {
                this.graphData[this.selectedWeekIndex].comments.push(data.comment);
                this.graphData[this.selectedWeekIndex].userComment.push(data.comment);
            }
        }
        this.finalForecastCommentModalCancel.nativeElement.click();
    }
    public locking_final() {
        if (this.selectedWeekIndex) {
            this.graphData[this.selecteddblclick].lockcell = '12';
        }
        this.lockModalCancel.nativeElement.click();
    }
    public editCommentSubmit(data: any, pk_com: any) {
        this.finn[pk_com].comment = data.comment;
        const finaldata = {
            key: pk_com,
            data: data.comment
        };
        this.skuService.editComment(finaldata).subscribe((res: any) => {
            this.editCommentModalBtnCancel.nativeElement.click();
        }, (error) => {
            this.editCommentModalBtnCancel.nativeElement.click();
        });
    }
    public deletecomment(selectedWeekIndex: number) {
        this.selectedWeekIndex = selectedWeekIndex;
        this.finn.splice(selectedWeekIndex);
    }
    public putValueInFinal(val) {
        this.finalForecastArray.length = 0;
        this.finalForecastDataPoints.length = 0;
        let value_to_insert = '';
        let value_calnder = '';
        for (let i = 0; i < this.graphData.length; i++) {
            this.graphData[i].finalForecast = null;
            if (val === 'ML') {
                this.graphData[i].finalForecast = this.graphData[i].ml;
                this.finalForecastDataPoints.push({
                    x: this.graphData[i].calenderYear,
                    y: this.graphData[i].ml,
                    color: this.finalForecastPointColor
                });
                if (this.graphData[i].ml !== undefined) {
                    value_to_insert = this.graphData[i].ml;
                    value_calnder = this.graphData[i].calenderYear;
                }
            }
            if (val === 'APO') {
                this.graphData[i].finalForecast = this.graphData[i].apo;
                this.finalForecastDataPoints.push({
                    x: this.graphData[i].calenderYear,
                    y: this.graphData[i].apo,
                    color: this.finalForecastPointColor
                });
                if (this.graphData[i].ml !== undefined) {
                    value_to_insert = this.graphData[i].apo;
                    value_calnder = this.graphData[i].calenderYear;
                }
            }
            if (value_to_insert !== '' && value_calnder !== '') {
                this.finalForecastArray.push({ finalForecast: value_to_insert, calenderYear: value_calnder });
            }
        }
        this.chart1.render();
    }
    public savePlan() {
        if (this.role == 'View' || this.role === 'View') {
            window.alert('You are not allowed to save plan');
            return;
        }
        if (this.reactivate_filter_button == 1) {
            return;
        }
        if (this.role == 'View' || this.role === 'View') {
            window.alert('You are not allowed to save plan');
            return;
        }




        this.savePlanLoader = true;
        const reqBody = {
            data: []
        };
        var com = [];
        var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
        for (const abc of fgssselected2) {
            fgssselected1.push(abc);
        }
        for (const abc of fgssselected3) {
            fgssselected1.push(abc);
        }
        this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));
        for (const data of this.graphData) {
            if (data.comments.length > 0) {
                com.push({
                    calendarWeek: data.calenderYearWeek,
                    sku: JSON.parse(JSON.stringify(this.fgssselected)),
                    user: this.usertext,
                    user1: this.usertext,
                    cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    comments1: data.comments[0].split('|')[0]
                });
            }
        }
        for (const data of this.graphData) {
            const commentsObj = {};
            for (const index in data.userComment) {
                commentsObj[`comments${parseInt(index, 10) + 1}`] = data.userComment[index];
            }
            var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
            var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
            var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
            for (const abc of fgssselected2) {
                fgssselected1.push(abc);
            }
            for (const abc of fgssselected3) {
                fgssselected1.push(abc);
            }
            this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));
            if (JSON.stringify(commentsObj) !== '{}') {
                const obj = {
                    calendarWeek: data.calenderYearWeek,
                    sku: JSON.parse(JSON.stringify(this.fgssselected)),
                    user: this.usertext,
                    uom: this.UOM,
                    user1: this.usertext,
                    cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                };
                reqBody.data.push(Object.assign(obj, commentsObj));
            }
        }
        var abc: any = [];
        for (const data of this.graphData) {
            if (typeof data.fcstValueAdd_total !== 'undefined' && (this.changed_weeks.indexOf(data.week) > -1)) {

                const reqBody = {
                    cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    sku: JSON.parse(JSON.stringify(this.fgssselected)),
                    type: this.granular1,
                    uom: this.UOM,
                    user1: this.usertext,
                    user: data.comments[0],
                    ml: data.ml,
                    finalForecast: data.finalForecast,
                    fva: data.fcstValueAdd,
                    fva2: data.fcstValueAdd2,
                    fva3: data.fcstValueAdd3,
                    fva_total: data.fcstValueAdd_total,
                    calendarWeek: data.week
                };

                //console.log("Checking logs -->",reqBody);

                abc.push(reqBody);
            }
        }
        if (reqBody.data.length == 0) {
            const obj = {
                calendarWeek: this.DBloadWeek,
                sku: JSON.parse(JSON.stringify(this.fgssselected)),
                user: 'admin',
                uom: this.UOM,
                cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
            };
            reqBody.data.push(Object.assign(obj, null));
        }
        var login1 = {
            Username: 'admin',
            activity: 'Save Plan',
            datetimestamp: JSON.stringify(this.update)
        };
        this.skuService.sendLog(login1).subscribe((res: any) => {
        });
        this.fgssselected = this.fgssselected.map(item => {
            return { name: item, isChecked: true, isFiltered: true };
        });
        if (this.views == "Sku View") {
            this.skuService.savePlan(this.skuview_save).subscribe((res: any) => {
                this.savePlanLoader = false;
                this.PlanNameModalBtn.nativeElement.click();
                this.savePlanLoader = false;
                this.PlanNameModalBtn.nativeElement.click();
            });
        }
        else {
            this.skuService.savePlan(abc).subscribe((res: any) => {
                this.skuService.confirmPlan(com).subscribe((res: any) => {
                    this.savePlanLoader = false;
                    this.PlanNameModalBtn.nativeElement.click();
                }, (error) => {
                    this.savePlanLoader = false;
                    this.PlanNameModalBtn.nativeElement.click();
                });
            });
        }
    }
    public savePlan_null() {
        this.savePlanLoader = true;
        const reqBody = {
            data: []
        };
        for (const data of this.graphData) {
            const commentsObj = {};
            for (const index in data.userComment) {
                commentsObj[`comments${parseInt(index, 10) + 1}`] = data.userComment[index];
            }
            var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
            var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
            var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
            for (const abc of fgssselected2) {
                fgssselected1.push(abc);
            }
            for (const abc of fgssselected3) {
                fgssselected1.push(abc);
            }
            this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));
            var abc: any = [];
            for (const g of this.graphData) {
                if (data.fcstValueAdd) {
                    const reqBody = {
                        cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                        sku: this.fgssselected.map(item => item.name),
                        user: 'admin',
                        finalForecast: data.finalForecast,
                        fva: data.fcstValueAdd,
                        calendarWeek: data.week
                    };
                    abc.push(reqBody);
                }
            }
            if (JSON.stringify(commentsObj) !== '{}') {
                const obj = {
                    calendarWeek: data.calenderYearWeek,
                    sku: JSON.parse(JSON.stringify(this.fgssselected)),
                    user: 'admin',
                    cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                    plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                };
            }
        }
        if (reqBody.data.length == 0) {
            const obj = {
                calendarWeek: this.DBloadWeek,
                sku: JSON.parse(JSON.stringify(this.fgssselected)),
                user: 'admin',
                cpg: this.filters[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
                plant: this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]),
            };
            reqBody.data.push(Object.assign(obj, null));
        }
        const login = {
            Username: 'admin',
            activity: 'Saved Plan',
            datetimestamp: JSON.stringify(this.update)
        };
        this.skuService.sendLog(login).subscribe((res: any) => {
        });
        this.skuService.confirmPlan(reqBody.data).subscribe((res: any) => {
            this.savePlanLoader = false;
            this.PlanNameModalBtn.nativeElement.click();
        }, (error) => {
            this.savePlanLoader = false;
            this.PlanNameModalBtn.nativeElement.click();
        });
    }

    public saveFilter(filterName: string) {
        this.sameName = false;
        const login = {
            Username: 'admin',
            activity: 'Saved Filter',
            datetimestamp: JSON.stringify(this.update)
        };
        this.skuService.sendLog(login).subscribe((res: any) => {
        });
        var fgssselected1 = this.skus.filter(item => item.isChecked).map(item => item.name);
        var fgssselected2 = this.second_sku.filter(item => item.isChecked).map(item => item.name);
        var fgssselected3 = this.sku_semi.filter(item => item.isChecked).map(item => item.name);
        for (const abc of fgssselected2) {
            fgssselected1.push(abc);
        }
        for (const abc of fgssselected3) {
            fgssselected1.push(abc);
        }
        this.fgssselected = JSON.parse(JSON.stringify(fgssselected1));
        var todaysdate = this.formatDate(new Date);
        var data12 = {
            id: null,
            user: 'admin',
            filterName,
            plant: this.createFilterString(this.filters_plant[0].values.filter(item => item.isChecked).map(item => item.name)),
            cpg: this.createFilterString(this.filters[0].values.filter(item => item.isChecked).map(item => item.name)),
            sku: this.createFilterString1(this.skus.filter(item => item.isChecked).map(item => item.name)) + ',' + this.createFilterString1(this.second_sku.filter(item => item.isChecked).map(item => item.name)) + ',' + this.createFilterString1(this.sku_semi.filter(item => item.isChecked).map(item => item.name)),
            dateCreated: todaysdate
        };
        if (this.skus.filter(item => item.isChecked).map(item => item.name.length == 0)) {
            data12.sku = data12.sku.substr(1);
        }
        if (this.second_sku.filter(item => item.isChecked).map(item => item.name.length == 0)) {
            data12.sku = data12.sku.substr(1);
        }
        for (const ab of this.loadedFilters) {
            if (ab.name === filterName) {
                window.alert('Please choose a different name');
                return;
            }
        }
        this.filterService.saveFilter(data12).subscribe((res: any) => {
            this.saveFilterModalCancel.nativeElement.click();
            this.filterService.getFilters({
                user: 'admin'
            }).subscribe((res: any) => {
                this.loadedFilters = res.map((item) => {
                    item.isSelected = false;
                    return item;
                });
            });
        }, (error) => {
            this.saveFilterModalCancel.nativeElement.click();
            this.filterService.getFilters({
                user: 'admin'
            }).subscribe((res: any) => {
                this.loadedFilters = res.map((item) => {
                    item.isSelected = false;
                    return item;
                });
            });
        });
    }
    public createFilterString(filters: string[]): string {
        let resultString = '';
        for (const filter of filters) {
            resultString = `${resultString},${filter}`;
        }
        return resultString.slice(1);
    }
    public createFilterString1(filters: string[]): string {
        let resultString = '';
        for (const filter of filters) {
            resultString = `${resultString};${filter}`;
        }
        return resultString.slice(1);
    }
    public delfilter(i) {
        var t = confirm("Are you sure you want to delete this filter?");
        if (t == false) {
            return;
        }
        this.skuService.deletefilter(this.loadedFilters[i].name).subscribe((res: any) => {
            this.filterService.getFilters({
                user: 'admin'
            }).subscribe((res: any) => {
                this.loadedFilters = res.map((item) => {
                    item.isSelected = false;
                    return item;
                });
            });
        }, (error) => {
            this.filterService.getFilters({
                user: 'admin'
            }).subscribe((res: any) => {
                this.loadedFilters = res.map((item) => {
                    item.isSelected = false;
                    return item;
                });
            });
        });
    }
    public loadFilters() {
        this.filterService.getFilters({
            user: 'admin'
        }).subscribe((res: any) => {
            this.loadedFilters = res.map((item) => {
                item.isSelected = false;
                return item;
            });
        });
    }

    public filterItemClick(filterIndex: number) {
        this.avar = filterIndex;

        for (const filter of this.loadedFilters) {
            filter.isSelected = false;
        }
        this.loadedFilters[filterIndex].isSelected = !this.loadedFilters[filterIndex].isSelected;
    }
    public default() {
        let selectedFilter;
        for (const filter of this.loadedFilters) {
            if (filter.isSelected) {
                selectedFilter = filter;
                break;
            }
        }
        var name;
        for (const filter of this.loadedFilters) {
            if (filter.default_Val != null) {
                name = filter.name;
            }
        }
        for (const filter of this.loadedFilters) {
            if (filter.default_Val != null) {
                filter.default_Val = null;
            }
        }
        var final_default = selectedFilter.name;
        selectedFilter.default_Val = 'Default';
        var final_def = {
            val: final_default
        };
        if (name == null) {
            this.skuService.setdefault(final_def).subscribe((res: any) => {
            });
        } else {
            var a = {
                val: name
            };
            this.skuService.defaultnull(a).subscribe((res: any) => {
                this.skuService.setdefault(final_def).subscribe((res: any) => {
                });
            }, (error) => {
                this.skuService.setdefault(final_def).subscribe((res: any) => {
                });
            });
        }
    }
    public loadSelectedFilter() {
        const login = {
            Username: 'admin',
            activity: 'Filter Loaded',
            datetimestamp: JSON.stringify(this.update)
        };
        this.skuService.sendLog(login).subscribe((res: any) => {
        });
        this.second_sku = [];
        let selectedFilter;
        for (const filter of this.loadedFilters) {
            if (filter.isSelected) {
                selectedFilter = filter;
                break;
            }
        }
        this.planningtable = 'Planning Table (HL)';
        document.getElementById('planningtable').innerHTML = 'Planning Table (HL)';
        try {
            document.getElementById('forecastinganalysis').innerHTML = 'Forecast Analysis (HL)';
            this.forecastinganalysis = 'Forecast Analysis (HL)';
            this.featureanalysis = 'Feature Analysis (HL)';
        } catch (err) {
        }
        this.skus = selectedFilter.sku.map(item => {
            return {
                name: item,
                isChecked: true,
                isFiltered: true
            };
        });
        this.fgssselected = selectedFilter.sku.map(item => {
            return {
                name: item,
                isChecked: true,
                isFiltered: true
            };
        });
        this.second_sku = [];
        this.sku_semi = [];
        this.UOM = 'HL';
        this.skuService.getPlants().subscribe((response: any) => {
            this.plants = response;
            this.filters_plant = [];
            const plant = this.plants;
            this.filters_plant.push({
                name: 'Plants',
                key: 'plant',
                isExpanded: false,
                values: response
            });
            for (const b of this.filters_plant[0].values) {
                for (const c of temp_plant) {
                    if (b.name == c) {
                        b.isChecked = true;
                    }
                }
            }
            //this.createdata.plants;
        });
        selectedFilter.isSelected = false;
        const data = Object.assign({ leadSkus: [] }, this.createPlanRequestData);
        this.cpgss = JSON.parse(JSON.stringify(selectedFilter.cpg));
        this.plantss = selectedFilter.plant;
        var fgfh = JSON.parse(JSON.stringify(this.plantss));
        this.granular1 = 'week';
        var temp_cpg = selectedFilter.cpg;
        var temp_plant = selectedFilter.plant;
        var temp_fg = selectedFilter.sku;
        var cpg: any = [];
        var plant: any = [];
        var a: any = [];
        var index = 0;
        for (const abc of temp_cpg) {
            cpg.push({
                id: index,
                name: abc,
                isFiltered: true,
                isChecked: true
            });
            index++;
        }
        for (const abc of temp_plant) {
            plant.push({
                id: index,
                name: abc,
                isFiltered: true,
                isChecked: true
            });
            index++;
        }
        for (const abc of temp_fg) {
            a.push({
                id: index,
                name: abc,
                isFiltered: true,
                isChecked: true
            });
            index++;
        }
        this.skuService.getCustomerPlanningGroup().subscribe((response: any) => {
            const a = response;
            this.filters = [];
            this.filters.push({
                name: 'CPG',
                key: 'customerPlanningGroup',
                isExpanded: false,
                values: a
            });
            for (const b of this.filters[0].values) {
                for (const c of temp_cpg) {
                    if (b.name == c) {
                        b.isChecked = true;
                    }
                }
            }
        });
        this.createdata.forecastingGroups = JSON.parse(JSON.stringify(a));
        this.createdata.plants = JSON.parse(JSON.stringify(temp_plant));
        this.createdata.customerPlanningGroup = JSON.parse(JSON.stringify(temp_cpg));
        this.cpgss = JSON.parse(JSON.stringify(this.createdata.customerPlanningGroup));
        this.plantss = JSON.parse(JSON.stringify(this.createdata.plants));
        this.skus = JSON.parse(JSON.stringify(this.createdata.forecastingGroups));
        data.plants = JSON.parse(JSON.stringify(temp_plant));
        data.customerPlanningGroup = JSON.parse(JSON.stringify(temp_cpg));
        data.startWeek = this.DBloadWeek;
        data.endWeek = 202004;
        this.loading = true;
        for (const a in data.customerPlanningGroup) {
            data.customerPlanningGroup[a] = data.customerPlanningGroup[a].split('-')[0];
        }
        for (const a in data.plants) {
            data.plants[a] = data.plants[a].split('-')[0];
        }
        for (const a in this.fgssselected) {
            this.fgssselected[a].name = this.fgssselected[a].name.split('-')[0];
        }
        data.prevactuals = this.createPlanRequestData.prevactuals;
        data.endWeek = this.createPlanRequestData.endWeek;
        this.loadFilterModalCancel.nativeElement.click();
        this.createPlan(data);
    }
    public cancel_save_mod() {
        this.saveFilterModalCancel.nativeElement.click();
    }
    public sortComments(keyIndex: number) {
        this.allComments_harshit = this.allComments_harshit.sort((commentA, commentB) => {
            const value1 = commentA.name.split('|')[keyIndex];
            const value2 = commentB.name.split('|')[keyIndex];
            if (value1 === value2) {
                return 0;
            }
            return value1 > value2 ? 1 : -1;
        });
    }
}
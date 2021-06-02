import { Component, ElementRef, OnDestroy, OnInit, ViewChild, HostListener } from '@angular/core';
import { SKUService } from '../../services/sku.service';
import * as CanvasJS from './../../../assets/js/canvasjs.min';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  constructor(
    private skuService: SKUService  ) {
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
  @ViewChild('addsku', { static: false }) addsku: ElementRef;
  @ViewChild('gantchart_open', { static: false }) gantchart_open: ElementRef;
  @ViewChild('saveFilterModal', { static: false }) saveFilterModal: ElementRef;
  @ViewChild('AddNew', { static: false }) AddNew: ElementRef;
  @ViewChild('AddNew_Skufilter', { static: false }) AddNew_Skufilter: ElementRef;
  @ViewChild('AddNew_1', { static: false }) AddNew_1: ElementRef;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @ViewChild('UpdateNew', { static: false }) UpdateNew: ElementRef;
  @ViewChild('myModal4_1', { static: false }) myModal4_1: ElementRef;
  @ViewChild('myModal4_pipodetails', { static: false }) myModal4_pipodetails: ElementRef;
  @ViewChild('saveFilterModal12', { static: false }) saveFilterModal12: ElementRef;
  @ViewChild('myModal_gant', { static: false }) myModal_gant: ElementRef;
  @ViewChild('mapsku', { static: false }) mapsku: ElementRef;
  @ViewChild('saveFilterModalCancel', { static: false }) saveFilterModalCancel: ElementRef;
  public events: any = [];
  public date;
  public zzzcvcID;
  public zzzstate;
  public zzzdateModified;
  public md_1 = [];
  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];
  public loading = false;
  public from_date;
  public to_date;
  public dispPIPOdetails = false;
  public second_week;
  public dates_1;
  public searchfilter;
  public skus_search = [];
  public columnDef_skudetail;
  public rowData_detail;
  public color1 = '#FEA947';
  public color2 = "#0A88B9";
  public dates_1_prev = [];
  public dates_1_next = [];
  public width_final;
  public chart1;
  public gridApi;
  public gridColumnApi;
  public dates1 = [{
    fromid: "0",
    toid: 0,
    week: 0,
    one: 0,
    two: 0
  }];
  public searchTextFG = '';
  public fromsku_transistion_apply;
  public tosku_transistion_apply;
  public logic_transistion_apply;
  public allfilter_brand = 0;
  public allfilter_subbrand = 0;
  public allfilter_own3pp = 0;
  public allfilter_materialgrp = 0;
  public allfilter_localcat = 0;
  public allfilter_globalcat = 0;
  public allfilter_primaryunit = 0;
  public allfilter_packtype = 0;
  public allfilter_packsize = 0;
  public material_1;
  public lead_sku;
  public slider_state = 0;
  public startweek_transistion_apply;
  public forecasting_fgid;
  public val_selected = 0;
  public showCVCstateFeedback = false;
  public showPIPOruleCreateFeedback = false;
  public showPIPOruleEditFeedback = false;
  public showPIPOruleDeleteFeedback = false;





  public one_cal = [];

  public two_cal = [];

  public three_cal = [];
  public four_cal = [];

  public five_cal = [];
  public six_cal = [];

  public seven_cal = [];




  columnDefs: any = [];
  columnDefs3: any = [];
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];
  public material_len = 0;
  public fg_len = 0;
  public maxweek;
  public newsku = false;
  public od = 1;
  public dropJSON = [];
  public second_type = false;
  public first_type = true;
  public shape3_1 = false;
  public shape1_1 = false;
  public shape2_1 = false;
  public shape4_1 = false;
  public shape5_1 = false;
  public type_value = 0;
  public date_table = false;
  public edit_fromsku = '';
  public edit_tosku = '';
  public edit_from_sku = '';
  public edit_to_sku = '';
  public abc12 = 'fshjg';
  public pipo: any = [];
  public pipo1: any = [];
  public materialidnumber = '1990';
  public materialidqwe;
  public skunamenew;
  public texthide = false;
  public pipoMapping: any = [];
  public drop2 = ["Select Phase In SKU"];
  public option = 'sku';
  public filter_clicked = "";
  public drop = [];
  public pressed;
  public searchFGdropdown = false;
  public searchCPGdropdown = false;
  public searchPlantdropdown = false;
  public dates = [];
  public edit_type_2 = '';
  public edit_type = '';
  public phase = false;
  public phase_second = false;
  public phase_third = false;
  public newsku12 = false;
  public pipo_map = false;
  public sku_map = true;
  public cvc_map = false;
  public fromsku = 'select';
  public tosku = 'Select Phase In SKU';
  public mappedFG;
  public mappedFG_1;
  public logic = 'select';
  public startweek;
  public selectedPlants = [];
  public materialid;
  public skuname;
  public fgid;
  public fgname;
  public DBloadWeek;
  public mappingdrop;
  public columnDefsCVC;
  public mappingdrop_1;
  public cvcData: any = [];
  public cvcDataAll: any = [];
  public fgname_column;
  public material_column;
  public fgid_column;
  public min_column;
  public max_column;
  public switch;
  rowData6: any;
  columnDefs35 = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];
  rowData3 = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];
  public selectdrop_brand;
  public selectdrop2;
  public table = false;
  public selectdrop_subbrand;
  public selectdrop_own3pp;
  public selectdrop_matgrp;
  public selectdrop_global;
  public selectdrop_local;
  public selectdrop_primary;
  public selectdrop_packsize;
  public selectdrop_packtype;
  public selectdrop_segment;
  public fgs_search;
  public cpgs_search;
  public plants_search;
  public rowStateChange() {


  }
  @HostListener('document:click', [])
  clickout() {
    this.searchFGdropdown = false;
    this.searchCPGdropdown = false;
    this.searchPlantdropdown = false;
    this.onSearchFGDropdownClosed();
    this.onSearchCPGDropdownClosed();
    this.onSearchPlantDropdownClosed();
  }
  //table
  ngOnInit() {
    this.selectdrop2 = [
      {
        name: 'DROP2',
        key: 'drop2',
        isExpanded: false,
        values: [
          "Select Phase In SKU"
        ]
      }
    ]
    this.selectdrop_brand = [
      {
        name: 'Brand',
        key: 'brandsku',
        isExpanded: false,
        values: [
          { isChecked: false, name: "1664" }, { isChecked: false, name: "Alhambra" }, { isChecked: false, name: "Ama" }, { isChecked: false, name: "Apple Frost" }, { isChecked: false, name: "Astra" }, { isChecked: false, name: "Barley Bros" }, { isChecked: false, name: "Birell" }, { isChecked: false, name: "Birrificio Angelo Poretti" }, { isChecked: false, name: "Brooklyn" }, { isChecked: false, name: "Budweiser" }, { isChecked: false, name: "Cardinal" }, { isChecked: false, name: "Carlsberg" }, { isChecked: false, name: "Coca-Cola" }, { isChecked: false, name: "Colomba" }, { isChecked: false, name: "Corsican" }, { isChecked: false, name: "Crisp" }, { isChecked: false, name: "DEMORY" }, { isChecked: false, name: "Ducasse" }, { isChecked: false, name: "EGUZKI" }, { isChecked: false, name: "EVE" }, { isChecked: false, name: "Fada" }, { isChecked: false, name: "Falcon" }, { isChecked: false, name: "FANTOME" }, { isChecked: false, name: "Feldschlösschen" }, { isChecked: false, name: "FINNBARRA" }, { isChecked: false, name: "Force 4" }, { isChecked: false, name: "Grimbergen" }, { isChecked: false, name: "Guinness" }, { isChecked: false, name: "Holsten" }, { isChecked: false, name: "Hop House" }, { isChecked: false, name: "Kanterbräu" }, { isChecked: false, name: "Kilkenny" }, { isChecked: false, name: "Koenigsbier" }, { isChecked: false, name: "Kronenbourg" }, { isChecked: false, name: "LA BETE" }, { isChecked: false, name: "La Bete des Vosges" }, { isChecked: false, name: "Lübzer" }, { isChecked: false, name: "Meuse" }, { isChecked: false, name: "Moussy" }, { isChecked: false, name: "Moussy - closed use 10100010050" }, { isChecked: false, name: "Mythos" }, { isChecked: false, name: "NYA Carnegie" }, { isChecked: false, name: "Okocim" }, { isChecked: false, name: "Piast" }, { isChecked: false, name: "Pietra Brewery" }, { isChecked: false, name: "Poretti" }, { isChecked: false, name: "Pripps Blå" }, { isChecked: false, name: "Red Stripe" }, { isChecked: false, name: "San Miguel" }, { isChecked: false, name: "Sans Alcool" }, { isChecked: false, name: "Skol" }, { isChecked: false, name: "Smithwick's" }, { isChecked: false, name: "Somersby" }, { isChecked: false, name: "Special" }, { isChecked: false, name: "St Austell" }, { isChecked: false, name: "ST AUSTELL  CLOUDY JOB" }, { isChecked: false, name: "Tigre Bock" }, { isChecked: false, name: "Tourtel" }, { isChecked: false, name: "Tuborg" }, { isChecked: false, name: "Valaisanne" }, { isChecked: false, name: "Wel Scotch" }, { isChecked: false, name: "Welscotch" }, { isChecked: false, name: "Wilfort" }
        ]
      }
    ]
    this.selectdrop_subbrand = [
      {
        name: 'Sub Brand',
        key: 'subbrandsku',
        isExpanded: false,
        values: [
          { isChecked: false, name: "1664 Bio Non Filtrée" }, { isChecked: false, name: "1664 Blanc" }, { isChecked: false, name: "1664 Blanc Fruits Rouges" }, { isChecked: false, name: "1664 Blanc Sans Alcool" }, { isChecked: false, name: "1664 Blanc/Rose" }, { isChecked: false, name: "1664 Brassin Special" }, { isChecked: false, name: "1664 Création Gold Lager" }, { isChecked: false, name: "1664 Création houblon Hoppy" }, { isChecked: false, name: "1664 Création IPA" }, { isChecked: false, name: "1664 Edition Limitée" }, { isChecked: false, name: "1664 Fruits Rouges" }, { isChecked: false, name: "1664 Gold" }, { isChecked: false, name: "1664 Micro Filtered" }, { isChecked: false, name: "1664 Millesime" }, { isChecked: false, name: "1664 Mure Myrtille" }, { isChecked: false, name: "1664 Passion Citron Vert" }, { isChecked: false, name: "1664 Rose" }, { isChecked: false, name: "1664 Sans Alcool" }, { isChecked: false, name: "Alcohol-free beer" }, { isChecked: false, name: "Alcohol-free beer Wheat" }, { isChecked: false, name: "ALE" }, { isChecked: false, name: "Alhambra Especial" }, { isChecked: false, name: "Ama Bionda" }, { isChecked: false, name: "Ama Pilsner" }, { isChecked: false, name: "Apple Frost" }, { isChecked: false, name: "Astra Urtyp" }, { isChecked: false, name: "Barley Bros Elderflower and Lime" }, { isChecked: false, name: "Barley Bros Nordic Berries and Rosemary" }, { isChecked: false, name: "Barley Bros White Peach and Green Tea" }, { isChecked: false, name: "Bière des 50 ans" }, { isChecked: false, name: "Birell" }, { isChecked: false, name: "Birell Belgian Wit alcohol free" }, { isChecked: false, name: "Birell Lager alcohol free" }, { isChecked: false, name: "Birrificio Angelo Poretti Birra Poretti" }, { isChecked: false, name: "Birrificio Angelo Poretti no 4" }, { isChecked: false, name: "BOTANICS" }, { isChecked: false, name: "Brooklyn American Ale" }, { isChecked: false, name: "Brooklyn Bel Air Sour" }, { isChecked: false, name: "Brooklyn Black OPS" }, { isChecked: false, name: "Brooklyn Brown Ale" }, { isChecked: false, name: "BROOKLYN DEFENDER" }, { isChecked: false, name: "Brooklyn Defender IPA" }, { isChecked: false, name: "Brooklyn East India Pale Ale" }, { isChecked: false, name: "BROOKLYN EAST IPA" }, { isChecked: false, name: "Brooklyn Lager" }, { isChecked: false, name: "Brooklyn Naranjito" }, { isChecked: false, name: "Brooklyn Post Road Pumpkin Ale" }, { isChecked: false, name: "BROOKLYN PUMPKIN" }, { isChecked: false, name: "Brooklyn Scorcher Ale" }, { isChecked: false, name: "Brooklyn Sorachi Ace" }, { isChecked: false, name: "Brooklyn Special Effect Hoppy Lager" }, { isChecked: false, name: "Brooklyn Special Effect IPA" }, { isChecked: false, name: "Brooklyn Stone Wall Inn IPA" }, { isChecked: false, name: "Brooklyn Stonewall Inn IPA" }, { isChecked: false, name: "Budweiser" }, { isChecked: false, name: "Cardinal Blonde" }, { isChecked: false, name: "Carlsberg" }, { isChecked: false, name: "Carlsberg 0.0" }, { isChecked: false, name: "Carlsberg 1883" }, { isChecked: false, name: "Carlsberg Alcohol Free" }, { isChecked: false, name: "Carlsberg Alcohol Free Organic" }, { isChecked: false, name: "Carlsberg Elephant" }, { isChecked: false, name: "Carlsberg Export" }, { isChecked: false, name: "Carlsberg Lager" }, { isChecked: false, name: "Carlsberg Pilsner" }, { isChecked: false, name: "Carlsberg Unfiltered" }, { isChecked: false, name: "Coca-Cola life" }, { isChecked: false, name: "Coca-Cola Light" }, { isChecked: false, name: "Coca-Cola Zero Sugar" }, { isChecked: false, name: "Colomba" }, { isChecked: false, name: "Corsican IPA" }, { isChecked: false, name: "Crisp Radler Sitrus" }, { isChecked: false, name: "Crisp Radler Vadelma" }, { isChecked: false, name: "Ducasse" }, { isChecked: false, name: "Ducasse Triple" }, { isChecked: false, name: "EGUZKI AMBREE" }, { isChecked: false, name: "EGUZKI BLANCHE" }, { isChecked: false, name: "EGUZKI BLANCHE-ROSE" }, { isChecked: false, name: "EGUZKI IPA" }, { isChecked: false, name: "EGUZKI PREMIUM" }, { isChecked: false, name: "EGUZKI ROSEE" }, { isChecked: false, name: "EVE Litchi" }, { isChecked: false, name: "EVE Passion Fruit" }, { isChecked: false, name: "Fada Blanche" }, { isChecked: false, name: "Fada Blonde" }, { isChecked: false, name: "FADA SUNNY IPA" }, { isChecked: false, name: "Fada Triple" }, { isChecked: false, name: "Falcon Export" }, { isChecked: false, name: "FANTOME AUTRES LAGERS" }, { isChecked: false, name: "FANTOME BOUTEILLES" }, { isChecked: false, name: "FANTOME CRAFTS" }, { isChecked: false, name: "FANTOME LAGERS" }, { isChecked: false, name: "FANTOME LAGERS PREMIUM" }, { isChecked: false, name: "FANTOME REGIONALES" }, { isChecked: false, name: "FANTOME SPECIALITES" }, { isChecked: false, name: "Feldschlösschen Alkoholfrei Lager" }, { isChecked: false, name: "Feldschlösschen Alkoholfrei Weizenfrisch" }, { isChecked: false, name: "Feldschlösschen Original" }, { isChecked: false, name: "FINNBARRA" }, { isChecked: false, name: "Finnbarra Cider" }, { isChecked: false, name: "Force 4" }, { isChecked: false, name: "Force 4 Mojito" }, { isChecked: false, name: "Force 4 Yuzu" }, { isChecked: false, name: "Grimbergen" }, { isChecked: false, name: "Grimbergen 0.0%" }, { isChecked: false, name: "Grimbergen Automne" }, { isChecked: false, name: "Grimbergen Belgian Pale Ale" }, { isChecked: false, name: "Grimbergen Blanche" }, { isChecked: false, name: "Grimbergen Blonde" }, { isChecked: false, name: "Grimbergen Brassin de Noel" }, { isChecked: false, name: "Grimbergen Brassin de Printemps" }, { isChecked: false, name: "Grimbergen Brassin des Beaux Jours" }, { isChecked: false, name: "Grimbergen Double" }, { isChecked: false, name: "Grimbergen Double-Ambrèe" }, { isChecked: false, name: "Grimbergen Elixir" }, { isChecked: false, name: "Grimbergen Fruits Des Bois" }, { isChecked: false, name: "Grimbergen Heritage" }, { isChecked: false, name: "Grimbergen Kriek" }, { isChecked: false, name: "Grimbergen La Reserve" }, { isChecked: false, name: "Grimbergen Multiflavours" }, { isChecked: false, name: "Grimbergen Pale Ale" }, { isChecked: false, name: "Grimbergen Pêche" }, { isChecked: false, name: "Grimbergen Poire" }, { isChecked: false, name: "Grimbergen Rouge" }, { isChecked: false, name: "Grimbergen Triple" }, { isChecked: false, name: "Grimbergen Triple d’Abbaye" }, { isChecked: false, name: "Guinness" }, { isChecked: false, name: "Guinness 0.0" }, { isChecked: false, name: "Guinness Draught" }, { isChecked: false, name: "Guinness Dublin Porter" }, { isChecked: false, name: "Guinness HOP HOUSE" }, { isChecked: false, name: "Guinness OGB Citra IPA" }, { isChecked: false, name: "Guinness Surger" }, { isChecked: false, name: "Guinness West Indies Porter" }, { isChecked: false, name: "Holsten" }, { isChecked: false, name: "Holsten Apple" }, { isChecked: false, name: "Holsten Black Grape" }, { isChecked: false, name: "Holsten Classic" }, { isChecked: false, name: "Holsten Cranberry" }, { isChecked: false, name: "Holsten DragonFruit" }, { isChecked: false, name: "Holsten Lemon" }, { isChecked: false, name: "Holsten Non Alcoholic" }, { isChecked: false, name: "Holsten Pilsener" }, { isChecked: false, name: "Holsten Pomegranate" }, { isChecked: false, name: "Holsten Strawberry" }, { isChecked: false, name: "Hop House 13" }, { isChecked: false, name: "IPA" }, { isChecked: false, name: "K by Kronenbourg Citron/Citron Vert" }, { isChecked: false, name: "K by Kronenbourg Fruit Rouge" }, { isChecked: false, name: "K by Kronenbourg Mango" }, { isChecked: false, name: "Kanterbräu" }, { isChecked: false, name: "Kanterbräu Silver" }, { isChecked: false, name: "Kanterbräu Village" }, { isChecked: false, name: "Kilkenny" }, { isChecked: false, name: "Koenigsbier" }, { isChecked: false, name: "Kronenbourg" }, { isChecked: false, name: "Kronenbourg 1664" }, { isChecked: false, name: "kronenbourg 1947" }, { isChecked: false, name: "Kronenbourg 2°6" }, { isChecked: false, name: "Kronenbourg 7°2 Ambrée" }, { isChecked: false, name: "Kronenbourg 7°2 aro Whisky" }, { isChecked: false, name: "Kronenbourg 7°2 Blanche" }, { isChecked: false, name: "Kronenbourg 7°2 Blonde" }, { isChecked: false, name: "Kronenbourg 7°2 Rousse" }, { isChecked: false, name: "Kronenbourg Alsace" }, { isChecked: false, name: "Kronenbourg Bière de Noël" }, { isChecked: false, name: "Kronenbourg Brassin solidaire" }, { isChecked: false, name: "Kronenbourg Fleuron d’Alsace" }, { isChecked: false, name: "Kronenbourg Force 4-please use1000757" }, { isChecked: false, name: "Kronenbourg Jus Agrumes" }, { isChecked: false, name: "Kronenbourg Pur Malt" }, { isChecked: false, name: "Kronenbourg Pur Malt Pression" }, { isChecked: false, name: "Kronenbourg Sélection Brasseurs Pillier" }, { isChecked: false, name: "Kronenbourg Tigre Bock Blonde" }, { isChecked: false, name: "Kronenbourg Tigre Bock Brune" }, { isChecked: false, name: "LA BETE" }, { isChecked: false, name: "LA BETE BLANCHE" }, { isChecked: false, name: "La Bete de Noel" }, { isChecked: false, name: "LA BETE DES VOSGES" }, { isChecked: false, name: "La Bete des Vosges de Noel" }, { isChecked: false, name: "Liquid Sunshine" }, { isChecked: false, name: "Lübzer Pilsener" }, { isChecked: false, name: "Meuse" }, { isChecked: false, name: "Moussy Apple" }, { isChecked: false, name: "Moussy Classic" }, { isChecked: false, name: "Moussy Grenadine" }, { isChecked: false, name: "Moussy Ice Berry" }, { isChecked: false, name: "Moussy Lemon" }, { isChecked: false, name: "Moussy Lemon Mint" }, { isChecked: false, name: "Moussy Peach" }, { isChecked: false, name: "Moussy Pomegranate" }, { isChecked: false, name: "Moussy Raspberry" }, { isChecked: false, name: "Moussy Strawberry" }, { isChecked: false, name: "Mythos" }, { isChecked: false, name: "NAB DILUE TBF" }, { isChecked: false, name: "Nitro IPA" }, { isChecked: false, name: "NYA Carnegie Free" }, { isChecked: false, name: "NYA Carnegie Jack" }, { isChecked: false, name: "Okocim" }, { isChecked: false, name: "Piast Wrocławski" }, { isChecked: false, name: "Pietra Brewery Colomba" }, { isChecked: false, name: "Pietra Brewery Colomba Rosee" }, { isChecked: false, name: "Pietra Brewery Corsican IPA" }, { isChecked: false, name: "Pietra Brewery Pietra" }, { isChecked: false, name: "Pietra Brewery Pietra Bionda" }, { isChecked: false, name: "Pietra Brewery Pietra Blde Bio" }, { isChecked: false, name: "Pietra Brewery Pietra Brassin d’hiver" }, { isChecked: false, name: "Pietra Brewery Pietra Noel" }, { isChecked: false, name: "Pietra Brewery Pietra Rossa" }, { isChecked: false, name: "Pietra Brewery Serena" }, { isChecked: false, name: "Poretti Originale" }, { isChecked: false, name: "Pripps Blå" }, { isChecked: false, name: "Proper Job" }, { isChecked: false, name: "Red Stripe" }, { isChecked: false, name: "San Miguel" }, { isChecked: false, name: "San Miguel Fresca" }, { isChecked: false, name: "Skol Lager" }, { isChecked: false, name: "Smithwick's" }, { isChecked: false, name: "Somersby Sparkling Selection Rosé" }, { isChecked: false, name: "ST AUSTELL BIG JOB" }, { isChecked: false, name: "ST AUSTELL CLOUDY JOB MILKSHAKE IPA KEG" }, { isChecked: false, name: "St Austell FIFTY IPA" }, { isChecked: false, name: "St Austell HSD" }, { isChecked: false, name: "ST AUSTELL PROPER JOB" }, { isChecked: false, name: "Tigre Bock Ambree" }, { isChecked: false, name: "Tigre Bock Blonde" }, { isChecked: false, name: "Tigre Bock Brune" }, { isChecked: false, name: "Tigre Bock IPA" }, { isChecked: false, name: "Tourtel" }, { isChecked: false, name: "Tourtel Botanics Citron vert" }, { isChecked: false, name: "Tourtel Botanics Cranberry" }, { isChecked: false, name: "Tourtel Botanics Framboise" }, { isChecked: false, name: "Tourtel Botanics Pêche Blanche" }, { isChecked: false, name: "Tourtel Citron" }, { isChecked: false, name: "Tourtel Twist Agrume" }, { isChecked: false, name: "Tourtel Twist Ananas Citron Vert" }, { isChecked: false, name: "Tourtel Twist Bio Duo agrumes" }, { isChecked: false, name: "Tourtel Twist Bio Duo de citrons" }, { isChecked: false, name: "Tourtel Twist Blood Orange" }, { isChecked: false, name: "Tourtel Twist Cerise" }, { isChecked: false, name: "Tourtel Twist Citron" }, { isChecked: false, name: "Tourtel Twist Fraise Rhubarbe" }, { isChecked: false, name: "Tourtel Twist Framboise" }, { isChecked: false, name: "Tourtel Twist Lime" }, { isChecked: false, name: "Tourtel Twist Mangue" }, { isChecked: false, name: "Tourtel Twist Mure Myrtille" }, { isChecked: false, name: "Tourtel Twist Orange" }, { isChecked: false, name: "Tourtel Twist Peche" }, { isChecked: false, name: "Triple" }, { isChecked: false, name: "Tuborg" }, { isChecked: false, name: "Tuborg Classic" }, { isChecked: false, name: "Tuborg Green" }, { isChecked: false, name: "Tuborg Grøn" }, { isChecked: false, name: "Tuborg Nul Citrus" }, { isChecked: false, name: "Tuborg Nul Mango Passion" }, { isChecked: false, name: "Tuborg Skoll" }, { isChecked: false, name: "Tuborg Skoll Caipiroska" }, { isChecked: false, name: "Tuborg Skoll Cosmo" }, { isChecked: false, name: "Tuborg Skoll Ice Apple" }, { isChecked: false, name: "Tuborg Skoll Ice Berry" }, { isChecked: false, name: "Tuborg Skoll Moscow Mule" }, { isChecked: false, name: "Tuborg Twist" }, { isChecked: false, name: "Valaisanne Amrich Weizen" }, { isChecked: false, name: "Valaisanne Pale Ale" }, { isChecked: false, name: "Wel Scotch" }, { isChecked: false, name: "Welscotch" }, { isChecked: false, name: "Wilfort" }
        ]
      }
    ]
    this.selectdrop_own3pp = [
      {
        name: 'Own 3pp',
        key: 'own3pp',
        isExpanded: false,
        values: [
          { isChecked: false, name: "3rd party Brand" },
          { isChecked: false, name: "Carlsberg Brand" }
        ]
      }
    ]
    this.selectdrop_matgrp = [
      {
        name: 'Material Group',
        key: 'materialgroup',
        isExpanded: false,
        values: [
          { isChecked: false, name: "Distribution License" },
          { isChecked: false, name: "Own Produced" },
          { isChecked: false, name: "Production License" },
          { isChecked: false, name: "Purchased products" }
        ]
      }
    ]
    this.selectdrop_global = [
      {
        name: 'Global Category',
        key: 'globalcat',
        isExpanded: false,
        values: [
          { isChecked: false, name: "AFB" },
          { isChecked: false, name: "CORE BEER" },
          { isChecked: false, name: "CRAFT & SPECIALITY" },
          { isChecked: false, name: "NON-BEVERAGES" },
          { isChecked: false, name: "SOFT DRINK" }
        ]
      }
    ]
    this.selectdrop_local = [
      {
        name: 'Local Category',
        key: 'localcat',
        isExpanded: false,
        values: [
          { isChecked: false, name: "F01" }, { isChecked: false, name: "F02" }, { isChecked: false, name: "F03" }, { isChecked: false, name: "F04" }, { isChecked: false, name: "F05" }, { isChecked: false, name: "F06" }, { isChecked: false, name: "F07" }, { isChecked: false, name: "F08" }, { isChecked: false, name: "F09" }, { isChecked: false, name: "F10" }, { isChecked: false, name: "F11" }, { isChecked: false, name: "F12" }, { isChecked: false, name: "F13" }, { isChecked: false, name: "F14" }
        ]
      }
    ]
    this.selectdrop_primary = [
      {
        name: 'Primary Unit ',
        key: 'primaryunit',
        isExpanded: false,
        values: [
          { isChecked: false, name: "1664" },
          { isChecked: false, name: "Carlsberg" },
          { isChecked: false, name: "wow" }
        ]
      }
    ]
    this.selectdrop_packsize = [
      {
        name: 'Pack Size',
        key: 'packsize',
        isExpanded: false,
        values: [
          { isChecked: false, name:"150ML"},{ isChecked: false, name:"250ML"},{ isChecked: false, name:"270ML"},{ isChecked: false, name:"275ML"},{ isChecked: false, name:"330ML"},{ isChecked: false, name:"440ML"},{ isChecked: false, name:"500ML"},{ isChecked: false, name:"520ML"},{ isChecked: false, name:"660ML"},{ isChecked: false, name:"750ML"},{ isChecked: false, name:"1L"},{ isChecked: false, name:"3L"},{ isChecked: false, name:"5L"},{ isChecked: false, name:"10L"},{ isChecked: false, name:"20L"},{ isChecked: false, name:"25L"},{ isChecked: false, name:"30L"},{ isChecked: false, name:"200L"}
        ]
      }
    ]
    this.selectdrop_packtype = [
      {
        name: 'Pack Type',
        key: 'packtype',
        isExpanded: false,
        values: [
          { isChecked: false, name: "ALU BTL_ ONE WAY" }, { isChecked: false, name: "CAN_ ONE WAY" }, { isChecked: false, name: "CAN_ ONE WAY_ SNAP PACK" }, { isChecked: false, name: "DM-FLEX_ ONE WAY" }, { isChecked: false, name: "DM-MODULAR_ ONE WAY" }, { isChecked: false, name: "DM-SELECT_ ONE WAY" }, { isChecked: false, name: "GLASS BTL_ ONE WAY" }, { isChecked: false, name: "GLASS BTL_ RETURNABLE" }, { isChecked: false, name: "KEG_ ONE WAY" }, { isChecked: false, name: "KEG_ RETURNABLE" }, { isChecked: false, name: "OTHERS_ ONE WAY" }, { isChecked: false, name: "TANK_ ONE WAY" }, { isChecked: false, name: "TANK_ RETURNABLE" }
        ]
      }
    ]
    this.selectdrop_segment = [
      {
        name: 'Segment',
        key: 'segment',
        isExpanded: false,
        values: [
          "1664",
          "Carlsberg",
          "wow"
        ]
      }
    ]
    //document.body.style.zoom = "75%";
    this.switch = false;
    this.width_final = window.innerWidth;
    this.skuService.getForecastingGroup().subscribe((res: any) => {
      this.fgs_search = res;
      for (var abc of this.fgs_search) {
        abc.isChecked = true;
      }
      this.skus_search = res;
      this.skus_search.push({
        isChecked: true,
        isFiltered: true,
        name: 'Testing'
      });
    });
    this.skuService.getCustomerPlanningGroup().subscribe((response: any) => {
      this.cpgs_search = response.map(item => {
        return { name: item.name, isChecked: true, isFiltered: true };
      });
    });
    this.skuService.getPlants().subscribe((response: any) => {
      this.plants_search = response.map(item => {
        return { name: item.name, isChecked: true, isFiltered: true };
      });
    });
    this.skuService.getanimal().subscribe((response: any) => {
      this.mappingdrop_1 = response;
      var str = this.mappingdrop_1.toString();
      this.md_1 = str.split(",");
      this.md_1 = Object.values(this.md_1);
      this.columnDefs = [
        { headerName: 'FGID', field: 'fgid', sortable: true, filter: true, sort: "desc", width: this.width_final / 9.9, cellStyle: { 'font-weight': 'bold', 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },
        { headerName: 'Forecasting group Name', field: 'forecastinggroup', sortable: true, filter: true, width: this.width_final / 3.8, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } }, //300
        { headerName: 'Material', field: 'material', sortable: true, filter: true, width: this.width_final / 9.9, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //shud be 100
        { headerName: 'Material Name', field: 'sku', sortable: true, filter: true, width: this.width_final / 4.9, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } }, //370
        {
          headerName: 'Primary', field: 'prime', sortable: true, filter: true, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' }, width: this.width_final / 9,
          cellRenderer: function (params) {
            if (params.value == "PRIMARY") {
              return '<svg width="52" height="24" viewBox="0 0 52 24" fill="white"><g><rect width="52" height="24" rx="12" fill="#1ACDCC"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" style="font-size:10px;line-height:16px;">Primary</text><g></svg>';
            }
            else {
              return "";
            }
          }
        },
        {
          headerName: 'Segment', field: 'animal_FLAG2', sortable: true, filter: true, editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            values: this.md_1,
          },
          cellStyle: { 'line-height': '18px', 'border-top': '1px solid black', 'border-left': '1px solid black', 'border-right': '1px solid black', 'padding': '16px' }
        },
        { headerName: 'First Seen', field: 'minimum', sortable: true, filter: true, width: this.width_final / 8.4, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },
        { headerName: 'Last Seen', field: 'maximum', sortable: true, filter: true, width: this.width_final / 8.4, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },
        /*
        {
          headerName: ' ', field: 'btn', width: 100,  //shud be 100
          cellRenderer: function (params) {
            return '<p>Edit Segment</p>'
          }
        }, 
        */
        {
          headerName: ' ', field: 'btn2', width: this.width_final / 22.5, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' },
          cellRenderer: function () {
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<rect width="24" height="24" fill="white" fill-opacity="0.01"/>' +
              '<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 10.09C12.5523 10.09 13 10.5377 13 11.09V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11.09C11 10.5377 11.4477 10.09 12 10.09ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7Z" fill="#212833"/>' +
              '</svg>';
          }
        },
      ];
    });
    this.columnDefs3 = [
      { headerName: 'FGID', field: 'fgid', sortable: true, filter: true, sort: "desc", width: this.width_final / 8, cellStyle: { 'height': '56px', 'font-weight': 'bold', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } }, //260
      { headerName: 'From ID', field: 'fromid', sortable: true, filter: true, width: this.width_final / 3.53, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } }, //260
      { headerName: 'To ID', field: 'toid', sortable: true, filter: true, width: this.width_final / 3.53, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } }, //260
      {
        headerName: 'State', field: 'state', sortable: true, filter: true, width: this.width_final / 8, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' }, //260
        cellRenderer: function (params) {
          if (params.value == "Linear Transistion") {
            return '<span><img src="assets/images/1.png" height="26px"></span>';
          }
          else if (params.value == "Log Transistion") {
            return '<span><img src="assets/images/2.png" height="26px"></span>';
          }
          else if (params.value == "Step Transistion") {
            return '<span><img src="assets/images/4.png" height="26px"></span>';
          }
          else if (params.value == "Custom Transistion") {
            return '<span><img src="assets/images/5.png" height="26px"></span>';
          }
          else if (params.value == "Linear Delisting") {
            return '<span><img src="assets/images/6.png" height="26px"></span>';
          }
          else if (params.value == "Log Delisting") {
            return '<span><img src="assets/images/7.png" height="26px"></span>';
          }
          else if (params.value == "Step Delisting") {
            return '<span><img src="assets/images/9.png" height="26px"></span>';
          }
          else if (params.value == "Custom Delisting") {
            return '<span><img src="assets/images/5.png" height="26px"></span>';
          }
          else {
            return "";
          }
        }
      },  //260
      { headerName: 'From Week', field: 'fromweek', sortable: true, filter: true, width: this.width_final / 10, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } }, //260  //260
      { headerName: 'Status', field: 'status', sortable: true, filter: true, width: this.width_final / 8, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } }, //260 //150
      { headerName: 'Date', field: 'date', sortable: true, filter: true, width: this.width_final / 9, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px' } }, //260 //110
      {
        headerName: 'Edit', field: 'notes', width: this.width_final / 21.7, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px', 'cursor': 'pointer' }, //260
        cellRenderer: function (params) {
          if (params.value == "delisting") {
            return '';
          }
          else if (params.value == "transistion") {
            return '<i style="cursor:pointer;" class="fa fa-pencil" ></i>';
          }
        }
      },
      {
        headerName: 'Delete', field: 'deleteit', width: this.width_final / 21.7, cellStyle: { 'height': '56px', 'font-size': '14px', 'line-height': '24px', 'padding-top': '16px', 'padding-bottom': '16px', 'padding-left': '16px', 'cursor': 'pointer' }, //260
        cellRenderer: function (params) {
          if (params.value == "yes") {
            return '';
          }
          else if (params.value == "no") {
            return '<i style="cursor:pointer;" class="fa fa-trash" ></i>';
          }
        }
      }
    ];
    this.columnDefsCVC = [
      { headerName: 'FGID', field: 'leadSku', sortable: true, filter: true, sort: "desc", width: this.width_final / 14, cellStyle: { 'font-weight': 'bold', 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } }, //260
      { headerName: 'Forecasting Group', field: 'leadSkuName', sortable: true, filter: true, width: this.width_final / 6, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0px', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } }, //260
      { headerName: 'CPG', field: 'cpg', sortable: true, filter: true, width: this.width_final / 6, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //260
      { headerName: 'Plant', field: 'plant', sortable: true, filter: true, width: this.width_final / 6, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //260
      { headerName: 'CVC ID', field: 'id', sortable: true, filter: true, width: this.width_final / 15, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //260
      { headerName: 'Date Modified', field: 'dateModified', sortable: true, filter: true, width: this.width_final / 9, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },  //150
      // { headerName: 'State', field: 'state', sortable: true, filter: true, width: 100 },  //110
      {
        headerName: 'State', field: 'state',
        suppressSizeToFit: true,
        width: this.width_final / 12,
        cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px' },
        //width: 67,
        cellRenderer: function (params) {
          if (params.data.state == 'active') {
            return '<style>.switch { margin-top: 0px !important; position: relative; display: inline-block; width: 32px; height: 18px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #000; } input:focus + .slider { box-shadow: 0 0 1px #000; } input:checked + .slider:before { -webkit-transform: translateX(14px); -ms-transform: translateX(14px); transform: translateX(14px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox" onchange="this.rowStateChange()" checked><span class="slider round"></span></label>';
            //return '<style>.switch {  position: relative; display: inline-block; width: 65px; height: 40px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 34px; width: 30px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(30px); -ms-transform: translateX(30px); transform: translateX(30px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>';
          }
          else if (params.data.state == 'inactive') {
            return '<style>.switch { margin-top: 0px !important; position: relative; display: inline-block; width: 32px; height: 18px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #000; } input:focus + .slider { box-shadow: 0 0 1px #000; } input:checked + .slider:before { -webkit-transform: translateX(14px); -ms-transform: translateX(14px); transform: translateX(14px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox" onchange="this.rowStateChange()"><span class="slider round"></span></label>';
            //return '<style>.switch {  position: relative; display: inline-block; width: 65px; height: 40px; margin-left: 0px; } .switch input { opacity: 0; width: 0; height: 0; } .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider:before { position: absolute; content: ""; height: 34px; width: 30px; left: 2px; bottom: 2px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(30px); -ms-transform: translateX(30px); transform: translateX(30px); } /* Rounded sliders */ .slider.round { border-radius: 18px; } .slider.round:before { border-radius: 50%; }</style><label class="switch"><input type="checkbox"><span class="slider round"></span></label>';
          }
          else {
            return params.data.state;
          }
        },
      }
    ];




    this.skuService.getLoadWeek().subscribe((response: String) => {
      this.DBloadWeek = response;
      var z = this.DBloadWeek.toString();
      var x = z.substring(0, 4);
      var y = z.substring(4, 6);
   



      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;
        for (const abc of this.pipo) {
          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          this.drop.push(g);
        }
        this.material_len = this.drop.length;
        this.material_len = 932;
        this.drop.forEach(element => {
          var a = {
            skuname: element,
            isFiltered: true
          }
          this.dropJSON.push(a);
        });
      });
      this.skuService.getPIPOMapping().subscribe((response: any) => {
        this.pipoMapping = [];
        var fromids = [];
        var toids = [];
        var fmweeks = [];
        var count = 0;
        var flag;
        for (var key in response) {
          flag = 0;
          if (response.hasOwnProperty(key)) {
            var fid = response[key].fromid;
            var tid = response[key].toid;
            var wk = response[key].fromweek;
            for (count = 0; count < fromids.length; count++) {
              if (fid == toids[count] && tid == fromids[count] && wk == fmweeks[count]) {
                for (var key in this.pipoMapping) {
                  if (response.hasOwnProperty(key)) {
                    if (this.pipoMapping[key].fromid == tid && this.pipoMapping[key].toid == fid && this.pipoMapping[key].fromweek == wk) {
                     // this.pipoMapping.splice(key, 1);
                      break;
                    }
                  }
                }
                flag = 1;
                break;
              }
            }
            if (flag == 0) {
              fromids.push(fid);
              toids.push(tid);
              fmweeks.push(wk);
              if (tid == '0 - null' || tid == '0 - ') {
                response[key].toid = '';
              }
              this.pipoMapping.push(response[key]);
            }
          }
        }
  
  
  
  
       var final_obj=[];
  
        for(const abc of this.pipoMapping)
        {
          var notes="";
          
             if (abc.state == "Linear Delisting") {
              notes="delisting";
            }
            else if (abc.state == "Log Delisting") {
              notes="delisting";
            }
            else if (abc.state == "Step Delisting") {
              notes="delisting";
            }
            else if (abc.state== "Custom Delisting") {
              notes="delisting";
            }
            else {
              notes="transistion";
            }

            var del="no";
            var ab=abc.status;

            if(this.DBloadWeek>=abc.fromweek)
            {
                ab="PIPO in progress";
            }
            else if( abc.fromweek > this.DBloadWeek)
            {
              ab ="Rule Applied";
            }
            else if(this.DBloadWeek<abc.toweek)
            {
              ab="Rule completed";
            }
             if(abc.status=="Creating Rule")
            {
              ab="Creating Rule";
            }
             if(abc.status=="Deleted")
            {
               ab="Deleted";
               notes="delisting";
               del="yes"
            }

  
          var custom_obj ={
            date:abc.date,
            fgid:abc.fgid,
            fromid:abc.fromid,
            fromweek:abc.fromweek,
            state:abc.state,
            status:ab,
            toid:abc.toid,
            notes:notes,
            deleteit:del
          }
  
  
  
          final_obj.push(custom_obj);
  
  
  
  
  
        }
        this.pipoMapping=[];
        this.pipoMapping=JSON.parse(JSON.stringify(final_obj));
  
  
      
  
  
      });



    });


    this.skuService.getCVC().subscribe((response: any) => {
      this.cvcData = response;
      this.cvcDataAll = response;
    });
    this.skuService.getmaxweek().subscribe((response: any) => {
      this.maxweek = response;
    });
    this.skuService.getfgid().subscribe((response: any) => {
      this.mappingdrop = response;
      //this.fg_len=this.mappingdrop.length; 
    });
  }
  public setToSkuValue(toskuvalue) {
    this.tosku = toskuvalue;
  }
  public onSearchFGDropdownOpened() {
    this.searchFGdropdown = true;
    this.searchCPGdropdown = false;
    this.searchPlantdropdown = false;
    if (document.getElementById("searchTheFG")) {
      document.getElementById("searchTheFG").style.borderRadius = "10px 10px 0px 0px";
      document.getElementById("searchTheFG").style.boxShadow = "0 0 0 0.2rem #F8F9FA";
      document.getElementById("searchTheFG").style.borderColor = "#ced4da";
    }
  }
  public onSearchFGDropdownClosed() {
    if (document.getElementById("searchTheFG")) {
      document.getElementById("searchTheFG").style.borderRadius = "10px 10px 10px 10px";
      document.getElementById("searchTheFG").style.boxShadow = "none";
    }
  }
  public onSearchCPGDropdownOpened() {
    this.searchFGdropdown = false;
    this.searchCPGdropdown = true;
    this.searchPlantdropdown = false;
    if (document.getElementById("searchTheCPG")) {
      document.getElementById("searchTheCPG").style.borderRadius = "10px 10px 0px 0px";
      document.getElementById("searchTheCPG").style.boxShadow = "0 0 0 0.2rem #F8F9FA";
      document.getElementById("searchTheCPG").style.borderColor = "#ced4da";
    }
  }
  public onSearchCPGDropdownClosed() {
    if (document.getElementById("searchTheCPG")) {
      document.getElementById("searchTheCPG").style.borderRadius = "10px 10px 10px 10px";
      document.getElementById("searchTheCPG").style.boxShadow = "none";
    }
  }
  public onSearchPlantDropdownOpened() {
    this.searchFGdropdown = false;
    this.searchCPGdropdown = false;
    this.searchPlantdropdown = true;
    if (document.getElementById("searchThePlant")) {
      document.getElementById("searchThePlant").style.borderRadius = "10px 10px 0px 0px";
      document.getElementById("searchThePlant").style.boxShadow = "0 0 0 0.2rem #F8F9FA";
      document.getElementById("searchThePlant").style.borderColor = "#ced4da";
    }
  }
  public onSearchPlantDropdownClosed() {
    if (document.getElementById("searchThePlant")) {
      document.getElementById("searchThePlant").style.borderRadius = "10px 10px 10px 10px";
      document.getElementById("searchThePlant").style.boxShadow = "none";
    }
  }
  public searchfg;
  public filteredFGvals;
  public areAllFGsSelected = true;
  public getCallbackFG() {
    return this.filterSKUsFG.bind(this);
  }
  public filterSKUsFG(sku: string) {
    if (!this.searchfg || !this.searchfg.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchfg && this.searchfg.trim(), 'ig');
    return regex.test(sku);
  }
  public addFGs() {
    this.filteredFGvals = [];
    var instance = this.gridApi.getFilterInstance('leadSkuName');
    for (var abc of this.fgs_search) {
      if (abc.isChecked) {
        try {
          this.filteredFGvals.push(abc.name.split(" - ")[1]);
        } catch (e) { }
      }
    }
    if (this.filteredFGvals.length == 0) {
      instance.setModel(null);
    }
    else {
      instance.setModel({ values: this.filteredFGvals, });
    }
    this.gridApi.onFilterChanged();
  }
  public addAllFGs() {
    if (this.areAllFGsSelected) {
      for (var abc of this.fgs_search) {
        abc.isChecked = true;
      }
    }
    else {
      for (var abc of this.fgs_search) {
        abc.isChecked = false;
      }
    }
    this.addFGs();
  }
  public searchcpg;
  public filteredCPGvals;
  public areAllCPGsSelected = true;
  public getCallbackCPG() {
    return this.filterSKUsCPG.bind(this);
  }
  public filterSKUsCPG(sku: string) {
    if (!this.searchcpg || !this.searchcpg.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchcpg && this.searchcpg.trim(), 'ig');
    return regex.test(sku);
  }
  public addCPGs() {
    this.filteredCPGvals = [];
    var instance = this.gridApi.getFilterInstance('cpg');
    for (var abc of this.cpgs_search) {
      if (abc.isChecked) {
        try {
          this.filteredCPGvals.push(abc.name);
        } catch (e) { }
      }
    }
    if (this.filteredCPGvals.length == 0) {
      instance.setModel(null);
    }
    else {
      instance.setModel({ values: this.filteredCPGvals, });
    }
    this.gridApi.onFilterChanged();
  }
  public addAllCPGs() {
    if (this.areAllCPGsSelected) {
      for (var abc of this.cpgs_search) {
        abc.isChecked = true;
      }
    }
    else {
      for (var abc of this.cpgs_search) {
        abc.isChecked = false;
      }
    }
    this.addCPGs();
  }
  public searchplant;
  public filteredPlantvals;
  public areAllPlantsSelected = true;
  public getCallbackPlant() {
    return this.filterSKUsPlant.bind(this);
  }
  public filterSKUsPlant(sku: string) {
    if (!this.searchplant || !this.searchplant.trim()) {
      return true;
    }
    const regex = new RegExp(this.searchplant && this.searchplant.trim(), 'ig');
    return regex.test(sku);
  }
  public addPlants() {
    this.filteredPlantvals = [];
    var instance = this.gridApi.getFilterInstance('plant');
    for (var abc of this.plants_search) {
      if (abc.isChecked) {
        try {
          this.filteredPlantvals.push(abc.name);
        } catch (e) { }
      }
    }
    if (this.filteredPlantvals.length == 0) {
      instance.setModel(null);
    }
    else {
      instance.setModel({ values: this.filteredPlantvals, });
    }
    this.gridApi.onFilterChanged();
  }
  public addAllPlants() {
    if (this.areAllPlantsSelected) {
      for (var abc of this.plants_search) {
        abc.isChecked = true;
      }
    }
    else {
      for (var abc of this.plants_search) {
        abc.isChecked = false;
      }
    }
    this.addPlants();
  }
  public selectall_brands() {
    if (this.allfilter_brand == 1) {
      for (const sku of this.selectdrop_brand[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_brand = 0;
    }
    else if (this.allfilter_brand == 0) {
      for (const sku of this.selectdrop_brand[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_brand = 1;
    }
  }
  public selectall_subbrands() {
    if (this.allfilter_subbrand == 1) {
      for (const sku of this.selectdrop_subbrand[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_subbrand = 0;
    }
    else if (this.allfilter_subbrand == 0) {
      for (const sku of this.selectdrop_subbrand[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_subbrand = 1;
    }
  }
  public selectall_own3pp() {
    if (this.allfilter_own3pp == 1) {
      for (const sku of this.selectdrop_own3pp[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_own3pp = 0;
    }
    else if (this.allfilter_own3pp == 0) {
      for (const sku of this.selectdrop_own3pp[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_own3pp = 1;
    }
  }
  public selectall_materialgroup() {
    if (this.allfilter_materialgrp == 1) {
      for (const sku of this.selectdrop_matgrp[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_materialgrp = 0;
    }
    else if (this.allfilter_materialgrp == 0) {
      for (const sku of this.selectdrop_matgrp[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_materialgrp = 1;
    }
  }
  public selectall_localcat() {
    if (this.allfilter_localcat == 1) {
      for (const sku of this.selectdrop_local[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_localcat = 0;
    }
    else if (this.allfilter_localcat == 0) {
      for (const sku of this.selectdrop_local[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_localcat = 1;
    }
  }
  public selectall_globalcat() {
    if (this.allfilter_globalcat == 1) {
      for (const sku of this.selectdrop_global[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_globalcat = 0;
    }
    else if (this.allfilter_globalcat == 0) {
      for (const sku of this.selectdrop_global[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_globalcat = 1;
    }
  }
  public selectall_primaryunit() {
    if (this.allfilter_primaryunit == 1) {
      for (const sku of this.selectdrop_primary[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_primaryunit = 0;
    }
    else if (this.allfilter_primaryunit == 0) {
      for (const sku of this.selectdrop_primary[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_primaryunit = 1;
    }
  }
  public selectall_packsize() {
    if (this.allfilter_packsize == 1) {
      for (const sku of this.selectdrop_packsize[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_packsize = 0;
    }
    else if (this.allfilter_packsize == 0) {
      for (const sku of this.selectdrop_packsize[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_packsize = 1;
    }
  }
  public selectall_packtype() {
    if (this.allfilter_packtype == 1) {
      for (const sku of this.selectdrop_packtype[0].values) {
        sku.isChecked = false;
      }
      this.allfilter_packtype = 0;
    }
    else if (this.allfilter_packtype == 0) {
      for (const sku of this.selectdrop_packtype[0].values) {
        sku.isChecked = true;
      }
      this.allfilter_packtype = 1;
    }
  }
 
  public closeModal(reloadReq :boolean) {
    if(reloadReq){
    window.location.reload();
    }
    this.saveFilterModalCancel.nativeElement.click();
  }

  public fgshow() {
    this.pressed = true;
  }
  public getCallbackCurrentSku() {
    return this.filterSKUs.bind(this);
  }
  public fromskuSearch;
  public filterSKUs(sku: string) {
    if (!this.fromskuSearch || !this.fromskuSearch.trim()) {
      return true;
    }
    const regex = new RegExp(this.fromskuSearch && this.fromskuSearch.trim(), 'ig');
    return regex.test(sku);
  }
  public currentSkuSelected(sku: string) {
    this.fromsku = sku;
    this.fromskuSearch = sku;
    this.pressed = false;
    this.populate_drop2();
  }
  public stateSwitch() {
    if (this.slider_state == 1) {
      this.slider_state = 0;
      document.getElementById('slider_main').style.backgroundColor = '#797878e8';
    }
    else {
      this.slider_state = 1;
      document.getElementById('slider_main').style.backgroundColor = '#000';
    }
    this.switch = !this.switch;
    if (this.switch) {
      this.cvcData = [];
      for (var key in this.cvcDataAll) {
        if (this.cvcDataAll.hasOwnProperty(key)) {
          if (this.cvcDataAll[key].state == 'active') {
            this.cvcData.push(this.cvcDataAll[key]);
          }
        }
      }
      this.gridApi.redrawRows({ rowNodes: this.cvcData });
    }
    else {
      this.cvcData = this.cvcDataAll;
      this.gridApi.redrawRows({ rowNodes: this.cvcData });
    }
  }
  public onCellClickedCVC(params) {
    this.zzzcvcID = null;
    this.zzzdateModified = null;
    this.zzzstate = null;
    if (params.colDef.field == "state") {
      this.zzzcvcID = params.data.id;
      var fulldate = new Date();
      var year = fulldate.getFullYear();
      var month = fulldate.getMonth() + 1;
      var date = fulldate.getDate();
      this.zzzdateModified = year.toString() + "-" + month.toString() + "-" + date.toString();
      if (params.data.state == "active") {
        this.zzzstate = "inactive";
      }
      else if (params.data.state == "inactive") {
        this.zzzstate = "active";
      }
      if (this.zzzcvcID && this.zzzdateModified && this.zzzstate) {
        var data = {
          "id": this.zzzcvcID,
          "leadSku": null,
          "leadSkuName": null,
          "cpg": null,
          "plant": null,
          "dateModified": this.zzzdateModified,
          "state": this.zzzstate
        }
        this.skuService.updateCVCState(data).subscribe(() => {
          params.data.state = this.zzzstate;
       
          this.showCVCstateFeedback = true;
          setTimeout(() => {
            this.showCVCstateFeedback = false;
          }, 5000);
        })
      }
    }
  }
  public onCellValueChangedCVC(params) {
    if (params.node.id == "state") {
  
    }
  }
  public firstDataRendered_in() {
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
    var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.border = '0';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-row') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#fff';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.paddingLeft = '16px';
      headercells[i].style.paddingRight = '16px';
    }
    var cells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.paddingLeft = '16px';
      cells[i].style.paddingRight = '16px';
    }
    var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.color = '#8BA0B9';
      agcells2[i].style.fontSize = '12px';
      agcells2[i].style.lineHeight = '24px';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-viewport') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#fff';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-container') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#fff';
    }
    try {
      this.gridApi.sizeColumnsToFit();
    } catch (e) { console.log(e); }
  }
  public firstDataRendered(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    try {
      var agrows = Array.from(document.getElementsByClassName('ag-rows') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < agrows.length; i++) {
        agrows[i].style.height = '46px';
      }
    } catch (e) { console.log(e); }
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
    var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.border = '0';
    }
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
    var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.paddingLeft = '16px';
      headercells[i].style.paddingRight = '16px';
    }
    var cells = Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.paddingLeft = '16px';
      cells[i].style.paddingRight = '16px';
    }
    var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.color = '#8BA0B9';
      agcells2[i].style.paddingTop = '4px';
      agcells2[i].style.paddingBottom = '4px';
      agcells2[i].style.fontSize = '12px';
      agcells2[i].style.lineHeight = '24px';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-viewport') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#F8F9FA';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-container') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#F8F9FA';
    }
    try {
      this.gridApi.sizeColumnsToFit();
    } catch (e) { console.log(e); }
  }
  public firstDataRenderedCVC() {


    let fgSearchWidth= 0;
    let cpgSearchWidth= 0;
    let plantSearchWidth= 0;

    try {
      var agrows = Array.from(document.getElementsByClassName('ag-rows') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < agrows.length; i++) {
        agrows[i].style.height = '46px';
      }
    } catch (e) { console.log(e); }
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
      this.gridApi.sizeColumnsToFit();
    } catch (e) { console.log(e); }
    try {
      var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < headercells.length; i++) {
        headercells[i].style.paddingLeft = '0px';
        headercells[i].style.paddingRight = '0px';
        headercells[i].style.fontSize = '12px';
        headercells[i].style.lineHeight = '24px';
        if(i<4){
          if(i<2)
          fgSearchWidth += parseInt(headercells[i].style.width.replace('px',''));
          else if(i<3)
          cpgSearchWidth += parseInt(headercells[i].style.width.replace('px',''));
          else if(i<4)
          plantSearchWidth+=parseInt(headercells[i].style.width.replace('px',''));

        }
      }




      document.getElementById('searchFGMain').style.width=fgSearchWidth-16+'px';
      document.getElementById('searchCPGMain').style.width=cpgSearchWidth-16+'px';
      document.getElementById('searchPlantMain').style.width=plantSearchWidth-16+'px';

    } catch (e) { console.log(e); }
    try {
      var headercells = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
      for (var i = 0; i < headercells.length; i++) {
        headercells[i].style.color = '#8BA0B9';
        headercells[i].style.fontSize = '12px';
        headercells[i].style.lineHeight = '24px';
        headercells[i].style.paddingTop = '4px';
        headercells[i].style.paddingBottom = '4px';
      }
    } catch (e) { console.log(e); }
    try {
      var threebars = Array.from(document.getElementsByClassName('ag-icon-menu') as HTMLCollectionOf<HTMLElement>);
      threebars[6].style.display = 'none'; //remove ag-icon in last column
    } catch (e) { console.log(e); }
    var agcells2 = Array.from(document.getElementsByClassName('ag-header-cell-text') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.color = '#8BA0B9';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-cell') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.paddingLeft = '16px';
      headercells[i].style.paddingRight = '16px';
    }
    var headercells = Array.from(document.getElementsByClassName('ag-header-row') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < headercells.length; i++) {
      headercells[i].style.background = '#F8F9FA';
      headercells[i].style.height = '32px';
      headercells[i].style.minHeight = '32px';
    }
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
    var agcells2 = Array.from(document.getElementsByClassName('ag-root-wrapper') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < agcells2.length; i++) {
      agcells2[i].style.border = '0';
    }
  }
  public onCellClicked(params) {
    if (params.colDef.field == "notes") {
      this.schedule_1(params.data.fromid, params.data.toid, params.data.state, params.data.fgid);
    }
    if (params.colDef.field == "deleteit") {
      if (confirm("Are you sure you want to delete this PIPO rule?")) {
        this.reversepipo(params.data.fromid, params.data.toid, params.data.state, params.data.fgid);
      }
    }
  }
  public dates2;
  public frweek;
  onCellDoubleClickedSM() {
    //here
    var virtualList = Array.from(document.getElementsByClassName('ag-virtual-list-viewport') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < virtualList.length; i++) {
      virtualList[i].style.zoom = '133%';
    }
  }
  onCellValueChangedSM(params) {
    if (params.colDef.field == "animal_FLAG2") {
      var isLegit = false;
      this.md_1.forEach(element => {
        if (params.data.animal_FLAG2 == element) {
          isLegit = true;
        }
      });
      if (isLegit) {
       
        this.lead_sku = params.data.fgid;
        this.material_1 = params.data.material;
        this.mappedFG_1 = params.data.animal_FLAG2;
        var data = {
          lead: this.lead_sku,
          animal: this.mappedFG_1,
          material: this.material_1
        };
        this.loading = true;
        this.skuService.mapFG_1(data).subscribe(() => {
          window.alert("Segment mapped.\nChanges to the segment will reflect in the FGID " + this.lead_sku + " after page refresh.");
          this.loading = false;
        }, () => {
          window.alert("Segment mapped.\nChanges to the segment will reflect in the FGID " + this.lead_sku + " after page refresh.");
          this.loading = false;
        });
      
      }
      else {
        window.alert("Segment cannot be edited to " + params.data.animal_FLAG2 + "\nPlease choose a valid segment.")
      }
    }
  }
  private getFiltersObject() {
    const brands = [];
    const sub_brand = [];
    const own3pp = [];
    const material_group = [];
    const globalcat = [];
    const localcat = [];
    const primaryunit = [];
    const packsize = [];
    const packtype = [];
    const segment = [];
    for (const brand of this.selectdrop_brand) {
      for (const aa of brand.values) {
        if (aa.isChecked) {
          brands.push(aa.name);
        }
      }
    }
    for (const brand of this.selectdrop_subbrand) {
      for (const aa of brand.values) {
        if (aa.isChecked) {
          sub_brand.push(aa.name);
        }
      }
    }
    for (const brand of this.selectdrop_own3pp) {
      for (const aa of brand.values) {
        if (aa.isChecked) {
          own3pp.push(aa.name);
        }
      }
    }
    for (const brand of this.selectdrop_matgrp) {
      for (const aa of brand.values) {
        if (aa.isChecked) {
          material_group.push(aa.name);
        }
      }
    }
    for (const brand of this.selectdrop_global) {
      for (const aa of brand.values) {
        if (aa.isChecked) {
          globalcat.push(aa.name);
        }
      }
    }
    for (const brand of this.selectdrop_local) {
      if (brand.key == 'localcat') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            localcat.push(aa.name);
          }
        }
      }
    }
    for (const brand of this.selectdrop_primary) {
      if (brand.key == 'primaryunit') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            primaryunit.push(aa.name);
          }
        }
      }
    }
    for (const brand of this.selectdrop_packsize) {
      if (brand.key == 'packsize') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            packsize.push(aa.name);
          }
        }
      }
    }
    for (const brand of this.selectdrop_packtype) {
      if (brand.key == 'packtype') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            packtype.push(aa.name);
          }
        }
      }
    }
    for (const brand of this.selectdrop_segment) {
      if (brand.key == 'segment') {
        for (const aa of brand.values) {
          if (aa.isChecked) {
            segment.push(aa.name);
          }
        }
      }
    }
    return {
      brands: brands,
      own3pp: own3pp,
      subbrand: sub_brand,
      materialGroup: material_group,
      packType: packtype,
      packsize: packsize,
      globalbev: globalcat,
      segment: segment,
      productcategory: localcat,
      primaryunit: primaryunit
    };
  }
  public apply_filter() {
    const reqBody = this.getFiltersObject();
    this.loading = true;
    this.columnDefs = [];
    this.pipo = [];
    this.skuService.getSkUList12(reqBody).subscribe((response: any) => {
      this.columnDefs = [
        { headerName: 'FGID', field: 'fgid', sortable: true, filter: true, sort: "desc", width: this.width_final / 9.9, cellStyle: { 'font-weight': 'bold', 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '32px' } },
        { headerName: 'Forecasting group Name', field: 'forecastinggroup', sortable: true, filter: true, width: this.width_final / 3.8, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '32px' } }, //300
        { headerName: 'Material', field: 'material', sortable: true, filter: true, width: this.width_final / 9.9, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '32px' } },  //shud be 100
        { headerName: 'Material Name', field: 'sku', sortable: true, filter: true, width: this.width_final / 4.9, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '32px' } }, //370
        {
          headerName: 'Primary', field: 'prime', sortable: true, filter: true, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' }, width: this.width_final / 9,
          cellRenderer: function (params) {
            if (params.value == "PRIMARY") {
              return '<svg width="52" height="24" viewBox="0 0 52 24" fill="white"><g><rect width="52" height="24" rx="12" fill="#1ACDCC"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" style="font-size:10px;line-height:16px;">Primary</text><g></svg>';
            }
            else {
              return "";
            }
          }
        },
        {
          headerName: 'Segment', field: 'animal_FLAG2', sortable: true, filter: true, editable: true,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
            values: this.md_1,
          },
          cellStyle: { 'border-top': '1px solid black', 'border-left': '1px solid black', 'border-right': '1px solid black' }
        },
        { headerName: 'First Seen', field: 'minimum', sortable: true, filter: true, width: this.width_final / 8.4, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },
        { headerName: 'Last Seen', field: 'maximum', sortable: true, filter: true, width: this.width_final / 8.4, cellStyle: { 'paddingLeft': '16px', 'paddingRight': '0', 'padding-top': '16px', 'padding-bottom': '16px', 'line-height': '24px' } },
        /*
        {
          headerName: ' ', field: 'btn', width: 100,  //shud be 100
          cellRenderer: function (params) {
            return '<p>Edit Segment</p>'
          }
        }, 
        */
        {
          headerName: ' ', field: 'btn2', width: this.width_final / 22.5,
          cellRenderer: function () {
            return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<rect width="24" height="24" fill="white" fill-opacity="0.01"/>' +
              '<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 10.09C12.5523 10.09 13 10.5377 13 11.09V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11.09C11 10.5377 11.4477 10.09 12 10.09ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7Z" fill="#212833"/>' +
              '</svg>';
          }
        },
      ];
      this.pipo = response;
      var params = {
        force: false,
        suppressFlash: false,
      };
      this.gridApi.refreshCells(params);
      this.loading = false;
      //  this.selectedSKUs = [];
    });
  }
  public unexpanded_filter(filter: string) {
    if (filter != this.filter_clicked) {
      this.filter_clicked = filter;
      document.getElementById('drop2filter').className = 'panel-collapse collapse';
      this.selectdrop2[0].isExpanded = false;
    }
  }
  public unexpanded_filter_block(filter: string) {
    if (filter != this.filter_clicked) {
      try {
        this.filter_clicked = filter;
        document.getElementById('brandskufilter').className = 'panel-collapse collapse';
        this.selectdrop_brand[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('subbrandskufilter').className = 'panel-collapse collapse';
        this.selectdrop_subbrand[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('own3ppfilter').className = 'panel-collapse collapse';
        this.selectdrop_own3pp[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('materialgroupfilter').className = 'panel-collapse collapse';
        this.selectdrop_matgrp[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('globalcatfilter').className = 'panel-collapse collapse';
        this.selectdrop_global[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('localcatfilter').className = 'panel-collapse collapse';
        this.selectdrop_local[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('primaryunitfilter').className = 'panel-collapse collapse';
        this.selectdrop_primary[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('packsizefilter').className = 'panel-collapse collapse';
        this.selectdrop_packsize[0].isExpanded = false;
      } catch (err) {
      }
      try {
        document.getElementById('packtypefilter').className = 'panel-collapse collapse';
        this.selectdrop_packtype[0].isExpanded = false;
      } catch (err) {
      }
    }
  }
  public unexpanded_filter1() {
    document.getElementById('drop2filter').className = 'panel-collapse collapse';
    this.selectdrop2[0].isExpanded = false;
  }



  public calculate_filter(params)
  {
      if(params.selectName == "Brand") {
        this.selectdrop_brand = params.selectItems;
      }
      else if(params.selectName == "Sub Brand") {
        this.selectdrop_subbrand = params.selectItems;
      }
      else if(params.selectName == "Own 3pp") {
        this.selectdrop_own3pp = params.selectItems;
      }
      else if(params.selectName == "Material Group") {
        this.selectdrop_matgrp = params.selectItems;
      }
      else if(params.selectName == "Global Category") {
        this.selectdrop_global = params.selectItems;
      }
      else if(params.selectName == "Pack size") {
        this.selectdrop_packsize = params.selectItems;
      }
      else if(params.selectName == "Pack Type") {
        this.selectdrop_packtype = params.selectItems;
      }
      try {
          this.one_cal = this.selectdrop_brand[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
      } catch (err) {
      }
      try {
          this.two_cal = this.selectdrop_subbrand[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
      } catch (err) {
      }
      try {
          this.three_cal = this.selectdrop_own3pp[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
      } catch (err) {
      }
      try {
          this.four_cal = this.selectdrop_matgrp[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
      } catch (err) {
      }
      try {
          this.five_cal = this.selectdrop_global[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
      } catch (err) {
      }
      try {
          this.six_cal = this.selectdrop_packsize[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
      } catch (err) {
      }

      try {
        this.seven_cal = this.selectdrop_packtype[0].values.filter(item => item.isChecked).map(item => item.name.split('-')[0]);
    } catch (err) {
    }
  }



  public reversepipo(tpfromid, tptoid, pstate, pfgid) {
    var pfromid = tpfromid.split(" - ")[0]; //reversing
    var ptoid = tptoid.split(" - ")[0]; //reversing
    var abc = {
      from: pfromid,
      to: ptoid
    }
    this.dates2 = [];
    var count = 0;
    this.skuService.getschedule_value(abc).subscribe((response2: any) => {
      for (var key in response2) {
        if (response2.hasOwnProperty(key)) {
          count = count + 1;
          var val = response2[key];
          var thg = parseInt(val.two);
          var a = {
            week: val.fromweek,
            one: 0,
            two: 100 - thg,
            fromid: val.toid,
            toid: val.fromid
          };
          this.dates2.push(a);
          if (count == 1) {
            this.frweek = val.fromweek;
          }
        }
      }
      var data = {
        fromid: pfromid,
        toid: ptoid,
        state: pstate,
        fromweek: this.frweek,
        fgid: pfgid
      };


      // this.skuService.savePIPOsku_delete(data).subscribe(() => {
      //   this.loading = false;
      //   this.showPIPOruleDeleteFeedback = true;
      //   setTimeout(() => {
      //     this.showPIPOruleDeleteFeedback = false;
      //   }, 5000);
      // });

      this.skuService.savePIPOvalue_delete(this.dates2).subscribe(() => {
        this.skuService.savePIPOsku_delete(data).subscribe(() => {
          this.loading = false;
          this.showPIPOruleDeleteFeedback = true;
          setTimeout(() => {
            this.showPIPOruleDeleteFeedback = false;
          }, 5000);
        }, () => {
          this.loading = false;
          this.showPIPOruleDeleteFeedback = true;
          setTimeout(() => {
            this.showPIPOruleDeleteFeedback = false;
          }, 5000);
        });
      });
    });
  }
  public revpq() {

  }

  public dataSource;
  public gotten_material_details;
  public thematerialid;
  public thefgname;
  public thematerialname;
  public thesegment;
  public thesince;
  public thefgid;
  public fromFull;
  public toFull;
  public fromid;
  public toid;
  public fromweek = 0;
  //get the below from request 
  public thebrand;
  public theown3pp;
  public theprimaryunit;
  public theabv;
  public thesubbrand;
  public theglobalcategory;
  public thepacksize;
  public thematerialgroup;
  public thelocalcategory;
  public thepacktype;
  public gridOptions;
  public onCellClicked1(params) {
    //here
    var virtualList = Array.from(document.getElementsByClassName('ag-virtual-list-viewport') as HTMLCollectionOf<HTMLElement>);
    for (var i = 0; i < virtualList.length; i++) {
      virtualList[i].style.zoom = '133%';
    }
    if (params.colDef.field == "btn") {
      this.edit_1(params.data.fgid, params.data.material);
    }
    if (params.colDef.field == "btn2") {
      this.clearPIPOdetails();
      this.displayPIPODetails(params.data.fgid, params.data.material, params.data.forecastinggroup, params.data.sku, params.data.animal_FLAG2, params.data.minimum);
    }
    // this.schedule_1(params.data.fromid,params.data.toid,params.data.state);
  }
  public edit_1(num: string, num2: string) {
    this.lead_sku = num;
    this.material_1 = num2;
    this.myModal4_1.nativeElement.click();
  }
  public clearPIPOdetails() {
    this.thematerialid = null;
    this.thefgname = null;
    this.thematerialname = null;
    this.thesegment = null;
    this.thesince = null;
    this.thefgid = null;
    this.thebrand = null;
    this.theown3pp = null;
    this.theprimaryunit = null;
    this.theabv = null;
    this.thesubbrand = null;
    this.theglobalcategory = null;
    this.thepacksize = null;
    this.thematerialgroup = null;
    this.thelocalcategory = null;
    this.thepacktype = null;
    this.fromid = null;
    this.toid = null;
    this.fromname = null;
    this.toname = null;
    this.fromwls = null;
    this.towls = null;
    this.fromFull = null;
    this.toFull = null;
  }
  public chart_slider_second() {
    if (this.chart1.options.data[0].visible == true) {
      this.chart1.options.data[0].visible = false;
    }
    else {
      this.chart1.options.data[0].visible = true;
    }
    this.chart1.render();
  }
  public chart_slider_first() {
    if (this.chart1.options.data[1].visible == true) {
      this.chart1.options.data[1].visible = false;
    }
    else {
      this.chart1.options.data[1].visible = true;
    }
    this.chart1.render();
  }
  public displayPIPODetails(fgid, materialid, fgname, materialname, segment, since) {
    this.thematerialid = materialid;
    this.thefgname = fgname;
    this.thematerialname = materialname;
    this.thesegment = segment;
    this.thesince = since;
    this.thefgid = fgid;
    this.loading = true;
    this.skuService.getSomeMaterialDetails(this.thematerialid).subscribe((response: any) => {

      this.gotten_material_details = response[0];
      this.thebrand = this.gotten_material_details.a;
      this.theown3pp = this.gotten_material_details.b;
      this.theprimaryunit = this.gotten_material_details.c;
      this.theabv = this.gotten_material_details.d;
      this.thesubbrand = this.gotten_material_details.e;
      this.theglobalcategory = this.gotten_material_details.f;
      this.thepacksize = this.gotten_material_details.g;
      this.thematerialgroup = this.gotten_material_details.h;
      this.thelocalcategory = this.gotten_material_details.i;
      this.thepacktype = this.gotten_material_details.j;
      
      this.columnDef_skudetail = [
        { headerName: 'Material', field: 'material', sortable: true, filter: true, width: 130, sort: "desc", cellStyle: { 'line-height': '24px', 'padding-top': '4px', 'padding-bottom': '4px' } }, //260
        { headerName: 'Sku Name', field: 'skuname', sortable: true, filter: true, width: 270, cellStyle: { 'line-height': '24px', 'padding-top': '4px', 'padding-bottom': '4px' } }, //260
        {
          headerName: ' ', field: 'prime', sortable: true, filter: true, cellStyle: { 'line-height': '24px', 'padding-top': '4px', 'padding-bottom': '4px' }, width: 100,
          cellRenderer: function (params) {
            if (params.value == "PRIMARY") {
              return '<svg width="52" height="24" viewBox="0 0 52 24" fill="white"><g><rect width="52" height="24" rx="12" fill="#1ACDCC"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" style="font-size:10px;line-height:16px;">Primary</text><g></svg>';
            }
            else {
              return "";
            }
          }
        },
        { headerName: 'Segment', field: 'segment', sortable: true, filter: true, width: 140, cellStyle: { 'line-height': '24px', 'padding-top': '4px', 'padding-bottom': '4px' } },  //260
        { headerName: 'Week Last Seen', field: 'week', sortable: true, filter: true, width: 130, cellStyle: { 'line-height': '24px', 'padding-top': '4px', 'padding-bottom': '4px' } },  //260
      ];
      for (var key in this.pipoMapping) {
        if (this.thefgid == this.pipoMapping[key].fgid) {
          if (this.pipoMapping[key].fromweek > this.fromweek) {
            this.fromFull = this.pipoMapping[key].fromid;
            this.toFull = this.pipoMapping[key].toid;
          }
        }
      }
      if (this.fromFull == null) {
        this.loading = false;
      }
      if (this.fromFull != null && this.toFull != null) {
        this.loading = true;
        this.fromid = this.fromFull.split(" - ")[0];
        this.toid = this.toFull.split(" - ")[0];
        this.fromname = this.fromFull.split(" - ")[1];
        this.toname = this.toFull.split(" - ")[1];
        var ids = {
          from: this.fromid,
          to: this.toid
        }
        this.skuService.getschedule_value(ids).subscribe((response2: any) => {
          this.ssssss = response2;
          var valuesfrom = [];
          var valuesto = [];
          for (var key in this.ssssss) {
            this.fromwls = this.ssssss[key].fromweek;
            // var cat = {
            //   "label": this.ssssss[key].fromweek
            // }
            // cats.push(cat);
            // var valfrom = {
            //   "value": this.ssssss[key].one
            // }
            var valfrom = {
              x: parseInt(this.ssssss[key].fromweek),
              y: parseInt(this.ssssss[key].one),
              color: this.color1
            };
            valuesfrom.push(valfrom);
            // var valto = {
            //   "value": this.ssssss[key].two
            // }
            var valto = {
              x: parseInt(this.ssssss[key].fromweek),
              y: parseInt(this.ssssss[key].two),
              color: this.color2
            };
            valuesto.push(valto);
          }
          this.towls = 202208;
          // var categories = [{
          //   "category": cats
          // }];
          // var dataset = [
          //   {
          //     "seriesname": this.fromid,
          //     "data": valuesfrom
          //   },
          //   {
          //     "seriesname": this.toid,
          //     "data": valuesto
          //   }
          // ]
          // var dataSource = {
          //   "chart": {
          //       "theme": "fusion",
          //       "xAxisname": "Week",
          //       "yAxisName": "Percentage",
          //       //"numberPrefix": "$",
          //       //"plotFillAlpha": "80",
          //       //"divLineIsDashed": "1",
          //       //"divLineDashLen": "1",
          //       //"divLineGapLen": "1"
          //       },
          //       "categories": categories,
          //       "dataset": dataset,
          // };
          // this.dataSource = dataSource;
          this.chart1 = new CanvasJS.Chart('chartContainer1', {
            title: { text: ' ', fontStyle: 'no', },
            animationEnabled: true,
            backgroundColor: '#fff',
            interval: 25,
            legend: {
              cursor: 'pointer',
              //  itemclick: this.toggleDataSeries.bind(this)
            },
            axisX: {
              valueFormatString: '######', labelFontFamily: 'Montserrat',
              labelFontWeight: "400",
              labelFontSize: 12,
              labelFontColor: "#8BA0B9",
              gridColor: '#ffffff',
            },
            axisY: {
              valueFormatString: '######', labelFontFamily: 'Montserrat',
              maximum: 100,
              interval: 25,
              suffix: "%",
              labelFontWeight: "400",
              labelFontSize: 12,
              labelFontColor: "#8BA0B9",
              gridColor: '#ffffff',
            },
            data: [
              {
                name: this.fromid,
                visible: true,
                type: 'line',
                color: this.color1,
                lineColor: this.color1,
                dataPoints: valuesfrom
              },
              {
                name: this.toid, visible: true,
                type: 'line',
                color: this.color2,
                lineColor: this.color2,
                dataPoints: valuesto
              },
            ]
          });
          this.chart1.render();
          this.loading = false;
          this.rowData_detail = [
            { material: this.thefgid, skuname: this.fromname, prime: "", segment: this.thesegment, week: this.fromwls },
            { material: this.toid, skuname: this.toname, prime: "PRIMARY", segment: this.thesegment, week: this.towls }
          ];
        });
      }
    })
    this.myModal4_pipodetails.nativeElement.click();
  }
  public ssssss;
  public fromname;
  public toname;
  public fromwls;
  public towls;
  public sortComments1(keyIndex: number) {
    this.pipo = this.pipo.sort((a, b) => {
      var value1;
      var value2;
      if (keyIndex == 1) {
        value1 = a.fgid;
        value2 = b.fgid;
      }
      else {
        value1 = a.material;
        value2 = b.material;
      }
      if (value1 === value2) {
        return 0;
      }
      return value1 > value2 ? 1 : -1;
    });
  }
  public test1() {
    this.materialidnumber = '';
    this.skunamenew = '';
  }
  public addingSKU() {
    if (this.materialidnumber === null || this.materialidnumber == '') {
      window.alert("Please enter Material ID");
      return;
    }
    if (this.skunamenew === null || this.skunamenew == '') {
      window.alert("Please enter SKU Name");
      return;
    }
    this.pipo.push({
      material: this.materialidnumber,
      sku: this.skunamenew,
    });
    var a = {
      material: this.materialidnumber,
      sku: this.skunamenew,
    };
    this.newsku12 = true;
    document.getElementById('newsku123').style.display = 'block';
    this.skuService.addSKU_pipo_final(a).subscribe(() => {
    }, () => {
    });
    this.addsku.nativeElement.click();
  }
  public abc() {
    this.table = true;
    this.phase = false;
  }
  public show_phase() {
    if (this.phase_second == false && this.phase_third == false) {
      this.phase_second = true;
      this.phase_third = false;
    }
    else if (this.phase_second == true && this.phase_third == false) {
      this.phase_second = true;
      this.phase_third = true;
    }
  }
  public populate_drop2() {
    var sku = this.fromsku.split('-');
    var a = {
      fromid: sku[0],
    }
    this.skuService.fetch_material_list_pipo(a).subscribe((res: any) => {
      this.drop2 = res;
      this.selectdrop2 = [
        {
          name: 'DROP2',
          key: 'drop2',
          isExpanded: false,
          values: this.drop2
        }
      ]
    }, () => {
    });
  }
  public test(feature) {
    if (feature == "sku") {
      this.pipo_map = false;
      this.sku_map = true;
      // document.getElementById('pipo_bar').style.background='#17b169';
      // document.getElementById('sku_bar').style.background='#f4f5f9';
    }
    else {
      this.pipo_map = true;
      this.sku_map = false;
    }
  }
  public changelogic(feature) {
    if (feature == 'delist') {
      this.newsku = false;
    }
    else {
      this.newsku = true;
    }
  }
  public pipo_click() {
    this.sku_map = false;
    this.cvc_map = false;
    this.pipo_map = true;
    //document.getElementById('pipo_bar').style.background = '#17b169';
    //document.getElementById('sku_bar').style.background = '#f4f5f9';
  }
  public sku_click() {
    this.pipo_map = false;
    this.cvc_map = false;
    this.sku_map = true;
    document.getElementById('sku_bar').style.background = '#17b169';
    document.getElementById('pipo_bar').style.background = '#f4f5f9';
  }
  public cvc_click() {
    this.sku_map = false;
    this.pipo_map = false;
    this.cvc_map = true;
  }
  public map_sku_1() {
    var data = {
      lead: this.lead_sku,
      animal: this.mappedFG_1,
      material: this.material_1
    };
    this.skuService.mapFG_1(data).subscribe(() => {
      window.alert("Mapped");
    }, () => {
      window.alert("Mapped");
    });
  }
  public map_sku() {
    this.materialid;
    this.skuname;
    this.mappedFG;
    var data = {
      material: this.skuname,
      fg: this.mappedFG
    };
    this.skuService.mapFG(data).subscribe(() => {
      window.alert("Mapped");
      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;
        for (const abc of this.pipo) {
          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          this.drop.push(g);
        }
      });
      this.skuService.getPIPOMapping().subscribe((response: any) => {
        this.pipoMapping = response;
      });
    }, () => {
      window.alert("Mapped");
      this.skuService.getPIPO().subscribe((response: any) => {
        this.pipo = response;
        for (const abc of this.pipo) {
          var g = abc.material + "-" + abc.sku + "-" + abc.fgid;
          this.drop.push(g);
        }
      });
      this.skuService.getPIPOMapping().subscribe((response: any) => {
        this.pipoMapping = response;
      });
    });
    this.mapsku.nativeElement.click();
  }
  public second_type1() {
    if (this.od % 2 == 0) {
      this.first_type = true;
      this.second_type = false;
      this.od = 1;
      document.getElementById('harshit').style.backgroundColor = '#fff';
    }
    else {
      this.first_type = false;
      this.second_type = true;
      this.od = 0;
      document.getElementById('harshit').style.backgroundColor = '#f1f1f1';
    }
  }
  public shape1 = false;
  public shape2 = false;
  public shape3 = false;
  public shape4 = false;
  public shape5 = false;
  public shape6 = false;
  public shape7 = false;
  public shape8 = false;
  public shape9 = false;
  public shape10 = false;
  public type_1(a) {
    this.shape3_1 = false;
    this.shape1_1 = false;
    this.shape2_1 = false;
    this.shape4_1 = false;
    this.shape5_1 = false;
    if (a == "1") {
      this.shape1_1 = true;
      for (const abc of this.dates_1_next) {
        abc.one = 0;
        abc.two = 100;
      }
    }
    else if (a == "2") {
      this.shape2_1 = true;
      for (const abc of this.dates_1_next) {
        abc.one = 0;
        abc.two = 100;
      }
    }
    else if (a == "3") {
      this.shape3_1 = true;
    }
    else if (a == "4") {
      this.shape4_1 = true;
      for (const abc of this.dates_1_next) {
        abc.one = 0;
        abc.two = 100;
      }
    }
    else if (a == "5") {
      this.shape5_1 = true;
      for (const abc of this.dates_1_next) {
        abc.one = 0;
        abc.two = 100;
      }
    }
  }
  public type(a) {
    if (a == 1) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 2) {
      this.shape1 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 3) {
      this.shape2 = false;
      this.shape1 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 4) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape1 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 5) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape1 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 6) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape1 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 7) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape1 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 8) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape1 = false;
      this.shape9 = false;
      this.shape10 = false;
    }
    if (a == 9) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape1 = false;
      this.shape10 = false;
    }
    if (a == 10) {
      this.shape2 = false;
      this.shape3 = false;
      this.shape4 = false;
      this.shape5 = false;
      this.shape6 = false;
      this.shape7 = false;
      this.shape8 = false;
      this.shape9 = false;
      this.shape1 = false;
    }
    this.val_selected = a;
    this.type_value = a;
    this.newsku = true;
    this.second_week = true;
    if (a == 4) {
      this.second_week = false;
    }
    if (a == 9) {
      this.second_week = false;
    }
    this.dates = [];
    this.from_date = '';
    this.to_date = '';
  }
  public onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(this.searchfilter);
  }
  // NOT TO BE USED
  public add_sku() {
    this.pipo.push({
      material: this.materialid,
      sku: this.skuname,
    });
    var a = {
      material: this.materialid,
      sku: this.skuname,
    };
    this.skuService.savePIPO(a).subscribe(() => {
    });
    //  materialid;
    //  skuname;
    //  fgid;
    //  fgname;
  }
  public edit(num: number) {
    var a = this.pipo[num];
    this.skuname = a.material;
    this.materialid = a.sku;
    document.getElementById('newsku123').style.display = 'none';
  }
  public gantchart1(num: number) {
    this.fromsku_transistion_apply = this.pipoMapping[num].fromid;
    this.tosku_transistion_apply = this.pipoMapping[num].toid;
    var abc = {
      from: this.fromsku_transistion_apply,
      to: this.tosku_transistion_apply
    };
    this.skuService.getPIPOvalue(abc).subscribe((response2: any) => {
      this.dates1 = response2;
      this.UpdateNew.nativeElement.click();
    });
  }
  public skufilters() {
    this.AddNew_Skufilter.nativeElement.click();
  }
  public apply1() {
    this.AddNew.nativeElement.click();
  }
  public delete_1(a, b) {
    var abc = {
      from: a,
      to: b
    }
    this.skuService.delete_value(abc).subscribe(() => {
      window.location.reload();
    });
  }
  public revpipo() {
    if (confirm("Are you sure you want to delete this PIPO rule?")) {
      this.reversepipo(this.edit_fromsku, this.edit_tosku, this.edit_type, this.edit_fgid);
    }
  }
  public edit_fgid;
  public schedule_1(a, b, c, d) {
    this.edit_fgid = d;
    this.edit_from_sku = a;
    this.edit_fromsku = a;
    this.edit_to_sku = b;
    this.edit_tosku = b;
    this.edit_type_2 = c;
    if (c == "Linear Transistion") {
      this.shape1_1 = true;
    }
    else if (c == "Log Transistion") {
      this.shape2_1 = true;
    }
    else if (c == "Step Transistion") {
      this.shape4_1 = true;
    }
    else if (c == "Custom Transistion") {
      this.shape5_1 = true;
    }
    this.edit_type = c;
    var abc = {
      from: a,
      to: b
    }
    this.skuService.getschedule_value(abc).subscribe((response2: any) => {
      this.dates_1 = [];
      this.dates_1_next = [];
      this.dates_1_prev = [];
      this.dates_1 = response2;
      var h = this.dates_1[0].fromweek;
      for (var y = 0; y < this.dates_1.length; y++) {
        if (parseInt(this.dates_1[y].fromweek) <= 202023) {
          var gh = {
            week: h,
            one: this.dates_1[y].one,
            two: this.dates_1[y].two,
            fromid: this.dates_1[y].fromid,
            toid: this.dates_1[y].toid
          };
          this.dates_1_prev.push(gh);
        }
        else {
          var gh = {
            week: h,
            one: this.dates_1[y].one,
            two: this.dates_1[y].two,
            fromid: this.dates_1[y].fromid,
            toid: this.dates_1[y].toid
          };
          this.dates_1_next.push(gh);
        }
        h++;
      }
      this.AddNew_1.nativeElement.click();
    });
  }
  public getRowHeight() {
    return 56;
  }
  public from_date_table() {
    var str0p = this.from_date;
    str0p = str0p.substring(0, 4);
    var str10p = this.from_date;
    str10p = str10p.substring(6, str10p.length);
    var str20p = str0p + str10p;
    var str30p = parseInt(str20p); //str3 = 202010
    if (str30p < 202105) {
      window.alert("Please select valid week");
      this.from_date = "";
      return;
    }
    if (this.val_selected == 4) {
      this.to_date = "202106";
    }
    if (!(this.from_date == " " || this.to_date == " " || this.from_date == null || this.to_date == null || this.to_date == "")) {
      if (this.from_date > this.to_date) {
        window.alert("Please choose valid dates");
        return;
      }
      if (this.first_type  && this.drop2[0] === "Select Phase In SKU") {
        this.date_table = false;
      }
      else {
        this.date_table = true;
      }
      var str = this.from_date;
      str = str.substring(0, 4);
      var str1 = this.from_date;
      str1 = str1.substring(6, str1.length);
      var str2 = str + str1;
      var str3 = parseInt(str2); //str3 = 202010
      var str_1 = this.to_date;
      str_1 = str_1.substring(0, 4);
      var str1_1 = this.to_date;
      str1_1 = str1_1.substring(6, str1_1.length);
      var str2_1 = str_1 + str1_1;
      var str3_1 = parseInt(str2_1); //str3_1 = 202023
      this.dates = [];
      if (this.val_selected == 1) {
        var j = 0;
        for (var i = str3; i <= str3_1; i++) {
          if (i > 202053 && i <= 202100) {
            continue;
          }
          j++;
          var k = Math.round(100 * j / (str3_1 - str3 + 1));
          var a = {
            week: i,
            one: 100 - k,
            two: k,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku.split(" - ")[0]
          };
          this.dates.push(a);
        }
      }
      else if (this.val_selected == 2) {
        var j = 0
        for (var i = str3; i <= str3_1; i++) {
          if (i > 202053 && i <= 202100) {
            continue;
          }
          j++;
          var k = (str3_1 - str3 + 1);
          var f = Math.log(j) / Math.log(k);
          f = f * 100;
          f = Math.round(f);
          var a = {
            week: i,
            one: 100 - f,
            two: f,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku.split(" - ")[0]
          };
          this.dates.push(a);
        }
      }
      else if (this.val_selected == 3) {
        var j = 0
        for (var i = str3; i <= str3_1; i++) {
          if (i > 202053 && i <= 202100) {
            continue;
          }
          j++;
          var k = (str3_1 - str3 + 1);
          var f = Math.exp(j) / Math.exp(k);
          f = f * 100;
          f = Math.round(f);
          var a = {
            week: i,
            one: 100 - f,
            two: f,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku.split(" - ")[0]
          };
          this.dates.push(a);
        }
      }
      else if (this.val_selected == 4) {
        var a = {
          week: str3,
          one: 0,
          two: 100,
          fromid: this.fromsku.split("-")[0],
          toid: this.tosku.split(" - ")[0]
        };
        this.dates.push(a);
      }
      else if (this.val_selected == 6) {
        var j = 0
        for (var i = str3; i <= str3_1; i++) {
          if (i > 202053 && i <= 202100) {
            continue;
          }
          j++;
          var k = Math.round(100 * j / (str3_1 - str3 + 1));
          var a1 = {
            week: i,
            one: 100 - k,
            two: 0,
            fromid: this.fromsku.split("-")[0],
            toid: 0
          };
          this.dates.push(a1);
        }
      }
      else if (this.val_selected == 7) {
        var j = 0
        for (var i = str3; i <= str3_1; i++) {
          if (i > 202053 && i <= 202100) {
            continue;
          }
          j++;
          var k = (str3_1 - str3 + 1);
          var f = Math.log(j) / Math.log(k);
          f = f * 100;
          f = Math.round(f);
          var a2 = {
            week: i,
            one: 100 - f,
            two: 0,
            fromid: this.fromsku.split("-")[0],
            toid: 0
          };
          this.dates.push(a2);
        }
      }
      else if (this.val_selected == 9) {
        var a90 = {
          week: str3,
          one: 100,
          two: 0,
          fromid: this.fromsku.split("-")[0],
          toid: this.tosku.split(" - ")[0]
        };
        this.dates.push(a90);
      }
      else if (this.val_selected < 6) {
        for (var i = str3; i <= str3_1; i++) {
          if (i > 202053 && i <= 202100) {
            continue;
          }
          var a = {
            week: i,
            one: 0,
            two: 100,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku.split(" - ")[0]
          };
          this.dates.push(a);
        }
      }
      else {
        for (var i = str3; i <= str3_1; i++) {
          if (i > 202053 && i <= 202100) {
            continue;
          }
          var a = {
            week: i,
            one: 10,
            two: 0,
            fromid: this.fromsku.split("-")[0],
            toid: this.tosku.split(" - ")[0]
          };
          this.dates.push(a);
        }
      }
    }
    if (this.second_type == true && this.from_date != null && this.from_date != "" && this.from_date != " ") {
      if (this.first_type == true && this.drop2[0] == "Select Phase In SKU") {
        this.date_table = false;
      }
      else {
        this.date_table = true;
      }
    }
  }
  public hello2(i) {
    var a = this.dates[i].one;
    this.dates[i].two = 100 - a;
  }
  public hello2_1(i) {
    var a = this.dates_1_next[i].one;
    this.dates_1_next[i].two = 100 - a;
  }
  public apply_1() {
    this.loading = true;
    this.skuService.savePIPOvalue_1(this.dates_1_next).subscribe(() => {
      this.loading = false;
      this.saveFilterModalCancel.nativeElement.click();
  
      this.showPIPOruleEditFeedback = true;
      setTimeout(() => {
        this.showPIPOruleEditFeedback = false;
      }, 5000);
     
    }, () => {
      this.loading = false;
      this.saveFilterModalCancel.nativeElement.click();
      this.showPIPOruleEditFeedback = true;
      setTimeout(() => {
        this.showPIPOruleEditFeedback = false;
      }, 5000);
    });
  }
  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  public temppp() {
  }
  public apply() {
    this.loading = true;
    this.fromsku_transistion_apply = this.fromsku.split('-')[0];
    this.tosku_transistion_apply = this.tosku;
    this.logic_transistion_apply = this.logic;
    this.startweek_transistion_apply = this.startweek;
    this.forecasting_fgid = this.fromsku.split('-')[2];
    var state;
    this.date = parseInt(this.from_date.substr(0, 4) + this.from_date.substr(6));


    var to_date = parseInt(this.to_date.substr(0, 4) + this.to_date.substr(6));

    state = "Transistion";
    var gh = this.val_selected;
    if (gh == 1) {
      state = "Linear Transistion";
    }
    else if (gh == 2) {
      state = "Log Transistion";
    }
    else if (gh == 3) {
      state = "Log Transistion";
    }
    else if (gh == 4) {
      state = "Step Transistion";
    }
    else if (gh == 5) {
      state = "Custom Transistion";
    }
    else if (gh == 6) {
      state = "Linear Delisting";
    }
    else if (gh == 7) {
      state = "Log Delisting";
    }
    else if (gh == 8) {
      state = "Log Delisting";
    }
    else if (gh == 9) {
      state = "Step Delisting";
    }
    else if (gh == 10) {
      state = "Custom Delisting";
    }
    if (this.tosku == 'Select Phase In SKU') {
      this.tosku = '0';
    }
    var data = {
      fromid: this.fromsku.split("-")[0],
      toid: this.tosku.split(" - ")[0],
      state: state,
      fromweek: this.date,
      fgid: this.fromsku.split("-")[2],
      toweek:to_date,
      status:"Creating Rule"
    };
    this.skuService.savePIPOvalue(this.dates).subscribe(() => {
      this.skuService.savePIPOsku(data).subscribe(() => {
        this.loading = false;
        this.saveFilterModalCancel.nativeElement.click();
        this.showPIPOruleCreateFeedback = true;
        setTimeout(() => {
          this.showPIPOruleCreateFeedback = false;
        }, 5000);
      }, () => {
        this.loading = false;
        this.saveFilterModalCancel.nativeElement.click();
        this.showPIPOruleCreateFeedback = true;
        setTimeout(() => {
          this.showPIPOruleCreateFeedback = false;
        }, 5000);
      });
    });
    this.loading = false;
    this.fromsku;
    this.tosku;
    this.logic;
    this.startweek;
  }
  public abc_phase() {
    this.table = false;
    this.phase = true;
  }
  ngOnDestroy(): void {
  }
}
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SKUService {
  private apiGatewayUrl: string = environment.apiGatewayUrl;
  private authGatewayUrl: string = environment.authGatewayUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public getBrands() {
    return this.http.get(`${this.apiGatewayUrl}brands`).pipe(
      map((brands: any) => {
        return brands.map((brand) => {
          return {name: brand, isChecked: false};
        });
      })
    );
  }

  public getAlcP() {
    return this.http.get(`${this.apiGatewayUrl}alcoholPercentage`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public getAnimalFlag() {
    return this.http.get(`${this.apiGatewayUrl}animalFlag`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }





  public getpacksize() {
    return this.http.get(`${this.apiGatewayUrl}packsize`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }



  public getLeadSku() {
    return this.http.get(`${this.apiGatewayUrl}allleadsku`).pipe(
      map((LeadSku: any) => {
        return LeadSku.map((LeadSku) => {
          return {name: LeadSku, isChecked: false};
        });
      })
    );
  }




  public getMaterialgroup() {
    return this.http.get(`${this.apiGatewayUrl}materialgroup`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public getglobalbev() {
    return this.http.get(`${this.apiGatewayUrl}globalbevcat`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }


  public getlocalcat() {
    return this.http.get(`${this.apiGatewayUrl}localcat`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public getbaseunit() {
    return this.http.get(`${this.apiGatewayUrl}baseunit`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }

  public brandssub(data={}) {
    return this.http.post(`${this.apiGatewayUrl}brandsub`,data).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }




  public brandslead(data={}) {
    return this.http.post(`${this.apiGatewayUrl}brandslead`,data).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }


  public mapFG_1(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}mapFG_1`, data);
  }


  public mapFG(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}mapFG`, data);
  }


  



  public getpacktype() {
    return this.http.get(`${this.apiGatewayUrl}packtype`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }


  public getMaterial_second() {
    return this.http.get(`${this.apiGatewayUrl}material_second`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }



  public getsnpplanner() {
    return this.http.get(`${this.apiGatewayUrl}snp_planner`).pipe(
      map((AlcP: any) => {
        return AlcP.map((AlcP) => {
          return {name: AlcP, isChecked: false};
        });
      })
    );
  }



  







  public getSubbrand() {
    return this.http.get(`${this.apiGatewayUrl}subBrand`).pipe(
      map((subBrand: any) => {
        return subBrand.map((subBrand) => {
          return {name: subBrand, isChecked: false};
        });
      })
    );
  }




  public getSegments() {
    return of([
      {
        name: 'Mule',
        isChecked: false
      },
      {
        name: 'Mad Bull',
        isChecked: false
      },
      {
        name: 'Jack Rabbit',
        isChecked: false
      },
      {
        name: 'Horse',
        isChecked: false
      }
    ]);
    // return this.http.get('', {});
  }

  public getPacks() {
    return of([
      {
        name: 'CAN',
        isChecked: false
      },
      {
        name: 'TIN',
        isChecked: false
      },
      {
        name: 'Bottle',
        isChecked: false
      },
    ]);
    // return this.http.get('', {});
  }

  public getPlants() {
    return this.http.get(`${this.apiGatewayUrl}plants`).pipe(
      map((items: any) => {
        return items.map((item) => {
          return {name: item, isChecked: false, isFiltered: true };
        });
      })
    );
  }

  public getCustomerPlanningGroup() {
    return this.http.get(`${this.apiGatewayUrl}cpg`).pipe(
      map((items: any) => {
        return items.map((item) => {
          return {name: item, isChecked: false, isFiltered: true};
        });
      })
    );
  }





  public getSkUList1(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}changedfilterSKU`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: false,
            isChecked: false,
          };
        });
      })
    );
  }



  // public getSkUList12(data = {}) {
  //   return this.http.post(`${this.apiGatewayUrl}changedfilterSKU2`, data).pipe(
  //     map((items: any) => {
  //       return items.map((item, index) => {
  //         return {
  //           id: index,
  //           name: item,
  //           isFiltered: false,
  //           isChecked: false,
  //         };
  //       });
  //     })
  //   );
  // }


  public getSkUList12(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}changedfilterSKU2`, data);
  }




  public getCPGList2(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}changedfilterSKU`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: false,
            isChecked: false,
          };
        });
      })
    );
  }




  public getForecastingGroup(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}forecastinggroup`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: false,
            isChecked: false,
          };
        });
      })
    );
  }


  // public getForecastingGroup(data = {}) {
  //   return this.http.post(`${this.apiGatewayUrl}forecastingGroup12`, data);
  // }


  

  public getFilters() {
    return this.http.get(`${this.apiGatewayUrl}filters`).pipe(
      map((data: any) => {
        for (const filter of data.filters) {
          filter.isExpanded = false;
        }
        return data;
      })
    );
  }

  public getEvents() {
    return of([
      {
        name: 'Holidays',
        isChecked: false
      },
      {
        name: 'Major Support Event',
        isChecked: false
      },
      {
        name: 'Festival',
        isChecked: false
      },
      {
        name: 'Worldcup',
        isChecked: false
      },
      {
        name: 'Other support Events',
        isChecked: false
      },
    ]);
    // return this.http.get('', {});
  }

  public getWeathers() {
    return of([
      {
        name: 'Average Temperature',
        isChecked: false
      },
      {
        name: 'Seasonality',
        isChecked: false
      },
    ]);
    // return this.http.get('', {});
  }

  public getGraphData(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable`, data);
  }

  public getGraphData_L(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_L`, data);
  }


  public getGraphData_L_month(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_L_month`, data);
  }



  public getGraphData_ppu_month(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_PPU_monthly`, data);
  }

  public getGraphData_week_ppu(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_PPU`, data);
  }





  public getGraphData_bot_month(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_BOT_monthly`, data);
  }

  public getGraphData_week_bot(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_BOT`, data);
  }




  public getGraphData_pal(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_PAL`, data);
  }


  public getGraphData_pal_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_PAL_monthly`, data);
  }








  public getGraphData_cu(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_CU`, data);
  }


  public getGraphData_hlv(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_HLV`, data);
  }


  public getGraphData_cu_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_CU_monthly`, data);
  }



  public getGraphData_hlv_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_HLV_monthly`, data);
  }



  

  


  public getGraphData_week_uom(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM`, data);
  }



  public getGraphData_week_uom2(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM2`, data);
  }





  public getGraphData_week_uom3(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM3`, data);
  }






  public getGraphData_week_uom3_material(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM3_material`, data);
  }








  public getGraphData_week_uom_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM_monthly`, data);
  }


  

  public getSales(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}sales`, data);
  }

  public fetchuser(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}fetchuser`, data);
  }


  public fetchuser1(data = {}) {
    return this.http.post(`http://localhost:8080/v1/fetchuser`, data);
  }



  


  public fetchmaterialname(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}fetchmaterialname`, data);
  }





  public skuname(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}skuname`, data);
  }






  

  public adduser(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}saveuser`, data);
  }


  public deletefilter(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}deletefilter`, data);
  }




  public fetchHorizon(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}fetchHorizon`, data);
  }

  public fetchData(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}fetchdata1`, data);
  }

  public saveHorizon(data = {}) {
   
    return this.http.post(`${this.apiGatewayUrl}saveHorizon`, data);
  }





  


  public defaultnull(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}prevnull`, data);
  }


  public setdefault(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}setdefault`, data);
  }


  public savePIPOsku(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPOsku`, data);
  }

  public savePIPOsku_delete(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPOsku_delete`, data);
  }

  public savePIPOvalue(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPOvalue`, data);
  }




  public savePIPOvalue_delete(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPOvalue_delete`, data);
  }



  public savePIPOvalue_1(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPOvalue_1`, data);
  }



  public getPIPOvalue(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}getPIPOvalue`, data);
  }





  public getschedule_value(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}schedule_value`, data);
  }


  public delete_value(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}delete_value`, data);
  }




  public getPIPOMapping(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}fetchpipoMapping`, data);
  }




  
  

  public getPIPO(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}pipo`, data);
  }




  public getTradetype(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}tradetype`, data);
  }




  // PORTFOLIO
  public getforecastinggroup(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}forecastinggroup`);
  }


  public getfgid(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}forecastinggroup`);
  }



  public getanimal(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}animal_1`);
  }


  public getmaxweek(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}maxweek`);
  }
//




  public sendLog(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savelog`, data);
  }


  public getGraphData_yearly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_yearly`, data);
  }



  public getGraphData1234(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable1234`, data);
  }


  public getGraphData1234_material(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable1234_material`, data);
  }

  public getGraphData1234_detail_month(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM_month_detail`, data);
  }




  public getGraphData1234_detail_month_material(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_UOM_month_detail_material`, data);
  }




  public getDemandTable_UOM_skuview_month(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}getDemandTable_UOM_skuview_month`, data);
  }




  


  public getGraphData12345(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable12345`, data);
  }



  public download(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}download`, data);
  }

  public get3pp(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}brands`, data);
  }




  public addSKU_pipo_final(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}addSKU_pipo_final`, data);
  }


  
  


   public getGraphData_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_monthly`, data);
  }



  public getGraphData_monthly_yearly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_monthly_yearly`, data);
  }



  public savePIPO(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePIPO`, data);
  }



  

  public deleteTemp(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}deleteTempData`, data);
  }



  public getlogs(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}logs`, data);
  }


  // public getCommnents(data = {}) {
  //   return this.http.post(`${this.apiGatewayUrl}allcomments`, data);
  // }





  public getCommnents(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}allcomments`, data).pipe(
      map((items: any) => {
        return items.map((item, index) => {
          return {
            id: index,
            name: item,
            isFiltered: true,
            isChecked: true,
          };
        });
      })
    );
  }







  // public getCommnents_for_comb(data = {}) {
  //   return this.http.post(`${this.apiGatewayUrl}allcomments`, data).pipe(
  //     map((items: any) => {
  //       return items.map((item, index) => {
  //         return {
  //           id: index,
  //           name: item,
  //           isFiltered: true,
  //           isChecked: true,
  //         };
  //       });
  //     })
  //   );
  // }




  public getFeatureGraphData(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_feature_analysis`, data);
  }


  public getFeatureGraphData_monthly(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}demandTable_feature_analysis_monthly`, data);
  }

  public fetch_material_list_pipo(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}fetch_material_list_pipo`, data);
  }

  

  


  public getCPGlist(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}cpg`, data);
  }






  

  public getCPGlist2(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}changedfilterCPG`, data);
  }



  public savePlan(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}savePlanData`, data);
  }

  public confirmPlan(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}confirmPlanData`, data);
  }

  public editComment(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}editcomment`, data);
  }

  //dumdum
  public getSomeMaterialDetails(material: number) {
    return this.http.get(`${this.apiGatewayUrl}getsomematerialdetails/${material}`);
  }

  //sparks
  //dummy post request for testing
  public getSomeYoyos(data = {}) {
    return this.http.post(`${this.apiGatewayUrl}yoyoyo`, data);
  }

  public getLoadWeek(data = {}) {
    return this.http.get(`${this.apiGatewayUrl}getLoadWeek`, data);
  }

  
  public deleteuser(data={}) {
    return this.http.post(`${this.apiGatewayUrl}deleteuser`, data);
  }

  public getCVC(data={}) {
    return this.http.get(`${this.apiGatewayUrl}getCVC`, data);
  }

  public updateCVCState(data={}) {
    return this.http.post(`${this.apiGatewayUrl}updateCVCState`, data);
  }

  public checkratio(data={}) {
    return this.http.post(`${this.apiGatewayUrl}getRatio`, data);
  }

  public validateUser(data={}) {
    return this.http.post(`${this.authGatewayUrl}validateUser`, data);
  }
  
}

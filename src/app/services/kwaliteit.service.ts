import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KwaliteitBegrippenkader, KwaliteitFlat, KwaliteitAggregated } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class KwaliteitService {

  // flatJson! : KwaliteitFlat;
  //flatJson! : KwaliteitFlat[];

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<KwaliteitBegrippenkader[]> {
    return this.http.get("./assets/result.json").pipe(map((response: any) => {
      return response.data.begrippenkaders;

    }));
  }


  public getFlatJSON(selectedkaders: any): Observable<any> {
    return this.http.get("./assets/result.json").pipe(map((response: any) => {

      const flat: any = []
      const result = response.data.begrippenkaders

      result.forEach((item: any) => {
        flat.push({
          "label": item.label,
          "percentageZonderBron": Math.round(item.analyse.aantalConceptenZonderBron / item.analyse.aantalConcepten * 10000) / 100,
          "percentageZonderURIConventie": Math.round(item.analyse.aantalBegrippenDatNietVoldoetAanURIConventie / item.analyse.aantalConcepten * 10000) / 100,
          "percentageZonderDefinition": Math.round(item.analyse.aantalBegrippenZonderEenSkosDefinition / item.analyse.aantalConcepten * 10000) / 100,
          "percentageZonderStatus": Math.round(item.analyse.aantalBegrippenZonderEenStatus / item.analyse.aantalConcepten * 10000) / 100,
          "percentageZonderInScheme": Math.round(item.analyse.aantalBegrippenZonderEenSkosInScheme / item.analyse.aantalConcepten * 10000) / 100,
          "aantalBegrippenDatNietVoldoetAanURIConventie": item.analyse.aantalBegrippenDatNietVoldoetAanURIConventie,
          "aantalBegrippenZonderEenRelatedRelatie": item.analyse.aantalBegrippenZonderEenRelatedRelatie,
          "aantalBegrippenZonderEenSkosDefinition": item.analyse.aantalBegrippenZonderEenSkosDefinition,
          "aantalBegrippenZonderEenSkosInScheme": item.analyse.aantalBegrippenZonderEenSkosInScheme,
          "aantalBegrippenZonderEenStatus": item.analyse.aantalBegrippenZonderEenStatus,
          "aantalBegrippenZonderSkosPrefLabel": item.analyse.aantalBegrippenZonderSkosPrefLabel,
          "aantalBroadMatch": item.analyse.aantalBroadMatch,
          "aantalCloseMatch": item.analyse.aantalCloseMatch,
          "aantalConcepten": item.analyse.aantalConcepten,
          "aantalConceptenZonderBron": item.analyse.aantalConceptenZonderBron,
          "aantalExactMatch": item.analyse.aantalExactMatch,
          "aantalNarrowMatch": item.analyse.aantalNarrowMatch,
          "aantalRelatedMatch": item.analyse.aantalRelatedMatch,
          "aantalUniekeBronnen": item.analyse.aantalUniekeBronnen,
          "aantalUniekeBronnenWatEenDctBibliographicResourceIs": item.analyse.aantalUniekeBronnenWatEenDctBibliographicResourceIs,
          "doelVastgelegd": item.analyse.doelVastgelegd,
          "doelgroepVastgelegd": item.analyse.doelgroepVastgelegd,
          "uri": item.analyse.uri,
        })});

      if (selectedkaders.length > 0) {
        var filtered = flat.filter(function (item: any) { return (selectedkaders.indexOf(item.label) !== -1) })
      }
      else { var filtered = flat; }
      ;
      console.log(filtered)
      return filtered
    }
    ))
  };


  public getAggregatedJSON(selectedkaders: any): Observable<any>{

    return this.http.get("./assets/result.json").pipe(map((response: any) => {
 
    //return this.getFlatJSON(selectedkaders).subscribe(response => {
      const result = response.data.begrippenkaders

      if (selectedkaders.length > 0) {
        var resultfiltered = result.filter(function (item: any) { return (selectedkaders.indexOf(item.label) !== -1) })
      }
      else { var resultfiltered = result; }
      ;

    const aggregated: KwaliteitAggregated = {percentageMetBron: 0,percentageMetURIConventie: 0,percentageMetStatus: 0,percentageMetInScheme:0}
   // const result = response.data.begrippenkaders
    const percentageZonderBronArr: any = []
    const percentageZonderURIConventieArr: any = []
    const percentageZonderStatusArr: any = []
    const percentageZonderInSchemeArr: any = []

    const aantalConcepten: any = []
    const aantalConceptenZonderBron: any = []
    const aantalBegrippenDatNietVoldoetAanURIConventie: any = []
    const aantalBegrippenZonderEenStatus: any = []
    const aantalBegrippenZonderEenSkosInScheme: any = []

    resultfiltered.forEach((element:any) => {
      aantalConcepten.push(element.analyse.aantalConcepten)
      aantalConceptenZonderBron.push(element.analyse.aantalConceptenZonderBron)
      aantalBegrippenDatNietVoldoetAanURIConventie.push(element.analyse.aantalBegrippenDatNietVoldoetAanURIConventie)
      aantalBegrippenZonderEenStatus.push(element.analyse.aantalBegrippenZonderEenStatus)
      aantalBegrippenZonderEenSkosInScheme.push(element.analyse.aantalBegrippenZonderEenSkosInScheme)

      //percentageZonderBronArr.push(Math.round(element.analyse.aantalConceptenZonderBron / element.analyse.aantalConcepten * 10000) / 100)
      //percentageZonderURIConventieArr.push(Math.round(element.analyse.aantalBegrippenDatNietVoldoetAanURIConventie / element.analyse.aantalConcepten * 10000) / 100)
      //percentageZonderStatusArr.push( Math.round(element.analyse.aantalBegrippenZonderEenStatus / element.analyse.aantalConcepten * 10000) / 100)
      //percentageZonderInSchemeArr.push(Math.round(element.analyse.aantalBegrippenZonderEenSkosInScheme / element.analyse.aantalConcepten * 10000) / 100)
    });
    
    const reducer = (previousValue: any, currentValue: any) => previousValue + currentValue;



    aggregated.percentageMetBron =(((aantalConcepten.reduce(reducer)- aantalConceptenZonderBron.reduce(reducer)) /aantalConcepten.reduce(reducer)) *100)
    aggregated.percentageMetURIConventie =(((aantalConcepten.reduce(reducer)- aantalBegrippenDatNietVoldoetAanURIConventie.reduce(reducer)) /aantalConcepten.reduce(reducer)) *100)
    aggregated.percentageMetStatus =(((aantalConcepten.reduce(reducer)- aantalBegrippenZonderEenStatus.reduce(reducer)) /aantalConcepten.reduce(reducer)) *100)
    aggregated.percentageMetInScheme =(((aantalConcepten.reduce(reducer)- aantalBegrippenZonderEenSkosInScheme.reduce(reducer)) /aantalConcepten.reduce(reducer)) *100)

    //aggregated.percentageMetBron = 100 - (percentageZonderBronArr.reduce(reducer)/percentageZonderBronArr.length)
    //aggregated.percentageMetURIConventie = 100 - (percentageZonderURIConventieArr.reduce(reducer)/percentageZonderURIConventieArr.length)
    //aggregated.percentageMetStatus = 100 - (percentageZonderStatusArr.reduce(reducer)/percentageZonderStatusArr.length)
    //aggregated.percentageMetInScheme = 100 - (percentageZonderInSchemeArr.reduce(reducer)/percentageZonderInSchemeArr.length)
    
   
    console.log(aggregated)
    return aggregated

    //console.log(aggregated)
     // return result
    }))
    

  
  }


}

export interface Analyse {
    aantalBegrippenDatNietVoldoetAanURIConventie: number;
    aantalBegrippenZonderEenRelatedRelatie: number;
    aantalBegrippenZonderEenSkosDefinition: number;
    aantalBegrippenZonderEenSkosInScheme: number;
    aantalBegrippenZonderEenStatus: number;
    aantalBegrippenZonderSkosPrefLabel: number;
    aantalBroadMatch: number;
    aantalCloseMatch: number;
    aantalConcepten: number;
    aantalConceptenZonderBron: number;
    aantalExactMatch: number;
    aantalNarrowMatch: number;
    aantalRelatedMatch: number;
    aantalUniekeBronnen: number;
    aantalUniekeBronnenWatEenDctBibliographicResourceIs: number;
    doelVastgelegd: boolean;
    doelgroepVastgelegd: boolean;
    uri: string;
}

export interface KwaliteitBegrippenkader {
    label: string;
    analyse: Analyse ;
}

export interface KwaliteitFlat {
    label: string;
    percentageZonderBron: number ;
    percentageZonderURIConventie: number ;
    percentageZonderDefinition: number ;
    percentageZonderStatus: number ;
    percentageZonderInScheme: number ;
    aantalBegrippenDatNietVoldoetAanURIConventie: number;
    aantalBegrippenZonderEenRelatedRelatie: number;
    aantalBegrippenZonderEenSkosDefinition: number;
    aantalBegrippenZonderEenSkosInScheme: number;
    aantalBegrippenZonderEenStatus: number;
    aantalBegrippenZonderSkosPrefLabel: number;
    aantalBroadMatch: number;
    aantalCloseMatch: number;
    aantalConcepten: number;
    aantalConceptenZonderBron: number;
    aantalExactMatch: number;
    aantalNarrowMatch: number;
    aantalRelatedMatch: number;
    aantalUniekeBronnen: number;
    aantalUniekeBronnenWatEenDctBibliographicResourceIs: number;
    doelVastgelegd: boolean;
    doelgroepVastgelegd: boolean;
    uri: string;
} 


export interface KwaliteitAggregated { 
    percentageMetBron: number;
    percentageMetInScheme: number ;
    percentageMetURIConventie: number ;
    percentageMetStatus: number 
}

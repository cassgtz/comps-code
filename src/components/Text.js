/**
 
    This file contains all the text that is rendered on the webpages
    
 */
import React from "react";

export function DisplayRecommendationsText(){
    return <p style={{width: '350px', display:'flex', textAlign:'center', color: "white", fontSize: '15px', fontFamily: 'helvetica'}}>
        Looks like you havent met your recommended intake for these micronutrients. Click on each to see their food sources.
        </p>;
}

export function AllVitaminsMetText(){
    return <p>You've met your recommended intake value for all vitamins!</p>;
}

export function ToggleExplanation(){
    return <i style={{width: '270px', display:'flex', textAlign:'center', color: "grey", fontSize: '11px', fontFamily: 'helvetica'}}>
        "Check for ALL" based on nutrition labels that are only required to show specfic micronutrients indicating a potwntial limitation of accuracy
        </i>;
                  
}

export function AppDescription(){
    return(
        <div style={{justifyContent: 'center', display:'flex', alignItems: 'center', paddingTop: '50px', paddingBottom:'50px'}}>
                <small style={{width: '350px', display:'flex', textAlign:'center', color: "white", fontSize: '20px', fontFamily: 'helvetica'}}>
                    Scan your grocery items to analyze what micronutrients are lacking in your grocery haul</small>
              </div>
    );
}

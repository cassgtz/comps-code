/**
 
    This file contains all the text that is rendered on the webpages--ready to export

 */
import React from "react";

// Rendered in the food recommendations page to explain what is being shown to user
export function DisplayRecommendationsText(){
    return <p style={{width: '350px', display:'flex', textAlign:'center', color: "white", fontSize: '15px', fontFamily: 'helvetica'}}>
        Looks like you havent met your recommended intake for these micronutrients. Click on each to see their food sources.
        </p>;
}

// Rendered if user has met their recommended intake values -- no recommendations
export function AllVitaminsMetText(){
    return <p>You've met your recommended intake value for all vitamins!</p>;
}

// Explanation of the toggle for "Check all"
export function ToggleExplanation(){
    return <i style={{width: '270px', display:'flex', textAlign:'center', color: "grey", fontSize: '11px', fontFamily: 'Arial, sans-serif'}}>
        "Check for ALL" based on nutrition labels that are only required to show specfic micronutrients indicating a potwntial limitation of accuracy
        </i>;
                  
}

// Rendered on starting page to summarize the app & it's purpose
export function AppDescription(){
    return(
        <div style={{justifyContent: 'center', display:'flex', alignItems: 'center', paddingTop: '0px', paddingBottom:'70px'}}>
                <small style={{width: '350px', display:'flex', textAlign:'center', color: "black", fontSize: '18px', fontFamily: 'Arial, sans-serif'}}>
                    Scan your grocery items to analyze what micronutrients you are lacking in your grocery haul!</small>
              </div>
    );
}

// Rendered while fetching nutritional data after clicking done button / before recommendations are ready
export function Loading(){
    return(
        <p style={{color:'white'}}> Loading.... </p>
    );
}

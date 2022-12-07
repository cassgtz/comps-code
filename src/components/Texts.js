/**
 
    This file contains all the text that is rendered on the webpages--ready to export

 */
import React from "react";
import * as Icon from 'react-feather';

// Rendered in the food recommendations page to explain what is being shown to user
export function DisplayRecommendationsText(){
    return (
        <div style={{borderWidth: '3px', borderStyle: 'solid', borderColor: '#38b6ff', backgroundColor: 'white', alignContent: "center", alignItems: "center"}}>
            <p style={{width: '350px', paddingRight: '5px', paddingLeft: '5px', display:'flex', textAlign:'center', color: "black", fontSize: '15px', fontFamily: 'helvetica'}}>
                Looks like you're not getting enough of the micronutrients shown below. Click on each to see what foods are high in the micronutrient! 
            </p>
            <p style={{width: '350px', paddingRight: '5px', paddingLeft: '5px', display:'flex', textAlign:'center', color: "grey", fontSize: '13px', fontFamily: 'helvetica'}}>
            (Foods are listed in order of highest to lowest content of the micronutrient.)
            </p>
        </div>
    );
}

// Rendered if user has met their recommended intake values -- no recommendations
export function AllNutrientsMetText(){
    return <p>You've met your recommended intake value for all vitamins!</p>;
}

// Explanation of the toggle for "Check all"
export function ToggleExplanation(){
    return <i style={{width: '190px',paddingLeft:'15px', display:'flex', textAlign:'justify', color: "grey", fontSize: '11px', fontFamily: 'Arial, sans-serif'}}>
        Check for vitamins on top of the 4 micronutrients that are legally required on nutrition labels (Vitamin D, Iron, Calcium, & Potassium). 
        The constraint on vitamin data entails a potential limitation of accuracy. 
        </i>;
                  
}

// Rendered on starting page to summarize the app & it's purpose
export function AppDescription(){
    return(
        <div style={{justifyContent: 'center', display:'flex', alignItems: 'center', paddingBottom:'50px'}}>
            <p style={{width: '305px', display:'flex', textAlign:'center', color: "#28282B", fontSize: '18px', fontFamily: 'Arial, sans-serif'}}>
                Scan all your grocery items to analyze what micronutrients you aren't getting enough of + our recommendations of foods to buy! 
            </p>
        </div>
    );
}

// Rendered while fetching nutritional data after clicking done button / before recommendations are ready
export function Loading(){
    return(
        <div style={{display: "flex", flexDirection:"column", alignItems: "center",justifyContent: "center"}}>
            <div>
                <Icon.Loader color="white"/>
            </div>
            <div>
                <p style={{ float: 'left', color: "white", fontSize: '20px', fontFamily: 'Arial, sans-serif'}}> 
                    LOADING
                </p>
            </div>
        </div>
    );
}

// Label for the toggle switch on start page
export function CheckAllSwitch(){
    return(
        <p style={{margin: '0px', textAlign:'left', fontSize: '14px', fontFamily: 'helvetica'}}> 
            Check for ALL vitamins
        </p>
    );
}

// Rendered on recommendation page if user toggles "check for all" to remind them of the accuracy limitation
export function AccuracyReminder(){
    return(
        <p style={{maxWidth: '350px', color: 'white', textAlign:'center', fontSize: '12px', paddingBottom: '20px', paddingTop: '10px', paddingLeft:'9px'}}> 
            Disclaimer: Since vitamins (with the exception of Vitamin D, Calcium, Iron, & Potassium) are optionally listed on nutrition labels, 
            their data constraints entail a potential limitation of accuracy.
        </p>
    );
}

// User disclaimer: rendered on start page to distinguish target users 
export function UserDisclaimer(){
    return(
        <p style={{maxWidth: '350px', color: 'white', fontSize: '13px', paddingBottom: '30px', display:'flex', textAlign:'center',}}> 
            DISCLAIMER: Calculations based recommended intake values for persons ages 19-50. Not intended for those pregnant, lactating, or with any other special dietary needs. 
        </p>
    );
}

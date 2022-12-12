/**
 
    This file takes in the scanned items' barcodes & fetches their nutritional information. It also handles the determination of 
    the grocery haul's nutritional values meeting that of the user's recommended intake values, based on factors passed in from 
    the StartPage as props. 
    This component returns the list of missing nutrients. 

 */
import React, { Component } from "react";
import ListContainer from "./ListContainer";
import { AllNutrientsMetText, DisplayRecommendationsText, Loading, AccuracyReminder } from "./Texts";

export default class MissingNutrients extends Component{

    state={
        loading: true,
        checkedAll: this.props.checkedAll,
        missing_nutrients: [],
        filtered_missing_nutrients: [],
    };

    async componentDidMount(){

        /**
            SET ALL VARIABLES
         */
        
        // API credentials & set up for Edamam API 
        // REPLACE BOTH WITH YOUR EDAMAM CREDENTIALS
        const app_ID = '4919b9fe'
        const api_key = '54d44224aed9410f8c1ea485afe7c71c'

        // Nutrients required in nutrition lables -- if user does not check "check for ALL"
        const requiredNutrients = ["Vitamin D", "Calcium", "Iron", "Potassium"];
        
        // Store recommended daily intake values
        // value linked to nutrient by matching its index to the correlating nutrient's index in the 'nutrient_keys' array
        var male_rec_values = [900, 1.2, 1.3, 16, 1.3, 2.4, 90, 15, 15, 120, 1000, 8, 4700, 400];
        var female_rec_values = [700, 1.1, 1.1, 14, 1.3, 2.4, 75, 15, 15, 90, 1000, 18, 4700, 400];

        // Array of nutrients in query form --- used to search for the nutroent in the JSON object returned by the API
        // This is how the nutrients are represented in the Edamam database. -- linked to nutrient by index number in 'nutrient_keys'
        var nutrients_query_list = ['VITA_RAE', 'THIA', 'RIBF', 'NIA', 'VITB6A', 'VITB12', 'VITC', 'VITD', 'TOCPHA', 'VITK1', 'FOLAC', 'FOLDFE', 'FOLFD', 'CA', 'FE', 'K'];
        
        // Create a dictionary of nutrient (key) & amount in scanned items (value)
        var nutrient_values = new Map();
        var nutrient_keys = ["Vitamin A", "Thiamin", "Riboflavin", "Niacin", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Iron", "Potassium", "Vitamin B9"];
        // Initialize all values to 0 in order to handle nulls when fetching an item that's not in the DB
        for(var j = 0; j < nutrient_keys.length; j++){ 
            nutrient_values.set(nutrient_keys[j], 0); 
        }

        /**
            DEFINE FUNCTIONS 
         */

        // Function to add all the nutrient values of 1 item to our dictionary
        function addNutrients(obj, nutrients_query_list){
            for (var i = 0; i < nutrient_keys.length; i++) {
                // handle B9 -- it takes 3 query keys. Add them together, then set. 
                if (i === 13) {
                    var B9_total = nutrient_values.get(nutrient_keys[i]) + getNutrientValue(obj, 'FOLAC') + getNutrientValue(obj, 'FOLDFE') + getNutrientValue(obj, 'FOLFD');
                    nutrient_values.set(nutrient_keys[i], B9_total);
                }
                else {
                    var new_value = nutrient_values.get(nutrient_keys[i]) + getNutrientValue(obj, nutrients_query_list[i]);
                    nutrient_values.set(nutrient_keys[i], new_value);
                }
            }
        }

        // Function to search for a vitamin's value from json object returned by the API
        // if null or not found, return 0
        function getNutrientValue(obj, key){
            const value = obj['hints'][0]['food']['nutrients'][key];
            if (value) {
                return Number(value);
            }
            else{
                return 0;
            }
         }
        
        // Function to create the list of the nutrients whose total value do not meet the user's recommended intake
        function getMissingNutrients(){
            //Based on user's sex:
                //compare total nutrient value from dictionary to the recommended intake value
                //if it's below, add to list of missing nutrients
            if (this.props.sex === "Male"){
                for (var k = 0; k < nutrient_keys.length; k++) {
                    if (nutrient_values.get(nutrient_keys[k] < male_rec_values[k])) {
                        this.state.missing_nutrients.push(nutrient_keys[k]);
                    }
                }
            }
            else {
                for (var s = 0; s < nutrient_keys.length; s++) {
                    if (nutrient_values.get(nutrient_keys[s] < female_rec_values[s])) {
                        this.state.missing_nutrients.push(nutrient_keys[s]);
                    }
                }
            }

            // Create list of missing REQUIRED nutrients -- if user did not check "check for ALL"
            this.state.filtered_missing_nutrients = this.state.missing_nutrients.filter(missing => requiredNutrients.includes(missing));
        }

        /**
          
            GET ALL NUTRIENT VALUES FOR EACH SCANNED ITEM

         */

        // Loop through the list of scanned barcodes & fetch its data from Edamamm API 
        for (var i = 0; i < this.props.barcodeArray.length; i++) { 
            // send API request
            var GETurl = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + api_key + "&upc=" + this.props.barcodeArray[i] + "&nutrition-type=cooking";
            const response = await fetch(GETurl);
            // check if a response returned
            if (response.ok) {
                var data = await response.json();
                // Add nutrient values to our dicto]ionary
                addNutrients(data, nutrients_query_list);
            }
        }

        // Get list of nutrients that do not meet recommended intake value
        getMissingNutrients();
        this.setState({loading: false});
    }


    render(){
        /**
            Render page of recommendations: 
                - If the user checked "check for ALL", return a reminder of accuracy constraints
                - Text of content description
                - List of missing nutrient + benefits + food sources
         */
        return(
            <div>
                {this.state.loading ? ( <Loading/> ) : (
                    <div style = {{height: 'auto', paddingTop: '30px', display: 'flex', flexDirection: 'column'}}>
                        {this.state.checkedAll !== 0 ? <AccuracyReminder/> : null}
                        {this.state.missing_nutrients.length !== 0 ?
                            <div>
                                <DisplayRecommendationsText/>
                                <div style = {{paddingTop: '20px', paddingBottom: '20px'}}>
                                    <ListContainer
                                        // pass in list of missing nutrienst based on if user checked "check for ALL"
                                        missing_nutrients = {this.state.checkedAll !== 0 ? this.state.missing_nutrients : this.state.filtered_missing_nutrients}
                                    />
                                </div>
                            </div> 
                        : <AllNutrientsMetText/>}
                    </div>
                )}
            </div>
        );
    }
}
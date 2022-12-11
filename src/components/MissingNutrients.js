/**
 
    This file takes in the scanned items' barcodes & fetches their nutritional information. It also handles the determination of 
    the grocery haul's nutritional values meeting that of the user's recommended intake values, based on factors passed in from 
    props. 
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
            SET VARIABLES
         */
        
        // API credentials & set up for Edamam API
        const app_ID = '4919b9fe'
        const api_key = '54d44224aed9410f8c1ea485afe7c71c'

        // Recommended intake values 
        var male_rec_values = [900, 1.2, 1.3, 16, 1.3, 2.4, 90, 15, 15, 120, 1000, 8, 4700, 400];
        var female_rec_values = [700, 1.1, 1.1, 14, 1.3, 2.4, 75, 15, 15, 90, 1000, 18, 4700, 400];

        // Array of nutrients in query form
        var nutrients_query_list = ['VITA_RAE', 'THIA', 'RIBF', 'NIA', 'VITB6A', 'VITB12', 'VITC', 'VITD', 'TOCPHA', 'VITK1', 'FOLAC', 'FOLDFE', 'FOLFD', 'CA', 'FE', 'K'];
        
        // Create a dictionary of nutrient (key) & their quantities (value)
        var nutrient_values = new Map();
        var nutrient_keys = ["Vitamin A", "Thiamin", "Riboflavin", "Niacin", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Iron", "Potassium", "Vitamin B9"];
        // Initialize all key values to 0 to handle nulls when fetching item that's not in the API BD
        for(var j = 0; j < nutrient_keys.length; j++){ 
            nutrient_values.set(nutrient_keys[j], 0); 
        } 

        // Function to add all the nutrient values of 1 item to our dictionary
        function addNutrients(obj, nutrients_query_list){
            for (var i = 0; i < nutrient_keys.length; i++) {
                // handle B9, it takes 3 query keys
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
        // get its value & return as a number 
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


        for (var i = 0; i < this.props.barcodeArray.length; i++) { 
            // send API request
            var GETurl = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + api_key + "&upc=" + this.props.barcodeArray[i] + "&nutrition-type=cooking";
            const response = await fetch(GETurl);
            // check if a response returned
            if (response.ok) {
                var data = await response.json();
                // Add all vitamins 
                addNutrients(data, nutrients_query_list);
            }
        }

        // Get missing vitamins (vitaminS with value 0)
        this.state.missing_nutrients = [...nutrient_values.entries()]
        .filter(({ 1: v }) => v === 0)
        .map(([k]) => k);

        // Get deficient vitamins
        if (this.props.sex === "Male"){
            for (var k = 0; k < nutrient_keys.length; k++) {
                //get vitamin value from map
                //compare to recommended value
                if (nutrient_values.get(nutrient_keys[k] < male_rec_values[k])) {
                    // if its below, add to missing_nutrients
                    this.state.missing_nutrients.push(nutrient_keys[k]);
                }
            }
        }
        else {
            // repeat for female values
            for (var s = 0; s < nutrient_keys.length; s++) {
                if (nutrient_values.get(nutrient_keys[s] < female_rec_values[s])) {
                    this.state.missing_nutrients.push(nutrient_keys[s]);
                }
            }
        }
        // Create the list of 
        const requiredNutrients = ["Vitamin D", "Calcium", "Iron", "Potassium"];
        this.state.filtered_missing_nutrients = this.state.missing_nutrients.filter(missing => requiredNutrients.includes(missing));
        this.setState({loading: false});
    }


    render(){
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
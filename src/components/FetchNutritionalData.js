import React, {Component} from "react";
import ListContainer from "./ListContainer";
import { AllVitaminsMetText, DisplayRecommendationsText } from "./Texts";


export default class FetchNutritionalData extends Component{

    state={
        loading: true,
        checkedAll: this.props.checkedAll,
        missing_vitamins: [],
        filtered_missing_vitamins: [],
    };


    async componentDidMount(){

        // API credentials & set up for Edamam API
        const app_ID = '4919b9fe'
        const api_key = '54d44224aed9410f8c1ea485afe7c71c'

        /*
        // minerals:
        var zinc = 0; // ZN
        var phosphorus = 0; // P
        var magnesium = 0; // MG
        var potassium = 0; // K
        var iron = 0; // FE
        */

        // SET VARIABLES

        // array of vitamins in query form
        var vit_query_list = ['VITA_RAE', 'THIA', 'RIBF', 'NIA', 'VITB6A', 'VITB12', 'VITC', 'VITD', 'TOCPHA', 'VITK1', 'FOLAC', 'FOLDFE', 'FOLFD'];
        // create a dictionary of vitamin (key) & their quantities (value)
        var vitamin_values = new Map();
        var vitamin_keys = ["Vitamin A", "Thiamin", "Riboflavin", "Niacin", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Vitamin B9"];
        var male_rec_values_mcg = [900, 1200, 1300, 1600, 1300, 2.4, 90000, 15, 1500, 120, 400];
        var female_rec_values_mcg = [700, 1100, 1100, 1400, 1300, 2.4, 75000, 15, 1500, 90, 400];
        // handle nulls in queries -> initialize everything to 0
        for(var j = 0; j < vitamin_keys.length; j++){ 
            vitamin_values.set(vitamin_keys[j], 0); 
        } 

        // set vitamin values
        // add the vitmain value to existing value in dictionary
        function addVitamins(obj, vit_query_list){
            for (var i = 0; i < vitamin_keys.length; i++) {
                // handle B9, it takes 3 query keys
                if (i === 10) {
                    var B9_total = vitamin_values.get(vitamin_keys[i]) + getVitaminValue(obj, 'FOLAC') + getVitaminValue(obj, 'FOLDFE') + getVitaminValue(obj, 'FOLFD');
                    vitamin_values.set(vitamin_keys[i], B9_total);
                }
                else {
                    var new_value = vitamin_values.get(vitamin_keys[i]) + getVitaminValue(obj, vit_query_list[i]);
                    vitamin_values.set(vitamin_keys[i], new_value);
                }
            }
        }

        // look for vitamin in the json object
        // get its value & return as a number 
        // if null or not found, return 0
        function getVitaminValue(obj, key){
            const value = obj['hints'][0]['food']['nutrients'][key];
            console.log(key + value);
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
                console.log("API response:");
                console.log(data);
                // Add all vitamins 
                addVitamins(data, vit_query_list);
            }
        }

        console.log("Updated:");
        console.log([...vitamin_values.entries()]);


        // Get missing vitamins (vitaminS with value 0)
        this.state.missing_vitamins = [...vitamin_values.entries()]
        .filter(({ 1: v }) => v === 0)
        .map(([k]) => k);

        // Get deficient vitamins
        if (this.props.sex === "Male"){
            for (var k = 0; k < vitamin_keys.length; k++) {
                //get vitamin value from map
                //compare to recommended value
                if (vitamin_values.get(vitamin_keys[k] < male_rec_values_mcg[k])) {
                    // if its below, add to missing_vitamins
                    this.state.missing_vitamins.push(vitamin_keys[k]);
                }
            }
        }
        else {
            // repeat for female values
            for (var s = 0; s < vitamin_keys.length; s++) {
                if (vitamin_values.get(vitamin_keys[s] < female_rec_values_mcg[s])) {
                    // if its below, add to missing_vitamins
                    this.state.missing_vitamins.push(vitamin_keys[s]);
                }
            }
        }

        const requiredVitamins = ["Vitamin D"];
        this.state.filtered_missing_vitamins = this.state.missing_vitamins.filter(missing => requiredVitamins.includes(missing));
        this.setState({loading: false});
    }


    render(){
        return (
            <div >
                {this.state.loading ? (<div><p style={{color:'white'}}>Loading....</p></div>) : (
                    /*
                    <div>
                        <Recommendations
                        missing_vitamins={this.state.missing_vitamins}
                        checkAll={this.state.checkedAll}
                        filtered_missing_vitamins={this.state.filtered_missing_vitamins}
                        />
                    </div>*/
                    <div style = {{height: 'auto', display: 'flex', flexDirection: 'column'}}>
                    {this.state.missing_vitamins.length !== 0 ?
                        <div>
                            <DisplayRecommendationsText/>
                            <ListContainer
                                missing_vitamins = {this.state.checkedAll !== 0 ? this.state.missing_vitamins : this.state.filtered_missing_vitamins}
                            />
                        </div> : < AllVitaminsMetText/>}
                    </div>
                )}
            </div>
        );
    }
}
import React, {Component} from "react";


export default class GetNutritionalData extends Component{

    state={
        loading: true,
        total_vitamin_A: 0,
        total_thiamin: 0,
        total_riboflavin: 0,
        total_niacin:0,
        total_B5: 0,
        total_B6: 0,
        total_B12: 0,
        total_B9: 0,
        total_biotin: 0,
        total_vitamin_C: 0,
        total_choline: 0,
        total_vitamin_D: 0,
        total_vitamin_E: 0,
        total_vitamin_K: 0
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

        // array of vitamins in query form
        var vit_query_list = ['VITA_RAE', 'THIA', 'RIBF', 'NIA', 'VITB6A', 'VITB12', 'VITC', 'VITD', 'TOCPHA', 'VITK1', 'FOLAC', 'FOLDFE', 'FOLFD'];

        // create a dictionary of vitamin (key) & their quantities (value)
        var vitamin_map = new Map();
        var vitamin_keys = ["vitamin_A", "thiamin", "riboflavin", "niacin", "B6", "B12", "vitamin_C", "vitamin_D", "vitamin_E", "vitamin_K", "B9"];
        var male_rec_values_mcg = [900, 1200, 1300, 1600, 1300, 2.4, 90000, 15, 1500, 120, 400];
        var female_rec_values_mcg = [700, 1100, 1100, 1400, 1300, 2.4, 75000, 15, 1500, 90, 400];
        // initialize everything to 0 to handle nulls in queries
        for(var j = 0; j < vitamin_keys.length; j++){ 
            vitamin_map.set(vitamin_keys[j], 0); 
        } 

        // set vitamin values
        // add the vitmain value to existing value in dictionary
        function addVitamins(obj, vit_query_list){
            for (var i = 0; i < vitamin_keys.length; i++) {
                // handle B9, it takes 3 query keys
                if (i === 10) {
                    var B9_total = vitamin_map.get(vitamin_keys[i]) + getVitaminValue(obj, 'FOLAC') + getVitaminValue(obj, 'FOLDFE') + getVitaminValue(obj, 'FOLFD');
                    vitamin_map.set(vitamin_keys[i], B9_total);
                }
                else {
                    var new_value = vitamin_map.get(vitamin_keys[i]) + getVitaminValue(obj, vit_query_list[i]);
                    vitamin_map.set(vitamin_keys[i], new_value);
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
                console.log(data);

                // Add all vitamins 
                addVitamins(data, vit_query_list);
            }
        }

        console.log("Updated:");
        console.log([...vitamin_map.entries()]);


        // Get missing vitamins (vitaminS with value 0)
        let missing_vitamins = [...vitamin_map.entries()]
        .filter(({ 1: v }) => v === 0)
        .map(([k]) => k);


        // ------------------------------------------------------------------------

        // Get deficient vitamins
        if (this.sex === "Male"){

            for (var k = 0; k < vitamin_keys.length; k++) {
                
            }
            

            


        }
        else {

        }


        // Recommendations
        // HERE HANDLE THE OPTION OF ONLY CHECKING FOR WHAT LABELS REQUIRE
        // ONLY CHECK IF MISSING_VITMAINS INCLUDES THOSE 
        if (missing_vitamins.includes('vitamin_A')){

        }


        //this.setState({total_carbs: this.state.total_carbs + carbs, total_protein: this.state.total_protein + protein, total_fat: this.state.total_fat + fat});
        this.setState({loading: false});
    }


render(){
    return (
        <div>
            {this.state.loading ? (
                <div>Loading....</div>
            ) : (
                <div>
                    <ul>
                        <li>Biotin: {this.state.total_biotin}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

}
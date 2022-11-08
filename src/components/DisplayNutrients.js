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

        //vitamins:
        var vitamin_A = 0; // VITA_RAE
        var thiamin = 0; //THIA
        var riboflavin = 0; //RIBF
        var niacin = 0; // NIA
        var B6 = 0; // VITB6A
        var B12 = 0; // VITB12
        var vitamin_C = 0; // VITC
        var vitamin_D = 0; // VITD
        var vitamin_E = 0; //TOCPHA
        var vitamin_K = 0; // VITK1
        var B9 = 0; // FOLAC & FOLDFE & FOLFD

        // minerals:
        var zinc = 0; // ZN
        var phosphorus = 0; // P
        var magnesium = 0; // MG
        var potassium = 0; // K
        var iron = 0; // FE

        // array of vitamins in query form
        var vitamins_query_list = ['VITA_RAE', 'THIA', 'RIBF', 'NIA', 'VITB6A', 'VITB12', 'VITC', 'VITD', 'TOCPHA', 'VITK1', 'FOLAC', 'FOLDFE', 'FOLFD'];

        // create a map of vitamins & their quantities
        var vitamin_map = new Map();
        var vitamin_keys = ["vitamin_A", "thiamin", "riboflavin", "niacin", "B6", "vitamin_C", "vitamin_D", "vitamin_E", "vitamin_K", "B9"];
        // initialize everything to 0
        for(var j = 0; j < vitamin_keys.length; j++){ 
            vitamin_map.set(vitamin_keys[j], 0); 
        } 

        // set vitamin values
        // add the vitmain value to existing value in map
        function addVitamins(obj, arr){
            for (var i = 0; i < vitamins_query_list.length; i++) {
                // handle B9, it takes 3 query keys
                if (i === 9) {
                    var B9_total = vitamin_map.get(vitamin_keys[i]) + getVitaminValue(obj, 'FOLAC') + getVitaminValue(obj, 'FOLDFE') + getVitaminValue(obj, 'FOLFD');
                    vitamin_map.set(vitamin_keys[i], B9_total);
                }
                else {
                    var new_value = vitamin_map.get(vitamin_keys[i]) + getVitaminValue(obj, vitamins_query_list[i]);
                    vitamin_map.set(vitamin_keys[i], new_value);
                }
            }
        }

        // look for vitamin in the json object
        // get its value & return as a number 
        // if null or not found, return 0
        function getVitaminValue(obj, key){
            const arr = obj['hints'][0];
            if(arr.length){
               const result = arr.filter(el => {
                  return el['key'] === key;
               });
               if(result && result.length){
                  return Number(result[0].value);
               }
               else{
                  return 0;
               }
            }
         }


        for (var i = 0; i < this.props.barcodeArray.length; i++) { 
            // send API request
            var GETurl = "https://api.edamam.com/api/food-database/v2/parser?app_id=" + app_ID + "&app_key=" + api_key + "&upc=" + this.props.barcodeArray[i] + "&nutrition-type=cooking";
            const response = await fetch(GETurl);
            var data = await response.json();
            console.log(data);

            // Add all vitamins 
            addVitamins(data, vitamins_query_list);



            //carbs += Number(data.product.nutriments.carbohydrates_100g);
            //protein += Number(data.product.nutriments.proteins_100g);
            //fat += Number(data.product.nutriments.fat_100g);
        }
        console.log([...vitamin_map.entries()]);

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
                        <li>Biotin: {this.state.total_biotin}</li>\
                    </ul>
                </div>
            )}
        </div>
    );
}

}
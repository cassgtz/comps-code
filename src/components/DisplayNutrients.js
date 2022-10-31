import React, {Component} from "react";


export default class GetNutritionalData extends Component{

    state={
        loading: true,
        total_carbs: 0,
        total_protein: 0,
        total_fat:0
    };


    async componentDidMount(){

        const baseURL =  "https://world.openfoodfacts.org/api/v2/product/";

        var carbs = 0;
        var protein = 0;
        var fat = 0;

        for (var i = 0; i < this.props.barcodeArray.length; i++) { 
            const response = await fetch(baseURL+this.props.barcodeArray[i]);
            var data = await response.json();
            console.log(data);

            carbs += data.product.nutriments.carbohydrates_serving;
            protein += data.product.nutriments.proteins_serving;
            fat += data.product.nutriments.fat_serving;
        }

        this.setState({total_carbs: this.state.total_carbs + carbs, total_protein: this.state.total_protein + protein, total_fat: this.state.total_fat + fat});
        this.setState({loading: false});
        console.log("carbs: " + this.state.total_carbs);
        console.log("protein: " + this.state.total_protein);
        console.log("fat: " + this.state.total_fat);

    }


render(){
    return (
        <div>
            {this.state.loading ? (
                <div>Loading....</div>
            ) : (
                <div>
                    <div>{this.state.total_carbs}</div>
                </div>
            )}
        </div>
    );
}

}
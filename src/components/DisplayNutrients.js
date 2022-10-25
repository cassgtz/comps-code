import React, {Component} from "react";



export default class GetNutritionalData extends Component{

    state={
        loading: true,
        product: null,
    };


    async componentDidMount(){

        const baseURL =  "https://world.openfoodfacts.org/api/v2/product/";

        for (var i = 0; i < this.props.barcodeArray.length; i++) { 
            const response = await fetch(baseURL+this.props.barcodeArray[i]);
            const data = await response.json();
            console.log(data);
        }

    }


render(){
    return (
        <div>
            {this.state.loading || !this.state.product ? (
                <div>Loading....</div>
            ) : (
                <div>
                    <div>Got it</div>
                </div>
            )}
        </div>
    );
}

}
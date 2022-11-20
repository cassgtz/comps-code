import React, {Component} from "react";

export default class Dropdown extends Component {
    // selectValue => current selected value
    // filterData => choices in the dropdown
    // setFilteredData => function to change the selectValue
   
    render() {
       // vitamin, foodsources
       return (
          <div className='ddown'>
             <select>
               <option hidden>{this.props.vitamin}</option>
                  {this.props.foodSources && this.props.foodSources.map(food => {
                    console.log("Mapping food sources: " + food);
                    return (
                      <option key={food.id} value={food.food}>
                        {food.food}
                      </option>
                    );
                  })}
             </select>
          </div>
        );
     }
   };
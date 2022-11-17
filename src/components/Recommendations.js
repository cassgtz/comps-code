import React, {Component} from "react";


export default class Recommendations extends Component{

    state = {
        food_sources: {
          vitamin_A: ["Beef liver", "Sweet potato (with skin)", "Spinach", "Pumpkin pie", "Carrots", "Atlantic herring", "Soft serve vanilla ice cream"],
          thiamin: ["White rice", "Breakfast cereals", "Egg noodles", "Pork chop (bone-in)", "Trout", "Black beans", "English muffin (plain)", "Mussels (blue)"],
          riboflavin: ["Beef liver", "Breakfast cereals", "Instant Oats", "Yogurt (fat free)", "Milk (2% fat)", "Beef - tenderloin steak (trimmed of fat)", "Clams", "Almonds", "Swiss cheese"],
          niacin: ["Beef liver", "Chicken Breast", "Marinara sauce", "Turkey breast", "Tuna (canned in water)", "Pork (tenderloin)", "Beef (90% lean)", "Brown rice", "Pesnuts", "Breakfast cereals"],
          B6: ["Chickpeas", "Beef liver", "Tuna (yellowfin)", "Salmon (sockeye)", "Chicken breast", "Breakfast cereals", "Potatoes", "Turkey (meat only)", "Bananas", "Marinara sauce"],
          B12: ["Beef liver", "Clams", "Tuna (bluefin)", "Nutritional yeast (fortified)", "Salmon (Atlantic)", "Beef (85% lean)", "Milk (2% fat)", "Yogurt (fat free)", "Breakfast cereals"],
          vitamin_C: ["Red peppers", "Orange juice", "Oranges", "Grapefruit juice", "Kiwifruit", "Green pepper", "Broccoli", "Strawberries", "Brussels sprouts", "Grapefruit", "Tomato juice", "Cantaloupe", "Cabbage", "Cauliflower"],
          vitamin_D: ["Cod liver oil", "Trout (rainbow)", "Salmon (sockeye)", "Mushrooms (white)"],
          vitamin_E: ["Wheat germ oil", "Sunflower seeds", "Almonds", "Sunflower oil", "Safflower oil", "Hazelnuts"],
          B9: ["Beef liver", "Spinach", "Black-eyed peas", "Breakfast cereals", "White rice", "Asparagus", "Brussels"]
        },
        requiredVitamins: ["vitamin_D"]
    };


    render() {
        return(
            <div>
                {this.missing_vitamins.map((vitamin) => (
                    <div>
                        {this.checkAll === 0 ? (
                            this.state.food_sources[vitamin].map((food) => { 
                                return <DropdownList data={food} defaultValue={vitamin}/>;
                                })
                        ) : (
                            (this.state.food_sources.includes(vitamin) ? 
                                this.state.food_sources[vitamin].map((food) => { 
                                    return <DropdownList data={food} defaultValue={vitamin}/>;
                                }) :
                                    null)
                        )}
                    </div>
                ))}
            </div>
        );
    }

}
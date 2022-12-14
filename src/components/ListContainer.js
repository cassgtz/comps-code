/** 

    This component creates a React Fragrment container for the list of missing nutrients. 
    Thif file also contains the food sources & description of benefits for each nutrient.
    The code is based on a collapsible list example from Max R.: https://medium.com/@freshmilkdev/reactjs-render-optimization-for-collapsible-material-ui-long-list-with-checkboxes-231b36892e20 

*/

import React, { Component } from "react";
import List from "./List";

class ListContainer extends Component{
    // This json object stores each nutrient's name, a short description of its benefits, & an array of its food sources. 
    state = {
        foodSources: [{
                "id": 1,
                "nutrient": "Vitamin A",
                "benefits": "Plays an important role in bone growth and in the immune system. Essential for vision & healthy skin/tissues. May lower lung and prostate cancer risk.",
                "sources": [{
                        "food": "Beef liver",
                        "id": 1
                    },
                    {
                        "food": "Sweet potato (with skin)",
                        "id": 2
                    },
                    {
                        "food": "Spinach",
                        "id": 3
                    },
                    {
                        "food": "Pumpkin pie",
                        "id": 4
                    },
                    {
                        "food": "Carrots",
                        "id": 5
                    },
                    {
                        "food": "Atlantic herring",
                        "id": 6
                    },
                    {
                        "food": "Soft serve vanilla ice cream",
                        "id": 7
                    }]
            },
            {
                "id": 2,
                "nutrient": "Thiamin",
                "benefits": "Helps convert food into energy and is critical for nerve function. Needed for healthy skin, hair, muscles, & brain.",
                "sources": [{
                        "food": "White rice",
                        "id": 1
                    },
                    {
                        "food": "Breakfast cereals (thiamin fortified)",
                        "id": 2
                    },
                    {
                        "food": "Egg noodles",
                        "id": 3
                    },
                    {
                        "food": "Pork chop (bone-in)",
                        "id": 4
                    },
                    {
                        "food": "Trout",
                        "id": 5
                    },
                    {
                        "food": "Black beans",
                        "id": 6
                    },
                    {
                        "food": "English muffin (plain)",
                        "id": 7
                    },
                    {
                        "food": "Mussels (blue)",
                        "id": 8
                    }]
            },
            {
                "id": 3,
                "nutrient": "Riboflavin",
                "benefits": "Helps convert food into energy. Needed for healthy skin, hair, blood, & brain.",
                "sources": [{
                        "food": "Beef liver",
                        "id": 1
                    },
                    {
                        "food": "Breakfast cereals (riboflavin fortified)",
                        "id": 2
                    },
                    {
                        "food": "Instant Oats",
                        "id": 3
                    },
                    {
                        "food": "Yogurt (fat free)",
                        "id": 4
                    },
                    {
                        "food": "Milk (2% fat)",
                        "id": 5
                    },
                    {
                        "food": "Beef tenderloin steak (trimmed of fat)",
                        "id": 6
                    },
                    {
                        "food": "Clams",
                        "id": 7
                    },
                    {
                        "food": "Almonds",
                        "id": 8
                    },
                    {
                        "food": "Swiss cheese",
                        "id": 9
                    }]
            },
            {
                "id": 4,
                "nutrient": "Niacin",
                "benefits": "Helps convert food into energy. Essential for healthy skin, blood cells, brain, and nervous system.",
                "sources": [{
                        "food": "Beef liver",
                        "id": 1
                    },
                    {
                        "food": "Chicken Breast",
                        "id": 2
                    },
                    {
                        "food": "Marinara sauce",
                        "id": 3
                    },
                    {
                        "food": "Turkey breast",
                        "id": 4
                    },
                    {
                        "food": "Tuna (canned in water)",
                        "id": 5
                    },
                    {
                        "food": "Pork (tenderloin)",
                        "id": 6
                    },
                    {
                        "food": "Beef (90% lean)",
                        "id": 7
                    },
                    {
                        "food": "Brown rice",
                        "id": 8
                    },
                    {
                        "food": "Peanuts",
                        "id": 9
                    },
                    {
                        "food": "Breakfast cereals (niacin fortified)",
                        "id": 10
                    }]
            },
            {
                "id": 5,
                "nutrient": "Vitamin B6",
                "benefits": "Helps create red blood cells and neurotransmitters that play key roles in sleep, appetite, and moods. Influences cognitive abilities, immune function, and may reduce the risk of heart disease.",
                "sources": [{
                        "food": "Chickpeas",
                        "id": 1
                    },
                    {
                        "food": "Beef liver",
                        "id": 2
                    },
                    {
                        "food": "Tuna (yellowfin)",
                        "id": 3
                    },
                    {
                        "food": "Salmon (sockeye)",
                        "id": 4
                    },
                    {
                        "food": "Chicken breast",
                        "id": 5
                    },
                    {
                        "food": "Breakfast cereals",
                        "id": 6
                    },
                    {
                        "food": "Potatoes",
                        "id": 7
                    },
                    {
                        "food": "Turkey (meat only)",
                        "id": 8
                    },
                    {
                        "food": "Bananas",
                        "id": 9
                    },
                    {
                        "food": "Marinara sauce",
                        "id": 10
                    }]
            },
            {
                "id": 6,
                "nutrient": "Vitamin B12",
                "benefits": "Assists in breaking down some fatty acids + amino acids. Helps make red blood cells, DNA, and may lower the risk of heart disease. Protects nerve cells and encourages their normal growth.",
                "sources": [{
                        "food": "Beef liver",
                        "id": 1
                    },
                    {
                        "food": "Clams",
                        "id": 2
                    },
                    {
                        "food": "Tuna (bluefin)",
                        "id": 3
                    },
                    {
                        "food": "Nutritional yeast (B12 fortified)",
                        "id": 4
                    },
                    {
                        "food": "Salmon (Atlantic)",
                        "id": 5
                    },
                    {
                        "food": "Beef (85% lean)",
                        "id": 6
                    },
                    {
                        "food": "Milk (2% fat)",
                        "id": 7
                    },
                    {
                        "food": "Yogurt (fat free)",
                        "id": 8
                    },
                    {
                        "food": "Breakfast cereals (B12 fortified)",
                        "id": 9
                    }]
            },
            {
                "id": 7,
                "nutrient": "Vitamin C",
                "benefits": "May lower the risk of cataracts and some cancers (those of the mouth, esophagus, stomach, & breast). Helps make collagen, serotonin, and norepinephrine. Strengthens the immune system and acts as an antioxidant, neutralizing unstable molecules that can damage cells.",
                "sources": [{
                        "food": "Red peppers",
                        "id": 1
                    },
                    {
                        "food": "Orange juice",
                        "id": 2
                    },
                    {
                        "food": "Oranges",
                        "id": 3
                    },
                    {
                        "food": "Grapefruit juice",
                        "id": 4
                    },
                    {
                        "food": "Kiwifruit",
                        "id": 5
                    },
                    {
                        "food": "Green pepper",
                        "id": 6
                    },
                    {
                        "food": "Broccoli",
                        "id": 7
                    },
                    {
                        "food": "Strawberries",
                        "id": 8
                    },
                    {
                        "food": "Brussels sprouts",
                        "id": 9
                    },
                    {
                        "food": "Grapefruit",
                        "id": 10
                    },
                    {
                        "food": "Tomato juice",
                        "id": 11
                    },
                    {
                        "food": "Cantaloupe",
                        "id": 12
                    },
                    {
                        "food": "Cabbage",
                        "id": 13
                    },
                    {
                        "food": "Cauliflower",
                        "id": 14
                    }]
            },
            {
                "id": 8,
                "nutrient": "Vitamin D",
                "benefits": "Helps maintain strong teeth/bones and prevents bone fractures. ",
                "sources": [{
                        "food": "Cod liver oil",
                        "id": 1
                    },
                    {
                        "food": "Trout (rainbow)",
                        "id": 2
                    },
                    {
                        "food": "Salmon (sockeye)",
                        "id": 3
                    },
                    {
                        "food": "Mushrooms (white)",
                        "id": 4
                    }]
            },
            {
                "id": 9,
                "nutrient": "Vitamin E",
                "benefits": "Acts as an antioxidant, neutralizing unstable molecules that can damage cells. Diets rich in vitamin E may help prevent Alzheimer's disease. ",
                "sources": [{
                        "food": "Wheat germ oil",
                        "id": 1
                    },
                    {
                        "food": "Sunflower seeds",
                        "id": 2
                    },
                    {
                        "food": "Almonds",
                        "id": 3
                    },
                    {
                        "food": "Sunflower oil",
                        "id": 4
                    },
                    {
                        "food": "Safflower oil",
                        "id": 5
                    },
                    {
                        "food": "Hazelnuts",
                        "id": 6
                    }]
            },
            {
                "id": 10,
                "nutrient": "Vitamin B9",
                "benefits": "Vital for new cell creation. Helps prevent brain and spine birth defects when taken early in pregnancy. May reduce risk of heart disease and colon cancer. Offsets breast cancer risk among women who consume alcohol.",
                "sources": [{
                        "food": "Beef liver",
                        "id": 1
                    },
                    {
                        "food": "Spinach",
                        "id": 2
                    },
                    {
                        "food": "Black-eyed peas",
                        "id": 3
                    },
                    {
                        "food": "Breakfast cereals (B9 fortified)",
                        "id": 4
                    },
                    {
                        "food": "White rice",
                        "id": 5
                    },
                    {
                        "food": "Asparagus",
                        "id": 6
                    },
                    {
                        "food": "Brussels",
                        "id": 7
                    }]
            },
            {
                "id": 11,
                "nutrient": "Calcium",
                "benefits": "Builds and protects bones + teeth. Helps with muscle contractions and relaxation, blood clotting, nerve impulse transmission, and maintaining healthy blood pressure.",
                "sources": [{
                        "food": "Yogurt (low fat)",
                        "id": 1
                    },
                    {
                        "food": "Orange juice (calcium fortified)",
                        "id": 2
                    },
                    {
                        "food": "Mozzarella (part skim)",
                        "id": 3
                    },
                    {
                        "food": "Sardines",
                        "id": 4
                    },
                    {
                        "food": "Milk (nonfat)",
                        "id": 5
                    },
                    {
                        "food": "Soymilk (calcium fortified)",
                        "id": 6
                    },
                    {
                        "food": "Milk (3.25% fat)",
                        "id": 7
                    }]
            },
            {
                "id": 12,
                "nutrient": "Iron",
                "benefits": "Helps red blood cells and muscle cells carry oxygen throughout the body. Needed for chemical reactions in the body and for making amino acids, collagen, neurotransmitters, and hormones.",
                "sources": [{
                        "food": "Breakfast cereals (iron fortified)",
                        "id": 1
                    },
                    {
                        "food": "Oysters (eastern)",
                        "id": 2
                    },
                    {
                        "food": "White beans (canned)",
                        "id": 3
                    },
                    {
                        "food": "Beef liver",
                        "id": 4
                    }]
            },
            {
                "id": 13,
                "nutrient": "Potassium",
                "benefits": "Needed for muscle contractions. Helps maintain steady heartbeat, lower blood pressure, and send nerve impulses. ",
                "sources": [{
                        "food": "Apricots",
                        "id": 1
                    },
                    {
                        "food": "Lentils",
                        "id": 2
                    },
                    {
                        "food": "Squash",
                        "id": 3
                    },
                    {
                        "food": "Prunes",
                        "id": 4
                    },
                    {
                        "food": "Raisins",
                        "id": 5
                    },
                    {
                        "food": "Potatoes",
                        "id": 6
                    },
                    {
                        "food": "Kidney beans",
                        "id": 7
                    },
                    {
                        "food": "Orange juice",
                        "id": 8
                    }]
            },
        ]
    };
    
    render(){
        
        // For EACH nutrient in the above json object, return a List component.

        return <React.Fragment>
                    {this.state.foodSources.map(list => 
                        <List
                            key={list.id}
                            list={list}
                            missing_nutrients={this.props.missing_nutrients} // prop passed in from MissingNutrients
                        />
                    )}
                </React.Fragment>
    }
};
export default ListContainer;
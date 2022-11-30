import React, {Component} from "react";
import ListContainer from "./ListContainer";
import {AllVitaminsMetText, DisplayRecommendationsText} from "./Text";


export default class Recommendations extends Component{


    state = {
        foodSources: [
            {
            "id": 1,
            "title": "Vitamin A",
            "foods": [
                {
                    "food": "Beef liver",
                    "id": 11
                },
                {
                    "food": "Sweet potato (with skin)",
                    "id": 12
                },
                {
                    "food": "Spinach",
                    "id": 13
                },
                {
                    "food": "Pumpkin pie",
                    "id": 14
                },
                {
                    "food": "Carrots",
                    "id": 15
                },
                {
                    "food": "Atlantic herring",
                    "id": 16
                },
                {
                    "food": "Soft serve vanilla ice cream",
                    "id": 17
                }
                ]
            },
            {
            "id": 2,
            "title": "Thiamin",
            "foods": [
                {
                    "food": "White rice",
                    "id": 18
                },
                {
                    "food": "Breakfast cereals",
                    "id": 19
                },
                {
                    "food": "Egg noodles",
                    "id": 20
                },
                {
                    "food": "Pork chop (bone-in)",
                    "id": 21
                },
                {
                    "food": "Trout",
                    "id": 22
                },
                {
                    "food": "Black beans",
                    "id": 23
                },
                {
                    "food": "English muffin (plain)",
                    "id": 24
                },
                {
                    "food": "Mussels (blue)",
                    "id": 25
                }
                ]
            },
            {
            "id": 3,
            "title": "Riboflavin",
            "foods": [
                {
                    "food": "Beef liver",
                    "id": 26
                },
                {
                    "food": "Breakfast cereals",
                     "id": 27
                },
                {
                        "food": "Instant Oats",
                        "id": 28
                },
                {
                        "food": "Yogurt (fat free)",
                        "id": 29
                },
                {
                        "food": "Milk (2% fat)",
                        "id": 30
                },
                {
                        "food": "Beef tenderloin steak (trimmed of fat)",
                        "id": 31
                },
                {
                        "food": "Clams",
                        "id": 32
                },
                {
                        "food": "Almonds",
                        "id": 33
                },
                {
                        "food": "Swiss cheese",
                        "id": 34
                }
                ]
            },
            {
                "id": 4,
                "title": "Niacin",
                "foods": [
                    {
                        "food": "Beef liver",
                        "id": 35
                    },
                    {
                        "food": "Chicken Breast",
                         "id": 36
                    },
                    {
                            "food": "Marinara sauce",
                            "id": 37
                    },
                    {
                            "food": "Turkey breast",
                            "id": 38
                    },
                    {
                            "food": "Tuna (canned in water)",
                            "id": 39
                    },
                    {
                            "food": "Pork (tenderloin)",
                            "id": 40
                    },
                    {
                            "food": "Beef (90% lean)",
                            "id": 41
                    },
                    {
                            "food": "Brown rice", 
                            "id": 42
                    },
                    {
                            "food": "Peanuts",
                            "id": 43
                    },
                    {
                        "food": "Breakfast cereals",
                        "id": 44
                }
                    ]
                },
                {
                    "id": 5,
                    "title": "Vitamin B6",
                    "foods": [
                        {
                            "food": "Chickpeas",
                            "id": 45
                        },
                        {
                            "food": "Beef liver",
                             "id": 46
                        },
                        {
                                "food": "Tuna (yellowfin)",
                                "id": 47
                        },
                        {
                                "food": "Salmon (sockeye)",
                                "id": 48
                        },
                        {
                                "food": "Chicken breast",
                                "id": 49
                        },
                        {
                                "food": "Breakfast cereals",
                                "id": 50
                        },
                        {
                                "food": "Potatoes",
                                "id": 51
                        },
                        {
                                "food": "Turkey (meat only)", 
                                "id": 52
                        },
                        {
                                "food": "Bananas",
                                "id": 53
                        },
                        {
                            "food": "Marinara sauce",
                            "id": 54
                    }
                        ]
                    },
                    {
                        "id": 6,
                        "title": "Vitamin B12",
                        "foods": [
                            {
                                "food": "Beef liver", 
                                "id": 55
                            },
                            {
                                "food": "Clams",
                                 "id": 56
                            },
                            {
                                    "food": "Tuna (bluefin)",
                                    "id": 57
                            },
                            {
                                    "food": "Nutritional yeast (fortified)",
                                    "id": 58
                            },
                            {
                                    "food": "Salmon (Atlantic)",
                                    "id": 59
                            },
                            {
                                    "food": "Beef (85% lean)",
                                    "id": 60
                            },
                            {
                                    "food": "Milk (2% fat)",
                                    "id": 61
                            },
                            {
                                    "food": "Yogurt (fat free)",
                                    "id": 62
                            },
                            {
                                    "food": "Breakfast cereals",
                                    "id": 63
                            }
                            ]
                        },
                        {
                            "id": 7,
                            "title": "Vitamin C",
                            "foods": [
                                {
                                    "food": "Red peppers",
                                    "id": 64
                                },
                                {
                                    "food": "Orange juice",
                                     "id": 65
                                },
                                {
                                        "food": "Oranges",
                                        "id": 66
                                },
                                {
                                        "food": "Grapefruit juice",
                                        "id": 67
                                },
                                {
                                        "food": "Kiwifruit",
                                        "id": 68
                                },
                                {
                                        "food": "Green pepper",
                                        "id": 69
                                },
                                {
                                        "food": "Broccoli",
                                        "id": 70
                                },
                                {
                                        "food": "Strawberries",
                                        "id": 71
                                },
                                {
                                        "food": "Brussels sprouts",
                                        "id": 72
                                },
                                {
                                    "food": "Grapefruit",
                                    "id": 73
                            },
                            {
                                "food": "Tomato juice",
                                "id": 74
                        },
                        {
                            "food": "Cantaloupe",
                            "id": 75
                    },
                    {
                        "food": "Cabbage",
                        "id": 76
                },
                {
                    "food": "Cauliflower",
                    "id": 77
            }
                                ]
                            },
                            {
                                "id": 8,
                                "title": "Vitamin D",
                                "foods": [
                                    {
                                        "food": "Cod liver oil",
                                        "id": 78
                                    },
                                    {
                                        "food": "Trout (rainbow)",
                                         "id": 79
                                    },
                                    {
                                            "food": "Salmon (sockeye)",
                                            "id": 80
                                    },
                                    {
                                            "food": "Mushrooms (white)",
                                            "id": 81
                                    }
                                    ]
                                },
                                {
                                    "id": 9,
                                    "title": "Vitamin E",
                                    "foods": [
                                        {
                                            "food": "Wheat germ oil",
                                            "id": 82
                                        },
                                        {
                                            "food": "Sunflower seeds",
                                             "id": 83
                                        },
                                        {
                                                "food": "Almonds",
                                                "id": 84
                                        },
                                        {
                                                "food": "Sunflower oil",
                                                "id": 85
                                        },
                                        {
                                            "food": "Safflower oil", 
                                            "id": 86
                                    },
                                    {
                                        "food":  "Hazelnuts",
                                        "id": 87
                                }
                                        ]
                                    },
                            {
                                "id": 10,
                                "title": "Vitamin B9",
                                "foods": [
                                    {
                                        "food": "Beef liver",
                                        "id": 88
                                    },
                                    {
                                        "food": "Spinach",
                                         "id": 89
                                    },
                                    {
                                            "food": "Black-eyed peas",
                                            "id": 90
                                    },
                                    {
                                            "food": "Breakfast cereals",
                                            "id": 91
                                    },
                                    {
                                        "food": "White rice",
                                        "id": 92
                                },
                                {
                                    "food": "Asparagus",
                                    "id": 93
                            },
                            {
                                "food": "Brussels",
                                "id": 94
                        }
                                    ]
                                },
                                
        ]
    };

    
    


    render() {
        return(
            <div style={{height: 'auto', display: 'flex', flexDirection: 'column'}}>
                {(this.props.checkAll !== 0 ? 
                    (this.props.missing_vitamins.length !== 0) ? 
                        <div>
                            <DisplayRecommendationsText/>
                            <ListContainer
                            data={this.state.foodSources}
                            missing_vitamins={this.props.missing_vitamins}
                            />
                        </div>
                        :
                        (<AllVitaminsMetText/>)
                    :
                    (
                        (this.props.filtered_missing_vitamins.length !== 0 ?
                            <div>
                            <DisplayRecommendationsText/>
                            <ListContainer
                            data={this.state.foodSources}
                            missing_vitamins={this.props.filtered_missing_vitamins}
                            />
                            </div>
                            :
                            <AllVitaminsMetText/>
                        )
                    )
                )}
            </div>
        );
    }
}
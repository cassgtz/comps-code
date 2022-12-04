/** 

    This component creates a React Fragrment container for the list of missing micronutrients. 
    The code is based on a collapsible list example from Max R.: https://medium.com/@freshmilkdev/reactjs-render-optimization-for-collapsible-material-ui-long-list-with-checkboxes-231b36892e20 

*/

import React, { Component } from "react";
import List from "./List";
import {foodSources} from "./Recommendations";

class ListContainer extends Component {
    state = {
        data: foodSources
    };

    render() {
        return <React.Fragment>
                    {this.state.data.map(list => 
                    <List
                        key={list.id}
                        list={list}
                        missing_vitamins={this.props.missing_vitamins}
                        />
                )}
        </React.Fragment>
    }
};

export default ListContainer;
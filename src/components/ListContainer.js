
import React, { Component } from "react";
import List from "./List";
// data, 

class ListContainer extends Component {
    state = {
        data: this.props.data
    };

    render() {
        return <React.Fragment>
            {   // This creates the container for recommendations
                this.state.data.map(list => 
                    <List
                        key={list.id}
                        list={list}
                        missing_vitamins={this.props.missing_vitamins}/>
                )
            }
        </React.Fragment>
    }
};

export default ListContainer;
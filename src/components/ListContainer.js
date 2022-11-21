
import React, { Component } from "react";
import List from "./List";
// data, 
              // This creates the container for recommendations

class ListContainer extends Component {
    state = {
        data: this.props.data
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
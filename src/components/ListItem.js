/*

    This component renders a food source as an inidividual item of a list. 
    The code is based on a collapsible list example from Max R.: https://medium.com/@freshmilkdev/reactjs-render-optimization-for-collapsible-material-ui-long-list-with-checkboxes-231b36892e20 

*/
import React from 'react';
import PropTypes from 'prop-types';
import MUIListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ListItem = React.memo(({item}) => {
    return (
        <MUIListItem>
            <FormControlLabel control={
                <ul>
                    <li key={item}></li>
                </ul>
            } label={item}/>
        </MUIListItem>
    )
});

ListItem.propTypes = {
    item: PropTypes.string.isRequired
};
export default ListItem;
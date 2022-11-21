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
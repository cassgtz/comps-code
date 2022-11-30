/**
 
    This component renders the collapsible sublist of recommended food sources for each missing vitamin.
    The code is based on a collapsible list example from Max R.: https://medium.com/@freshmilkdev/reactjs-render-optimization-for-collapsible-material-ui-long-list-with-checkboxes-231b36892e20

 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUIList from '@material-ui/core/List';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItem from './ListItem';
import * as Icon from 'react-feather';

const styles = {
    list: {
        maxWidth: 600,
        margin: '0 auto'
    }
};
const List = ({list, classes, missing_vitamins}) => {

    const [expanded, setExpanded] = useState(false); // Hook to render list only when panel is actually expanded
    const expand = <Icon.ChevronDown color="#38b6ff"/>

    return (
            // only render if the micronutrient is in the list of missing micronutrients
            (missing_vitamins.includes(list.title) ? 
                        <Accordion className={classes.list} onClick={() => setExpanded(true)}>
                        <AccordionSummary expandIcon={expand}>
                            <Typography>{list.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {expanded &&
                            <MUIList>
                                {list.foods.map(food =>
                                    <ListItem
                                        key={food.id}
                                        item={food.food}/>
                                )}
                            </MUIList>}
                        </AccordionDetails>
                        </Accordion>
                        : 
                        null
            )
    )
};

List.propTypes = {
    list: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    missing_vitamins: PropTypes.array.isRequired,
};
export default withStyles(styles)(List);
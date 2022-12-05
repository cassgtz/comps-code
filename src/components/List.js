/**
 
    This component renders the collapsible sublist of recommended food sources for each missing nutrient.
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
        maxWidth: 500,
        margin: '0 auto'
    }
};

const List = ({list, classes, missing_nutrients}) => {
    const [expanded, setExpanded] = useState(false); // Hook to render list only when panel is actually expanded

    return(
        // only render if the nutrient is in the list of missing nutrients
        (missing_nutrients.includes(list.nutrient) ? 
            <Accordion className={classes.list} onClick={() => setExpanded(true)}>
                <AccordionSummary expandIcon={<Icon.ChevronDown color="#38b6ff"/>}>
                    <Typography>{list.nutrient}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {expanded &&
                    <MUIList>
                        {list.sources.map(food =>
                            <ListItem
                                key={food.id}
                                item={food.food}
                            />
                        )}
                    </MUIList>}
                </AccordionDetails>
            </Accordion>
        : null)
    );
};

List.propTypes = {
    list: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    missing_nutrients: PropTypes.array.isRequired,
};
export default withStyles(styles)(List);
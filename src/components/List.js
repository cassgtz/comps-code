import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MUIList from '@material-ui/core/List';
import {Accordion, AccordionSummary, AccordionDetails, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import ListItem from './ListItem';

const styles = {
    list: {
        maxWidth: 600,
        margin: '0 auto'
    }
};
const List = ({list, classes, missing_vitamins}) => {
    //hook to render list only when panel actually expanded
    //This is for each missing vitamin
    const [expanded, setExpanded] = useState(false);
    const expand = <Button style={{color:'white', border: 'none', borderRadius: '200px', backgroundColor: "#38b6ff"}}>v</Button>
    return (
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
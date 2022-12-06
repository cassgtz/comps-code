/**
 
    This component is the GroceryCheck+ header diplayed at the top of the webpage.

 */
import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    typo: {
        flexGrow: 1,
        textAlign: "center",
        color: "#38b6ff",
        fontSize: 40,
      }
  });
  
export default function Header() {
    const classes = useStyles();

    return (
        <AppBar color={'inherit'} position="fixed" elevation={0}>
            <Toolbar>
                <Typography className={classes.typo}>
                    GroceryCheck+
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
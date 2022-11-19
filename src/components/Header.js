import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    typo: {
        flexGrow: 1,
        textAlign: "center",
        color: "#4fc3f7"
      }
  }));
  
export default function Header() {
    const classes = useStyles();

    return (
        <AppBar color="white" position="sticky">
            <Toolbar>
                <Typography
                    className={classes.typo}
                >
                    GroceryCheck+
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
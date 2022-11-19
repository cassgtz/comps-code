import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    typo: {
        flexGrow: 1,
        textAlign: "center",
        color: "#38b6ff",
        fontSize: 40,
        elevation: 0
      }
  }));
  
export default function Header() {
    const classes = useStyles();

    return (
        <AppBar color="transparent" position="sticky" elevation={0}>
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
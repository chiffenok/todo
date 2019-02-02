import React, { Component } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    }
});

function App(props) {
    const { classes } = props;

    return (
        <main className={classes.main}>
            <Grid container>
                <Grid item xs={9}>
                  list
                </Grid>
                <Grid item xs={3}>
                    info
                </Grid>
            </Grid>
        </main>
    );
}


export default withStyles(styles)(App);


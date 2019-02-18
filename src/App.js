import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { withTheme } from '@material-ui/core/styles';
import {
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Paper,
    CssBaseline,
} from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles';
import TodoList from './components/TodoList';

const styles = theme => ({
    main: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
        padding: theme.spacing.unit * 1,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 3,
            padding: theme.spacing.unit * 3,
        },
    },
    list: {
        backgroundColor: theme.palette.background.paper,
    },
});

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Todo List
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.main}>
                    <Grid container spacing={32}>
                        <Grid item xs={12} sm={9}>
                            <TodoList />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper} elevation={1}>
                                <Typography variant="h5" component="h3">
                                    This is a sheet of paper 2 .
                                </Typography>
                                <Typography component="p">
                                    Paper can be used to build surface or other elements for your application.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}

export default withTheme()(withStyles(styles)(App));

App.propTypes = {
    classes: PropTypes.string,
};

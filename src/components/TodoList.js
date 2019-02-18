import React, { Component } from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    SnackbarContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    listItem: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius * 2,
        marginTop: theme.spacing.unit * 1,
    },
    circularProgress: {
        display: 'block',
        marginTop: theme.spacing.unit * 3,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    snackbar: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.error.dark,
    },
});

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
            todosItems: null,
            isLoading: false,
            error: null,
        };
        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('https://jsonplaceholder.typicode.com/todos1111')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`${response.status}! File is not found`);
            })
            .then(data => this.setState({ todosItems: data, isLoading: false }))
            .catch((error) => {
                this.setState({ error, isLoading: false });
            });
    }

    getTodosByUser() {
        const { todosItems } = this.state;
        return todosItems.reduce((users, item) => {
            const { userId } = item;

            users[userId] = users[userId]
                ? [...users[userId], item]
                : [item];

            return users;
        }, {});
    }


    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    renderList = (items, classes) => {
        const { checked } = this.state;
        return (
            <List>
                {items.slice(0, 20).map(value => (
                    <ListItem
                        className={classes.listItem}
                        key={value.id}
                        role={undefined}
                        dense
                        button
                        onClick={this.handleToggle(value.id)}
                    >
                        <Checkbox
                            checked={checked.indexOf(value.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={`Line item ${value.id}`} />
                    </ListItem>
                ))}
            </List>
        );
    };

    render() {
        const { classes } = this.props;
        const { todosItems, isLoading, error } = this.state;

        if (error) {
            return (
                <SnackbarContent
                    className={classes.snackbar}
                    message={(
                        <span id="client-snackbar" className={classes.message}>
                            <DeleteIcon />
                            {'delete'}
                        </span>
                    )}
                />
            );
        }

        if (isLoading || todosItems === null) {
            return <CircularProgress className={classes.circularProgress} size={80} />;
        }

        return this.renderList(todosItems, classes);
    }
}

export default withStyles(styles)(TodoList);

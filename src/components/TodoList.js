import React, {Component} from 'react';
import {Checkbox, List, ListItem, ListItemText, CircularProgress, Typography} from "@material-ui/core";
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    listItem: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius * 2,
        marginTop: theme.spacing.unit * 1
    },
    circularProgress : {
        display: 'block',
        marginTop: theme.spacing.unit * 3,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

class TodoList extends Component {
    constructor(props) {
      super(props);
        this.state = {
            checked: [0],
            todosItems: null,
            isLoading: false,
            error: null
        };
        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status + '! File is not found');
                }
            })
            .then(data => this.setState({todosItems: data, isLoading: false}))
            .catch(error => {
                this.setState({error, isLoading: false});
            } );
    }

    getTodosByUser() {
        return this.state.todosItems.reduce((users, item) => {
            const { userId } = item ;

            users[userId] = users[userId]
                ? [...users[userId], item]
                : [item];

            return users

        }, {})
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
        return(
            <List>
                {items.slice(0, 20).map(value => (
                    <ListItem className={classes.listItem} key={value.id} role={undefined} dense button
                              onClick={this.handleToggle(value.id)}>
                        <Checkbox
                            checked={this.state.checked.indexOf(value.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={`Line item ${value.id}`}/>
                    </ListItem>
                ))}
            </List>
        );
    };

    render () {
        const { classes } = this.props;
        const { todosItems, isLoading, error} = this.state;

        if (error) {
            return <Typography component="p">{error.message}</Typography>
        }

        if (isLoading || todosItems === null) {
            return <Typography component="p">Loading....</Typography>
        }

        return this.renderList(todosItems, classes);
    }
}

export default withStyles(styles)(TodoList);
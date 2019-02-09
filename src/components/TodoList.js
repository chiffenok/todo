import React, {Component} from 'react';
import {Checkbox, List, ListItem, ListItemText, CircularProgress} from "@material-ui/core";

class TodoList extends Component {
    constructor(props) {
      super(props);
        this.state = {
            checked: [0],
            todosItems: null,
            isLoading: false
        };
        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => this.setState({todosItems: data, isLoading: false}));
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

    renderList = (items) => {
        return(
            <List>
                {items.slice(0, 20).map(value => (
                    <ListItem key={value.id} role={undefined} dense button
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
        console.log(this.state.todosItems);
        return (
            (this.state.todosItems === null || this.state.isLoading) ? (
                <CircularProgress/>
            ) : (
                this.renderList(this.state.todosItems)
            )
        );
    }
}

export default TodoList;
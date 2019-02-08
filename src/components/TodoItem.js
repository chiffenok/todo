import React, {Component} from 'react';
import {Checkbox, ListItem, ListItemText} from "@material-ui/core";

class TodoItem extends Component {
    state = {
        checked: [],
    };

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

    render () {
        return (
            <ListItem key={this.props.item} role={undefined} dense button
                      onClick={this.handleToggle(this.props.item)}>
                <Checkbox
                    checked={this.state.checked.indexOf(this.props.item) !== -1}
                    tabIndex={-1}
                    disableRipple
                />
                <ListItemText primary={`Line item ${this.props.item + 1}`}/>
            </ListItem>
        );
    }
}

export default TodoItem;
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FastfoodIcon from '@material-ui/icons/Fastfood';


class mainListItems extends React.Component {
    render() {

        const menuPage = () => {
            this.props.history.push('/menu');
        };

        const employeeProfiles = () => {
            this.props.history.push('/employeeProfiles')
        };

        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <MonetizationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Payroll" />
                </ListItem>
                <ListItem button>
                    <Button fullWidth onClick={employeeProfiles}><PeopleIcon />&nbsp; Employees</Button>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                <ListItem button >
                    <Button fullWidth onClick={menuPage}><FastfoodIcon /> &nbsp; Menu</Button>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
            </div>
        );
    }
}

export default withRouter(mainListItems);


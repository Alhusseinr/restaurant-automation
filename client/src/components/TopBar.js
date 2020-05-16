import LogoutBtn from "./logoutBtn";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withRouter } from 'react-router-dom';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PeopleIcon from "@material-ui/icons/People";
import KitchenIcon from '@material-ui/icons/Kitchen';
import HomeIcon from '@material-ui/icons/Home';
import TabletIcon from '@material-ui/icons/Tablet';

class TopBar extends React.Component {
    render() {
        const homePage = () => {
            this.props.history.push('/');
        };

        const kitchen = () => {
            this.props.history.push('/kitchen');
        };

        const employeeProfiles = () => {
            this.props.history.push('/employeeProfiles')
        };

        const tablePage = () => {
            this.props.history.push('/tables')
        };

        const payroll = () => {
            this.props.history.push('/payroll');
        }

        return (
            <AppBar position="absolute" style={{boxShadow: 'none'}}>
                <Toolbar>
                    <Grid
                        justify="flex-start"
                        container
                    >
                        <Grid item>
                            <Typography component="h1" variant="h6" color="inherit" noWrap>
                                Restaurant Automation
                            </Typography>
                        </Grid>
                        <Grid item style={{marginLeft: '1em'}}>
                            <Button color="inherit" onClick={homePage}><HomeIcon/> &nbsp; Home</Button>
                        </Grid>
                        <Grid item style={{marginLeft: '1em'}}>
                            <Button color="inherit" onClick={employeeProfiles}><PeopleIcon/> &nbsp; Employees</Button>
                        </Grid>
                        <Grid item style={{marginLeft: '1em'}}>
                            <Button color="inherit" onClick={payroll}><MonetizationOnIcon/> &nbsp; Payroll</Button>
                        </Grid>
                        <Grid item style={{marginLeft: '1em'}}>
                            <Button color="inherit" onClick={kitchen}><KitchenIcon/> &nbsp; Kitchen</Button>
                        </Grid>
                        <Grid item style={{marginLeft: '1em'}}>
                            <Button color="inherit" onClick={tablePage}><TabletIcon/> &nbsp; Tables</Button>
                        </Grid>
                    </Grid>
                    <LogoutBtn/>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(TopBar);


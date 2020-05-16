import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import Grid from '@material-ui/core/Grid';
import LoginPage from "../views/LoginPage/LoginPage";
import Dashboard from "../views/AdminDashboard/Dashboard";
import EmployeeProfiles from '../views/EmployeeProfiles/employeeProfiles';
import Tables from '../views/TableView/tables';
import Menu from '../views/MenuPage/menu';
import Payroll from '../views/Payroll/payrollTable';
import Queue from '../views/OrderQueue/queue';
import kitchen from "../views/Kitchen/kitchen";

const mockStore = configureMockStore();
const store = mockStore({});

class Main extends Component{
    componentWillMount() {
        if (localStorage.getItem('jwtToken')) {
            const token = localStorage.getItem('jwtToken');
            fetch('http://127.0.0.1:5000/api/u', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            }).then(response => response.json())
                .then(result => {
                    if(result.success === false){
                        localStorage.removeItem('jwtToken');
                        this.props.history.push('/login');
                    }
                })
                .catch(e => console.log(e))
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <Grid container component="main" style={{ height: '100vh' }}>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/menu" component={Menu} />
                            <Route exact path="/employeeProfiles" component={EmployeeProfiles}/>
                            <Route exact path="/tables" component={Tables} />
                            <Route exact path="/payroll" component={Payroll} />
                            <Route exact path="/queue" component={Queue} />
                            <Route exact path={`/tables/:tableId`} component={Menu} />
                            <Route exact path="/kitchen" component={kitchen} />
                        </Switch>
                    </Router>
                </Provider>
            </Grid>
        );
    }
}

export default Main;
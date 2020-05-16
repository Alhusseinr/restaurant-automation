import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom'

class LogoutBtn extends React.Component{
    logout = () => {
        localStorage.removeItem('jwtToken');
        this.props.history.push('/login');
    };

    render() {
        return(
            <Button
                color="inherit"
                onClick={this.logout}
            >
                Logout
            </Button>
        )
    }
}

export default withRouter(LogoutBtn);

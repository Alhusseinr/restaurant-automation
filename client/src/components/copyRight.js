import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default class Copyright extends React.Component{
    render() {
        return(
            <Typography variant="body2" color="textSecondary" align="center">
                {' Copyright © '}
                <Link color="inherit" href="#">
                    our restaurant name
                </Link>{ ' ' }
                {new Date().getFullYear() }
            </Typography>
        );
    }
}

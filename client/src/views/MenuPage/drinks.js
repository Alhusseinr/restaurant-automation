import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Button, TextField, FormControlLabel} from "@material-ui/core";
import water from "../../images/water.jpeg";
import icedTea from "../../images/icedTea.jpeg";
import coffee from "../../images/coffee.png";
import tea from "../../images/tea.jpeg";
import soda from "../../images/soda.jpeg";
const { REACT_APP_API_URL } = process.env;

const useStyles = makeStyles({
    table: {
        minWidth: 500
    }
});

export default function SimpleTable(props) {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [state, setState] = React.useState({
        rows: [],
    });

    const itemPhoto = (item) => {
        switch (item) {
            case 'Water':
                return <img src={water} alt="water" width="40px" height="50px" />;
            case 'Soda':
                return <img src={soda} alt="soda" width="45px" height="60px" />;
            case 'Iced Tea':
                return <img src={icedTea} alt="icedTea" width="45px" height="65px" />;
            case 'Tea':
                return <img src={tea} alt="tea" width="50px" height="40px" />;
            case 'Coffee':
                return <img src={coffee} alt="coffee" width="50px" height="40px" />;
            default:
                return "No photo provided";
        }
    }

    useEffect(() => {
        setCount(0);
        fetch(REACT_APP_API_URL + '/api/m/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(menuItems => {
            menuItems.items.map((item) => {
                const items = menuItems.items.filter(items => items.category === 'beverages');
                setState({...state, rows: items});
            })
        }).catch(e => console.log(e))
    }, [count])

    const addOrder = (item) => {
        const orderInfo = {item, tableId: props.tableId};
        fetch(REACT_APP_API_URL + '/api/o/', {
            method: 'POST',
            body: JSON.stringify(orderInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then(response => response.json()).then(newOrder => {
            if(newOrder) {
                window.location.reload();
            }
        }).catch(e => console.log(e))
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {state.rows.map(row => (
                        <TableRow key={row.image}>
                            <TableCell align="center">
                                {itemPhoto(row.item)}
                            </TableCell>
                            <TableCell align="center">{row.item}</TableCell>
                            <TableCell align="center">{'$'+row.price}</TableCell>
                            <TableCell align="center" style={{paddingRight: 20}}>
                                <Button variant="outlined" color="primary" onClick={() => addOrder(row.id)}>Add</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

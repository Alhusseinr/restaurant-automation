import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";
import carrot from "../../images/carrot.jpg";
import red from "../../images/red.png";
import chocolate from "../../images/chocolate.jpg";
import iceCream from "../../images/iceCream.jpg";
import apple from "../../images/apple.png";

const {REACT_APP_API_URL} = process.env;

const useStyles = makeStyles({
    table: {
        minWidth: 500
    }
});

export default function SimpleTable(props) {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [state, setState] = React.useState({
        rows: []
    });

    const itemPhoto = (item) => {
        switch (item) {
            case 'Chocolate Cake':
                return <img src={chocolate} alt="chocolate" width="80px" height="60px"/>;
            case 'Red Velvet Cake':
                return <img src={red} alt="red" width="70px" height="60px"/>;
            case 'Carrot Cake':
                return <img src={carrot} alt="carrot" width="80px" height="60px"/>;
            case 'Apple Pie':
                return <img src={apple} alt="apple" width="70px" height="50px"/>;
            case 'Ice Cream':
                return <img src={iceCream} alt="iceCream" width="60px" height="70px"/>;
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
                const items = menuItems.items.filter(items => items.category === 'desserts');
                setState({rows: items});
            })
            //console.log('menu', menuItems.items);
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
                            <TableCell align="center">{'$' + row.price}</TableCell>
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

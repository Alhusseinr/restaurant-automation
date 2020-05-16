import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

function createData(name, calories, fat, carbs) {
    return {name, calories, fat, carbs};
}

const rows = [
    createData("Mozerella Cheese", 159, 200.0, 24),
    createData("Potatoes", 234, 37, 4),
    createData("Eggs", 2452, 499, 24),
    createData("Flour", 30535, 453, 67),
    createData("Sugar", 354356, 193, 49),
    createData("Pasta", 543259, 299, 24),
    createData("Milk", 2347, 555, 37),
    createData("Chicken", 2624, 100, 24),
    createData("Pork", 30455, 300, 67),
    createData("Steak", 3556, 16.0, 49),
    createData("Ground Beef", 1549, 100, 24),
    createData("Tomato Sauce", 2337, 300, 37),
    createData("Plate", 2652, 2000, 24),
    createData("Cup", 3065, 3000, 67),
    createData("Cutlery", 3563, 4000, 49),
    createData("Napkins", 1569, 4000, 24),
    createData("Brocolli", 2337, 400, 37),
    createData("Tortillas", 2662, 100, 24),
    createData("Oil", 3035, 500, 67),
    createData("Alcohol", 3536, 500, 49),
    createData("Soda", 1659, 100, 24),
    createData("Paper", 2387, 444, 37),
    createData("Pens", 2629, 134, 24),
    createData("Apron", 3305, 55, 67),
    createData("Pots", 3956, 200, 49),
    createData("Pans", 1359, 300, 24)
];

export default function DenseTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Product ID</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Missing</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

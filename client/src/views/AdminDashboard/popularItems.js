import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(item, quantity ){
  return { item,  quantity};
}

const rows = [
  createData('Spaghetti', 159),
  createData('Pasta', 237),
  createData('Eclair', 262),
  createData('Steak', 305),
  createData('French Fries', 356),
];

export default function DenseTable() {
  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>

              <TableCell align="left">Amount sold</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow key={row.item}>
                  <TableCell component="th" scope="row">
                    {row.item}
                  </TableCell>

                  <TableCell align="left">{row.quantity}</TableCell>


                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

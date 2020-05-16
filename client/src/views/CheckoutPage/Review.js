import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const products = [
  { name: "Burger", price: "$8.99" },
  { name: "Iced Tea", price: "$2.99" },
  { name: "French Fries", price: "$5.00" }
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <hr />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Subtotal" />
          <Typography variant="body2">$16.98</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Tip (15%)" />
          <Typography variant="body2">$2.55</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $19.53
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

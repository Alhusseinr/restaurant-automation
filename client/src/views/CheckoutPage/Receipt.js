import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import ReactDOM from "react-dom";

function handleChange() {
  return (
    <React.Fragment>
      <TextField
        required
        id="emailAddress"
        name="emailAddress"
        label="Email Address"
        fullWidth
      />
    </React.Fragment>
  );
}

export default function Receipt() {
  return (
    <React.Fragment>
      <FormControl component="feildset">
        <RadioGroup row required aria-label="email" name="email">
          <FormControlLabel
            value="print"
            control={<Radio />}
            label="Print Receipt"
          />
          <FormControlLabel
            value="email"
            control={<Radio />}
            label="Email Receipt"
            onClick={handleChange}
          />
        </RadioGroup>
        <React.Fragment>
          <TextField
            required
            id="emailAddress"
            name="emailAddress"
            label="Email Address"
            fullWidth
          />
        </React.Fragment>
      </FormControl>
    </React.Fragment>
  );
}

import React, {forwardRef} from "react";
import MaterialTable from "material-table";
import burger from "../../images/burger.png";
import icedTea from "../../images/icedTea.jpeg";
import fries from "../../images/fries.jpg";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";

const IcedTea = <img src={icedTea} alt="icedTea" width="45px" height="65px" />;
const Burger = <img src={burger} alt="burger" width="60px" height="50px" />;
const Fries = <img src={fries} alt="fries" width="70px" height="60px" />;


const TableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
};

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [{ field: "image" }, { field: "item" }, { field: "price" }],
    data: [
      { image: Burger, item: "Burger", price: "$8.99" },
      { image: IcedTea, item: "Iced Tea", price: "$2.99" },
      { image: Fries, item: "French Fries", price: "$5.69" }
    ]
  });

  return (
    <MaterialTable
      title=""
      icons={TableIcons}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
      options={{
        actionsColumnIndex: -1,
        search: false,
        paging: false,
        header: "",
        toolbar: false
      }}
    />
  );
}

import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { CgFontSpacing } from "react-icons/cg";
import { stopToast } from "../../Actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    backgroundColor: "black",
  },
}));
function MuiSnackBar() {
  console.log("aarhaa hai bro");
  const dispacth = useDispatch();
  const mui = useSelector((state) => state.help.snackbar);
  console.log(mui, "mui hai yei");
  const classes = useStyles();

  //   setOpen(mui.set);

  const handleClose = (event, reason) => {
    dispacth(stopToast());
    // setOpen(false);
  };

  return (
    <div>
      <Snackbar open={mui.set} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={mui.type}>
          {mui.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MuiSnackBar;

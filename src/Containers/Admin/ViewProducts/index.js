import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DHomePage from "../../DHomePage";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import "./viewproduct.css";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Modal from "@material-ui/core/Modal";

import { useDispatch, useSelector } from "react-redux";

// import HUE from "@material-ui/core/colors/HUE";
import { createTheme } from "@material-ui/core/styles";
import ProductModal from "../../../Components/Admin/Helper/ProductModal";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import { deleteProduct, fetchProductList } from "../../../Actions";

const them = createTheme({
  palette: {
    primary: {
      light: "#ffca28",
      main: "#ffc107",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

// const color = HUE["#ffca28"];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function ViewProducts() {
  const classes = useStyles();
  const productList = useSelector((state) => state.products.productList);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState([]);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: them.palette.primary.light,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
      // cursor: pointer;
    },
  }))(TableCell);

  ///MAIN

  const productDetailsHandler = ({ e, row }) => {
    console.log(row, "dekho kya mile");
    setProduct(row);
    handle();
  };

  const handle = () => {
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function createData(
    name,
    price,
    quantity,
    category,
    id,
    description,
    photoUrl
  ) {
    return { name, price, quantity, category, id, description, photoUrl };
  }
  const rows = [];
  const dispatch = useDispatch();

  productList.forEach((item) => {
    rows.push(
      createData(
        item.name,
        item.price,
        item.quantity,
        item.category,
        item.id,
        item.description,
        item.photoUrl
      )
    );
  });
  console.log(rows);

  const DeleteHandler = ({ e, row }) => {
    console.log(e);
    dispatch(deleteProduct(row));
  };

  return (
    <DHomePage sidebar>
      <div className="viewProducts">
        <div className="viewProductscontent">
          <div className="viewProductsTitle">Products</div>
          <div className="viewProductsTable">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product Name</StyledTableCell>
                    <StyledTableCell align="right">
                      Product Price
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Product Quantity
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Product Category
                    </StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow
                        hover
                        onDoubleClick={(e) => productDetailsHandler({ e, row })}
                        style={{}}
                        key={row.id}
                      >
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.price}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.category}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <IconButton
                            style={{ padding: "0px" }}
                            onClick={(e) => {
                              DeleteHandler({ e, row });
                            }}
                          >
                            <DeleteTwoToneIcon
                              style={{
                                fill: "rgb(197, 146, 5)",
                                fontSize: "larger",
                              }}
                            />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              style={{ color: "balck" }}
              component="div"
              backgroundColor="black"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <ProductModal product={product} />
          </Modal>
          {/* <button onClick={(e) => setOpen(true)}> click</button> */}
        </div>
      </div>
    </DHomePage>
  );
}

export default ViewProducts;

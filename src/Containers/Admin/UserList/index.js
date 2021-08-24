import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import DHomePage from "../../DHomePage";
import TablePagination from "@material-ui/core/TablePagination";
import { GrUserAdmin } from "react-icons/gr";
import { RiUser3Line } from "react-icons/ri";

import { createTheme } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ProductModal from "../../../Components/Admin/Helper/ProductModal";
import { useState } from "react";
import { Button, ButtonGroup, IconButton, Modal } from "@material-ui/core";
import {
  changeRole,
  deleteProduct,
  fetchUserList,
  makeAdmin,
  makeUser,
} from "../../../Actions";

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

function UserList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const userList = useSelector((state) => state.user.userlist);

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function createData(displayName, email, role) {
    return { displayName, email, role };
  }
  const rows = [];

  userList.forEach((item) => {
    rows.push(createData(item.displayName, item.email, item.role));
  });
  // console.log(rows);

  const adminHandle = ({ e, row }) => {
    e.preventDefault();
    dispatch(changeRole(row));
  };

  const userHandle = ({ e, row }) => {
    e.preventDefault();
    dispatch(changeRole(row));
  };

  return (
    <div className="userlist">
      <DHomePage sidebar>
        <div className="viewProducts">
          <div className="viewProductscontent">
            <div className="viewProductsTitle">Users</div>
            <div className="viewProductsTable">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User Name</StyledTableCell>
                      <StyledTableCell align="right">Email Id</StyledTableCell>
                      <StyledTableCell align="right">Role</StyledTableCell>
                      <StyledTableCell align="right">
                        Switch Roles
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                        
                      </StyledTableCell>
                      <StyledTableCell align="right">Actions</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow hover key={row.email}>
                          <StyledTableCell component="th" scope="row">
                            {row.displayName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.role}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.role === "admin" ? (
                              <ButtonGroup>
                                <Button
                                  style={{ background: "rgb(252, 212, 102)" }}
                                  onClick={(e) => {
                                    adminHandle({ e, row });
                                  }}
                                >
                                  {" "}
                                  <GrUserAdmin size="1rem" />
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    userHandle({ e, row });
                                  }}
                                >
                                  {" "}
                                  <RiUser3Line
                                    size="1rem"
                                    className={
                                      row.role === "user"
                                        ? "activate_mode"
                                        : "deactivate_mode"
                                    }
                                    style={{ fill: "black" }}
                                  />
                                </Button>
                              </ButtonGroup>
                            ) : (
                              <ButtonGroup>
                                <Button
                                  onClick={(e) => {
                                    adminHandle({ e, row });
                                  }}
                                >
                                  {" "}
                                  <GrUserAdmin size="1rem" />
                                </Button>
                                <Button
                                  style={{ background: "rgb(252, 212, 102)" }}
                                  onClick={(e) => {
                                    userHandle({ e, row });
                                  }}
                                >
                                  {" "}
                                  <RiUser3Line
                                    size="1rem"
                                    className={
                                      row.role === "user"
                                        ? "activate_mode"
                                        : "deactivate_mode"
                                    }
                                    style={{ fill: "black" }}
                                  />
                                </Button>
                              </ButtonGroup>
                            )}
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
          </div>
        </div>
      </DHomePage>
    </div>
  );
}

export default UserList;

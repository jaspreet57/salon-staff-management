import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { Link as RouterLink } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getStaffList, selectStaffList } from "../redux/staffSlice";
import SearchBox from "../components/SearchBox";
import { StaffMember } from "../types/staff";
import { AddCircleOutline, Edit as EditIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import { deleteStaffMember } from "../api/staff";

export default function StaffList() {
  const staffList = useAppSelector(selectStaffList);
  const [filteredList, setFilteredList] = React.useState<StaffMember[]>([]);
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    dispatch(getStaffList());
  }, [dispatch]);

  React.useEffect(() => {
    setFilteredList(
      staffList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, staffList]);

  const onSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleDeleteMember = (deleteMemberId: string) => async () => {
    await deleteStaffMember(deleteMemberId);
    dispatch(getStaffList());
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredList.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredList]
  );

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          pl: { xs: 0 },
          pr: { xs: 0 },
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <Title>Staff List</Title>
        <SearchBox
          placeholder="Search staff list.."
          value={searchValue}
          onChange={onSearchValueChange}
        />
        <Button
          variant="contained"
          component={RouterLink}
          to={"/staff/add"}
          startIcon={<AddCircleOutline />}
        >
          Add Member
        </Button>
      </Toolbar>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" padding="normal">
                Staff Member Name
              </TableCell>
              <TableCell align="right" padding="normal">
                Working Hours
              </TableCell>
              <TableCell
                align="right"
                padding="normal"
                style={{ maxWidth: "130px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => {
              return (
                <TableRow hover key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell component="th" scope="row" padding="normal">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs().set("hours", row.startTime).format("hh a")} to{" "}
                    {dayjs().set("hours", row.endTime).format("hh a")}
                  </TableCell>
                  <TableCell align="right" style={{ maxWidth: "130px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      component={RouterLink}
                      to={`/staff/${row.id}`}
                      startIcon={<EventOutlinedIcon />}
                      sx={{ mr: 2 }}
                    >
                      Appointments
                    </Button>
                    <IconButton
                      component={RouterLink}
                      to={`/staff/edit/${row.id}`}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDeleteMember(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

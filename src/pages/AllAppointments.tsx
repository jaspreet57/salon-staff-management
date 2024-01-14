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

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import SearchBox from "../components/SearchBox";
import dayjs from "dayjs";
import {
  getAppointments,
  selectAppointments,
} from "../redux/appointmentsSlice";
import { Appointment } from "../types/appointments";
import Typography from "@mui/material/Typography";

export default function AllAppointments() {
  const appointments = useAppSelector(selectAppointments);
  const [filteredList, setFilteredList] = React.useState<Appointment[]>([]);
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  React.useEffect(() => {
    setFilteredList(
      appointments.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, appointments]);

  const onSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
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
        <Title>All Appointments</Title>
        <SearchBox
          placeholder="Search appointments.."
          value={searchValue}
          onChange={onSearchValueChange}
        />
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
                Title
              </TableCell>
              <TableCell align="right" padding="normal">
                Client Name
              </TableCell>
              <TableCell align="left" padding="normal">
                Comment
              </TableCell>
              <TableCell
                align="right"
                padding="normal"
                style={{ maxWidth: "100px" }}
              >
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => {
              return (
                <TableRow hover key={row.id} sx={{ cursor: "pointer" }}>
                  <TableCell component="th" scope="row" padding="normal">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.clientName}</TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      component="div"
                      whiteSpace="pre-line"
                      gutterBottom
                    >
                      {row.comment}
                    </Typography>
                  </TableCell>

                  <TableCell align="right" style={{ maxWidth: "100px" }}>
                    {dayjs(row.startTime).format("MM/DD/YYYY hh:mm a")} <br />{" "}
                    to {dayjs(row.endTime).format("MM/DD/YYYY hh:mm a")}
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

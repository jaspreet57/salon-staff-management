import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Scheduler } from "@aldabil/react-scheduler";
import { v4 as uuidv4 } from "uuid";
import type {
  DayHours,
  EventActions,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import Title from "../components/Title";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectMemberById } from "../redux/staffSlice";
import {
  getAppointments,
  selectAppointments,
  selectAppointmentsStatus,
} from "../redux/appointmentsSlice";
import { deleteAppointment, postAppointment } from "../api/appointments";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface MemberUrlParams {
  memberId?: string;
}

const MemberDetails: React.FC = () => {
  const { memberId }: MemberUrlParams = useParams();

  const dispatch = useAppDispatch();
  const member = useAppSelector(selectMemberById(memberId));
  const appointments = useAppSelector(selectAppointments);
  const status = useAppSelector(selectAppointmentsStatus);

  const [openMessage, setOpenMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    if (memberId) {
      dispatch(getAppointments(memberId));
    }
  }, [dispatch, memberId]);

  const events: ProcessedEvent[] = appointments.map((appointment) => ({
    event_id: appointment.id,
    title: appointment.title,
    clientName: appointment.clientName,
    comment: appointment.comment,
    start: new Date(appointment.startTime),
    end: new Date(appointment.endTime),
  }));

  const addEventHandler = React.useCallback<
    (event: ProcessedEvent, action: EventActions) => Promise<ProcessedEvent>
  >(
    async (event, action) => {
      const eventData = {
        event_id: action === "create" ? uuidv4() : event.event_id,
        title: event.title,
        clientName: event.clientName,
        comment: event.comment,
        start: event.start,
        end: event.end,
      };

      try {
        await postAppointment(
          {
            id: `${eventData.event_id}`,
            memberId: member?.id || "unknown",
            title: eventData.title,
            clientName: eventData.clientName,
            comment: eventData.comment,
            startTime: eventData.start.toUTCString(),
            endTime: eventData.end.toUTCString(),
          },
          member,
          action === 'edit'
        );
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          setOpenMessage(true);
        }
        throw error;
      }

      return eventData;
    },
    [member]
  );

  const handleClose:
    | ((
        event: Event | React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason
      ) => void)
    | undefined = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
    setErrorMessage("");
  };

  const deleteEventHandler = React.useCallback<(deletedId: string | number) => Promise<string | number | void>>(async (deletedId) => {
    await deleteAppointment(`${deletedId}`);
    return deletedId;
  }, []);

  if (!member) {
    return (
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Toolbar
          sx={{
            pl: { xs: 0 },
            pr: { xs: 0 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title>Staff Member</Title>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <h2>No Member Found</h2>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          pl: { xs: 0 },
          pr: { xs: 0 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title>Staff Member Details</Title>
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mb: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2">
          {member.name}'s appointments
        </Typography>
        <Typography color="textSecondary">
          Working Hours: {member.startTime} to {member.endTime}
        </Typography>
      </Box>

      <Scheduler
        view="week"
        loading={status === "loading"}
        draggable={false}
        onConfirm={addEventHandler}
        onDelete={deleteEventHandler}
        month={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: member.startTime as DayHours,
          endHour: member.endTime as DayHours,
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: member.startTime as DayHours,
          endHour: member.endTime as DayHours,
          step: 60,
        }}
        day={{
          startHour: member.startTime as DayHours,
          endHour: member.endTime as DayHours,
          step: 60,
        }}
        fields={[
          {
            name: "clientName",
            type: "input",
            config: {
              label: "Client Name",
              required: true,
              variant: "outlined",
            },
          },
          {
            name: "comment",
            type: "input",
            config: {
              label: "Comment",
              variant: "outlined",
            },
          },
        ]}
        events={events}
      />
      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default MemberDetails;

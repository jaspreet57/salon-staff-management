import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useParams } from "react-router-dom";
import { Scheduler } from "@aldabil/react-scheduler";
import Title from "../components/Title";

import { useAppSelector } from "../redux/hooks";
import { selectMemberById } from "../redux/staffSlice";
import { selectAppointments } from "../redux/appointmentsSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface MemberUrlParams {
  memberId?: string;
}

const MemberDetails: React.FC = () => {
  const { memberId }: MemberUrlParams = useParams();
  const member = useAppSelector(selectMemberById(memberId));

  const appointments = useAppSelector(selectAppointments);

  const events = appointments.map((appointment) => ({
    event_id: appointment.id,
    title: appointment.title,
    clientName: appointment.clientName,
    comment: appointment.comment,
    start: new Date(appointment.startTime),
    end: new Date(appointment.endTime),
  }));

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
    </Paper>
  );
};

export default MemberDetails;

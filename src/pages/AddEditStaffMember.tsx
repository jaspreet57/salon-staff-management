import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import Title from "../components/Title";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getStaffList, selectMemberById } from "../redux/staffSlice";
import { postStaffMember, putStaffMember } from "../api/staff";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import {
  LocalizationProvider,
  PickerChangeHandlerContext,
  TimePicker,
  TimeValidationError,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface AddEditStaffMemberProps {
  isEdit?: boolean;
}

const AddEditStaffMember: React.FC<AddEditStaffMemberProps> = ({ isEdit }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { memberId: editMemberId } = useParams();
  const member = useAppSelector(selectMemberById(editMemberId));

  const [formData, setFormData] = React.useState({
    id: uuidv4(),
    name: "",
    startTime: dayjs().set("hours", 9),
    endTime: dayjs().set("hours", 17),
  });

  React.useEffect(() => {
    if (isEdit && member) {
      setFormData({
        ...member,
        startTime: dayjs().set("hours", member.startTime),
        endTime: dayjs().set("hours", member.endTime),
      });
    }
  }, [member, isEdit]);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setFormData((state) => ({
      ...state,
      name: value,
    }));
  };

  const handleTimeChange =
    (fieldName: string) =>
    (
      value: Dayjs | null,
      context: PickerChangeHandlerContext<TimeValidationError>
    ) => {
      if (value) {
        setFormData((state) => ({
          ...state,
          [fieldName]: value,
        }));
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const memberDetails = {
        ...formData,
        startTime: formData.startTime.get("hours"),
        endTime: formData.endTime.get("hours"),
      };
      if (isEdit) {
        await putStaffMember(memberDetails);
      } else {
        await postStaffMember(memberDetails);
      }

      dispatch(getStaffList());
      navigate("/");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Toolbar
          sx={{
            pl: { xs: 0 },
            pr: { xs: 0 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title>{isEdit ? "Update" : "New"} Staff Member</Title>
        </Toolbar>

        <Container maxWidth={"sm"}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleNameChange}
              fullWidth
              sx={{ mb: 2 }}
              margin="normal"
            />
            <TimePicker<Dayjs>
              label="Start Hour"
              name="startTime"
              views={["hours"]}
              sx={{ mr: 2 }}
              viewRenderers={{
                hours: renderTimeViewClock,
              }}
              value={formData.startTime}
              onChange={handleTimeChange("startTime")}
            />
            <TimePicker<Dayjs>
              label="End Hour"
              name="endTime"
              views={["hours"]}
              viewRenderers={{
                hours: renderTimeViewClock,
              }}
              value={formData.endTime}
              onChange={handleTimeChange("endTime")}
            />
            <Button
              type="submit"
              sx={{ display: "block", mt: 2 }}
              variant="contained"
              color="primary"
            >
              {isEdit ? "Update" : "Add"} member
            </Button>
          </form>
        </Container>
      </Paper>
    </LocalizationProvider>
  );
};

export default AddEditStaffMember;

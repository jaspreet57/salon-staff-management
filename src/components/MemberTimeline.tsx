import { Box } from "@mui/system";
import { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

const MemberTimeline: React.FC = () => {
  const [isLoading] = useState(true);

  return (
    <Scheduler
      view="day"
      disableViewNavigator
      fields={[
        {
          name: "clientName",
          type: "input",
          config: {
            label: "Client Name",
            required: true,
            min: 3,
            variant: "outlined",
          },
        },
      ]}
      events={[
        {
          event_id: 1,
          title: "Event 1",
          start: new Date("2021/5/2 09:30"),
          end: new Date("2021/5/2 10:30"),
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date("2021/5/4 10:00"),
          end: new Date("2021/5/4 11:00"),
        },
      ]}
    />
  );
};

export default MemberTimeline;

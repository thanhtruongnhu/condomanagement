import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";

const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  console.log(data);

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  const [switchStates, setSwitchStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Function to handle Switch state changes for a specific row
  const handleSwitchChange = (rowId: number) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [rowId]: !prevStates[rowId],
    }));
  };

  const actionColumn: GridColDef = {
    field: "availableforrent",
    headerName: "Available for rent",
    width: 200,
    renderCell: (params) => {
      const isChecked = switchStates[params.row.id] || false;
      return (
        <Switch
          checked={isChecked}
          onChange={() => handleSwitchChange(params.row.id)}
        />
      );
    },
  };

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;

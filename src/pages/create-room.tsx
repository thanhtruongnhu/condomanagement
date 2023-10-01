import React, { useState } from "react";
import Form from "../components/common/Form";

const CreateRoom = () => {
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });

  return <Form type="Create" propertyImage={propertyImage} />;
};

export default CreateRoom;
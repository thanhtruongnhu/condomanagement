import React, { useState } from "react";
import FormEditRoom from "../components/common/FormEditRoom";
import SingleSuitA from "../assets/SingleSuite.jpg"
import { Room } from "../interfaces/property"
import { useParams } from "react-router-dom";

const mockRooms = [
    {
      _id: "101",
      title: "Room 101",
      propertyType: "Single A",
      price: 100,
      location: "Sample Location 1",
      description:
        "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
      photo: SingleSuitA,
      creator: {
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
        allProperties: [1, 2, 3],
      },
    },
    {
      _id: "202",
      title: "Room 202",
      propertyType: "Single Suite B",
      price: 150,
      location: "Sample Location 2",
      description:
        "Classic comforts meets contemporary luxury overlooking the courtyard. Explore the best single household unit. Suitable for individual professional and student.",
      photo: SingleSuitA,
      creator: {
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.jpg",
        allProperties: [4, 5, 6],
      },
    },
  ];

const EditRoom = () => {
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  // Mock function for useShow (fetching property details)
  const queryResult = {
    data: mockRooms,
    isLoading: false,
    isError: false,
  };
  const { data, isLoading, isError } = queryResult;
  const { id } = useParams();

  // Find the room details by matching the ID
  const propertyDetails = queryResult.data.find(
    (room: Room) => room._id === id
  );

  if (!propertyDetails) {
    // Handle the case where the room with the specified ID is not found
    return <div>Room not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return <FormEditRoom type="Edit" propertyDetails={propertyDetails}/>;
};

export default EditRoom;
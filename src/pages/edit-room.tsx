import React, { useEffect, useState } from "react";
import FormEditRoom from "../components/common/FormEditRoom";
import SingleSuitA from "../assets/SingleSuite.jpg";
import { ApartmentData, Room } from "../interfaces/property";
import { useParams } from "react-router-dom";

const EditRoom = () => {
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  // Mock function for useShow (fetching property details)
  // const queryResult = {
  //   data: mockRooms,
  //   isLoading: false,
  //   isError: false,
  // };
  // const { data, isLoading, isError } = queryResult;
  const { id } = useParams();
  const [apartmentData, setApartmentData] = useState<ApartmentData | null>(
    null
  );

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/apartment/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setApartmentData(data);
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchApartmentData();
  }, []);

  return <FormEditRoom type="Edit" propertyDetails={apartmentData} />;
};

export default EditRoom;

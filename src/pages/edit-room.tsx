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
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token is available
        if (!token) {
          console.error("Token not available. Please authenticate first.");
          return;
        }

        // Fetch apartment data using your domain, including the token in the headers
        const response = await fetch(
          `https://globalsolusap.com/apartment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
  }, [id]);

  return (
    apartmentData && (
      <FormEditRoom type="Edit" propertyDetails={apartmentData} />
    )
  );
};

export default EditRoom;

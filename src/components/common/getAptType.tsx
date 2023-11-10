import { useSelector } from "react-redux";
import { selectAptTypeData } from "../../store/aptTypeSlice";
import { ApartmentType } from "../../interfaces/property";

function getAptType(inputAptType: string) {
  const aptTypeData = useSelector(selectAptTypeData);

  // Find the aptCode based on the inputAptType
  const matchingApt = aptTypeData.find(
    (apt: ApartmentType) => apt._id === inputAptType
  );

  if (matchingApt) {
    return matchingApt.aptCode;
  } else {
    return "AptType not found! (Please see getAptType.tsx to debug)";
  }
}

export default getAptType;

import dayjs, { Dayjs } from "dayjs";
import { DataItem } from "./common";
import { Interests } from "@mui/icons-material";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number | undefined;
}

export interface PropertyCardProps {
  id?: BaseKey | undefined;
  title: string;
  tenant: string;
  type: string;
  photo: string;
  expiry: string;
}

export interface Filter {
  propertyType?: string;
}

export interface CurrentFilterValues {
  propertyType?: string;
}

export interface Room {
  _id: string;
  title: string;
  propertyType: string;
  price: number;
  location: string;
  description: string;
  photo: string;
  creator: {
    name: string;
    avatar: string;
    allProperties: number[];
  };
}

export interface Property {
  _id: string;
  apartmentNumber: string;
  tenants: {
    firstName: string;
    lastName: string;
  }[];
  apartmentType: {
    aptCode: string;
  };
  contractEndDate: string;
}

export interface Tenant {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  contractDocId: string;
  creditReport: CreditReport;
  dob: dayjs;
  carModel: CarModel[];
  occupants: Occupant[];
}

export interface CreditReport {
  documentName: string;
  contentType: string;
  location: string;
  fileSize: number;
  _id: string;
}

export interface CarModel {
  make: string;
  model: string;
  color: string;
  licensePlate: string;
}

export interface Occupant {
  name: string;
  dob: dayjs;
  relationToApplicant: string;
}

export interface ApartmentType {
  _id: string;
  bathNum: number;
  aptCode: string;
  bdNum: number;
  sqFeet: number;
  aptTypeDescription: string;
}

export interface ApartmentData {
  _id: string;
  apartmentNumber: string;
  contractStartDate: string;
  contractEndDate: string;
  reminder60days: string;
  reminder45days: string;
  currentRent: number;
  depositAmount: number;
  notes: string;
  apartmentType: ApartmentType;
  aptAvailableFrom: string;
  aptAvailability: boolean;
  tenants: Tenant[];
}

export interface ApartmentDataMapped {
  id: number;
  roomNumber: string;
  type: string;
  mainTenantName: string;
  startDate: string;
  endDate: string;
  _id: string;
}

export interface InventoryDataMapped {
  id: number;
  title: string;
  type: string;
  availableDate: string;
  aptAvailability: boolean;
  _id: string;
  aptAvailableFrom: string;
}

export interface ApplicationDataMapped {
  id: number;
  applicantName: string;
  typeId: string;
  submissionDate: string;
  moveinDate: string;
  _id: string;
  openhouseVisit: boolean;
}

export interface InquiryDataMapped {
  id: number;
  waitlistApplicant: string;
  typeId: string;
  contactDate: string;
  waittime: string;
  _id: string;
}

export interface WaitlistDataMapped {
  id: number;
  inquirer: string;
  typeId: string;
  inquiryDate: string;
  _id: string;
}

export interface putData {
  aptAvailability: boolean;
  aptAvailableFrom: string;
}

export interface InquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  inquiryMessage: string;
  inquiryDate: string;
  _id: string;
  aptTypeId: string;
}

export interface WaitlistData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  waitlistedDate: string;
  _id: string;
  aptTypeId: string;
  desiredDate: string;
}

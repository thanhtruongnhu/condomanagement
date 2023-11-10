import { DataItem } from "./common";
import { CarModel, Occupant } from "./property";

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  applicationDate: string;
  dob: string;
  moveInDate: string;
  creditReport: CreditReport;
  addresses: Address[];
  _id: string;
  occupants: Occupant[];
  shownApt: boolean;
  aptTypeId: string;
  driverLicense: string;
  province: string;
  beenEvicted: boolean;
  missedPayment: boolean;
  refusedToPay: boolean;
  reason: string;
  carModel: CarModel;
  employmentDetails: employmentDetails;
  additionalReference: additionalReference;
  emergencyContact: emergencyContact;
}

export interface CreditReport {
  documentName: string;
  contentType: string;
  location: string;
  fileSize: number;
  _id: string;
}

export interface Address {
  streetNo: string;
  streetName: string;
  city: string;
  province: string;
  postalCode: string;
  since: string;
  to: string;
  paysRent: boolean;
  hasGivenNotice: boolean;
  hasBeenAskedToLeave: boolean;
  reasonForLeaving: string;
  landlord: Landlord;
  _id: string;
}

export interface Landlord {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  _id: string;
}

export interface employmentDetails {
  employmentStatus: string;
  employer: string;
  since: string;
  streetCity: string;
  province: string;
  positionTitle: string;
  workSupervisor: string;
  workSupervisorPhone: string;
  otherSourcesOfIncome: string;
}

export interface additionalReference {
  name: string;
  phoneNumber: string;
  relationship: string;
  email: string;
}

export interface emergencyContact {
  name: string;
  phoneNumber: string;
  relationship: string;
  email: string;
}
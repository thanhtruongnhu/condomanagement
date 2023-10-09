import { Room } from "./property";

export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
  properties: Array | undefined;
}

export interface PropertyProps {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  photo: string;
  creator: string;
}

export interface FormProps {
  type: string;
  // register: any;
  // onFinish: (
  //     values: FieldValues,
  // ) => Promise<
  //     void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
  // >;
  // formLoading: boolean;
  // handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  // handleImageChange: (file) => void;
  // onFinishHandler: (data: FieldValues) => Promise<void> | void;
  propertyDetails: Room;
}

export interface FormProps1 {
  type: string;
  // register: any;
  // onFinish: (
  //     values: FieldValues,
  // ) => Promise<
  //     void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
  // >;
  // formLoading: boolean;
  // handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  // handleImageChange: (file) => void;
  // onFinishHandler: (data: FieldValues) => Promise<void> | void;
  propertyImage: { name: string; url: string };
}

// export interface InfoCardProps {
//   title: string;
//   data: { [key: string]: string }[]; // An array of objects with the PersonInfo structure
// }

export interface ApplicationInfoCardProps {
  submissionDate: string;
  openhouseVisit: boolean;
  setOpenhouseVisit: (value: boolean) => void; // Define the setOpenhouseVisit function
}

export interface Type {
  type: string;
  marginLeft: string;
}

export interface DataItem {
  [key: string]: string | undefined; // Define keys as strings and values as strings or undefined
}

export interface InfoCardProps {
  title: string;
  data: DataItem[]; // Accept an array of objects with flexible key-value pairs
}

export interface DescriptionCardProps {
  data: DataItem[]; // Accept an array of objects with flexible key-value pairs
}

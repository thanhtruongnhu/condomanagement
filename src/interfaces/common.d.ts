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

export interface InfoCardProps {
  title: string;
  data: { [key: string]: string }[]; // An array of objects with the PersonInfo structure
}
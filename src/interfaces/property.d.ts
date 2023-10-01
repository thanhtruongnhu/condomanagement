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

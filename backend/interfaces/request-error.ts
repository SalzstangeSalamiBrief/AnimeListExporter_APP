interface LocationsInterface {
  line: number;
  column: number;
}
interface RequestErrorInterface {
  message: string;
  status: number;
  locations: Array<LocationsInterface>
}

export default RequestErrorInterface;

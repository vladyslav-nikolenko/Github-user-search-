import { Dispatch, SetStateAction } from "react";
import { User } from "../screens/Search/Search.types.ts";

export type useGQLQueryProps = {
  queryKey: string;
  query: { query: string };
  setUsers?: Dispatch<SetStateAction<User[]>>;
};

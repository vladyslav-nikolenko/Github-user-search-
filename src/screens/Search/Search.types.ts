import { SetURLSearchParams } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

export type UserNode = {
  login: string;
};

export type User = {
  cursor: string;
  node: UserNode;
};

export type UseIntersectionObserverProps = {
  isLoading: boolean;
  hasNextPage: boolean;
  setEndCursor: Dispatch<SetStateAction<string>>;
  currentEndCursor?: string;
};

export type useSearchActionsProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setEndCursor: Dispatch<SetStateAction<string>>;
};

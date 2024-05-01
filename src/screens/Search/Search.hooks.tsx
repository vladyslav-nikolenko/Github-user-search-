// q=KonstantinLypskyi
// https://api.github.com/search/users?q=KonstantinLypskyi
// setUsers((prevUsers) => [...prevUsers]),
import { useEffect, useState } from "react";
import { useGetUsers } from "../../query/query.tsx";
import { User } from "./Search.tsx";

export const useGetUsersList = (
  searchTermQueryParam: string,
  pageNumber: number,
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setUsers([]);
  }, [searchTermQueryParam]);

  const { isLoading } = useGetUsers(
    searchTermQueryParam,
    pageNumber,
    50,
    setUsers,
    setHasMore,
  );
  return { users, hasMore, isLoading };
};

import { useQuery } from "react-query";
import { User } from "../screens/Search/Search.tsx";
import { Dispatch, SetStateAction } from "react";

export const useGetUsers = (
  searchTerm: string,
  pageNumber = 1,
  usersPerPage: number,
  setUsers?: Dispatch<SetStateAction<User[]>>,
  setHasMore?: Dispatch<SetStateAction<boolean>>,
) =>
  useQuery(
    ["GetUsers", searchTerm, pageNumber],
    async () =>
      fetch(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=${usersPerPage}&page=${pageNumber}`,
      ).then((res) => res.json()),
    {
      onSuccess: ({ items }) => {
        setUsers &&
          setUsers((prevUsers: User[]) => [
            ...new Set([...prevUsers, ...items]),
          ]); // remove set ?
        setHasMore && setHasMore(items?.length > 0);
      },
      enabled: !!searchTerm,
      staleTime: 120000,
    },
  );

export const useGetFollowers = (userName: string) =>
  useQuery(
    ["GetFollowers", userName],
    async () =>
      fetch(`https://api.github.com/users/${userName}/followers`).then((res) =>
        res.json(),
      ),
    {
      staleTime: 120000,
    },
  );

export const useGetFollowing = (userName: string) =>
  useQuery(
    ["GetFollowers", userName],
    async () =>
      fetch(`https://api.github.com/users/${userName}/following`).then((res) =>
        res.json(),
      ),
    {
      staleTime: 120000,
    },
  );

export const useGetOrganization = (userName: string) =>
  useQuery(
    ["GetOrganization", userName],
    async () =>
      fetch(`https://api.github.com/users/${userName}/orgs`).then((res) =>
        res.json(),
      ),
    {
      staleTime: 120000,
    },
  );

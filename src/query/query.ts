import { useQuery } from "react-query";
import { User } from "../screens/Search/Search.types.ts";
import { useGQLQueryProps } from "./query.types.ts";

// add your gitHub token to get access to gitHub api
const myToken = "";

export const useGQLQuery = ({ queryKey, query, setUsers }: useGQLQueryProps) =>
  useQuery(
    [queryKey],
    async () =>
      fetch(`https://api.github.com/graphql`, {
        method: "POST",
        headers: { Authorization: "Bearer " + myToken },
        body: JSON.stringify(query)
      }).then(res => res.json()),
    {
      staleTime: 120000,
      onSuccess: ({ data }) => {
        console.log("data onSuccess", data);
        setUsers &&
          setUsers((prevUsers: User[]) => [
            ...new Set([...prevUsers, ...(data?.search?.edges ?? [])])
          ]);
      }
    }
  );

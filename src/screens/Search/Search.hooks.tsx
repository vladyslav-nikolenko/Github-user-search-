import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useGQLQuery } from "../../query/query.ts";
import {
  UseIntersectionObserverProps,
  User,
  UserNode,
  useSearchActionsProps
} from "./Search.types.ts";
import { Path } from "../../common/consts.ts";
import { useNavigate } from "react-router-dom";
import { searchForUser } from "../../query/utils.ts";

export const useGetUsersList = ({
  searchTermQueryParam
}: {
  searchTermQueryParam: string;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [endCursor, setEndCursor] = useState("");
  console.log("users", users);
  const queryKey = searchTermQueryParam + endCursor;

  useEffect(() => {
    setUsers([]);
  }, [searchTermQueryParam]);

  const { data: gqlData, isLoading } = useGQLQuery({
    queryKey,
    query: searchForUser(searchTermQueryParam, endCursor),
    setUsers
  });

  const currentEndCursor = gqlData?.data?.search?.pageInfo?.endCursor;
  const hasNextPage = gqlData?.data?.search?.pageInfo?.hasNextPage;
  return {
    users,
    isLoading,
    currentEndCursor,
    setEndCursor,
    hasNextPage
  };
};

export const useIntersectionObserver = ({
  isLoading,
  hasNextPage,
  setEndCursor,
  currentEndCursor
}: UseIntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastUser = useCallback(
    (node: Element) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && currentEndCursor) {
          hasNextPage && setEndCursor(currentEndCursor);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  return { lastUser };
};

export const useSearchActions = ({
  searchParams,
  setSearchParams,
  setEndCursor
}: useSearchActionsProps) => {
  const navigate = useNavigate();

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value ?? "";
      searchParams.delete("users");
      searchParams.append("users", value);
    },
    [searchParams]
  );

  const onSearch = () => {
    setSearchParams(searchParams, { replace: true });
    setEndCursor("");
  };

  const onTextFieldKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onUserClick = ({ login }: UserNode) => {
    navigate(Path.user(login));
  };

  return { onChange, onSearch, onTextFieldKeyDown, onUserClick };
};

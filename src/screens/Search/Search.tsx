import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useGetUsersList } from "./Search.hooks.tsx";
import { Path } from "../../common/consts.ts";
import { Container, ResultContainer } from "./Search.styles.tsx";

export type User = {
  login: string;
};

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const searchTermQueryParam = searchParams.get("users") ?? "";
  const navigate = useNavigate();

  const { users, hasMore, isLoading } = useGetUsersList(
    searchTermQueryParam,
    pageNumber,
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElement = useCallback(
    (node: Element) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading],
  );
  console.log("searchTermQueryParam", searchTermQueryParam);
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value ?? "";
      searchParams.delete("users");
      searchParams.append("users", value);
    },
    [searchParams],
  );

  const onSend = () => {
    setSearchParams(searchParams, { replace: true });
    setPageNumber(1);
  };
  const onTextFieldKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      // event.preventDefault();
      onSend();
    }
  };
  const onUserClick = ({ login }: User) => {
    console.log("here");
    navigate(Path.user(login));
  };

  console.log("users", users);
  return (
    <Container>
      <TextField
        label={"Search"}
        variant="outlined"
        defaultValue={searchTermQueryParam} // doesn't work on reload - check
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => onSend()}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={onChange}
        onKeyDown={onTextFieldKeyDown}
      />
      <ResultContainer>
        {users?.map((user: User, index) => {
          if (users?.length === index + 1) {
            return (
              <div
                key={user.login}
                ref={lastBookElement as any}
                onClick={() => onUserClick({ login: user.login })}
              >
                {user.login}
              </div>
            );
          }
          return (
            <div
              key={user.login}
              onClick={() => onUserClick({ login: user.login })}
            >
              {user.login}
            </div>
          );
        })}
        {isLoading && <div>Loading...</div>}
        {!users?.length && searchTermQueryParam && <div>No results</div>}
      </ResultContainer>
    </Container>
  );
};

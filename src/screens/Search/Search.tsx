import { LegacyRef } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  useGetUsersList,
  useIntersectionObserver,
  useSearchActions
} from "./Search.hooks.tsx";
import { Container, ResultContainer } from "./Search.styles.tsx";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermQueryParam = searchParams.get("users") ?? "";

  const {
    users,
    isLoading,
    currentEndCursor,
    setEndCursor,
    hasNextPage
  } = useGetUsersList({ searchTermQueryParam });

  const { lastUser } = useIntersectionObserver({
    isLoading,
    hasNextPage,
    setEndCursor,
    currentEndCursor
  });

  const {
    onChange,
    onSearch,
    onTextFieldKeyDown,
    onUserClick
  } = useSearchActions({ searchParams, setSearchParams, setEndCursor });

  return (
    <Container>
      <TextField
        label={"Search"}
        variant="outlined"
        defaultValue={searchTermQueryParam}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => onSearch()}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        onChange={onChange}
        onKeyDown={onTextFieldKeyDown}
      />
      <ResultContainer>
        {users?.map(edge => {
          if (users?.length) {
            return (
              <div
                key={edge?.node.login}
                ref={lastUser as LegacyRef<HTMLDivElement>}
                onClick={() => onUserClick({ login: edge?.node.login })}
              >
                {edge?.node.login}
              </div>
            );
          }
          return (
            <div
              key={edge?.node.login}
              onClick={() => onUserClick({ login: edge?.node.login })}
            >
              {edge?.node.login}
            </div>
          );
        })}
        {isLoading && <div>Loading...</div>}
        {!users?.length && searchTermQueryParam && <div>No results</div>}
      </ResultContainer>
    </Container>
  );
};

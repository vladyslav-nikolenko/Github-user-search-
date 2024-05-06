import { useNavigate, useParams } from "react-router-dom";
import { useGQLQuery } from "../../query/query.ts";
import {
  StyledAvatar,
  StyledBottomContainer,
  StyledCompanyContainer,
  StyledFollowersContainer,
  StyledPaper,
  StyledUserInfoContainer
} from "./ProfilePage.styles.ts";
import { Button } from "@mui/material";
import { Path } from "../../common/consts.ts";
import { UserNode } from "../Search/Search.types.ts";
import { getUserInfo } from "../../query/utils.ts";

export const ProfilePage = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const queryUserName = userName ?? "";

  const { data: gqlData } = useGQLQuery({
    queryKey: queryUserName,
    query: getUserInfo(queryUserName)
  });

  const userData = gqlData?.data?.search?.edges?.[0]?.node;
  const company = userData?.company;
  const followers = userData?.followers?.edges;
  const followersCount = userData?.followers?.totalCount;
  const followingCount = userData?.following?.totalCount;
  const following = userData?.following?.edges;

  const onUserClick = (userName: string) => {
    navigate(Path.user(userName));
  };

  return (
    <StyledPaper elevation={5}>
      <h1>User Profile</h1>
      <StyledUserInfoContainer>
        <StyledAvatar alt="avatar picture" src={userData?.avatarUrl} />
        <h2>User login: {userData?.login}</h2>
        <h2>User name: {userData?.name}</h2>
      </StyledUserInfoContainer>
      <StyledFollowersContainer>
        <div>
          <p>Number of followers - {followersCount}</p>
          Followers list:
          {followers?.length === 0 && <div>No following users</div>}
          {followers?.map(({ node }: { node: UserNode }) => {
            return (
              <div key={node.login} onClick={() => onUserClick(node.login)}>
                {node.login}
              </div>
            );
          })}
        </div>
        <div>
          <p>Number of Following users - {followingCount}</p>
          Following list:
          {following?.length === 0 && <div>User is not following anyone</div>}
          {following?.map(({ node }: { node: UserNode }) => {
            return (
              <div key={node.login} onClick={() => onUserClick(node.login)}>
                {node.login}
              </div>
            );
          })}
        </div>
      </StyledFollowersContainer>
      <StyledBottomContainer>
        <Button href="/">Back to search</Button>
        {company && (
          <StyledCompanyContainer>
            <p>Company link:</p>
            <a href={`https://github.com/${company}`}>{company}</a>
          </StyledCompanyContainer>
        )}
      </StyledBottomContainer>
    </StyledPaper>
  );
};

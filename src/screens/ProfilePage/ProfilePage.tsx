import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFollowers,
  useGetFollowing,
  useGetOrganization,
  useGetUsers,
} from "../../query/query.tsx";
import {
  StyledAvatar,
  StyledBottomContainer,
  StyledCompanyContainer,
  StyledFollowersContainer,
  StyledPaper,
  StyledUserInfoContainer,
} from "./ProfilePage.styles.ts";
import { Button } from "@mui/material";
import { Path } from "../../common/consts.ts";
import { User } from "../Search/Search.tsx";

export const ProfilePage = () => {
  const { userName } = useParams();
  const navigate = useNavigate();

  const { data } = useGetUsers(userName ?? "", 1, 1);
  const { data: followersList, isError: isFollowersError } = useGetFollowers(
    userName ?? "",
  );
  const { data: followingList, isError: isFollowingError } = useGetFollowing(
    userName ?? "",
  );
  const { data: company, isError: isCompanyError } = useGetOrganization(
    userName ?? "",
  );
  const userInfo = data?.items?.[0];
  const onUserClick = (userName: string) => {
    navigate(Path.user(userName));
  };

  const isDisplayFollowingList = !followingList?.message && !isFollowingError;
  const isDisplayFollowersList = !followersList?.message && !isFollowersError;
  const isDisplayCompany =
    !company?.message && !isCompanyError && !!company?.length;

  return (
    <StyledPaper elevation={5}>
      <h1>User Profile</h1>
      <StyledUserInfoContainer>
        <StyledAvatar alt="avatar picture" src={userInfo?.avatar_url} />
        <h2>User login: {userInfo?.login}</h2>
      </StyledUserInfoContainer>
      <StyledFollowersContainer>
        {isDisplayFollowersList && (
          <div>
            Followers list:
            {followersList?.length === 0 && <div>No following users</div>}
            {followersList?.map((follower: User) => {
              return (
                <div
                  key={follower.login}
                  onClick={() => onUserClick(follower.login)}
                >
                  {follower.login}
                </div>
              );
            })}
          </div>
        )}
        {isDisplayFollowingList && (
          <div>
            Following list:
            {followingList?.length === 0 && (
              <div>User is not following anyone</div>
            )}
            {followingList?.map((following: User) => {
              return (
                <div
                  key={following.login}
                  onClick={() => onUserClick(following.login)}
                >
                  {following.login}
                </div>
              );
            })}
          </div>
        )}
      </StyledFollowersContainer>
      <StyledBottomContainer>
        <Button href="/">Back to search</Button>
        {isDisplayCompany && (
          <StyledCompanyContainer>
            <p>Company link:</p>
            <a href={`https://github.com/${company?.[0]?.login}`}>
              {company?.[0]?.login}
            </a>
          </StyledCompanyContainer>
        )}
      </StyledBottomContainer>
    </StyledPaper>
  );
};

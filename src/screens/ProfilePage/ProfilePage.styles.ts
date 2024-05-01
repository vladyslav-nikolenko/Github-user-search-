import { Avatar, Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(() => ({
  width: "60%",
  margin: "50px auto",
  padding: "20px",
}));

export const StyledUserInfoContainer = styled("div")(() => ({
  display: "flex",
  gap: "50px",
}));

export const StyledAvatar = styled(Avatar)(() => ({
  width: "56px",
  height: "56px",
  marginTop: "10px",
}));

export const StyledFollowersContainer = styled("div")(() => ({
  display: "flex",
  gap: "50px",
  margin: "40px 0 0 0",
}));

export const StyledCompanyContainer = styled("div")(() => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

export const StyledBottomContainer = styled("div")(() => ({
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
}));

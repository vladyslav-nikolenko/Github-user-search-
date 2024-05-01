import { useRoutes } from "react-router-dom";
import { Search } from "../screens/Search/Search.tsx";
import { ProfilePage } from "../screens/ProfilePage/ProfilePage.tsx";

export const RootRoutes = () =>
  useRoutes([
    {
      path: "/",
      element: <Search />,
    },
    {
      path: "user/:userName",
      element: <ProfilePage />,
    },
  ]);

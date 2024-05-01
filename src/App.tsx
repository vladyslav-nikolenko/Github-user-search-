import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { RootRoutes } from "./routes/routes.tsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Users from "./pages/UsersPage";
import User from "./pages/UserPage";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import CharacterDetail from "./pages/CharacterDetail";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/team"
            element={<Navigate replace to="/about" />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="/character/:id"
            element={<CharacterDetail />}
          />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="welcome" element={<p>Welcome</p>} />
            <Route path="goodbye" element={<p>Goodbye</p>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

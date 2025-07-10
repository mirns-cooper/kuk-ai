import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
  const isLoggedIn = user != null;

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900">
        <Header
          user={user}
          setUser={setUser}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/saved"
              element={<Saved />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

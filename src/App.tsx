import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import InsightsPage from "./pages/InsightsPage";
import BudgetGoals from "./pages/BudgetGoals";
import ChartsPage from "./pages/ChartsPage";

import Sidebar from "./components/ui/Sidebar";

import { UserProvider } from "./firebase/UserContext";
import { useUser } from "./firebase/UserContext";

import { FinanceProvider } from "./context/FinanceContext";

function AppContent() {
  const user = useUser();

  const [activePage, setActivePage] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [isDarkMode, setIsDarkMode] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "quartly-theme"
        );

      return saved === "dark";
    });

  useEffect(() => {
    localStorage.setItem(
      "quartly-theme",
      isDarkMode
        ? "dark"
        : "light"
    );

    if (isDarkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [isDarkMode]);

  if (!user) {
    return <Login />;
  }

  return (
    <FinanceProvider>
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {activePage === "dashboard" && (
        <Dashboard
          isDarkMode={isDarkMode}
          toggleDarkMode={() =>
            setIsDarkMode(
              !isDarkMode
            )
          }
        />
      )}

{activePage ===
  "insights-page" && (

  <InsightsPage
    isDarkMode={isDarkMode}
    toggleDarkMode={() =>
      setIsDarkMode(
        !isDarkMode
      )
    }
  />

)}

{activePage ===
  "budgets" && (

  <BudgetGoals
    isDarkMode={
      isDarkMode
    }
  />

)}

{activePage === "charts-page" && (
  <ChartsPage
    isDarkMode={isDarkMode}
  />
)}
      
    </FinanceProvider>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
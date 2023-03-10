import Header from "./components/header/header";
import WelcomePage from "./pages/welcome.page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import NotesPage from "./pages/notes.page";
import { useMediaQuery } from "react-responsive";
import HomeScreen from "./components/screens/homeScreen";
import NotesScreen from "./components/screens/noteScreen";
import { MyGlobalContext } from "./context/globalContext";



function App() {
  const [activeScreen, setActiveScreen] = useState("none");

  const changePage = (screen: string) => {
    setActiveScreen(screen);
  };

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 360px)",
  });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 361px)",
  });

  return (
    <>
      {isSmallScreen && (
        <MyGlobalContext.Provider value= {{isMobile:true }}>
        <Router>
          <Routes>
            <Route path="" element={<HomeScreen />} />
            <Route path="/notesScreen" element={<NotesScreen />} />
          </Routes>
        </Router>
        </MyGlobalContext.Provider>
      )}

      {isDesktopOrLaptop && (
        <MyGlobalContext.Provider value= {{isMobile:false }}>

        <Router>
          <Header onClick={changePage} activeScreen={activeScreen} />

          <Routes>
            <Route
              path="/home"
              element={<WelcomePage activeScreen={changePage} />}
            />
            <Route
              path="/notes"
              element={<NotesPage activeScreen={changePage} />}
            />
          </Routes>
        </Router>
        </MyGlobalContext.Provider>

      )}
    </>
  );
}

export default App;

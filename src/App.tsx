
import './App.css';
import Header from './components/header/header';
import WelcomePage from './pages/welcome.page';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';
import NotesPage from './pages/notes.page';
import { useMediaQuery } from 'react-responsive'
import FooterHome from './components/footer/footerHome';
import HomeScreen from './components/screens/homeScreen';
import NotesScreen from './components/screens/noteScreen';

function App() {
  const [isHomeActivate, setIsHomeActivate] = useState(true)

  const changePage = (isHome: boolean) => {
     setIsHomeActivate(isHome)
  }
  const isSmallScreen= useMediaQuery({
    query: '(max-width: 360px)'
  })

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 361px)'
  })

  return (
    <>
  {isSmallScreen && <Router>
   
       <Routes>
       <Route path="" element={<HomeScreen />} />
       <Route path="/notesScreen" element={<NotesScreen />} />
       </Routes>
       </Router>}

    {isDesktopOrLaptop && <Router>
    <Header onClick={changePage} isHomeActivate={isHomeActivate}/>
   
       <Routes>
       <Route path="/home" element={<WelcomePage />} />
       <Route path="/notes" element={<NotesPage />} />
       </Routes>
       </Router>}
   </>
  );
}

export default App;

import { ChakraProvider, Container, Box, Flex } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Navigation
import Navbar from './components/ui/nav-bar';

// Routes
import About from './pages/About';
import Home from './pages/Home';
import PeopleSoft from './pages/PeopleSoft';
import Mainframes from './pages/Mainframes';

import TerminalPage from './pages/Terminal';

import { ErrorPage } from './components/ui/error-page';
import { LoadingSpinner } from './components/ui/loading-spinner';
import {  useSelector } from 'react-redux';
import { RootState } from './components/data/store';


const App = () => {
  const { loading, error } = useSelector((state: RootState) => state.player);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return (
    <BrowserRouter>
      <Navbar />
      <Box 
        fluid
        height="calc(100vh - 80px)"
	width="100%"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainframes" element={<Mainframes />} />
          <Route path="/peoplesoft" element={<PeopleSoft />} />    
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;







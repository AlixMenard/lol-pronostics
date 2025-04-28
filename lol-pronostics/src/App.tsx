import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { authService } from './services/auth.service';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Stats from './pages/Stats';
import UserPredictions from './pages/UserPredictions';
import './App.css';

const App = () => {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={isAuthenticated ? <Home/> : <Login />}  />
        <Route path="/stats" element={<Stats />} />
        <Route path="/predictions/:username" element={<UserPredictions />} />
      </Route>
    </Routes>
  );
}

export default App;

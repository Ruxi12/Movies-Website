import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import './App.css';
// import Auth from './components/Auth'; // Verify this path is correct
import { Auth } from "./components/auth";
import Register from './components/Register'; // Verify this path is correct
import Login from './components/Login'; 
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage'; // Componenta nouă
import ProfilePage from './components/ProfilePage'; // Componenta nouă
import Navbar from './components/Navbar'; // Importă componenta Navbar
import AddFilm from './components/AddFilm'; // Ajustează calea dacă este necesar
import Dashboard from './components/Dashboard'; // Ajustați calea dacă este necesar
import EditFilm from './components/EditFilm';


function App() {
  // const [movieList, setMovieList] = useState([]);
  // const [newMovieTitle, setNewMovieTitle] = useState("");
  // const [newReleaseDate, setNewReleaseDate] = useState(0);
  // const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  // const [updatedTitle, setUpdatedTitle] = useState("");
  // const [fileUpload, setFileUpload] = useState(null);
  
  // const moviesCollectionRef = collection(db, "movies");

  // // Moved getMovieList outside useEffect so it can be reused
  // const getMovieList = async () => {
  //   try {
  //     const data = await getDocs(moviesCollectionRef);
  //     setMovieList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getMovieList(); // Call getMovieList inside useEffect
  // }, []);

  // const deleteMovie = async (id) => {
  //   await deleteDoc(doc(db, "movies", id));
  //   getMovieList(); // Now accessible
  // };

  // const updateMovieTitle = async (id) => {
  //   await updateDoc(doc(db, "movies", id), { title: updatedTitle });
  //   getMovieList(); // Now accessible
  // };

  // const uploadFile = async () => {
  //   if (!fileUpload) return;
  //   const fileRef = ref(storage, `movies/${fileUpload.name}`);
  //   await uploadBytes(fileRef, fileUpload);
  //   // Consider adding functionality to handle the response from uploadBytes
  // };

  // const onSubmitMovie = async () => {
  //   await addDoc(moviesCollectionRef, {
  //     title: newMovieTitle,
  //     releaseDate: newReleaseDate,
  //     receivedAnOscar: isNewMovieOscar,
  //     userId: auth.currentUser.uid,
  //   });
  //   getMovieList(); // Now accessible
  // };

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          {/* <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link> {/* Adăugat link către profil */}
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} /> {/* Adăugat ruta către profil */}
            <Route path="/add-film" element={<AddFilm />} /> {/* Noua rută adăugată */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-film/:id" element={<EditFilm />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

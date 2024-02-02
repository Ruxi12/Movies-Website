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

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  
  const moviesCollectionRef = collection(db, "movies");

  // Moved getMovieList outside useEffect so it can be reused
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      setMovieList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList(); // Call getMovieList inside useEffect
  }, []);

  const deleteMovie = async (id) => {
    await deleteDoc(doc(db, "movies", id));
    getMovieList(); // Now accessible
  };

  const updateMovieTitle = async (id) => {
    await updateDoc(doc(db, "movies", id), { title: updatedTitle });
    getMovieList(); // Now accessible
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileRef = ref(storage, `movies/${fileUpload.name}`);
    await uploadBytes(fileRef, fileUpload);
    // Consider adding functionality to handle the response from uploadBytes
  };

  const onSubmitMovie = async () => {
    await addDoc(moviesCollectionRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
      receivedAnOscar: isNewMovieOscar,
      userId: auth.currentUser.uid,
    });
    getMovieList(); // Now accessible
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* Additional UI components and functionality */}
        {/* ... */}
      </div>
    </Router>
  );
}

export default App;

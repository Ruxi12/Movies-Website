import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import pentru navigare
import { useAuth } from '../context/AuthContext'; 
import './Dashboard.css'; 

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Hook pentru navigare
  const { currentUser } = useAuth(); 

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirecționează către login dacă nu există un utilizator autentificat
      return; // Împiedică executarea ulterioară a codului din useEffect
    }

    const fetchMovies = async () => {
      const db = getFirestore();
      const moviesCollection = collection(db, 'movies');
      const movieSnapshot = await getDocs(moviesCollection);
      const moviesList = movieSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMovies(moviesList);
    };

    fetchMovies();
  }, [currentUser, navigate]); // Includeți `currentUser` în lista de dependențe pentru a reacționa la schimbările de autentificare

  // Funcția pentru navigarea către pagina de editare
  const navigateToEditPage = (id) => {
    navigate(`/edit-film/${id}`);
  };

  // Funcția pentru ștergerea unui film
  const deleteMovie = async (id) => {
    const isConfirmed = window.confirm("Sunteți sigur că vreți să ștergeți filmul?");
    if (isConfirmed) {
      const db = getFirestore();
      const movieRef = doc(db, 'movies', id);
      await deleteDoc(movieRef);
      setMovies(movies.filter(movie => movie.id !== id)); // Actualizează state-ul pentru a reflecta ștergerea
    }
  };
  
  return (
    <div className="dashboard">
      <h1>Movie Dashboard</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-detail">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Rating: {movie.rating}</p>
            <p>Category: {movie.category}</p>
            <div className="movie-actions">
              <button className="edit-btn" onClick={() => navigateToEditPage(movie.id)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteMovie(movie.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

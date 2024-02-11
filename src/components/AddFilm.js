import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Pentru redirecționare
import { useAuth } from '../context/AuthContext'; // Importați hook-ul de autentificare
import Button from './UI/Button';
import InputField from './UI/InputField';
import './FormStyles.css';

const AddFilm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate(); // Hook pentru navigare
  const { currentUser } = useAuth(); // Utilizarea hook-ului de autentificare pentru a obține utilizatorul curent

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirecționează către login dacă nu există un utilizator autentificat
    }
  }, [currentUser, navigate]); // Dependințe pentru useEffect

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!db) {
      console.error('Database not initialized');
      alert('Database initialization error!');
      return;
    }

    try {
      await addDoc(collection(db, "movies"), {
        title,
        description,
        rating: Number(rating), // Asigură-te că ratingul este salvat ca număr
        category,
      });
      alert('Film adăugat cu succes!');
      // Resetarea câmpurilor formularului după adăugare
      setTitle('');
      setDescription('');
      setRating('');
      setCategory('');
    } catch (error) {
      console.error("A apărut o eroare la adăugarea filmului: ", error);
      alert('Eroare la adăugarea filmului!');
    }
  };

  return (
    <div className="add-film-container">
      <h2>Adaugă un film nou</h2>
      <form onSubmit={handleSubmit} className="film-form">
        {/* Input fields și textarea rămân neschimbate */}
        <InputField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nume Film"
          required
          className="input-add-film"
        />
        <textarea
          className="input-add-film description-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descriere"
          required
        ></textarea>
        <InputField
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating între 0 și 5"
          min="0"
          max="5"
          required
          className="input-add-film"
        />
        <InputField
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categorie"
          required
          className="input-add-film"
        />
        <Button type="submit" className="form-button">Adaugă Film</Button>
      </form>
    </div>
  );
};

export default AddFilm;

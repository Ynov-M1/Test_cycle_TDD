import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home({persons}) {
    const navigate = useNavigate();

    const handleGoToForm = () => {
        navigate('/register');
    };

    return (
        <div className="home-container">
            <div className="card">
                <h1>Bienvenue</h1>
                <p>Nombre d'utilisateurs inscrits : <strong>{persons.length}</strong></p>
                <button onClick={handleGoToForm}>
                    Inscription
                </button>
                <div className="user-table-container">
                    <h3>Liste des utilisateurs inscrits</h3>
                    {persons.length > 0 ? (
                        <ul className="user-list">
                            {persons.map((person, index) => (
                                <li key={index}>
                                    {person.firstName} {person.lastName}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun utilisateur inscrit pour l'instant.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
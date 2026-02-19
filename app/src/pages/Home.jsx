import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

/**
 * Home Component
 *
 * Displays the list of registered persons and a button to navigate to the registration form.
 *
 * @module Home
 * @component
 *
 * @param {Object} props
 * @param {Array<Object>} props.persons - Array of person objects to display
 *
 * @returns {JSX.Element}
 */
export default function Home({persons}) {
    const navigate = useNavigate();

    /**
     * Navigate to the registration form.
     * @module Home
     * @function handleGoToForm
     * @private
     */
    const handleGoToForm = () => {
        navigate('/register');
    };

    return (
        <div className="home-container">
            <div className="card">
                <h1>Bienvenue</h1>
                <p>Nombre d'utilisateurs inscrits : <strong data-cy="user-count">{persons.length}</strong></p>
                <button data-cy="nav-register" onClick={handleGoToForm}>
                    Inscription
                </button>
                <div className="user-table-container">
                    <h3>Liste des utilisateurs inscrits</h3>
                    {persons.length > 0 ? (
                        <ul data-cy="user-list" className="user-list">
                            {persons.map((person, index) => (
                                <li key={index}>
                                    {person.firstName} {person.lastName}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p data-cy="no-users">Aucun utilisateur inscrit pour l'instant.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
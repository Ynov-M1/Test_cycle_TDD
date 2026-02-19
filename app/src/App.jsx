import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Register from "./pages/Register"

/**
 * Main App Component
 *
 * Handles routing, state management for registered persons, and localStorage persistence.
 *
 * @module App
 * @component
 * @returns {JSX.Element} The main application component with routes
 */
function App() {
    const [persons, setPersons] = useState([]);

    //Load stored persons from localStorage on mount. //
    useEffect(() => {
        const stored = localStorage.getItem('persons');
        if (stored) setPersons(JSON.parse(stored));
    }, []);

    //Sync persons state when localStorage changes in other tabs/windows. //
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === 'persons') {
                setPersons(JSON.parse(e.newValue) || []);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    /**
     * Add a person to the state and persist to localStorage.
     *
     * Performs a uniqueness check on the email before adding the person.
     * If an existing person already has the same email (case-insensitive),
     * an error is thrown to prevent duplication.
     *
     * @module App
     * @function addPerson
     * @private
     * @param {Object} person - Person object to add
     * @throws {Error} Throws "EMAIL_ALREADY_EXISTS" if the email is already registered
     */
    const addPerson = (person) => {
        const emailExists = persons.some(
            p => p.email.toLowerCase() === person.email.toLowerCase()
        );

        if (emailExists) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }

        const newPersons = [...persons, person];
        setPersons(newPersons);
        localStorage.setItem('persons', JSON.stringify(newPersons));
    };

    return (
        <BrowserRouter basename="/Test_cycle_TDD/">
            <Routes>
                <Route path="/" element={<Home persons={persons}/>} />
                <Route path="/register" element={<Register addPerson={addPerson}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
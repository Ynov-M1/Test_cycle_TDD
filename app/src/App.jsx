import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Register from "./pages/Register"
import { addPerson as addPersonService } from "./domain/personService";

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
     * Adds a person to the application state and persists it to localStorage.
     *
     * Delegates business validation (e.g., email uniqueness)
     * to the domain service (addPersonService).
     *
     * @module App
     * @function addPerson
     * @private
     * @param {Object} person - Person object to add
     * @throws {Error} Propagates errors thrown by addPersonService
     */
    const addPerson = (person) => {
        const newPersons = addPersonService(persons, person);
        setPersons(newPersons);
        localStorage.setItem("persons", JSON.stringify(newPersons));
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
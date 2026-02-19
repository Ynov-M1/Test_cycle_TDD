import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Register from "./pages/Register"

function App() {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('persons');
        if (stored) setPersons(JSON.parse(stored));
    }, []);

    // Manage changes from other tabs/windows
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === 'persons') {
                setPersons(JSON.parse(e.newValue) || []);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const addPerson = (person) => {
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
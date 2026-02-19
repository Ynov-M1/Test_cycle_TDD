import PersonForm from "../components/PersonForm"
import { Link } from 'react-router-dom';
import './Register.css'

export default function Register({addPerson}) {
    return (
        <div className="register-container">
            <PersonForm addPerson={addPerson}/>
            <Link to="/">
                <button className="back-button">Retour à l'accueil</button>
            </Link>
        </div>
    )
}
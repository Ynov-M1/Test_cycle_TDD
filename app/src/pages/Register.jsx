import PersonForm from "../components/PersonForm"
import { Link } from 'react-router-dom';
import './Register.css'

export default function Register() {
    return (
        <div className="register-container">
            <PersonForm />
            <Link to="/">
                <button className="back-button">Retour à l'accueil</button>
            </Link>
        </div>
    )
}
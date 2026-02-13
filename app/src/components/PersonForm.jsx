import React, { useState } from 'react'
import { validatePerson, validateAge, validateZipCode, validateCity, validateName, validateEmail } from '../domain/validator'
import { getErrorMessage } from '../utils/errorMessages'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './PersonForm.css'

export default function PersonForm() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        zip: '',
        city: '',
    })

    const [errors, setErrors] = useState({})

    const validateField = (name, value) => {
        if (!value) {
            setErrors(prev => ({ ...prev, [name]: '' }))
            return
        }

        try {
            switch (name) {
                case 'firstName':
                    validateName(value, 'firstName')
                    break
                case 'lastName':
                    validateName(value, 'lastName')
                    break
                case 'email':
                    validateEmail(value)
                    break
                case 'zip':
                    validateZipCode(value)
                    break
                case 'city':
                    validateCity(value)
                    break
                case 'birthDate':
                    validateAge(new Date(value))
                    break
            }
            setErrors(prev => ({ ...prev, [name]: '' }))
        } catch (err) {
            setErrors(prev => ({ ...prev, [name]: err.message }))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        validateField(name, value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const person = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                birthDate: new Date(form.birthDate),
                zip: form.zip,
                city: form.city
            }
            validatePerson(person)
            localStorage.setItem('person', JSON.stringify(person))
            toast.success("Enregistré avec succès !")
            setForm({ firstName: '', lastName: '', email: '', birthDate: '', zip: '', city: '' })
            setErrors({})
        } catch (err) {
            /* istanbul ignore next */
            const key =
                err.message.includes('FIRST_NAME') ? 'firstName' :
                    err.message.includes('LAST_NAME') ? 'lastName' :
                        err.message.includes('EMAIL') ? 'email' :
                            err.message.includes('ZIP') ? 'zip' :
                                err.message.includes('CITY') ? 'city' :
                                    err.message.includes('UNDERAGE') ? 'birthDate' :
                                        err.message.includes('FUTURE_DATE') ? 'birthDate' :'form'
            /* istanbul ignore next */
            setErrors({ [key]: err.message })
        }
    }

    const isDisabled =
        !form.firstName || !form.lastName || !form.email || !form.birthDate || !form.zip || !form.city || Object.values(errors).some(Boolean)

    return (
        <div className="card">
            <h2>Formulaire d'inscription</h2>
            <form onSubmit={handleSubmit} className="person-form">
                <div className="form-group">
                    <input
                        name="firstName"
                        aria-label="firstName"
                        placeholder="Prénom"
                        value={form.firstName}
                        onChange={handleChange}
                        onBlur={(e) => validateField('firstName', e.target.value)}
                    />
                    {errors.firstName && <span className="error">{getErrorMessage(errors.firstName)}</span>}
                </div>

                <div className="form-group">
                    <input
                        name="lastName"
                        aria-label="lastName"
                        placeholder="Nom"
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={(e) => validateField('lastName', e.target.value)}
                    />
                    {errors.lastName && <span className="error">{getErrorMessage(errors.lastName)}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="date"
                        name="birthDate"
                        data-testid="birthDate"
                        value={form.birthDate}
                        onChange={handleChange}
                        onBlur={(e) => validateField('birthDate', e.target.value)}
                    />
                    {errors.birthDate && <span className="error">{getErrorMessage(errors.birthDate)}</span>}
                </div>

                <div className="form-group">
                    <input
                        name="zip"
                        aria-label="zip"
                        placeholder="Code Postal"
                        value={form.zip}
                        onChange={handleChange}
                        onBlur={(e) => validateField('zip', e.target.value)}
                    />
                    {errors.zip && <span className="error">{getErrorMessage(errors.zip)}</span>}
                </div>

                <div className="form-group">
                    <input
                        name="city"
                        aria-label="city"
                        placeholder="Ville"
                        value={form.city}
                        onChange={handleChange}
                        onBlur={(e) => validateField('city', e.target.value)}
                    />
                    {errors.city && <span className="error">{getErrorMessage(errors.city)}</span>}
                </div>

                <div className="form-group">
                    <input
                        name="email"
                        aria-label="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={(e) => validateField('email', e.target.value)}
                    />
                    {errors.email && <span className="error">{getErrorMessage(errors.email)}</span>}
                </div>

                <button type="submit" disabled={isDisabled}>
                    Soumettre
                </button>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
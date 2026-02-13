import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/App.jsx'

describe('App component', () => {
    test('renders initial count and increments on click', async () => {
        render(<App />)

        // On récupère le bouton
        const button = screen.getByRole('button')

        // Vérifier que le compteur commence à 0
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('count is 0')

        // Simuler un clic
        fireEvent.click(button)
        expect(button).toHaveTextContent('count is 1')

        // Simuler un autre clic
        fireEvent.click(button)
        expect(button).toHaveTextContent('count is 2')
    })
})

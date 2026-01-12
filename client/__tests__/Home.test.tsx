import { render, screen } from '@testing-library/react'
import Home from '../app/page' // Adjust import path if needed
import { describe, it, expect, vi } from 'vitest'

// Mock components if needed
vi.mock('../components/some-component', () => ({
    default: () => <div>Mocked Component</div>
}))

describe('Home Page', () => {
    it('renders without crashing', () => {
        render(<Home />)
        // Use text selector that matches actual content
        const button = screen.getByText(/Browse Freelancers/i)
        expect(button).toBeDefined()
    })
})

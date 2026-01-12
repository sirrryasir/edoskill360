import { render, screen } from '@testing-library/react';
import Register from '../app/register/page';
import { describe, it, expect, vi } from 'vitest';

// Mock useRouter
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
    useSearchParams: () => ({
        get: vi.fn(),
    }),
}));

describe('Register Page', () => {
    it('renders registration form', () => {
        render(<Register />);
        expect(screen.getByRole('heading', { name: /create an account/i })).toBeDefined();
        // Check for specific role selection buttons or labels if they exist, 
        // or general inputs
        expect(screen.getByLabelText(/full name/i)).toBeDefined();
        expect(screen.getByLabelText(/email/i)).toBeDefined();
        expect(screen.getByLabelText(/password/i)).toBeDefined();
        // Check for role selection label
        expect(screen.getByText(/I am a.../i)).toBeDefined();
        expect(screen.getByRole('button', { name: /Create Account/i })).toBeDefined();
    });
});

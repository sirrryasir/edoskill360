import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../app/login/page';
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

describe('Login Page', () => {
    it('renders login form', () => {
        render(<Login />);
        expect(screen.getByLabelText(/email/i)).toBeDefined();
        expect(screen.getByLabelText(/password/i)).toBeDefined();
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeDefined();
    });

    // We can't easily test full integration here without mocking global fetch or wrapping in context
    // But this verifies the UI components are present.
});

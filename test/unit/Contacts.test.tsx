import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contacts } from '../../src/client/pages/Contacts';

describe('Contacts Component', () => {
    const setup = () => {
        render(<Contacts />);
    };

    it('should render the Contacts component with correct title and content', () => {
        setup();

        // Check for the Helmet title
        expect(document.title).toBe('Contacts');

        // Check for the heading
        expect(screen.getByRole('heading', { name: /Contacts/i })).toBeInTheDocument();

        // Check for the paragraphs
        expect(screen.getByText(/Have a question about our scratchers or need help placing an order\?/i)).toBeInTheDocument();
        expect(screen.getByText(/Our friendly representatives are available during business hours to assist you with any inquiries you may have\./i)).toBeInTheDocument();
        expect(screen.getByText(/At our store, customer satisfaction is our priority, and we're committed to ensuring you have a smooth and enjoyable shopping experience\./i)).toBeInTheDocument();
    });
});

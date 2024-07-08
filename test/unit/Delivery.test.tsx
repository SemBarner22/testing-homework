import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Delivery } from '../../src/client/pages/Delivery';

describe('Delivery Component', () => {
    const setup = () => {
        render(<Delivery />);
    };

    it('should render the Delivery component with correct title and content', () => {
        setup();

        // Check for the heading
        expect(screen.getByRole('heading', { name: /Delivery/i })).toBeInTheDocument();

        // Check for the paragraphs
        expect(screen.getByText(/Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers./i)).toBeInTheDocument();
        expect(screen.getByText(/Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system./i)).toBeInTheDocument();
        expect(screen.getByText(/Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service./i)).toBeInTheDocument();

        // Check for the Image component
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });
});


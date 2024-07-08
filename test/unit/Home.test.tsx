import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../../src/client/pages/Home';

describe('Home Component', () => {
    const setup = () => {
        render(<Home />);
    };

    it('should render the Home component with correct title and content', () => {
        setup();

        // Check for the welcome message
        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeInTheDocument();
        expect(screen.getByText('We have a large assortment of scratching posts!')).toBeInTheDocument();

        // Check for the section titles and content
        expect(screen.getByText('Stability')).toBeInTheDocument();
        expect(screen.getByText("Our scratching posts are crafted with precision and designed for unparalleled stability. Made from high-quality materials, they provide a sturdy platform for your cat's scratching needs.")).toBeInTheDocument();

        expect(screen.getByText('Comfort')).toBeInTheDocument();
        expect(screen.getByText("Pamper your feline friend with the luxurious comfort of our scratching posts. Covered in soft, plush fabric, they offer a cozy retreat for your cat to relax and unwind.")).toBeInTheDocument();

        expect(screen.getByText('Design')).toBeInTheDocument();
        expect(screen.getByText("Engage your cat's natural instincts and keep them entertained for hours with our interactive scratching posts. Featuring built-in toys and enticing textures, they stimulate your cat's senses and encourage active play.")).toBeInTheDocument();

        // Check for the final message
        expect(screen.getByText("Empower Your Coding Journey with Every Scratch – Get Your Paws on Our Purr-fect Scratchers Today!")).toBeInTheDocument();
    });
});

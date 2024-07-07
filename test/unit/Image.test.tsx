import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { Image, ImageProps } from '../../src/client/components/Image';

describe('Image Component', () => {
    it('should render with default props', () => {
        const { getByRole } = render(<Image />);
        const img = getByRole('img');

        expect(img).toHaveAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=');
        expect(img).toHaveClass('Image');
    });

    it('should render with provided src', () => {
        const src = 'https://example.com/test.png';
        const { getByRole } = render(<Image src={src} />);
        const img = getByRole('img');

        expect(img).toHaveAttribute('src', src);
    });

    it('should render with provided className', () => {
        const className = 'custom-class';
        const { getByRole } = render(<Image className={className} />);
        const img = getByRole('img');

        expect(img).toHaveClass('Image');
        expect(img).toHaveClass('custom-class');
    });
});

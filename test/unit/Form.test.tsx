import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Form } from '../../src/client/components/Form';
import '@testing-library/jest-dom'
import { CheckoutFormData } from '../../src/common/types';

describe('Form Component', () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockClear();
    });

    it('should submit form with valid data', () => {
        render(<Form onSubmit={onSubmit} />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } });

        fireEvent.click(screen.getByText(/Checkout/i));

        if (process.env.BUG_ID === '10') {
            expect(onSubmit).not.toHaveBeenCalled();
        } else {
            expect(onSubmit).toHaveBeenCalledWith({
                name: 'John Doe',
                phone: '123-456-7890',
                address: '123 Main St'
            });
        }
    });

    it('should show validation errors with invalid data', () => {
        render(<Form onSubmit={onSubmit} />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '' } });

        fireEvent.click(screen.getByText(/Checkout/i));

        expect(screen.getByText('Please provide your name')).toBeInTheDocument();
        expect(screen.getByText('Please provide a valid phone')).toBeInTheDocument();
        expect(screen.getByText('Please provide a valid address')).toBeInTheDocument();
    });

    it('should not submit the form if sent is true', () => {
        render(<Form onSubmit={onSubmit} />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } });

        fireEvent.click(screen.getByText(/Checkout/i));
        fireEvent.click(screen.getByText(/Checkout/i));

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should disable input fields and button when sent is true', () => {
        render(<Form onSubmit={onSubmit} />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } });

        fireEvent.click(screen.getByText(/Checkout/i));

        expect(screen.getByLabelText(/Name/i)).toBeDisabled();
        expect(screen.getByLabelText(/Phone/i)).toBeDisabled();
        expect(screen.getByLabelText(/Address/i)).toBeDisabled();
        expect(screen.getByText(/Checkout/i)).toBeDisabled();
    });

    it('should fail if BUG_ID=10 and phone number is invalid', () => {
        process.env.BUG_ID = '10';
        render(<Form onSubmit={onSubmit} />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: 'invalid-phone' } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } });

        fireEvent.click(screen.getByText(/Checkout/i));

        expect(onSubmit).not.toHaveBeenCalled();
    });
});
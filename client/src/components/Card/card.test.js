import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from './card';

describe('Card', () => {
    test('renders Card component', () => {
      render(
        <BrowserRouter>
            <Card />
        </BrowserRouter>  
      );
    });
    test('Contains link and img', () => {
        render(
            <BrowserRouter>
                <Card />
            </BrowserRouter>  
          );
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    
    })
});


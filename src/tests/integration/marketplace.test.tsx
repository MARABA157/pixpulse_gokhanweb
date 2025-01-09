import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Marketplace from '../../pages/marketplace';

const server = setupServer(
  // Mock NFT listings endpoint
  rest.get('/api/nfts', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const sort = req.url.searchParams.get('sort') || 'latest';
    const filter = req.url.searchParams.get('filter') || '';

    return res(
      ctx.json({
        nfts: [
          {
            id: '1',
            title: 'Test NFT 1',
            price: 1.5,
            creator: 'Creator 1',
            image: 'test1.jpg',
          },
          {
            id: '2',
            title: 'Test NFT 2',
            price: 2.5,
            creator: 'Creator 2',
            image: 'test2.jpg',
          },
        ],
        totalPages: 5,
        currentPage: Number(page),
      })
    );
  }),

  // Mock NFT purchase endpoint
  rest.post('/api/nfts/:id/purchase', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        transaction: {
          id: 'tx123',
          amount: 1.5,
          timestamp: new Date().toISOString(),
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Marketplace Integration', () => {
  it('loads and displays NFTs', async () => {
    render(<Marketplace />);
    
    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for NFTs to load
    await waitFor(() => {
      expect(screen.getByText('Test NFT 1')).toBeInTheDocument();
      expect(screen.getByText('Test NFT 2')).toBeInTheDocument();
    });
  });

  it('filters NFTs correctly', async () => {
    server.use(
      rest.get('/api/nfts', (req, res, ctx) => {
        const filter = req.url.searchParams.get('filter');
        return res(
          ctx.json({
            nfts: [
              {
                id: '1',
                title: 'Filtered NFT',
                price: 1.5,
                creator: 'Creator 1',
                image: 'test1.jpg',
              },
            ],
            totalPages: 1,
            currentPage: 1,
          })
        );
      })
    );

    render(<Marketplace />);

    // Open filter menu
    fireEvent.click(screen.getByText('Filters'));
    
    // Apply filter
    fireEvent.click(screen.getByText('Apply Filters'));

    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText('Filtered NFT')).toBeInTheDocument();
    });
  });

  it('sorts NFTs correctly', async () => {
    server.use(
      rest.get('/api/nfts', (req, res, ctx) => {
        const sort = req.url.searchParams.get('sort');
        return res(
          ctx.json({
            nfts: [
              {
                id: '1',
                title: sort === 'price_asc' ? 'Cheap NFT' : 'Expensive NFT',
                price: sort === 'price_asc' ? 1 : 100,
                creator: 'Creator 1',
                image: 'test1.jpg',
              },
            ],
            totalPages: 1,
            currentPage: 1,
          })
        );
      })
    );

    render(<Marketplace />);

    // Change sort order
    fireEvent.click(screen.getByText('Sort By'));
    fireEvent.click(screen.getByText('Price: Low to High'));

    // Wait for sorted results
    await waitFor(() => {
      expect(screen.getByText('Cheap NFT')).toBeInTheDocument();
    });
  });

  it('handles NFT purchase flow', async () => {
    render(<Marketplace />);

    // Wait for NFTs to load
    await waitFor(() => {
      expect(screen.getByText('Test NFT 1')).toBeInTheDocument();
    });

    // Click buy button
    fireEvent.click(screen.getByText('Buy Now'));

    // Confirm purchase
    fireEvent.click(screen.getByText('Confirm Purchase'));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Purchase successful!')).toBeInTheDocument();
    });
  });

  it('handles errors gracefully', async () => {
    // Mock error response
    server.use(
      rest.get('/api/nfts', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' })
        );
      })
    );

    render(<Marketplace />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to load NFTs')).toBeInTheDocument();
    });
  });

  it('implements pagination correctly', async () => {
    render(<Marketplace />);

    // Wait for initial page to load
    await waitFor(() => {
      expect(screen.getByText('Test NFT 1')).toBeInTheDocument();
    });

    // Click next page
    fireEvent.click(screen.getByLabelText('Next page'));

    // Wait for new page to load
    await waitFor(() => {
      expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    });
  });
});

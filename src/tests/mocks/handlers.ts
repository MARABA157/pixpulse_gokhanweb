import { rest } from 'msw';

export const handlers = [
  // Auth handlers
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
        },
        token: 'fake-jwt-token',
      })
    );
  }),

  // NFT handlers
  rest.get('/api/nfts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        nfts: [
          {
            id: '1',
            title: 'Test NFT',
            description: 'Test Description',
            price: 1.5,
            creator: 'Test Creator',
            image: 'test-image.jpg',
          },
        ],
      })
    );
  }),

  rest.get('/api/nfts/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        title: 'Test NFT',
        description: 'Test Description',
        price: 1.5,
        creator: 'Test Creator',
        image: 'test-image.jpg',
      })
    );
  }),

  // User profile handlers
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: 'Test User',
        email: 'test@example.com',
        bio: 'Test Bio',
        avatar: 'test-avatar.jpg',
      })
    );
  }),

  // Search handlers
  rest.get('/api/search', (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            id: '1',
            title: `Result for ${query}`,
            type: 'nft',
            tags: ['art', 'digital'],
          },
        ],
      })
    );
  }),

  // Analytics handlers
  rest.post('/api/analytics/event', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
      })
    );
  }),
];

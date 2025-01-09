import {
  userSchema,
  nftSchema,
  urlSchema,
  fileSchema,
  validateInput,
  sanitizeHTML,
  sanitizeFilename,
} from '../../../utils/validation';

describe('Validation Utils', () => {
  describe('User Schema', () => {
    it('validates correct user data', () => {
      const validUser = {
        username: 'testuser123',
        email: 'test@example.com',
        password: 'Test123!@#',
      };
      const result = validateInput(userSchema, validUser);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validUser);
    });

    it('rejects invalid username', () => {
      const invalidUser = {
        username: 't', // too short
        email: 'test@example.com',
        password: 'Test123!@#',
      };
      const result = validateInput(userSchema, invalidUser);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Username must be at least 3 characters');
    });

    it('rejects invalid email', () => {
      const invalidUser = {
        username: 'testuser123',
        email: 'invalid-email',
        password: 'Test123!@#',
      };
      const result = validateInput(userSchema, invalidUser);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid email address');
    });

    it('rejects weak password', () => {
      const invalidUser = {
        username: 'testuser123',
        email: 'test@example.com',
        password: 'weak',
      };
      const result = validateInput(userSchema, invalidUser);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Password must be at least 8 characters');
    });
  });

  describe('NFT Schema', () => {
    it('validates correct NFT data', () => {
      const validNFT = {
        title: 'Test NFT',
        description: 'Test Description',
        price: 1.5,
        royalties: 10,
      };
      const result = validateInput(nftSchema, validNFT);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validNFT);
    });

    it('rejects invalid price', () => {
      const invalidNFT = {
        title: 'Test NFT',
        description: 'Test Description',
        price: -1,
        royalties: 10,
      };
      const result = validateInput(nftSchema, invalidNFT);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Price cannot be negative');
    });
  });

  describe('URL Schema', () => {
    it('validates correct URLs', () => {
      const validURL = 'https://example.com';
      const result = validateInput(urlSchema, validURL);
      expect(result.success).toBe(true);
      expect(result.data).toBe(validURL);
    });

    it('rejects invalid URLs', () => {
      const invalidURL = 'not-a-url';
      const result = validateInput(urlSchema, invalidURL);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid URL');
    });
  });

  describe('File Schema', () => {
    it('validates correct file data', () => {
      const validFile = {
        name: 'test.jpg',
        size: 1024 * 1024, // 1MB
        type: 'image/jpeg',
      };
      const result = validateInput(fileSchema, validFile);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validFile);
    });

    it('rejects large files', () => {
      const largeFile = {
        name: 'large.jpg',
        size: 20 * 1024 * 1024, // 20MB
        type: 'image/jpeg',
      };
      const result = validateInput(fileSchema, largeFile);
      expect(result.success).toBe(false);
      expect(result.error).toContain('File size must be less than 10MB');
    });

    it('rejects unsupported file types', () => {
      const invalidFile = {
        name: 'test.exe',
        size: 1024,
        type: 'application/exe',
      };
      const result = validateInput(fileSchema, invalidFile);
      expect(result.success).toBe(false);
      expect(result.error).toContain('File type not supported');
    });
  });

  describe('Sanitization Functions', () => {
    it('sanitizes HTML correctly', () => {
      const input = '<script>alert("xss")</script><p>Hello</p>';
      const sanitized = sanitizeHTML(input);
      expect(sanitized).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&lt;p&gt;Hello&lt;/p&gt;'
      );
    });

    it('sanitizes filename correctly', () => {
      const input = 'my file (1)@#$.jpg';
      const sanitized = sanitizeFilename(input);
      expect(sanitized).toBe('my_file_1_.jpg');
    });
  });
});

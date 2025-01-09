import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import AdvancedFilters, { FilterOption } from '../../../components/filters/AdvancedFilters';

const mockFilters: FilterOption[] = [
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { value: 'art', label: 'Art' },
      { value: 'music', label: 'Music' },
    ],
  },
  {
    id: 'price',
    label: 'Price',
    type: 'range',
    min: 0,
    max: 100,
    step: 1,
  },
];

describe('AdvancedFilters', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly', () => {
    render(<AdvancedFilters filters={mockFilters} onChange={mockOnChange} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('opens filter menu when clicked', () => {
    render(<AdvancedFilters filters={mockFilters} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Filters'));
    expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
  });

  it('updates select filter value', () => {
    render(<AdvancedFilters filters={mockFilters} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'art' },
    });
    expect(mockOnChange).toHaveBeenCalledWith({ category: 'art' });
  });

  it('updates range filter value', () => {
    render(<AdvancedFilters filters={mockFilters} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '50' },
    });
    expect(mockOnChange).toHaveBeenCalledWith({ price: 50 });
  });

  it('clears all filters', () => {
    render(<AdvancedFilters filters={mockFilters} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Filters'));
    fireEvent.click(screen.getByText('Clear All'));
    expect(mockOnChange).toHaveBeenCalledWith({});
  });
});

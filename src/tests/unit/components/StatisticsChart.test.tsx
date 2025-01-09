import React from 'react';
import { render, screen } from '../utils/test-utils';
import StatisticsChart from '../../../components/charts/StatisticsChart';

const mockData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 300 },
];

describe('StatisticsChart', () => {
  it('renders with title and description', () => {
    render(
      <StatisticsChart
        data={mockData}
        title="Test Chart"
        description="Test Description"
      />
    );
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<StatisticsChart data={mockData} loading={true} />);
    expect(screen.getByText('Loading chart data...')).toBeInTheDocument();
  });

  it('renders different chart types', () => {
    const { rerender } = render(
      <StatisticsChart data={mockData} type="line" />
    );
    expect(document.querySelector('.recharts-line')).toBeInTheDocument();

    rerender(<StatisticsChart data={mockData} type="area" />);
    expect(document.querySelector('.recharts-area')).toBeInTheDocument();

    rerender(<StatisticsChart data={mockData} type="bar" />);
    expect(document.querySelector('.recharts-bar')).toBeInTheDocument();
  });

  it('applies custom color', () => {
    const customColor = '#FF0000';
    render(<StatisticsChart data={mockData} color={customColor} />);
    const element = document.querySelector('.recharts-line');
    expect(element).toHaveAttribute('stroke', customColor);
  });
});

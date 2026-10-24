import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { PageHeading } from './tripwise/components/PageHeading';

test('centers the title after scrolling past it, restores it on return and cleans up', () => {
  const originalObserver = window.IntersectionObserver;
  let observeScroll;
  const disconnect = jest.fn();
  window.IntersectionObserver = jest.fn(function(callback) {
    observeScroll = callback;
    this.observe = jest.fn();
    this.disconnect = disconnect;
  });
  const geometry = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function() {
    if (this.classList.contains('top')) return { height: 64, bottom: 64 };
    if (this.classList.contains('page-heading-toolbar')) return { height: 56, bottom: 120 };
    return { height: 40, bottom: 240 };
  });
  let view;
  try {
    view = render(<><header className="top" /><PageHeading title="Aviachiptalar" subtitle="Parvozingizni tanlang" /></>);
    const heading = screen.getByRole('heading', { name: 'Aviachiptalar' });
    const toolbar = view.container.querySelector('.page-heading-toolbar');
    expect(toolbar).toHaveAttribute('data-collapsed', 'false');
    expect(toolbar).toHaveStyle({ top: '64px' });
    act(() => observeScroll([{ boundingClientRect: { bottom: 100 } }]));
    expect(toolbar).toHaveAttribute('data-collapsed', 'true');
    expect(heading).toBeInTheDocument();
    expect(toolbar.querySelector('.page-heading-compact')).toHaveTextContent('Aviachiptalar');
    act(() => observeScroll([{ boundingClientRect: { bottom: 240 } }]));
    expect(toolbar).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByRole('button', { name: 'Ortga qaytish' })).toBeInTheDocument();
    view.unmount();
    expect(disconnect).toHaveBeenCalled();
  } finally {
    view?.unmount();
    geometry.mockRestore();
    window.IntersectionObserver = originalObserver;
  }
});

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable/>', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test('should render its children', async () => {
    await screen.findAllByText('togglable content');
  });

  test('should not display children at start', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display:none');
  });

  test('should display children after clicking the button', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('should close the toggled content', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show...');

    await user.click(button);

    const closeButton = screen.getByText('cancel');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});

import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

import { Child1Component } from './child1.component';

describe('Child1Component', () => {
  let spectator: Spectator<Child1Component>;
  const createComponent = createTestComponentFactory(Child1Component);


  it('should create', () => {
    spectator = createComponent();
    expect(spectator.query('div')).toHaveClass('title');
  });
});

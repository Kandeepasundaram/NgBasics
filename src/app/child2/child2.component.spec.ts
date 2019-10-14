import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

import { Child2Component } from './child2.component';

describe('Child1Component', () => {
  let spectator: Spectator<Child2Component>;
  const createComponent = createTestComponentFactory(Child2Component);


  it('should create', () => {
    spectator = createComponent();
    expect(spectator.query('div')).toContain('child2');
  });
});

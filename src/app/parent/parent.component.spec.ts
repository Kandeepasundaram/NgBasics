import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

import { ParentComponent } from './parent.component';
import { SampleServiceService } from '../sample-service.service';

describe('Child1Component', () => {
  let spectator: Spectator<ParentComponent>;
  const createComponent = createTestComponentFactory({
    component: ParentComponent,
    imports: [],
    providers: [SampleServiceService]
 });

  it('should create', () => {
    spectator = createComponent();
    // expect(spectator.query('div')).toContain('child2');
  });
});

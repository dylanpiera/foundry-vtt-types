import { expectError } from 'tsd';
import type DataModel from '../../../../../src/foundry/common/abstract/data.mjs';

declare const scene: Scene;

expectError(new WallDocument());
expectError(new WallDocument({}));

new WallDocument({ c: [0, 0, 0, 0] });
new WallDocument({ c: [0, 0, 0, 0] }, { parent: scene });

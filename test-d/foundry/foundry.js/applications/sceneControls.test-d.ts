import { expectType } from 'tsd';

expectType<SceneControls>(new SceneControls());
expectType<SceneControls>(new SceneControls({ width: null }));
expectType<number>(SceneControls.defaultOptions.width);

const controls = new SceneControls();
expectType<void>(controls.initialize());
expectType<void>(controls.initialize({ control: 'token' }));
expectType<void>(controls.initialize({ layer: 'tokens' }));
expectType<void>(controls.initialize({ tool: 'select' }));

expectType<SceneControl[]>(controls.controls);
expectType<SceneControlTool[][]>(controls.controls.map((each) => each.tools));

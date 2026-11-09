import { Composition, registerRoot } from 'remotion';
import manifest from './public/manifest.json';
import { RealDemo, INTRO, OUTRO } from './RealDemo.jsx';

const Root = () => <>
  {Object.values(manifest).flatMap(story => [
  <Composition key={`${story.key}-wide`} id={`V2${story.id}`} component={RealDemo} defaultProps={{ story }} durationInFrames={INTRO + story.frames + OUTRO} fps={30} width={1920} height={1080} />,
  ...(story.vertical ? [<Composition key={`${story.key}-vertical`} id={`V2${story.id}Vertical`} component={RealDemo} defaultProps={{ story: story.vertical }} durationInFrames={INTRO + story.vertical.frames + OUTRO} fps={30} width={1080} height={1920} />] : []),
  ])}
</>;
registerRoot(Root);

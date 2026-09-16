import { Composition } from "remotion";
import { PulsaTeachPromo } from "./PulsaTeachPromo.jsx";
import { ProductFeaturePromo } from "./ProductFeaturePromo.jsx";
import { CinematicPromo } from './CinematicPromo.jsx';
import { cinematicStories } from './cinematicStories.js';

export const RemotionRoot = () => (
  <>
  {cinematicStories.map(story => <Composition key={story.id} id={`Cinema${story.id}`} component={CinematicPromo} defaultProps={{ story }} durationInFrames={540} fps={30} width={1080} height={1920} />)}
  <Composition
    id="PulsaTeachPromo"
    component={PulsaTeachPromo}
    durationInFrames={840}
    fps={30}
    width={1080}
    height={1920}
  />
  <Composition id="PulsaTeachEditor" component={() => <ProductFeaturePromo feature="editor" />} durationInFrames={600} fps={30} width={1080} height={1920} />
  <Composition id="PulsaTeachSandbox" component={() => <ProductFeaturePromo feature="sandbox" />} durationInFrames={600} fps={30} width={1080} height={1920} />
  <Composition id="PulsaTeachProjects" component={() => <ProductFeaturePromo feature="projects" />} durationInFrames={600} fps={30} width={1080} height={1920} />
  </>
);

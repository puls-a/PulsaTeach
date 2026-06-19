import { learningTracks as coreTracks } from "./trackRegistry.js";
import { accessibilityTrack } from "./tracks/accessibility.js";
import { gitTrack } from "./tracks/git.js";
import { testingTrack } from "./tracks/testing.js";
import { typescriptTrack } from "./tracks/typescript.js";
import { reactTrack } from "./tracks/react.js";
import { nodeApiTrack } from "./tracks/node-api.js";
import { sqlPostgresqlTrack } from "./tracks/sql-postgresql.js";
import { webSecurityTrack } from "./tracks/web-security.js";
import { webPerformanceTrack } from "./tracks/web-performance.js";
import { devopsDeploymentTrack } from "./tracks/devops-deployment.js";

export const learningTracks = [...coreTracks, gitTrack, accessibilityTrack, testingTrack, typescriptTrack, reactTrack, nodeApiTrack, sqlPostgresqlTrack, webSecurityTrack, webPerformanceTrack, devopsDeploymentTrack];

export function findTrack(trackId) {
  return learningTracks.find((track) => track.id === trackId) || null;
}

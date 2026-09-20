import emmaCaseStudy from './emma';
import artefactsCaseStudy from './artefacts';
import moataGeospatialCaseStudy from './moataGeospatial';
import winRoomCaseStudy from './winRoom';
import monthlyProjectReviewCaseStudy from './monthlyProjectReview';

// Case studies available at /present/:slug. Add more here as they're
// extracted out of Portfolio.js.
export const PRESENTABLE_CASE_STUDIES = {
  emma: emmaCaseStudy,
  artefacts: artefactsCaseStudy,
  'moata-geospatial': moataGeospatialCaseStudy,
  'win-room': winRoomCaseStudy,
  'monthly-project-review': monthlyProjectReviewCaseStudy,
};

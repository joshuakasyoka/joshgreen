// Turns a portfolio case study into presentation slides, told as STAR:
// Situation → Task → Action 1…n → Results → Reflection.
//
// `study.presentation` supplies the situation, task and results, and can
// list the actions explicitly; otherwise the actions are the case study's own
// sections, and results/reflection fall back to the overview and reflection.
export const buildSlides = (study) => {
  const star = study.presentation || {};
  const slides = [{ type: 'cover', id: 'cover', label: 'Cover' }];

  if (star.situation) {
    slides.push({ type: 'content', id: 'situation', label: 'Situation', ...star.situation });
  }
  if (star.task) {
    slides.push({ type: 'content', id: 'task', label: 'Task', ...star.task });
  }

  // Actions: explicit `presentation.actions`, else the case study's sections.
  const actions =
    star.actions ||
    (study.images || [])
      .filter((image) => typeof image === 'object')
      .map((image) => ({ subLabel: image.sectionHeading || image.caption, body: image.body, demo: image.demo }));
  actions.forEach((action, idx) => {
    slides.push({
      type: 'content',
      id: `action-${idx + 1}`,
      label: actions.length > 1 ? `Action ${idx + 1}` : 'Action',
      subLabel: action.subLabel,
      body: action.body,
      demo: action.demo || null,
    });
  });

  slides.push({
    type: 'results',
    id: 'results',
    label: 'Results',
    body: star.results?.body || study.overview,
    stats: star.results?.stats || [],
    demo: star.results?.demo || null,
  });

  const reflection = (study.caseStudyBlocks?.after || []).find((block) => block.id === 'reflections');
  if (star.reflection || reflection) {
    // `presentation.reflection` can supply its own body, or just a demo to
    // sit beside the case study's reflection copy.
    slides.push({
      type: 'content',
      id: 'reflection',
      label: 'Reflection',
      body: star.reflection?.body || reflection?.body,
      demo: star.reflection?.demo || reflection?.demo || null,
    });
  }

  slides.push({ type: 'end', id: 'end', label: 'End' });

  // Number the story slides ("1 of 6"), leaving out the cover and end.
  const story = slides.filter((slide) => slide.type !== 'cover' && slide.type !== 'end');
  story.forEach((slide, idx) => {
    slide.position = idx + 1;
    slide.of = story.length;
  });
  return slides;
};

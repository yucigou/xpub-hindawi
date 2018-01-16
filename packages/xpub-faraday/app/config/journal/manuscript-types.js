export default [
  { label: 'Research', value: 'research', author: true, peerReview: true },
  { label: 'Review', value: 'review', author: true, peerReview: true },
  {
    label: 'Clinical study',
    value: 'clinical-study',
    author: true,
    peerReview: true,
  },
  {
    label: 'Case report',
    value: 'case-report',
    author: true,
    peerReview: true,
  },
  {
    label: 'Letter to the editor',
    value: 'letter-to-editor',
    author: true,
    peerReview: false,
  },
  { label: 'Editorial', value: 'editorial', author: false, peerReview: false },
  {
    label: 'Corrigendum',
    value: 'corrigendum',
    author: false,
    peerReview: false,
  },
  { label: 'Erratum', value: 'erratum', author: false, peerReview: false },
  {
    label: 'Expression of concern',
    value: 'expression-of-concern',
    author: false,
    peerReview: false,
  },
  {
    label: 'Retraction',
    value: 'retraction',
    author: false,
    peerReview: false,
  },
]

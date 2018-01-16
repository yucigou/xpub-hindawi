export default {
  questions: [
    {
      id: 'openData',
      legend: 'Data is open',
    },
    {
      id: 'previouslySubmitted',
      legend: 'Previously submitted',
    },
    {
      id: 'openPeerReview',
      legend: 'Open peer review',
    },
    {
      id: 'streamlinedReview',
      legend: 'Streamlined review',
    },
    {
      id: 'researchNexus',
      legend: 'Submitted as part of the research nexus?',
    },
    {
      id: 'preregistered',
      legend: 'Pre-registered?',
    },
  ],
  options: [
    {
      value: 'has-email',
      label: `I have the email addresses of all the co-authors of the manuscript.`,
    },
    {
      value: 'has-manuscript',
      label:
        'I have the manuscript file in Microsoft Word or Adobe PDF format with the tables and figures integrated in the manuscript body.',
    },
    {
      value: 'has-efiles',
      label:
        'I have the electronic files of any supplementary materials (e.g., datasets, images, audio, video) that I want to submit with the manuscript.',
    },
    {
      value: 'ok-article-processing',
      label:
        'I am aware that accepted manuscripts are subject to Article Processing Charges.',
    },
    {
      value: 'has-orcid',
      label: `I'm aware that an ORCID ID is required for the corresponding author before the article can be published (if accepted). The ORCID ID should added via your user account.`,
    },
    {
      value: 'ok-institutional',
      label:
        'I am aware that if my submission is covered by an institutional membership, Hindawi will share details of the manuscript with the administrator of the membership.',
    },
  ],
}

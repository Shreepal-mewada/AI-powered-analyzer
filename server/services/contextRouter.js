export const routeContextForAgent = (agentType, chunks, fullText = '') => {
  if (!chunks || chunks.length === 0) {
    return fullText.slice(0, 4000);
  }

  switch (agentType) {
    case 'analyzer': {
      // Analyzer needs METHODOLOGY, EXPERIMENTS, and RESULTS
      const targetSections = ['METHODOLOGY', 'EXPERIMENTS', 'FULL_TEXT'];
      const relevantChunks = chunks.filter(c => targetSections.includes(c.section.toUpperCase()));
      const selected = relevantChunks.length > 0 ? relevantChunks : chunks.slice(0, 4);
      return selected.map(c => `[SECTION: ${c.section}]\n${c.text}`).join('\n\n');
    }

    case 'summary': {
      // Summary needs ABSTRACT, INTRODUCTION, and CONCLUSION
      const targetSections = ['ABSTRACT', 'INTRODUCTION', 'CONCLUSION', 'HEADER'];
      const relevantChunks = chunks.filter(c => targetSections.includes(c.section.toUpperCase()));
      const selected = relevantChunks.length > 0 ? relevantChunks : chunks.slice(0, 3);
      return selected.map(c => `[SECTION: ${c.section}]\n${c.text}`).join('\n\n');
    }

    case 'citation': {
      // Citation needs REFERENCES and BIBLIOGRAPHY
      const targetSections = ['REFERENCES', 'FULL_TEXT'];
      const relevantChunks = chunks.filter(c => targetSections.includes(c.section.toUpperCase()));
      const selected = relevantChunks.length > 0 ? relevantChunks : chunks.slice(-3);
      return selected.map(c => `[SECTION: ${c.section}]\n${c.text}`).join('\n\n');
    }

    case 'insight': {
      // Insight needs CONCLUSION, EXPERIMENTS, and DISCUSSION
      const targetSections = ['CONCLUSION', 'EXPERIMENTS', 'METHODOLOGY'];
      const relevantChunks = chunks.filter(c => targetSections.includes(c.section.toUpperCase()));
      const selected = relevantChunks.length > 0 ? relevantChunks : chunks.slice(1, 4);
      return selected.map(c => `[SECTION: ${c.section}]\n${c.text}`).join('\n\n');
    }

    case 'reviewer': {
      // Reviewer gets a representative sample of abstract + methodology + conclusion
      const sample = chunks.slice(0, 5);
      return sample.map(c => `[SECTION: ${c.section}]\n${c.text}`).join('\n\n');
    }

    default:
      return chunks.slice(0, 3).map(c => c.text).join('\n\n');
  }
};

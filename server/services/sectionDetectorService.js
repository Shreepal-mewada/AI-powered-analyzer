export const detectSections = (rawText) => {
  const sectionPatterns = [
    { name: 'ABSTRACT', regex: /(?:abstract|overview)\b/i },
    { name: 'INTRODUCTION', regex: /(?:1\.\s*|1\s+)?(?:introduction|background)\b/i },
    { name: 'METHODOLOGY', regex: /(?:2\.\s*|3\.\s*)?(?:methodology|method|model|architecture|proposed method|approach)\b/i },
    { name: 'EXPERIMENTS', regex: /(?:4\.\s*|5\.\s*)?(?:experiments|experimental setup|evaluation|results|findings)\b/i },
    { name: 'CONCLUSION', regex: /(?:conclusion|discussion|summary and future work)\b/i },
    { name: 'REFERENCES', regex: /(?:references|bibliography|cited works)\b/i }
  ];

  const lines = rawText.split('\n');
  const sections = [];
  let currentSection = { title: 'HEADER', text: '', startIndex: 0 };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    let matchedName = null;

    for (const pattern of sectionPatterns) {
      if (pattern.regex.test(line) && line.length < 80) {
        matchedName = pattern.name;
        break;
      }
    }

    if (matchedName && matchedName !== currentSection.title) {
      if (currentSection.text.trim()) {
        currentSection.endIndex = i - 1;
        sections.push({ ...currentSection });
      }
      currentSection = { title: matchedName, text: line + '\n', startIndex: i };
    } else {
      currentSection.text += line + '\n';
    }
  }

  if (currentSection.text.trim()) {
    currentSection.endIndex = lines.length - 1;
    sections.push(currentSection);
  }

  return sections.length > 0 ? sections : [{ title: 'FULL_TEXT', text: rawText, startIndex: 0, endIndex: lines.length - 1 }];
};

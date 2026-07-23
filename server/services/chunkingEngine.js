export const createSemanticChunks = (sections, chunkSizeTokens = 800, overlapTokens = 150) => {
  const chunks = [];
  let chunkCounter = 0;

  // Approximate 1 token ~= 4 characters or ~0.75 words
  const maxChars = chunkSizeTokens * 4;
  const overlapChars = overlapTokens * 4;

  for (const section of sections) {
    const sectionText = section.text.trim();
    if (!sectionText) continue;

    if (sectionText.length <= maxChars) {
      chunkCounter++;
      chunks.push({
        id: `chunk-${chunkCounter}`,
        section: section.title,
        text: sectionText,
        tokenCount: Math.ceil(sectionText.length / 4),
        chunkIndex: chunkCounter
      });
    } else {
      let start = 0;
      while (start < sectionText.length) {
        let end = start + maxChars;
        if (end < sectionText.length) {
          // Find next paragraph or sentence boundary
          const boundary = sectionText.indexOf('\n\n', end - 100);
          if (boundary !== -1 && boundary < end + 100) {
            end = boundary + 2;
          }
        } else {
          end = sectionText.length;
        }

        const chunkText = sectionText.slice(start, end).trim();
        if (chunkText) {
          chunkCounter++;
          chunks.push({
            id: `chunk-${chunkCounter}`,
            section: section.title,
            text: chunkText,
            tokenCount: Math.ceil(chunkText.length / 4),
            chunkIndex: chunkCounter
          });
        }

        start += (maxChars - overlapChars);
      }
    }
  }

  return chunks;
};

import pdfParse from 'pdf-parse';
import fs from 'fs';

export const parsePdfFile = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    const cleanText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return {
      rawText: cleanText,
      pageCount: data.numpages || 1,
      info: data.info || {}
    };
  } catch (error) {
    console.error('Error in pdfParserService:', error.message);
    throw new Error(`Failed to parse PDF file: ${error.message}`);
  }
};

export const parseRawText = (textInput) => {
  const cleanText = textInput
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Estimate page count based on ~500 words per page
  const wordCount = cleanText.split(/\s+/).length;
  const estimatedPages = Math.max(1, Math.ceil(wordCount / 500));

  return {
    rawText: cleanText,
    pageCount: estimatedPages,
    info: {}
  };
};

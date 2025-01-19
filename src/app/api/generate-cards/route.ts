import { NextResponse } from 'next/server';
import axios from 'axios';

interface Candidate {
  content: {
    parts: Array<{
      text: string;
    }>;
  };
}

export async function POST(req: Request) {
  try {
    const { language, level, additionalInfo } = await req.json();

    // Explicit instructions for Gemini to format the cards in the desired structure
    const requestBody = {
      contents: [{
        parts: [{
          text: `Generate flashcards for learning ${language} at ${level} level regarding ${additionalInfo}. Each flashcard should be formatted as follows:
          - Front: The English translation with possible variations (e.g., "Don't mention it").
          - Back: The phrase in the target language with its pronunciation in parentheses (e.g., "别客气 (bié kèqì)"). 
          limit for both front and back is there should be only one sentence or word accordingly.`
        }]
      }]
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Gemini API Response:', response.data);

    // Extract the generated content from the response
    const cards = response.data.candidates.flatMap((candidate: Candidate) => {
      const content = candidate.content;

      if (!content || !content.parts || content.parts.length === 0) {
        throw new Error('Content or parts are undefined or empty');
      }

      const text = content.parts[0].text;
      console.log('Extracted Text:', text);

      // Parse the text into front and back pairs
      return text.split(/\*\*Front:\*\*/).slice(1).map(cardText => {
        const [front, back] = cardText.split('**Back:**').map(part => part.trim());

        // Clean up the front content by trimming everything after the dash (-) and removing asterisks (*)
        const cleanedFront = front.split('-')[0].trim().replace(/\*/g, '').trim();
        
        // Clean up the back content by trimming everything after the first closing parenthesis (but keep the second one) and removing asterisks (*)
        const cleanedBack = back.split(')')[0].trim() + ')';  // Retain the closing parenthesis after the pronunciation
        const finalBack = cleanedBack.replace(/\*/g, '').trim();  // Remove asterisks from back content

        return {
          front: cleanedFront,
          back: finalBack,
        };
      });
    });

    console.log('Generated Cards:', cards);
    return NextResponse.json({ cards });
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    console.error('Error in API route:', errorMessage);
    return NextResponse.json({ error: 'Error generating cards', details: errorMessage }, { status: 500 });
  }
}

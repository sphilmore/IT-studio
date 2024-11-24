import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const DICTIONARY_API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/api/word/:word', async (req, res) => {
  try {
    const { word } = req.params;
    console.log(`Fetching definition for: ${word}`);

    const response = await fetch(`${DICTIONARY_API_BASE_URL}/${word}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch word definition');
    }

    const formattedDefinition = {
      word: data[0].word,
      phonetic: data[0].phonetic || '',
      meanings: data[0].meanings.map(meaning => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map(def => ({
          definition: def.definition,
          example: def.example || null
        }))
      })),
      sourceUrls: data[0].sourceUrls
    };

    console.log('Definition fetched successfully');
    res.json(formattedDefinition);
  } catch (error) {
    console.error('Error fetching definition:', error);
    res.status(500).json({
      error: 'Failed to fetch word definition',
      details: error.message
    });
  }
});

app.get('/api/random-words', async (req, res) => {
  try {
    // List of common words that are likely to have good dictionary entries
    const commonWords = [
      'wise guy', 'childs play', 'barking up the wrong tree', 'love bombing', 'monkey business'
    ];

    // Randomly select 5 words
    const selectedWords = commonWords
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    // Fetch definitions for all selected words
    const definitions = await Promise.all(
      selectedWords.map(async word => {
        try {
          const response = await fetch(`${DICTIONARY_API_BASE_URL}/${word}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(`Failed to fetch definition for ${word}`);
          }

          return {
            word: data[0].word,
            phonetic: data[0].phonetic || '',
            definition: data[0].meanings[0].definitions[0].definition,
            partOfSpeech: data[0].meanings[0].partOfSpeech,
            example: data[0].meanings[0].definitions[0].example || null
          };
        } catch (error) {
          console.error(`Error fetching definition for ${word}:`, error);
          return null;
        }
      })
    );

    // Filter out any failed requests and send the successful ones
    const validDefinitions = definitions.filter(def => def !== null);
    
    if (validDefinitions.length === 0) {
      throw new Error('Failed to fetch any valid definitions');
    }

    res.json(validDefinitions);
  } catch (error) {
    console.error('Error fetching random words:', error);
    res.status(500).json({
      error: 'Failed to fetch random words',
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`Word definition endpoint: http://localhost:${PORT}/api/word/:word`);
  console.log(`Random words endpoint: http://localhost:${PORT}/api/random-words`);
}); 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey && apiKey !== 'your_api_key' && apiKey !== 'your_gemini_api_key_here' ? new generative_ai_1.GoogleGenerativeAI(apiKey) : null;
class GeminiService {
    /**
     * Generates a complete structured comic story using Gemini API or rich fallback
     */
    static async generateStory(input) {
        const prompt = `
You are ComicCraft AI, an expert comic book editor and creative director.
Create a complete, engaging comic story based on the user's prompt below.

STORY PROMPT:
- Concept: "${input.idea}"
- Genre: ${input.genre}
- Tone: ${input.tone}
- Comic Style: ${input.style}
- Length: ${input.length}

You MUST return ONLY a valid JSON object strictly matching this schema, without any markdown formatting or surrounding backticks:
{
  "title": "Comic Title",
  "tagline": "Short catchy slogan",
  "genre": "${input.genre}",
  "style": "${input.style}",
  "tone": "${input.tone}",
  "summary": "2-3 sentence engaging synopsis",
  "characters": [
    {
      "name": "Character Name",
      "role": "Protagonist / Antagonist / Sidekick",
      "personality": "Traits and temperament",
      "appearance": "Visual look, outfit, distinguishing features for artists",
      "background": "Short backstory",
      "importance": "Main Hero / Rival / Ally"
    }
  ],
  "scenes": [
    {
      "title": "Scene Name",
      "location": "Location setting",
      "time": "Time of day",
      "characters": ["Character Name"],
      "description": "Visual scene description",
      "dialogue": [
        {
          "character": "Character Name",
          "text": "Spoken dialogue",
          "emotion": "Emotion (e.g. Excited, Tense)"
        }
      ],
      "actions": ["Action line 1", "Action line 2"]
    }
  ],
  "panels": [
    {
      "panelNumber": 1,
      "layout": "hero-wide",
      "description": "Detailed visual description of panel 1 graphics",
      "bgColor": "bg-purple-950",
      "bubbles": [
        {
          "type": "narration",
          "text": "NARRATION OR SPEECH TEXT",
          "character": "Narrator",
          "x": 10,
          "y": 10,
          "width": 70
        }
      ],
      "caption": "CAPTION BOX TEXT",
      "actionSticker": "POW!"
    }
  ],
  "ending": "Dramatic resolution or cliffhanger"
}
`;
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const result = await model.generateContent(prompt);
                const text = result.response.text().trim();
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const json = JSON.parse(jsonMatch[0]);
                    return this.enrichGeneratedStory(json, input);
                }
            }
            catch (err) {
                console.warn('⚠️ Gemini API error, using intelligent creative generator fallback:', err.message);
            }
        }
        return this.fallbackStoryGenerator(input);
    }
    /**
     * Generates a detailed character using Gemini or rich creative generator
     */
    static async generateCharacter(details) {
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const prompt = `Create a detailed comic character based on this concept: "${details.prompt}". Role: ${details.role || 'Main Hero'}, Genre: ${details.genre || 'Sci-Fi'}. Return ONLY valid JSON: {"name":"","role":"","personality":"","appearance":"","background":"","importance":""}`;
                const result = await model.generateContent(prompt);
                const text = result.response.text().trim();
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch)
                    return JSON.parse(jsonMatch[0]);
            }
            catch (e) {
                console.warn('Gemini character generation fallback');
            }
        }
        const nameSeed = details.prompt.split(' ')[0] || 'Vesper';
        const capitalizedName = nameSeed.charAt(0).toUpperCase() + nameSeed.slice(1).toLowerCase();
        return {
            name: capitalizedName.length > 2 ? capitalizedName : 'Kaelen Vance',
            role: details.role || 'Protagonist',
            personality: 'Bold, highly intuitive, quick on their feet, carrying a hidden secret.',
            appearance: 'Sleek dark jacket with neon trim, tactical belt, expressive luminous eyes, windblown hair.',
            background: 'Trained in secret beneath the neon spires of Sector 7, now fighting to expose truth.',
            importance: 'Main Character'
        };
    }
    /**
     * Generates scene details using Gemini or fallback
     */
    static async generateScene(details) {
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const prompt = `Create a dramatic comic scene based on: "${details.topic}". Characters: ${details.characters.join(', ')}. Return ONLY JSON: {"title":"","location":"","time":"","characters":[],"description":"","dialogue":[{"character":"","text":"","emotion":""}],"actions":[]}`;
                const result = await model.generateContent(prompt);
                const text = result.response.text().trim();
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch)
                    return JSON.parse(jsonMatch[0]);
            }
            catch (e) {
                console.warn('Gemini scene generation fallback');
            }
        }
        const mainChar = details.characters[0] || 'Hero';
        const secondChar = details.characters[1] || 'Ally';
        return {
            title: `The Confrontation at ${details.topic.slice(0, 20)}`,
            location: 'Sub-level Control Chamber',
            time: '01:15 AM',
            characters: details.characters,
            description: 'Shadows dance across illuminated terminal screens as atmospheric steam vents hiss in the background.',
            dialogue: [
                { character: mainChar, text: 'We only get one shot at this sequence. Is the transmitter aligned?', emotion: 'Determined' },
                { character: secondChar, text: 'Aligned and locked. But if they trace the signal, we have nowhere left to run.', emotion: 'Cautious' }
            ],
            actions: ['Power grid surges', 'Control terminal flashes warning LED', 'Footsteps echo outside']
        };
    }
    /**
     * AI Assistant rewrite / enhancement handler
     */
    static async assistImprove(command, content) {
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const prompt = `You are a comic book script doctor. Apply this command: "${command}" to the following script snippet:\n"${content}"\nReturn ONLY the improved text snippet, keeping it energetic, punchy, and formatted for comic panels.`;
                const result = await model.generateContent(prompt);
                return result.response.text().trim();
            }
            catch (e) {
                console.warn('Gemini assist fallback');
            }
        }
        if (command.toLowerCase().includes('twist')) {
            return `${content}\n\n✨ [PLOT TWIST]: Just as the dust settles, a radio pulse reveals that the transmission wasn't coming from an enemy base—it was originating from inside their own headquarters!`;
        }
        if (command.toLowerCase().includes('dialogue')) {
            return content.replace(/“/g, '"').replace(/”/g, '"') + '\n\n💬 [ENHANCED DIALOGUE]: "You think you\'re playing chess, but the board was burnt to ashes an hour ago!"';
        }
        if (command.toLowerCase().includes('dramatic') || command.toLowerCase().includes('action')) {
            return `⚡ [HIGH ACTION]: Sirens wail as red strobe lights flash through heavy smoke. ${content} Sparks rain down from overhead conduits as the structural glass cracks!`;
        }
        return `${content}\n\n🎭 [REFINED EDITION]: Enhanced narrative pacing and heightened emotional stakes.`;
    }
    static enrichGeneratedStory(json, input) {
        if (!json.panels || !Array.isArray(json.panels) || json.panels.length === 0) {
            json.panels = this.buildDefaultPanels(json.title || 'Comic Story', json.characters || []);
        }
        return json;
    }
    static fallbackStoryGenerator(input) {
        const title = this.generateDynamicTitle(input.idea, input.genre);
        const char1Name = input.idea.split(' ')[0] || 'Kael';
        const char1Clean = char1Name.charAt(0).toUpperCase() + char1Name.slice(1).toLowerCase();
        return {
            title: title,
            tagline: `An epic ${input.genre.toLowerCase()} journey written in the shadows of destiny.`,
            genre: input.genre,
            style: input.style,
            tone: input.tone,
            summary: `When a strange phenomenon disrupts normal life, ${char1Clean} discovers an artifact linked to ${input.idea.slice(0, 40)}. Together with trusted allies, they navigate high-stakes conflict to uncover the truth.`,
            characters: [
                {
                    name: char1Clean.length > 2 ? char1Clean : 'Aiden Vance',
                    role: 'Protagonist',
                    personality: 'Relentless, resourceful, sharp-witted under extreme tension.',
                    appearance: 'High-collared coat, glowing gauntlet, determined stare, dark sleek hair.',
                    background: 'Former technician who stumbled upon classified quantum signal archives.',
                    importance: 'Main Hero'
                },
                {
                    name: 'Lyra Vance',
                    role: 'Deuteragonist',
                    personality: 'Analytical, calm under fire, master tactician.',
                    appearance: 'Tactical visor, silver-streaked hair, dark combat jacket.',
                    background: 'Code breaker from the outer ring district.',
                    importance: 'Key Ally'
                }
            ],
            scenes: [
                {
                    title: 'The Spark of Discovery',
                    location: 'Abandoned Outpost 9',
                    time: 'Midnight',
                    characters: [char1Clean.length > 2 ? char1Clean : 'Aiden Vance', 'Lyra Vance'],
                    description: 'Rain hums against the reinforced glass dome as power generators hum to life.',
                    dialogue: [
                        { character: char1Clean.length > 2 ? char1Clean : 'Aiden Vance', text: 'Did you see that waveform? It matches the coordinates from the vault!', emotion: 'Excited' },
                        { character: 'Lyra Vance', text: 'Quiet! The scanner just detected incoming patrol signatures.', emotion: 'Tense' }
                    ],
                    actions: ['Main terminal illuminates', 'Energy pulse ripples through floor', 'Footsteps draw near']
                },
                {
                    title: 'The Climax',
                    location: 'Spire Core Room',
                    time: '03:00 AM',
                    characters: [char1Clean.length > 2 ? char1Clean : 'Aiden Vance'],
                    description: 'Holographic glyphs spin rapidly as the main override sequence counts down.',
                    dialogue: [
                        { character: char1Clean.length > 2 ? char1Clean : 'Aiden Vance', text: 'This ends tonight. No more secrets!', emotion: 'Fierce' }
                    ],
                    actions: ['Lever thrown', 'Blinding light beam shoots upward']
                }
            ],
            panels: [
                {
                    panelNumber: 1,
                    layout: 'hero-wide',
                    description: `Establishing shot of the setting. Dark atmospheric horizon bathed in neon ${input.genre === 'Superhero' || input.genre === 'Sci-Fi' ? 'cyan' : 'amber'} lighting.`,
                    bgColor: 'bg-purple-950',
                    bubbles: [
                        {
                            id: 'b-gen-1',
                            type: 'narration',
                            text: `SECTOR 7 — THE BEGINNING OF THE END.`,
                            character: 'Narrator',
                            x: 10,
                            y: 10,
                            width: 75
                        }
                    ],
                    caption: 'CHAPTER 1: IGNITION',
                    actionSticker: 'WHOOSH!'
                },
                {
                    panelNumber: 2,
                    layout: 'half-left',
                    description: `${char1Clean} examining the glowing console as vital energy reads spike across all monitors.`,
                    bgColor: 'bg-slate-900',
                    bubbles: [
                        {
                            id: 'b-gen-2',
                            type: 'speech',
                            text: 'The signal... it’s locked onto our frequency! We’re out of time!',
                            character: char1Clean.length > 2 ? char1Clean : 'Aiden Vance',
                            x: 15,
                            y: 20,
                            width: 65
                        }
                    ],
                    actionSticker: 'BZZZT!'
                },
                {
                    panelNumber: 3,
                    layout: 'half-right',
                    description: 'Lyra charging up her protective energy barrier as security doors slide shut.',
                    bgColor: 'bg-indigo-950',
                    bubbles: [
                        {
                            id: 'b-gen-3',
                            type: 'thought',
                            text: 'If we breach this door, there is no turning back.',
                            character: 'Lyra Vance',
                            x: 15,
                            y: 25,
                            width: 65
                        }
                    ],
                    actionSticker: 'CLICK!'
                },
                {
                    panelNumber: 4,
                    layout: 'full',
                    description: 'Dramatic full-width action panel showing the final release of energy and revelation.',
                    bgColor: 'bg-slate-950',
                    bubbles: [
                        {
                            id: 'b-gen-4',
                            type: 'shout',
                            text: 'INCOMING PULSE! BRACE FOR IMPACT!',
                            character: char1Clean.length > 2 ? char1Clean : 'Aiden Vance',
                            x: 20,
                            y: 35,
                            width: 60
                        }
                    ],
                    caption: 'TO BE CONTINUED...',
                    actionSticker: 'BOOM!'
                }
            ],
            ending: `With the core active, the true mystery of ${input.idea.slice(0, 30)} has only just begun.`
        };
    }
    static generateDynamicTitle(idea, genre) {
        const titlesByGenre = {
            'Sci-Fi': ['The Chrono Paradox', 'Echoes of Sector 9', 'Quantum Pulse', 'Beyond Horizon'],
            'Fantasy': ['Blade of the Eclipse', 'The Rune Sovereign', 'Whispers of Eldoria', 'Spellbound Void'],
            'Superhero': ['Apex Catalyst', 'Vigilante Prime', 'Pulse of Justice', 'Overcharge'],
            'Mystery': ['The Glass Cipher', 'Shadows Over Blackwood', 'Midnight Inquiry', 'The Lost Record'],
            'Comedy': ['Accidental Heroics', 'Chaos in Room 3B', 'The Super Slacker', 'Panic at the Donut Shop'],
            'Horror': ['The Whispering Cellar', 'Nightmare Relay', 'Entity 404', 'Flicker in the Dark']
        };
        const list = titlesByGenre[genre] || titlesByGenre['Sci-Fi'];
        const randomTitle = list[Math.floor(Math.random() * list.length)];
        if (idea.length > 3 && idea.length < 25) {
            return `${randomTitle}: ${idea.charAt(0).toUpperCase() + idea.slice(1)}`;
        }
        return randomTitle;
    }
    static buildDefaultPanels(title, characters) {
        return [
            {
                panelNumber: 1,
                layout: 'hero-wide',
                description: `Introductory scene establishing ${title}.`,
                bgColor: 'bg-purple-950',
                bubbles: [
                    { type: 'narration', text: `IN A WORLD OF SHADOWS, ${title.toUpperCase()} BEGINS.`, character: 'Narrator', x: 10, y: 10, width: 70 }
                ],
                actionSticker: 'POW!'
            }
        ];
    }
}
exports.GeminiService = GeminiService;

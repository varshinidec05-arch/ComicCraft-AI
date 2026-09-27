export interface IUserStore {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface ICharacterStore {
  id: string;
  userId: string;
  name: string;
  role: string;
  personality: string;
  appearance: string;
  background: string;
  importance?: string;
  createdAt: string;
}

export interface IPanelStore {
  id: string;
  panelNumber: number;
  layout: 'full' | 'half-left' | 'half-right' | 'third' | 'hero-wide' | 'split-top' | 'split-bottom';
  description: string;
  imagePrompt?: string;
  bgColor?: string;
  bubbles: Array<{
    id: string;
    type: 'speech' | 'thought' | 'shout' | 'whisper' | 'narration';
    text: string;
    character: string;
    x: number; // percentage
    y: number; // percentage
    width?: number;
  }>;
  caption?: string;
  actionSticker?: string;
  visualDetails?: string;
}

export interface ISceneStore {
  id: string;
  title: string;
  location: string;
  time: string;
  characters: string[];
  description: string;
  dialogue: Array<{
    character: string;
    text: string;
    emotion?: string;
  }>;
  actions: string[];
}

export interface IComicStore {
  id: string;
  userId: string;
  title: string;
  tagline?: string;
  genre: string;
  style: string;
  tone?: string;
  summary: string;
  coverColor?: string;
  coverImage?: string;
  characters: ICharacterStore[];
  scenes: ISceneStore[];
  panels: IPanelStore[];
  ending?: string;
  status: 'Draft' | 'Completed' | 'Published';
  pagesCount: number;
  createdAt: string;
  updatedAt: string;
}

// In-Memory Database Fallback with Pre-seeded Demo Content
export class LocalStore {
  public static users: IUserStore[] = [];
  public static comics: IComicStore[] = [];
  public static characters: ICharacterStore[] = [];

  public static initializeDemoData() {
    if (this.users.length === 0) {
      const demoUser: IUserStore = {
        id: 'demo-user-1',
        name: 'Alex Mercer',
        email: 'creator@comiccraft.ai',
        passwordHash: '$2a$10$w8T.N...demoPasswordHash',
        createdAt: new Date().toISOString(),
      };
      this.users.push(demoUser);

      // Pre-seeded Demo Characters
      const demoArun: ICharacterStore = {
        id: 'char-1',
        userId: 'demo-user-1',
        name: 'Arun',
        role: 'Protagonist',
        personality: 'Curious, determined, inventive, quick-witted under pressure',
        appearance: 'Young inventor, leather jacket, tech goggles pushed onto forehead, dark wavy hair',
        background: 'Self-taught engineer who built an illegal sub-frequency radio scanner in his basement workshop.',
        importance: 'Main Hero',
        createdAt: new Date().toISOString(),
      };

      const demoMira: ICharacterStore = {
        id: 'char-2',
        userId: 'demo-user-1',
        name: 'Mira',
        role: 'Deuteragonist / AI Researcher',
        personality: 'Analytical, cautious, fiercely loyal, deeply observant',
        appearance: 'Cybernetics scientist, sleek silver lab coat, glowing blue iris implant, sharp dark hair',
        background: 'Former lead developer at ChronoTech who went rogue after uncovering forbidden quantum signal logs.',
        importance: 'Key Ally',
        createdAt: new Date().toISOString(),
      };

      this.characters.push(demoArun, demoMira);

      // Pre-seeded Comic "The Last Signal"
      const demoComic: IComicStore = {
        id: 'comic-demo-1',
        userId: 'demo-user-1',
        title: 'The Last Signal',
        tagline: 'When time stopped, the frequency began.',
        genre: 'Sci-Fi',
        style: 'Manga',
        tone: 'Mysterious',
        summary: 'A rogue inventor discovers an abandoned broadcasting dish transmitting a coded sequence from 24 hours in the future. Alongside a renegade AI researcher, he must decipher the signal before ChronoTech erases the timeline.',
        coverColor: 'from-purple-900 via-indigo-900 to-slate-950',
        characters: [demoArun, demoMira],
        scenes: [
          {
            id: 'scene-1',
            title: 'The Underground Workshop',
            location: 'Sub-level 4, Neo-Veridia',
            time: '02:47 AM',
            characters: ['Arun', 'Mira'],
            description: 'Flickering holographic monitors fill the damp basement radio shack as a strange pulse disrupts all local frequencies.',
            dialogue: [
              { character: 'Arun', text: 'Mira, check channel 7! The waveforms are folding backwards in time.', emotion: 'Shocked' },
              { character: 'Mira', text: 'That’s impossible... unless the transmitter hasn’t been built yet.', emotion: 'Tense' }
            ],
            actions: ['Arun adjusts dial', 'Monitors flash yellow', 'Mira decodes signature']
          },
          {
            id: 'scene-2',
            title: 'ChronoTech Breach',
            location: 'Sector 9 Outer Relay',
            time: '03:15 AM',
            characters: ['Arun', 'Mira'],
            description: 'Enforcer drones sweep the courtyard with red searchlights while Arun hacks the security node.',
            dialogue: [
              { character: 'Arun', text: 'We have 30 seconds before the override kicks in!', emotion: 'Urgent' },
              { character: 'Mira', text: 'Hold them off. I’m pulling the memory core now.', emotion: 'Focused' }
            ],
            actions: ['Drone alarm blares', 'Spark shockwave hits barrier', 'Core unlocked']
          }
        ],
        panels: [
          {
            id: 'p1',
            panelNumber: 1,
            layout: 'hero-wide',
            description: 'Panoramic view of Neo-Veridia at midnight under neon rain. The rooftop transmitter tower glows with an abnormal violet lightning arc.',
            bgColor: 'bg-slate-900',
            bubbles: [
              {
                id: 'b1',
                type: 'narration',
                text: 'NEO-VERIDIA — 02:47 AM. THE CITY SLEEPS, BUT THE FREQUENCIES REMAIN ALIVE.',
                character: 'Narrator',
                x: 10,
                y: 10,
                width: 70
              }
            ],
            caption: 'SECTOR 4 — BASEMENT WORKSHOP',
            actionSticker: 'BZZZZT!'
          },
          {
            id: 'p2',
            panelNumber: 2,
            layout: 'half-left',
            description: 'Close-up of Arun looking at a glitching oscilloscope with wide, startled eyes as digital artifacts flood the screen.',
            bgColor: 'bg-indigo-950',
            bubbles: [
              {
                id: 'b2',
                type: 'speech',
                text: 'Mira, look at channel 7! The signal... it’s timestamped TOMORROW!',
                character: 'Arun',
                x: 15,
                y: 20,
                width: 65
              }
            ],
            actionSticker: 'WHIRRR!'
          },
          {
            id: 'p3',
            panelNumber: 3,
            layout: 'half-right',
            description: 'Mira stepping into the blue light of the holo-table, her cybernetic eye glowing bright azure as code cascades through her vision.',
            bgColor: 'bg-slate-900',
            bubbles: [
              {
                id: 'b3',
                type: 'thought',
                text: 'If that timestamp is accurate... ChronoTech is going to initiate the blackout tonight.',
                character: 'Mira',
                x: 15,
                y: 25,
                width: 65
              },
              {
                id: 'b4',
                type: 'shout',
                text: 'DON’T TOUCH THAT DIAL!',
                character: 'Mira',
                x: 20,
                y: 65,
                width: 60
              }
            ],
            actionSticker: 'POW!'
          },
          {
            id: 'p4',
            panelNumber: 4,
            layout: 'full',
            description: 'Dramatic splash frame: The basement wall shattered by a glowing pulse lock while Arun grabs the quantum hard drive.',
            bgColor: 'bg-purple-950',
            bubbles: [
              {
                id: 'b5',
                type: 'speech',
                text: 'Grab the drive! We have five seconds before the enforcer units reach the floor!',
                character: 'Arun',
                x: 15,
                y: 30,
                width: 65
              }
            ],
            caption: 'TO BE CONTINUED IN ISSUE #2...',
            actionSticker: 'KABOOM!'
          }
        ],
        ending: 'Arun and Mira escape into the subterranean subway tunnels with the data drive, unaware that the signal was sent by Arun himself.',
        status: 'Completed',
        pagesCount: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.comics.push(demoComic);
    }
  }
}

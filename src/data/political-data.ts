import { PoliticalParty, TimelineEvent } from '../types';

export const politicalParties: PoliticalParty[] = [
  {
    party_id: 'bjp',
    party_name: 'Bharatiya Janata Party',
    headquarters_address: '6-A, Deen Dayal Upadhyaya Marg, New Delhi',
    founded_year: 1980,
    key_milestones: [
      {
        year: 1980,
        description: 'Formation of BJP from the Janata Party'
      },
      {
        year: 2014,
        description: 'First BJP majority government formed under Narendra Modi'
      }
    ],
    symbol: {
      symbol_id: 'lotus',
      symbol_name: 'Lotus',
      image_url: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81',
      type: 'Flora',
      region: 'National',
      ideology: 'Nationalist',
      origin_story: 'The lotus symbolizes purity and enlightenment in Indian culture',
      cultural_adaptation: 'Represents growth despite challenging conditions',
      layers: {
        color: 'Saffron and Green',
        shape: 'Blooming Lotus',
        historical_use: 'Sacred symbol in Indian religions'
      },
      creation_year: 1980,
      evolution_notes: 'Maintained consistent design with enhanced digital representations'
    }
  },
  {
    party_id: 'inc',
    party_name: 'Indian National Congress',
    headquarters_address: '24, Akbar Road, New Delhi',
    founded_year: 1885,
    key_milestones: [
      {
        year: 1885,
        description: 'Formation of Indian National Congress'
      },
      {
        year: 1971,
        description: 'Launch of "Garibi Hatao" campaign'
      }
    ],
    symbol: {
      symbol_id: 'hand',
      symbol_name: 'Hand',
      image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      type: 'Object',
      region: 'National',
      ideology: 'Socialist',
      origin_story: 'Represents strength and unity of the people',
      cultural_adaptation: 'Symbol of protection and blessing',
      layers: {
        color: 'Tricolor',
        shape: 'Open Palm',
        historical_use: 'Associated with the Garibi Hatao campaign'
      },
      creation_year: 1971,
      evolution_notes: 'Simplified design for better recognition'
    }
  },
  {
    party_id: 'aap',
    party_name: 'Aam Aadmi Party',
    headquarters_address: '206, Rouse Avenue, DDU Marg, New Delhi',
    founded_year: 2012,
    key_milestones: [
      {
        year: 2012,
        description: 'Formation of AAP by Arvind Kejriwal'
      },
      {
        year: 2013,
        description: 'First Delhi government formed'
      }
    ],
    symbol: {
      symbol_id: 'broom',
      symbol_name: 'Broom',
      image_url: 'https://images.unsplash.com/photo-1563970f8e9f4e3e9c58d2ea7a2b13e8',
      type: 'Object',
      region: 'National',
      ideology: 'Socialist',
      origin_story: 'Symbolizes cleansing of corruption from the system',
      cultural_adaptation: 'Common household item representing common people',
      layers: {
        color: 'Blue and White',
        shape: 'Standing Broom',
        historical_use: 'Tool for cleanliness and purification'
      },
      creation_year: 2012,
      evolution_notes: 'Consistent design since party formation'
    }
  },
  {
    party_id: 'bsp',
    party_name: 'Bahujan Samaj Party',
    headquarters_address: '12, Gurudwara Rakabganj Road, New Delhi',
    founded_year: 1984,
    key_milestones: [
      {
        year: 1984,
        description: 'Formation of BSP by Kanshi Ram'
      },
      {
        year: 1995,
        description: 'First BSP government in Uttar Pradesh'
      }
    ],
    symbol: {
      symbol_id: 'elephant',
      symbol_name: 'Elephant',
      image_url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
      type: 'Animal',
      region: 'North',
      ideology: 'Socialist',
      origin_story: 'Represents strength and dignity of Bahujan society',
      cultural_adaptation: 'Sacred animal in Buddhism, symbolizing wisdom',
      layers: {
        color: 'Blue',
        shape: 'Standing Elephant',
        historical_use: 'Buddhist symbolism and strength'
      },
      creation_year: 1984,
      evolution_notes: 'Maintained original design with minor refinements'
    }
  },
  {
    party_id: 'ss',
    party_name: 'Shiv Sena',
    headquarters_address: 'Shiv Sena Bhavan, Dadar, Mumbai',
    founded_year: 1966,
    key_milestones: [
      {
        year: 1966,
        description: 'Formation of Shiv Sena by Bal Thackeray'
      },
      {
        year: 1995,
        description: 'First Shiv Sena-led government in Maharashtra'
      }
    ],
    symbol: {
      symbol_id: 'bow-arrow',
      symbol_name: 'Bow and Arrow',
      image_url: 'https://images.unsplash.com/photo-1547355253-ff0740f6e8c1',
      type: 'Object',
      region: 'West',
      ideology: 'Regionalist',
      origin_story: 'Inspired by warrior king Chhatrapati Shivaji',
      cultural_adaptation: 'Traditional weapon symbolizing Maratha pride',
      layers: {
        color: 'Saffron',
        shape: 'Drawn Bow with Arrow',
        historical_use: 'Warrior symbolism from Maratha history'
      },
      creation_year: 1989,
      evolution_notes: 'Symbol refined to enhance recognition'
    }
  },
  {
    party_id: 'trs',
    party_name: 'Telangana Rashtra Samithi',
    headquarters_address: 'Telangana Bhavan, Hyderabad',
    founded_year: 2001,
    key_milestones: [
      {
        year: 2001,
        description: 'Formation of TRS by K. Chandrashekar Rao'
      },
      {
        year: 2014,
        description: 'First government in newly formed Telangana'
      }
    ],
    symbol: {
      symbol_id: 'car',
      symbol_name: 'Car',
      image_url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027',
      type: 'Object',
      region: 'South',
      ideology: 'Regionalist',
      origin_story: 'Represents progress and forward movement',
      cultural_adaptation: 'Modern symbol of development',
      layers: {
        color: 'Pink',
        shape: 'Stylized Car',
        historical_use: 'Symbol of progress and development'
      },
      creation_year: 2001,
      evolution_notes: 'Design modernized over time'
    }
  },
  {
    party_id: 'dmk',
    party_name: 'Dravida Munnetra Kazhagam',
    headquarters_address: 'Anna Arivalayam, Chennai',
    founded_year: 1949,
    key_milestones: [
      {
        year: 1949,
        description: 'Formation of DMK by C.N. Annadurai'
      },
      {
        year: 1967,
        description: 'First DMK government in Tamil Nadu'
      }
    ],
    symbol: {
      symbol_id: 'rising-sun',
      symbol_name: 'Rising Sun',
      image_url: 'https://images.unsplash.com/photo-1548266652-99cf27701ced',
      type: 'Object',
      region: 'South',
      ideology: 'Regionalist',
      origin_story: 'Represents Tamil renaissance and awakening',
      cultural_adaptation: 'Symbol of new dawn and progress',
      layers: {
        color: 'Red and Black',
        shape: 'Rising Sun with Rays',
        historical_use: 'Dravidian movement symbolism'
      },
      creation_year: 1957,
      evolution_notes: 'Maintained consistent design since adoption'
    }
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    event_id: 'lotus-origin-1980',
    year: 1980,
    title: 'Birth of the Lotus Symbol',
    description: 'Adoption of the Lotus as BJP\'s official party symbol, representing purity and enlightenment',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-digital-1985',
    year: 1985,
    title: 'First Digital Rendition',
    description: 'First standardized digital version of the Lotus symbol created for print media',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-color-1990',
    year: 1990,
    title: 'Color Standardization',
    description: 'Official color scheme established with specific saffron and green shades',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-campaign-1996',
    year: 1996,
    title: 'National Campaign Integration',
    description: 'Lotus symbol featured prominently in first major national advertising campaign',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-modern-2000',
    year: 2000,
    title: 'Modernization Era',
    description: 'Symbol redesigned for digital age while maintaining traditional elements',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-3d-2010',
    year: 2010,
    title: '3D Evolution',
    description: 'Introduction of 3D rendered version for digital media and animations',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-brand-2014',
    year: 2014,
    title: 'Brand Guidelines',
    description: 'Comprehensive brand guidelines established for symbol usage across media',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-digital-2020',
    year: 2020,
    title: 'Digital Transformation',
    description: 'Symbol optimized for social media and digital-first campaigns',
    party_id: 'bjp',
    symbol_id: 'lotus'
  },
  {
    event_id: 'lotus-ar-2023',
    year: 2023,
    title: 'AR Integration',
    description: 'Augmented reality versions developed for interactive campaign experiences',
    party_id: 'bjp',
    symbol_id: 'lotus'
  }
];
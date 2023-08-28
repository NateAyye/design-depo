import { ArchiveIcon, ColorWheelIcon, FontFamilyIcon, OpacityIcon, ShadowIcon } from "@radix-ui/react-icons";

export const COLOR_FORMATS = [
  'hex',
  'rgb',
  'hsl',
  'hsv',
]


export const DASHBOARD_TABS = [
  {
    name: 'palettes',
    icon: <ColorWheelIcon />
  },
  {
    name: 'colors',
    icon: <OpacityIcon />
  },
  {
    name: 'gradients',
    icon: <ShadowIcon />
  },
  {
    name: 'fonts',
    icon: <FontFamilyIcon />
  },
  {
    name: 'projects',
    icon: <ArchiveIcon />
  },
];

export const INITIAL_PALETTES = [
  {
    id: 1,
    name: 'Palette 1',
    description: 'This is a palette',
    colors: [
      '#000000',
      '#ffffff',
      '#ff0000',
      '#00ff00',
      '#0000ff'
    ]
  },
  {
    id: 2,
    name: 'Palette 2',
    description: 'This is a palette',
    colors: [
      '#000000',
      '#ffffff',
      '#ff0000',
      '#00ff00',
      '#0000ff'
    ]
  },
  {
    id: 3,
    name: 'Palette 3',
    description: 'This is a palette',
    colors: [
      '#23ff00',
      '#ff4aff',
      '#1f4aff',
      '#ef4a1f',
      '#dfaa1a',
    ]
  }
]

export const INITIAL_COLORS = [
  {
    id: 1,
    name: 'Color 1',
    color: '#000000'
  },
  {
    id: 2,
    name: 'Color 2',
    color: '#ffffff'
  },
  {
    id: 3,
    name: 'Color 3',
    color: '#ff0000'
  },
  {
    id: 4,
    name: 'Color 4',
    color: '#00ff00'
  },
  {
    id: 5,
    name: 'Color 5',
    color: '#0000ff'
  },
  {
    id: 6,
    name: 'Color 6',
    color: '#ff4aff'
  },
  {
    id: 7,
    name: 'Color 7',
    color: '#1f4aff'
  },
  {
    id: 8,
    name: 'Color 8',
    color: '#ef4a1f'
  },
  {
    id: 9,
    name: 'Color 9',
    color: '#dfaa1a'
  },
]
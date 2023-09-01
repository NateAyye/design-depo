import { ArchiveIcon, ColorWheelIcon, FontFamilyIcon, OpacityIcon, ShadowIcon } from "@radix-ui/react-icons";
import tinycolor from "tinycolor2";

export const COLOR_FORMATS = [
  'hex',
  'rgb',
  'hsl',
  'hsv',
]


export const COLOR_HARMONIES = [
  {
    label: 'analogous',
    buildColors: (color) => {
      const newColor = tinycolor(color);
      return [...newColor.analogous(3, 4)]
    }
  },
  {
    label: 'complement',
    buildColors: (color) => {
      const newColor = tinycolor(color);
      return [newColor, newColor.complement(2, 4)]
    }
  },
  {
    label: 'monochromatic',
    buildColors: (color) => {
      const newColor = tinycolor(color);
      return [...newColor.monochromatic(3, 4)]
    }
  },
  {
    label: 'split Complement',
    buildColors: (color) => {
      const newColor = tinycolor(color);
      return [...newColor.splitcomplement(3, 4)]
    }
  },
  {
    label: 'Triadic',
    buildColors: (color) => {
      const newColor = tinycolor(color);
      return [...newColor.triad(3, 4)]
    }
  },
  {
    label: 'Tetriadic',
    buildColors: (color) => {
      const newColor = tinycolor(color);
      return [...newColor.tetrad(4, 8)]
    }
  },
]



export const DASHBOARD_TABS = [
  {
    name: 'palettes',
    icon: <ColorWheelIcon className="w-10 h-10 sm:w-6 sm:h-6" />
  },
  {
    name: 'colors',
    icon: <OpacityIcon className="w-10 h-10 sm:w-6 sm:h-6" />
  },
  {
    name: 'gradients',
    icon: <ShadowIcon className="w-10 h-10 sm:w-6 sm:h-6" />
  },
  {
    name: 'fonts',
    icon: <FontFamilyIcon className="w-10 h-10 sm:w-6 sm:h-6" />
  },
  {
    name: 'projects',
    icon: <ArchiveIcon className="w-10 h-10 sm:w-6 sm:h-6" />
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
    hexCode: '#000000'
  },
  {
    id: 2,
    name: 'Color 2',
    hexCode: '#ffffff'
  },
  {
    id: 3,
    name: 'Color 3',
    hexCode: '#ff0000'
  },
  {
    id: 4,
    name: 'Color 4',
    hexCode: '#00ff00'
  },
  {
    id: 5,
    name: 'Color 5',
    hexCode: '#0000ff'
  },
  {
    id: 6,
    name: 'Color 6',
    hexCode: '#ff4aff'
  },
  {
    id: 7,
    name: 'Color 7',
    hexCode: '#1f4aff'
  },
  {
    id: 8,
    name: 'Color 8',
    hexCode: '#ef4a1f'
  },
  {
    id: 9,
    name: 'Color 9',
    hexCode: '#dfaa1a'
  },
]
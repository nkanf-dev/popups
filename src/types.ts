export type AnimationType = 
  | 'top' 
  | 'bottom' 
  | 'left' 
  | 'right' 
  | 'topleft' 
  | 'topright' 
  | 'bottomleft' 
  | 'bottomright';

export type ThemeType = 
  | 'blue' 
  | 'green' 
  | 'orange' 
  | 'purple' 
  | 'pink' 
  | 'yellow' 
  | 'cyan' 
  | 'lime' 
  | 'red' 
  | 'teal' 
  | 'indigo' 
  | 'amber' 
  | 'rose' 
  | 'mint' 
  | 'peach' 
  | 'lavender' 
  | 'coral' 
  | 'sky' 
  | 'lemon';

export interface PoemData {
  content: string;
  origin: string;
  author: string;
  category: string;
}

export interface PopupConfig {
  id: string;
  text: string;
  author?: string;
  theme: ThemeType;
  animation: AnimationType;
  top: number;
  left: number;
  duration?: number;
}

export interface PopupPosition {
  top: number;
  left: number;
}

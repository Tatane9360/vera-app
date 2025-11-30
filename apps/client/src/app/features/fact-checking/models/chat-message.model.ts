export interface ChatMessage {
  id: string;
  role: 'user' | 'vera';
  content: string;
  type: 'text' | 'image' | 'url';
  imagePreview?: string;
  links?: SourceLink[];
  isLoading?: boolean;
}

export interface SourceLink {
  url: string;
  domain: string;
  favicon: string;
}

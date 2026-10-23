import type * as React from 'react';
export type IconName = 'paw' | 'chat' | 'video' | 'calendar' | 'home' | 'user' | 'heart' | 'star' | 'send' | 'check' | 'alert' | 'clock' | 'plus' | 'back';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg'; block?: boolean; icon?: IconName; iconRight?: IconName }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { selected?: boolean; icon?: IconName }
export declare function Chip(props: ChipProps): React.ReactElement;
export interface BadgeProps { tone?: 'neutral' | 'online' | 'busy' | 'away' | 'success' | 'waiting' | 'urgent' | 'fun'; children?: React.ReactNode; className?: string }
export declare function Badge(props: BadgeProps): React.ReactElement;
export interface IconProps { name: IconName; size?: number; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; hint?: string; error?: string; multiline?: boolean }
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface PetAvatarProps { name: string; species?: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other'; size?: number; showPaw?: boolean }
export declare function PetAvatar(props: PetAvatarProps): React.ReactElement;
export interface VetCardProps { name: string; specialty: string; rating: string | number; reviews: number; price: string; nextSlot?: string; status?: 'online' | 'busy' | 'away'; statusLabel?: string; mode?: 'chat' | 'video'; cta?: string; initials?: string; onConsult?: () => void }
export declare function VetCard(props: VetCardProps): React.ReactElement;
export interface ChatBubbleProps { from?: 'vet' | 'owner' | 'system'; author?: string; time?: string; children?: React.ReactNode }
export declare function ChatBubble(props: ChatBubbleProps): React.ReactElement;
export interface TypingDotsProps { label?: string }
export declare function TypingDots(props: TypingDotsProps): React.ReactElement;
export interface PawProgressProps { steps: string[]; current: number }
export declare function PawProgress(props: PawProgressProps): React.ReactElement;
export interface BottomNavItem { id: string; label: string; icon: IconName; badge?: number }
export interface BottomNavProps { items: BottomNavItem[]; active: string; onChange?: (id: string) => void; label?: string }
export declare function BottomNav(props: BottomNavProps): React.ReactElement;
declare global { interface Window { Snoutly: { Button: typeof Button; Chip: typeof Chip; Badge: typeof Badge; Icon: typeof Icon; TextField: typeof TextField; PetAvatar: typeof PetAvatar; VetCard: typeof VetCard; ChatBubble: typeof ChatBubble; TypingDots: typeof TypingDots; PawProgress: typeof PawProgress; BottomNav: typeof BottomNav } } }

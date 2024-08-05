type TMenuItemText = '홈' | '식사' | '운동' | '체중';

export interface ImageItems {
    href: string;
    src: string;
    alt: string;
    text?: TMenuItemText;
}

export interface ImageItemsProps {
    imageItems: ImageItems[];
}

export interface IIconItems {
    src: string;
    alt: string;
}

export interface IIconItemsProps {
    iconItems: IIconItems[];
}
// Lunch Menu Types

export type TLunchMenu = {
    idx: number;
    name: string;
    category: string;
    store: string;
    price: number;
}

export type TSubLunchMenu = Partial<TLunchMenu>

// Internal Data Types

export type TPublicData = {
    idx: number;
}
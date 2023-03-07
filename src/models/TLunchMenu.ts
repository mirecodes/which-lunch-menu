type TLunchMenu = {
    idx: number;
    name: string;
    category: string;
    store: string;
    price: number;
}

export type TSubLunchMenu = Partial<TLunchMenu>

export default TLunchMenu;
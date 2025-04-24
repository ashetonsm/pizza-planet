export interface Item {
    name: string;
    description: string;
    quantity: number;
    options: Options[]
}

export type Options = {
    size: number;
    price: number;
}

export class Item {
    options: Options[]
    constructor(name: string, description: string, quantity: number, options: Options[]) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.options = options;
    }
    toString() {
        return this.name + ', ' + this.description + ', ' + this.quantity + ', ' + this.options;
    }
}

export const menuItemConverter = {
    toFirestore: (menuItem: Item) => {
        return {
            name: menuItem.name,
            description: menuItem.description,
            quantity: menuItem.quantity,
            options: menuItem.options
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        return new Item(data.name, data.description, data.quantity, data.options);
    }
};
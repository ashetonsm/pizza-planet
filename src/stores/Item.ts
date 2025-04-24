export interface Item {
    name: string;
    description: string;
    quantity: number;
    options: Options[]
}

export interface Order {
    date: Date;
    id: string;
    items: Item[];
}

export type Options = {
    size: number;
    price: number;
}

export class Item {
    options: Options[]
    price!: number;
    size!: number;
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

export class Order {
    items: Item[]
    constructor(date: Date, id: string, items: Item[]) {
        this.date = date;
        this.id = id;
        this.items = items;
    }
    toString() {
        return this.date + ', ' + this.id + ', ' + this.items;
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

export const orderConverter = {
    toFirestore: (order: Order) => {
        return {
            date: order.date,
            id: order.id,
            items: order.items,
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        return new Order(data.date, data.id, data.items);
    }
};
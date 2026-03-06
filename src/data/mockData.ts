export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export const categories: Category[] = [
    { id: 'c1', name: 'Burgers', description: 'burgers good!' },
    { id: 'c2', name: 'Pizzas', description: 'we all love pizza!' },
    { id: 'c3', name: 'Drinks', description: 'wanna drink?' }
];

export const foodItems: FoodItem[] = [
    // Burgers
    {
        id: 'f1',
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheddar cheese, lettuce, tomato, and our signature sauce.',
        price: 149,
        categoryId: 'c1',
        imageUrl: 'https://via.placeholder.com/150?text=Cheeseburger'
    },
    {
        id: 'f2',
        name: 'Bacon Double Burger',
        description: 'Two beef patties with crispy bacon, melted cheese, and BBQ sauce.',
        price: 189,
        categoryId: 'c1',
        imageUrl: 'https://via.placeholder.com/150?text=Bacon+Burger'
    },
    {
        id: 'f3',
        name: 'Veggie Burger',
        description: 'Plant-based patty with fresh avocado, spinach, and vegan mayo.',
        price: 159,
        categoryId: 'c1',
        imageUrl: 'https://via.placeholder.com/150?text=Veggie+Burger'
    },

    // Pizzas
    {
        id: 'f4',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil.',
        price: 249,
        categoryId: 'c2',
        imageUrl: 'https://via.placeholder.com/150?text=Margherita'
    },
    {
        id: 'f5',
        name: 'Pepperoni Pizza',
        description: 'Tomato sauce, mozzarella, and a generous amount of pepperoni.',
        price: 289,
        categoryId: 'c2',
        imageUrl: 'https://via.placeholder.com/150?text=Pepperoni'
    },
    {
        id: 'f6',
        name: 'Vegetarian Pizza',
        description: 'Bell peppers, onions, mushrooms, black olives, and tomatoes.',
        price: 279,
        categoryId: 'c2',
        imageUrl: 'https://via.placeholder.com/150?text=Veggie+Pizza'
    },

    // Drinks
    {
        id: 'f7',
        name: 'Cola',
        description: 'Ice-cold classic cola.',
        price: 49,
        categoryId: 'c3',
        imageUrl: 'https://via.placeholder.com/150?text=Cola'
    },
    {
        id: 'f8',
        name: 'Lemonade',
        description: 'Freshly squeezed lemonade with a hint of mint.',
        price: 59,
        categoryId: 'c3',
        imageUrl: 'https://via.placeholder.com/150?text=Lemonade'
    },
    {
        id: 'f9',
        name: 'Iced Coffee',
        description: 'Chilled brewed coffee over ice with milk and sugar.',
        price: 89,
        categoryId: 'c3',
        imageUrl: 'https://via.placeholder.com/150?text=Iced+Coffee'
    }
];

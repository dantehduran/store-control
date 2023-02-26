export interface Category {
	id: number;
	name: string;
}
export interface Product {
	id: number;
	name: string;
	price?: string;
	stock?: number;
	description?: string;
	categories: Category[];
}
export interface Record {
	id: number;
	createdAt: string;
	type: 'INCREMENT' | 'DECREMENT';
	amount: number;
	user: User;
	product: Product;
}
export interface User {
	id: number;
	username: string;
	fullName: string;
	createdAt: string;
}

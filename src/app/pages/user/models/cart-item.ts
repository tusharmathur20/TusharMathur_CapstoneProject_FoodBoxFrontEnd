import { ShoppingCart } from './shopping-cart';
import { Product } from './../../admin/models/product';
export class CartItem {
    public id: number;
	public qty: number;
	public subtotal: number;
	public product: Product;
	public shoppingCart: ShoppingCart
	public toUpdate:boolean;
}

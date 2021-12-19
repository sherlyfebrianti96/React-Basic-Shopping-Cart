import { useProducts } from "../hooks/useProducts";

export const ProductsPage = () => {
	const product = useProducts();

	console.log('product : ', product);

	return (
		<h1>Products</h1>
	);
}

function ProductList({ products}) {
    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>
                    <h2>{product.title}</h2>
                    <p>${product.price}</p>
                    <img src={product.image} alt={product.title} style={{ width: '100px' }} />
                </li>
            ))}
        </ul>
    );
}

export default ProductList;
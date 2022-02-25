function ProductCard() {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src="https://picsum.photos/id/1/200/300" alt="product" />
      </div>
      <div className="product-card__info">
        <h2 className="product-card__title">Product title</h2>
        <p className="product-card__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="product-card__price">
          <span className="product-card__price-value">$100</span>
          <span className="product-card__price-currency">USD</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

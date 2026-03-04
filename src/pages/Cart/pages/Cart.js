import React, { Component } from "react";
import CartProductCard from "../../../componets/CardProducts";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      address: "",
      city: "",
      zip: "",
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleRemove = (id) => {
    this.props.removeFromCart(id);
  };

  handleIncreaseQuantity = (id) => {
    this.props.increaseQuantity(id);
  };

  handleDecreaseQuantity = (id) => {
    this.props.decreaseQuantity(id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, address, city, zip } = this.state;
    const errors = {};

    // Validações
    if (!email.includes("@")) {
      errors.email = "Por favor, insira um email válido";
    }
    if (password.length < 8) {
      errors.password = "A senha deve ter pelo menos 8 caracteres";
    }
    if (address.trim() === "") {
      errors.address = "Endereço é obrigatório";
    }
    if (city.trim() === "") {
      errors.city = "Cidade é obrigatória";
    }
    if (zip.trim() === "") {
      errors.zip = "CEP é obrigatório";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Formulário válido. Prosseguir com a finalização da compra.");
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { errors } = this.state;
    const { cart, totalPrice } = this.props.cartReducer;

    return (
      <div className="cart-container">
        <div className="cart-items">
          <h2>Seu Carrinho</h2>

          {cart.length > 0 ? (
            cart.map((product) => (
              <CartProductCard
                key={product.id}
                product={product}
                onRemove={this.handleRemove}
                increase={this.handleIncreaseQuantity}
                decrease={this.handleDecreaseQuantity}
              />
            ))
          ) : (
            <p style={{ fontSize: "1.5rem", color: "gray" }}>
              Seu carrinho está vazio
            </p>
          )}
        </div>

        <div className="checkout-section">
          <h3>Preço Total: R$ {totalPrice.toFixed(2)}</h3>

          <form onSubmit={this.handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className={`form-input ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className={`form-input ${errors.password ? "input-error" : ""}`}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                id="address"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                className={`form-input ${errors.address ? "input-error" : ""}`}
                placeholder="Digite seu endereço"
              />
              {errors.address && (
                <p className="error-message">{errors.address}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                id="city"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
                className={`form-input ${errors.city ? "input-error" : ""}`}
              />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="zip">CEP</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
                className={`form-input ${errors.zip ? "input-error" : ""}`}
              />
              {errors.zip && <p className="error-message">{errors.zip}</p>}
            </div>

            <button type="submit" className="checkout-btn">
              Finalizar Compra
            </button>
          </form>
        </div>
      </div>
    );
  }
}

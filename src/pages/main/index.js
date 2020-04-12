import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {}
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data

        this.setState({ products: docs, productInfo });
    }

    isFirstPage = () => {
        const { page } = this.state.productInfo
        return (Number(page) === 1)
    }

    isLastPage = () => {
        const { page, pages } = this.state.productInfo
        return (Number(page) === Number(pages))
    }

    loadPrevPage = () => {
        const { page } = this.state.productInfo
        if (!this.isFirstPage()) {
            this.loadProducts(Number(page) - 1)
        }
    }

    loadNextPage = () => {
        const { page } = this.state.productInfo
        if (!this.isLastPage()) {
            this.loadProducts(Number(page) + 1)
        }
    }

    render() {
        const { products } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (

                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>
                            Acessar
                        </Link>
                    </article>

                ))}
                <div className="actions">
                    <button
                        disabled={this.isFirstPage()}
                        onClick={this.loadPrevPage}>
                        Anterios
                    </button>
                    <button
                        disabled={this.isLastPage()}
                        onClick={this.loadNextPage}>
                        Proxima
                    </button>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import api from '../../services/api';

import './style.css';

export default class Main extends Component {
    
    state = {
        products: [],
        productsInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const products = await api.get(`/products?page=${page}`);
        
        const { docs, ...productsInfo } = products.data;

        this.setState({
            products: docs,
            productsInfo,
            page
        });
    }

    prevAction = () => {
        
        const { page } = this.state;

        if (page === 1) return;

        let pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextAction = () => {
        const { page, productsInfo:{ pages } } = this.state;

        if (page === pages) return;

        let pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {
        
        const { products, page, productsInfo:{ pages } } = this.state;
        
        return (
            <div className="product-list">
                {
                    products.map(product => (
                        <article key={product._id}>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>
                        </article>
                    ))
                }
                <div className="actions">
                    <button disabled={ page === 1 } onClick={this.prevAction}>prev</button>
                    <button disabled={ page === pages } onClick={this.nextAction}>next</button>
                </div>
            </div>
        )
    }
}
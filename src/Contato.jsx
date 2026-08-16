import React from 'react';
import './Contato.css';

function Contato() {
    return (
        <div className="container-contato">
            <h1>Fale Conosco</h1>
            <p>Envie uma mensagem para nós e responderemos o mais rápido possível.</p>

            <form className="form-contato">
                <label>Nome:</label>
                <input type="text" placeholder="Digite seu nome" />

                <label>E-mail:</label>
                <input type="email" placeholder="Digite seu e-mail" />

                <label>Mensagem:</label>
                <textarea placeholder="Escreva sua mensagem aqui..."></textarea>

                <button type="submit">Enviar Mensagem</button>
            </form>
        </div>
    );
}

export default Contato;


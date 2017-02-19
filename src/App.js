import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import InputCustomizado from './componentes/InputCostumizado';
import AutorBox from './componentes/Autor';
import PubSub from 'pubsub-js';

class App extends Component {
  constructor() {
    super();
    this.state = {lista : []};
  }

  componentDidMount(){
    fetch(`http://cdc-react.herokuapp.com/api/autores`)  
      .then(response => response.json())
      .then(result => {
        this.setState({lista : result});
      })
      .catch(err => {
      console.error('Failed retrieving information', err);
    });

    PubSub.subscribe('atualiza-lista-autores', (topico, data) => {
      console.log(data);
      this.setState({lista : data})
    });
  }

  render() {
    return (
<div id="layout">
    
    <a href="#menu" id="menuLink" className="menu-link">
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>
            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
        </div>
    </div>
        <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <AutorBox />
              </div>             
            </div>
          </div>            


</div>     
    );
  }
}

export default App;
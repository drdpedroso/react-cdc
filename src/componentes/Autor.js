import React,{ Component } from 'react';
import InputCustomizado from './InputCostumizado';

class TabelaAutores extends Component{
  
    render() {
        return(
                <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.lista.map(function(autor){
                              return (
                                <tr key={autor.id}>
                                  <td>{autor.nome}</td>
                                  <td>{autor.email}</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
                    </div>
      );
    }
}

class FormularioAutor extends Component{
    

  constructor() {
    super();
    this.state = {lista : [],nome:'',email:'', senha:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  setNome(event){
    this.setState({nome:event.target.value});
  }

  setEmail(event){
    this.setState({email:event.target.value});
  }

  setSenha(event){
    this.setState({senha:event.target.value});
  }

  enviaForm(event){
    event.preventDefault();

    fetch(`http://cdc-react.herokuapp.com/api/autores`, {  
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({nome:this.state.nome, email:this.state.email, senha: this.state.senha})
      })  
      .then(response => response.json())
      .then(result => {
        this.props.callbackAtualizaListagem(result);
        // this.setState({lista : result});
      })
      .catch(err => {
        console.error('Failed retrieving information', err);
      });

  }

  render() {
      return (
        <div className="pure-form pure-form-aligner">
          <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
            <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>                                              
            <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>                                              
            <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>                                                   
        <div className="pure-control-group">                                  
              <label></label>
              <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                
            </div>
          </form>
          </div>
      );
  }
}

export default class AutorBox extends Component {


  constructor() {
    super();
    this.state = {lista : []};
    this.atualizaListagem = this.atualizaListagem.bind(this);
  }
  atualizaListagem(novaLista){
    this.setState({lista: novaLista})
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
  }

  render(){
    return(
        <div>
            <FormularioAutor callbackAtualizaListagem={this.atualizaListagem} />     
            <TabelaAutores lista={this.state.lista} />
        </div>
    );
  }

}
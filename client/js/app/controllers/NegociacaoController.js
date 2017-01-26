class NegociacaoController{

	constructor(){
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
                this._inputQuantidade = $('#quantidade');
                this._inputValor = $('#valor');

                this._listaNegociacoes = new Bind(
                        new ListaNegociacoes(),
                        new NegociacoesView($("#negociacoesView")),
                        'adiciona', 'esvazia');

                this._mensagem = new Bind(
                        new Mensagem(),
                        new MensagemView($("#mensagemView")),
                        'texto');
        }

        adicionar(event){
              event.preventDefault();

              this._listaNegociacoes.adiciona(this._CriaNegociacao());
              this._mensagem.texto = 'Negociação adicionada com sucesso.';
              this._LimpaFormulario();
      }

      importaNegociacoes() {
              let service = new NegociacaoService();
                 service
                        .obterNegociacoes()
                        .then(negociacoes => negociacoes.forEach(negociacao => {
                                this._listaNegociacoes.adiciona(negociacao);
                                this._mensagem.texto = 'Negociações do período importadas'   
                        }))
                        .catch(erro => this._mensagem.texto = erro);
      }

      apaga() {
              this._listaNegociacoes.esvazia();
              this._mensagem.texto = "Negociações apagadas como sucesso.";
      }

      _CriaNegociacao(){
              return new Negociacao(
               DateHelper.textoParaData(this._inputData.value),
               this._inputQuantidade.value,
               this._inputValor.value)	
      }
      
      _LimpaFormulario(){

              this._inputData.value = '';
              this._inputQuantidade.value = 1;
              this._inputValor.value = 0.0;
              this._inputData.focus();
      }

}
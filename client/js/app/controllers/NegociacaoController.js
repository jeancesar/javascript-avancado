class NegociacaoController{

	constructor(){
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        let self = this;
        this._ListaNegociacoes = new Proxy(new ListaNegociacoes(), {
        	get(target, prop, receiver) {
        		if (['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

        			return function() {
        				console.log(`Interceptando ${prop}`);

        				Reflect.apply(target[prop], target, arguments);
        				self._NegociacoesView.update(target);
        			}
        		}

        		return Reflect.get(target, prop, receiver);
        	}
        });

        this._NegociacoesView = new NegociacoesView($("#negociacoesView"));
        this._NegociacoesView.update(this._ListaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
	}

	adicionar(event){
		event.preventDefault();

        this._ListaNegociacoes.adiciona(this._CriaNegociacao());
        this._LimpaFormulario();

        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._mensagemView.update(this._mensagem);
	}

	apaga() {
		this._ListaNegociacoes.esvazia();

		this._mensagem.texto = "Negociações apagadas como sucesso.";
		this._mensagemView.update(this._mensagem);
	}

	_CriaNegociacao(){
		return new Negociacao(
        	DateHelper.textoParaData(this._inputData.value),
        	this._inputQuantidade.value,
        	this._inputValor.value
        )	
	}
	
	_LimpaFormulario(){

		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	}

}
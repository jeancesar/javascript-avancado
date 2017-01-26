class NegociacaoService {

    constructor(){
        this.http = new HttpService();
    }
    
    obterNegociacoesDaSemana(){            
            return this.http.get('negociacoes/semana')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(error => { throw new Error('Não foi possível obter as negociações da semana.'); });
    }

    obterNegociacoesDaSemanaAnterior() {
            return this.http.get('negociacoes/anterior')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(error => { throw new Error('Não foi possível obter as negociações da semana anterior.'); });
    }

    obterNegociacoesDaSemanaRetrasada() {
            return this.http.get('negociacoes/retrasada')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(error => { throw new Error('Não foi possível obter as negociações da semana retrasada.'); });

    }

    obterNegociacoes() {
       return Promise.all([
                      this.obterNegociacoesDaSemana(),
                      this.obterNegociacoesDaSemanaAnterior(),
                      this.obterNegociacoesDaSemanaRetrasada()
              ]).then(periodos => {
                  let negociacoes = periodos
                      .reduce((grupoAtual, proximoGrupo) => grupoAtual.concat(proximoGrupo), []);
                      
                      return negociacoes;
              })
              .catch(error => {throw new Error( error)});
    }
}
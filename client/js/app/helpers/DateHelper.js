class DateHelper {

	constructor() {
		throw new Error("Essa é uma classe estática");
	}

	static textoParaData(texto){

		if(!/\d{4}-\d{2}-\d{2}/.test(texto))
			throw new Error("Utilize o formato yyyy-mm-aa.");

		return new Date(
			...texto.split("-")
        	.map((item, indice) => item - indice % 2)
        );
	}

	static dataParaTexto(data) {

		return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
	}
}
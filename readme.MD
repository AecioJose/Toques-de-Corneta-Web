# Importante: 

A função ``createCanvas`` é o ponto inicial para a manipulação do canvas. 
As seguintes funções e variáveis dependem da chamada prévia de ``createCanvas`` para funcionar corretamente:


> - ``fill``: Define a cor de preenchimento para formas.
> - ``stroke``: Define a cor da borda das formas.
> - ``strokeWeight``: Ajusta a espessura da borda.
> - ``background``: Define a cor de fundo do canvas.
> - ``backgroundClear``: Limpa o canvas.
> - ``vertex``: Adiciona um ponto ao caminho atual de uma forma.
> - ``beginShape``: Inicia um novo caminho de forma.
> - ``endShape``: Finaliza o caminho da forma desenhada.
> - ``WIDTH``: Armazena a largura do canvas.
> - ``HEIGHT``: Armazena a altura do canvas.

***Certifique-se de chamar ``createCanvas`` antes de utilizar essas funções e variáveis!***
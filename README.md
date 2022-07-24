
# Road Corretora

Aplicação simula uma corretora de investimentos, possibilitando ao usuário visualizar, comprar e vender ações. 

##  Como usar

###  1 - Ao acessar, você verá a página de login...

![ Imagem da tela de Login ](https://github.com/amandacamile/Investments-App/blob/main/readme-images/tela-de-login.png)


###  2 - Após preenche-la e clicar no botão "Acessar", você será direcionado para página de ações, onde poderá visualizar a tabela de ações disponíveis e a tabela de ações do usuário.

![ Imagem da tela de ações ](https://github.com/amandacamile/Investments-App/blob/main/readme-images/tela-de-acoes.png)


###  3 - Ao clicar no botão "$" presente nas tabelas acima, a seguinte caixa de diálogo irá aparecer, onde será possível efetuar a compra ou venda da ação selecionada!

![ Imagem da tela de compra e venda ](https://github.com/amandacamile/Investments-App/blob/main/readme-images/tela-de-compra-e-venda.png)


###  4 - Você também pode fazer depósitos e retiradas de seu saldo na aplicação, basta clicar no botão "Acessar minha carteira", localizado na região superior à direita da tela de açoes...

![ Imagem com instrução de qual botão clicar ](https://github.com/amandacamile/Investments-App/blob/main/readme-images/instrucao-botao-carteira.png)
### ... e selecionar a opção desejada!
![ Imagem da tela de depósito e retirada (carteira) ](https://github.com/amandacamile/Investments-App/blob/main/readme-images/tela-de-carteira.png)


## Tecnologias utilizadas
- [React](https://reactjs.org/)
    >Por já ter trabalhado com React em outros projeto durante meu desenvolvimento na Trybe, decidi utilizar a mesma nesse projeto por já ter conhecimo de seu funcionamento.
- [Context API](https://pt-br.reactjs.org/docs/context.html)
    >A escolha de utilizar o Context API, é por achar sua usabilidade mais simples se comparado ao Redux, dado que a aplicação desenvolvida não tem grande escala, ou seja, não tem muitos arquivos para gerenciamento de estado (o que nesse caso, o Redux seria uma boa escolha).
- [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)
    >Os Hooks foram utilizados com o objetivo de criar estados locais nos componentes da aplicação utilizando useState, e também facilitar o uso dos contextos usando useContext.
- [Yup](https://www.npmjs.com/package/yup)
    >Essa biblioteca de validação de dados foi utilizada por disponibilizar uma forma mais enxuta de autenticar os dados, possibilitando mostrá-los na tela para o usuário. 
- [SweetAlert2](https://sweetalert2.github.io/)
    >A biblioteca SweetAlert2 foi utilizada para customizar as caixas de alertas presentes em alguns componentes do projeto.
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
    >Por último, mas não menos importante, escolhi utilizar o Tailwind CSS nesse projeto pro querer aprender a utilizar um framework destinado a estilização, e percebi que o Tailwind conseguia facilitar e melhorar o uso do CSS através das classes utilitárias, e que diferente do Bootstrap que disponibiliza a estilização do componente pronta, no Tailwind você pode controlar a estilização de seus componentes.
    

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:amandacamile/Investments-App.git
```

Entre no diretório do projeto

```bash
  cd Investments-App
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Suporte

Para suporte, mande um email para amandacamileso18@gmail.com.


## Autores

**Amanda Camile Silva de Oliveira**
- Github: [@amandacamile](https://www.github.com/amandacamile)
- LinkedIn: [@amandacamile](https://www.linkedin.com/in/amandacamile/)

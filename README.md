![](https://github.com/caiohscruz/GuiaPress/blob/master/public/images/tumbnail%20guiapress.png?raw=true)



Overview breve em: https://youtu.be/zdmDHQxIyiM

## :computer: Projeto

A proposta era desenvolver um protótipo de blog, onde um usuário qualquer, não logado, pode consultar os artigos publicados, filtrados ou não por categoria. Caso o usuário tenha um cadastro, ele pode, em sua área restrita, criar, editar e deletar artigos e categorias. Realizei o deploy da aplicação na Heroku, confira: [GuiaPress](https://guiapress.herokuapp.com/)

## :satellite: De onde?

Adquiri um curso de NodeJS na Udemy,  [Formação NodeJS](https://www.udemy.com/course/formacao-nodejs/), que me pareceu ser bem completinho, esta aplicação foi proposta como segundo projeto.

## :books: Aprendizado

Aprendi neste projeto a lidar com autenticação de usuários e com sessões com NodeJS, não me pareceu muito diferente de como aprendi quando estudei PHP na faculdade. Tive algumas dificuldades com o deploy, o que propiciou um grande aprendizado: um módulo não estava sendo reconhecido por causa de diferenciação entre letra maiúscula e minúscula. O projeto estava rodando localmente, mas apresentava erro de "módulo não encontrado" nos logs da Heroku. Depois de pesquisar um pouco, descobri que o git parece não fazer distinção entre maiúscula e minúscula, mas a base do Heroku é Linux, e ele faz essa diferenciação. Acontece que quando fiz o primeiro commit que envolvia o módulo em questão, eu tinha nomeado ele com todas as letras minúsculas, durante o desenvolvimento corrigi isso, mas essa alteração não foi considerada relevante ao git. No momento do deploy, a Heroku  identificava o arquivo como começando com minúscula, mas meu código fazia referencia ao nome começando com letra maiúscula.

## :hammer:Alterações

Uma das alterações que implementei foi que, diferente do projeto original, onde bastaria estar logado para manipular quaisquer artigos e categorias, adicionei uma restrição para que os usuários possam manipular apenas os seus próprios artigos, e apenas o administrador pode consultar todos os artigos e manipular as categorias. Fiz isso para não correr o risco de serem geradas inconsistências, como deletarem uma categoria que possui artigos publicados. Caso um usuário que não é o administrador tente acessar o menu de categorias ou use rotas que ele não poderia, será redirecionado para a página inicial da área restrita, onde são expostos seus artigos

O projeto original ainda propunha listar cada categoria criada na navbar, um ao lado do outro. Em vez disso, inclui um dropdown no menu, que lista as categorias em ordem alfabética. Caso uma categoria que ainda não possui artigos seja selecionada, o usuário é redirecionado para a página inicial, mas caso haja artigos para aquela categoria, a plataforma irá apresentá-los do mais recente ao mais antigo.

O esquema de paginação originalmente seria apenas links de "próximo" e "anterior" ao final da página, resolvi incrementar um pouco o esquema de paginação incluindo um mostrador de páginas e os botões de primeira e última páginas.

Achei que seria interessante também incluir uma sinalização aos artigos de quem os elaborou e a qual categoria pertencem, algo que não estava no escopo original do projeto. Como coloquei, o projeto não fazia distinção entre os usuários, o login foi incluido apenas para familiarização com as funcionalidades de autenticação e sessões

Quanto aos cadastro e login, acrescentei o campo "username" para poder incluir os autores dos artigos e inclui um menu de login na navbar. Na proposta do projeto, haveria apenas os itens "login" e "cadastro" na navbar, tal como o item "home", que direcionaria os usuários para as respectivas páginas. Não deixei de implementar essas páginas, mas achei que seria interessante ter a opção de se realizar o login direto da página inicial, sem ter que ir para outra página para isso.

## :rocket:Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML
- CSS
- Bootstrap
- JavaScript
- NodeJS
- EJS
- Express
- MySQL
- Sequelize
- Dotenv
- TinyMCE
- bcryptjs
- slugify
- express-session

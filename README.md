## Contact List

Este projeto é uma aplicação de lista de contatos desenvolvida para fins de aprendizados da disciplina Aplicação para Interfaces Ricas - ADS. Aplicação permite adicionar, visualizar, editar e excluir contatos, proporcionando uma interface intuitiva e de fácil utilização.

## Getting Started

### Para clonar este projeto em sua máquina local, siga os passos abaixo:

Abra o terminal (ou Git Bash).

Navegue até o diretório onde deseja salvar o projeto.

Clone o repositório:

```bash
git clone https://github.com/whohenriq/contact-list.gi

```

Após o download, acesse a pasta do projeto:

```bash
cd contact-list
```

Instale as dependências:

```bash
npm install
```

### Mock API com JSON Server

Este projeto utiliza o JSON Server para simular uma API REST completa e funcional, baseada em um arquivo JSON. Essa API é útil para desenvolvimento local, prototipação e testes, sem necessidade de um backend real.

### Executar o servidor

```bash
json-server --watch server.json --port 3001
```

### Configure as variáveis de ambiente:

Crie um arquivo .env.local na raiz do projeto e adicione as variáveis necessárias, como no exemplo do arquivo .env.EXAMPLE:

```bash
API_HOST=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

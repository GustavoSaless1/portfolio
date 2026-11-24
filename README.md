# Gustavo Sales | Portfólio

Portfólio de Gustavo Sales para apresentar projetos de criação de sites e explicar como funciona a automação de atendimento.

**[Acessar o site](https://gustavosales.com/)**

## O que tem no site

- Vitrine de projetos com Studio Gabi Sales e Jet Car Oficina Mecânica.
- Demonstração de atendimento com uma conversa simulada no navegador.
- Formulário “Monte seu projeto”, que organiza as escolhas do visitante e abre uma conversa no WhatsApp com um resumo preenchido. O visitante decide se envia a mensagem.

## Como abrir no computador

Baixe ou clone este repositório e abra o arquivo `index.html` no navegador. Para editar, abra a pasta no VS Code. O site usa HTML, CSS e JavaScript e funciona sem instalação de dependências.

```sh
git clone https://github.com/GustavoSaless1/portfolio.git
cd portfolio
```

## Organização

| Arquivo ou pasta | Função |
| --- | --- |
| `index.html` | Estrutura, conteúdo e metadados da página |
| `styles.css` | Layout, cores, animações e adaptação para telas menores |
| `script.js` | Vitrine, filtros, demonstração e formulário |
| `assets/` | Imagens e ícone do site |
| `robots.txt` e `sitemap.xml` | Orientações de rastreamento e endereço da página |
| `_headers` | Configuração de cabeçalhos para a hospedagem no Netlify |

## Verificação

Com Node.js instalado, execute `node --check script.js` para conferir a sintaxe do JavaScript. No navegador, teste os filtros, a demonstração e o resumo do formulário.

A versão de produção está hospedada no Netlify com domínio próprio.

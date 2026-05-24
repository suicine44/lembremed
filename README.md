# LembreMed

O LembreMed é um aplicativo móvel interativo focado na rotina de saúde de idosos, servindo como um simulador bidirecional para pacientes e cuidadores. O projeto fornece uma interface mobile-first fluida para o agendamento de remédios, conformidade diária de dosagem e canais de alertas de emergência.

## Requisitos

* Navegador moderno (Chrome, Firefox, Safari ou Edge)
* Node.js (versão 18 ou superior - opcional, recomendado para checagem de sintaxe e testes)

## Instalação

Abra o terminal do seu sistema e execute os seguintes comandos:

```bash
git clone https://github.com/suicine44/lembremed.git
cd lembremed
```

Caso queira usar ferramentas opcionais de desenvolvimento, instale as dependências:

```bash
npm install
```

## Como Rodar Localmente

### Opção 1: Abrindo diretamente no navegador
Por ser uma aplicação baseada em HTML5, CSS3 e JavaScript puro (Vanilla), você pode simplesmente abrir o arquivo `index.html` da raiz em qualquer navegador web ou usar extensões do tipo Live Server no VS Code.

### Opção 2: Servidor local básico com Node
Se possuir o Node instalado, você pode iniciar um servidor local estático simples:

```bash
npx http-server . -p 8080
```
Em seguida, acesse no navegador: `http://localhost:8080`

## Scripts e Comandos Úteis

Os comandos listados abaixo são opcionais e servem para garantir a integridade do código:

* **Validação de Sintaxe JS**:
  ```bash
  node -c js/main.js
  ```
* **Formatação/Estilo (Linter - opcional)**:
  ```bash
  npm run lint
  ```
* **Build (se aplicável - opcional)**:
  ```bash
  npm run build
  ```

## Padrão de Commits (Conventional Commits)

Adotamos a especificação do Conventional Commits para manter o histórico do repositório organizado. **Atenção: Todos os commits do projeto devem ser escritos em inglês.**

### Formato
`<tipo>(escopo opcional): descrição`

### Tipos Aceitos
* `feat`: Novo recurso do sistema
* `fix`: Correção de bug ou erro
* `docs`: Alterações em documentação (ex: README, Walkthroughs)
* `style`: Ajustes estéticos, formatação ou espaçamento (sem alteração de lógica)
* `refactor`: Mudanças no código que não corrigem bugs nem adicionam recursos
* `test`: Adição ou correção de testes automatizados
* `chore`: Tarefas domésticas, atualizações de dependências ou build/CI

### Bons Exemplos (Corretos)
* `feat(meds): add multi-time selection support for daily prescriptions`
* `fix(accessibility): isolate high-contrast scope to simulated phone container`
* `docs: create comprehensive readme for github repository`
* `style: standardize borders using radius tokens`

### Ruins Exemplos (Incorretos)
* `remedio novo` (Sem tipo e em português)
* `arrumei o CSS` (Sem convenção e em português)
* `fix: corrigido o bug no botao` (Corpo em português)

## Contribuição

1. Faça um Fork do repositório
2. Crie uma Branch para a sua funcionalidade/correção:
   ```bash
   git checkout -b feat/nova-funcionalidade
   ```
3. Realize os commits respeitando estritamente o padrão Conventional Commits em inglês.
4. Faça o push da sua branch:
   ```bash
   git push origin feat/nova-funcionalidade
   ```
5. Abra um Pull Request detalhando as alterações.

*Nota: Todos os commits enviados nos PRs serão validados automaticamente por workflows do GitHub Actions via Commitlint.*

## Licença

A definir.

## Contato e Suporte

Para dúvidas ou sugestões de melhorias, envie uma mensagem para o e-mail de contato do projeto: `suporte-lembremed@exemplo.com` (Substitua pelo contato oficial se necessário).

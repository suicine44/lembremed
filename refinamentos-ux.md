# Refinamentos de UX e Validações

## Goal
Ajustar regras de negócio da criação de contas, validações de entrada (telefone, idade baseada no awesome-falsehoods), correções visuais e divisão do onboarding por papéis.

## User Review Required
> [!IMPORTANT]
> Verifique se as decisões de design para o onboarding agradam. O fluxo será modificado para que o paciente não receba sugestões que não competem à sua função (ex. cuidar de outros pacientes). 
> As idades serão limitadas até 130 anos com base na adoção realista de regras do awesome-falsehoods, e o telefone usará máscara padrão brasileira.

## Tasks
- `[ ]` Task 1: Corrigir modo de alto contraste para o botão "Sair" (CSS). → Verify: Clicar no toggle de contraste e verificar se o Sair respeita o contraste.
- `[ ]` Task 2: Separar slides do Onboarding (Carrossel) por papel (Paciente x Cuidador) na `screen-3`. → Verify: Carrossel do paciente fala sobre lembretes, carrossel do cuidador sobre monitoramento.
- `[ ]` Task 3: Limpar array de pacientes falsos na criação de conta (`appState.patients = {}`). → Verify: Criar nova conta e não ver "paciente teste" ou "paciente de idade não informada".
- `[ ]` Task 4: Corrigir formatação (Mask) e inputs permitidos de Telefone nas telas de cadastro. → Verify: Digitar letras no telefone falha. Digitar números formata como (XX) XXXXX-XXXX.
- `[ ]` Task 5: Ajustar exibição da idade na lista "Meus Pacientes" para mostrar "X anos". → Verify: Olhar a tela `screen-7` e ver "78 anos" ao invés de "78".
- `[ ]` Task 6: Incluir validação no campo de Idade na tela `screen-add-patient` para idades < 0 ou > 130. → Verify: Digitar "555" falha com feedback na tela.

## Done When
- `[ ]` Alto contraste cobre botão "Sair"
- `[ ]` Onboarding adaptado e coerente com a persona
- `[ ]` Conta nova inicia vazia
- `[ ]` Telefone usa máscara numérica restrita em todas as telas
- `[ ]` Lista exibe "anos" de forma consistente
- `[ ]` Idade inválida (<0 ou >130) apresenta erro claro e não salva

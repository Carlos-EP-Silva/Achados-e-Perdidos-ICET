# Selenium WebDriver no Eclipse

Este exemplo replica em Java a ideia dos slides: usar o framework Selenium WebDriver
para automatizar o navegador e validar fluxos integrados do sistema.

## Opcao recomendada: Maven no Eclipse

1. Instale um JDK 17 ou superior.
2. Abra o Eclipse.
3. Va em `File > Import > Maven > Existing Maven Projects`.
4. Selecione esta pasta: `selenium-java-eclipse`.
5. Espere o Eclipse baixar as dependencias.
6. Abra `src/test/java/br/edu/ufam/selenium/SeleniumIntegracaoTest.java`.
7. Clique com o botao direito no arquivo e escolha `Run As > JUnit Test`.

## Se seguir exatamente o estilo dos slides, sem Maven

1. Crie um `Java Project` no Eclipse.
2. Crie o package `br.edu.ufam.selenium`.
3. Copie o arquivo `SeleniumIntegracaoTest.java`.
4. Baixe o Selenium Java no site oficial.
5. Clique com o botao direito no projeto:
   `Build Path > Configure Build Path > Libraries > Add External JARs`.
6. Adicione os JARs do Selenium.
7. Adicione tambem o JUnit 4 ao projeto.
8. Rode a classe como `JUnit Test`.

## O que este teste valida

- `CT-I-Selenium-Java-01`: login integrado pela interface, API de autenticacao e redirecionamento.
- `CT-I-Selenium-Java-02`: cadastro de item pelo guarda, persistencia no banco e exibicao na home.

Esses testes sao complementares aos testes feitos no Selenium IDE.


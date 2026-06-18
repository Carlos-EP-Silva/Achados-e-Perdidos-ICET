package br.edu.ufam.selenium;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.time.Duration;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.Alert;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumIntegracaoTest {

    private static final String BASE_URL = "https://achados-e-perdidos-icet.onrender.com";

    private WebDriver driver;
    private WebDriverWait wait;

    @Before
    public void iniciar() {
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("-width=1365");
        options.addArguments("-height=768");

        driver = new FirefoxDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @After
    public void finalizar() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void ctIntegracaoLoginInterfaceApiAutenticacao() {
        login("aluno@ufam.edu.br", "123456");

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("buscaInput")));

        assertEquals("Achados & Perdidos - ICET/UFAM", driver.getTitle());
        String marca = driver.findElement(By.cssSelector(".navbar-brand")).getText();
        assertTrue(marca.contains("Achados") && marca.contains("Perdidos"));
    }

    @Test
    public void ctIntegracaoLoginSenhaIncorretaBloqueado() {
        login("aluno@ufam.edu.br", "senha_errada");

        Alert alerta = wait.until(ExpectedConditions.alertIsPresent());
        String mensagem = alerta.getText();
        alerta.accept();

        assertTrue(mensagem.contains("Email ou senha incorretos"));
        assertEquals("Login - Achados & Perdidos - ICET/UFAM", driver.getTitle());
    }

    @Test
    public void ctIntegracaoHomeBuscaItensInterfaceApi() throws InterruptedException {
        driver.get(BASE_URL);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("buscaInput")));

        ((JavascriptExecutor) driver).executeScript(
                "document.getElementById('buscaInput').value = 'caderno'; filtrarItens();"
        );
        Thread.sleep(1000);

        assertEquals("caderno", driver.findElement(By.id("buscaInput")).getAttribute("value"));
        assertTrue(driver.findElement(By.id("lista-itens")).isDisplayed());
    }

    @Test
    public void ctIntegracaoAcessoAdminSemLoginBloqueado() {
        driver.get(BASE_URL);
        ((JavascriptExecutor) driver).executeScript("window.localStorage.clear();");

        driver.get(BASE_URL + "/admin.html");
        try {
            Alert alerta = wait.until(ExpectedConditions.alertIsPresent());
            alerta.accept();
        } catch (TimeoutException ignored) {
            // Algumas execucoes redirecionam direto, outras mostram alerta de sessao expirada.
        }

        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".navbar-brand")));

        assertEquals("Achados & Perdidos - ICET/UFAM", driver.getTitle());
        assertFalse(driver.getPageSource().contains("Painel Administrativo"));
    }

    @Test
    public void ctIntegracaoCadastroUsuarioBancoAutenticacao() throws InterruptedException {
        String sufixo = String.valueOf(System.currentTimeMillis());

        driver.get(BASE_URL + "/cadastro.html");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("formCadastro")));

        ((JavascriptExecutor) driver).executeScript("window.alert = function(){};");
        driver.findElement(By.id("cadNome")).sendKeys("Aluno Selenium Java");
        driver.findElement(By.id("cadCategoria")).sendKeys("Aluno");
        driver.findElement(By.id("cadDocumento")).sendKeys(("9" + sufixo).substring(0, 11));
        driver.findElement(By.id("telefone")).sendKeys("92999999999");
        driver.findElement(By.id("cadEmail")).sendKeys("seleniumjava" + sufixo + "@ufam.edu.br");
        driver.findElement(By.id("cadSenha")).sendKeys("123456");

        driver.findElement(By.cssSelector("#formCadastro button[type='submit']")).click();
        Thread.sleep(4000);

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        assertEquals("Login - Achados & Perdidos - ICET/UFAM", driver.getTitle());
    }

    @Test
    public void ctIntegracaoFormularioCadastroItemDisponivelParaGuarda() {
        login("guarda1@ufam.edu.br", "123456");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("formItem")));

        assertTrue(driver.findElement(By.cssSelector("#formItem [name='titulo']")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("#formItem [name='local_ocorrencia']")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("#formItem [name='descricao']")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("#formItem [name='categoria']")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector("#formItem [name='data_ocorrencia']")).isDisplayed());
    }

    @Test
    public void ctIntegracaoGuardaAcessaPainelRestrito() {
        login("guarda1@ufam.edu.br", "123456");

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("formItem")));

        assertEquals("Painel do Guarda - Achados & Perdidos - ICET/UFAM", driver.getTitle());
        assertTrue(driver.findElement(By.id("formItem")).isDisplayed());
    }

    @Test
    public void ctIntegracaoAdminAbreFormularioCadastroGuarda() {
        String sufixo = String.valueOf(System.currentTimeMillis());

        login("admin@ufam.edu.br", "123456");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("tbody-guardas")));

        driver.findElement(By.cssSelector("button[data-bs-target='#modalNovoGuarda']")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("gNome")));

        ((JavascriptExecutor) driver).executeScript(
                "window.alert = function(){};" +
                "document.getElementById('gNome').value = 'Guarda Selenium Java';" +
                "document.getElementById('gEmail').value = arguments[0];" +
                "document.getElementById('gSenha').value = '123456';",
                "guardaseleniumjava" + sufixo + "@ufam.edu.br"
        );

        assertEquals("Guarda Selenium Java", driver.findElement(By.id("gNome")).getAttribute("value"));
        assertEquals("123456", driver.findElement(By.id("gSenha")).getAttribute("value"));
    }

    @Test
    public void ctIntegracaoCampoUploadImagemDisponivelParaGuarda() {
        login("guarda1@ufam.edu.br", "123456");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("formItem")));

        WebElement campoFoto = driver.findElement(By.cssSelector("input[name='foto']"));

        assertEquals("file", campoFoto.getAttribute("type"));
        assertEquals("image/*", campoFoto.getAttribute("accept"));
    }

    @Test
    public void ctIntegracaoGuardaVisualizaAbasOperacionais() {
        login("guarda1@ufam.edu.br", "123456");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("guardaTabs")));

        assertTrue(driver.findElement(By.id("cadastro-tab")).isDisplayed());
        assertTrue(driver.findElement(By.id("pendencias-tab")).isDisplayed());
        assertTrue(driver.findElement(By.id("acervo-tab")).isDisplayed());
    }

    private void cadastrarItemComoGuarda(String tituloItem) throws InterruptedException {
        login("guarda1@ufam.edu.br", "123456");

        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("formItem")));

        driver.findElement(By.cssSelector("#formItem [name='titulo']")).sendKeys(tituloItem);
        driver.findElement(By.cssSelector("#formItem [name='local_ocorrencia']")).sendKeys("Bloco C - Sala 102");
        driver.findElement(By.cssSelector("#formItem [name='descricao']")).sendKeys("Item criado pelo Selenium WebDriver Java.");
        driver.findElement(By.cssSelector("#formItem [name='categoria']")).sendKeys("Outros");

        String hoje = java.time.LocalDate.now().toString();
        ((JavascriptExecutor) driver).executeScript(
                "document.querySelector('#formItem [name=\"data_ocorrencia\"]').value = arguments[0];",
                hoje
        );
        ((JavascriptExecutor) driver).executeScript("window.alert = function(){};");

        driver.findElement(By.cssSelector("#formItem button[type='submit']")).click();
        Thread.sleep(5000);
    }

    private void assertItemApareceNaHome(String tituloItem) throws InterruptedException {
        driver.get(BASE_URL);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("buscaInput")));

        ((JavascriptExecutor) driver).executeScript(
                "document.getElementById('buscaInput').value = arguments[0]; " +
                "if (typeof filtrarItens === 'function') { filtrarItens(); }",
                tituloItem
        );
        Thread.sleep(1000);

        WebElement item = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h5[contains(@class,'card-title') and contains(.,'" + tituloItem + "')]")
        ));

        assertTrue(item.isDisplayed());
    }

    private void login(String email, String senha) {
        driver.get(BASE_URL + "/login.html");

        WebElement campoEmail = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        campoEmail.clear();
        campoEmail.sendKeys(email);

        WebElement campoSenha = driver.findElement(By.id("senha"));
        campoSenha.clear();
        campoSenha.sendKeys(senha);

        driver.findElement(By.cssSelector("#formLogin button[type='submit']")).click();
    }
}

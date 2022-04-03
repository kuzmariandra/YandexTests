exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginInput = page.locator('xpath=//input[@name="login"]');
        this.passwdInput = page.locator('xpath=//input[@name="passwd"]');
        this.submitLoginButton = page.locator('xpath=//div[@class="passp-login-form"]//button[@type="submit"]')
        this.loader = page.locator('xpath=//div[@data-t="spin"]')
        this.submitPasswdButton = page.locator('xpath=//div[@class="AuthPasswordForm"]//button[@type="submit"]')
    }

    async goto() {
        await this.page.goto('https://calendar.yandex.ru/');
    }

    async login(account) {
        await this.page.waitForLoadState();
        await this.loginInput.type(account.login);
        // await this.submitLoginButton.waitFor()
        await this.submitLoginButton.click();
        await this.passwdInput.type(account.passwd);
        await this.submitPasswdButton.click();
    }
}

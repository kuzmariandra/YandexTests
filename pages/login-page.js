exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginInput = page.locator('xpath=//input[@name="login"]');
        this.passwdInput = page.locator('xpath=//input[@name="passwd"]');
        this.submitLoginButton = page.locator('xpath=//div[@class="passp-login-form"]//button[@type="submit"]')
        this.submitPasswdButton = page.locator('xpath=//div[@class="AuthPasswordForm"]//button[@type="submit"]')
    }

    async login(account) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.loginInput.type(account.login);
        await this.submitLoginButton.click();
        await this.passwdInput.type(account.passwd);
        await this.submitPasswdButton.click();
    }
}

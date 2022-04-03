const moment = require("moment");

exports.CalendarPage = class CalendarPage {
    constructor(page) {
        this.page = page;
        this.createEventButton = page.locator('.qa-AsideCreateEvent button');
        this.eventLocator = page.locator('div.qa-GridEvent');
        this.eventMeetupLocator = page.locator('div.qa-GridEvent span span');
        this.eventFormPreview = page.locator('.qa-EventFormPreview');
        this.eventFormPreviewTitle = page.locator('.qa-EventFormPreview-Title span');
        this.eventFormPreviewEditButton = page.locator('.qa-EventFormPreview-EditButton');
        this.eventFormPreviewDeleteButton = page.locator('.qa-EventFormDelete-Button');
        this.modalButtonDelete = page.locator('.qa-EventFormDelete-ModalButtonDeleteSingle');
        this.headerNextButton = page.locator('.PSHeaderContainer button.qa-HeaderGridNav-Next');
    }

    async deleteEvent() {
        if (moment().format('dddd') === "Sunday") {
            await this.headerNextButton.click();
        }
        let count = 1;
        let isEventHidden;
        do {
            await this.page.waitForLoadState('networkidle');
            await this.eventLocator.click();
            await this.eventFormPreview.waitFor([{state: 'attached'}]);
            await this.eventFormPreviewDeleteButton.click();
            await this.modalButtonDelete.waitFor();
            await this.modalButtonDelete.click([{button: 'middle'}]);
            await this.eventLocator.waitFor('hidden');
            isEventHidden = await this.eventLocator.isHidden();
            count++;
        } while (count <= 3 && !isEventHidden)
    }
}

const {expect} = require('@playwright/test');

exports.CalendarPage = class CalendarPage {
    constructor(page) {
        this.createEventButton = page.locator('.qa-AsideCreateEvent button');
        this.eventLocator = page.locator('div.qa-GridEvent');
        this.eventMeetupLocator = page.locator('div.qa-GridEvent span span');
        this.eventFormPreview = page.locator('.qa-EventFormPreview');
        this.eventFormPreviewTitle = page.locator('.qa-EventFormPreview-Title span');
        this.eventFormPreviewEditButton = page.locator('.qa-EventFormPreview-EditButton');
        this.eventFormPreviewDeleteButton = page.locator('.qa-EventFormPreview-DeleteButton');
        this.modalButtonDelete = page.locator('.qa-EventFormDelete-ModalButtonDeleteSingle');
    }
}

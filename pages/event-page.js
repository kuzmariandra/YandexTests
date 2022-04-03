const { expect } = require('@playwright/test');

exports.EventPage = class EventPage {

    constructor(page) {
        this.header = page.locator('div.qa-EventPage h1');
        this.nameInput = page.locator('div.qa-NameField input');
        this.addDescriptionButton = page.locator('div.qa-DescriptionField button');
        this.descriotionField = page.locator('div.qa-DescriptionField textarea');
        this.addVideoCallButton = page.locator('div.qa-TelemostField button');
        this.videoCallSpan = page.locator('div.qa-TelemostField div span');
        this.eventStartTimeInput = page.locator('span.qa-DatesField_Start-TimePicker input');
        this.eventStartDateInput = page.locator('input.qa-DatesField_Start-DatePicker-Input');
        this.eventEndTimeInput = page.locator('span.qa-DatesField_End-TimePicker input');
        this.eventEndDateInput = page.locator('input.qa-DateField_End-DatePicker-Input');
        this.eventLocationInput = page.locator('div.qa-LocationField input');
        this.createEventButton = page.locator('button.qa-EventForm-CreateButton');
        this.eventMembersInput = page.locator('.qa-MembersField input');
        this.eventMemberSpan = page.locator('.qa-MembersField .qa-Picker-Item span');
        this.saveEventButton = page.locator('button.qa-EventForm-SaveButton')
    }

    // async fillCreateEventForm() {
    //     await this.nameInput.type('Новая встреча');
    //     await this.addVideoCallButton.click();
    //     await this.submitButton.click();
    // }

    // async getStarted() {
    //     await this.getStartedLink.first().click();
    //     await expect(this.gettingStartedHeader).toBeVisible();
    // }
    //
    // async pageObjectModel() {
    //     await this.getStarted();
    //     await this.pomLink.click();
    // }
}

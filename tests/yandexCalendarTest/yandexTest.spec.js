const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/login-page');
const {CalendarPage} = require('../../pages/calendar-page');
const {EventPage} = require('../../pages/event-page');
'use strict';
const accountTestData = require('../account.testdata.json');
const yandexTestData = require('./yandexTest.testdata.json');
let input = yandexTestData.input;
let expected = yandexTestData.expected;
const moment = require("moment");
// todo goto baseURL;
// todo stabilize login;
// todo map;
// todo stabilize afterAll;
// todo check pages;
// todo check testCase;
// todo to know how to send project;
test.describe.configure({mode: 'serial'});
test.describe('Yandex Calendar', () => {
    let page;
    let loginPage;
    let calendarPage;
    let eventPage;
    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        // const loginPage = new LoginPage(page);
        // const calendarPage = new CalendarPage(page);
        loginPage = new LoginPage(page);
        calendarPage = new CalendarPage(page);
        eventPage = new EventPage(page);

        await loginPage.goto();
        await loginPage.login(accountTestData.account);
        await expect(calendarPage.createEventButton).toBeVisible();
    });
    test.afterAll(async () => {
        // const loginPage = new LoginPage(page);
        // const calendarPage = new CalendarPage(page);

        await loginPage.goto();
        // page.on('dialog', async dialog => {
        //     // console.log(dialog.message());
        //     await dialog.dismiss();
        // });
        await calendarPage.eventLocator.click();
        await calendarPage.eventFormPreview.waitFor();
        await calendarPage.eventFormPreviewDeleteButton.click();
        await calendarPage.modalButtonDelete.waitFor();
        await calendarPage.modalButtonDelete.click();
        await page.close();
    });

    test('Create event', async () => {
        // const calendarPage = new CalendarPage(page);
        // const eventPage = new EventPage(page);

        // Step1
        await calendarPage.createEventButton.click();
        await expect(eventPage.header).toHaveText(expected.headerNewEvent);

        // Step2
        await eventPage.nameInput.type(input.eventName);
        await expect(eventPage.nameInput).toHaveValue(input.eventName);

        // Step3
        await eventPage.addDescriptionButton.click();
        await expect(eventPage.descriotionField).toBeVisible();

        // Step4
        await eventPage.descriotionField.type(input.description);
        await expect(eventPage.descriotionField).toHaveText(input.description);

        // Step5
        await eventPage.addVideoCallButton.click();
        await expect(eventPage.videoCallSpan).toContainText(expected.videoCallInfo);

        // Step6
        const eventStartDateTime = moment().add(1, 'day');
        const eventStartTime = eventStartDateTime.format(moment.HTML5_FMT.TIME);
        const eventStartDate = eventStartDateTime.format('DD.MM.YYYY');
        const eventEndDateTime = eventStartDateTime.add(30, 'minute');
        const eventEndTime = eventEndDateTime.format(moment.HTML5_FMT.TIME);
        const eventEndDate = eventEndDateTime.format('DD.MM.YYYY');

        await eventPage.eventStartTimeInput.fill(eventStartTime);
        await eventPage.eventStartDateInput.fill(eventStartDate);
        await expect(eventPage.eventEndTimeInput).toHaveValue(eventEndTime);
        await expect(eventPage.eventEndDateInput).toHaveValue(eventEndDate);

        // Step7
        await eventPage.eventLocationInput.click();
        // await eventPage.eventLocationInput.fill(input.location);
        await eventPage.eventLocationInput.type(input.location);
        // await eventPage.eventLocationInput.press('Enter');
        await expect(eventPage.eventLocationInput).toHaveValue(input.location);

        // Step8
        expected.eventTitle = `${eventStartTime} - ${eventEndTime}\n${input.eventName}`;

        await eventPage.createEventButton.click();
        await expect(calendarPage.eventLocator).toBeVisible();
        await expect(calendarPage.eventLocator).toHaveAttribute('title', expected.eventTitle);
    });

    test('Add members', async () => {
        // const calendarPage = new CalendarPage(page);
        // const eventPage = new EventPage(page);

        // Step1
        await calendarPage.eventLocator.click();
        await calendarPage.eventFormPreview.waitFor();
        await expect(calendarPage.eventFormPreviewTitle).toHaveText(input.eventName);

        // Step2
        await calendarPage.eventFormPreviewEditButton.click();
        await eventPage.header.waitFor();
        await expect(eventPage.header).toHaveText(expected.headerEditEvent);

        // Step3
        // await Promise.all(input.members.map(async member => {
        //     await eventPage.eventMembersInput.type(member);
        //     await eventPage.eventMembersInput.press('Enter');
        //     await eventPage.eventMemberSpan.waitFor();
        // }));
        await eventPage.eventMembersInput.type(input.members[0]);
        await eventPage.eventMembersInput.press('Enter');
        await eventPage.eventMemberSpan.waitFor();
        await eventPage.eventMembersInput.type(input.members[1]);
        await eventPage.eventMembersInput.press('Enter');
        await expect(eventPage.eventMemberSpan).toHaveText(input.members);

        // Step4
        await eventPage.saveEventButton.click();
        await expect(calendarPage.eventMeetupLocator).toBeVisible();
    });
});

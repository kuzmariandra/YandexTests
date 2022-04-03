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
const promiseWaterfall = require('promise.waterfall')
// todo stabilize login;
// todo stabilize afterAll;
test.describe.configure({mode: 'serial'});
test.describe('Yandex Calendar', () => {
    let page;
    let loginPage;
    let calendarPage;
    let eventPage;
    let eventEndDateTime;

    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        calendarPage = new CalendarPage(page);
        eventPage = new EventPage(page);

        await page.goto('/');
        await loginPage.login(accountTestData.account1);
        await expect(calendarPage.createEventButton).toBeVisible();
    });
    test.afterAll(async () => {
        await page.goto('/');
        await calendarPage.deleteEvent(eventEndDateTime);
        await page.close();
    });

    test('Create event', async () => {
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
        eventEndDateTime = eventStartDateTime.add(30, 'minute');
        const eventEndTime = eventEndDateTime.format(moment.HTML5_FMT.TIME);
        const eventEndDate = eventEndDateTime.format('DD.MM.YYYY');

        await eventPage.eventStartTimeInput.fill(eventStartTime);
        await eventPage.eventStartDateInput.fill(eventStartDate);
        await expect(eventPage.eventEndTimeInput).toHaveValue(eventEndTime);
        await expect(eventPage.eventEndDateInput).toHaveValue(eventEndDate);

        // Step7
        await eventPage.eventLocationInput.click();
        await eventPage.eventLocationInput.type(input.location);
        await expect(eventPage.eventLocationInput).toHaveValue(input.location);

        // Step8
        expected.eventTitle = `${eventStartTime} - ${eventEndTime}\n${input.eventName}`;

        await eventPage.createEventButton.click();
        await expect(calendarPage.eventLocator).toBeVisible();
        await expect(calendarPage.eventLocator).toHaveAttribute('title', expected.eventTitle);
    });

    test('Add members', async () => {
        // Step1
        await calendarPage.eventLocator.click();
        await calendarPage.eventFormPreview.waitFor();
        await expect(calendarPage.eventFormPreviewTitle).toHaveText(input.eventName);

        // Step2
        await calendarPage.eventFormPreviewEditButton.click();
        await eventPage.header.waitFor();
        await expect(eventPage.header).toHaveText(expected.headerEditEvent);

        // Step3
        const makeAddMember = (member) => {
            return (async () => {
                await eventPage.eventMembersInput.type(member);
                await eventPage.eventMembersInput.press('Enter');
                return await eventPage.eventMemberSpan.waitFor();
            });
        };
        await promiseWaterfall(input.members.map(makeAddMember));
        await expect(eventPage.eventMemberSpan).toHaveText(input.members);

        // Step4
        await eventPage.saveEventButton.click();
        await expect(calendarPage.eventMeetupLocator).toBeVisible();
    });
});

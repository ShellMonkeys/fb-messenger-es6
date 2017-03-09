import test from 'tape';
import {
    MessengerProfile,
    GreetingText,
    TargetAudience,
    PersistentMenu,
    PostbackMenuItem,
} from '../../src/messengerProfile';

test('MessengerProfile - basic structure for add/update', (expect) => {
    let testProfile;
    const expectedStructure = {
        get_started: { payload: 'Get Started' },
        greeting: [
            { locale: 'default', text: 'Hello!' },
        ],
        whitelisted_domains: [
            'https://petersfancyapparel.com',
            'https://google.com',
        ],
        account_linking_url: 'https://www.example.com/oauth?response_type=code&client_id=1234567890&scope=basic',
        target_audience: {
            audience_type: 'all',
            countries: {},
        },
        persistent_menu: [
            {
                locale: 'default',
                composer_input_disabled: false,
                call_to_actions: [
                    {
                        title: 'Help',
                        type: 'postback',
                        payload: 'help',
                    },
                ],
            },
        ],
    };
    try {
        testProfile = new MessengerProfile()
            .setGetStartedButton('Get Started')
            .addGreetingText(new GreetingText('Hello!'))
            .addWhitelistedDomain('https://petersfancyapparel.com')
            .addWhitelistedDomain('https://google.com')
            .setAccountLinkingUrl('https://www.example.com/oauth?response_type=code&client_id=1234567890&scope=basic')
            .setTargetAudience(new TargetAudience('all'))
            .addPersistentMenu(new PersistentMenu([new PostbackMenuItem('Help', 'help')]));
        expect.same(testProfile, { state: expectedStructure }, 'should have bot\'s properties');
        expect.same(testProfile.toObject(), expectedStructure, 'should return structure in state');
    }
    catch (e) {
        expect.fail('should not throw any errors');
    }
    expect.end();
});

test('MessengerProfile - structure for fetch/delete', (expect) => {
    let testProfile;
    const fields = ['account_linking_url', 'persistent_menu', 'target_audience'];
    try {
        testProfile = new MessengerProfile().setFields(fields);
        expect.same(testProfile, { state: { fields: fields } }, 'should contains bot\'s properties');
        expect.same(testProfile.toObject(), { fields: fields }, 'should return structure in state');
    }
    catch (e) {
        expect.fail('should not throw any errors');
    }
    expect.end();
});

test('MessengerProfile - persistent menu without get started button', (expect) => {
    let testProfile;
    try {
        testProfile = new MessengerProfile().addPersistentMenu(new PersistentMenu([new PostbackMenuItem('Help', 'help')]));
        testProfile.toObject();
        expect.fail('should throw error');
    }
    catch (e) {
        expect.same(e.message, 'MessengerProfile.toObject: You must set a Get Started button if you also wish to use persistent menu', 'should throw error');
        expect.same(testProfile, { state: {
            persistent_menu: [
                {
                    locale: 'default',
                    composer_input_disabled: false,
                    call_to_actions: [
                        {
                            title: 'Help',
                            type: 'postback',
                            payload: 'help',
                        },
                    ],
                },
            ],
        } }, 'should still have object structure');
    }
    expect.end();
});

test('MessengerProfile - empty custom target audience', (expect) => {
    let testProfile;
    try {
        testProfile = new MessengerProfile().setTargetAudience(new TargetAudience('custom'));
        expect.fail('should throw error about empty target audience');
    }
    catch (e) {
        expect.same(e.message, 'MessengerProfile.setTargetAudience: If audience_type is custom, blacklist and whitelist can\'t both be null or empty. In addition, only one of them can be non-empty at the same time.', 'should throw error about empty target audience');
        expect.same(testProfile, undefined, 'should have no profile set');
    }
    expect.end();
});

test('MessengerProfile - check locale setting has default set', (expect) => {
    let testProfile;
    try {
        testProfile = new MessengerProfile().addGreetingText(new GreetingText('Hello', 'en_us'));
        testProfile.toObject();
        expect.fail('should throw validation error');
    }
    catch (e) {
        expect.same(e.message, 'MessengerProfile.toObject:  You must at least specify a greeting for the default locale', 'should throw validation error');
        expect.same(testProfile, { state: { greeting: [{ locale: 'en_us', text: 'Hello' }] } }, 'should still have object settings');
    }
    expect.end();
});

test('MessengerProfile - persistent menu validation', (expect) => {
    let testProfile;
    try {
        testProfile = new MessengerProfile();
        testProfile.addPersistentMenu(new PersistentMenu().disableUserInput(true));
        expect.fail('should throw validation error');
    }
    catch (e) {
        expect.same(e.message, 'PersistentMenu.disableUserInput: Either composer_input_disabled is false or call_to_actions must be set', 'should throw validation error');
        expect.same(testProfile, { state: {} }, 'should not have persistent menu set');
    }
    expect.end();
});

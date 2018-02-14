import test from 'tape';
import ProcessIncoming from '../../src/incomingMessage';

test('ProcessIncoming - Message', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: '1473208792799',
                messaging: [
                    // text message
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1458692752478,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1457764197618:41d102a3e1ae206a38',
                            text: 'hello, world!',
                            quick_reply: {
                                payload: 'DEVELOPER_DEFINED_PAYLOAD',
                            },
                        },
                    },
                    // message with image attachment
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1473208792799,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1458696618141:b4ef9d19ec21086067',
                            attachments: [
                                {
                                    type: 'image',
                                    payload: {
                                        url: 'IMAGE_URL',
                                    },
                                },
                            ],
                        },
                    },
                    // sticker
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1473204787206,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1458696618141:b4ef9d19ec21086067',
                            attachments: [
                                {
                                    type: 'image',
                                    payload: {
                                        sticker_id: 369239343222814,
                                    },
                                },
                            ],
                        },
                    },
                    // location
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1458692752478,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1458696618141:b4ef9d19ec21086067',
                            attachments: [
                                {
                                    type: 'location',
                                    payload: {
                                        coordinates: {
                                            lat: '43.761539',
                                            long: '-79.411079',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            // text message
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'message',
                text: 'hello, world!',
                quick_reply: 'DEVELOPER_DEFINED_PAYLOAD',
                isStandBy: false,
            },
            // message with image attachment
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1473208792799,
                type: 'message',
                attachments: [
                    {
                        type: 'image',
                        url: 'IMAGE_URL',
                    },
                ],
                isStandBy: false,
            },
            // sticker
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1473204787206,
                type: 'message',
                attachments: [
                    {
                        type: 'sticker',
                        sticker_id: 369239343222814,
                        sticker_type: 'LIKE',
                    },
                ],
                isStandBy: false,
            },
            // location
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'message',
                attachments: [
                    {
                        type: 'location',
                        long: '-79.411079',
                        lat: '43.761539',
                    },
                ],
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Message (Standby)', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: '1473208792799',
                standby: [
                    // text message
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1458692752478,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1457764197618:41d102a3e1ae206a38',
                            text: 'hello, world!',
                            quick_reply: {
                                payload: 'DEVELOPER_DEFINED_PAYLOAD',
                            },
                        },
                    },
                    // message with image attachment
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1473208792799,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1458696618141:b4ef9d19ec21086067',
                            attachments: [
                                {
                                    type: 'image',
                                    payload: {
                                        url: 'IMAGE_URL',
                                    },
                                },
                            ],
                        },
                    },
                    // sticker
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1473204787206,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1458696618141:b4ef9d19ec21086067',
                            attachments: [
                                {
                                    type: 'image',
                                    payload: {
                                        sticker_id: 369239343222814,
                                    },
                                },
                            ],
                        },
                    },
                    // location
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1458692752478,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1458696618141:b4ef9d19ec21086067',
                            attachments: [
                                {
                                    type: 'location',
                                    payload: {
                                        coordinates: {
                                            lat: '43.761539',
                                            long: '-79.411079',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            // text message
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'message',
                text: 'hello, world!',
                quick_reply: 'DEVELOPER_DEFINED_PAYLOAD',
                isStandBy: true,
            },
            // message with image attachment
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1473208792799,
                type: 'message',
                attachments: [
                    {
                        type: 'image',
                        url: 'IMAGE_URL',
                    },
                ],
                isStandBy: true,
            },
            // sticker
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1473204787206,
                type: 'message',
                attachments: [
                    {
                        type: 'sticker',
                        sticker_id: 369239343222814,
                        sticker_type: 'LIKE',
                    },
                ],
                isStandBy: true,
            },
            // location
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'message',
                attachments: [
                    {
                        type: 'location',
                        long: '-79.411079',
                        lat: '43.761539',
                    },
                ],
                isStandBy: true,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Message (custom sticker map)', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: '1473208792799',
                messaging: [
                    {
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        timestamp: 1473204787206,
                        sender: {
                            id: 'USER_ID',
                        },
                        message: {
                            mid: 'mid.1458696618141:b4ef9d19ec21086067',
                            attachments: [
                                {
                                    type: 'image',
                                    payload: {
                                        sticker_id: 369239343222814,
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    }, { 369239343222814: 'LOVE' }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1473204787206,
                type: 'message',
                attachments: [
                    {
                        type: 'sticker',
                        sticker_id: 369239343222814,
                        sticker_type: 'LOVE',
                    },
                ],
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Message Delivered', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1473208792799,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        delivery: {
                            mids: [
                                'mid.1458668856218:ed81099e15d3f4f233',
                            ],
                            watermark: 1458668856253,
                            seq: 37,
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'message_delivery',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Message Read', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458668856463,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458668856463,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        read: {
                            watermark: 1458668856253,
                            seq: 38,
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458668856463,
                type: 'message_read',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Message Echo', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1457764197627,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1457764197627,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        message: {
                            is_echo: true,
                            app_id: 1517776481860111,
                            metadata: 'DEVELOPER_DEFINED_METADATA_STRING',
                            mid: 'mid.1457764197618:41d102a3e1ae206a38',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1457764197627,
                type: 'message_echo',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Postback', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        postback: {
                            payload: 'USER_DEFINED_PAYLOAD',
                            referral: {
                                ref: 'USER_DEFINED_REFERRAL_PARAM',
                                source: 'SHORTLINK',
                                type: 'OPEN_THREAD',
                            },
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'postback',
                payload: 'USER_DEFINED_PAYLOAD',
                ref: 'USER_DEFINED_REFERRAL_PARAM',
                source: 'SHORTLINK',
                referral_type: 'OPEN_THREAD',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});


test('ProcessIncoming - Postback w/ ad referral', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        postback: {
                            payload: 'USER_DEFINED_PAYLOAD',
                            referral: {
                                ref: 'USER_DEFINED_REFERRAL_PARAM',
                                source: 'ADS',
                                type: 'OPEN_THREAD',
                                ad_id: 'AD_ID',
                            },
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'postback',
                payload: 'USER_DEFINED_PAYLOAD',
                ref: 'USER_DEFINED_REFERRAL_PARAM',
                source: 'ADS',
                referral_type: 'OPEN_THREAD',
                ad_id: 'AD_ID',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Account Linking Event', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        account_linking: {
                            status: 'linked',
                            authorization_code: 'PASS_THROUGH_AUTHORIZATION_CODE',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'account_linking',
                status: 'linked',
                authorization_code: 'PASS_THROUGH_AUTHORIZATION_CODE',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Referral m.me', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        referral: {
                            ref: 'ref-data',
                            source: 'SHORTLINK',
                            type: 'OPEN_THREAD',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'referral',
                ref: 'ref-data',
                referral_type: 'OPEN_THREAD',
                source: 'SHORTLINK',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Referral - ad', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        referral: {
                            ref: 'ref-data',
                            source: 'ADS',
                            ad_id: 'ad-id',
                            type: 'OPEN_THREAD',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'referral',
                ref: 'ref-data',
                ad_id: 'ad-id',
                referral_type: 'OPEN_THREAD',
                source: 'ADS',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Referral - parametric code', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        referral: {
                            ref: 'ref-data',
                            source: 'MESSENGER_CODE',
                            type: 'OPEN_THREAD',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'referral',
                ref: 'ref-data',
                referral_type: 'OPEN_THREAD',
                source: 'MESSENGER_CODE',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Referral - discover tab', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        referral: {
                            source: 'DISCOVER_TAB',
                            type: 'OPEN_THREAD',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'referral',
                referral_type: 'OPEN_THREAD',
                source: 'DISCOVER_TAB',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});

test('ProcessIncoming - Pass Thread Control', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        pass_thread_control: {
                            new_owner_app_id: 'APP_ID',
                            metadata: 'META_DATA',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'pass_thread_control',
                app_id: 'APP_ID',
                meta: 'META_DATA',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});


test('ProcessIncoming - Take Thread Control', (expect) => {
    expect.same(ProcessIncoming({
        object: 'page',
        entry: [
            {
                id: 'PAGE_ID',
                time: 1458692752478,
                messaging: [
                    {
                        sender: {
                            id: 'USER_ID',
                        },
                        timestamp: 1458692752478,
                        recipient: {
                            id: 'PAGE_ID',
                        },
                        take_thread_control: {
                            previous_owner_app_id: 'APP_ID',
                            metadata: 'META_DATA',
                        },
                    },
                ],
            },
        ],
    }), {
        PAGE_ID: [
            {
                sender: 'USER_ID',
                recipient: 'PAGE_ID',
                timestamp: 1458692752478,
                type: 'take_thread_control',
                app_id: 'APP_ID',
                meta: 'META_DATA',
                isStandBy: false,
            },
        ],
    }, 'should return correct normalized entries');
    expect.end();
});


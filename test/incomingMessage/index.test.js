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
            },
        ],
    }, 'should return corect normalized entries');
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
            },
        ],
    }, 'should return corect normalized entries');
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
            },
        ],
    }, 'should return corect normalized entries');
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
            },
        ],
    }, 'should return corect normalized entries');
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
            },
        ],
    }, 'should return corect normalized entries');
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
            },
        ],
    }, 'should return corect normalized entries');
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
            },
        ],
    }, 'should return corect normalized entries');
    expect.end();
});

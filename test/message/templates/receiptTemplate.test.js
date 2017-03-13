import test from 'tape';
import {
    ReceiptTemplate,
    ReceiptElement,
    ReceiptSummary,
} from '../../../src/message';

test('ReceiptTemplate', (expect) => {
    const testTemplate = new ReceiptTemplate('Stephane Crozatier', '12345678902', 'USD', 'Visa 2345', new ReceiptSummary(75.00, 4.95, 6.19, 56.14))
        .setMerchantName('Peter\'s Apparel')
        .setOrderUrl('http://petersapparel.parseapp.com/order?order_id=123456')
        .setTimestamp('1428444852')
        .addElement(new ReceiptElement('Classic White T-Shirt', 50)
            .setSubTitle('100% Soft and Luxurious Cotton')
            .setQuantity(2)
            .setCurrency('USD')
            .setImageUrl('http://petersapparel.parseapp.com/img/whiteshirt.png'))
        .addElement(new ReceiptElement('Classic Gray T-Shirt', 25)
            .setSubTitle('100% Soft and Luxurious Cotton')
            .setQuantity(1)
            .setCurrency('USD')
            .setImageUrl('http://petersapparel.parseapp.com/img/grayshirt.png'))
        .setAddress('US', 'CA', '94025', 'Menlo Park', '1 Hacker Way')
        .addAdjustment('New Customer Discount', 20)
        .addAdjustment('$10 Off Coupon', 10);
        expect.same(testTemplate, {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'receipt',
                    recipient_name: 'Stephane Crozatier',
                    merchant_name: 'Peter\'s Apparel',
                    order_number: '12345678902',
                    currency: 'USD',
                    payment_method: 'Visa 2345',
                    order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
                    timestamp: '1428444852',
                    elements: [{
                            title: 'Classic White T-Shirt',
                            subtitle: '100% Soft and Luxurious Cotton',
                            quantity: 2,
                            price: 50,
                            currency: 'USD',
                            image_url: 'http://petersapparel.parseapp.com/img/whiteshirt.png',
                        },
                        {
                            title: 'Classic Gray T-Shirt',
                            subtitle: '100% Soft and Luxurious Cotton',
                            quantity: 1,
                            price: 25,
                            currency: 'USD',
                            image_url: 'http://petersapparel.parseapp.com/img/grayshirt.png',
                        },
                    ],
                    address: {
                        street_1: '1 Hacker Way',
                        street_2: '',
                        city: 'Menlo Park',
                        postal_code: '94025',
                        state: 'CA',
                        country: 'US',
                    },
                    summary: {
                        subtotal: 75.00,
                        shipping_cost: 4.95,
                        total_tax: 6.19,
                        total_cost: 56.14,
                    },
                    adjustments: [{
                            name: 'New Customer Discount',
                            amount: 20,
                        },
                        {
                            name: '$10 Off Coupon',
                            amount: 10,
                        },
                    ],
                },
            },
        }, 'should have the correct structure'); expect.end();
});

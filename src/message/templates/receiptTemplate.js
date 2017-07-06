import validate from '../../util/validate';
import Template from './template';
import { ReceiptElement } from '../element';

export class Summary {
    constructor(subtotal, shippingCost, totalTax, totalCost) {
        this.setSubtotal(subtotal);
        this.setShippingCost(shippingCost);
        this.setTotalTax(totalTax);
        this.setTotalCost(totalCost);
    }

    setSubtotal(subtotal) {
        validate.isNumber(subtotal, 'subtotal', 'ReceiptTemplate.Summary');
        this.subtotal = subtotal;
        return this;
    }

    setShippingCost(cost) {
        validate.isNumber(cost, 'shipping_cost', 'ReceiptTemplate.Summary');
        this.shipping_cost = cost;
        return this;
    }

    setTotalTax(tax) {
        validate.isNumber(tax, 'total_tax', 'ReceiptTemplate.Summary');
        this.total_tax = tax;
        return this;
    }

    setTotalCost(cost) {
        validate.isNumber(cost, 'total_cost', 'ReceiptTemplate.Summary');
        this.total_cost = cost;
        return this;
    }
}

const MAX = 100;

export default class ReceiptTemplate extends Template {
    constructor(recipientName, orderNumber, currency, paymentMethod, summary) {
        super('receipt');
        this.setRecipientName(recipientName);
        this.setOrderNumber(orderNumber);
        this.setCurrency(currency);
        this.setPaymentMethod(paymentMethod);
        this.setSummary(summary);
        return this;
    }

    setRecipientName(name) {
        validate.isString(name, 'recipient_name', 'ReceiptTemplate.setRecipientName');
        this.state.attachment.payload.recipient_name = name;
        return this;
    }

    setMerchantName(name) {
        validate.isString(name, 'merchant_name', 'ReceiptTemplate.setMerchantName');
        this.state.attachment.payload.merchant_name = name;
        return this;
    }

    setOrderNumber(number) {
        validate.isString(number, 'order_number', 'ReceiptTemplate.setOrderNumber');
        this.state.attachment.payload.order_number = number;
        return this;
    }

    setCurrency(currency) {
        validate.isString(currency, 'currency', 'ReceiptTemplate.setCurrency');
        this.state.attachment.payload.currency = currency;
        return this;
    }

    setPaymentMethod(method) {
        validate.isString(method, 'payment_method', 'ReceiptTemplate.setPaymentMethod');
        this.state.attachment.payload.payment_method = method;
        return this;
    }

    setTimestamp(timestamp) {
        validate.isString(timestamp, 'timestamp', 'ReceiptTemplate.setTimestamp');
        this.state.attachment.payload.timestamp = timestamp;
        return this;
    }

    setOrderUrl(url) {
        validate.url(url, 'ReceiptElement.setOrderUrl');
        this.state.attachment.payload.order_url = url;
        return this;
    }

    validateElements(elements, max = MAX) {
        validate.arrayLength(elements, 0, max, 'elements', 'ReceiptTemplate.validateElements');
        for (const element of elements) {
            this.validateElement(element);
        }
        return this;
    }

    validateElement(element) {
        validate.oneOf(element.constructor.name, ReceiptElement.name, 'element.type', 'ReceiptTemplate.validateElement');
        return this;
    }

    addElement(element) {
        this.validateElement(element);
        if (validate.null(this.state.attachment.payload.elements)) {
            this.state.attachment.payload.elements = [];
        }
        else {
            this.validateElements(this.state.attachment.payload.elements, MAX - 1);
        }
        this.state.attachment.payload.elements.push(element);
        return this;
    }

    setAddress(country, state, postalCode, city, street1, street2 = '') {
        this.state.attachment.payload.address = {
            street_1: street1,
            street_2: street2,
            city: city,
            postal_code: postalCode,
            state: state,
            country: country,
        };
        validate.required(this.state.attachment.payload.address, ['street_1', 'city', 'postal_code', 'state', 'country'], 'ReceiptTemplate.setAddress');
        return this;
    }

    setSummary(summary) {
        validate.oneOf(summary.constructor.name, Summary.name, 'summary', 'ReceiptTemplate.setSummary');
        this.state.attachment.payload.summary = summary;
    }

    addAdjustment(name, amount) {
        validate.isString(name, 'adjustment.name', 'ReceiptTemplate.addAdjustment');
        validate.isNumber(amount, 'adjustment.amount', 'ReceiptTemplate.addAdjustment');
        if (validate.null(this.state.attachment.payload.adjustments)) {
            this.state.attachment.payload.adjustments = [];
        }
        this.state.attachment.payload.adjustments.push({
            name: name,
            amount: amount,
        });
        return this;
    }
}

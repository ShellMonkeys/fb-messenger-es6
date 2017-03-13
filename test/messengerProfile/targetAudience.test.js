import test from 'tape';
import TargetAudience from '../../src/messengerProfile/targetAudience';

test('TargetAudience.constructor - valid audience type', (expect) => {
    let testAudience;
    try {
        testAudience = new TargetAudience('all');
        expect.same(testAudience, { audience_type: 'all', countries: {} }, 'should have audience type');
    }
    catch (e) {
        expect.fail('should not throw error');
    }
    expect.end();
});

test('TargetAudience.constructor - invalid audience type', (expect) => {
    let testAudience;
    try {
        testAudience = new TargetAudience('random');
        expect.fail('should throw error');
    }
    catch (e) {
        expect.same(testAudience, undefined, 'should not set audience');
    }
    expect.end();
});

test('TargetAudience.addWhitelistedCountry', (expect) => {
    let testAudience;
    try {
        testAudience = new TargetAudience('custom');
        testAudience.addWhitelistedCountry('AB').addWhitelistedCountry('BC');
        expect.same(testAudience.countries.whitelist, ['AB', 'BC'], 'should have set whitelist contries');
    }
    catch (e) {
        expect.fail('should not throw validation error');
    }
    expect.end();
});

test('TargetAudience.addWhitelistedCountry - validation failed', (expect) => {
    let testAudience;
    try {
        testAudience = new TargetAudience('none');
        testAudience.addWhitelistedCountry('AB');
            expect.fail('should not throw validation error');
    }
    catch (e) {
        expect.same(testAudience, { audience_type: 'none', countries: {} }, 'should set audience');
    }
    expect.end();
});

test('TargetAudience.setWhitelistedCountries', (expect) => {
    let testAudience;
    const customAudience = ['AB'];
    try {
        testAudience = new TargetAudience('custom');
        testAudience.setWhitelistedCountries(customAudience);
        expect.same(testAudience.countries.whitelist, customAudience, 'should have custom whitelist countries');
    }
    catch (e) {
        expect.fail('should not throw any validation errors');
    }
    expect.end();
});

test('TargetAudience.addBlacklistedCountry', (expect) => {
    let testAudience;
    try {
        testAudience = new TargetAudience('custom');
        testAudience.addBlacklistedCountry('AB').addBlacklistedCountry('BC');
        expect.same(testAudience.countries.blacklist, ['AB', 'BC'], 'should have set blacklist contries');
    }
    catch (e) {
        expect.fail('should not throw validation error');
    }
    expect.end();
});

test('TargetAudience.addBlacklistedCountry - validation failed', (expect) => {
    let testAudience;
    try {
        testAudience = new TargetAudience('custom');
        testAudience.addBlacklistedCountry('Canada');
            expect.fail('should not throw validation error');
    }
    catch (e) {
        expect.same(testAudience, { audience_type: 'custom', countries: {} }, 'should set audience');
    }
    expect.end();
});

test('TargetAudience.setBlacklistedCountries', (expect) => {
    let testAudience;
    const customAudience = ['AB'];
    try {
        testAudience = new TargetAudience('custom');
        testAudience.setBlacklistedCountries(customAudience);
        expect.same(testAudience.countries.blacklist, customAudience, 'should have custom blacklist countries');
    }
    catch (e) {
        expect.fail('should not throw any validation errors');
    }
    expect.end();
});

test('TargetAudience - valid audience type, whitelisted countries & blacklisted countries', (expect) => {
    let testAudience;
    try {
        testAudience = new TargetAudience('custom').addWhitelistedCountry('YZ').addBlacklistedCountry('XY');
        expect.same(testAudience, { audience_type: 'custom', countries: { whitelist: ['YZ'], blacklist: ['XY'] } }, 'should have audience type');
    }
    catch (e) {
        expect.fail('should not throw error');
    }
    expect.end();
});

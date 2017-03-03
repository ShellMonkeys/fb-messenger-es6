import validate from '../util/validate';

export default class TargetAudience {
    constructor(type) {
        this.target_audience = {};
        this.setType(type);
        return this;
    }

    setType(type) {
        validate.oneOf(type, ['all', 'custom', 'none'], 'audience_type', 'TargetAudience.setType');
        this.target_audience.audience_type = type;
        return this;
    }

    validateTypeWithCountries(countries) {
        if (this.target_audience.audience_type !== 'custom') {
            throw new Error('TargetAudience.validateTypeForCountries: countries needs to be specified only when audience_type is custom');
        }
        if (validate.isNull(this.countries)) {
            this.countries = {};
        }
        validate.isArray(countries, 'countries', 'TargetAudience.validateTypeWithCountries');
        for (const country of countries) {
            validate.stringLength(country, 2, 2, 'country', 'TargetAudience.validateTypeWithCountries', true);
        }
        return this;
    }

    addWhitelistedCountry(country) {
        this.validateTypeWithCountries([country]);
        if (validate.isNull(this.countries.whitelist)) {
            this.countries.whitelist = [];
        }
        this.countries.whitelist.push(country);
    }

    setWhitelistedCountries(whitelist) {
        this.validateTypeWithCountries(whitelist);
        this.countries.whitelist = whitelist;
    }

    addBlacklistedCountry(country) {
        this.validateTypeWithCountries([country]);
        if (validate.isNull(this.countries.blacklist)) {
            this.countries.blacklist = [];
        }
        this.countries.blacklist.push(country);
    }

    setBlacklistedCountries(blacklist) {
        this.validateTypeWithCountries(blacklist);
        this.countries.blacklist = blacklist;
    }
}

import validate from '../util/validate';

export default class TargetAudience {
    constructor(type) {
        this.setType(type);
        this.countries = {};
        return this;
    }

    setType(type) {
        validate.oneOf(type, ['all', 'custom', 'none'], 'audience_type', 'TargetAudience.setType');
        this.audience_type = type;
        return this;
    }

    validateTypeWithCountries(countries) {
        if (this.audience_type !== 'custom') {
            throw new Error('TargetAudience.validateTypeForCountries: countries needs to be specified only when audience_type is custom');
        }
        validate.isArray(countries, 'countries', 'TargetAudience.validateTypeWithCountries');
        for (const country of countries) {
            validate.stringLength(country, 2, 2, 'country', 'TargetAudience.validateTypeWithCountries', true);
        }
        return this;
    }

    addWhitelistedCountry(country) {
        this.validateTypeWithCountries([country]);
        if (validate.null(this.countries.whitelist)) {
            this.countries.whitelist = [];
        }
        this.countries.whitelist.push(country);
        return this;
    }

    setWhitelistedCountries(whitelist) {
        this.validateTypeWithCountries(whitelist);
        this.countries.whitelist = whitelist;
        return this;
    }

    addBlacklistedCountry(country) {
        this.validateTypeWithCountries([country]);
        if (validate.null(this.countries.blacklist)) {
            this.countries.blacklist = [];
        }
        this.countries.blacklist.push(country);
        return this;
    }

    setBlacklistedCountries(blacklist) {
        this.validateTypeWithCountries(blacklist);
        this.countries.blacklist = blacklist;
        return this;
    }
}

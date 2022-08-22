module.exports = {
    params: {
        url: 'https://synthetics-ecommerce-demo-mfa.vercel.app',
    },
    playwrightOptions: {
        ignoreHTTPSErrors: false,
    },
    /**
     * Configure global monitor settings
     */
    monitor: {
        schedule: 10,
        locations: ['us_central'],
    },
};

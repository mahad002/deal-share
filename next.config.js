/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                dns: false,
                fs: false,
                tls: false,
            };
        }

        return config;
    },
};

import { NextConfig } from 'next';
import { getConfig } from './src/app/util/configReader';
import NextBundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig: NextConfig = {
  async redirects() {
    try {
      const config = getConfig('redirects.yml');
      return config.redirects.map(redirect => {
        return {
          source: redirect.source,
          destination: redirect.destination,
          permanent: true,
        };
      });
    } catch (e) {
      console.error(
        `Unable to parse redirects.yml; ensure the file exists and is formatted properly. Error: ${e}`
      );
      return [];
    }
  },
};
export default withBundleAnalyzer(nextConfig);

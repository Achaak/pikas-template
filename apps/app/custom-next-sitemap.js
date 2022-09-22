/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: '',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};

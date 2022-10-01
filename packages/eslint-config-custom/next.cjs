module.exports = {
	extends: [require.resolve("./react.cjs"), "next/core-web-vitals"],
	rules: {
		"@next/next/no-html-link-for-pages": "off",
		"react/jsx-key": "off",
  },
};

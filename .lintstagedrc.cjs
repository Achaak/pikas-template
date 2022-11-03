const prettierCmd = "prettier --list-different --write --config ./.prettierrc.cjs"
const eslintCmd = "eslint --fix -c ./.eslintrc.cjs"

module.exports = {
	"*.(ts|tsx)": [prettierCmd, eslintCmd],
	"*.json": [prettierCmd, eslintCmd],
	"*.md": prettierCmd
}

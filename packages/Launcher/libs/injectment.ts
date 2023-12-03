import * as glob from 'glob';
import * as fs from 'node:fs';

function replace(content: string, pattern: string | RegExp, target: string): string {
	return content.replace(new RegExp(pattern, 'gm'), target);
}

const SOURCE_GLOB_PATTERN = '**/*.{tsx,ts,jsx,js,astro,svelte}';
const LIBS_DB_PATTERN = /\$libs\/db/;
const LIBS_DB_REPLACEMENT = 'to-path/db';

async function main() {
	const files = glob.sync(SOURCE_GLOB_PATTERN, { nodir: true });
	files.map(function mapFileToInject(file) {
		const content = fs.readFileSync(file, 'utf-8');
		const injected = replace(content, LIBS_DB_PATTERN, LIBS_DB_REPLACEMENT);
		fs.writeFileSync(file, injected, 'utf-8');
	});
}

main().catch(function exception(error: unknown) {
	console.error(error);
});

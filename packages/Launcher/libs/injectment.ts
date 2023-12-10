import glob from 'npm:glob';

interface Injectable {
	inject(content: string): string;
}

abstract class BaseInjector implements Injectable {
	protected abstract _pattern: RegExp;
	protected abstract _injectment: string;
	public inject(content: string): string {
		return content.replace(this._pattern, this._injectment);
	}
}

class DatabaseInjector extends BaseInjector {
	protected _pattern = /\$libs\/db/gm;
	protected _injectment = 'real-path-to/db';
}

const SOURCE_GLOB_PATTERN = '**/*.{tsx,ts,jsx,js,astro,svelte}';

async function main() {
	const files = glob.sync(SOURCE_GLOB_PATTERN, { nodir: true });
	const dbInjector = new DatabaseInjector();

	await Promise.all(
		files.map(async function mapFileToInject(file: string) {
			const content = await Deno.readTextFile(file);
			const injected = dbInjector.inject(content);
			await Deno.writeTextFile(file, injected);
		}),
	);
}

main().catch(function exception(error: unknown) {
	console.error(error);
});

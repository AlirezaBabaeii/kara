/// <reference types="vitest" />
import * as path from 'node:path'
import { getViteConfig } from 'astro/config'
// import { defineConfig } from 'vitest/config';

export default getViteConfig({
	test: {
		/* for example, use global to avoid globals imports (describe, test, expect): */
		// globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html']
		}
	},
	resolve: {
		alias: {
			$pkg: path.resolve(__dirname, './packages')
		}
	}
})

import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

function copyFilesByExtension(srcDir: string, destDir: string, extensions: string[]) {
  if (!existsSync(srcDir)) return;

  const entries = readdirSync(srcDir);

  for (const entry of entries) {
    const srcPath = join(srcDir, entry);
    const destPath = join(destDir, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      copyFilesByExtension(srcPath, destPath, extensions);
    } else {
      if (extensions.some(ext => entry.endsWith(ext))) {
        mkdirSync(dirname(destPath), { recursive: true });
        copyFileSync(srcPath, destPath);
        console.log(`Copied asset: ${srcPath} -> ${destPath}`);
      }
    }
  }
}

// Copy SVG, PNG, and JSON metadata from nodes and credentials
copyFilesByExtension(join(process.cwd(), 'nodes'), join(process.cwd(), 'dist/nodes'), ['.svg', '.png', '.json']);
copyFilesByExtension(join(process.cwd(), 'credentials'), join(process.cwd(), 'dist/credentials'), ['.svg', '.png', '.json']);
console.log('Asset copy complete!');

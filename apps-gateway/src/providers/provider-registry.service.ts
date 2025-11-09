import { Injectable } from '@nestjs/common';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

@Injectable()
export class ProviderRegistryService {
  private specs = new Map<string, any>();

  constructor() {
    // Try dist path first (when running compiled code), then src path (dev)
    const candidates = [
      join(__dirname, 'specs'), // e.g. dist/src/providers/specs
      join(process.cwd(), 'src', 'providers', 'specs'), // e.g. src/providers/specs
    ];

    const dir = candidates.find((d) => existsSync(d));
    if (!dir) {
      throw new Error(
        `Provider specs folder not found. Looked in:\n` +
          candidates.map((c) => ' - ' + c).join('\n'),
      );
    }

    for (const f of readdirSync(dir)) {
      if (f.endsWith('.yaml') || f.endsWith('.yml')) {
        const spec = YAML.parse(readFileSync(join(dir, f), 'utf8'));
        if (!spec?.id) throw new Error(`Spec ${f} missing 'id'`);
        this.specs.set(spec.id, spec);
      }
    }
  }

  get(id: string) {
    const s = this.specs.get(id);
    if (!s) throw new Error('Unknown provider: ' + id);
    return s;
  }
}

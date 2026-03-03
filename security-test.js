/**
 * LinkSnap Security Audit Script
 * Tests critical security features and configurations
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;
let warnings = 0;

function test(name, condition, severity = 'error') {
  if (condition) {
    console.log(`${GREEN}✓${RESET} ${name}`);
    passed++;
  } else {
    if (severity === 'error') {
      console.log(`${RED}✗${RESET} ${name}`);
      failed++;
    } else {
      console.log(`${YELLOW}⚠${RESET} ${name}`);
      warnings++;
    }
  }
}

console.log(`\n${BLUE}═══════════════════════════════════════════${RESET}`);
console.log(`${BLUE}   LinkSnap Security Audit${RESET}`);
console.log(`${BLUE}═══════════════════════════════════════════${RESET}\n`);

// 1. Environment Configuration Tests
console.log(`${BLUE}[1] Environment Configuration${RESET}`);

const envLocalExists = existsSync('.env.local');
test('No .env.local committed to git (checking for existence)', !envLocalExists, 'warning');

const envExampleExists = existsSync('.env.local.example');
test('.env.local.example template exists', envExampleExists);

try {
  const gitignore = readFileSync('.gitignore', 'utf-8');
  test('.env.local in .gitignore', gitignore.includes('.env.local'));
  test('.env in .gitignore', gitignore.includes('.env'));
} catch (e) {
  test('.gitignore exists and is readable', false);
}

// 2. Source Code Security Tests
console.log(`\n${BLUE}[2] Source Code Security${RESET}`);

const apiKeyServiceExists = existsSync('services/apiKeyService.ts');
test('apiKeyService.ts exists', apiKeyServiceExists);

const storageServiceExists = existsSync('services/storageService.ts');
test('storageService.ts exists', storageServiceExists);

const geminiServiceExists = existsSync('services/geminiService.ts');
test('geminiService.ts exists', geminiServiceExists);

// Check for hardcoded API keys
const filesToCheck = [
  'App.tsx',
  'services/geminiService.ts',
  'services/apiKeyService.ts',
  'api/analyze.ts',
];

filesToCheck.forEach(file => {
  if (existsSync(file)) {
    const content = readFileSync(file, 'utf-8');
    const hasHardcodedKey = /['"]AI[a-zA-Z0-9_-]{35,}['"]/.test(content);
    test(`${file}: No hardcoded API keys`, !hasHardcodedKey);
    
    const hasProcessEnv = content.includes('process.env') && !file.includes('apiKeyService');
    test(`${file}: No direct process.env usage`, !hasProcessEnv, 'warning');
  }
});

// 3. API Endpoint Security
console.log(`\n${BLUE}[3] API Endpoint Security${RESET}`);

if (existsSync('api/analyze.ts')) {
  const analyzeContent = readFileSync('api/analyze.ts', 'utf-8');
  test('analyze.ts: Has API key validation', analyzeContent.includes('apiKey'));
  test('analyze.ts: Has method check (POST only)', analyzeContent.includes("method !== 'POST'"));
  test('analyze.ts: Has input sanitization', analyzeContent.includes('sanitize'));
  test('analyze.ts: Has error handling', analyzeContent.includes('try') && analyzeContent.includes('catch'));
}

// 4. Package Security
console.log(`\n${BLUE}[4] Package Configuration${RESET}`);

try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  test('package.json exists and is valid', true);
  test('Project is marked as private', packageJson.private === true);
  test('Has required dependencies', 
    packageJson.dependencies?.['@google/generative-ai'] && 
    packageJson.dependencies?.['react']);
} catch (e) {
  test('package.json exists and is valid', false);
}

// 5. Build Configuration
console.log(`\n${BLUE}[5] Build Configuration${RESET}`);

try {
  const viteConfig = readFileSync('vite.config.ts', 'utf-8');
  test('vite.config.ts exists', true);
  test('Has environment variable handling', viteConfig.includes('VITE_') || viteConfig.includes('env'));
} catch (e) {
  test('vite.config.ts exists', false);
}

// 6. TypeScript Configuration
console.log(`\n${BLUE}[6] TypeScript Configuration${RESET}`);

try {
  const tsconfig = JSON.parse(readFileSync('tsconfig.json', 'utf-8'));
  test('tsconfig.json exists and is valid', true);
  test('Strict mode enabled', tsconfig.compilerOptions?.strict === true, 'warning');
} catch (e) {
  test('tsconfig.json exists', false);
}

// 7. Security Documentation
console.log(`\n${BLUE}[7] Security Documentation${RESET}`);

const securityDocs = [
  'SECURITY.md',
  'SECURITY_AUDIT.md',
  'GEMINI_3_MIGRATION.md',
  'README.md'
];

securityDocs.forEach(doc => {
  test(`${doc} exists`, existsSync(doc));
});

// 8. Vercel Configuration
console.log(`\n${BLUE}[8] Deployment Configuration${RESET}`);

const vercelJsonExists = existsSync('vercel.json');
test('vercel.json exists', vercelJsonExists);

if (vercelJsonExists) {
  try {
    const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf-8'));
    test('Has API routes or security headers configured', 
      vercelConfig.rewrites || vercelConfig.routes || vercelConfig.headers);
  } catch (e) {
    test('vercel.json is valid JSON', false);
  }
}

// Summary
console.log(`\n${BLUE}═══════════════════════════════════════════${RESET}`);
console.log(`${BLUE}   Security Audit Summary${RESET}`);
console.log(`${BLUE}═══════════════════════════════════════════${RESET}\n`);

console.log(`${GREEN}Passed:${RESET}   ${passed}`);
console.log(`${RED}Failed:${RESET}   ${failed}`);
console.log(`${YELLOW}Warnings:${RESET} ${warnings}`);

const total = passed + failed + warnings;
const score = ((passed / total) * 100).toFixed(1);

console.log(`\n${BLUE}Security Score: ${score}%${RESET}`);

if (failed === 0 && warnings === 0) {
  console.log(`\n${GREEN}✓ All security checks passed!${RESET}\n`);
  process.exit(0);
} else if (failed === 0) {
  console.log(`\n${YELLOW}⚠ Passed with warnings. Review items above.${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${RED}✗ Security issues detected. Please fix failed items.${RESET}\n`);
  process.exit(1);
}

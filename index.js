
const express = require('express');
const bodyParser = require('body-parser');
const vm = require('vm');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '200kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// A tiny transpiler: maps Bangla keywords (and a few variants) -> JavaScript
const KEYWORD_MAP = [
  [ /\bধরি\b/g, 'let' ],              // variable
  [ /\bধ্রুবক\g,\b/g, 'const' ],         // const
  [ /\bদেখাও\b/g, 'console.log' ],  // print
  [ /\bযদি\b/g, 'if' ],               // if
  [ /\bনাহলে\b/g, 'else' ],          // else
  [ /\bযতক্ষণ/g\b/g, 'while' ],          // while
  [ /\লুপ\b/g, 'for' ],           // for (very rough)
  [ /\bফাংশন\b/g, 'function' ],      // function
  [ /\bফেরত\b/g, 'return' ],         // return
  [ /\b&&\b/g, '&&' ],                // keep logicals
  [ /\b\|\|\b/g, '||' ],
  // numeric literals and operators remain the same
];

function transpileBanglaToJS(src) {
  let out = src;
  // Simple replacements
  KEYWORD_MAP.forEach(([re, repl]) => {
    out = out.replace(re, repl);
  });

  // Replace Bangla digits with ASCII digits (optional) — support ০-৯
  const banglaDigits = '০১২৩৪৫৬৭৮৯';
  for (let i = 0; i < 10; i++) {
    out = out.replace(new RegExp(banglaDigits[i], 'g'), String(i));
  }

  // A couple of convenience conversions for common patterns
  // e.g., "প্রিন্ট('হাই')" should already work after replacement -> console.log('হাই')

  return out;
}

// Run code in a sandboxed context and capture console.log outputs
function runInSandbox(jsCode, { timeout = 1000 } = {}) {
  const outputs = [];

  const sandboxConsole = {
    log: (...args) => {
      // stringify safely
      try {
        outputs.push(args.map(a => {
          if (typeof a === 'object') return JSON.stringify(a);
          return String(a);
        }).join(' '));
      } catch (e) {
        outputs.push(String(args));
      }
    }
  };

  const sandbox = { console: sandboxConsole, module: {}, exports: {}, require: undefined };
  const context = vm.createContext(sandbox);

  try {
    const script = new vm.Script(jsCode, { filename: 'user-code.js' });
    script.runInContext(context, { timeout });
    return { ok: true, stdout: outputs.join('\n') };
  } catch (err) {
    return { ok: false, error: String(err), stdout: outputs.join('\n') };
  }
}

// Simple step-by-step runner: split by line and run each cumulative prefix
function stepByStep(jsCode, { timeoutPerStep = 500 } = {}) {
  const lines = jsCode.split(/\r?\n/);
  const steps = [];
  let cumulative = '';

  // We'll execute cumulative code up to each line to mimic step execution
  for (let i = 0; i < lines.length; i++) {
    cumulative += lines[i] + '\n';
    const res = runInSandbox(cumulative, { timeout: timeoutPerStep });
    steps.push({ line: i + 1, code: lines[i], result: res });
    if (!res.ok) break; // stop on error
  }
  return steps;
}

// API: run whole program (transpile then run)
app.post('/api/run', (req, res) => {
  const { source = '', timeout = 1000 } = req.body;
  if (typeof source !== 'string') return res.status(400).json({ error: 'source must be string' });

  const transpiled = transpileBanglaToJS(source);
  const result = runInSandbox(transpiled, { timeout });

  return res.json({ transpiled, ...result });
});

// API: step-by-step execution
app.post('/api/step', (req, res) => {
  const { source = '', timeoutPerStep = 500 } = req.body;
  if (typeof source !== 'string') return res.status(400).json({ error: 'source must be string' });

  const transpiled = transpileBanglaToJS(source);
  const steps = stepByStep(transpiled, { timeoutPerStep });
  return res.json({ transpiled, steps });
});

// Simple index to show a minimal demo UI if ./public/index.html exists
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Bangla Code Runner demo listening on http://localhost:${PORT}`);
});


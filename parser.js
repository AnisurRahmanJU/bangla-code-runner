function banglaToJS(code) {
  return code
    // চলক ও ধ্রুবক
    .replace(/ধরি/g, 'var')
    .replace(/চলক/g, 'let')
    .replace(/ধ্রুবক/g, 'const')


    // শর্ত ও লজিক
    .replace(/যদি/g, 'if')
    .replace(/নাহলে যদি/g, 'else if')
    .replace(/নাহলে/g, 'else')
    .replace(/সত্য/g, 'true')
    .replace(/মিথ্যা/g, 'false')
    .replace(/এবং/g, '&&')
    .replace(/অথবা/g, '||')
    .replace(/না/g, '!')


    // লুপ
    .replace(/লুপ/g, 'for')
    .replace(/লুপ/g, 'for')
    .replace(/যতক্ষণ/g, 'while')
    .replace(/করো/g, 'do')
    .replace(/থামো/g, 'break')
    .replace(/বাদ/g, 'continue')


    // ফাংশন
    .replace(/ফাংশন/g, 'function')
    .replace(/ফেরত/g, 'return')

    // ইনপুট ও আউটপুট
    .replace(/দেখাও/g, 'console.log')
    .replace(/ইনপুট/g, 'prompt')
    .replace(/আউটপুট/g, 'alertAndOutput')


    // স্ট্রিং ফাংশন
    .replace(/দৈর্ঘ্য/g, 'length')
    .replace(/ছাঁটাই/g, 'trim')
    .replace(/বড়হাতের/g, 'toUpperCase')
    .replace(/ছোটহাতের/g, 'toLowerCase')
    .replace(/জোড়া/g, 'concat')

    .replace(/রাখো/g, 'push')
    .replace(/সরাও/g, 'pop')
    .replace(/সাজাও/g, 'sort')

    // অবজেক্ট/স্ট্রাকচার
    .replace(/স্ট্রাক্ট/g, 'let')
    .replace(/নতুন/g, 'new')

    // ফাইল 
    .replace(/লিখো/g, 'localStorage.setItem')
    .replace(/পড়ো/g, 'localStorage.getItem')
    .replace(/মুছো/g, 'localStorage.removeItem')

    // গানিতিক
    .replace(/গণিত/g, 'Math')   
    .replace(/পাই/g, 'PI')                 // π (pi)
    .replace(/ইউলার/g, 'E')                    // Euler’s number (e)
    .replace(/সাইন/g, 'sin')               // sine
    .replace(/কসাইন/g, 'cos')              // cosine
    .replace(/ট্যান/g, 'tan')               // tangen
    .replace(/আর্কসাইন/g, 'asin')          // arcsine
    .replace(/আর্ককোসাইন/g, 'acos')         // arccosine
    .replace(/আর্কট্যান/g, 'atan') 
    .replace(/গুননিয়ক/g, 'gcd')
    .replace(/গুনিতক/g, 'lcm')
    .replace(/লগ/g, 'log')                 // natural logarithm (ln)
    .replace(/লগ১০/g, 'log10')             // log base 10
    .replace(/বর্গমূল/g, 'sqrt')            // square root
    .replace(/ঘাত/g, 'pow')                // power
    .replace(/নিচ/g, 'floor')         // floor (round down)
    .replace(/উপর/g, 'ceil')        // ceil (round up)
    .replace(/রাউন্ড/g, 'round')           // round (nearest integer)
    .replace(/পরম_মান/g, 'abs')            // absolute value
    .replace(/ন্যূনতম/g, 'min')            // minimum
    .replace(/সর্বাধিক/g, 'max')            // maximum
    .replace(/র‌্যান্ডম/g, 'random')         // random decimal between 0 and 1

    
    // সংখ্যা রূপান্তর (বাংলা → ইংরেজি)
    .replace(/[০১২৩৪৫৬৭৮৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d));
}

// ✅ এই ফাংশন আউটপুট div এবং alert দুই জায়গাতেই দেখাবে
function alertAndOutput(message) {
  alert(message);
  const outputDiv = document.getElementById('output');
  outputDiv.textContent += message + '\n';
}

function runBanglaCode() {
  const bnCode = document.getElementById('banglaCode').value;
  const jsCode = banglaToJS(bnCode);

  const outputDiv = document.getElementById('output');
  outputDiv.textContent = ''; // Clear previous output

  // Override console.log
  const originalConsoleLog = console.log;
  console.log = function (...args) {
    outputDiv.textContent += args.join(' ') + '\n';
    originalConsoleLog.apply(console, args);
  };

  try {
    eval(jsCode);
  } catch (e) {
    outputDiv.textContent = 'ত্রুটি: ' + e.message;
  }

  console.log = originalConsoleLog;
}

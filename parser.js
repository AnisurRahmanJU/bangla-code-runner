function banglaToJS(code) {
  return code
    // চলক ও ধ্রুবক
    .replace(/চলক/g, 'let')
    .replace(/ধ্রুবক/g, 'const')

    // শর্ত ও লজিক
    .replace(/যদি/g, 'if')
    .replace(/নয়/g, 'else')
    .replace(/সত্য/g, 'true')
    .replace(/মিথ্যা/g, 'false')

    // লুপ
    .replace(/জন্য/g, 'for')
    .replace(/যতক্ষণ/g, 'while')
    .replace(/করো/g, 'do')

    // ফাংশন
    .replace(/ফাংশন/g, 'function')
    .replace(/ফেরত/g, 'return')

    // ইনপুট ও আউটপুট
    .replace(/দেখাও/g, 'console.log')
    .replace(/ইনপুট/g, 'prompt')
    .replace(/আউটপুট/g, 'alertAndOutput')

    // গাণিতিক অপারেশন
    .replace(/গণনা/g, 'Math')
    .replace(/গুন/g, '*')
    .replace(/ভাগ/g, '/')
    .replace(/যোগ/g, '+')
    .replace(/বিয়োগ/g, '-')
    .replace(/ঘাত/g, '**')
    .replace(/বর্গমূল/g, 'Math.sqrt')

    // স্ট্রিং ফাংশন
    .replace(/দৈর্ঘ্য/g, 'length')
    .replace(/ছাঁটাই/g, 'trim')
    .replace(/বড়হাতরূপ/g, 'toUpperCase')
    .replace(/ছোটহাতরূপ/g, 'toLowerCase')
    .replace(/জোড়া/g, 'concat')

    // অ্যারে
    .replace(/অ্যারে/g, 'Array')
    .replace(/রাখো/g, 'push')
    .replace(/সরাও/g, 'pop')
    .replace(/সাজাও/g, 'sort')

    // অবজেক্ট/স্ট্রাকচার
    .replace(/স্ট্রাকচার/g, 'let')
    .replace(/নতুন/g, 'new')

    // ফাইল (সিমুলেটেড)
    .replace(/সংরক্ষণ/g, 'localStorage.setItem')
    .replace(/পড়ো/g, 'localStorage.getItem')
    .replace(/মুছে_ফেলো/g, 'localStorage.removeItem')

    // পয়েন্টার (সিমুলেশন)
    .replace(/প্রসারণ/g, 'spread') // simulated keyword

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

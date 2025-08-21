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
    .replace(/সুইচ/g, 'switch')
    .replace(/কেস/g, 'case')
    .replace(/ডিফল্ট/g, 'default')
    .replace(/নাল/g, 'null')

    // লুপ
    .replace(/লুপ/g, 'for')
    .replace(/যতক্ষণ/g, 'while')
    .replace(/করো/g, 'do')
    .replace(/থামো/g, 'break')
    .replace(/বাদ/g, 'continue')
    .replace(/যার_মধ্যে/g, 'in')

    // ফাংশন
    .replace(/ফাংশন/g, 'function')
    .replace(/ফেরত/g, 'return')

    // ইনপুট ও আউটপুট
    .replace(/কথা_বলো/g, 'কথা_বলো')
    .replace(/দেখাও/g, 'console.log')
    .replace(/ইনপুট/g, 'prompt')
    .replace(/আউটপুট/g, 'alertAndOutput')

    // স্ট্রিং ফাংশন
    .replace(/দৈর্ঘ্য/g, 'length')
    .replace(/ছাঁটাই/g, 'trim')
    .replace(/জোড়া/g, 'concat')
    .replace(/কপি/g, 'copy')
    .replace(/তুলনা/g, 'compare')
    
    // অ্যারে
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
    .replace(/অল_ক্লিয়ার/g, 'localStorage.clear')

    // গানিতিক
    .replace(/গণিত/g, 'Math')   
    .replace(/পাই/g, 'PI')
    .replace(/ইউলার/g, 'E')
    .replace(/সাইন/g, 'sin')
    .replace(/কসাইন/g, 'cos')
    .replace(/ট্যান/g, 'tan')
    .replace(/আর্কসাইন/g, 'asin')
    .replace(/আর্ককোসাইন/g, 'acos')
    .replace(/আর্কট্যান/g, 'atan')
    .replace(/গুননিয়ক/g, 'gcd')
    .replace(/গুনিতক/g, 'lcm')
    .replace(/লগ১০/g, 'log10')
    .replace(/লগ/g, 'log')
    .replace(/বর্গমূল/g, 'sqrt')
    .replace(/ঘাত/g, 'pow')
    .replace(/নিচ/g, 'floor')
    .replace(/উপর/g, 'ceil')
    .replace(/রাউন্ড/g, 'round')
    .replace(/পরম_মান/g, 'abs')
    .replace(/ন্যূনতম/g, 'min')
    .replace(/সর্বাধিক/g, 'max')
    .replace(/র‌্যান্ডম/g, 'random')

    // সংখ্যা রূপান্তর (বাংলা → ইংরেজি)
    .replace(/[০১২৩৪৫৬৭৮৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d))

}

// কপি ফাংশন
function copy(str) {
  return str;  // স্ট্রিংয়ের কপি করা
}

// তুলনা ফাংশন
function compare(str1, str2) {
  if (str1 === str2) {
    console.log("স্ট্রিং দুটি সমান");
  } else {
    console.log("স্ট্রিং দুটি সমান নয়");
  }
}

// বুলিয়ান কনভার্টার
function convertBoolToBangla(text) {
  if (text === true) return 'সত্য';
  if (text === false) return 'মিথ্যা';
  return text;
}

// ইংরেজি → বাংলা সংখ্যা কনভার্টার
function convertNumbersToBangla(text) {
  text = convertBoolToBangla(text);
  text = text.toString();
  return text.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
}

// আউটপুট div এবং alert দুই জায়গাতেই দেখাবে এবং সংখ্যা বাংলা করবে
function alertAndOutput(message) {
  const converted = convertNumbersToBangla(message);
  alert(converted);
  const outputDiv = document.getElementById('output');
  outputDiv.textContent += converted + '\n';
}

// রানার ফাংশন
function runBanglaCode() {
  const bnCode = document.getElementById('banglaCode').value;
  const jsCode = banglaToJS(bnCode);

  const outputDiv = document.getElementById('output');
  outputDiv.textContent = ''; // পূর্বের আউটপুট মুছে ফেলা

  // console.log ওভাররাইড
  const originalConsoleLog = console.log;
  console.log = function (...args) {
    const converted = args.map(arg => convertNumbersToBangla(arg)).join(' ');
    outputDiv.textContent += converted + '\n';
    originalConsoleLog.apply(console, args);
  };

  try {
    eval(jsCode);
  } catch (e) {
    outputDiv.textContent = 'ত্রুটি: ' + e.message;
  }

  console.log = originalConsoleLog;
}

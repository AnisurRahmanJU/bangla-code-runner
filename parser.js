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
    .replace(/মধ্যে/g, 'in')

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
    .replace(/রান্ডম/g, 'random')

    // আঁকো 
    .replace(/আঁকো\s*\(/g, 'draw(')
    

    // সংখ্যা রূপান্তর (বাংলা → ইংরেজি)
    .replace(/[০১২৩৪৫৬৭৮৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d))

}

// ছবি আঁকা ফাংশন

// Global buffer to keep track of all draw calls
const drawnShapes = [];

function draw(shape, color = 'কালো', animation = null) {
  const outputDiv = document.getElementById('output');

  // Create canvas only once
  let canvas = document.getElementById('canvas');
  let ctx;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 500;
    canvas.height = 600;
    canvas.style.backgroundColor = window.getComputedStyle(outputDiv).backgroundColor;
    canvas.style.border = '2px solid #334155';
    canvas.style.display = 'block';
    canvas.style.margin = '20px auto';
    outputDiv.appendChild(canvas);
    ctx = canvas.getContext('2d');

    // Start animation loop
    requestAnimationFrame(function frame() {
      animate(canvas, ctx);
      requestAnimationFrame(frame);
    });
  } else {
    ctx = canvas.getContext('2d');
  }

  // Translate Bengali color to CSS color
  const colors = {
    'লাল': 'red',
    'সবুজ': 'green',
    'নীল': 'blue',
    'হলুদ': 'yellow',
    'কালো': 'black',
    'সাদা': 'white'
  };
  const fillColor = colors[color.trim()] || color;

  // Calculate vertical position based on previous shapes
  const posY = 100 + drawnShapes.length * 120;

  // Dynamically increase canvas height if needed
  const requiredHeight = posY + 100;
  if (canvas.height < requiredHeight) {
    canvas.height = requiredHeight;
  }

  drawnShapes.push({
    shape: shape.trim(),
    color: fillColor,
    animation: animation ? animation.trim() : null,
    x: 250,     // fixed X center
    y: posY,
    dx: 2,
    dy: 2,
    angle: 0,
    size: 80
  });
}

function animate(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawnShapes.forEach(obj => {
    ctx.save();

    if (obj.animation === 'ঘোরাও') {
      ctx.translate(obj.x, obj.y);
      ctx.rotate(obj.angle);
      ctx.translate(-obj.x, -obj.y);
      obj.angle += 0.05;

    } else if (obj.animation === 'লাফাও') {
      obj.x += obj.dx;
      obj.y += obj.dy;
      if (obj.x + obj.size / 2 > canvas.width || obj.x - obj.size / 2 < 0) obj.dx *= -1;
      if (obj.y + obj.size / 2 > canvas.height || obj.y - obj.size / 2 < 0) obj.dy *= -1;

    } else if (obj.animation === 'সরাও') {
      obj.x += obj.dx;
      if (obj.x + obj.size / 2 > canvas.width || obj.x - obj.size / 2 < 0) obj.dx *= -1;
    }

    drawShape(ctx, obj);
    ctx.restore();
  });
}

function drawShape(ctx, obj) {
  const { shape, x, y, size, color } = obj;
  ctx.fillStyle = color;

  switch (shape) {
    case 'বৃত্ত':
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
      ctx.fill();
      break;

    case 'বর্গক্ষেত্র':
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
      break;

    case 'আয়তক্ষেত্র':
      ctx.fillRect(x - size, y - size / 2, size * 2, size);
      break;

    case 'ত্রিভুজ':
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x - size / 2, y + size / 2);
      ctx.lineTo(x + size / 2, y + size / 2);
      ctx.closePath();
      ctx.fill();
      break;

    case 'তারা':
      drawStar(ctx, x, y, 5, size / 2, size / 4);
      break;

    case 'সাপ':
      drawSnake(ctx, x, y, size);
      break;

    case 'কচ্ছপ':
      drawTurtle(ctx, x, y, size);
      break;

    case 'হৃদয়':
    case 'হৃদয়':
      drawHeart(ctx, x, y, size);
      break;

    case 'পঞ্চভুজ':
      drawPentagon(ctx, x, y, size);
      break;

    case 'মানুষ':
      drawHuman(ctx, x, y, size);
      break;

    case 'বাড়ি':
      drawHouse(ctx, x, y, size);
      break;

    case 'গাড়ি':
      drawCar(ctx, x, y, size);
      break;

    case 'আঁকার_বোর্ড':
      drawBoard();
      break;
      
    case 'সাপ_খেলা':
            snakeGame();
            break;


    default:
      console.warn("অজানা আকৃতি:", shape);
  }
}


let boardOpened = false;  // ফ্ল্যাগ

function drawBoard() {
  if (!boardOpened) {
    window.open('drawing.html', '_blank'); 
    boardOpened = true;  // একবার খোলার পর আবার খোলবে না
  }
}


let boardOpened1 = false;  // ফ্ল্যাগ

function snakeGame() {
    if (!boardOpened1) {
        window.open('snakegame.html', '_blank'); 
        boardOpened1 = true;  // একবার খোলার পর আবার খোলবে না
    }
}



function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    const x1 = cx + Math.cos(rot) * outerRadius;
    const y1 = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x1, y1);
    rot += step;
    const x2 = cx + Math.cos(rot) * innerRadius;
    const y2 = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x2, y2);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawTurtle(ctx, cx, cy, size) {
  // Body
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, 2 * Math.PI);
  ctx.fill();

  // Legs
  const leg = size / 5;
  ctx.fillRect(cx - size / 2 - leg / 2, cy - leg / 2, leg, leg);
  ctx.fillRect(cx + size / 2 - leg / 2, cy - leg / 2, leg, leg);
  ctx.fillRect(cx - leg / 2, cy - size / 2 - leg / 2, leg, leg);
  ctx.fillRect(cx - leg / 2, cy + size / 2 - leg / 2, leg, leg);

  // Head
  ctx.beginPath();
  ctx.arc(cx, cy - size / 1.2, leg / 1.5, 0, 2 * Math.PI);
  ctx.fill();
}

function drawHeart(ctx, x, y, size) {
  const topCurveHeight = size * 0.3;
  ctx.beginPath();
  ctx.moveTo(x, y + topCurveHeight);

  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - size / 2, y + size, x, y + size, x, y + size * 1.4);
  ctx.bezierCurveTo(x, y + size, x + size / 2, y + size, x + size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);

  ctx.closePath();
  ctx.fill();
}


function drawPentagon(ctx, x, y, size) {
  const sides = 5;
  const angle = (2 * Math.PI) / sides;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const px = x + size * Math.cos(angle * i - Math.PI / 2);
    const py = y + size * Math.sin(angle * i - Math.PI / 2);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function drawHuman(ctx, x, y, size) {
  const headRadius = size * 0.15;
  const bodyHeight = size * 0.5;
  const limbLength = size * 0.3;

  // Head
  ctx.beginPath();
  ctx.arc(x, y - bodyHeight / 2 - headRadius, headRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(x, y - bodyHeight / 2);
  ctx.lineTo(x, y + bodyHeight / 2);
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Arms
  ctx.beginPath();
  ctx.moveTo(x - limbLength, y);
  ctx.lineTo(x + limbLength, y);
  ctx.stroke();

  // Legs
  ctx.beginPath();
  ctx.moveTo(x, y + bodyHeight / 2);
  ctx.lineTo(x - limbLength / 2, y + bodyHeight / 2 + limbLength);
  ctx.moveTo(x, y + bodyHeight / 2);
  ctx.lineTo(x + limbLength / 2, y + bodyHeight / 2 + limbLength);
  ctx.stroke();
}

function drawHouse(ctx, x, y, size) {
  // Base
  ctx.fillRect(x - size / 2, y, size, size / 2);

  // Roof (triangle)
  ctx.beginPath();
  ctx.moveTo(x, y - size / 2);
  ctx.lineTo(x - size / 2, y);
  ctx.lineTo(x + size / 2, y);
  ctx.closePath();
  ctx.fill();
}

function drawCar(ctx, x, y, size) {
  const carWidth = size;
  const carHeight = size / 2;

  // Body
  ctx.fillRect(x - carWidth / 2, y - carHeight / 2, carWidth, carHeight);

  // Top (trapezoid-like)
  ctx.beginPath();
  ctx.moveTo(x - carWidth / 4, y - carHeight / 2);
  ctx.lineTo(x - carWidth / 8, y - size / 1.5);
  ctx.lineTo(x + carWidth / 8, y - size / 1.5);
  ctx.lineTo(x + carWidth / 4, y - carHeight / 2);
  ctx.closePath();
  ctx.fill();

  // Wheels
  ctx.beginPath();
  ctx.arc(x - carWidth / 3, y + carHeight / 2, size / 8, 0, 2 * Math.PI);
  ctx.arc(x + carWidth / 3, y + carHeight / 2, size / 8, 0, 2 * Math.PI);
  ctx.fill();
}

function drawSnake(ctx, x, y, size) {
  const tailDotRadius = size / 12;
  const tailLength = 20;
  const spacing = tailDotRadius * 2.5;

  ctx.fillStyle = ctx.fillStyle || 'green'; // fallback if color not set

  // Draw tail as dots from left to right, ending in the head
  for (let i = tailLength - 1; i >= 0; i--) {
    const posX = x - (i + 1) * spacing;
    ctx.beginPath();
    ctx.arc(posX, y, tailDotRadius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Draw head (larger circle)
  const headRadius = tailDotRadius * 1.8;
  ctx.beginPath();
  ctx.arc(x, y, headRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Eyes
  const eyeOffset = headRadius * 0.4;
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(x - eyeOffset, y - eyeOffset, headRadius * 0.3, 0, 2 * Math.PI);
  ctx.arc(x + eyeOffset, y - eyeOffset, headRadius * 0.3, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(x - eyeOffset, y - eyeOffset, headRadius * 0.15, 0, 2 * Math.PI);
  ctx.arc(x + eyeOffset, y - eyeOffset, headRadius * 0.15, 0, 2 * Math.PI);
  ctx.fill();
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

// কথাবলো ফাংশন
function কথা_বলো(str) {
  speakText(str);
}

// Text-to-speech ফাংশন
function speakText(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "bn-BD"; // Bengali language setting for better pronunciation
    speechSynthesis.speak(utterance);
  } else {
    alert("Text-to-speech not supported in your browser. Please use a different browser.");
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

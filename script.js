let currentQuestion = 0;
const answers = new Array(12).fill(null); // 12 questions

const questions = [
  {
    question: { ar: "عندما تواجه تحديًا، أنت:" },
    options: [
      { ar: "تتخذ إجراءً فوريًا", character: "Mulan" },
      { ar: "تفكر بعناية وتخطط", character: "Ariadne" },
      { ar: "تبحث عن الحكمة والإرشاد", character: "Isis" },
    ],
  },
  {
    question: { ar: "في مجموعة، تفضل أن:" },
    options: [
      { ar: "تقود بالمثال", character: "Mulan" },
      { ar: "تقدم نصائح استراتيجية", character: "Ariadne" },
      { ar: "تدعم وترعى الآخرين", character: "Isis" },
    ],
  },
  {
    question: { ar: "نهجك في التعلم هو:" },
    options: [
      { ar: "عملي وتطبيقي", character: "Mulan" },
      { ar: "نظري ومفاهيمي", character: "Ariadne" },
      { ar: "حدسي وبصير", character: "Isis" },
    ],
  },
  {
    question: { ar: "عند اتخاذ القرارات، تعتمد على:" },
    options: [
      { ar: "الشجاعة والمبادرة", character: "Mulan" },
      { ar: "التحليل العميق", character: "Ariadne" },
      { ar: "الحكمة الداخلية", character: "Isis" },
    ],
  },
  {
    question: { ar: "في وجه الشدائد، أنت:" },
    options: [
      { ar: "تواجهها بجرأة", character: "Mulan" },
      { ar: "تجد حلولًا ذكية", character: "Ariadne" },
      { ar: "تبحث عن التوازن والانسجام", character: "Isis" },
    ],
  },
  {
    question: { ar: "عند مساعدة الآخرين، أنت:" },
    options: [
      { ar: "تقدم حلولًا عملية", character: "Mulan" },
      { ar: "تقدم أفكارًا مبتكرة", character: "Ariadne" },
      { ar: "تقدم دعمًا عاطفيًا وروحيًا", character: "Isis" },
    ],
  },
  {
    question: { ar: "في العمل، تفضل:" },
    options: [
      { ar: "إنجاز المهام بكفاءة", character: "Mulan" },
      { ar: "التخطيط والتحليل", character: "Ariadne" },
      { ar: "خلق بيئة داعمة", character: "Isis" },
    ],
  },
  {
    question: { ar: "عند التفكير في المستقبل، أنت:" },
    options: [
      { ar: "تركز على أهداف عملية", character: "Mulan" },
      { ar: "تتخيل إمكانيات جديدة", character: "Ariadne" },
      { ar: "تسعى لتحقيق رؤية", character: "Isis" },
    ],
  },
  {
    question: { ar: "في الأزمات، أنت:" },
    options: [
      { ar: "تتصرف بسرعة وحسم", character: "Mulan" },
      { ar: "تفكر في حلول إبداعية", character: "Ariadne" },
      { ar: "تحافظ على الهدوء والحكمة", character: "Isis" },
    ],
  },
  {
    question: { ar: "عند العمل في فريق، أنت:" },
    options: [
      { ar: "تتولى القيادة", character: "Mulan" },
      { ar: "تقدم رؤى استراتيجية", character: "Ariadne" },
      { ar: "تعزز التعاون", character: "Isis" },
    ],
  },
  {
    question: { ar: "في وقت فراغك، تستمتع ب:" },
    options: [
      { ar: "الأنشطة البدنية", character: "Mulan" },
      { ar: "استكشاف أفكار جديدة", character: "Ariadne" },
      { ar: "التأمل والاسترخاء", character: "Isis" },
    ],
  },
  {
    question: { ar: "عند مواجهة الفشل، أنت:" },
    options: [
      { ar: "تحاول مرة أخرى بعزيمة", character: "Mulan" },
      { ar: "تحلل وتبتكر", character: "Ariadne" },
      { ar: "تتعلم وتنمو بحكمة", character: "Isis" },
    ],
  },
];

// Create stars for night sky
function createStars() {
  const nightSky = document.getElementById("night-sky");
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    nightSky.appendChild(star);
  }
}
createStars();

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const nightSky = document.getElementById("night-sky");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    nightSky.style.display = "block";
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    nightSky.style.display = "none";
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

function startQuiz() {
  const userName = document.getElementById("user-name").value;
  if (userName.trim() === "") {
    alert("يرجى إدخال اسمك");
    return;
  }
  localStorage.setItem("userName", userName);
  document.getElementById("name-input").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  createQuiz();
}

function createQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  const question = questions[currentQuestion];
  const questionDiv = document.createElement("div");
  questionDiv.className = "question";
  questionDiv.innerHTML = `<h3>${question.question.ar}</h3><div class="options"></div>`;
  const optionsDiv = questionDiv.querySelector(".options");

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option.ar;
    button.addEventListener("click", () => {
      answers[currentQuestion] = option.character;
      currentQuestion++;
      if (currentQuestion < questions.length) {
        createQuiz();
      } else {
        submitQuiz();
      }
    });
    optionsDiv.appendChild(button);
  });

  container.appendChild(questionDiv);

  setTimeout(() => {
    questionDiv.classList.add("visible");
  }, 100);

  // Updated progress calculation to fit 12 questions exactly
  const progress = (currentQuestion / (questions.length - 1)) * 100;
  document.getElementById("progress").style.width = `${progress}%`;
}

function submitQuiz() {
  const counts = { Mulan: 0, Ariadne: 0, Isis: 0 };
  answers.forEach((answer) => {
    if (answer in counts) {
      counts[answer]++;
    }
  });

  let maxCount = 0;
  let resultCharacter = "";
  for (const [character, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      resultCharacter = character;
    }
  }
  const characterData = {
    Mulan: {
      name: "مولان",
      description: `أنت، ${localStorage.getItem(
        "userName"
      )}، تشبه مولان في شجاعتك وتصميمك. أنت شخص عملي، تفضل اتخاذ الإجراءات لحل المشكلات، وتتميز بروح المبادرة والقدرة على مواجهة التحديات بثقة. كمولان، أنت مستعد لتحدي التقاليد من أجل ما تؤمن به، وتظهر ولاءً قويًا لعائلتك وأصدقائك، مما يجعلك قائدًا طبيعيًا في الأوقات الصعبة.`,
      strengths: ["شجاعة", "تصميم", "عملية", "مبادرة"],
      weaknesses: ["تسرع", "عناد"],
      traits: ["مغامرة", "مستقلة", "قوية الإرادة", "مخلصة"],
      values: ["الشرف", "الولاء", "الشجاعة"],
      image: "image bank/mulan.png",
    },
    Ariadne: {
      name: "أريادني",
      description: `أنت، ${localStorage.getItem(
        "userName"
      )}، تشبه أريادني في ذكائك وإبداعك. أنت تفكر بعمق وتبتكر حلولًا إبداعية للمشكلات، مستخدمًا التخطيط الاستراتيجي لتحقيق أهدافك. مثل أريادني التي ساعدت ثيسيوس في الخروج من المتاهة، أنت تتمتع بقدرة فريدة على رؤية الحلول حيث يفشل الآخرون، وتلهم من حولك بأفكارك المبتكرة.`,
      strengths: ["ذكاء", "إبداع", "تخطيط", "حل المشكلات"],
      weaknesses: ["تردد", "انعزالية"],
      traits: ["مبتكرة", "تحليلية", "مبدعة", "صبورة"],
      values: ["الإبداع", "المعرفة", "الابتكار"],
      image: "image bank/ariadne.png",
    },
    Isis: {
      name: "إيزيس",
      description: `أنت، ${localStorage.getItem(
        "userName"
      )}، تشبه إيزيس في حكمتك ورعايتك. أنت تهتم بالآخرين وتسعى للحفاظ على الانسجام والتوازن، مستخدمًا بصيرتك لتوجيه الآخرين. كإيزيس، الإلهة المصرية للحكمة والحماية، أنت مصدر إلهام لمن حولك، تقدم الدعم العاطفي والروحي، وتتمتع بحضور هادئ يبعث على الطمأنينة.`,
      strengths: ["حكمة", "رعاية", "تعاطف", "بصيرة"],
      weaknesses: ["سيطرة", "توقعات عالية"],
      traits: ["رحيمة", "حدسية", "داعمة", "ملهمة"],
      values: ["الرحمة", "الانسجام", "الحكمة"],
      image: "image bank/isis.png",
    },
  };
  const data = characterData[resultCharacter];
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const modalResult = document.getElementById("modal-result");
  modalResult.innerHTML = `
                    <h2>أنت، ${localStorage.getItem("userName")}، تشبه ${
    data.name
  }</h2>
                    <img src="${data.image}" alt="${
    data.name
  }" class="character-image" />
                    <p>${data.description}</p>
                    <div class="strengths"><h3>نقاط القوة:</h3>${data.strengths
                      .map((s) => `<span class="tag">${s}</span>`)
                      .join("")}</div>
                    <div class="weaknesses"><h3>نقاط الضعف:</h3>${data.weaknesses
                      .map((w) => `<span class="tag">${w}</span>`)
                      .join("")}</div>
                    <div class="traits"><h3>السمات الشخصية:</h3>${data.traits
                      .map((t) => `<span class="tag">${t}</span>`)
                      .join("")}</div>
                    <div class="values"><h3>القيم الأساسية:</h3>${data.values
                      .map((v) => `<span class="tag">${v}</span>`)
                      .join("")}</div>
                `;
  document.body.classList.add("modal-open");
  modal.style.display = "block";
  modal.style.opacity = 1;
  setTimeout(() => {
    modalContent.classList.add("show");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  modalContent.classList.remove("show");
  setTimeout(() => {
    modal.style.opacity = 0;
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }, 500);
}

window.addEventListener("click", (event) => {
  if (event.target == document.getElementById("modal")) {
    closeModal();
  }
});

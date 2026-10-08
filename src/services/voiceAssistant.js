// Multi-lingual Voice Prompts & Symptom NLP Matcher for Regional Languages
// Supports Hindi (hi), English (en), Bengali (bn), Telugu (te), Tamil (ta), Marathi (mr)

export const VOICE_PROMPTS = {
  hi: {
    welcome: 'नमस्ते। आरोग्य संगिनी में आपका स्वागत है। मरीज के स्वास्थ्य परीक्षण के लिए नया चेकअप शुरू करें।',
    vitalsStep: 'कृपया मरीज का तापमान, रक्तचाप, नाड़ी और ऑक्सीजन स्तर दर्ज करें।',
    symptomsStep: 'मरीज के मुख्य लक्षण चुनें, या माइक दबाकर बोलें। जैसे कि तेज बुखार, खांसी, या उल्टी।',
    audioMemoPrompt: 'मरीज की आवाज या बच्चे की सांस की आवाज रिकॉर्ड करने के लिए रिकॉर्ड बटन दबाएं।',
    analyzing: 'एआई मॉडल ऑफलाइन जोखिम का विश्लेषण कर रहा है...',
    redEmergency: 'चेतावनी! यह गंभीर आपातकालीन स्थिति है। तुरंत 108 एम्बुलेंस को कॉल करें और मरीज को अस्पताल रेफर करें।',
    yellowUrgent: 'ध्यान दें! प्राथमिक स्वास्थ्य केंद्र के डॉक्टर से 24 घंटे के भीतर परामर्श की आवश्यकता है।',
    greenRoutine: 'मरीज की स्थिति स्थिर है। आवश्यक प्राथमिक उपचार दें और घर पर निगरानी रखें।',
    syncSuccess: 'सभी स्वास्थ्य रिकॉर्ड प्राथमिक स्वास्थ्य केंद्र सर्वर पर सुरक्षित रूप से सिंक हो गए हैं।'
  },
  en: {
    welcome: 'Welcome to AarogyaSangini. Start a new patient triage assessment.',
    vitalsStep: 'Please record patient temperature, blood pressure, pulse, and oxygen saturation.',
    symptomsStep: 'Select patient symptoms or tap microphone to speak. For example, high fever, cough, or vomiting.',
    audioMemoPrompt: 'Press record to capture audio notes or respiratory sound for doctor review.',
    analyzing: 'On-device AI model is analyzing clinical risk offline...',
    redEmergency: 'ALERT! Emergency condition detected. Dispatch 108 ambulance and refer immediately to District Hospital.',
    yellowUrgent: 'Urgent attention required. Refer to PHC Medical Officer within 24 hours.',
    greenRoutine: 'Patient is stable. Provide primary home care guidance and continue community monitoring.',
    syncSuccess: 'Medical records successfully synchronized with the Primary Health Centre server.'
  },
  bn: {
    welcome: 'নমস্কার। আরোগ্য সঙ্গিনীতে আপনাকে স্বাগতম। রোগীর স্বাস্থ্য পরীক্ষা শুরু করুন।',
    vitalsStep: 'অনুগ্রহ করে রোগীর তাপমাত্রা, রক্তচাপ এবং অক্সিজেন মাত্রা লিখুন।',
    symptomsStep: 'রোগীর লক্ষণ নির্বাচন করুন অথবা মাইক টিপে মুখে বলুন। যেমন তীব্র জ্বর, কাশি বা বমি।',
    audioMemoPrompt: 'ডাক্তারের পরীক্ষার জন্য রোগীর শ্বাস বা গলার শব্দ রেকর্ড করুন।',
    analyzing: 'অফলাইন এআই মডেল ঝুঁকি বিশ্লেষণ করছে...',
    redEmergency: 'জরুরী সতর্কতা! রোগীর অবস্থা আশঙ্কাজনক। অবিলম্বে হাসপাতালে পাঠান।',
    yellowUrgent: 'জরুরী পর্যবেক্ষণ প্রয়োজন। ২৪ ঘণ্টার মধ্যে ডাক্তারের পরামর্শ নিন।',
    greenRoutine: 'রোগীর অবস্থা স্থিতিশীল। বাড়িতে সাধারণ যত্ন নিন।',
    syncSuccess: 'স্বাস্থ্য তথ্য সফলভাবে সিঙ্ক হয়েছে।'
  },
  te: {
    welcome: 'నమస్కారం. ఆరోగ్య సంగినికి స్వాగతం. రోగి పరీక్షను ప్రారంభించండి.',
    vitalsStep: 'దయచేసి రోగి ఉష్ణోగ్రత, రక్తపోటు మరియు ఆక్సిజన్ నమోదు చేయండి.',
    symptomsStep: 'లక్షణాలను ఎంచుకోండి లేదా మైక్ నొక్కి మాట్లాడండి. ఉదాహరణకు తీవ్ర జ్వరం, దగ్గు లేదా వాంతులు.',
    audioMemoPrompt: 'డాక్టర్ సమీక్ష కోసం రోగి వాయిస్ రికార్డ్ చేయండి.',
    analyzing: 'ఆఫ్‌లైన్ AI మోడల్ రిస్క్ విశ్లేషిస్తోంది...',
    redEmergency: 'హెచ్చరిక! అత్యవసర పరిస్థితి. వెంటనే ఆసుపత్రికి పంపండి.',
    yellowUrgent: '24 గంటల్లో ప్రాథమిక ఆరోగ్య కేంద్రం వైద్యుడిని సంప్రదించండి.',
    greenRoutine: 'రోగి పరిస్థితి నిలకడగా ఉంది. ప్రాథమిక చికిత్స అందించండి.',
    syncSuccess: 'రికార్డులు విజయవంతంగా సమకాలీకరించబడ్డాయి.'
  },
  ta: {
    welcome: 'வணக்கம். ஆரோக்கிய சங்கினிக்கு உங்களை வரவேற்கிறோம்.',
    vitalsStep: 'நோயாளியின் வெப்பநிலை, இரத்த அழுத்தம் மற்றும் ஆக்ஸிஜன் அளவை உள்ளிடவும்.',
    symptomsStep: 'அறிகுறிகளைத் தேர்ந்தெடுக்கவும் அல்லது மைக் அழுத்தி பேசவும். எ.கா: காய்ச்சல், இருமல், வாந்தி.',
    audioMemoPrompt: 'மருத்துவர் பார்வைக்காக ஆடியோவை பதிவு செய்யவும்.',
    analyzing: 'ஆஃப்லைன் AI மருத்துவ அபாயத்தை ஆய்வு செய்கிறது...',
    redEmergency: 'எச்சரிக்கை! அவசர நிலை. உடனடியாக ஆம்புலன்ஸ் மூலம் மருத்துவமனைக்கு அனுப்பவும்.',
    yellowUrgent: '24 மணி நேரத்திற்குள் மருத்துவரை அணுகவும்.',
    greenRoutine: 'நோயாளியின் நிலை சீராக உள்ளது. வீட்டிலேயே பராமரிக்கவும்.',
    syncSuccess: 'மருத்துவ ஆவணங்கள் வெற்றிகரமாக ஒத்திசைக்கப்பட்டன.'
  },
  mr: {
    welcome: 'नमस्कार. आरोग्य संगिनी मध्ये आपले स्वागत आहे.',
    vitalsStep: 'कृपया रुग्णाचे तापमान, रक्तदाब आणि ऑक्सिजन नोंदवा.',
    symptomsStep: 'लक्षणे निवडा किंवा माइक दाबून बोला. जसे की तीव्र ताप, खोकला किंवा उलट्या.',
    audioMemoPrompt: 'डॉक्टरांच्या सल्ल्यासाठी रुग्णाचा आवाज रेकॉर्ड करा.',
    analyzing: 'ऑफलाइन एआय मॉडेल विश्लेषण करत आहे...',
    redEmergency: 'धोका! ही गंभीर आणि आणीबाणीची स्थिती आहे. त्वरित रुग्णालयात पाठवा.',
    yellowUrgent: '२४ तासांत प्राथमिक आरोग्य केंद्रातील डॉक्टरांचा सल्ला घ्या.',
    greenRoutine: 'रुग्णाची प्रकृती स्थिर आहे. प्राथमिक काळजी घ्या.',
    syncSuccess: 'आरोग्य नोंदी यशस्वीरित्या सिंक झाल्या आहेत.'
  }
};

// Multilingual Keyword Dictionary Supporting Native Scripts & Transliterations
const SYMPTOM_KEYWORDS = {
  cough: [
    'cough', 'khansi', 'khasi', 'khokha', 'daggula', 'irumal', 'khokal',
    'खांसी', 'काशि', 'কাশি', 'দగ్గు', 'இருமல்', 'खोकला'
  ],
  fast_breathing: [
    'fast breathing', 'rapid breathing', 'saans tej', 'haafna', 'tezz saans', 'druto shwash',
    'तेज सांस', 'দ্রুত শ্বাস', 'వేగంగా శ్వాస', 'வேகமான சுவாசம்', 'जलद श्वास'
  ],
  chest_indrawing: [
    'chest indrawing', 'pasliyan chalna', 'pasli chal rahi', 'chhati dhasna', 'ribs sinking', 'chhati atat jane', 'buker panjor',
    'पसलियां', 'छाती अंदर', 'বুকের খাঁচা', 'পাঁজর', 'ఛాతీ లోపలికి', 'விலா எலும்பு', 'बरगड्या'
  ],
  shortness_of_breath: [
    'shortness of breath', 'saans lene me takleef', 'dum ghutna', 'breathless', 'swas ghenyas tras', 'swasa aagadam', 'shwashkoshtho',
    'सांस में तकलीफ', 'सांस फूलना', 'শ্বাসকষ্ট', 'ఆయాసం', 'మూச்சுத்திணறல்', 'दम लागणे'
  ],
  wheezing_stridor: [
    'wheezing', 'stridor', 'seeti', 'ghurghur', 'shiti awaz',
    'सीटी', 'घरघराहट', 'ঘড়ঘড়', 'పిల్లికూతలు', 'விசில்', 'शिट्टी'
  ],

  watery_diarrhea: [
    'diarrhea', 'loose motion', 'dast', 'patla dast', 'jhada', 'virechanam', 'beethi', 'patla paykhana',
    'दस्त', 'पतले दस्त', 'পাতলা পায়খানা', 'విరేచనాలు', 'வயிற்றுப்போக்கு', 'जुलाब'
  ],
  vomiting: [
    'vomiting', 'vomit', 'ulti', 'ubkai', 'vaman', 'vanthi', 'ulti hone', 'bomi',
    'उल्टी', 'বমি', 'వాంతులు', 'వాంతి', 'வாந்தி', 'उलटी'
  ],
  sunken_eyes: [
    'sunken eyes', 'aankhen dhasna', 'aankh andar', 'dole khale', 'chokh bhetore',
    'आंखें धंसी', 'চোখ ভেতরে', 'కళ్ళు లోతుకు', 'குழிவிழுந்த கண்கள்', 'डोळे खोल'
  ],
  slow_skin_pinch: [
    'skin pinch', 'chamdi', 'chutki', 'turgor', 'chamda',
    'चमड़ी', 'চামড়া', 'చర్మం', 'தோல்', 'त्वचा'
  ],
  extreme_thirst: [
    'thirst', 'pyas', 'pani pine ki ichha', 'daham', 'trisna',
    'प्यास', 'তৃষ্ণা', 'దాహం', 'தாகம்', 'तहान'
  ],

  high_fever: [
    'fever', 'bukhar', 'tap', 'jor', 'jawaram', 'kaichal', 'taap', 'jwor',
    'बुखार', 'तेज बुखार', 'জ্বর', 'జ్వరం', 'காய்ச்சல்', 'ताप'
  ],
  chills_rigors: [
    'chills', 'rigors', 'shivering', 'kanpna', 'thand lagna', 'thandi', 'chal vaatne', 'kapuni',
    'कंपकंपी', 'कांपना', 'কাঁপুনি', 'వణుకు', 'நடுக்கம்', 'थंडी'
  ],
  joint_pain: [
    'joint pain', 'body pain', 'badan dard', 'jodo me dard', 'anga noppu', 'haadanche dukhne', 'byatha',
    'जोड़ों में दर्द', 'बदन दर्द', 'গাঁটে ব্যথা', 'కీళ్ల నొప్పులు', 'மூட்டு வலி', 'सांधेदुखी'
  ],
  petechiae_rash: [
    'rash', 'red spots', 'chakatta', 'daag', 'rakta daag', 'lal daag',
    'लाल चकत्ते', 'লাল দাগ', 'ఎర్రటి మచ్చలు', 'சிவப்பு புள்ளிகள்', 'लाल डाग'
  ],

  severe_headache: [
    'headache', 'head pain', 'sir dard', 'matha byatha', 'thalai vali', 'doke dukhi', 'sir dukhne',
    'सिर दर्द', 'মাথাব্যথা', 'తలనొప్పి', 'தலைவலி', 'डोकेदुखी'
  ],
  blurred_vision: [
    'blurred vision', 'dhoondhla', 'andhera', 'chakkar', 'dole puje', 'jhapsha',
    'धुंधला', 'अंधेरा', 'ঝাপসা', 'మసక', 'பார்வை மங்கல்', 'अंधारी'
  ],
  face_swelling: [
    'swelling', 'face swelling', 'chehre par soojan', 'sujan', 'baadho', 'mukh fola',
    'सूजन', 'ফোলাভাব', 'ముఖం వాపు', 'முக வீக்கம்', 'सूज'
  ],
  vaginal_bleeding: [
    'bleeding', 'blood', 'raktsrav', 'khoon aana', 'raktham', 'raktapravah',
    'रक्तस्राव', 'खून', 'রক্তক্ষরণ', 'రక్తస్రావం', 'இரத்தப்போக்கு'
  ],
  severe_abdo_pain: [
    'stomach pain', 'abdominal pain', 'pet dard', 'potti kadupu', 'potat dukhne', 'tolpet byatha',
    'पेट दर्द', 'তলপেটে ব্যথা', 'కడుపు నొప్పి', 'வயிற்று வலி', 'पोटदुखी'
  ],

  convulsions: [
    'fits', 'seizures', 'convulsions', 'jhatka', 'daure', 'murchha', 'apasmara', 'khichuni',
    'दौरे', 'झटके', 'খিঁচুনি', 'ఫిట్స్', 'வலிப்பு', 'फेफरे'
  ],
  lethargy_unconscious: [
    'unconscious', 'faint', 'lethargic', 'behosh', 'susti', 'sust', 'besuddhi', 'nistej',
    'सुस्ती', 'बेहोश', 'অজ্ঞান', 'నిస్సత్తువ', 'சுயநினைவின்மை', 'बेशुद्ध'
  ],
  stiff_neck: [
    'stiff neck', 'gardan akdan', 'gardan tight', 'manakattu', 'ghar shokto',
    'गर्दन में अकड़न', 'ঘাড় শক্ত', 'మెడ బిగుతు', 'கழுத்து விரைப்பு', 'मान ताठ'
  ],
  refusing_feed: [
    'not feeding', 'refusing feed', 'doodh nahi pee raha', 'khana nahi kha raha', 'sthanpan nahi',
    'दूध नहीं पी रहा', 'খাবার না খাওয়া', 'పాలు తాగలేకపోవడం', 'தாய்ப்பால் குடிக்காமை', 'स्तनपान बंद'
  ]
};

/**
 * Natural Language Keyword Extraction from Spoken Patient Voice across all scripts
 */
export function extractSymptomsFromVoice(transcript = '') {
  if (!transcript) return [];
  const text = transcript.toLowerCase();
  const matchedSymptoms = [];

  for (const [symptomId, keywords] of Object.entries(SYMPTOM_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        if (!matchedSymptoms.includes(symptomId)) {
          matchedSymptoms.push(symptomId);
        }
        break;
      }
    }
  }

  return matchedSymptoms;
}

// Preset simulated voice snippets for ALL 6 supported languages!
export const SAMPLE_VOICE_SNIPPETS = [
  {
    lang: 'hi-IN',
    label: 'हिन्दी: बाल निमोनिया (Pediatric Pneumonia)',
    text: 'बच्चे को बहुत तेज बुखार है और छाती अंदर धंस रही है, सांस लेने में बहुत तकलीफ है',
    expectedSymptoms: ['high_fever', 'chest_indrawing', 'shortness_of_breath']
  },
  {
    lang: 'en-IN',
    label: 'English: Maternal Pre-eclampsia Crisis',
    text: 'Pregnant patient has severe persistent headache, blurred vision, and high blood pressure',
    expectedSymptoms: ['severe_headache', 'blurred_vision']
  },
  {
    lang: 'bn-IN',
    label: 'বাংলা: শিশু নিউমোনিয়া ও জ্বর (Child Pneumonia)',
    text: 'বাচ্চাটির তীব্র জ্বর হয়েছে, বুকের খাঁচা ডেবে যাচ্ছে এবং শ্বাসকষ্ট হচ্ছে',
    expectedSymptoms: ['high_fever', 'chest_indrawing', 'shortness_of_breath']
  },
  {
    lang: 'te-IN',
    label: 'తెలుగు: విరేచనాలు మరియు వాంతులు (Dehydration)',
    text: 'పిల్లవాడికి నీళ్ల విరేచనాలు మరియు వాంతులు అవుతున్నాయి, తీవ్రమైన నిస్సత్తువగా ఉంది',
    expectedSymptoms: ['watery_diarrhea', 'vomiting', 'lethargy_unconscious']
  },
  {
    lang: 'ta-IN',
    label: 'தமிழ்: குளிர் நடுக்க காய்ச்சல் (Malaria Fever)',
    text: 'நோயாளிக்கு நடுக்கத்துடன் கூடிய காய்ச்சல் மற்றும் கடுமையான மூட்டு வலி உள்ளது',
    expectedSymptoms: ['high_fever', 'chills_rigors', 'joint_pain']
  },
  {
    lang: 'mr-IN',
    label: 'मराठी: प्री-एक्लॅम्पसिया (Maternal Risk)',
    text: 'गरोदर महिलेच्या डोक्यात तीव्र डोकेदुखी आहे आणि डोळ्यांसमोर अंधारी येत आहे',
    expectedSymptoms: ['severe_headache', 'blurred_vision']
  }
];

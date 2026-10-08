// AarogyaSangini Comprehensive Multilingual (i18n) Engine
// Supports: Hindi (hi), English (en), Bengali (bn), Telugu (te), Tamil (ta), Marathi (mr)

export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', key: 'hi', label: 'हिन्दी (Hindi)', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en-IN', key: 'en', label: 'English (India)', nativeName: 'English', flag: '🇮🇳' },
  { code: 'bn-IN', key: 'bn', label: 'বাংলা (Bengali)', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'te-IN', key: 'te', label: 'తెలుగు (Telugu)', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta-IN', key: 'ta', label: 'தமிழ் (Tamil)', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'mr-IN', key: 'mr', label: 'मराठी (Marathi)', nativeName: 'मराठी', flag: '🇮🇳' }
];

export const TRANSLATIONS = {
  hi: {
    // Navigation
    fieldTriage: 'फील्ड ट्राइएज',
    phcDoctor: 'पीएचसी डॉक्टर',
    outbreakRadar: 'महामारी रडार',
    residents: 'ग्रामीण नागरिक',
    queue: 'ऑफलाइन कतार',
    pending: 'लंबित',
    synced: 'सिंक हो गया',
    syncNow: 'अभी सिंक करें',
    syncing: 'सिंक हो रहा है...',
    ashaBadge: 'आशा संगिनी',

    // Network bar
    offlineMode: 'गांव ऑफलाइन मोड (शून्य इंटरनेट)',
    spottyMode: 'कमजोर 2G नेटवर्क (रुक-रुक कर)',
    onlineMode: 'उच्च गति 4G/वाई-फाई लिंक',
    aiEngineActive: 'एआई मॉडल: ऑन-डिवाइस स्थानीय (0ms पिंग)',
    storageActive: 'IndexedDB सुरक्षित संग्रहण: सक्रिय',
    simulateNetwork: 'नेटवर्क सिम्युलेटर:',

    // Hero
    heroTitle: 'आरोग्य संगिनी फील्ड ट्राइएज',
    heroSubtitle: 'सुदूर ग्रामीण क्षेत्रों में आशा और आंगनवाड़ी कार्यकर्ताओं के लिए ऑन-डिवाइस एआई लक्षण जांच और ऑफलाइन टेलीमेडिसिन प्रणाली।',
    heroTag1: '⚡ 15ms से तेज स्थानीय एआई',
    heroTag2: '🎙️ बहुभाषी वाणी सहायक (Speech API)',
    heroTag3: '📦 IndexedDB स्वचालित कतार',

    // Voice banner
    voiceAssistance: 'वाणी सहायता (Voice Guidance)',
    speakSymptomsBtn: 'बोलकर लक्षण दर्ज करें',
    listenInstruction: 'निर्देश सुनें',

    // Triage Steps
    step1Title: 'चरण 1: मरीज की पहचान',
    choosePatient: 'पंजीकृत मरीज चुनें:',
    addNewResident: 'नया नागरिक जोड़ें',
    quickPresets: 'परीक्षण हेतु त्वरित उदाहरण (Presets):',
    presetChildPneumonia: '🚨 गंभीर बाल निमोनिया (SpO2 89%, छाती धंसना)',
    presetPreeclampsia: '⚠️ प्री-एक्लेम्पसिया (BP 158/104, सिरदर्द)',
    presetMalaria: '🦟 संभावित मलेरिया (103.2°F, कंपकंपी)',
    presetDehydration: '💧 गंभीर डिहाइड्रेशन (सुस्ती, उल्टी-दस्त)',

    step2Title: 'चरण 2: शारीरिक मापदंड (Vitals)',
    vitalsSubtitle: 'जांच किट से मापे गए मान दर्ज करें:',
    tempLabel: 'तापमान (°F)',
    tempGuide: 'सामान्य तापमान 97 से 99 डिग्री फैरेनहाइट होता है। 100.4 से ऊपर बुखार है।',
    pulseLabel: 'नाड़ी दर (BPM)',
    pulseGuide: 'नाड़ी की सामान्य दर 60 से 100 धड़कन प्रति मिनट होती है।',
    bpSysLabel: 'रक्तचाप सिस्टोलिक (mmHg)',
    bpDiaLabel: 'रक्तचाप डायस्टोलिक (mmHg)',
    bpGuide: 'रक्तचाप 140/90 से अधिक होने पर चिकित्सीय परामर्श जरूरी है।',
    spo2Label: 'ऑक्सीजन SpO2 (%)',
    spo2Guide: 'ऑक्सीजन स्तर 95 से 100 प्रतिशत सामान्य है। 92 से नीचे गंभीर है।',
    respLabel: 'श्वसन दर (/min)',
    muacLabel: 'मध्य बांह परिधि (MUAC cm)',
    weightLabel: 'वजन (किग्रा)',

    step3Title: 'चरण 3: मरीज के लक्षण',
    symptomsVoiceBadge: 'वाणी द्वारा पहचाने गए लक्षण:',
    dangerTag: 'खतरा',

    step4Title: 'चरण 4: डॉक्टर के लिए वॉयस नोट',
    voiceMemoSubtitle: 'मरीज की आवाज या सांस की ध्वनि रिकॉर्ड करें',
    recordSoundBtn: 'मरीज की आवाज रिकॉर्ड करें',
    stopRecordBtn: 'रिकॉर्डिंग रोकें',
    audioAttached: 'ऑडियो नोट संलग्न है',

    runTriageBtn: 'ऑफलाइन एआई ट्राइएज चलाएं',

    // Triage Modal
    aiAssessmentTitle: 'ऑन-डिवाइस एआई चिकित्सीय विश्लेषण',
    dangerSignsTitle: 'खतरे के लक्षण मिले:',
    diseaseDistribution: 'संभावित रोग स्तर (Probability):',
    protocolActionsTitle: 'WHO व MoHFW प्रोटोकॉल निर्देश (तत्काल कदम):',
    xaiAttribution: 'एआई निर्णय का कारण (Explainable AI):',
    saveToQueueBtn: 'ऑफलाइन कतार में सहेजें (IndexedDB)',
    savedToQueueBtn: '✓ स्थानीय कतार में सुरक्षित',
    closeBtn: 'बंद करें',

    // Doctor Portal
    doctorStationTitle: 'प्राथमिक स्वास्थ्य केंद्र (PHC) डॉक्टर डेस्क',
    doctorSubtitle: 'सुदूर गांवों से सिंक होकर आए मरीजों की टेलीमेडिसिन समीक्षा',
    villageCasesTitle: 'आए हुए मरीज',
    doctorPrescriptionTitle: 'डॉक्टर की सलाह एवं ई-प्रिस्क्रिप्शन',
    addMedicineBtn: 'दवा जोड़ें',
    signTransmitBtn: 'हस्ताक्षर करें एवं डिजिटल पर्चा भेजें',

    // Outbreak Radar
    outbreakTitle: 'गांव संक्रामक रोग निगरानी एवं महामारी रडार',
    outbreakSubtitle: 'स्वास्थ्य उप-केंद्र स्तर पर बुखार, निमोनिया और डायरिया के क्लस्टर विश्लेषण',
    earlyOutbreakDetected: 'शुरुआती महामारी का संकेत:',
    clusterDensity: 'गांव अनुसार रोग क्लस्टर घनत्व'
  },

  en: {
    fieldTriage: 'Field Triage',
    phcDoctor: 'PHC Doctor',
    outbreakRadar: 'Outbreak Radar',
    residents: 'Residents',
    queue: 'Offline Queue',
    pending: 'Pending',
    synced: 'Synced',
    syncNow: 'Sync Now',
    syncing: 'Syncing...',
    ashaBadge: 'ASHA Sangini',

    offlineMode: 'Village Offline Mode (Zero Internet)',
    spottyMode: 'Spotty 2G Rural Cellular (Intermittent)',
    onlineMode: 'High-Speed 4G/Wi-Fi Telemedicine Link',
    aiEngineActive: 'AI Engine: Local On-Device (0ms Ping)',
    storageActive: 'IndexedDB Secure Storage: Active',
    simulateNetwork: 'Simulate Network:',

    heroTitle: 'AarogyaSangini Field Triage',
    heroSubtitle: 'On-device AI triage and offline telemedicine platform empowering rural ASHA & Anganwadi workers in zero-connectivity villages.',
    heroTag1: '⚡ Sub-15ms Local Inference',
    heroTag2: '🎙️ Multilingual Web Speech API',
    heroTag3: '📦 IndexedDB Automatic Queue',

    voiceAssistance: 'Voice Guidance (आवाज सहायता)',
    speakSymptomsBtn: 'Speak Symptoms',
    listenInstruction: 'Listen Prompt',

    step1Title: 'Step 1: Patient Identity',
    choosePatient: 'Choose Registered Patient:',
    addNewResident: 'Add New Resident',
    quickPresets: 'One-Click Clinical Test Presets:',
    presetChildPneumonia: '🚨 Severe Child Pneumonia (SpO2 89%, Chest Indraw)',
    presetPreeclampsia: '⚠️ Pre-eclampsia Crisis (BP 158/104, Headache)',
    presetMalaria: '🦟 Suspected Malaria (103.2°F, Shaking Chills)',
    presetDehydration: '💧 Acute Dehydration (Slow Pinch, Vomiting)',

    step2Title: 'Step 2: Objective Clinical Vitals',
    vitalsSubtitle: 'Touch any field to record from portable diagnostic kit:',
    tempLabel: 'Temp (°F)',
    tempGuide: 'Normal body temperature is 97 to 99 Fahrenheit. Above 100.4 is fever.',
    pulseLabel: 'Pulse (BPM)',
    pulseGuide: 'Normal pulse is 60 to 100 beats per minute.',
    bpSysLabel: 'BP Systolic (mmHg)',
    bpDiaLabel: 'BP Diastolic (mmHg)',
    bpGuide: 'Blood pressure above 140/90 requires clinical doctor evaluation.',
    spo2Label: 'SpO2 Oxygen (%)',
    spo2Guide: 'Oxygen saturation 95 to 100% is normal. Below 92% is critical hypoxia.',
    respLabel: 'Resp Rate (/min)',
    muacLabel: 'MUAC (cm) - Arm Strip',
    weightLabel: 'Weight (kg)',

    step3Title: 'Step 3: Clinical Symptoms',
    symptomsVoiceBadge: 'Voice-Extracted Symptoms:',
    dangerTag: 'DANGER',

    step4Title: 'Step 4: Doctor Voice Memo',
    voiceMemoSubtitle: 'Record patient sound or breathing for remote doctor consultation',
    recordSoundBtn: 'Record Patient Sound',
    stopRecordBtn: 'Stop Recording',
    audioAttached: 'Audio Memo Attached',

    runTriageBtn: 'Run Quantized AI Triage (Offline)',

    aiAssessmentTitle: 'On-Device AI Clinical Assessment',
    dangerSignsTitle: 'Danger Signs Detected:',
    diseaseDistribution: 'AI Disease Risk Distribution:',
    protocolActionsTitle: 'WHO IMCI & MoHFW Protocol Actions:',
    xaiAttribution: 'Explainable AI Model Attribution:',
    saveToQueueBtn: 'Save to Offline Queue (IndexedDB)',
    savedToQueueBtn: '✓ Saved to Local Queue',
    closeBtn: 'Close',

    doctorStationTitle: 'Primary Health Centre (PHC) Doctor Station',
    doctorSubtitle: 'Telemedicine review of clinical triage cases synced from remote villages',
    villageCasesTitle: 'Village Incoming Cases',
    doctorPrescriptionTitle: 'Doctor Clinical Review & Prescription',
    addMedicineBtn: 'Add Medicine',
    signTransmitBtn: 'Sign & Transmit Digital Prescription',

    outbreakTitle: 'Village Syndromic Surveillance & Outbreak Radar',
    outbreakSubtitle: 'Offline-generated epidemic alert vectors aggregated across Sub-Centre jurisdiction',
    earlyOutbreakDetected: 'EARLY OUTBREAK DETECTED:',
    clusterDensity: 'Village Syndromic Cluster Density'
  },

  bn: {
    fieldTriage: 'ফিল্ড ট্রায়াজ',
    phcDoctor: 'পিএইচসি ডাক্তার',
    outbreakRadar: 'মহামারী রাডার',
    residents: 'গ্রামবাসী',
    queue: 'অফলাইন সারি',
    pending: 'অপেক্ষারত',
    synced: 'সিঙ্ক হয়েছে',
    syncNow: 'এখনই সিঙ্ক করুন',
    syncing: 'সিঙ্ক হচ্ছে...',
    ashaBadge: 'আশা সঙ্গিনী',

    offlineMode: 'গ্রাম অফলাইন মোড (ইন্টারনেট নেই)',
    spottyMode: 'দুর্বল 2G নেটওয়ার্ক (অস্থির)',
    onlineMode: 'উচ্চগতির 4G/ওয়াই-ফাই সংযোগ',
    aiEngineActive: 'এআই মডেল: অন-ডিভাইস স্থানীয় (0ms পিং)',
    storageActive: 'IndexedDB অফলাইন স্টোরেজ: সক্রিয়',
    simulateNetwork: 'নেটওয়ার্ক সিমুলেশন:',

    heroTitle: 'আরোগ্য সঙ্গিনী ফিল্ড ট্রায়াজ',
    heroSubtitle: 'প্রত্যন্ত গ্রামের আশা কর্মীদের জন্য অন-ডিভাইস এআই ট্রায়াজ এবং অফলাইন টেলিমেডিসিন ব্যবস্থা।',
    heroTag1: '⚡ ১৫ মিলিসেকেন্ডে স্থানীয় এআই',
    heroTag2: '🎙️ বহুভাষিক ভয়েস সহায়ক',
    heroTag3: '📦 IndexedDB স্বয়ংক্রিয় সারি',

    voiceAssistance: 'ভয়েস সহায়তা (কথা শুনুন)',
    speakSymptomsBtn: 'মুখে লক্ষণ বলুন',
    listenInstruction: 'নির্দেশ শুনুন',

    step1Title: 'ধাপ ১: রোগীর পরিচয়',
    choosePatient: 'নিবন্ধিত রোগী নির্বাচন করুন:',
    addNewResident: 'নতুন বাসিন্দা যোগ করুন',
    quickPresets: 'দ্রুত পরীক্ষার উদাহরণ (Presets):',
    presetChildPneumonia: '🚨 শিশুর নিউমোনিয়া (SpO2 ৮৯%, বুকের টান)',
    presetPreeclampsia: '⚠️ প্রি-এক্লাম্পসিয়া (BP ১৫৮/১০৪, মাথাব্যথা)',
    presetMalaria: '🦟 ম্যালেরিয়া জ্বর (১০৩.২°F, কাঁপুনি)',
    presetDehydration: '💧 তীব্র ডিহাইড্রেশন (বমি ও পাতলা পায়খানা)',

    step2Title: 'ধাপ ২: শারীরিক লক্ষণ ও ভাইটাল',
    vitalsSubtitle: 'ডায়াগনস্টিক কিট থেকে প্রাপ্ত মান লিখুন:',
    tempLabel: 'তাপমাত্রা (°F)',
    tempGuide: 'স্বাভাবিক তাপমাত্রা ৯৭ থেকে ৯৯ ফারেনহাইট। ১০০.৪ এর বেশি হলে জ্বর।',
    pulseLabel: 'নাড়ির গতি (BPM)',
    pulseGuide: 'স্বাভাবিক নাড়ির গতি প্রতি মিনিটে ৬০ থেকে ১০০ বার।',
    bpSysLabel: 'রক্তচাপ সিস্টোলিক (mmHg)',
    bpDiaLabel: 'রক্তচাপ ডায়াস্টোলিক (mmHg)',
    bpGuide: 'রক্তচাপ ১৪০/৯০ এর বেশি হলে ডাক্তারের পরামর্শ জরুরি।',
    spo2Label: 'অক্সিজেন SpO2 (%)',
    spo2Guide: 'অক্সিজেন ৯৫ থেকে ১০০ শতাংশ স্বাভাবিক। ৯২ এর নিচে বিপজ্জনক।',
    respLabel: 'শ্বাসের গতি (/min)',
    muacLabel: 'হাতের মাপ MUAC (সেমি)',
    weightLabel: 'ওজন (কেজি)',

    step3Title: 'ধাপ ৩: রোগীর উপসর্গসমূহ',
    symptomsVoiceBadge: 'ভয়েসে চিহ্নিত উপসর্গ:',
    dangerTag: 'বিপদ',

    step4Title: 'ধাপ ৪: ডাক্তারের জন্য ভয়েস নোট',
    voiceMemoSubtitle: 'রোগীর গলার স্বর বা শ্বাস-প্রশ্বাসের শব্দ রেকর্ড করুন',
    recordSoundBtn: 'রোগীর শব্দ রেকর্ড করুন',
    stopRecordBtn: 'রেকর্ডিং বন্ধ করুন',
    audioAttached: 'অডিও নোট যুক্ত হয়েছে',

    runTriageBtn: 'অফলাইন এআই ট্রায়াজ চালান',

    aiAssessmentTitle: 'অন-ডিভাইস এআই মূল্যায়ন রিপোর্ট',
    dangerSignsTitle: 'বিপদ চিহ্ন শনাক্ত হয়েছে:',
    diseaseDistribution: 'রোগের সম্ভাব্য ঝুঁকি (Probability):',
    protocolActionsTitle: 'WHO ও MoHFW প্রোটোকল অনুযায়ী জরুরি পদক্ষেপ:',
    xaiAttribution: 'এআই সিদ্ধান্তের কারণ (XAI):',
    saveToQueueBtn: 'অফলাইন সারিতে সংরক্ষণ করুন (IndexedDB)',
    savedToQueueBtn: '✓ স্থানীয় সারিতে সংরক্ষিত',
    closeBtn: 'বন্ধ করুন',

    doctorStationTitle: 'প্রাথমিক স্বাস্থ্য কেন্দ্র (PHC) ডাক্তার ডেস্ক',
    doctorSubtitle: 'গ্রাম থেকে আসা রেফারেল কেস টেলিমেডিসিনে পর্যালোচনা',
    villageCasesTitle: 'গ্রামের রোগী তালিকা',
    doctorPrescriptionTitle: 'ডাক্তারের পরামর্শ ও প্রেসক্রিপশন',
    addMedicineBtn: 'ওষুধ যোগ করুন',
    signTransmitBtn: 'ডিজিটাল প্রেসক্রিপশনে স্বাক্ষর করুন',

    outbreakTitle: 'গ্রাম মহামারী নজরদারি ও সতর্কতা রাডার',
    outbreakSubtitle: 'উপ-স্বাস্থ্য কেন্দ্র এলাকার জ্বর ও নিউমোনিয়ার ক্লাস্টার বিশ্লেষণ',
    earlyOutbreakDetected: 'প্রাথমিক রোগের প্রাদুর্ভাব শনাক্ত:',
    clusterDensity: 'গ্রামভিত্তিক রোগের ঘনত্ব'
  },

  te: {
    fieldTriage: 'ఫీల్డ్ ట్రయేజ్',
    phcDoctor: 'పీహెచ్‌సీ డాక్టర్',
    outbreakRadar: 'వ్యాధి రాడార్',
    residents: 'గ్రామస్థులు',
    queue: 'ఆఫ్‌లైన్ క్యూ',
    pending: 'పెండింగ్',
    synced: 'సింక్ అయింది',
    syncNow: 'ఇప్పుడే సింక్ చేయండి',
    syncing: 'సింక్ అవుతోంది...',
    ashaBadge: 'ఆశా సంగిని',

    offlineMode: 'గ్రామం ఆఫ్‌లైన్ మోడ్ (ఇంటర్నెట్ లేదు)',
    spottyMode: 'నెమ్మదైన 2G నెట్‌వర్క్ (అస్థిరం)',
    onlineMode: 'వేగవంతమైన 4G/Wi-Fi టెలిమెడిసిన్',
    aiEngineActive: 'AI ఇంజిన్: ఆన్-డివైస్ లోకల్ (0ms పింగ్)',
    storageActive: 'IndexedDB సురక్షిత నిల్వ: సక్రియం',
    simulateNetwork: 'నెట్‌వర్క్ సిమ్యులేటర్:',

    heroTitle: 'ఆరోగ్య సంగిని ఫీల్డ్ ట్రయేజ్',
    heroSubtitle: 'ఇంటర్నెట్ లేని మారుమూల గ్రామాల్లో ఆశా కార్యకర్తల కోసం ఆన్-డివైస్ AI మరియు ఆఫ్‌లైన్ టెలిమెడిసిన్ ప్లాట్‌ఫారమ్.',
    heroTag1: '⚡ 15ms లోకల్ AI ఇన్ఫరెన్స్',
    heroTag2: '🎙️ బహుభాషా వాయిస్ అసిస్టెంట్',
    heroTag3: '📦 IndexedDB ఆటోమేటిక్ క్యూ',

    voiceAssistance: 'వాయిస్ గైడెన్స్ (వాయిస్ సహాయం)',
    speakSymptomsBtn: 'లక్షణాలు మాట్లాడండి',
    listenInstruction: 'సూచనలు వినండి',

    step1Title: 'దశ 1: రోగి గుర్తింపు',
    choosePatient: 'నమోదైన రోగిని ఎంచుకోండి:',
    addNewResident: 'కొత్త నివాసిని జోడించండి',
    quickPresets: 'పరీక్షకు ఉదాహరణలు (Presets):',
    presetChildPneumonia: '🚨 తీవ్రమైన పిల్లల న్యుమోనియా (SpO2 89%)',
    presetPreeclampsia: '⚠️ ప్రీ-ఎక్లాంప్సియా (BP 158/104, తలనొప్పి)',
    presetMalaria: '🦟 మలేరియా జ్వరం (103.2°F, వణుకు)',
    presetDehydration: '💧 తీవ్ర నిర్జలీకరణం (వాంతులు, విరేచనాలు)',

    step2Title: 'దశ 2: రోగి శరీర కొలతలు (Vitals)',
    vitalsSubtitle: 'కిట్ ద్వారా కొలిచిన విలువలను నమోదు చేయండి:',
    tempLabel: 'ఉష్ణోగ్రత (°F)',
    tempGuide: 'సాధారణ ఉష్ణోగ్రత 97 నుండి 99 ఫారెన్‌హీట్. 100.4 దాటితే జ్వరం.',
    pulseLabel: 'నాడి రేటు (BPM)',
    pulseGuide: 'సాధారణ నాడి రేటు నిమిషానికి 60 నుండి 100 స్పందనలు.',
    bpSysLabel: 'రక్తపోటు సిస్టోలిక్ (mmHg)',
    bpDiaLabel: 'రక్తపోటు డయాస్టోలిక్ (mmHg)',
    bpGuide: 'రక్తపోటు 140/90 కంటే ఎక్కువ ఉంటే డాక్టర్ సలహా అవసరం.',
    spo2Label: 'ఆక్సిజన్ SpO2 (%)',
    spo2Guide: 'ఆక్సిజన్ 95 నుండి 100% సాధారణం. 92 కంటే తక్కువ ఉంటే ప్రమాదం.',
    respLabel: 'శ్వాస రేటు (/min)',
    muacLabel: 'చేతి కొలత MUAC (సెం.మీ)',
    weightLabel: 'బరువు (కిలోలు)',

    step3Title: 'దశ 3: రోగి లక్షణాలు',
    symptomsVoiceBadge: 'వాయిస్ ద్వారా గుర్తించిన లక్షణాలు:',
    dangerTag: 'ప్రమాదం',

    step4Title: 'దశ 4: డాక్టర్ కోసం వాయిస్ నోట్',
    voiceMemoSubtitle: 'రోగి గొంతు లేదా శ్వాస శబ్దాన్ని రికార్డ్ చేయండి',
    recordSoundBtn: 'రోగి శబ్దాన్ని రికార్డ్ చేయండి',
    stopRecordBtn: 'రికార్డింగ్ ఆపండి',
    audioAttached: 'ఆడియో నోట్ జతచేయబడింది',

    runTriageBtn: 'ఆఫ్‌లైన్ AI ట్రయేజ్ రన్ చేయండి',

    aiAssessmentTitle: 'ఆన్-డివైస్ AI క్లినికల్ మూల్యాంకనం',
    dangerSignsTitle: 'ప్రమాదకర సంకేతాలు గుర్తించబడ్డాయి:',
    diseaseDistribution: 'వ్యాధి సంభావ్యత (Probability):',
    protocolActionsTitle: 'WHO & MoHFW మార్గదర్శకాల ప్రకారం అత్యవసర చర్యలు:',
    xaiAttribution: 'AI నిర్ణయానికి గల కారణాలు (XAI):',
    saveToQueueBtn: 'ఆఫ్‌లైన్ క్యూలో సేవ్ చేయండి (IndexedDB)',
    savedToQueueBtn: '✓ లోకల్ క్యూలో భద్రపరచబడింది',
    closeBtn: 'మూసివేయండి',

    doctorStationTitle: 'ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) డాక్టర్ స్టేషన్',
    doctorSubtitle: 'గ్రామాల నుండి సింక్ అయిన రోగుల టెలిమెడిసిన్ సమీక్ష',
    villageCasesTitle: 'వచ్చిన రోగుల జాబితా',
    doctorPrescriptionTitle: 'వైద్యుల సలహా మరియు ప్రిస్క్రిప్షన్',
    addMedicineBtn: 'మందులను జోడించండి',
    signTransmitBtn: 'డిజిటల్ ప్రిస్క్రిప్షన్‌ను ఆమోదించండి',

    outbreakTitle: 'గ్రామ వ్యాధుల పర్యవేక్షణ మరియు రాడార్',
    outbreakSubtitle: 'సబ్-సెంటర్ పరిధిలో జ్వరాలు మరియు న్యుమోనియా క్లస్టర్ల విశ్లేషణ',
    earlyOutbreakDetected: 'వ్యాధి వ్యాప్తి గుర్తించబడింది:',
    clusterDensity: 'గ్రామాల వారీగా వ్యాధి సాంద్రత'
  },

  ta: {
    fieldTriage: 'கள பரிசோதனை',
    phcDoctor: 'PHC மருத்துவர்',
    outbreakRadar: 'நோய் கண்காணிப்பு',
    residents: 'கிராம வாசிகள்',
    queue: 'ஆஃப்லைன் வரிசை',
    pending: 'நிலுவையில்',
    synced: 'ஒத்திசைக்கப்பட்டது',
    syncNow: 'இப்போதே ஒத்திசை',
    syncing: 'ஒத்திசைக்கப்படுகிறது...',
    ashaBadge: 'ஆஷா சங்கினி',

    offlineMode: 'கிராம ஆஃப்லைன் முறை (இணையம் இல்லை)',
    spottyMode: 'மந்தமான 2G நெட்வொர்க் (இடையிடையே)',
    onlineMode: 'அதிவேக 4G/Wi-Fi இணைப்பு',
    aiEngineActive: 'AI என்ஜின்: சாதனத்தில் உள்ளூர் (0ms பிங்)',
    storageActive: 'IndexedDB சேமிப்பகம்: செயலில் உள்ளது',
    simulateNetwork: 'நெட்வொர்க் உருவகப்படுத்துதல்:',

    heroTitle: 'ஆரோக்கிய சங்கினி கள பரிசோதனை',
    heroSubtitle: 'இணைய வசதியற்ற கிராமங்களில் ஆஷா பணியாளர்களுக்கான ஆஃப்லைன் AI மற்றும் டெலிமெடிசின் தளம்.',
    heroTag1: '⚡ 15ms உள்ளூர் AI கணிப்பு',
    heroTag2: '🎙️ பலமொழி குரல் உதவியாளர்',
    heroTag3: '📦 IndexedDB தானியங்கி வரிசை',

    voiceAssistance: 'குரல் வழிகாட்டுதல் (Voice Guide)',
    speakSymptomsBtn: 'அறிகுறிகளை பேசுங்கள்',
    listenInstruction: 'வழிகாட்டுதலை கேளுங்கள்',

    step1Title: 'படி 1: நோயாளி விவரம்',
    choosePatient: 'பதிவுசெய்த நோயாளியைத் தேர்வு செய்க:',
    addNewResident: 'புதிய நபரைச் சேர்க்கவும்',
    quickPresets: 'பரிசோதனை மாதிரிகள் (Presets):',
    presetChildPneumonia: '🚨 தீவிர நிமோனியா (SpO2 89%, விலா எலும்பு உள்வாங்குதல்)',
    presetPreeclampsia: '⚠️ கர்ப்பகால உயர் இரத்த அழுத்தம் (BP 158/104)',
    presetMalaria: '🦟 மலேரியா காய்ச்சல் (103.2°F, குளிர் நடுக்கம்)',
    presetDehydration: '💧 கடுமையான நீர்ச்சத்து இழப்பு (வாந்தி, பேதி)',

    step2Title: 'படி 2: உடல் அளவீடுகள் (Vitals)',
    vitalsSubtitle: 'பரிசோதனைக் கருவி மூலம் அளவிடப்பட்டதை உள்ளிடவும்:',
    tempLabel: 'வெப்பநிலை (°F)',
    tempGuide: 'சாதாரண வெப்பநிலை 97 முதல் 99 ஃபாரன்ஹீட். 100.4க்கு மேல் காய்ச்சல்.',
    pulseLabel: 'நாடித் துடிப்பு (BPM)',
    pulseGuide: 'சாதாரண நாடித் துடிப்பு நிமிடத்திற்கு 60 முதல் 100 வரை.',
    bpSysLabel: 'இரத்த அழுத்தம் சிஸ்டாலிக் (mmHg)',
    bpDiaLabel: 'இரத்த அழுத்தம் டயஸ்டாலிக் (mmHg)',
    bpGuide: 'இரத்த அழுத்தம் 140/90க்கு மேல் இருந்தால் மருத்துவரை அணுக வேண்டும்.',
    spo2Label: 'ஆக்ஸிஜன் SpO2 (%)',
    spo2Guide: 'ஆக்ஸிஜன் 95 முதல் 100% வரை சாதாரணமானது. 92க்கு கீழ் ஆபத்தானது.',
    respLabel: 'சுவாச வீதம் (/min)',
    muacLabel: 'கையின் சுற்றளவு MUAC (செ.மீ)',
    weightLabel: 'எடை (கிலோ)',

    step3Title: 'படி 3: நோயாளியின் அறிகுறிகள்',
    symptomsVoiceBadge: 'குரல் மூலம் கண்டறியப்பட்ட அறிகுறிகள்:',
    dangerTag: 'ஆபத்து',

    step4Title: 'படி 4: மருத்துவருக்கான குரல் பதிவு',
    voiceMemoSubtitle: 'நோயாளி அல்லது குழந்தையின் சுவாச ஒலியை பதிவு செய்யவும்',
    recordSoundBtn: 'குரல் பதிவு செய்க',
    stopRecordBtn: 'பதிவை நிறுத்துக',
    audioAttached: 'ஆடியோ பதிவு இணைக்கப்பட்டது',

    runTriageBtn: 'ஆஃப்லைன் AI பரிசோதனையைத் தொடங்கு',

    aiAssessmentTitle: 'சாதன AI மருத்துவ அறிக்கை',
    dangerSignsTitle: 'கண்டறியப்பட்ட ஆபத்து அறிகுறிகள்:',
    diseaseDistribution: 'நோய் ஆபத்து சதவீதம் (Probability):',
    protocolActionsTitle: 'WHO மற்றும் MoHFW நெறிமுறைப்படி அவசர நடவடிக்கைகள்:',
    xaiAttribution: 'AI முடிவிற்கான காரணங்கள் (XAI):',
    saveToQueueBtn: 'ஆஃப்லைன் வரிசையில் சேமி (IndexedDB)',
    savedToQueueBtn: '✓ உள்ளூரில் பாதுகாப்பாக சேமிக்கப்பட்டது',
    closeBtn: 'மூடுக',

    doctorStationTitle: 'ஆரம்ப சுகாதார நிலைய (PHC) மருத்துவர் மேசை',
    doctorSubtitle: 'கிராமங்களில் இருந்து ஒத்திசைக்கப்பட்ட நோயாளிகளின் டெலிமெடிசின் பரிசீலனை',
    villageCasesTitle: 'கிராம நோயாளி பட்டியல்',
    doctorPrescriptionTitle: 'மருத்துவரின் ஆலோசனை & மருந்துச் சீட்டு',
    addMedicineBtn: 'மருந்து சேர்க்க',
    signTransmitBtn: 'டிஜிட்டல் மருந்துச் சீட்டில் கையொப்பமிடு',

    outbreakTitle: 'கிராம நோய் கண்காணிப்பு & எச்சரிக்கை ராடார்',
    outbreakSubtitle: 'காய்ச்சல் மற்றும் நிமோனியா பரவலைக் கண்டறியும் பகுப்பாய்வு',
    earlyOutbreakDetected: 'நோய் பரவல் எச்சரிக்கை:',
    clusterDensity: 'கிராம வாரியாக நோய் தீவிரம்'
  },

  mr: {
    fieldTriage: 'फील्ड ट्रायज',
    phcDoctor: 'पीएचसी डॉक्टर',
    outbreakRadar: 'महामारी रडार',
    residents: 'ग्रामस्थ',
    queue: 'ऑफलाइन रांग',
    pending: 'प्रलंबित',
    synced: 'सिंक झाले',
    syncNow: 'आता सिंक करा',
    syncing: 'सिंक होत आहे...',
    ashaBadge: 'आशा संगिनी',

    offlineMode: 'गाव ऑफलाइन मोड (इंटरनेट नाही)',
    spottyMode: 'अस्थिर 2G नेटवर्क (थांबून चालणारे)',
    onlineMode: 'हाय-स्पीड 4G/वाय-फाय लिंक',
    aiEngineActive: 'एआय मॉडेल: ऑन-डिव्हाइस स्थानिक (0ms पिंग)',
    storageActive: 'IndexedDB सुरक्षित साठवणूक: सक्रिय',
    simulateNetwork: 'नेटवर्क सिम्युलेटर:',

    heroTitle: 'आरोग्य संगिनी फील्ड ट्रायज',
    heroSubtitle: 'इंटरनेट नसलेल्या दुर्गम भागात आशा आणि अंगणवाडी सेविकांसाठी ऑन-डिव्हाइस एआय आणि ऑफलाइन टेलिमेडिसिन प्लॅटफॉर्म.',
    heroTag1: '⚡ १५ मिलीसेकंदात स्थानिक एआय',
    heroTag2: '🎙️ बहुभाषिक आवाज सहाय्यक',
    heroTag3: '📦 IndexedDB स्वयंचलित रांग',

    voiceAssistance: 'आवाज मार्गदर्शन (Voice Guidance)',
    speakSymptomsBtn: 'बोलून लक्षणे नोंदवा',
    listenInstruction: 'सूचना ऐका',

    step1Title: 'टप्पा १: रुग्णाची ओळख',
    choosePatient: 'नोंदणीकृत रुग्ण निवडा:',
    addNewResident: 'नवीन नागरिक जोडा',
    quickPresets: 'चाचणीसाठी उदाहरणे (Presets):',
    presetChildPneumonia: '🚨 बालकाचा तीव्र न्यूमोनिया (SpO2 89%, छाती आत ओढणे)',
    presetPreeclampsia: '⚠️ प्री-एक्लॅम्पसिया (BP 158/104, तीव्र डोकेदुखी)',
    presetMalaria: '🦟 संशयित हिवताप/मलेरिया (103.2°F, थंडी वाजणे)',
    presetDehydration: '💧 तीव्र डिहायड्रेशन (उलट्या व जुलाब)',

    step2Title: 'टप्पा २: रुग्णाची शारीरिक लक्षणे (Vitals)',
    vitalsSubtitle: 'तपासणी किटमधून मिळालेले मूल्य नोंदवा:',
    tempLabel: 'तापमान (°F)',
    tempGuide: 'सामान्य तापमान ९७ ते ९९ फॅरेनहाइट असते. १००.४ च्या वर ताप मानला जातो.',
    pulseLabel: 'नाडीचे ठोके (BPM)',
    pulseGuide: 'सामान्य नाडीचे ठोके दर मिनिटाला ६० ते १०० असतात.',
    bpSysLabel: 'रक्तदाब सिस्टोलिक (mmHg)',
    bpDiaLabel: 'रक्तदाब डायस्टोलिक (mmHg)',
    bpGuide: 'रक्तदाब १४०/९० च्या वर गेल्यास डॉक्टरांचा सल्ला आवश्यक आहे.',
    spo2Label: 'ऑक्सिजन SpO2 (%)',
    spo2Guide: 'ऑक्सिजन ९५ ते १००% सामान्य असते. ९२ च्या खाली धोकादायक आहे.',
    respLabel: 'श्वसन दर (/min)',
    muacLabel: 'दंडाचा घेर MUAC (सेमी)',
    weightLabel: 'वजन (किलो)',

    step3Title: 'टप्पा ३: रुग्णाची लक्षणे',
    symptomsVoiceBadge: 'आवाजाद्वारे ओळखलेली लक्षणे:',
    dangerTag: 'धोका',

    step4Title: 'टप्पा ४: डॉक्टरांसाठी व्हॉइस नोट',
    voiceMemoSubtitle: 'रुग्णाचा आवाज किंवा श्वासाचा आवाज रेकॉर्ड करा',
    recordSoundBtn: 'रुग्णाचा आवाज रेकॉर्ड करा',
    stopRecordBtn: 'रेकॉर्डिंग थांबवा',
    audioAttached: 'ऑडिओ नोट जोडली गेली',

    runTriageBtn: 'ऑफलाइन एआय ट्रायज चालवा',

    aiAssessmentTitle: 'ऑन-डिव्हाइस एआय वैद्यकीय विश्लेषण',
    dangerSignsTitle: 'धोक्याची लक्षणे आढळली:',
    diseaseDistribution: 'संभाव्य आजार धोका (Probability):',
    protocolActionsTitle: 'WHO आणि MoHFW प्रोटोकॉलनुसार तातडीची पावले:',
    xaiAttribution: 'एआय निर्णयाची कारणे (XAI):',
    saveToQueueBtn: 'ऑफलाइन रांगेत जतन करा (IndexedDB)',
    savedToQueueBtn: '✓ स्थानिक रांगेत सुरक्षित जतन केले',
    closeBtn: 'बंद करा',

    doctorStationTitle: 'प्राथमिक आरोग्य केंद्र (PHC) डॉक्टर डेस्क',
    doctorSubtitle: 'गावांतून सिंक झालेल्या रुग्णांचे टेलिमेडिसिन परीक्षण',
    villageCasesTitle: 'आलेल्या रुग्णांची यादी',
    doctorPrescriptionTitle: 'डॉक्टरांचा सल्ला आणि ई-प्रिस्क्रिप्शन',
    addMedicineBtn: 'औषध जोडा',
    signTransmitBtn: 'स्वाक्षरी करा आणि डिजिटल चिठ्ठी पाठवा',

    outbreakTitle: 'गाव साथरोग नियंत्रण व रडार',
    outbreakSubtitle: 'उपकेंद्र कार्यक्षेत्रातील ताप आणि न्यूमोनियाच्या क्लस्टरचे विश्लेषण',
    earlyOutbreakDetected: 'साथरोगाचा प्राथमिक इशारा:',
    clusterDensity: 'गावानुसार आजारांची घनता'
  }
};

/**
 * Helper to get translated string by key and current language
 */
export function getTranslation(key, langCode = 'hi-IN') {
  const langKey = langCode ? langCode.split('-')[0] : 'hi';
  const dict = TRANSLATIONS[langKey] || TRANSLATIONS.hi || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

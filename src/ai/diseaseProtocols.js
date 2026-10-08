// WHO IMCI & India MoHFW Clinical Protocols for Rural ASHA/ANM Triage
// Comprehensive multilingual symptom catalog for Hindi, English, Bengali, Telugu, Tamil, Marathi

export const SYMPTOMS_CATALOG = [
  // Respiratory
  {
    id: 'cough',
    name: 'Cough',
    hindi: 'खांसी',
    bengali: 'কাশি',
    telugu: 'దగ్గు',
    tamil: 'இருமல்',
    marathi: 'खोकला',
    category: 'respiratory'
  },
  {
    id: 'fast_breathing',
    name: 'Rapid Breathing',
    hindi: 'तेज सांस चलना',
    bengali: 'দ্রুত শ্বাস নেওয়া',
    telugu: 'వేగంగా శ్వాస తీసుకోవడం',
    tamil: 'வேகமான சுவாசம்',
    marathi: 'जलद श्वास घेणे',
    category: 'respiratory'
  },
  {
    id: 'chest_indrawing',
    name: 'Chest Wall Indrawing',
    hindi: 'छाती का अंदर धंसना (पसलियां चलना)',
    bengali: 'বুকের খাঁচা ডেবে যাওয়া (পাঁজর টানা)',
    telugu: 'ఛాతీ లోపలికి లాగడం (పక్కటెముకలు ఆడటం)',
    tamil: 'விலா எலும்பு உள்வாங்குதல்',
    marathi: 'छाती आत ओढणे (बरगड्या उडणे)',
    category: 'respiratory',
    isCritical: true
  },
  {
    id: 'shortness_of_breath',
    name: 'Shortness of Breath',
    hindi: 'सांस फूलना / सांस में तकलीफ',
    bengali: 'শ্বাসকষ্ট / দম বন্ধ ভাব',
    telugu: 'శ్వాస తీసుకోవడంలో ఇబ్బంది / ఆయాసం',
    tamil: 'மூச்சுத்திணறல்',
    marathi: 'दम लागणे / श्वास घेण्यास त्रास',
    category: 'respiratory',
    isCritical: true
  },
  {
    id: 'wheezing_stridor',
    name: 'Stridor / Wheezing',
    hindi: 'सीटी जैसी आवाज आना (घरघराहट)',
    bengali: 'ঘড়ঘড় বা বাঁশির মতো শব্দ',
    telugu: 'శ్వాసలో పిల్లికూతలు లేదా శబ్దం',
    tamil: 'மூச்சில் விசில் சத்தம்',
    marathi: 'श्वासात शिटीसारखा आवाज',
    category: 'respiratory'
  },

  // Gastrointestinal & Dehydration
  {
    id: 'watery_diarrhea',
    name: 'Watery Diarrhea (>3 times)',
    hindi: 'पानी जैसे पतले दस्त',
    bengali: 'জলের মতো পাতলা পায়খানা',
    telugu: 'నీళ్ల విరేచనాలు (>3 సార్లు)',
    tamil: 'நீரான வயிற்றுப்போக்கு',
    marathi: 'पाण्यासारखे पातळ जुलाब',
    category: 'gastro'
  },
  {
    id: 'vomiting',
    name: 'Vomiting Everything',
    hindi: 'बार-बार उल्टी होना',
    bengali: 'বারবার বমি হওয়া',
    telugu: 'అన్నింటినీ వాంతి చేసుకోవడం',
    tamil: 'தொடர் வாந்தி',
    marathi: 'वारंवार उलट्या होणे',
    category: 'gastro',
    isCritical: true
  },
  {
    id: 'sunken_eyes',
    name: 'Sunken Eyes',
    hindi: 'आंखें धंसी होना',
    bengali: 'চোখ ভেতরে ঢুকে যাওয়া',
    telugu: 'కళ్ళు లోతుకు పోవడం',
    tamil: 'கண்கள் குழிவிழுதல்',
    marathi: 'डोळे खोल जाणे',
    category: 'gastro'
  },
  {
    id: 'slow_skin_pinch',
    name: 'Skin Pinch Goes Back Slowly',
    hindi: 'चमड़ी का चुटकी धीरे-धीरे वापस जाना',
    bengali: 'চামড়ার চিমটি ধীরে ফেরা (ডিহাইড্রেশন)',
    telugu: 'చర్మం నెమ్మదిగా వెనుకకు వెళ్లడం',
    tamil: 'தோல் சுருக்கம் மெதுவாக திரும்புதல்',
    marathi: 'त्वचा हळूच पूर्वस्थितीत येणे',
    category: 'gastro',
    isCritical: true
  },
  {
    id: 'extreme_thirst',
    name: 'Drinking Eagerly / Unable to Drink',
    hindi: 'बहुत प्यास लगना या बिल्कुल न पी पाना',
    bengali: 'অতিরিক্ত তৃষ্ণা বা একেবারেই খেতে না পারা',
    telugu: 'తీవ్రమైన దాహం లేదా తాగలేకపోవడం',
    tamil: 'அதிக தாகம் அல்லது குடிக்க முடியாமை',
    marathi: 'खूप तहान लागणे किंवा पिता न येणे',
    category: 'gastro'
  },

  // Febrile & Vector-Borne
  {
    id: 'high_fever',
    name: 'High Fever (>101°F / >3 days)',
    hindi: 'तेज बुखार (3 दिन से अधिक)',
    bengali: 'তীব্র জ্বর (৩ দিনের বেশি)',
    telugu: 'తీవ్ర జ్వరం (>101°F / 3 రోజుల పైబడి)',
    tamil: 'அதிக காய்ச்சல் (>3 நாட்கள்)',
    marathi: 'तीव्र ताप (३ दिवसांपेक्षा जास्त)',
    category: 'febrile'
  },
  {
    id: 'chills_rigors',
    name: 'Shaking Chills / Rigors',
    hindi: 'कंपकंपी के साथ बुखार (हिवताप)',
    bengali: 'কাঁপুনি দিয়ে জ্বর',
    telugu: 'వణుకుతో కూడిన జ్వరం',
    tamil: 'நடுக்கத்துடன் கூடிய காய்ச்சல்',
    marathi: 'थंडी वाजून ताप भरणे',
    category: 'febrile'
  },
  {
    id: 'joint_pain',
    name: 'Severe Joint & Body Pain',
    hindi: 'हड्डियों और जोड़ों में तेज दर्द',
    bengali: 'গাঁটে গাঁটে ও শরীরে তীব্র ব্যথা',
    telugu: 'కీళ్ల నొప్పులు మరియు తీవ్రమైన ఒంటి నొప్పులు',
    tamil: 'கடுமையான மூட்டு மற்றும் உடல் வலி',
    marathi: 'सांधे आणि अंगदुखी',
    category: 'febrile'
  },
  {
    id: 'petechiae_rash',
    name: 'Red Spots / Bleeding Rash',
    hindi: 'शरीर पर लाल चकत्ते या खून का रिसाव',
    bengali: 'শরীরে লাল দাগ বা রক্তক্ষরণ র্যাশ',
    telugu: 'శరీరంపై ఎర్రటి మచ్చలు లేదా రక్తపు చారలు',
    tamil: 'தோலில் சிவப்பு புள்ளிகள் / இரத்தக் கசிவு',
    marathi: 'अंगावर लाल डाग किंवा रक्तस्राव',
    category: 'febrile',
    isCritical: true
  },

  // Maternal & Obstetric
  {
    id: 'severe_headache',
    name: 'Severe Persistent Headache',
    hindi: 'सिर में असहनीय तेज दर्द',
    bengali: 'মাথায় অসহ্য তীব্র যন্ত্রণা',
    telugu: 'తీవ్రమైన నిరంతర తలనొప్పి',
    tamil: 'கடுமையான தலைவலி',
    marathi: 'असह्य तीव्र डोकेदुखी',
    category: 'maternal',
    isCritical: true
  },
  {
    id: 'blurred_vision',
    name: 'Blurred Vision / Spots',
    hindi: 'आंखों के सामने धुंधला दिखना',
    bengali: 'চোখে ঝাপসা দেখা বা অন্ধকার আসা',
    telugu: 'కళ్ళు మసకబారడం / చీకట్లు కమ్మడం',
    tamil: 'பார்வை மங்குதல்',
    marathi: 'डोळ्यांसमोर अंधारी येणे किंवा अस्पष्ट दिसणे',
    category: 'maternal',
    isCritical: true
  },
  {
    id: 'face_swelling',
    name: 'Swelling of Face & Hands',
    hindi: 'चेहरे और हाथों में सूजन',
    bengali: 'মুখ ও হাতে ফোলাভাব',
    telugu: 'ముఖం మరియు చేతులు వాపు రావడం',
    tamil: 'முகம் மற்றும் கைகளில் வீக்கம்',
    marathi: 'चेहऱ्यावर आणि हातांवर सूज',
    category: 'maternal'
  },
  {
    id: 'vaginal_bleeding',
    name: 'Vaginal Bleeding in Pregnancy',
    hindi: 'गर्भावस्था में रक्तस्राव (ब्लीडिंग)',
    bengali: 'গর্ভাবস্থায় রক্তক্ষরণ',
    telugu: 'గర్భధారణ సమయంలో రక్తస్రావం',
    tamil: 'கர்ப்ப காலத்தில் இரத்தப்போக்கு',
    marathi: 'गरोदरपणात रक्तस्राव',
    category: 'maternal',
    isCritical: true
  },
  {
    id: 'severe_abdo_pain',
    name: 'Severe Lower Abdominal Pain',
    hindi: 'पेट के निचले हिस्से में तीव्र दर्द',
    bengali: 'তলপেটে তীব্র অসহ্য যন্ত্রণা',
    telugu: 'పొత్తికడుపులో తీవ్రమైన నొప్పి',
    tamil: 'அடிவயிற்றில் கடுமையான வலி',
    marathi: 'पोटाच्या खालच्या भागात तीव्र वेदना',
    category: 'maternal',
    isCritical: true
  },

  // Neurological & Danger Signs
  {
    id: 'convulsions',
    name: 'Convulsions / Fits',
    hindi: 'दौरे / झटके आना',
    bengali: 'খিঁচুনি বা মূর্ছা যাওয়া',
    telugu: 'ఫిట్స్ లేదా మూర్ఛ రావడం',
    tamil: 'வலிப்பு / இழுப்பு',
    marathi: 'फेफरे किंवा झटके येणे',
    category: 'danger',
    isCritical: true
  },
  {
    id: 'lethargy_unconscious',
    name: 'Lethargic / Unconscious',
    hindi: 'अत्यधिक सुस्ती / बेहोशी',
    bengali: 'চরম নিস্তেজ ভাব বা অজ্ঞান হয়ে পড়া',
    telugu: 'తీవ్రమైన నిస్సత్తువ లేదా స్పృహ తప్పడం',
    tamil: 'தீவிர சோர்வு / சுயநினைவின்மை',
    marathi: 'अतिशय सुस्ती किंवा बेशुद्धावस्था',
    category: 'danger',
    isCritical: true
  },
  {
    id: 'stiff_neck',
    name: 'Stiff Neck',
    hindi: 'गर्दन में अकड़न',
    bengali: 'ঘাড় শক্ত হয়ে যাওয়া',
    telugu: 'మెడ బిగుసుకుపోవడం',
    tamil: 'கழுத்து விரைப்பு',
    marathi: 'मान ताठ होणे किंवा आखडणे',
    category: 'danger',
    isCritical: true
  },
  {
    id: 'refusing_feed',
    name: 'Unable to Breastfeed / Eat',
    hindi: 'स्तनपान या खाना-पीना न कर पाना',
    bengali: 'মায়ের দুধ বা খাবার খেতে না পারা',
    telugu: 'తల్లిపాలు తాగలేకపోవడం లేదా తినలేకపోవడం',
    tamil: 'தாய்ப்பால் அல்லது உணவு உட்கொள்ள முடியாமை',
    marathi: 'स्तनपान किंवा खाणे-पिणे बंद होणे',
    category: 'danger',
    isCritical: true
  },
  {
    id: 'bilateral_edema',
    name: 'Swelling in Both Feet (Edema)',
    hindi: 'दोनों पैरों में गड्ढा पड़ने वाली सूजन',
    bengali: 'দুই পায়েই গর্ত হওয়া ফোলা',
    telugu: 'రెండు కాళ్లలో గుంతలు పడే వాపు',
    tamil: 'இரு கால்களிலும் குழிவீக்கம்',
    marathi: 'दोन्ही पायांवर खड्डा पडणारी सूज',
    category: 'danger'
  }
];

/**
 * Returns localized name of a symptom based on language code
 */
export function getLocalizedSymptomName(symptom, langCode = 'hi-IN') {
  if (!symptom) return '';
  const langKey = langCode.split('-')[0];
  switch (langKey) {
    case 'hi': return symptom.hindi || symptom.name;
    case 'bn': return symptom.bengali || symptom.name;
    case 'te': return symptom.telugu || symptom.name;
    case 'ta': return symptom.tamil || symptom.name;
    case 'mr': return symptom.marathi || symptom.name;
    case 'en': default: return symptom.name;
  }
}

// Clinical guidelines and protocols
export const PROTOCOLS_KNOWLEDGE = {
  PNEUMONIA: {
    name: 'Severe Acute Pneumonia',
    hindiName: 'गंभीर निमोनिया (श्वसन संक्रमण)',
    whoCriteria: 'Cough or difficulty breathing + Chest indrawing OR Fast breathing (≥50/min for 2-11m, ≥40/min for 1-5y) OR SpO2 < 92%',
    immediateSteps: [
      'Give 1st dose oral Amoxicillin dispersible tablet (if trained) before referral',
      'If wheezing present, give rapid-acting bronchodilator puff',
      'Keep child warm (Kangaroo Mother Care wrapping) during transport',
      'Immediate referral to Community Health Centre (CHC) or District Hospital'
    ]
  },
  DEHYDRATION: {
    name: 'Severe Dehydration / Acute Diarrhea',
    hindiName: 'गंभीर निर्जलीकरण (गंभीर डिहाइड्रेशन)',
    whoCriteria: 'Two of: Lethargy/unconsciousness, Sunken eyes, Unable to drink, Skin pinch goes back very slowly (>2 sec)',
    immediateSteps: [
      'Start Oral Rehydration Solution (ORS) immediately: 1 packet in 1 liter clean drinking water',
      'Administer Zinc Dispersible Tablet (20mg daily for 14 days, 10mg for <6 months)',
      'If child cannot drink or is lethargic, refer urgently for IV Ringer Lactate',
      'Continue frequent breastfeeding'
    ]
  },
  PREECLAMPSIA: {
    name: 'Severe Pre-eclampsia / Eclampsia',
    hindiName: 'गंभीर प्री-एक्लेम्पसिया (गर्भावस्था में उच्च रक्तचाप)',
    whoCriteria: 'Pregnant woman (>20 weeks) with BP ≥ 140/90 mmHg + Headache/Visual blurring/Epigastric pain/Edema',
    immediateSteps: [
      'Keep patient on Left Lateral position to protect fetal oxygenation',
      'Do not give oral fluids if drowsy or post-convulsive',
      'Call 108 Emergency Ambulance immediately for FRU transfer',
      'Alert Medical Officer for Loading Dose of Magnesium Sulfate (4g IV + 10g IM)'
    ]
  },
  MALARIA_DENGUE: {
    name: 'Severe Febrile Illness (Malaria / Dengue)',
    hindiName: 'मलेरिया / डेंगू / तीव्र मौसमी ज्वर',
    whoCriteria: 'Fever with chills, severe body ache, petechiae rash, or fever > 3 days in endemic rural zone',
    immediateSteps: [
      'Perform dual Pf/Pv Malaria Rapid Diagnostic Test (RDT) with finger prick blood',
      'Tepid sponging with room-temperature water (never cold ice water)',
      'Paracetamol 500mg TDS for adults (10-15 mg/kg for children). AVOID ASPIRIN/IBUPROFEN due to Dengue hemorrhage risk',
      'Ensure high fluid intake (Coconut water, lemon water, ORS, dal water)'
    ]
  },
  SAM: {
    name: 'Severe Acute Malnutrition (SAM)',
    hindiName: 'गंभीर तीव्र कुपोषण (सैम)',
    whoCriteria: 'MUAC < 11.5 cm (Red band on Shakir strip) OR Bilateral pitting edema of feet',
    immediateSteps: [
      'Test appetite with Ready-to-Use Therapeutic Food (RUTF) / therapeutic milk',
      'Keep infant warm to prevent hypothermia',
      'Refer to Nutrition Rehabilitation Centre (NRC) at District Hospital',
      'Administer single dose Vitamin A if indicated'
    ]
  }
};

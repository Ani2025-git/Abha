import Dexie from 'dexie';

export const db = new Dexie('AarogyaSanginiDB');

// Define database schema
db.version(1).stores({
  patients: '++id, abhaId, name, village, isPregnant, isChildUnder5, createdAt',
  triageRecords: '++id, patientId, syncStatus, createdAt, [syncStatus+createdAt]',
  syncQueue: '++id, recordId, status, retryCount, createdAt',
  appSettings: 'id'
});

// Seed data function for rural village demonstration
export async function seedInitialData() {
  const patientCount = await db.patients.count();
  if (patientCount > 0) return;

  console.log('[DB] Seeding initial village patient data...');

  const samplePatients = [
    {
      abhaId: '91-8472-1092-3841',
      name: 'Rekha Devi',
      age: 26,
      gender: 'female',
      village: 'Rampur Kalan',
      phone: '+91 98765 43210',
      isPregnant: true,
      trimester: 3,
      isChildUnder5: false,
      bloodGroup: 'B+',
      createdAt: Date.now() - 86400000 * 3,
      updatedAt: Date.now() - 86400000 * 3
    },
    {
      abhaId: '91-5612-4491-0028',
      name: 'Aarav Kumar (Baby)',
      age: 2,
      gender: 'male',
      village: 'Rampur Kalan',
      phone: '+91 98234 11223',
      isPregnant: false,
      trimester: 0,
      isChildUnder5: true,
      bloodGroup: 'O+',
      createdAt: Date.now() - 86400000 * 2,
      updatedAt: Date.now() - 86400000 * 2
    },
    {
      abhaId: '91-3091-7721-5519',
      name: 'Mangal Singh',
      age: 58,
      gender: 'male',
      village: 'Sonbarsa',
      phone: '+91 94123 78901',
      isPregnant: false,
      trimester: 0,
      isChildUnder5: false,
      bloodGroup: 'A+',
      createdAt: Date.now() - 86400000 * 5,
      updatedAt: Date.now() - 86400000 * 5
    },
    {
      abhaId: '91-9982-3104-6721',
      name: 'Pooja Kumari',
      age: 19,
      gender: 'female',
      village: 'Sonbarsa',
      phone: '+91 97120 44556',
      isPregnant: false,
      trimester: 0,
      isChildUnder5: false,
      bloodGroup: 'AB+',
      createdAt: Date.now() - 86400000 * 1,
      updatedAt: Date.now() - 86400000 * 1
    }
  ];

  const patientIds = await db.patients.bulkAdd(samplePatients, { allKeys: true });

  // Add initial triage records (one synced, two pending offline sync to demonstrate the queue!)
  const sampleTriages = [
    {
      patientId: patientIds[0],
      patientName: 'Rekha Devi',
      patientAge: 26,
      patientGender: 'female',
      village: 'Rampur Kalan',
      vitals: {
        tempF: 99.1,
        pulse: 98,
        bpSystolic: 155,
        bpDiastolic: 102,
        spo2: 97,
        respRate: 22,
        bloodSugar: 110,
        muac: 24,
        weight: 58
      },
      symptoms: ['severe_headache', 'blurred_vision', 'face_swelling', 'dizziness'],
      symptomSeverity: { severe_headache: 'severe', blurred_vision: 'moderate' },
      chiefComplaintVoice: 'सिर में बहुत तेज दर्द है और आंखों के सामने अंधेरा छा रहा है (Severe headache and visual blurring reported in 3rd trimester)',
      aiAssessment: {
        urgency: 'RED',
        urgencyLabel: 'EMERGENCY - High Risk Pregnancy / Pre-eclampsia',
        topConditions: [
          { name: 'Severe Pre-eclampsia in 3rd Trimester', probability: 94, severity: 'critical', explanation: 'BP 155/102 with severe persistent headache & blurred vision indicates impending eclampsia danger.' },
          { name: 'Gestational Hypertension', probability: 88, severity: 'high', explanation: 'Diastolic BP > 90 in pregnancy warrants immediate obstetrician evaluation.' }
        ],
        dangerSignsDetected: ['Systolic BP ≥ 140 / Diastolic ≥ 90', 'Visual disturbance / blurred vision', 'Facial & pedal edema'],
        cdssActions: [
          'Immediate referral to First Referral Unit (FRU / District Hospital)',
          'Position patient on left lateral tilt to improve placental perfusion',
          'Keep airway clear and arrange 108 Emergency Ambulance',
          'Alert PHC Medical Officer for IV Magnesium Sulfate protocol if convulsions occur'
        ],
        inferenceLatencyMs: 14
      },
      syncStatus: 'pending_sync',
      syncedAt: null,
      syncAttempts: 0,
      doctorConsultation: {
        doctorName: '',
        doctorRegNo: '',
        status: 'awaiting_review',
        notes: '',
        prescription: [],
        reviewedAt: null
      },
      createdAt: Date.now() - 3600000 * 2 // 2 hours ago
    },
    {
      patientId: patientIds[1],
      patientName: 'Aarav Kumar (Baby)',
      patientAge: 2,
      patientGender: 'male',
      village: 'Rampur Kalan',
      vitals: {
        tempF: 102.4,
        pulse: 138,
        bpSystolic: 85,
        bpDiastolic: 55,
        spo2: 91,
        respRate: 48,
        bloodSugar: 82,
        muac: 11.2,
        weight: 8.5
      },
      symptoms: ['chest_indrawing', 'fast_breathing', 'high_fever', 'refusing_feed'],
      symptomSeverity: { chest_indrawing: 'severe', fast_breathing: 'severe' },
      chiefComplaintVoice: 'बच्चा 2 दिन से बहुत तेज सांस ले रहा है, छाती अंदर धंस रही है और दूध नहीं पी रहा (Chest indrawing and rapid respiration in 2yo child)',
      aiAssessment: {
        urgency: 'RED',
        urgencyLabel: 'EMERGENCY - Severe Acute Pneumonia & Malnutrition',
        topConditions: [
          { name: 'Severe Pediatric Pneumonia (WHO IMCI)', probability: 96, severity: 'critical', explanation: 'Resp rate 48 bpm in 2yo child with lower chest wall indrawing and SpO2 91% confirms severe pneumonia.' },
          { name: 'Severe Acute Malnutrition (SAM risk)', probability: 78, severity: 'high', explanation: 'MUAC 11.2 cm is below the critical 11.5 cm red threshold on Shakir strip.' }
        ],
        dangerSignsDetected: ['Lower chest wall indrawing', 'Stridor / SpO2 < 92%', 'Unable to feed / drink', 'MUAC < 11.5 cm'],
        cdssActions: [
          'Immediate transfer to District Special Newborn Care Unit (SNCU / MTC)',
          'Administer 1st dose oral Amoxicillin dispersible tablet as per IMCI guidelines before transport',
          'Keep infant warm during transport with Kangaroo Mother Care wrapping',
          'Clear nostrils with gentle saline drops if obstructed'
        ],
        inferenceLatencyMs: 11
      },
      syncStatus: 'pending_sync',
      syncedAt: null,
      syncAttempts: 0,
      doctorConsultation: {
        doctorName: '',
        doctorRegNo: '',
        status: 'awaiting_review',
        notes: '',
        prescription: [],
        reviewedAt: null
      },
      createdAt: Date.now() - 3600000 * 4 // 4 hours ago
    },
    {
      patientId: patientIds[2],
      patientName: 'Mangal Singh',
      patientAge: 58,
      gender: 'male',
      village: 'Sonbarsa',
      vitals: {
        tempF: 101.8,
        pulse: 104,
        bpSystolic: 128,
        bpDiastolic: 82,
        spo2: 96,
        respRate: 19,
        bloodSugar: 135,
        muac: 26,
        weight: 62
      },
      symptoms: ['high_fever', 'chills_rigors', 'joint_pain', 'sweating'],
      symptomSeverity: { chills_rigors: 'severe', high_fever: 'moderate' },
      chiefComplaintVoice: 'कांप के बुखार आता है और सारा बदन दुखता है (Cyclical high fever with shaking chills and severe arthralgia)',
      aiAssessment: {
        urgency: 'YELLOW',
        urgencyLabel: 'URGENT - Suspected Vector-Borne Infection (Malaria/Dengue)',
        topConditions: [
          { name: 'Plasmodium Falciparum / Vivax Malaria', probability: 89, severity: 'urgent', explanation: 'Classic triad of cyclical fever, shaking rigors, and sweating paroxysm in endemic rural zone.' },
          { name: 'Acute Dengue Fever', probability: 64, severity: 'moderate', explanation: 'Severe myalgia/arthralgia with elevated fever profile.' }
        ],
        dangerSignsDetected: ['Persistent high fever > 101°F with rigors', 'Severe joint pain'],
        cdssActions: [
          'Perform on-site Malaria Rapid Diagnostic Test (RDT) with blood prick',
          'Paracetamol 500mg every 6 hours for temperature control; strictly avoid Aspirin/Ibuprofen if Dengue suspected',
          'Ensure continuous hydration with boiled cooled water and electrolytes',
          'Refer to PHC laboratory for peripheral blood smear and platelet count within 24h'
        ],
        inferenceLatencyMs: 9
      },
      syncStatus: 'synced',
      syncedAt: Date.now() - 3600000 * 24,
      syncAttempts: 1,
      doctorConsultation: {
        doctorName: 'Dr. Priya Sharma, MBBS, MD',
        doctorRegNo: 'MCI-88234-PHC',
        status: 'reviewed',
        notes: 'Advised RDT on-site. If Pf positive, initiate Artemisinin Combination Therapy (ACT). Complete 3-day course. Re-check hemoglobin in 1 week.',
        prescription: [
          { medicine: 'Tab. Paracetamol 500mg', dosage: '1 tab TDS after food', duration: '3 days', instructions: 'For fever' },
          { medicine: 'Tab. ACT (Artesunate + SP)', dosage: 'Day 1: 4 tabs, Day 2: 4 tabs, Day 3: 4 tabs', duration: '3 days', instructions: 'Take only if RDT is positive' },
          { medicine: 'ORS Solution', dosage: '1-2 Liters daily', duration: '5 days', instructions: 'Maintain hydration' }
        ],
        reviewedAt: Date.now() - 3600000 * 22
      },
      createdAt: Date.now() - 3600000 * 26
    }
  ];

  await db.triageRecords.bulkAdd(sampleTriages);

  // Initialize settings
  await db.appSettings.put({
    id: 'global',
    currentLanguage: 'hi', // Hindi default for ASHA
    voicePromptsEnabled: true,
    simulatedNetwork: 'offline', // Default to offline to demonstrate offline-first architecture!
    autoSyncEnabled: true,
    workerName: 'Sunita Devi (ASHA Sangini)',
    workerCenter: 'Rampur Sub-Health Centre (HWC)'
  });

  console.log('[DB] Database seeded successfully!');
}

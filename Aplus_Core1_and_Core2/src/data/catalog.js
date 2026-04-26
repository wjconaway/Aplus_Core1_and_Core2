import core1Raw from './core1.json';
import core2Raw from './core2.json';

const excluded = {
  core1: {
    98: 'Duplicate of another private IP question.',
    99: 'Duplicate of another shoulder-surfing question.',
    102: 'Question is poorly written; adapter choice is not a standard CompTIA-style answer.',
    120: 'Cloud backup wording is too vague and invites argument.',
    143: 'Question is conceptually wrong about running Windows apps on macOS.',
    170: 'VR port question is too hand-wavy and hardware-specific.',
    289: 'Duplicate Telnet port question.',
  },
  core2: {
    269: 'Duplicate spear phishing question.',
    273: 'Duplicate Power User question.',
    275: 'Duplicate social engineering question.',
    300: 'Duplicate delete-file command question.',
  },
};

const domainMatchers = {
  core1: [
    ['Mobile Devices', /(mobile|smartphone|tablet|sim|esim|bluetooth|nfc|touchscreen|digitizer|accelerometer|airplane mode|laptop battery|tablet)/i],
    ['Networking', /(dhcp|dns|router|switch|ethernet|wi-?fi|ssid|rj-45|cat\s?6|port\s\d+|ip address|apipa|ssh|telnet|imap|smtp|snmp|ntp|rdp|cable|fiber|network)/i],
    ['Hardware', /(motherboard|ram|dimm|sodimm|cpu|psu|nvme|ssd|hdd|sata|displayport|usb-c|monitor|printer|fuser|drum|backlight|inverter|standoff|gpu|raid|psu|power supply)/i],
    ['Virtualization & Cloud', /(cloud|iaas|paas|saas|virtual|hypervisor|elasticity|resource pooling|measured service)/i],
    ['Troubleshooting', /(troubleshoot|failed|problem|issue|shutdown|clicking|flickering|grinding|broken|won't|doesn't|hot|drain|bulge|bsod|error)/i],
  ],
  core2: [
    ['Operating Systems', /(windows|linux|macos|bash|terminal|registry|regedit|task manager|activity monitor|disk management|system restore|bootrec|sfc|chkdsk|command|group policy|domain|file system)/i],
    ['Security', /(malware|phishing|ransomware|trojan|rootkit|virus|worm|vishing|social engineering|pii|phi|least privilege|bitlocker|passkey|lockout|security|vpn|incident|tailgating|shoulder surfing)/i],
    ['Software Troubleshooting', /(slow|crash|reboot|boot|startup|stability|event viewer|service|error code|repair|recovery|performance|resource monitor)/i],
    ['Operational Procedures', /(backup|aup|msds|sds|chain of custody|change advisory|documentation|supervisor|professional|policy|disposal|incident response)/i],
  ],
};

function guessDomain(examKey, question) {
  const value = `${question.question} ${question.explanation}`;
  for (const [domain, pattern] of domainMatchers[examKey]) {
    if (pattern.test(value)) return domain;
  }
  return examKey === 'core1' ? 'Core 1 General' : 'Core 2 General';
}

function annotate(examKey, questions) {
  const rejected = excluded[examKey];
  return questions
    .filter((question) => !rejected[question.id])
    .map((question) => ({
      ...question,
      domain: guessDomain(examKey, question),
      objective: guessDomain(examKey, question),
    }));
}

export const exams = {
  core1: annotate('core1', core1Raw),
  core2: annotate('core2', core2Raw),
};

export const certificationCatalog = [
  {
    id: 'aplus',
    label: 'A+',
    status: 'live',
    tagline: 'Core IT support certification with live exam banks.',
    exams: [
      { id: 'core1', label: 'Core 1', code: '220-1201', badge: 'Hardware & Network' },
      { id: 'core2', label: 'Core 2', code: '220-1202', badge: 'Software & Security' },
    ],
  },
  {
    id: 'network-plus',
    label: 'Network+',
    status: 'coming-soon',
    tagline: 'Next in line once A+ feels sharp.',
    exams: [],
  },
  {
    id: 'security-plus',
    label: 'Security+',
    status: 'coming-soon',
    tagline: 'Coming soon after Network+ foundations are in place.',
    exams: [],
  },
];

export const auditNotes = excluded;

export const laserPrinterPbq = {
  id: 'laser-printer-process',
  title: 'Laser Printer Process PBQ',
  subtitle: 'Order the seven stages, then diagnose common failures.',
  certification: 'A+',
  exam: 'Core 1 (220-1201)',
  domain: 'Hardware',
  objective: 'Printers and multifunction device troubleshooting',
  orderedStages: [
    {
      id: 'processing',
      label: 'Processing',
      detail: 'The printer receives the job and turns it into a printable image.'
    },
    {
      id: 'charging',
      label: 'Charging',
      detail: 'The primary charge roller gives the drum a uniform negative charge.'
    },
    {
      id: 'exposing',
      label: 'Exposing',
      detail: 'The laser writes the image by discharging parts of the drum.'
    },
    {
      id: 'developing',
      label: 'Developing',
      detail: 'Toner sticks to the exposed parts of the drum.'
    },
    {
      id: 'transferring',
      label: 'Transferring',
      detail: 'Toner is pulled from the drum onto the paper.'
    },
    {
      id: 'fusing',
      label: 'Fusing',
      detail: 'Heat and pressure permanently bond toner to the page.'
    },
    {
      id: 'cleaning',
      label: 'Cleaning',
      detail: 'Residual toner is scraped off the drum so the next page starts clean.'
    }
  ],
  diagnosisItems: [
    {
      id: 'toner-wipes-off',
      symptom: 'Toner wipes off the page when touched right after printing.',
      answer: 'fusing',
      explanation: 'If toner is loose on the page, the fuser is the first suspect because it handles heat and pressure bonding.'
    },
    {
      id: 'blank-page',
      symptom: 'The printer feeds paper correctly but produces a completely blank page.',
      answer: 'transferring',
      explanation: 'A transfer failure can leave toner on the drum instead of moving it to the paper, giving you a blank page.'
    },
    {
      id: 'ghosted-image',
      symptom: 'A faint repeat of the same image appears farther down the page.',
      answer: 'cleaning',
      explanation: 'Ghosting often points to leftover toner or charge not being cleared well before the next rotation.'
    },
    {
      id: 'no-image-on-drum',
      symptom: 'The laser is not writing the image onto the drum correctly.',
      answer: 'exposing',
      explanation: 'Exposing is the stage where the laser writes the latent image on the drum. If that fails, the image never forms correctly.'
    }
  ]
};

export const troubleshootingPbq = {
  id: 'troubleshooting-methodology',
  title: 'Troubleshooting Methodology PBQ',
  subtitle: 'Put the CompTIA troubleshooting steps in the right order, then match actions to the correct phase.',
  certification: 'A+',
  exam: 'Core 2 (220-1202)',
  domain: 'Operational Procedures',
  objective: 'Given a scenario, use the best practice methodology to resolve problems',
  orderedSteps: [
    {
      id: 'identify',
      label: 'Identify the problem',
      detail: 'Gather information, question the user, identify symptoms, and determine if anything changed.'
    },
    {
      id: 'theory',
      label: 'Establish a theory of probable cause',
      detail: 'Start with the obvious, then consider likely causes based on the symptoms.'
    },
    {
      id: 'test',
      label: 'Test the theory to determine the cause',
      detail: 'Confirm whether your theory is correct. If it is not, form a new theory or escalate.'
    },
    {
      id: 'plan',
      label: 'Establish a plan of action and implement the solution',
      detail: 'Choose the fix, consider impact, and carry out the change.'
    },
    {
      id: 'verify',
      label: 'Verify full system functionality and implement preventive measures',
      detail: 'Make sure the issue is actually resolved and reduce the chance of repeat failure.'
    },
    {
      id: 'document',
      label: 'Document findings, actions, and outcomes',
      detail: 'Record what happened, what was done, and the final result.'
    }
  ],
  matchItems: [
    {
      id: 'ask-user',
      prompt: 'Ask the user what changed right before the issue started.',
      answer: 'identify',
      explanation: 'That belongs in step 1 because you are gathering facts and defining the problem.'
    },
    {
      id: 'replace-cable',
      prompt: 'Swap in a known-good cable to confirm whether the original cable is bad.',
      answer: 'test',
      explanation: 'That is testing a theory by checking whether the suspected cause actually explains the failure.'
    },
    {
      id: 'write-ticket',
      prompt: 'Update the ticket with root cause, actions taken, and final resolution.',
      answer: 'document',
      explanation: 'Documentation is the final step after the issue has been handled and verified.'
    },
    {
      id: 'schedule-fix',
      prompt: 'Choose the least disruptive repair path before making production changes.',
      answer: 'plan',
      explanation: 'That is part of building the action plan before implementing the solution.'
    },
    {
      id: 'confirm-user',
      prompt: 'Have the user test the device again and confirm the issue is gone.',
      answer: 'verify',
      explanation: 'Verification confirms the fix worked and the system is fully functional again.'
    }
  ]
};

export const commonPortsPbq = {
  id: 'common-ports-matching',
  title: 'Common Ports PBQ',
  subtitle: 'Match common services to their default ports and sort the most common secure vs insecure remote-access/web ports.',
  certification: 'A+',
  exam: 'Core 1 (220-1201)',
  domain: 'Networking',
  objective: 'Given a scenario, configure basic network settings and use common ports and protocols',
  orderedPorts: [
    {
      id: '23',
      label: '23 — Telnet',
      detail: 'Unencrypted remote terminal access. Old and insecure.'
    },
    {
      id: '22',
      label: '22 — SSH',
      detail: 'Encrypted remote terminal access.'
    },
    {
      id: '80',
      label: '80 — HTTP',
      detail: 'Unencrypted web traffic.'
    },
    {
      id: '443',
      label: '443 — HTTPS',
      detail: 'Encrypted web traffic over TLS.'
    }
  ],
  orderedTarget: ['23', '22', '80', '443'],
  matchItems: [
    {
      id: 'ftp',
      prompt: 'FTP',
      answer: '21',
      explanation: 'FTP uses port 21 for the control connection.'
    },
    {
      id: 'ssh',
      prompt: 'SSH',
      answer: '22',
      explanation: 'SSH uses port 22 for secure remote shell access.'
    },
    {
      id: 'telnet',
      prompt: 'Telnet',
      answer: '23',
      explanation: 'Telnet uses port 23 for remote terminal access, but it is insecure because it does not encrypt traffic.'
    },
    {
      id: 'smtp',
      prompt: 'SMTP',
      answer: '25',
      explanation: 'SMTP commonly uses port 25 for mail transfer between servers.'
    },
    {
      id: 'dns',
      prompt: 'DNS',
      answer: '53',
      explanation: 'DNS uses port 53 for name resolution.'
    },
    {
      id: 'dhcp',
      prompt: 'DHCP (server)',
      answer: '67',
      explanation: 'DHCP servers commonly listen on port 67, while DHCP clients use port 68.'
    },
    {
      id: 'tftp',
      prompt: 'TFTP',
      answer: '69',
      explanation: 'TFTP uses port 69 and is a lightweight file transfer protocol often seen in network boot and device management scenarios.'
    },
    {
      id: 'http',
      prompt: 'HTTP',
      answer: '80',
      explanation: 'HTTP uses port 80 for standard unencrypted web traffic.'
    },
    {
      id: 'pop3',
      prompt: 'POP3',
      answer: '110',
      explanation: 'POP3 commonly uses port 110 for retrieving email from a mail server.'
    },
    {
      id: 'snmp',
      prompt: 'SNMP',
      answer: '161',
      explanation: 'SNMP commonly uses port 161 for network monitoring and device management queries.'
    },
    {
      id: 'imap',
      prompt: 'IMAP',
      answer: '143',
      explanation: 'IMAP commonly uses port 143 for mailbox access.'
    },
    {
      id: 'ldap',
      prompt: 'LDAP',
      answer: '389',
      explanation: 'LDAP uses port 389 for directory service queries and authentication lookups.'
    },
    {
      id: 'https',
      prompt: 'HTTPS',
      answer: '443',
      explanation: 'HTTPS uses port 443 for encrypted web traffic over TLS.'
    },
    {
      id: 'rdp',
      prompt: 'RDP',
      answer: '3389',
      explanation: 'RDP uses port 3389 by default.'
    }
  ],
  portOptions: ['21', '22', '23', '25', '53', '67', '69', '80', '110', '143', '161', '389', '443', '3389']
};

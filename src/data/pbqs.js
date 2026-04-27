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
  subtitle: 'Put the CompTIA troubleshooting steps in the right order, then work through what a technician should do next in real scenarios.',
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
  scenarioItems: [
    {
      id: 'wifi-symptoms',
      prompt: 'A user says the laptop stopped joining Wi-Fi this morning after working fine yesterday. What should the technician do first?',
      options: [
        'A. Reinstall the wireless driver immediately',
        'B. Ask what changed and gather symptoms',
        'C. Replace the access point',
        'D. Close the ticket and monitor'
      ],
      answer: 'B',
      explanation: 'The first step is to identify the problem by gathering information and asking what changed.'
    },
    {
      id: 'known-good-cable',
      prompt: 'A technician suspects a bad Ethernet cable is causing a no-link issue. What should they do next?',
      options: [
        'A. Swap in a known-good cable to confirm the theory',
        'B. Document the issue as resolved',
        'C. Roll out a company-wide switch replacement',
        'D. Ask for a budget approval before any testing'
      ],
      answer: 'A',
      explanation: 'That is testing the theory to determine whether the suspected cable is actually the cause.'
    },
    {
      id: 'change-window',
      prompt: 'The likely fix for a production printer outage requires taking the printer offline during business hours. What should the technician do before making the change?',
      options: [
        'A. Shut it down immediately without notice',
        'B. Establish a plan of action and consider impact before implementing',
        'C. Skip straight to final documentation',
        'D. Assume the fix worked without testing'
      ],
      answer: 'B',
      explanation: 'Once the cause is understood, the technician should plan the fix and consider business impact before implementing it.'
    },
    {
      id: 'user-validation',
      prompt: 'After applying a fix, the device appears normal again. What should happen next?',
      options: [
        'A. Verify full functionality and confirm with the user',
        'B. Start over at theory of probable cause',
        'C. Replace additional parts just in case',
        'D. Ignore preventive measures'
      ],
      answer: 'A',
      explanation: 'After implementation, the technician should verify the fix worked fully and confirm normal operation.'
    },
    {
      id: 'ticket-closeout',
      prompt: 'The issue is resolved and the user has confirmed everything works. What should the technician do last?',
      options: [
        'A. Recreate the problem from scratch',
        'B. Document findings, actions, and outcomes',
        'C. Form a new theory of probable cause',
        'D. Undo the fix'
      ],
      answer: 'B',
      explanation: 'Documentation is the final step so the fix, root cause, and outcome are recorded for future reference.'
    }
  ]
};

export const commonPortsPbq = {
  id: 'common-ports-matching',
  title: 'Common Ports PBQ',
  subtitle: 'Match common services to their default ports without the answer list quietly marching upward in numeric order.',
  certification: 'A+',
  exam: 'Core 1 (220-1201)',
  domain: 'Networking',
  objective: 'Given a scenario, configure basic network settings and use common ports and protocols',
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

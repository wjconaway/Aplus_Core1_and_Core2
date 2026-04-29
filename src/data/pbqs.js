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

export const commandLinePbq = {
  id: 'command-line-tools',
  title: 'Command Line Tools PBQ',
  subtitle: 'Sort commands by platform, then choose the best Windows, Linux, or macOS Terminal command for real troubleshooting and admin scenarios.',
  certification: 'A+',
  exam: 'Core 2 (220-1202)',
  domain: 'Operating Systems',
  objective: 'Use common tools and commands in Windows, Linux, and macOS',
  platformItems: [
    {
      id: 'ipconfig',
      prompt: 'ipconfig /all',
      answer: 'windows',
      explanation: 'ipconfig /all is a Windows command used to show detailed TCP/IP configuration.'
    },
    {
      id: 'bootrec',
      prompt: 'bootrec /rebuildbcd',
      answer: 'windows',
      explanation: 'bootrec /rebuildbcd is a Windows recovery command used to rebuild boot configuration data.'
    },
    {
      id: 'netuser',
      prompt: 'net user trainee TempPass123 /add',
      answer: 'windows',
      explanation: 'net user is a Windows command for creating and managing local user accounts.'
    },
    {
      id: 'grep',
      prompt: 'grep "error" /var/log/auth.log',
      answer: 'linux',
      explanation: 'grep is a standard Linux command for searching text inside files.'
    },
    {
      id: 'chmod',
      prompt: 'chmod 755 deploy.sh',
      answer: 'linux',
      explanation: 'chmod is a Linux command used to change file permissions.'
    },
    {
      id: 'apt',
      prompt: 'sudo apt-get update',
      answer: 'linux',
      explanation: 'apt-get update is a Debian/Ubuntu Linux package index refresh command.'
    },
    {
      id: 'softwareupdate',
      prompt: 'softwareupdate -l',
      answer: 'macos',
      explanation: 'softwareupdate -l lists available macOS updates from Terminal.'
    },
    {
      id: 'open',
      prompt: 'open /Applications',
      answer: 'macos',
      explanation: 'open is a macOS Terminal command that opens files, folders, or apps from the shell.'
    },
    {
      id: 'pwd',
      prompt: 'pwd',
      answer: 'linux',
      explanation: 'pwd is a Unix/Linux shell command that prints the current working directory.'
    }
  ],
  platformOptions: [
    { value: 'windows', label: 'Windows' },
    { value: 'linux', label: 'Linux' },
    { value: 'macos', label: 'macOS' }
  ],
  scenarioItems: [
    {
      id: 'win-network',
      prompt: 'A Windows technician needs to display the full TCP/IP configuration for a desktop, including DNS and DHCP details. Which command should they run?',
      options: [
        'A. ipconfig /all',
        'B. grep "dns" hosts',
        'C. softwareupdate -l',
        'D. pwd'
      ],
      answer: 'A',
      explanation: 'ipconfig /all is the Windows command for detailed TCP/IP configuration output.'
    },
    {
      id: 'win-boot-repair',
      prompt: 'A Windows PC fails to boot after a power outage, and the technician needs to rebuild the Boot Configuration Data store from recovery tools. Which command is the best fit?',
      options: [
        'A. bootrec /rebuildbcd',
        'B. gpupdate /force',
        'C. netstat -ano',
        'D. chown admin report.txt'
      ],
      answer: 'A',
      explanation: 'bootrec /rebuildbcd is used from the Windows recovery environment to rebuild the BCD when boot entries are damaged or missing.'
    },
    {
      id: 'win-dns',
      prompt: 'A technician wants to verify whether a Windows machine can resolve a hostname through DNS instead of just pinging an IP address. Which command is the best choice?',
      options: [
        'A. tasklist',
        'B. nslookup',
        'C. robocopy',
        'D. open /Applications'
      ],
      answer: 'B',
      explanation: 'nslookup is the classic Windows command for checking DNS name resolution and querying DNS records.'
    },
    {
      id: 'win-user-admin',
      prompt: 'A help desk tech needs to add a new local Windows user account from the command line. Which command family should they use?',
      options: [
        'A. net user',
        'B. chmod',
        'C. softwareupdate',
        'D. tracert'
      ],
      answer: 'A',
      explanation: 'net user is used in Windows to create, modify, and manage local user accounts.'
    },
    {
      id: 'linux-log-search',
      prompt: 'A Linux admin wants to search a log file for every line containing the word failed. Which command is the best fit?',
      options: [
        'A. chkdsk',
        'B. grep "failed" /var/log/auth.log',
        'C. gpupdate /force',
        'D. open /Applications'
      ],
      answer: 'B',
      explanation: 'grep is used on Linux to search for matching text patterns inside a file.'
    },
    {
      id: 'linux-permissions',
      prompt: 'A Linux technician needs to change a script so it has new file permissions before it can be executed properly. Which command should they use?',
      options: [
        'A. chmod',
        'B. tracert',
        'C. xcopy',
        'D. net use'
      ],
      answer: 'A',
      explanation: 'chmod changes permissions on Linux files and directories, which is exactly what you use when a script needs execute or other permission changes.'
    },
    {
      id: 'linux-package-index',
      prompt: 'A technician on Ubuntu wants to refresh the local package list before installing updates. Which command should they use?',
      options: [
        'A. ipconfig /all',
        'B. sudo apt-get update',
        'C. open /Applications',
        'D. chkdsk'
      ],
      answer: 'B',
      explanation: 'sudo apt-get update refreshes the package index on Debian-based Linux systems such as Ubuntu.'
    },
    {
      id: 'linux-current-path',
      prompt: 'A Linux user is several folders deep in the shell and wants to confirm the exact directory they are currently in before deleting anything. Which command should they run?',
      options: [
        'A. pwd',
        'B. taskkill',
        'C. net localgroup',
        'D. softwareupdate -l'
      ],
      answer: 'A',
      explanation: 'pwd prints the current working directory, which is exactly what a user should confirm before making destructive file changes.'
    },
    {
      id: 'mac-updates',
      prompt: 'A Mac user wants to list available macOS software updates from Terminal before installing anything. Which command should they use?',
      options: [
        'A. ipconfig /all',
        'B. sfc /scannow',
        'C. softwareupdate -l',
        'D. tail -f /var/log/system.log'
      ],
      answer: 'C',
      explanation: 'softwareupdate -l lists available updates in macOS from the Terminal.'
    },
    {
      id: 'mac-open-folder',
      prompt: 'A macOS technician wants to open the Applications folder directly from Terminal. Which command is the best fit?',
      options: [
        'A. gpupdate /force',
        'B. grep "app" inventory.txt',
        'C. open /Applications',
        'D. ifconfig'
      ],
      answer: 'C',
      explanation: 'The open command is used in macOS Terminal to open folders, files, and applications from the shell.'
    },
    {
      id: 'win-system-files',
      prompt: 'A Windows system is acting unstable, and a technician wants to scan protected system files for corruption. Which command should they run?',
      options: [
        'A. sfc /scannow',
        'B. rm oldfile.log',
        'C. softwareupdate -l',
        'D. grep "error" /var/log/messages'
      ],
      answer: 'A',
      explanation: 'sfc /scannow checks protected Windows system files and repairs them when possible.'
    },
    {
      id: 'win-suspicious-connection',
      prompt: 'A security technician wants to review active Windows connections and associated process IDs while investigating suspicious outbound traffic. Which command is the best fit?',
      options: [
        'A. netstat -ano',
        'B. mkdir temp',
        'C. softwareupdate -l',
        'D. pwd'
      ],
      answer: 'A',
      explanation: 'netstat -ano shows active connections and listening ports plus process IDs, which makes it useful during malware and suspicious-traffic investigations.'
    }
  ]
};

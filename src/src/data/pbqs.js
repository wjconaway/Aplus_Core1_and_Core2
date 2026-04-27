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

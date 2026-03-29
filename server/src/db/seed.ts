import 'dotenv/config';
import { db } from './index';
import { productSpecs } from './schema';

// Run after main seed so product id=15 exists.
async function seedSpecs() {
  await db.insert(productSpecs).values([
    // Functions
    { productId: 15, specCategory: 'Functions', specName: 'Printer',              specValue: 'Printer' },
    { productId: 15, specCategory: 'Functions', specName: 'CPU',                  specValue: '1.2GHz' },
    { productId: 15, specCategory: 'Functions', specName: 'RAM',                  specValue: '512 MB' },
    { productId: 15, specCategory: 'Functions', specName: 'Display',              specValue: '1.7 in. TFT LCD' },
    { productId: 15, specCategory: 'Functions', specName: 'Duplex Printing Unit', specValue: 'Automatic' },
    { productId: 15, specCategory: 'Functions', specName: 'Duplex Print',         specValue: 'Paper size: A3, A4, B4(JIS), A5, B5(JIS), A6, B6(JIS), Letter, Legal, Ledger; Paper weight: 60 to 105 g/m²' },

    // Paper Output
    { productId: 15, specCategory: 'Paper Output', specName: 'Paper Output Capacity',   specValue: '500 sheets' },
    { productId: 15, specCategory: 'Paper Output', specName: 'Standard Paper Capacity', specValue: '630 sheets (AP300)' },
    { productId: 15, specCategory: 'Paper Output', specName: 'Maximum Paper Capacity',  specValue: '2,220 sheets' },

    // Connectivity
    { productId: 15, specCategory: 'Connectivity', specName: 'Connectivity', specValue: 'USB 2.0, Wi-Fi (optional), 10/100/1000 Base-T Ethernet' },

    // Physical
    { productId: 15, specCategory: 'Physical', specName: 'Dimensions (WxDxH)', specValue: '575x563x485 mm (22.6×22.2×19.1 in.)' },
    { productId: 15, specCategory: 'Physical', specName: 'Weight',             specValue: '27 Kg (60 lb.)' },

    // Power
    { productId: 15, specCategory: 'Power', specName: 'Power Supply', specValue: '100-120 VAC, 60 Hz or 220-240 VAC, 50/60 Hz' },

    // Manual Tray
    { productId: 15, specCategory: 'Manual Tray', specName: 'Paper Capacity', specValue: '100 sheets (70 g/m² plain paper)' },
    { productId: 15, specCategory: 'Manual Tray', specName: 'Paper Size',     specValue: 'A4, B5(JIS), A5, A6, Letter, Legal, B4(JIS), A3, Ledger, B6(JIS)' },
    { productId: 15, specCategory: 'Manual Tray', specName: 'Paper Weight',   specValue: '60 to 163 g/m²' },

    // Tray 1 & 2
    { productId: 15, specCategory: 'Tray 1 & 2', specName: 'Paper Capacity', specValue: '530 sheets (70 g/m² plain paper)' },
    { productId: 15, specCategory: 'Tray 1 & 2', specName: 'Paper Size',     specValue: 'A4, A5, A6, B5(JIS), Letter, Legal, A3, B4(JIS), B6(JIS), Ledger' },
    { productId: 15, specCategory: 'Tray 1 & 2', specName: 'Paper Weight',   specValue: '60 to 105 g/m²' },

    // Tray 3 & 4 (optional)
    { productId: 15, specCategory: 'Tray 3 & 4 (option)', specName: 'Paper Capacity', specValue: '530 sheets (70 g/m² plain paper)' },
    { productId: 15, specCategory: 'Tray 3 & 4 (option)', specName: 'Paper Size',     specValue: 'A3, A4, B4(JIS), A5, B5(JIS), A6, B6(JIS), Letter, Legal, Ledger' },
    { productId: 15, specCategory: 'Tray 3 & 4 (option)', specName: 'Paper Weight',   specValue: '60 to 105 g/m²' },

    // Print Function
    { productId: 15, specCategory: 'Print Function', specName: 'Printing Method',        specValue: 'LSU' },
    { productId: 15, specCategory: 'Print Function', specName: 'Printing Speed',         specValue: '30 ppm (A4 LEF)' },
    { productId: 15, specCategory: 'Print Function', specName: 'Resolution',             specValue: '1200 x 1200 dpi' },
    { productId: 15, specCategory: 'Print Function', specName: 'PDLs / Emulations',      specValue: 'PCL / PS / GDI' },
    { productId: 15, specCategory: 'Print Function', specName: 'Supported OS',           specValue: 'Win 11, Win 10, Win 8, Win 7' },
    { productId: 15, specCategory: 'Print Function', specName: 'First Print Output Time', specValue: '<11s' },
    { productId: 15, specCategory: 'Print Function', specName: 'Auto Paper Tray Select', specValue: 'Yes' },
    { productId: 15, specCategory: 'Print Function', specName: 'Zoom',                   specValue: '25% ~ 400%' },
    { productId: 15, specCategory: 'Print Function', specName: 'Density',                specValue: 'Level 1–7' },

    // Consumables
    { productId: 15, specCategory: 'Consumables', specName: 'Toner Cartridge',  specValue: '6,000 / 10,000 / 20,000 sheets (A4, 5% cover rate)' },
    { productId: 15, specCategory: 'Consumables', specName: 'Drum Unit',        specValue: '150,000 sheets' },
    { productId: 15, specCategory: 'Consumables', specName: 'Development Unit', specValue: '300,000 sheets' },
    { productId: 15, specCategory: 'Consumables', specName: 'Fusing Unit',      specValue: '300,000 sheets' },
  ]);

  console.log('Specs seeded!');
}

seedSpecs().catch(console.error);

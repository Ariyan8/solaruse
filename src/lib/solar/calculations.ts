export const PANEL_WIDTH = 1.13;   // meters
export const PANEL_HEIGHT = 2.27;  // meters
export const PANEL_POWER = 585;    // watts
export const PANEL_GAP = 0.2;      // meters

export function calculateSolarStats(panelCount: number) {
  const totalPowerW = panelCount * PANEL_POWER;
  const totalPowerKW = totalPowerW / 1000;

  // approx yearly production in Iran
  const annualProduction = totalPowerKW * 1700;

  return {
    panelCount,
    totalPowerKW,
    annualProduction,
  };
}

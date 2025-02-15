// utils/pricing.ts
interface PricingFactor {
    label: string;
    value: number;
  }
  
  interface PricingResult {
    minPrice: number;
    maxPrice: number;
    factors: PricingFactor[];
  }
  
  export const basePricing = {
    webDev: { base: 2000, complexityMultiplier: 1000, margin: 0.2 },
    mobileDev: { base: 3000, complexityMultiplier: 1200, margin: 0.25 },
    uiux: { base: 1500, complexityMultiplier: 800, margin: 0.15 },
    seo: { base: 1000, complexityMultiplier: 500, margin: 0.2 },
    graphics: { base: 800, complexityMultiplier: 400, margin: 0.15 },
    content: { base: 500, complexityMultiplier: 300, margin: 0.15 },
    consulting: { base: 2500, complexityMultiplier: 1500, margin: 0.3 }
  };
  
  const durationMultipliers = [1, 1.8, 3, 5, 7, 10];
  
  const requirementsPricing = {
    'Documentation': 500,
    'Testing': 800,
    'Maintenance': 1000,
    'Training': 700,
    'Custom Features': 1500,
    'Integration': 1200
  };
  
  export function calculatePrice(state: {
    category?: keyof typeof basePricing;
    complexity: number;
    duration: number;
    requirements: string[];
  }): PricingResult {
    // Return default values if no category selected
    if (!state.category || !basePricing[state.category]) {
      return {
        minPrice: 0,
        maxPrice: 0,
        factors: []
      };
    }
  
    const factors: PricingFactor[] = [];
    const pricing = basePricing[state.category];
    let totalPrice = 0;
  
    // Base price
    const basePrice = pricing.base;
    factors.push({
      label: 'Base Price',
      value: basePrice
    });
    totalPrice += basePrice;
  
    // Complexity
    const complexityPrice = Math.max(0, state.complexity - 1) * pricing.complexityMultiplier;
    if (complexityPrice > 0) {
      factors.push({
        label: 'Complexity Adjustment',
        value: complexityPrice
      });
      totalPrice += complexityPrice;
    }
  
    // Duration
    const durationMultiplier = durationMultipliers[Math.min(state.duration - 1, durationMultipliers.length - 1)];
    const durationPrice = basePrice * (durationMultiplier - 1);
    if (durationPrice > 0) {
      factors.push({
        label: 'Duration Adjustment',
        value: durationPrice
      });
      totalPrice += durationPrice;
    }
  
    // Requirements
    let requirementsTotal = 0;
    state.requirements.forEach(req => {
      if (requirementsPricing[req as keyof typeof requirementsPricing]) {
        requirementsTotal += requirementsPricing[req as keyof typeof requirementsPricing];
      }
    });
    
    if (requirementsTotal > 0) {
      factors.push({
        label: 'Additional Requirements',
        value: requirementsTotal
      });
      totalPrice += requirementsTotal;
    }
  
    // Calculate min and max with margin
    const minPrice = Math.round(totalPrice * (1 - pricing.margin));
    const maxPrice = Math.round(totalPrice * (1 + pricing.margin));
  
    return {
      minPrice,
      maxPrice,
      factors
    };
  }
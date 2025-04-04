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
  consulting: { base: 2500, complexityMultiplier: 1500, margin: 0.3 },
};

const durationMultipliers = [1, 2, 3]; // Adjusted for 1-3 months, 3-6 months, 6+ months

const requirementsPricing = {
  'Frontend Development': 1000,
  'Backend Development': 1200,
  'API Integration': 800,
  'Testing': 800,
  'Maintenance': 1000,
  'Custom Features': 1500,
  'iOS Development': 1200,
  'Android Development': 1200,
  'Cross-Platform': 1000,
  'Push Notifications': 600,
  'App Store Deployment': 500,
  'Wireframing': 500,
  'Prototyping': 600,
  'Usability Testing': 700,
  'Design Systems': 1000,
  'Accessibility': 600,
  'User Research': 800,
  'Keyword Research': 400,
  'On-Page SEO': 500,
  'PPC Campaigns': 700,
  'Social Media Strategy': 600,
  'Analytics': 500,
  'Content Marketing': 600,
  'Logo Design': 400,
  'Branding Kit': 600,
  'Social Media Assets': 500,
  'Print Materials': 500,
  'Packaging Design': 600,
  'Motion Graphics': 800,
  'Blog Writing': 300,
  'Technical Writing': 500,
  'Video Editing': 700,
  'Script Writing': 400,
  'SEO Content': 400,
  'Social Media Content': 300,
  'Business Audit': 800,
  'Market Analysis': 700,
  'Strategy Development': 1000,
  'Training': 700,
  'Implementation Plan': 900,
  'Change Management': 1000,
};

export function calculatePrice(state: {
  category?: keyof typeof basePricing;
  complexity: number;
  duration: number;
  requirements: string[];
}): PricingResult {
  if (!state.category || !basePricing[state.category]) {
    return {
      minPrice: 0,
      maxPrice: 0,
      factors: [],
    };
  }

  const factors: PricingFactor[] = [];
  const pricing = basePricing[state.category];
  let totalPrice = 0;

  // Base price
  const basePrice = pricing.base;
  factors.push({
    label: 'Base Price',
    value: basePrice,
  });
  totalPrice += basePrice;

  // Complexity (1: Simple, 2: Moderate, 3: Complex)
  const complexityPrice = (state.complexity - 1) * pricing.complexityMultiplier;
  if (complexityPrice > 0) {
    factors.push({
      label: 'Complexity Adjustment',
      value: complexityPrice,
    });
    totalPrice += complexityPrice;
  }

  // Duration (1: 1-3 months, 2: 3-6 months, 3: 6+ months)
  const durationMultiplier = durationMultipliers[state.duration - 1] || 1;
  const durationPrice = basePrice * (durationMultiplier - 1);
  if (durationPrice > 0) {
    factors.push({
      label: 'Duration Adjustment',
      value: durationPrice,
    });
    totalPrice += durationPrice;
  }

  // Requirements
  let requirementsTotal = 0;
  state.requirements.forEach((req) => {
    if (requirementsPricing[req as keyof typeof requirementsPricing]) {
      requirementsTotal += requirementsPricing[req as keyof typeof requirementsPricing];
    }
  });

  if (requirementsTotal > 0) {
    factors.push({
      label: 'Additional Requirements',
      value: requirementsTotal,
    });
    totalPrice += requirementsTotal;
  }

  // Calculate min and max with margin
  const minPrice = Math.round(totalPrice * (1 - pricing.margin));
  const maxPrice = Math.round(totalPrice * (1 + pricing.margin));

  return {
    minPrice,
    maxPrice,
    factors,
  };
}
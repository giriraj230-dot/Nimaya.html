export interface PostalLocation {
  city: string;
  state: string;
  district?: string;
  area?: string;
}

// Built-in offline fallback lookup for major Indian metros & PIN prefixes
const PIN_FALLBACK: Record<string, { city: string; state: string; area?: string }> = {
  // Bengaluru
  '560038': { city: 'Bengaluru', state: 'Karnataka', area: 'Indiranagar' },
  '560001': { city: 'Bengaluru', state: 'Karnataka', area: 'MG Road' },
  '560034': { city: 'Bengaluru', state: 'Karnataka', area: 'Koramangala' },
  '560066': { city: 'Bengaluru', state: 'Karnataka', area: 'Whitefield' },
  '560076': { city: 'Bengaluru', state: 'Karnataka', area: 'BTM Layout' },
  '560100': { city: 'Bengaluru', state: 'Karnataka', area: 'Electronic City' },
  '560102': { city: 'Bengaluru', state: 'Karnataka', area: 'HSR Layout' },
  '560092': { city: 'Bengaluru', state: 'Karnataka', area: 'Hebbal' },
  '560004': { city: 'Bengaluru', state: 'Karnataka', area: 'Basavanagudi' },
  '560025': { city: 'Bengaluru', state: 'Karnataka', area: 'Richmond Town' },

  // Mumbai & Pune
  '400001': { city: 'Mumbai', state: 'Maharashtra', area: 'Fort' },
  '400050': { city: 'Mumbai', state: 'Maharashtra', area: 'Bandra West' },
  '400053': { city: 'Mumbai', state: 'Maharashtra', area: 'Andheri West' },
  '400069': { city: 'Mumbai', state: 'Maharashtra', area: 'Andheri East' },
  '400076': { city: 'Mumbai', state: 'Maharashtra', area: 'Powai' },
  '400018': { city: 'Mumbai', state: 'Maharashtra', area: 'Worli' },
  '411001': { city: 'Pune', state: 'Maharashtra', area: 'Camp' },
  '411014': { city: 'Pune', state: 'Maharashtra', area: 'Viman Nagar' },
  '411057': { city: 'Pune', state: 'Maharashtra', area: 'Hinjewadi' },

  // Delhi NCR
  '110001': { city: 'New Delhi', state: 'Delhi', area: 'Connaught Place' },
  '110016': { city: 'New Delhi', state: 'Delhi', area: 'Hauz Khas' },
  '110024': { city: 'New Delhi', state: 'Delhi', area: 'Lajpat Nagar' },
  '110085': { city: 'New Delhi', state: 'Delhi', area: 'Rohini' },
  '110070': { city: 'New Delhi', state: 'Delhi', area: 'Vasant Kunj' },
  '122001': { city: 'Gurugram', state: 'Haryana', area: 'Sadar Bazar' },
  '122002': { city: 'Gurugram', state: 'Haryana', area: 'DLF Phase 1' },
  '122018': { city: 'Gurugram', state: 'Haryana', area: 'Sohna Road' },
  '201301': { city: 'Noida', state: 'Uttar Pradesh', area: 'Sector 1-15' },
  '201304': { city: 'Noida', state: 'Uttar Pradesh', area: 'Sector 93' },

  // Hyderabad
  '500001': { city: 'Hyderabad', state: 'Telangana', area: 'Abids' },
  '500081': { city: 'Hyderabad', state: 'Telangana', area: 'Madhapur / Hitec City' },
  '500034': { city: 'Hyderabad', state: 'Telangana', area: 'Banjara Hills' },
  '500033': { city: 'Hyderabad', state: 'Telangana', area: 'Jubilee Hills' },

  // Chennai
  '600001': { city: 'Chennai', state: 'Tamil Nadu', area: 'George Town' },
  '600028': { city: 'Chennai', state: 'Tamil Nadu', area: 'R.A. Puram' },
  '600096': { city: 'Chennai', state: 'Tamil Nadu', area: 'Perungudi' },
  '600040': { city: 'Chennai', state: 'Tamil Nadu', area: 'Anna Nagar' },

  // Kolkata
  '700001': { city: 'Kolkata', state: 'West Bengal', area: 'BBD Bagh' },
  '700091': { city: 'Kolkata', state: 'West Bengal', area: 'Salt Lake Sector V' },
  '700019': { city: 'Kolkata', state: 'West Bengal', area: 'Ballygunge' },

  // Other Major Cities
  '302001': { city: 'Jaipur', state: 'Rajasthan', area: 'C-Scheme' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', area: 'Bhadra' },
  '380015': { city: 'Ahmedabad', state: 'Gujarat', area: 'Satellite' },
  '160017': { city: 'Chandigarh', state: 'Punjab & Haryana', area: 'Sector 17' },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', area: 'Hazratganj' },
  '682001': { city: 'Kochi', state: 'Kerala', area: 'Fort Kochi' },
};

/**
 * Automatically resolves City, State, and Area from a 6-digit Indian PIN Code
 * using the official India Post API with instant fallback cache.
 */
export async function fetchLocationByPostalCode(code: string): Promise<PostalLocation | null> {
  const cleanCode = code.replace(/\D/g, '').trim();

  // If valid 6-digit Indian PIN code
  if (cleanCode.length === 6) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`https://api.postalpincode.in/pincode/${cleanCode}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          return {
            city: po.District || po.Block || po.Circle || 'Unknown',
            state: po.State || '',
            district: po.District,
            area: po.Name,
          };
        }
      }
    } catch {
      // Fall through to fallback
    }

    if (PIN_FALLBACK[cleanCode]) {
      return PIN_FALLBACK[cleanCode];
    }
  }

  if (PIN_FALLBACK[cleanCode]) {
    return PIN_FALLBACK[cleanCode];
  }

  return null;
}

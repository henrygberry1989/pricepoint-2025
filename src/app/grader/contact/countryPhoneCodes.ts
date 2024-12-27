// Pinned countries at the top
const pinnedCountries = [
  { name: 'United States', code: '+1', iso: 'US' },
  { name: 'United Kingdom', code: '+44', iso: 'GB' },
]

// Rest of the countries
const otherCountries = [
  { name: 'Australia', code: '+61', iso: 'AU' },
  { name: 'Canada', code: '+1', iso: 'CA' },
  { name: 'China', code: '+86', iso: 'CN' },
  { name: 'France', code: '+33', iso: 'FR' },
  { name: 'Germany', code: '+49', iso: 'DE' },
  { name: 'Hong Kong', code: '+852', iso: 'HK' },
  { name: 'India', code: '+91', iso: 'IN' },
  { name: 'Indonesia', code: '+62', iso: 'ID' },
  { name: 'Japan', code: '+81', iso: 'JP' },
  { name: 'Malaysia', code: '+60', iso: 'MY' },
  { name: 'New Zealand', code: '+64', iso: 'NZ' },
  { name: 'Singapore', code: '+65', iso: 'SG' },
  { name: 'South Korea', code: '+82', iso: 'KR' },
].sort((a, b) => a.name.localeCompare(b.name))

export { pinnedCountries, otherCountries }

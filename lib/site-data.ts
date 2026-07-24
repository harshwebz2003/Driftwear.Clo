export const contact = {
  phone: '078 385 0769',
  whatsapp: '94783850769',
  email: 'nipunsathsara203@gmail.com',
  location: 'Galle, Sri Lanka',
  facebook: 'Driftwear Clo.'
};

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'DTF Printing', href: '#dtf' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const products = [
  {
    name: 'All Eyes On Me Tee',
    category: 'Streetwear Graphic',
    price: 'Price on request',
    image: '/assets/tshirt_black_oversized.jpg'
  },
  {
    name: 'Journey Oversized Tee',
    category: 'Premium DTF Print',
    price: 'Price on request',
    image: '/assets/Gallery/streetwear_look_01.jpg'
  },
  {
    name: 'Custom Black Drop Tee',
    category: 'Custom Design',
    price: 'Price on request',
    image: '/assets/Gallery/streetwear_look_02.jpg'
  },
  {
    name: 'White Studio Mockup',
    category: 'Minimal Print',
    price: 'Price on request',
    image: '/assets/tshirt_white_regular.jpg'
  }
];

export const processSteps = [
  ['01', 'Send your design', 'Share artwork, reference photos, logo, name, number, or concept through WhatsApp.'],
  ['02', 'Choose color and size', 'Pick garment color, fit, print position, quantity, and required date.'],
  ['03', 'Premium DTF print', 'We prepare the artwork, print vibrant transfers, heat press, and quality-check the finish.'],
  ['04', 'Collect or deliver', 'Collect from Galle or arrange delivery after final order confirmation.']
];

export const reasons = [
  'Gold-accented streetwear look with custom artwork support',
  'DTF prints suitable for complex graphics and bold colors',
  'Single pieces, couple tees, teams, events, and business uniforms',
  'WhatsApp-first ordering with clear product and artwork details'
];

export const gallery = [
  '/assets/Gallery/streetwear_look_01.jpg',
  '/assets/Gallery/streetwear_look_02.jpg',
  '/assets/Gallery/streetwear_look_03.jpg',
  '/assets/Gallery/streetwear_look_04.jpg',
  '/assets/tshirt_printing_press.jpg',
  '/assets/tshirt_model_urban_black.jpg',
  '/assets/tshirt_model_studio_white.jpg',
  '/assets/tshirt_black_flatlay.jpg'
];

export const faqs = [
  ['What is DTF printing?', 'DTF printing uses a transfer film and heat press process to apply detailed full-color artwork to clothing.'],
  ['Can I order one T-shirt?', 'Yes. Driftwear Clo. can handle single custom pieces and larger bulk orders.'],
  ['How do I order?', 'Tap any WhatsApp button and send your design idea, color, size, quantity, and deadline.'],
  ['Do you do bulk orders?', 'Yes. Team shirts, school shirts, business uniforms, event tees, and promotional apparel are supported.']
];

export function whatsappLink(message: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

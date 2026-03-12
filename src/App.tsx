import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Car,
  Expand,
  Route,
  Home,
  TreePine,
  Fence,
  Leaf,
  Flower2,
  Star
} from 'lucide-react';

const BRAND_COLOR = '#90c470';

export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const target = document.querySelector(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 500;
  let start: number | null = null;

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    
    // easeInOutCubic
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    const percentage = Math.min(progress / duration, 1);
    window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      window.history.pushState(null, '', targetId);
    }
  };

  window.requestAnimationFrame(step);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-2xl font-bold tracking-tighter ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Kent <span style={{ color: BRAND_COLOR }}>Landscaper</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`text-sm font-medium hover:text-[#7d7a7a] transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="px-5 py-2.5 rounded-full text-white font-medium transition-opacity hover:opacity-90" 
              style={{ backgroundColor: BRAND_COLOR }}
            >
              Get a Free Quote
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-gray-900' : 'text-white'}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => {
                    setIsOpen(false);
                    handleSmoothScroll(e, link.href);
                  }} 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#7d7a7a] hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://www.jovaklandscape.com/wp-content/uploads/2021/05/landscape-design-services-1.jpg" 
          alt="Beautiful patio and driveway" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20 md:mt-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white backdrop-blur-sm text-xs md:text-sm font-medium mb-4 md:mb-6 border border-white/30 tracking-wide uppercase">
            Top-Rated Houston Landscapers
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 md:mb-6 leading-tight">
            Elevate Your <br className="hidden md:block" />
            <span style={{ color: '#e5e5e5' }}>Outdoor Living</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mb-8 md:mb-10 leading-relaxed">
            Premium landscaping, custom patios, and expert hardscaping. We build beautiful, lasting outdoor spaces tailored to your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full text-white font-semibold text-base md:text-lg transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ring-4 ring-white/20"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              Get a Free Quote <ChevronRight size={20} />
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleSmoothScroll(e, '#portfolio')}
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full text-white font-semibold text-base md:text-lg border-2 border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const services = [
  { title: 'Driveway Paving', description: 'Durable and beautiful driveway paving solutions tailored to your home.', icon: Car },
  { title: 'Driveway Widening', description: 'Expand your parking space seamlessly with our widening services.', icon: Expand },
  { title: 'Side Pathway', description: 'Create elegant and functional walkways around your property.', icon: Route },
  { title: 'Backyard Paving', description: 'Transform your backyard with high-quality paving and hardscaping.', icon: Home },
  { title: 'Patio Design', description: 'Custom patio designs perfect for relaxing and entertaining guests.', icon: TreePine },
  { title: 'Fence Installation', description: 'Secure your property with our premium fencing options.', icon: Fence },
  { title: 'Sod Installation', description: 'Get an instantly green, lush lawn with our professional sodding.', icon: Leaf },
  { title: 'Flower Bed', description: 'Beautifully curated flower beds to enhance your curb appeal.', icon: Flower2 },
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: BRAND_COLOR }}>Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Landscaping Solutions</h3>
          <p className="text-base md:text-lg text-gray-600">From driveways to patios, we offer a full range of services to enhance the beauty and functionality of your outdoor spaces.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: `${BRAND_COLOR}15`, color: BRAND_COLOR }}>
                <service.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    "Free, no-obligation quotations",
    "Unbeatable prices in the Houston area",
    "Years of professional landscaping experience",
    "High-quality materials and craftsmanship",
    "Fully licensed and insured team",
    "Dedicated to customer satisfaction"
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square sm:aspect-[4/3] shadow-2xl">
              <img 
                src="https://t3.ftcdn.net/jpg/03/20/82/32/360_F_320823232_QtVEoqqcDPaSo7rclYLgcTBJNSomIFcZ.jpg" 
                alt="Landscaping professionals at work" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white">
                <div className="flex items-center gap-1 md:gap-2 mb-2">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                </div>
                <p className="font-medium text-base md:text-lg leading-snug">"Kent and his team transformed our backyard completely. Highly recommended!"</p>
                <p className="text-xs md:text-sm text-gray-300 mt-1">- Sarah M., Houston</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 rounded-full -z-10" style={{ backgroundColor: `${BRAND_COLOR}30` }} />
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 rounded-full -z-10" style={{ backgroundColor: `${BRAND_COLOR}20` }} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: BRAND_COLOR }}>Why Choose Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Expertise You Can Trust, Prices You'll Love</h3>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              At Kent Landscaper, we believe that a beautiful outdoor space shouldn't break the bank. We combine top-tier craftsmanship with unbeatable prices to deliver stunning driveways, patios, and gardens across Houston and surrounding areas.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 md:mt-1 shrink-0" style={{ color: BRAND_COLOR }} size={20} />
                  <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full text-white font-semibold text-base md:text-lg transition-transform hover:scale-105 shadow-md"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              Book Your Free Quote <ChevronRight size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { img: 'https://instagram.fdac3-1.fna.fbcdn.net/v/t39.30808-6/448790240_17843618886250095_9055382733378383843_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=110&ig_cache_key=MzM5Mzk1NTQwMjQwMjAzNDU5NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMTV4NjgzLmhkci5DMyJ9&_nc_ohc=yaADyox3jSQQ7kNvwFPueHa&_nc_oc=Adkb_vpzRdx6O8nkzQojKV4Lyq92WRL8xzNdaxDL-E_0XIWmU0Se4jd40D0KxBDfvwo&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=EBDIME5jWo4TeeyZMHkvuw&_nc_ss=8&oh=00_Afx0m17gQp3cq8-DpI6XI3e1irDHhEb659scQVUzkzRqaQ&oe=69B7BF2F', title: 'Modern Driveway Paving', category: 'Driveways' },
    { img: 'https://instagram.fdac3-1.fna.fbcdn.net/v/t39.30808-6/448243201_17842526340250095_7820675874041936535_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzM4OTE1MTcyMjIxODEwNzU3NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjk2Mng1NDQuc2RyLkMzIn0%3D&_nc_ohc=NoOQxroutAUQ7kNvwE4CwK8&_nc_oc=AdlBSP6nwHGybpE4-Q3UqPWGnexWiFVUHA3f-LfUc8BrhIxGI9I5c0fdxu9l2vUSFEQ&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=EBDIME5jWo4TeeyZMHkvuw&_nc_ss=8&oh=00_Afy-5oWsoxLIrMtw5WnFw2TCiZjeEAI-4_y_9Udlnje6GA&oe=69B7CF60', title: 'Backyard Stone Patio', category: 'Patios' },
    { img: 'https://instagram.fdac3-1.fna.fbcdn.net/v/t39.30808-6/448147493_17842214721250095_1295921477280850527_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=111&ig_cache_key=MzM4NzU5MDM0NDYzMDEyODI5Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMTV4NjgzLmhkci5DMyJ9&_nc_ohc=JuGbSM_ttDUQ7kNvwEnZ9fo&_nc_oc=AdmjVpKUWr53YJ4PK0MfnBD8Bw3umkMI8C4indkDC7gWL_MmKFURZr-RI7qbvvPxPqE&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=EBDIME5jWo4TeeyZMHkvuw&_nc_ss=8&oh=00_Afz6qNIfSq9x7KA101Gi4Qr6xY_TMBTtvBL8xPQwFFvtCg&oe=69B7BFF3', title: 'Custom Flower Beds', category: 'Gardens' },
    { img: 'https://instagram.fdac3-2.fna.fbcdn.net/v/t39.30808-6/468530368_17868572973250095_745017580679775006_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=MzQwMTU0MDc3MTQ0NzUwMTI5Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5MS5zZHIuQzMifQ%3D%3D&_nc_ohc=Tk3t_ekBgjQQ7kNvwExfu-0&_nc_oc=Adkix6qdNScY05IipdLjAGBoJfLc8z6YhZ5AK2ZKZXsp1U3wi36vWy6IWq2fPzCWjDc&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=EBDIME5jWo4TeeyZMHkvuw&_nc_ss=8&oh=00_AfwzWt4y-c96IhKBCpMD3ztlnnV1vkiFl-YrOwqwdYCa_A&oe=69B7DC6A', title: 'Privacy Fence Installation', category: 'Fencing' },
    { img: 'https://instagram.fdac3-2.fna.fbcdn.net/v/t39.30808-6/449306086_17844961110250095_8535788856674533633_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=104&ig_cache_key=MzM5OTI5NDA3MDc5MzYwNDgwMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExODB4NjQ1Lmhkci5DMyJ9&_nc_ohc=vxyX9SG1pKkQ7kNvwFfMtV0&_nc_oc=AdmAAEufe9-p9QA3kOtJIKaihptFKejmIjZyIMvDxBd7hpT_WybBPCP1Fun8PNUuNyg&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=EBDIME5jWo4TeeyZMHkvuw&_nc_ss=8&oh=00_AfxlzucX7zbejNEBtiNlSFLHTIRHHkj-devi6BLZJ_VrFQ&oe=69B7BBC3', title: 'Elegant Side Pathway', category: 'Pathways' },
    { img: 'https://instagram.fdac3-2.fna.fbcdn.net/v/t39.30808-6/450962037_17848463019250095_6523076571343741784_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=103&ig_cache_key=MzQxMjA2OTg2MTI1OTcyOTE5NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMjF4NjkwLmhkci5DMyJ9&_nc_ohc=ZKKkc7AoJ8QQ7kNvwEwYf4g&_nc_oc=AdmkvATFMZa0R3vJ48T0TpXJQlAlCWmvc-wV21jvsy5Z5qI4Y-Vq13jRsFWXf4-goHc&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=ajXhAgH_YZRGu8IblxA6Jw&_nc_ss=8&oh=00_Afxr5Z-Y6WRRo1R3gO03xQiJpSGg4O6J_d7-RUcVI-wlaw&oe=69B7B4CF', title: 'Fresh Sod Installation', category: 'Lawn Care' },
    { img: 'https://instagram.fdac3-2.fna.fbcdn.net/v/t39.30808-6/451643035_17848990338250095_9175210073530451117_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzQxMzkwNDgwOTY1ODQ2ODEwOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NC5zZHIuQzMifQ%3D%3D&_nc_ohc=z4rz9Y06K8UQ7kNvwEgMFmz&_nc_oc=AdktsBZrNL9IkuDKwkM39vXFqE44nZ-kyz7TpK9zfCq0Nga34LYJcorCPdkx0HAcMmQ&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=ajXhAgH_YZRGu8IblxA6Jw&_nc_ss=8&oh=00_Afw2k_-veMIXaX5LVPnngCzjAdsdISlyceVB4c_OGVV6vA&oe=69B7CF8B', title: 'Driveway Widening', category: 'Driveways' },
    { img: 'https://instagram.fdac3-1.fna.fbcdn.net/v/t39.30808-6/468471043_17868573987250095_8479564996621629799_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzQxMzkwNjYyNTc0MTg4MjY4NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NC5zZHIuQzMifQ%3D%3D&_nc_ohc=XHFTXkIdMeIQ7kNvwHWoyOv&_nc_oc=AdndEGDAa3O_ovEUckOVv2b3AgCWhy8TpsottBIWotEr90d7_BLk3EKZd1mQbN6BbNI&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=ajXhAgH_YZRGu8IblxA6Jw&_nc_ss=8&oh=00_AfzlPu4fLH5ixG4Wyk6YVAj1d0-ihQ8iHuzqJP5rZvzxFA&oe=69B7CBF2', title: 'Backyard Paving', category: 'Patios' },
    { img: 'https://instagram.fdac3-2.fna.fbcdn.net/v/t39.30808-6/468489877_17868574080250095_2341935555849745521_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=MzQxNzIxMDg2OTE0MDY5ODA2Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4ODEyLnNkci5DMyJ9&_nc_ohc=4sWgTO6G9rEQ7kNvwGpD-IS&_nc_oc=AdnIlm23rG7h4P6oubPk8gcu0BH4YuU6m916Zh_J9L5njmbec26HNz5mPcYLbn8zj28&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-2.fna&_nc_gid=ajXhAgH_YZRGu8IblxA6Jw&_nc_ss=8&oh=00_AfwAxn_SG_SUVeuDLkLo-soAcZviRzO_mV8suwzibgTeZw&oe=69B7B49D', title: 'Custom Patio Design', category: 'Patios' },
    { img: 'https://instagram.fdac3-1.fna.fbcdn.net/v/t39.30808-6/452930688_17850685134250095_7223630806948529588_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=108&ig_cache_key=MzQyMDc5MTA1MzM3NDAyODE0OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMTh4Njg3Lmhkci5DMyJ9&_nc_ohc=9ITIj7xE3XEQ7kNvwF-KPCI&_nc_oc=AdkNJb1CCkFcw1zJMlV_KRLIdkhzzMy4ZnxNfIrr6UzL7ncOZJuLVoKpX7gOZYIUtoo&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=ajXhAgH_YZRGu8IblxA6Jw&_nc_ss=8&oh=00_AfzCQwaQZX-QiTr01Cq9gZtTp76Xn4MNRZyR54MxhT-aGg&oe=69B7EAFB', title: 'Stone Steps', category: 'Hardscaping' },
    { img: 'https://instagram.fdac3-1.fna.fbcdn.net/v/t39.30808-6/452916136_17850383952250095_2487374158271636411_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=109&ig_cache_key=MzQxOTM0ODQ3Nzk0NTk3Njg3Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMjB4Njg5Lmhkci5DMyJ9&_nc_ohc=mwoVuKRZe38Q7kNvwEY7vlQ&_nc_oc=AdkU1EyEhhs-ouoIVnt7R7t1tD__6ERBXzPBccDLDXy3Gr8IwwGuDvPiMcO-P7pNjVQ&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=ajXhAgH_YZRGu8IblxA6Jw&_nc_ss=8&oh=00_Afx0VCQPRy6wMuSQDiyzAhf5u6FvzZo50pvcjXUFDZvcWQ&oe=69B7DA77', title: 'Landscape Design', category: 'Landscaping' },
    { img: 'https://instagram.fdac3-1.fna.fbcdn.net/v/t39.30808-6/468450355_17868573711250095_644858762931652210_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzQyMzA1NjYxMzEzMTQwMTgzNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyNTB4MTU2Mi5zZHIuQzMifQ%3D%3D&_nc_ohc=XAGznD6aELYQ7kNvwFLy0Hf&_nc_oc=Adke3HHh2o2v7NvDqMmTpsvPosJ6lj4aKvycL7yzrcdJKJv04iG0jVFHP_4IY3CJORQ&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac3-1.fna&_nc_gid=ajXhAgH_YZRGu8IblxA6Jw&_nc_ss=8&oh=00_Afz8GCqnY7lbWiMqB7ck-Ibp6stjY8NredYukDDaGSIjcQ&oe=69B7E781', title: 'Outdoor Living', category: 'Patios' },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: BRAND_COLOR }}>Our Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Projects</h3>
          <p className="text-base md:text-lg text-gray-600">Take a look at some of our recent landscaping and paving transformations.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-sm font-medium mb-1" style={{ color: '#e5e5e5' }}>{project.category}</span>
                <h4 className="text-xl font-bold text-white">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "David R.",
      city: "Houston, TX",
      text: "Kent and his crew did an amazing job widening our driveway. They were professional, on time, and the price was exactly what they quoted. Highly recommend!",
      rating: 5
    },
    {
      name: "Emily T.",
      city: "Sugar Land, TX",
      text: "We hired Kent Landscaper for a new backyard patio and sod installation. The transformation is incredible. Our backyard looks like a resort now.",
      rating: 5
    },
    {
      name: "Michael B.",
      city: "Katy, TX",
      text: "Great communication from start to finish. They installed a new privacy fence and some flower beds. The quality of work is outstanding and very affordable.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: BRAND_COLOR }}>Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h3>
          <p className="text-base md:text-lg text-gray-600">Don't just take our word for it. Read what homeowners across Houston have to say about our services.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 relative flex flex-col h-full"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-8 leading-relaxed flex-grow">"{testimonial.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500 shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                  <p className="text-sm text-gray-500">{testimonial.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: BRAND_COLOR }}>Contact Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Ready to Transform Your Space?</h3>
            <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10">
              Contact us today for a free, no-obligation quote. Let's discuss your landscaping, patio, or driveway project.
            </p>
            
            <div className="space-y-6 mb-8 md:mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/10 shrink-0">
                  <Phone size={20} className="md:w-6 md:h-6" style={{ color: BRAND_COLOR }} />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">Call or Text</p>
                  <a href="tel:647-919-6610" className="text-lg md:text-xl font-bold hover:text-gray-300 transition-colors">647-919-6610</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/10 shrink-0">
                  <Mail size={20} className="md:w-6 md:h-6" style={{ color: BRAND_COLOR }} />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">Email Us</p>
                  <a href="mailto:Landscaperkent@gmail.com" className="text-lg md:text-xl font-bold hover:text-gray-300 transition-colors break-all">Landscaperkent@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/10 shrink-0">
                  <MapPin size={20} className="md:w-6 md:h-6" style={{ color: BRAND_COLOR }} />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400">Service Area</p>
                  <p className="text-lg md:text-xl font-bold">Houston & Surrounding Areas</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 inline-block w-full sm:w-auto">
              <p className="font-medium text-base md:text-lg mb-1 md:mb-2">Emergency or quick estimate?</p>
              <p className="text-sm md:text-base text-gray-400">DM <strong className="text-white">‘QUOTE’</strong> to our number for a free estimate.</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 md:p-10 text-gray-900 shadow-2xl"
          >
            <h4 className="text-2xl font-bold mb-6">Book Your Free Quote Today</h4>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ '--tw-ring-color': BRAND_COLOR } as React.CSSProperties}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ '--tw-ring-color': BRAND_COLOR } as React.CSSProperties}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ '--tw-ring-color': BRAND_COLOR } as React.CSSProperties}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:border-transparent outline-none transition-all resize-none"
                  style={{ '--tw-ring-color': BRAND_COLOR } as React.CSSProperties}
                  placeholder="Tell us about your patio, driveway, or landscaping project..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02] shadow-md"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                Get My Free Quote
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-950 py-8 md:py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="text-xl md:text-2xl font-bold text-white tracking-tighter">
            Kent <span style={{ color: BRAND_COLOR }}>Landscaper</span>
          </div>
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Kent Landscaper. All rights reserved. Serving Houston, TX.
          </p>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm md:text-base">Facebook</a>
            <a href="https://www.instagram.com/kentlandscaper/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm md:text-base">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm md:text-base">Yelp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#7d7a7a] selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

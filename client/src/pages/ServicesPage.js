import React, { useState } from 'react';
import './ServicesPage.css';

const services = [
  {
    name: 'Nails',
    details: ['Manicure 10$', 'Pedicure 11$', 'Manicure french 14$', 'Pedicure french 15$', 'Manicure with gel 20$', 'Pedicure with gel 25$', 'Manicure with gel polish 30$', 'Pedicure with gel polish 35$'],
  },
  {
    name: 'Hair',
    details: [
      {
        subcategory: 'Basic',
        options: ['Brushing 12$', 'Haircut 35$', 'Bangs 15$', 'Braids starting 10$', 'Chignon starting 20$']
      },
      {
        subcategory: 'Color Studio',
        options: ['Highlights 70$', 'Lowlights 50$', 'Toner 14$', 'full color 45$', 'Retouch 30$']
      },
      {
        subcategory: 'Treatments',
        options: ['Keratin 150$', 'Botox 100$', 'Olaplex 50$', 'Deep Conditioning 30$']
      }
    ],
  },
  {
    name: 'Makeup',
    details: ['Eye Makeup 20$', 'Full Makeup + Countouring 70$', 'Bridal Makeup 100$'],
  },
  {
    name: 'Eyebrows',
    details: ['Threading 10$', 'Tinting 15$', 'Lamination 20$', 'Microblading 50$', 'Henna 15$', 'Tattoo 200$'],
  },
  {
    name: 'Lashes',
    details: ['Lash-Lift 30$', 'Lash-Extensions 50$', 'Lash-Removal 20$'],
  },
];

function ServicesPage() {
  const [activeService, setActiveService] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const toggleService = (index) => {
    if (activeService === index) {
      setActiveService(null);
      setActiveSubcategory(null);
    } else {
      setActiveService(index);
      setActiveSubcategory(null);
    }
  };

  const toggleSubcategory = (index) => {
    setActiveSubcategory(activeSubcategory === index ? null : index);
  };

  return (
    <div className="services-container">
      <h1 className="title">Our Services</h1>
      <div className="service-cards">
        {services.map((service, serviceIndex) => (
          <div
            key={serviceIndex}
            className="service-card"
            onClick={() => toggleService(serviceIndex)}
          >
            <h2>{service.name}</h2>

            {activeService === serviceIndex && (
              <div className="details-list">
                {service.details.length > 0 && typeof service.details[0] === 'string' ? (
                  <ul>
                    {service.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    {service.details.map((sub, subIndex) => (
                      <div key={subIndex}>
                        <h3
                          className="subcategory"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubcategory(subIndex);
                          }}
                          style={{ cursor: 'pointer', color: '#9b59b6', marginBottom: '0.3rem' }}
                        >
                          {sub.subcategory}
                        </h3>
                        {activeSubcategory === subIndex && (
                          <ul style={{ paddingLeft: '1.2rem', marginTop: 0 }}>
                            {sub.options.map((opt, i) => (
                              <li key={i} style={{ fontWeight: 'normal' }}>
                                {opt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;

'use client';

import { FormEvent, useState } from 'react';

const assetBase = '/assets/bloomly';

const services = [
  {
    title: 'Bath & Spa',
    description:
      'Gentle bathing with safe, pet-friendly shampoos and conditioners to refresh and revitalize. We focus on relaxation and stress-free care so every visit feels like a spa day.',
    image: 'tild3364-3030-4631-b665-393638643235__frame_29_upscayl_3x_.jpg',
  },
  {
    title: 'Haircut & Styling',
    description:
      'Professional cuts tailored to each breed’s needs, from practical trims to creative styling. We shape for both comfort and easy upkeep, leaving pets stylish and confident.',
    image: 'tild3462-3533-4838-b233-393166663066__frame_30.webp',
  },
  {
    title: 'Nail & Paw Care',
    description:
      'Regular nail trimming and paw care improve mobility and prevent common health issues. We work gently and patiently with every pet, keeping paws healthy, soft, and safe.',
    image: 'tild3962-6161-4736-a463-656130613230__frame_31.webp',
  },
];

const features = [
  {
    title: 'Expert Stylists',
    text: 'Our groomers are trained to work with every breed and coat type. We focus on precision, patience, and gentle handling. Each haircut is tailored to highlight your pet’s unique charm.',
  },
  {
    title: 'Complete Coat Care',
    text: 'From deep cleansing to conditioning, we use safe, quality products. Regular care keeps fur soft, shiny, and free from tangles. Every detail is chosen for long-term well-being.',
  },
  {
    title: 'Health & Wellness',
    text: 'We don’t just style — we care for the essentials too. Nails, ears, and teeth are part of our wellness routine. Your pet leaves not only beautiful but also healthier.',
  },
];

const reviews = [
  {
    text: '“Booking is super easy, the studio is clean and welcoming, and the results are always perfect. I wouldn’t trust anyone else with my pet.”',
    author: 'Sophie Williams, owner of Max',
    image: 'tild3837-6461-4337-b762-636138393839__image_42.webp',
  },
  {
    text: '“The team truly understands different breeds and their needs. My cat’s coat has never looked better, and the whole experience was stress-free.”',
    author: 'Michael Brown, owner of Daisy',
    image: 'tild6131-6335-4162-b862-613930633664__image_45.webp',
  },
  {
    text: '“I was amazed at how gentle and caring the groomers were with my anxious dog. He came back looking beautiful, relaxed, and happy.”',
    author: 'Anna Peterson, owner of Lucky',
    image: 'tild6666-3238-4032-b731-323238313862__image_41.webp',
  },
  {
    text: '“Professional, reliable, and kind. They treat every pet as if it were their own — and that makes all the difference.”',
    author: 'Daniel Thompson, owner of Bella',
    image: 'tild3432-3636-4037-a265-333566636464__image_44.webp',
  },
];

const faqs = [
  {
    question: 'How long does a grooming session take?',
    answer:
      'Most appointments last 1.5–2 hours, depending on the size of your pet and the selected services.',
  },
  {
    question: 'Do you groom cats as well as dogs?',
    answer:
      'Yes! Our team is trained to work with both cats and dogs, using gentle techniques to keep them calm and comfortable.',
  },
  {
    question: 'What if my pet is nervous or anxious?',
    answer:
      'We take extra time and care for sensitive pets, with breaks if needed, to ensure a stress-free experience.',
  },
  {
    question: 'How often should I groom my pet?',
    answer:
      'For most breeds, we recommend every 4–6 weeks to maintain healthy skin, coat, and overall hygiene.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <section className="font-notice" aria-label="Template notice">
        <p>This template uses custom fonts.</p>
        <p>
          See <a href="#services">the demo</a> and find the detailed guide to
          connecting fonts at the bottom of the page.
        </p>
      </section>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bloomly home">
          <img
            src={`${assetBase}/tild6633-3666-4461-b465-333633626633__bloomly.svg`}
            alt="Bloomly"
          />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#offers">Offers</a>
          <a href="#reviews">Reviews</a>
          <a href="#gallery">Gallery</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="book-button" href="#contact">
          Book now
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="social-proof">
            <div className="stars" aria-label="Five stars">
              ★★★★★
            </div>
            <strong>200+</strong>
            <span>positive feedback from our clients</span>
          </div>

          <div className="hero-message">
            <h1>Your pet deserves the best care</h1>
            <p>
              At Bloomly, we believe every detail matters. From first impression
              to lasting comfort — we make it shine
            </p>
            <a className="secondary-button" href="#contact">
              Book appointment
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={`${assetBase}/tild6230-6433-4566-a563-313638343732__image_14.jpg`}
            alt="Chocolate labrador wearing a lavender collar"
          />
        </div>
      </section>

      <section className="services-intro" id="services">
        <div className="eyebrow">
          <span aria-hidden="true">✺</span>
          <p>Discover what we do best — tailored solutions for every need</p>
        </div>
        <h2>Complete care for your pet’s everyday needs and well-being</h2>
      </section>

      <section className="service-list" aria-label="Grooming services">
        {services.map((service) => (
          <article
            className="service-card"
            key={service.title}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(13,13,13,.66), rgba(13,13,13,.04)), url("${assetBase}/${service.image}")`,
            }}
          >
            <div className="service-card-copy">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-actions">
                <a className="secondary-button compact" href="#about">
                  Learn more
                </a>
                <a className="outline-button" href="#contact">
                  Book appointment
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="statistics" id="about">
        <div className="statistics-copy">
          <div className="eyebrow compact-eyebrow">
            <span aria-hidden="true">✺</span>
            <p>We take pride in providing top-quality care tailored to every pet</p>
          </div>
          <h2>
            A grooming studio built on care, where <em>health meets beauty</em>,
            and every visit turns into a happy experience
          </h2>
        </div>
        <div className="metric-grid">
          <div><strong>500+</strong><span>Happy pets styled and cared for with love</span></div>
          <div><strong>10+</strong><span>Years professional experience in grooming and pet care</span></div>
          <div><strong>95%</strong><span>Of clients return regularly for ongoing treatments</span></div>
          <div><strong>24/7</strong><span>Online appointment booking at a convenient time</span></div>
        </div>
      </section>

      <section className="about-studio">
        <div className="about-image">
          <img
            src={`${assetBase}/tild3165-3235-4232-b339-366333633438__image-36-upscaled-4x.jpg`}
            alt="Groomer holding two freshly groomed dogs"
          />
        </div>
        <div className="about-panel">
          <h2>Grooming studio where every pet feels loved</h2>
          <div className="feature-list">
            {features.map((feature) => (
              <article key={feature.title}>
                <h3><span aria-hidden="true">✺</span>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="offers" id="offers">
        <div className="section-heading">
          <h2>Special offers for happy pets</h2>
          <p>
            From first-visit discounts to loyalty rewards — we make care both
            stylish and affordable
          </p>
        </div>
        <div className="offer-grid">
          <article className="offer-card">
            <div className="offer-copy">
              <div className="offer-labels"><span>The more you come</span><span>Ongoing offer</span></div>
              <h3>Loyalty Program</h3>
              <p>Collect stamps with every visit. Your 5th grooming session is free — because regular care deserves a reward.</p>
              <a className="book-button inline" href="#contact">Book appointment</a>
            </div>
            <img
              src={`${assetBase}/tild3330-3962-4662-a433-373130633930__36dba52c69ceac49a5a5.webp`}
              alt="Dog during a professional grooming session"
            />
          </article>
          <article className="offer-card">
            <div className="offer-copy">
              <div className="offer-labels"><span>A perfect way to start</span><span>Valid until October 31</span></div>
              <h3>First Visit -20%</h3>
              <p>New clients get 20% off any grooming service. Discover gentle care and styling that pets love.</p>
              <a className="book-button inline" href="#contact">Book appointment</a>
            </div>
            <img
              src={`${assetBase}/tild3963-3861-4539-a366-646164313739__pexels-seljansalim-3.webp`}
              alt="Cat receiving gentle grooming care"
            />
          </article>
        </div>
      </section>

      <section className="gallery" id="gallery">
        <div className="gallery-title">
          <h2>A space made for comfort</h2>
          <p>Discover the atmosphere, details, and spaces that make every visit special</p>
        </div>
        <div className="gallery-collage" aria-label="Bloomly studio gallery">
          <img className="gallery-one" src={`${assetBase}/tild3230-3637-4966-a666-383239626162__nano-banana-2025-09-.webp`} alt="Groomers caring for a small dog" />
          <img className="gallery-two" src={`${assetBase}/tild3231-3165-4736-a534-343733653232__a-series-of-ultra-re.webp`} alt="Warm and welcoming grooming studio" />
          <img className="gallery-three" src={`${assetBase}/tild3532-3137-4263-b730-396562633131__pexels-ron-lach-7792.webp`} alt="Happy corgi at the studio" />
          <img className="gallery-four" src={`${assetBase}/tild3134-6663-4963-b465-316235316264__7382c3162bb2217c4a84.webp`} alt="Yorkshire terrier being brushed" />
          <img className="gallery-five" src={`${assetBase}/tild3165-3235-4232-b339-366333633438__image-36-upscaled-4x.jpg`} alt="Groomer with two dogs" />
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="section-heading left">
          <h2>What our clients say</h2>
          <p>Real stories from pet owners who trust us with their furry friends</p>
        </div>
        <div className="review-grid">
          {reviews.map((review, index) => (
            <article className={index === 2 ? 'review-card featured' : 'review-card'} key={review.author}>
              <div className="stars" aria-hidden="true">★★★★★</div>
              <blockquote>{review.text}</blockquote>
              <footer>
                <img src={`${assetBase}/${review.image}`} alt="" />
                <span>{review.author}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="faq-intro">
          <div className="eyebrow compact-eyebrow">
            <span aria-hidden="true">✺</span>
            <p>We’re here to answer your questions</p>
          </div>
          <h2>Everything you need to know before booking your visit</h2>
          <a className="secondary-button question-button" href="#contact">Have a question? Let’s discuss it now!</a>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const open = openFaq === index;
            return (
              <article className={open ? 'faq-item open' : 'faq-item'} key={faq.question}>
                <button type="button" onClick={() => setOpenFaq(open ? -1 : index)} aria-expanded={open}>
                  <span>{faq.question}</span><strong aria-hidden="true">{open ? '×' : '+'}</strong>
                </button>
                {open && <p>{faq.answer}</p>}
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="booking"
        id="contact"
        style={{ backgroundImage: `linear-gradient(rgba(10,10,10,.4), rgba(10,10,10,.4)), url("${assetBase}/tild3762-6236-4734-a332-633032356439__frame_29_2.jpg")` }}
      >
        <div className="booking-copy">
          <h2>Book your pet’s appointment</h2>
          <p>Sign up today to give your furry friend a refreshing grooming session — easy, fast, and stress-free</p>
        </div>
        <form className="booking-form" onSubmit={submitBooking}>
          <label><span>Your name</span><input name="name" required placeholder="Alex" /></label>
          <label><span>Phone</span><input name="phone" required placeholder="+1 (234) 567-890" /></label>
          <label><span>Pet and service</span><input name="service" required placeholder="Corgi — Bath & Spa" /></label>
          <button className="book-button form-submit" type="submit">Confirm booking</button>
          {sent && <p className="form-success" role="status">Thank you! Your request has been received.</p>}
        </form>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <img src={`${assetBase}/tild6230-6232-4035-b931-623732303736__bloomly.svg`} alt="Bloomly" />
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a><a href="#about">About</a><a href="#offers">Offers</a><a href="#reviews">Reviews</a><a href="#gallery">Gallery</a><a href="#faq">FAQ</a>
          </nav>
        </div>
        <div className="footer-contact">
          <div><small>Address</small><strong>123 Pet Street, Cityville</strong><span>Opening Hours: Mon–Sat: 9:00–19:00</span></div>
          <div><small>Phone</small><strong>+1 (234) 567-890</strong><small>Email</small><strong>hello@bloomly.com</strong></div>
          <div><h3>Get in touch with us</h3><p>Book an appointment, ask a question, or just say hello — we’re always happy to hear from you.</p><a className="outline-button dark" href="#contact">Book appointment</a></div>
        </div>
        <div className="footer-bottom">
          <img src={`${assetBase}/tild6230-6232-4035-b931-623732303736__bloomly.svg`} alt="Bloomly" />
          <a href="#top">Privacy Policy</a>
        </div>
      </footer>

      <section className="template-credit">
        <p>All photos and videos are either from the free resource pexels.com or generated using AI and remain the property of their respective owners. All photographs, texts, and business descriptions are fictitious. Please don’t use the template content for commercial purposes.</p>
        <p>Template developer: Spirina Design / TG @spirina_design</p>
      </section>

      <section className="font-guide">
        <h2>This template requires custom fonts. Set them up manually before using this template.</h2>
        <p>Heading font: Golos Text<br />Body text font: Golos Text</p>
        <p>How to connect fonts:<br />1. Go to Site settings → Fonts and Colors → Google Fonts<br />2. Fill out the following input fields:<br />https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500<br />Heading font family name: Golos Text<br />Body text font family name: Golos Text<br />3. Open each block, select text elements, go to the settings, and change the typeface to Golos Text</p>
        <p>Learn more about setting up custom fonts:<br />https://help.tilda.cc/fonts</p>
        <p>See the original page design here: https://bloomly-template.tilda.ws/</p>
      </section>
    </main>
  );
}

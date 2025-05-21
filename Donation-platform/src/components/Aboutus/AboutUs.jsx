import React from 'react';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div id="about-us-section" className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-paragraph">
        At our organization, we are committed to tackling some of the most pressing issues faced by communities in India. Our mission is to make a tangible difference through targeted initiatives, with a special focus on reducing waste, improving access to education, and supporting those in need.
      </p>

      <h2 className="about-us-subtitle">Food Waste Reduction</h2>
      <p className="about-us-paragraph">
        In India, food waste is a significant challenge. For instance, an Indian wedding can generate about 200-300 kg of food waste, amounting to nearly <span className="about-us-highlight">20%</span> of the food going to waste. In some cases, this figure can be as high as <span className="about-us-highlight">40% to 60%</span>. Additionally, restaurants and street food stalls contribute significantly to this issue, with the food service sector generating <span className="about-us-highlight">11.9 million tons</span> of food waste annually. Our efforts aim to reduce this waste through awareness programs and partnerships with food service establishments.
      </p>

      <h2 className="about-us-subtitle">Access to Education</h2>
      <p className="about-us-paragraph">
        Access to proper education and books remains challenging in many backward areas of India due to inadequate infrastructure, a lack of trained teachers, and limited resources. We strive to bridge this gap by providing essential educational materials and support to these underserved communities.
      </p>

      <h2 className="about-us-subtitle">Winter Relief</h2>
      <p className="about-us-paragraph">
        Cold waves and low temperatures can be deadly in India, especially in northern regions. In 2023 alone, extreme weather events, including cold waves, resulted in the deaths of <span className="about-us-highlight">2,923 people</span>. Our winter relief programs provide warm clothing and other necessities to help protect vulnerable populations from the harsh conditions.
      </p>

      <h2 className="about-us-subtitle">Creative Reuse of Clothing</h2>
      <p className="about-us-paragraph">
        We advocate for the creative reuse of old clothing to promote sustainability and support those in need. Initiatives include transforming old t-shirts and jeans into tote bags, creating cushion covers from sarees and dupattas, and making rugs, mats, and upcycled clothing. These efforts not only reduce waste but also provide functional and fashionable items to those in need.
      </p>

      <h2 className="about-us-subtitle">Toys and Games</h2>
      <p className="about-us-paragraph">
        With around <span className="about-us-highlight">80%</span> of plastic toys ending up in landfills, incinerators, or the ocean, the need for better recycling programs and sustainable practices is clear. We work to raise awareness and implement solutions to reduce this waste and promote a cleaner environment.
      </p>

      <h2 className="about-us-subtitle">Clothing for the Needy</h2>
      <p className="about-us-paragraph">
        Approximately <span className="about-us-highlight">680 million Indians</span>, or <span className="about-us-highlight">56% of the population</span>, lack the means to meet their essential needs, including adequate clothing. Our clothing donation programs aim to provide basic necessities to those in need, helping to improve their quality of life.
      </p>

      <h2 className="about-us-subtitle">Benefits of Donations</h2>
      <p className="about-us-paragraph">
        Donating items to NGOs has a wide range of positive impacts. It provides direct assistance to individuals and families in need, helps NGOs allocate resources more effectively, and promotes environmental sustainability through recycling. Donations foster a sense of community, support various programs through resale in thrift stores, and raise awareness for important social causes. Most importantly, they empower individuals and families to break out of the cycle of poverty.
      </p>

      <p className="about-us-paragraph">
        Join us in making a difference. Together, we can create a more equitable and sustainable future for all.
      </p>
     
      <img
        src="/Food delivery.PNG" 
        alt="Food donation process"
        className="about-us-image"
      />
       <img
        src="/info.PNG" 
        alt="Food donation to"
        className="about-us-image"
      />
      <div class="impact-stories">
  <div class="story-box">
    <h3>Food Donation</h3>
    <p>
      Kavita, a daily wage worker, struggled to provide meals for her family during the pandemic. Through a local donation drive, she received food supplies that sustained her family for three months, bringing hope during a challenging time.
    </p>
    <a href="#" class="read-more-link">Read more about the impact of food donations</a>
  </div>

  <div class="story-box">
    <h3>Clothing Donation</h3>
    <p>
      Ajay, an 8-year-old boy from a remote village, braved harsh winters with no proper clothing. A donation of winter jackets and warm clothes not only protected him but also uplifted his self-esteem in school.
    </p>
    <a href="#" class="read-more-link">Discover more heartwarming stories of clothing donations</a>
  </div>

  <div class="story-box">
    <h3>Education Donation</h3>
    <p>
      Priya, a bright but underprivileged girl, was on the verge of dropping out due to a lack of books and resources. A donor’s contribution provided her with the necessary study materials, allowing her to excel and secure a scholarship.
    </p>
    <a href="#" class="read-more-link">Learn more about the transformative power of education donations</a>
  </div>
</div>

    
    </div>
    
  );
};

export default AboutUs;

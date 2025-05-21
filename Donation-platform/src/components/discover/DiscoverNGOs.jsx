import React, { useState } from "react";
import "./DiscoverNGOs.css";

const DiscoverNGOs = () => {
  const [activeStory, setActiveStory] = useState(null);

  // NGO data
  const donationOptions = [
    {
      category: "Education",
      ngos: [
        { name: "PRAGTI EDUCATION WELFARE SOCIETY", img: "edu1.jpg" },
        { name: "PESW", img: "edu2.jfif" },
        { name: "MANVAV SHIKSHA SEWA SANSTHAN", img: "edu3.jfif" },
        { name: "SEEDLING PUBLIC SCHOOL", img: "edu4.jfif" },
        { name: "LIVE FOR OTHERS", img: "edu5.jfif" },
      ],
    },
    {
      category: "Health",
      ngos: [
        { name: "HAHTFC", img: "health1.jfif" },
        { name: "KARE PLAN", img: "health2.jfif" },
        { name: "WOMENS HEALTH ORGANISATION", img: "health3.jfif" },
        { name: "PHJ", img: "health4.jfif" },
        { name: "ANIMAL CARE", img: "health5.jfif" },
      ],
    },
    {
      category: "Environment",
      ngos: [
        { name: "SAKAL RELIEF FUND", img: "env1.jfif" },
        { name: "NGO-DM HIMACHAL", img: "env2.jfif" },
        { name: "LIVE SOCIETY", img: "env3.jfif" },
        { name: "SH-NSMC", img: "env4.jfif" },
        { name: "MH-COSTAL SAFTY", img: "env5.jfif" },
      ],
    },
    {
      category: "Cloths",
      ngos: [
        { name: "REUSE FASHION", img: "cloth1.jfif" },
        { name: "AHABAN", img: "cloth2.jfif" },
        { name: "CHILD WELFARE SOCIETY", img: "cloth3.jfif" },
        { name: "COLD DAYS ", img: "cloth4.jfif" },
        { name: "URBAN ADULCANCE HELP", img: "cloth5.jfif" },
      ],
    },
    {
      category: "Human Rights",
      ngos: [
        { name: "HUMAN RIGHTS(MINORITY'S GROUP)", img: "hm1.jfif" },
        { name: "WOMEN WELFARE GRP", img: "hm2.jfif" },
        { name: "EQUALITY TRUST FOR(LGBTQ)", img: "hm3.jfif" },
        { name: "GODS FAMILY ORPHANAGE", img: "hm4.jfif" },
        { name: "ORPHAN CARE", img: "hm5.jfif" },
      ],
    },
  ];

  // Stories data
  const storiesData = [
    {
      title: "Pragti Education Welfare Society",
      content: "Pragti Education Welfare Society is dedicated to empowering underprivileged children by providing them access to quality education. They run community programs for distributing learning materials, free tutoring, and creating skill-building opportunities. They relentlessly ensure every child gets a chance to build a bright future through education.",
    },
    {
      title: "Animal Care",
      content: "Animal Care focuses on rescuing and rehabilitating stray animals like dogs and cats. They provide medical treatment, shelter, and adoption services, ensuring these animals find loving homes. Their mission is to create harmony between humans and animals.",
    },
    {
      title: "Reuse Fashion",
      content: "Reuse Fashion encourages sustainable living by collecting gently used clothes and donating them to those in need. This includes the homeless and disaster-affected communities, reducing environmental waste and promoting sharing.",
    },
    {
      title: "God’s Family Orphanage",
      content: "God's Family Orphanage provides love, care, and hope to orphaned children. It ensures a safe environment where children receive education, emotional support, and life skills training. Their goal is to connect each child with a loving family.",
    },
  ];

  // Function to toggle expanded story
  const toggleStory = (index) => {
    setActiveStory(activeStory === index ? null : index);
  };

  return (
    <div className="ngo-page">
      <h1>NGOs Listed by Sectors of Their Work</h1>
      {donationOptions.map((option, index) => (
        <div className="donation-row" key={index}>
          <h2 className="discoverpageheading" >{option.category}</h2>
          <div className="ngo-row">
            {option.ngos.map((ngo, i) => (
              <div className="ngo-box" key={i}>
                <img src={ngo.img} alt={ngo.name} />
                <p>{ngo.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Stories Section */}
      <div className="stories-section">
        <h2 className="discoverpageheading" >Stories of Our Organizations</h2>
        <div className="stories-container">
          {storiesData.map((story, index) => (
            <div
              className={`story-box ${activeStory === index ? "active" : ""}`}
              key={index}
              onClick={() => toggleStory(index)}
            >
              <div className="story-header">{story.title}</div>
              <div className="story-content">
                {story.content}
                <a href="#" className="read-more">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverNGOs;

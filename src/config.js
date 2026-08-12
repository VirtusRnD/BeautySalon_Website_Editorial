export const config = {
  settings: {
    smoothScroll: false,
  },

  hero: {
    ctaLink: "#booking",
    bgImage: "/images/hero-bg-texture.webp",
    fanImages: [
      { src: "/images/hero-1.webp" },
      { src: "/images/hero-2.webp" },
      { src: "/images/hero-3.webp" },
    ],
  },

  aboutUs: {
    ctaLink: "#",
    images: [{ src: "/images/about-1.webp" }, { src: "/images/about-2.webp" }],
  },

  gallery: {
    bgImage: "/images/gallery-bg.webp",
    images: [
      { src: "/images/gallery-1.webp" },
      { src: "/images/gallery-2.webp" },
      { src: "/images/gallery-3.webp" },
      { src: "/images/gallery-4.webp" },
      { src: "/images/gallery-5.webp" },
      { src: "/images/gallery-6.webp" },
      { src: "/images/gallery-7.webp" },
    ],
  },

  treatments: {
    items: [
      {
        id: 1,
        imageSrc: "/images/treatment-1.webp",
        imageLeft: true,
        buttonLink: "#booking",
      },
      {
        id: 2,
        imageSrc: "/images/treatment-2.webp",
        imageLeft: false,
        buttonLink: "#booking",
      },
    ],
  },

  reviews: {
    items: [
      { id: 1, rating: 5, avatar: "/images/avatar-1.webp" },
      { id: 2, rating: 5, avatar: "/images/avatar-2.webp" },
      { id: 3, rating: 4, avatar: "/images/avatar-3.webp" },
    ],
  },

  contact: {
    imageSrc: "/images/contact-bg.webp",
    infoIcons: ["address", "phone", "hours"], // IDs map to the text in JSON
  },

  footer: {
    bgImage: "/images/footer-bg.webp",
    brand: {
      email: "StylinSalon34@gmail.com",
      phone: "93230 731-2383",
    },
    links: {
      companyUrls: ["#", "#about", "#treatments", "#gallery", "#contact"],
      supportUrls: ["#", "#", "#", "#faq", "#"],
    },
    contact: {
      socials: [
        { id: "google", url: "#" },
        { id: "facebook", url: "#" },
        { id: "twitter", url: "#" },
        { id: "instagram", url: "#" },
      ],
    },
  },
};

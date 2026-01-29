import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    name: "Sebastian Speier",
    company: "Shop",
    comment:
      "Confluence is a great resource and it always comes in handy to see what the best practices or standards are for mobile patterns in our current landscape.",
  },
  {
    name: "Marco Cornacchia",
    company: "Figma",
    comment:
      "Confluence is one of my favorite resources for product design and UI inspo. I love having access to a ton of real world examples.",
  },
  {
    name: "Daryl Ginn",
    company: "Endless",
    comment:
      "Confluence has quickly become our favourite inspiration resource for designing mobile apps at endless.design. Their advanced filtering is unmatched.",
  },
  {
    name: "Meng To",
    company: "DesignCode",
    comment:
      "Confluence is a game-changer for designers looking to step up their understanding of UX and UI design patterns. It’s so massive, meticulously organized, has deep user flows and even a figma plugin!",
  },
  {
    name: "Taha Hossain",
    company: "Daybreak",
    comment:
      "We can’t imagine a product design process without Confluence. The clarity and precision it provides make it just as valuable as it is intuitive.",
  },
  {
    name: "Haerin Song",
    company: "Klarna",
    comment:
      "By using the Confluence app, I save both my research time and space in my photo galleries filled with screenshots. It is a wonderful design tool.",
  },
  {
    name: "Meng To",
    company: "DesignCode",
    comment:
      "Confluence is a game-changer for designers looking to step up their understanding of UX and UI design patterns. It’s so massive, meticulously organized, has deep user flows and even a figma plugin!",
  },
  {
    name: "Marco Cornacchia",
    company: "Figma",
    comment:
      "Confluence is one of my favorite resources for product design and UI inspo. I love having access to a ton of real world examples.",
  },
  {
    name: "Daryl Ginn",
    company: "Endless",
    comment:
      "Confluence has quickly become our favourite inspiration resource for designing mobile apps at endless.design. Their advanced filtering is unmatched.",
  },
  {
    name: "Taha Hossain",
    company: "Daybreak",
    comment:
      "We can’t imagine a product design process without Confluence. The clarity and precision it provides make it just as valuable as it is intuitive.",
  },
  {
    name: "Haerin Song",
    company: "Klarna",
    comment:
      "By using the Confluence app, I save both my research time and space in my photo galleries filled with screenshots. It is a wonderful design tool.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="bg-[#0f0f0f] py-16 px-4 md:px-40">
      <h2 className="text-[#e9e6e1] text-semibold text-5xl text-center mb-12">
        Our Happy Customers
      </h2>
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="break-inside-avoid">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
};

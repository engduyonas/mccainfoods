import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/app/components/HeroBanner";
import SidePanel from "@/app/components/SidePanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Passion for Food | McCain Foods",
};

const foodSections = [
  {
    title: "Delicious Fries",
    description:
      "We are well known for our delicious French fries which started our company over 60 years ago! Our French fries are the perfect partner for any meal. We have a range of different offerings including potato or sweet potato, fried or oven baked, straight or crinkled, thin cut or thick cut, and skin-on or skin-off.",
    images: [
      "https://www.mccain.com/media/2632/mccain-french-fries-on-brown-paper.jpg",
      "https://www.mccain.com/media/2633/mccain-sweet-potato-fries.jpg",
      "https://www.mccain.com/media/2634/mccain-fries-on-white-plate.jpg",
      "https://www.mccain.com/media/2636/mccain-french-fries-on-wooden-serving-board.jpg",
      "https://www.mccain.com/media/2637/mccain-fries.jpg",
      "https://www.mccain.com/media/2639/mccain-chunky-gastro-fries.jpg",
      "https://www.mccain.com/media/2635/mccain-skin-on-french-fries.jpg",
    ],
  },
  {
    title: "Potato Creations",
    description:
      "We love potatoes! We are able to transform this versatile vegetable into amazing food creations - including jacket potatoes, wedges, roast potatoes, croquettes, mash, lattice fries, spirals, potato pancakes, hash browns, potato smiles, potato patties and tasti taters.",
    images: [
      "https://www.mccain.com/media/2642/mccain-seasoned-tots.jpg",
      "https://www.mccain.com/media/2641/mccain-baked-jacket-potatoes.jpg",
      "https://www.mccain.com/media/2643/mccain-mini-waffles.jpg",
      "https://www.mccain.com/media/2645/mccain-roast-potatoes.jpg",
      "https://www.mccain.com/media/2646/mccain-potato-gratin.jpg",
      "https://www.mccain.com/media/2644/mccain-smiles.jpg",
      "https://www.mccain.com/media/2647/mccain-potato-wedges.jpg",
    ],
  },
  {
    title: "Tasty Appetizers",
    description:
      "What better way to start or accompany a meal than with our tasty appetizers. We have a wide range of appetizers within both our foodservice and retail businesses - including onion rings, cheese nuggets, breaded mushrooms, cheese sticks, stuffed jalapenos and much more!",
    images: [
      "https://www.mccain.com/media/2654/mccain-potato-fusion-roll.jpg",
      "https://www.mccain.com/media/2652/mccain-guacamole.jpg",
      "https://www.mccain.com/media/2649/mccain-breaded-mozzarella-cheese-sticks.jpg",
      "https://www.mccain.com/media/2651/mccain-chilli-pepper-cheese-nuggets.jpg",
      "https://www.mccain.com/media/2650/mccain-cheddar-and-jalapeno-popper-bites.jpg",
    ],
  },
  {
    title: "Scrumptious Pizzas",
    description:
      "Our delicious pizzas and pizza pockets are bound to be a crowd-pleaser, perfect to share with family and friends. Tasty and convenient: sometimes only a pizza will do!",
    images: [
      "https://www.mccain.com/media/2657/mccain-rustica-pizza-spinach-mozzarella.jpg",
    ],
  },
  {
    title: "Delightful Desserts",
    description:
      "Our range of desserts are perfect as a treat to finish off a great meal or when you've got something to celebrate! Why not try serving with fruit, cream, ice-cream or sprinkles?",
    images: [
      "https://www.mccain.com/media/2661/mccain-chocolate-berry-explosion.jpg",
      "https://www.mccain.com/media/2662/mccain-vanilla-lemon-coconut-cake.jpg",
      "https://www.mccain.com/media/2659/mccain-peanut-pretzel-chocolate-sundae.jpg",
      "https://www.mccain.com/media/2658/sara-lee-deep-dish-double-chocolate-pudding.jpg",
    ],
  },
];

export default function PassionForFoodPage() {
  return (
    <>
      <HeroBanner
        title="Our Passion for Food"
        backgroundImage="https://www.mccain.com/media/4386/passion-for-food-d.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-lg text-mccain-gray-dark leading-relaxed max-w-4xl mb-12">
          For generations, we have helped create enjoyable mealtimes around the world. McCain Foods has been at the
          centre of mealtimes for generations. Creating great tasting food is at the heart of everything we do. We
          are constantly developing innovative new food offerings to meet different occasions, tastes and needs for
          people around the world.
        </p>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {foodSections.map((section) => (
              <section key={section.title}>
                <h2 className="text-3xl font-bold text-mccain-dark mb-4">
                  {section.title}<span className="text-mccain-yellow">.</span>
                </h2>
                <p className="text-mccain-gray-dark leading-relaxed mb-6">{section.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {section.images.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`${section.title} ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <p className="text-xs text-mccain-gray-dark italic">
              These delicious food images are only serving suggestions and the products shown may not be available
              in every market.
            </p>
            <Link
              href="/information-centre/news"
              className="inline-block bg-mccain-green hover:bg-mccain-green-dark text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
            >
              Find Your Local Country Website
            </Link>
          </div>

          <SidePanel
            relatedLinks={[
              { label: "Customers", href: "/about-us/our-business-brands" },
              { label: "Our Business & Brands", href: "/about-us/our-business-brands" },
            ]}
          />
        </div>
      </div>
    </>
  );
}

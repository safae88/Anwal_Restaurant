"use client";

import { useState } from "react";
import { useInView } from "./useInView";
import GoldDivider from "./GoldDivider";

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  category: string;
}

const items: MenuItem[] = [
  { name: "Charred Sourdough & Cultured Butter", desc: "Wood-fired, flaky, served warm.", price: "$8", category: "Starters" },
  { name: "Hamachi Crudo", desc: "Citrus, fennel, Calabrian chili oil.", price: "$19", category: "Starters" },
  { name: "Roasted Bone Marrow", desc: "Sea salt, parsley, lemon zest, grilled bread.", price: "$22", category: "Starters" },
  { name: "Ember-Glazed Short Rib", desc: "Forty-eight hours over the coals, burnt honey, bone jus.", price: "$38", category: "Mains" },
  { name: "Hand-Pulled Tagliatelle", desc: "Slow-cooked ragu, aged parmesan, black pepper.", price: "$28", category: "Mains" },
  { name: "Burnt Butter Scallops", desc: "Seared over open flame, brown butter, sea salt.", price: "$36", category: "Mains" },
  { name: "Charred Octopus", desc: "Smoked paprika, lemon confit, olive oil.", price: "$32", category: "Mains" },
  { name: "Molten Chocolate Fondant", desc: "Dark chocolate, salted caramel, vanilla bean ice cream.", price: "$16", category: "Desserts" },
  { name: "Burnt Basque Cheesecake", desc: "Caramelised top, centres on wobbling custard, berry compote.", price: "$14", category: "Desserts" },
  { name: "Smoked Old Fashioned", desc: "Bourbon, demerara, smoked orange peel, cherry.", price: "$18", category: "Drinks" },
  { name: "Negroni Classico", desc: "Gin, Campari, sweet vermouth, orange twist.", price: "$16", category: "Drinks" },
  { name: "Espresso Martini", desc: "Vodka, coffee liqueur, freshly pulled espresso.", price: "$17", category: "Drinks" },
];

function StaggeredMenuItem({
  item,
  delay,
}: {
  item: MenuItem;
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`menu-item ${inView ? "in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="menu-item-left">
        <h3>{item.name}</h3>
        <div className="menu-dots" />
      </div>
      <span className="menu-price">{item.price}</span>
      <p>{item.desc}</p>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState("All");
  const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>(0.3);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section className="section menu" id="menu">
      <div
        ref={headRef}
        className={`menu-head reveal ${headInView ? "visible" : ""}`}
      >
        <p className="eyebrow">The Menu</p>
        <h2 className="serif">Fire, Smoke & Patience</h2>
        <p>Small plates · Open flame · Seasonal</p>
        <GoldDivider width={220} className="menu-head-divider" />
      </div>

      <div className="menu-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`menu-tab ${active === cat ? "active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filtered.map((item, i) => (
          <StaggeredMenuItem key={item.name} item={item} delay={i * 100} />
        ))}
      </div>

      <div className="menu-footer">
        <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
          Private Events
        </p>
        <p style={{ color: "var(--muted)", fontWeight: 300, maxWidth: "42ch", margin: "0 auto" }}>
          We host intimate gatherings in our private room. The chef designs the
          menu around your evening.
        </p>
        <a href="#reserve" className="btn btn-gold" style={{ marginTop: "1.6rem" }}>
          Reserve the Room
        </a>
      </div>
    </section>
  );
}

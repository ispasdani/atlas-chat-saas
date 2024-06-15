export const tiers = [
  {
    name: "Trial Package",
    id: "trial",
    href: "#",
    priceMonthly: "$1.99",
    priceId: process.env.NEXT_PUBLIC_PACKAGE_TRIAL,
    description: "For exploration of AI technology.",
    features: [
      "200 Credits",
      "Unlimited Participants in Chats",
      "Unlimited Chat Rooms",
      "Supports all languages",
      "Speech to text support",
      "Text to speech support",

      ,
    ],
  },
  {
    name: "PRO Package",
    id: "pro",
    href: "#",
    priceMonthly: "$7.99",
    priceId: process.env.NEXT_PUBLIC_PACKAGE_PRO,
    description:
      "Perfect for professionals and small businesses in need of significant interactions.",
    features: [
      "2000 Credits",
      "Unlimited Participants in Chats",
      "Unlimited Chat Rooms",
      "Supports all languages",
      "Speech to text support",
      "Text to speech support",
    ],
  },
  {
    name: "Base Package",
    id: "base",
    href: "#",
    priceMonthly: "$4.99",
    priceId: process.env.NEXT_PUBLIC_PACKAGE_BASE,
    description: "Start chatting right away with anyone, anywhere.",
    features: [
      "1000 Credits",
      "Unlimited Participants in Chats",
      "Unlimited Chat Rooms",
      "Supports all languages",
      "Speech to text support",
      "Text to speech support",
    ],
  },
];

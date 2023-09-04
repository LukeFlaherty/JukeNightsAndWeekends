import { Button } from "@chakra-ui/react";
import { Link } from "@saas-ui/react";
import { NextSeoProps } from "next-seo";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { Logo } from "./logo";

const siteConfig = {
  logo: Logo,
  seo: {
    title: "Juke",
    description: "Discover Music Like Never Before with Juke.",
  } as NextSeoProps,
  termsUrl: "#",
  privacyUrl: "#",
  header: {
    links: [
      {
        id: "features",
        label: "Features",
      },
      {
        id: "faq",
        label: "FAQ",
      },
      {
        label: "Login",
        href: "https://juke-git-main-lukeflaherty.vercel.app/",
      },
      {
        label: "Sign Up",
        href: "https://juke-git-main-lukeflaherty.vercel.app/",
        variant: "primary",
      },
    ],
  },
  footer: {
    // copyright: (
    //   <>
    //     Built by{" "}
    //     <Link href="https://twitter.com/Pagebakers">Eelco Wiersma</Link>
    //   </>
    // ),
    links: [
      {
        href: "https://calendly.com/lukejflahertyv",
        label: "Contact",
      },
      {
        href: "https://twitter.com/jukefyi",
        label: <FaTwitter size="14" />,
      },
    ],
  },
  signup: {
    title: "Start building with Saas UI",
    features: [
      {
        icon: FiCheck,
        title: "Accessible",
        description: "All components strictly follow WAI-ARIA standards.",
      },
      {
        icon: FiCheck,
        title: "Themable",
        description:
          "Fully customize all components to your brand with theme support and style props.",
      },
      {
        icon: FiCheck,
        title: "Composable",
        description:
          "Compose components to fit your needs and mix them together to create new ones.",
      },
      {
        icon: FiCheck,
        title: "Productive",
        description:
          "Designed to reduce boilerplate and fully typed, build your product at speed.",
      },
    ],
  },
};

export default siteConfig;

import * as React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";

import { FallInPlace } from "components/motion/fall-in-place";
import { Hero } from "components/hero";
import { Link, Br } from "@saas-ui/react";
import { Em } from "components/typography";
import { NextjsLogo, ChakraLogo } from "components/logos";
import {
  FiArrowRight,
  FiBarChart2,
  FiBox,
  FiCheck,
  FiCheckCircle,
  FiCode,
  FiCopy,
  FiDollarSign,
  FiFeather,
  FiFlag,
  FiGlobe,
  FiGrid,
  FiHeadphones,
  FiHeart,
  FiHexagon,
  FiLock,
  FiMusic,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Faq } from "components/faq";
import { Pricing } from "components/pricing/pricing";

import { ButtonLink } from "components/button-link/button-link";
import { Testimonial, Testimonials } from "components/testimonials";

import faq from "data/faq";
import testimonials from "data/testimonials";
import pricing from "data/pricing";

import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from "components/highlights";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="Juke - What is it?"
        description="Discover Music Like Never Before with Juke."
      />
      <Box>
        <HeroSection />

        <HighlightsSection />

        <FeaturesSection />

        <TestimonialsSection />

        {/* <PricingSection /> */}

        <FaqSection />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Revolutionizing the
                <Br /> <Em>Music Industry</Em>
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                <Em>Join</Em> the Juke Movement. <Br />
                <Em>Embrace</Em> Web3 Innovation. <Br />
                <Em>Support</Em> Artists and <Em>Earn $</Em> While Listening
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              {/* <HStack pt="4" pb="12" spacing="8">
                {/* <NextjsLogo height="28px" /> */}
              {/* </HStack> */}

              <ButtonGroup pt="8" spacing={4} alignItems="center">
                <ButtonLink
                  colorScheme="primary"
                  size="lg"
                  href="https://app.juke.fyi/"
                >
                  Sign Up
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="https://calendly.com/lukejflaherty"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: "common",
                        transitionDuration: "normal",
                        ".chakra-button:hover &": {
                          transform: "translate(5px)",
                        },
                      }}
                    />
                  }
                >
                  Book Demo
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: "none", lg: "block" }}
            left={{ lg: "60%", xl: "55%" }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/screenshots/new/list.png"
                  layout="fixed"
                  width={1200}
                  height={762}
                  alt="Screenshot of the home page in Juke"
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: "Discover Unique Sounds",
            icon: FiMusic,
            description:
              "Explore a diverse range of music from emerging artists.",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "Empower Independent Artists",
            icon: FiHeart,
            description:
              "Support talented artists directly and help them thrive.",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "Earn While You Listen",
            icon: FiDollarSign,
            description:
              "Get rewarded with cryptocurrency for streaming tracks.",
            iconPosition: "left",
            delay: 1,
          },
          {
            title: "Seamless & User-Friendly",
            icon: FiCheckCircle,
            description:
              "Enjoy a smooth experience while navigating our intuitive platform.",
            iconPosition: "left",
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard("yarn add @saas-ui/react");

  // Inside your component function
  const redirectToApp = () => {
    window.location.href = "https://app.juke.fyi/";
  };

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Unlock the Potential">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Explore the endless possibilities with <Em>powerful features</Em>{" "}
            that elevate your music experience. Unleash the artist in you and
            discover new dimensions of creativity.
          </Text>

          <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
            cursor="pointer"
            onClick={redirectToApp} // Adjust the route accordingly
          >
            <Box>
              <Text color="yellow.400" display="inline">
                Join Now
              </Text>{" "}
              <Text color="cyan.300" display="inline">
                for Free
              </Text>
            </Box>
            <IconButton
              icon={<FiArrowRight />} // Arrow icon
              aria-label="Redirect to app"
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Elevate Your Music Experience">
        <Text color="muted" fontSize="lg">
          We bring you <Em>innovative tools</Em> designed to amplify your
          connection with music. Experience the future of music exploration with
          Juke.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Alex Martin"
        description="Indie Artist"
        avatar="/static/images/avatar.jpg"
        gradient={["blue.200", "green.500"]}
      >
        “Juke has been a game-changer for me as an indie artist. It empowers me
        to share my music directly with listeners and earn rewards for my
        creativity. Truly revolutionary!”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Unleash Your Creative Journey"
      >
        <Text color="muted" fontSize="lg">
          Embrace a platform that offers you the tools and opportunities to
          connect with your audience, monetize your talent, and shape the future
          of the music industry.
        </Text>
        <Wrap mt="8">
          {[
            "Direct Fan Engagement",
            "Monetization",
            "Collaboration",
            "Innovative Playlists",
            "Music Analytics",
            "Artist Communities",
            "Blockchain Integration",
            "Interactive Experiences",
            "Empowering Features",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="left"
          as="p"
        >
          Elevate Your Music Experience
          <Br /> with Unique Features.
        </Heading>
      }
      description={
        <>
          Juke offers a diverse set of features to enhance your music journey.
          <Br />
          Whether you&apos;re an artist or a listener, our tools empower you to
          create and discover like never before.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: "Artist Tools.",
          icon: FiMusic,
          description:
            "Empower musicians with tools for monetization, promotion, and direct fan engagement.",
          variant: "inline",
        },
        {
          title: "Listener Experience.",
          icon: FiHeadphones,
          description:
            "Curated playlists, AI-powered recommendations, and interactive features for a tailored experience.",
          variant: "inline",
        },
        {
          title: "Web3 Integration.",
          icon: FiHexagon,
          description:
            "Embrace the decentralized future with blockchain-based authenticity, ownership, and rewards.",
          variant: "inline",
        },
        {
          title: "Revenue Streams.",
          icon: FiDollarSign,
          description:
            "Artists can earn through streaming, NFTs, and virtual events. Listeners can support favorites directly.",
          variant: "inline",
        },
        {
          title: "Collaborative Space.",
          icon: FiUsers,
          description:
            "Connect with other artists, collaborate on projects, and engage with a vibrant community.",
          variant: "inline",
        },
        {
          title: "Personalization.",
          icon: FiHeart,
          description:
            "Tailor your experience, discover new genres, and connect deeply with music that resonates.",
          variant: "inline",
        },
        {
          title: "Innovation.",
          icon: FiFeather,
          description:
            "Stay ahead with cutting-edge features, from AI-generated music to virtual reality concerts.",
          variant: "inline",
        },
        {
          title: "Analytics.",
          icon: FiBarChart2,
          description:
            "Gain insights into your audience, track performance, and make informed decisions.",
          variant: "inline",
        },
        {
          title: "Global Reach.",
          icon: FiGlobe,
          description:
            "Reach fans worldwide, breaking down geographical barriers and expanding your reach.",
          variant: "inline",
        },
      ]}
    />
  );
};

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t);

        return columns;
      },
      [[], [], []]
    );
  }, []);

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  );
};

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  );
};

const FaqSection = () => {
  return <Faq {...faq} />;
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Follow us on Twitter for updates! 🚀 ",
        description:
          '<img src="https://img.shields.io/twitter/follow/:jukefyi" />',
        href: "https://twitter.com/jukefyi",
        action: false,
      },
    },
  };
}

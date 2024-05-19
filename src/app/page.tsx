'use client'
import { classNames } from "@/lib/utils/ui.util";
import { animate, motion, useAnimate, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import React, { useEffect } from "react";

const MarqueeText = () => <h1 className="text-4xl md:text-9xl font-bold text-nowrap whitespace-nowrap p-5">
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
</h1>

export default function Home() {
  return <div className="bg-white">
    <section className="h-[100vh] flex justify-center items-center">
      <div className="">
        <h1 className="text-6xl font-bold text-center text-gray-800 mb-4">Welcome to AI Friend Chat!</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Connect with an AI friend for interesting conversations.</p>
      </div>
    </section>
    <section>
    </section>
    <section className="py-20 pb-32 relative">
      <div className="rotate-180 top-0 bg-white border-y border-black">
        <MarqueeText />
      </div>
      <div className="relative z-10 -inset-10 w-[150%] -rotate-12 top-0 bg-white border-y border-black">
        <MarqueeText />
      </div>
      <div className=" top-0 bg-white border-y border-black">
        <Marquee>
          <MarqueeText />
        </Marquee>
      </div>
    </section>
    <TextSection />
    <ChatSection />
    <section className="min-h-[100vh] stripe-bg py-32 px-8 overflow-hidden">
      <h1 className="text-6xl font-bold text-center text-gray-800 mb-4">Welcome to AI Friend Chat!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[0, 1, 2, 3].map((index) => (
          <MiniCard key={index} delay={index / 10}>
            <div className="border border-black p-5 relative -top-10 bg-white">
              <TestImage />
            </div>
            <h2 className="text-2xl font-bold mb-3">Card {index + 1}</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam rerum laudantium molestias neque, deserunt corrupti cumque repudiandae dignissimos eos saepe?</p>
          </MiniCard>
        ))}
      </div>
    </section>

    {/* <section className="px-10 py-20 relative">
      <div className="flex flex-wrap gap-3">
        {[1, 2,3,6,12].map((index) => (
          <HorizonCard className={classNames('w-[30%]', `rotate-${index}`)} delay={index}>
            <div className="flex gap-5">
              <TestImage />
              <div>
                <h2 className="text-3xl font-bold mb-3">Card {index + 1}</h2>
              </div>
            </div>
          </HorizonCard>
        ))}
      </div>
    </section> */}
  </div>
    ;
}

function ChatSection() {
  const ref = React.useRef(null);
  const [isScrolling, sesIsScrollling] = React.useState(false);
  const [isEnter, setIsEnter] = React.useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    smooth: 1,
    layoutEffect: true
  });
  // const boxY = useTransform(
  //   scrollYProgress,
  //   [0, window?.innerHeight],
  //   [0, window?.innerHeight]
  // );
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1 || latest === 0) {
      sesIsScrollling(false);
    } else {
      sesIsScrollling(true);
    }
    if (latest >= 0.1 && animations[0] !== null) {
      animations[0]();
      animations[0] = null;
    } else if (latest >= 0.3 && animations[1] !== null) {
      animations[1]();
      animations[1] = null;
    } else if (latest >= 0.55 && animations[2] !== null) {
      animations[2]();
      animations[2] = null;
    } else if (latest >= 0.7 && animations[3] !== null) {
      animations[3]();
      animations[3] = null;
    } else if (latest >= 0.9 && animations[4] !== null) {
      animations[4]();
      animations[4] = null;
    }
  });

  const animations: (Function | null)[] = [
    () => animate('#chat1', { opacity: 1, x: 0, scale: 1 }, { duration: 0.5 }),
    () => {
      animate('#chatImage', { scale: [1.5, .9, 1.3, 1] }, { duration: 0.5 });
      animate('#chat2', { opacity: 1, x: 0, scale: 1 }, { duration: 0.5 })
    },
    () => animate('#chat3', { opacity: 1, x: 0, scale: 1 }, { duration: 0.5 }),
    () => {
      animate('#chat4', { opacity: 1, x: 0, scale: 1 }, { duration: 0.5 });
      animate('#chatImage', { scale: [1.5, .9, 1.3, 1] }, { duration: 0.5 });
    },
    () => animate('#chat5', { opacity: 1, x: 0, scale: 1 }, { duration: 0.5 })
  ]

  const test = () => {
    setIsEnter(e => !e);
  }

  return (
    <section className="py-32 relative" ref={ref}>
      <motion.div viewport={{
        once: false,
      }}
        onViewportEnter={test}
        onViewportLeave={() => {
          animate('.chat', { opacity: 0, x: '-10%', scale: .8 })
          test();
        }}
        layout
      >

        <motion.div
          style={{
            position: isScrolling ? "fixed" : "absolute",
            [!isEnter ? 'top' : 'bottom']: 0,
          }}
          className="flex w-full h-[100vh]"
        >
          <div className="p-5 w-full flex items-center justify-center hidden md:flex">
            <div id="chatImage">
              <TestImage />
            </div>
          </div>
          <div className="p-5 w-full flex items-center justify-center">
            <div className="w-full border border-black rounded-lg p-4">
              <div className="px-5 py-3 flex gap-4 items-center border-b border-black">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="h-3 bg-slate-200 rounded rounded-lg w-20"></div>
              </div>
              <div className="h-[400px] p-5 flex flex-col gap-5">
                <motion.div id="chat1" className="chat flex" initial={{ opacity: 0, x: '-10%', scale: .8 }}>
                  <UserChatBubble>Hi What's your name?</UserChatBubble>
                </motion.div>
                <motion.div id="chat2" className="chat" initial={{ opacity: 0, x: '-10%', scale: .8 }}>
                  <ChatBubble>My name is Kuromi</ChatBubble>
                </motion.div>
                <motion.div id="chat3" className="chat" initial={{ opacity: 0, x: '-10%', scale: .8 }}>
                  <UserChatBubble>Nice to meet you Kuromi</UserChatBubble>
                </motion.div>
                <motion.div id="chat4" className="chat" initial={{ opacity: 0, x: '-10%', scale: .8 }}>
                  <ChatBubble>My pleasure</ChatBubble>
                </motion.div>
                <motion.div id="chat5" className="chat" initial={{ opacity: 0, x: '-10%', scale: .8 }}>
                  <UserChatBubble>Would you be my friend?</UserChatBubble>
                </motion.div>
              </div>
              <div className="rounded-lg bg-slate-100 h-10 w-full"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="h-[100vh]"></div>
      <div className="h-[100vh]"></div>
      <div className="h-[100vh]"></div>


    </section>
  )
}

const ChatBubble: React.FC<React.PropsWithChildren<{direction?: string}>> = ({ children, direction = 'right' }) => {
  //   const [scope, animate] = useAnimate()
  //   useEffect(() => {
  //     if (isInView) {
  //       animate(scope.current, { opacity: 1 })
  //     }
  //  }, [isInView])
  return (
    <div className="flex gap-5">
      <div className="rounded-full bg-slate-200 h-10 w-10"></div>
      <div className="flex-1 w-[80%] border border-black rounded p-2 rounded-e-xl rounded-es-xl">
        {children}
      </div>
    </div>
  )
}
const UserChatBubble: React.FC<React.PropsWithChildren> = ({ children }) => <div className="ml-auto w-[60%] border border-black rounded p-2 rounded-s-xl rounded-ee-xl">
  {children}
</div>

function TextSection() {
  const ref = React.useRef(null);
  return (
    <section className="py-32 px-5" ref={ref}>
      <h1 className="md:text-8xl text-5xl">
        <SmoothText text="Hi my name is " />
        <TextSectionText>
          Mina
        </TextSectionText>
        <br />
        <SmoothText text="Nice to meet you" />
        <br />
        <SmoothText text="I'm very" />
        <TextSectionText>
          Lovely
        </TextSectionText>
        and
        <br />
        <TextSectionText>
          Sexy
        </TextSectionText>
      </h1>
    </section>
  )
}
const TextSectionText: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const ref = React.useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start center", "end start"],
  // });
  // const scrollValue = useTransform(scrollYProgress, [0, 0.5], ['100%', '0%']);
  // const clipPathVal = useMotionTemplate`inset(0% ${scrollValue} 0% 0%)`;
  // return (
  //   <span className="relative">
  //     <span ref={ref}>
  //       {children}
  //     </span>
  //     <motion.span style={{ clipPath: clipPathVal }} transition={{duration: 1}} 
  //     className="absolute top-0 left-0 bg-black text-white">
  //       {children}
  //     </motion.span>
  //   </span>
  // )
  return (
    <span className="relative">
      <span>
        {children}
      </span>
      <motion.span
        initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }} transition={{ duration: 1 }}
        className="absolute top-0 left-0 bg-black text-white">
        {children}
      </motion.span>
    </span>
  )
}

const SmoothText = ({ text = '' }) => {
  const textList = text.split(" ");
  return (
    <>
      {textList.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          viewport={{ once: false }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: .8,
            delay: i / 10,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </>
  )
}

const Marquee: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="marquee-container" style={{ width: "100%", overflow: "hidden" }}>
      <div className="marquee-inner" style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
        <motion.div
          className="" animate={{ x: "-100%", transition: { duration: 50, ease: "linear", repeat: Infinity } }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

// const Card = ({ children, delay }) => {
//   return (
//     <motion.div
//       initial={{ y: "30%", opacity: 0, scale: .5, x: '-10%' }}
//       whileInView={{ y: 0, opacity: 1, scale: 1, x: 0 }}
//       transition={{ duration: 0.3, delay }}
//       className="bg-white border border-black p-8 borderp-4 rounded-lg"
//     >
//       {children}
//     </motion.div>
//   );
// };

const HorizonCard: React.FC<React.PropsWithChildren<{className: string; delay: number}>> = ({ children, className, delay }) => {
  return (
    <div className={className}>
      <motion.div
        initial={{ y: "30%", opacity: 0, scale: .5, x: '-10%' }}
        whileInView={{ y: 0, opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, delay }}
        className={classNames('border border-black p-10 rounded-lg')}
      >
        {children}
      </motion.div>
    </div>)
}

const MiniCard: React.FC<React.PropsWithChildren<{delay: number}>> = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ y: "30%", opacity: 0, scale: 0 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white border border-black p-5 rounded-lg flex flex-col items-center justify-center"
    >
      {children}
    </motion.div>)
}

const TestImage = () => <img alt="" width="100" height="100" src="https://m.media-amazon.com/images/I/51I3EcXbLzL._AC_UF894,1000_QL80_.jpg" />

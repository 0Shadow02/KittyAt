import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import { StarIcon, Stars } from "lucide-react";



const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "KittyAt has been paying off for our SaaS. Nice to have simple way to see how we're doing day-to-day. Definitely makes our lives easier.",
      img: "https://avatars.githubusercontent.com/u/16860528",
      stars: 5
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatars.githubusercontent.com/u/20110627",
      stars: 4
    },
    {
      name: "David",
      username: "@david",
      body: "Game-changing platform for real-time metrics. Customer support is top-notch and always responsive.",
      img: "https://avatars.githubusercontent.com/u/106103625",
      stars: 5
    },
    {
      name: "Shadow",
      username: "@shadow",
      body: "The analytics dashboard is incredibly intuitive. We've reduced our reporting time by 40% since implementing this solution.",
      img: "https://avatars.githubusercontent.com/u/59442788",
      stars: 4
    },
    {
      name: "Euler Williams",
      username: "@will",
      body: "Simplified our workflow dramatically. The mobile app integration was seamless and super useful.",
      img: "https://avatars.githubusercontent.com/u/89768406",
      stars: 5
    },
    {
      name: "Sarah",
      username: "@sarah",
      body: "Simplified our workflow dramatically. The mobile app integration was seamless and super useful.",
      img: "https://avatars.githubusercontent.com/u/59228569",
      stars: 4
    },
  ];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  stars,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  stars: number;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="img" src={img} />
        <div className="flex flex-col">
            <div className=" flex space-x-1">

          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="currentColor"
              className="h-4 w-4 text-blue-500"
              >
              <path
                d="M17.7508 9.41667C17.7508 8.1 17.0217 6.95833 15.9608 6.41667C16.0892 6.05417 16.1592 5.6625 16.1592 5.25C16.1592 3.40833 14.7342 1.91833 12.9775 1.91833C12.5858 1.91833 12.2108 1.98833 11.8642 2.12667C11.3492 1.0125 10.2592 0.25 9.00083 0.25C7.7425 0.25 6.65417 1.01417 6.13667 2.125C5.79083 1.9875 5.415 1.91667 5.02333 1.91667C3.265 1.91667 1.84167 3.40833 1.84167 5.25C1.84167 5.66167 1.91083 6.05333 2.03917 6.41667C0.979167 6.95833 0.25 8.09833 0.25 9.41667C0.25 10.6625 0.901667 11.7483 1.86833 12.3217C1.85167 12.4633 1.84167 12.605 1.84167 12.75C1.84167 14.5917 3.265 16.0833 5.02333 16.0833C5.415 16.0833 5.79 16.0117 6.13583 15.875C6.6525 16.9867 7.74083 17.75 9 17.75C10.26 17.75 11.3483 16.9867 11.8642 15.875C12.21 16.0108 12.585 16.0817 12.9775 16.0817C14.7358 16.0817 16.1592 14.59 16.1592 12.7483C16.1592 12.6033 16.1492 12.4617 16.1317 12.3208C17.0967 11.7483 17.7508 10.6625 17.7508 9.4175V9.41667ZM12.2375 6.63833L8.62583 12.055C8.505 12.2358 8.3075 12.3333 8.105 12.3333C7.98583 12.3333 7.865 12.3 7.75833 12.2283L7.6625 12.15L5.65 10.1375C5.40583 9.89333 5.40583 9.4975 5.65 9.25417C5.89417 9.01083 6.29 9.00917 6.53333 9.25417L8.00833 10.7267L11.1958 5.94333C11.3875 5.65583 11.7758 5.58 12.0625 5.77083C12.3508 5.9625 12.4292 6.35083 12.2375 6.6375V6.63833Z"
                />
            </svg>
                </div>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
      <div className="mt-4 flex items-center gap-1">
        {[...Array(stars)].map((_, i) => (
          <StarIcon
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    </figure>
  );
};

export function MovingCard() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden lg:rounded-lg border bg-background md:shadow-xl mb-4">
        <div className=" my-10">
          <h2 className="text-center text-base font-semibold text-blue-400 mb-2">
          Real-World Experiences
        </h2>
        <h1 className="text-center lg:text-3xl text-xl font-serif font-bold">
          What our customers say
        </h1>
        </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}





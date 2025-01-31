"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { client } from "@/lib/client";
import { Modal } from "@/components/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const isEmojiOrImageUrl = (value: string) => {
  const emojiRegex = /\p{Emoji}/u;
  const urlRegex = /^(https?:\/\/|\/)[^\s]+$/;
  return emojiRegex.test(value) || urlRegex.test(value);
};

const EVENT_CATEGORY_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
  emoji: z.string().refine(isEmojiOrImageUrl, {
    message: "Invalid emoji or image URL",
  }),
});

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>;

const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
  "#FFD700", // bg-[#FFD700] ring-[#FFD700] Gold
  "#F0F1F1", // bg-[#F0F1F1] ring-[#F0F1F1] Slate
  "#8A2BE2", // bg-[#8A2BE2] ring-[#8A2BE2] Blue Violet
  "#00CED1", // bg-[#00CED1] ring-[#00CED1] Dark Turquoise
  "#FF4500", // bg-[#FF4500] ring-[#FF4500] Orange Red
  "#FFFFFF", // bg-[#FFFFFF] ring-[#FFFFFF] whiteh-screen
  "#DA70D6", // bg-[#DA70D6] ring-[#DA70D6] Orchid
  "#32CD32", // bg-[#32CD32] ring-[#32CD32] Lime Green
  "#FF1493", // bg-[#FF1493] ring-[#FF1493] Deep Pink
  "#1E90FF", // bg-[#1E90FF] ring-[#1E90FF] Dodger Blue
  "#FFDAB9", // bg-[#FFDAB9] ring-[#FFDAB9] Peach Puff
  "#B22222", // bg-[#B22222] ring-[#B22222] Firebrick
];

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar 1" },
  { emoji: "🚀", label: "Launch 1" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification 1" },
  { emoji: "/Notification.png", label: "Notification 2", isImage: true },
  { emoji: "/file.svg", label: "File", isImage: true },
  { emoji: "/globe.svg", label: "Globe", isImage: true },
  {
    emoji: "/asset-profile-picture.jpeg",
    label: "Profile Picture",
    isImage: true,
  },
  { emoji: "/Remix_Money_Esmerald.png", label: "Remix Money", isImage: true },
  { emoji: "/Member.png", label: "Member", isImage: true },
  { emoji: "/GomaConfettiPopper.png", label: "Confetti Popper", isImage: true },
  { emoji: "/CatParty.gif", label: "Cat Party", isImage: true },
  { emoji: "/AutumnParty.png", label: "Autumn Party", isImage: true },
  { emoji: "/FrogConfetti.gif", label: "Frog Confetti", isImage: true },
  { emoji: "/calendar.gif", label: "Calendar 2", isImage: true },
  { emoji: "/Calendar.png", label: "Calendar 3", isImage: true },
  { emoji: "/rocket_animated.gif", label: "Rocket 2", isImage: true },
  { emoji: "/Rocket.png", label: "Rocket 3", isImage: true },
  { emoji: "/GUPE_ROCKET.gif", label: "GUPE Rocket", isImage: true },
  {
    emoji: "/GummyDragonMicrophone.gif",
    label: "Gummy Dragon Microphone",
    isImage: true,
  },
  { emoji: "/Announce.gif", label: "Announce", isImage: true },
  {
    emoji: "/Anouncements_Animated.gif",
    label: "Animated Announcement",
    isImage: true,
  },
  { emoji: "/blue_megaphone.png", label: "Blue Megaphone", isImage: true },
  { emoji: "/pepe_graduate.png", label: "Pepe Graduate", isImage: true },
  { emoji: "/Trophy.gif", label: "Trophy", isImage: true },
  { emoji: "/Soccer_Trophy.png", label: "Soccer Trophy", isImage: true },
  { emoji: "/spare_bulb.png", label: "Spare Bulb", isImage: true },
  { emoji: "/Bulbasaur.gif", label: "Bulbasaur", isImage: true },
  { emoji: "/light_bulb.gif", label: "Light Bulb", isImage: true },
  { emoji: "/BulbaOWO.png", label: "Bulba OWO", isImage: true },
  { emoji: "/BulbaConfused.png", label: "Confused Bulba", isImage: true },
  { emoji: "/sinner.png", label: "Sinner", isImage: true },
  { emoji: "/KirinoWow.gif", label: "Kirino Wow", isImage: true },
  { emoji: "/MenheraConfetti.png", label: "Menhera Confetti", isImage: true },
  { emoji: "/Fightme.gif", label: "Fight Me", isImage: true },
  { emoji: "/Wow_emoji.png", label: "Wow Emoji", isImage: true },
  { emoji: "/Emoji_confused.png", label: "Confused Emoji", isImage: true },
  { emoji: "/Cry_emoji.png", label: "Cry Emoji", isImage: true },
  { emoji: "/Laugh_emoji.png", label: "Laugh Emoji", isImage: true },
  { emoji: "/SirLight_Smile.gif", label: "SirLight Smile", isImage: true },
  {
    emoji: "/Remix_Sao_Yang_Furia.png",
    label: "Remix Sao Yang Furia",
    isImage: true,
  },
  { emoji: "/Sorry.png", label: "Sorry", isImage: true },
  { emoji: "/Nezuko_Wow.png", label: "Nezuko Wow", isImage: true },
];

interface CreateEventCategoryModel extends PropsWithChildren {
  containerClassName?: string;
}

export const CreateEventCategoryModal = ({
  children,
  containerClassName,
}: CreateEventCategoryModel) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const { mutate: createEventCategory, isPending } = useMutation({
    mutationFn: async (data: EventCategoryForm) => {
      await client.category.createEventCategory.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
      setIsOpen(false);

      toast.custom((t) => (
        <AnimatePresence>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="relative group flex items-center gap-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-850 p-4 pl-3 pr-5 rounded-xl border border-green-100 dark:border-emerald-900/60 shadow-2xl shadow-green-100/30 dark:shadow-gray-950/50 hover:shadow-green-200/40 dark:hover:shadow-emerald-900/40 transition-all duration-300"
          >
            {/* Progress bar with Framer Motion */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-50/30 dark:bg-emerald-900/10 rounded-t-xl overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-400 origin-left"
              />
            </div>

            {/* Icon with subtle bounce */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex-shrink-0 p-2 bg-white dark:bg-gray-850 rounded-lg shadow-sm border border-green-50 dark:border-emerald-900/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </motion.div>

            {/* Text content with fade-in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-0.5"
            >
              <div className="space-y-0.5">
                <h3 className="font-semibold text-green-900 dark:text-emerald-100 text-[15px] tracking-tight">
                  Category Created
                </h3>
                <p className="text-sm text-green-700/90 dark:text-emerald-300/90 font-medium">
                  Successfully added to your collection!
                </p>
              </div>
            </motion.div>

            {/* Glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 -z-10 bg-gradient-to-r from-green-200/20 to-emerald-200/20 dark:from-emerald-900/10 dark:to-green-900/10 rounded-xl blur-sm"
            />
          </motion.div>
        </AnimatePresence>
      ));

    
    },
    onError: () => {
      toast.custom((t) => {
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 bg-slate-300 dark:bg-gray-850 p-4 pr-6 rounded-xl border border-gray-150 dark:border-gray-700 shadow-xl hover:shadow-lg transition-all duration-200 backdrop-blur-sm bg-opacity-90"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="flex-shrink-0 p-2 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg"
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ yoyo: Infinity, duration: 2 }}
                  className="text-xl text-blue-600 dark:text-blue-300 inline-block"
                >
                  🔒
                </motion.span>
              </motion.div>
      
              <div className="flex-grow">
                <motion.h3
                  initial={{ y: 5 }}
                  animate={{ y: 0 }}
                  className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-base"
                >
                  Event Categories Locked
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-600 dark:text-gray-300 leading-snug"
                >
                  Upgrade to{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                    PRO Plan
                  </span>
                </motion.p>
              </div>
      
              <motion.button
                whileHover={{ scale: 1.05, background: `linear-gradient(to bottom right`}}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => (window.location.href = "/pricing")}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium bg-gradient-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white rounded-lg shadow-sm relative overflow-hidden"
              >
                <span className="relative z-10">Upgrade Now</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-white/10 backdrop-blur-[1px] rounded-lg"
                />
              </motion.button>
            </motion.div>
      
            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-900 origin-left"
            />
          </motion.div>
        );
      });
      setIsOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  });

  const color = watch("color");
  const selectedEmoji = watch("emoji");

  useEffect(() => {
    const imagePromises = EMOJI_OPTIONS.filter((option) => option.isImage).map(
      (option) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = option.emoji;
          img.onload = resolve;
          img.onerror = resolve;
        });
      }
    );

    Promise.all(imagePromises).then(() => {
      setLoading(false);
    });
  }, []);

  const onSubmit = (data: EventCategoryForm) => {
    createEventCategory(data);
  };

  return (
    <>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      <Modal
        className="max-w-xl p-8 rounded-xl shadow-2xl border border-gray-100"
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              ✨ New Event Category
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Organize your events with custom categories. Choose a name, color,
              and emoji to get started.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Category Name
              </Label>
              <Input
                autoFocus
                id="name"
                {...register("name")}
                placeholder="e.g. user-signup"
                className="w-full focus:ring-2 focus:ring-blue-500 transition-all"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-rose-500 flex items-center gap-1.5">
                  <FaExclamationCircle className="w-4 h-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Accent Color</Label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((premadeColor) => (
                  <button
                    key={premadeColor}
                    type="button"
                    style={{ backgroundColor: premadeColor }}
                    className={cn(
                      "size-10 rounded-full border-2 border-white shadow-sm hover:scale-105 transition-transform",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                      color === premadeColor
                        ? "scale-110 ring-2 ring-offset-2 ring-blue-500"
                        : "hover:ring-2 hover:ring-gray-200"
                    )}
                    onClick={() => setValue("color", premadeColor)}
                  />
                ))}
              </div>
              {errors.color && (
                <p className="mt-1.5 text-sm text-rose-500 flex items-center gap-1.5">
                  <FaExclamationCircle className="w-4 h-4" />
                  {errors.color.message}
                </p>
              )}
            </div>

            <Label className="text-gray-700">Category Emoji</Label>
            <div className="flex flex-wrap gap-3 relative overflow-y-auto max-h-64 scrollbar-hide">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                  {/* <div className="loader">Loading...</div> */}
                </div>
              )}

              {EMOJI_OPTIONS.map(({ emoji, label, isImage }) => (
                <button
                  key={`${emoji}-${label}`}
                  type="button"
                  className={cn(
                    "size-12 flex items-center justify-center text-2xl rounded-xl",
                    "transition-all duration-200 ease-in-out transform",
                    "hover:bg-blue-50 hover:border-blue-100 hover:scale-105",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-105",
                    selectedEmoji === emoji
                      ? "bg-blue-50 border-blue-500 scale-110 shadow-md"
                      : "border-transparent"
                  )}
                  onClick={() => setValue("emoji", emoji)}
                  disabled={loading}
                >
                  {isImage ? (
                    <img src={emoji} alt={label} className="w-8 h-8" />
                  ) : (
                    emoji
                  )}
                </button>
              ))}
            </div>

            {errors.emoji && (
              <p className="mt-1.5 text-sm text-rose-500 flex items-center gap-1.5">
                <FaExclamationCircle className="w-4 h-4" />
                {errors.emoji.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-50 hover:text-black"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="relative hover:-translate-y-0.5 transition-transform"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Category"
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

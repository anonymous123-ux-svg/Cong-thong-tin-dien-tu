import type { CourseInstructor } from "./types";

export const instructorsMock: CourseInstructor[] = [
  {
    id: "lead-aris-thorne",
    kind: "lead",
    roleLabel: "Lead Instructor",
    name: "Dr. Aris Thorne",
    bio: "Former Head of Quantum Research at Horizon Labs. Dr. Thorne brings 15 years of industry experience bridging theoretical physics and practical quantum algorithms. He believes in making complex concepts accessible through rigorous, foundational understanding.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgaiI481MqzktM1HeW0H0w8lJ7XoX7M5f0wl2-98cN0BRJqIY49JWvOmXB3XC0datD687kMV-i2zK7HW2IKkmpu3P5n-QWinbOUQKE2U3PkX2I6U3qv7aoY2iAGpqQTmuxefnZNV3xJQ9UMgFf_MeOAf9v108N0K7wQMOY2h_Ytma2gmfMaOj6vzCou6Pvq6guNFRdIqJm1qCqj1V8_3YR6lp-S5K5TCcjJAOHI98x-XePQFh7AcPgX3eqPSEQYvtYb7pyutnZSiYk",
    availabilityLabel: "Office Hours: Tue & Thu, 2PM - 4PM EST",
    primaryActionLabel: "Contact",
    secondaryActions: [{ label: "Email" }, { label: "Work" }],
  },
  {
    id: "ta-elena-rostova",
    kind: "assistant",
    roleLabel: "Teaching Assistant",
    name: "Elena Rostova",
    bio: "Ph.D. candidate focusing on quantum error correction. Elena leads the Friday seminar sessions and is your primary point of contact for assignment-specific queries.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_1ZZXzzJVF5YBRLCtOyPVeRb0ZiiIl2oXT6QBVKBJ8VIVwvNxISbGoTC4AWJCa0OUDtmdQsKnMXRW5gRytU0zB-iRmReTh7q6CP2Rp6CbQKBiT_lt44A0J8GCOM7pIa_D_mOKidtmfWXE5XPkZrZnQnXGVe4xYklF3bo7lsDA2SgUPem8OAzSyrnK9eY1DAK4rAeOjAKnKZizRaYkM7s4BcPHQS_5TD0YudQcbGsA0fllo0dDGKLLzL1Om6NCut3SBfeB9fmCnjL7",
    availabilityLabel: "Wed, 10AM - 12PM EST",
    primaryActionLabel: "Message",
    secondaryActions: [{ label: "Link" }],
  },
  {
    id: "ta-marcus-chen",
    kind: "assistant",
    roleLabel: "Teaching Assistant",
    name: "Marcus Chen",
    bio: "Specializes in quantum hardware architecture. Marcus manages the virtual lab environments and assists with the practical implementation modules.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKwQ8av4KjeT7__nnkdlM29spY0J7iS3slPZPTTZJHaEgzZBKOrNPkqhE81W9X9vRsDcQK0Gi2TlaO0zzKavAqstPmH-KfKgZE18b1rB2W2Y9yOBC8aUlXkNlZpaEou3B7z6fKA6Cs1rfS4b5fbm2x4PW_A-a3VbAWKt-5QQp3WzQUSZ35JtR8j6pVBNweL7fNEiJEtqKUAoAznCYLQyEb1vUgD5vH8jl2Dipl_EX62bzEY-YsjwkJ4FqdSCWh-t0kFkVcxv3njaIk",
    availabilityLabel: "Mon, 3PM - 5PM EST",
    primaryActionLabel: "Message",
    secondaryActions: [{ label: "Link" }],
  },
  {
    id: "guest-sarah-jenkins",
    kind: "guest",
    roleLabel: "Guest Lecturer",
    name: "Dr. Sarah Jenkins",
    bio: "VP of Quantum Engineering at Q-Sys. Dr. Jenkins will be delivering a special 3-part module on commercial applications of quantum cryptography in Week 8.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlgrmtS5tXmK-ssS2i8oozXTwMbbuYmb7tpEGuLhRJ6Ix9VxnR1WjknwROwu9U5JusIHu91XUkH55KfQvhaD7U-JukLs_aSMbHXI7BpL-WfDxdLpOSbEvvSJWQBiKswp_hg1FsqAhdiY0pVWQs-LxLBnZJitvfwbZe5YcNp-SXyGolGAstsbeIt7UIXkL4JPfBOnJECvmr_dHDT40z9hB5opr9TgEscuMLCRTvUY5_RS8-bAEpVcBPLCig6ifPLwKjrklM2-EMCXBE",
    availabilityLabel: "Special Sessions Only",
    primaryActionLabel: "View Module",
  },
];

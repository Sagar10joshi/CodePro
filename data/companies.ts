export interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  leetcodeUrl: string
  videoUrl?: string
}

export interface Company {
  name: string
  problems: Problem[]
}

export const companies: Company[] = [
  {
    name: "Google",
    problems: [
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        leetcodeUrl: "https://leetcode.com/problems/two-sum/",
        videoUrl: "https://youtu.be/7jDS9KQEDbI?si=CAtDeWiCrUltCZhs",
      },
      {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        tags: ["Linked List", "Math"],
        leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
        videoUrl: "https://youtu.be/XmRrGzR6udg?si=2OGhTmRN93fpFGjW",
      },
      {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        tags: ["Hash Table", "String", "Sliding Window"],
        leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        videoUrl: "https://youtu.be/T-Oj2Ajj9vA?si=ODZ0lUiTVZA4L8xz",
      },
      {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        videoUrl: "https://youtu.be/F9c7LpRZWVQ?si=YqTayuyYEb8JtypX",
      },
      {
        id: 5,
        title: "Valid Parentheses",
        difficulty: "Easy",
        tags: ["String", "Stack"],
        leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
        videoUrl: "https://youtu.be/TaWs8tIrnoA?si=LmeMENiWkb35y9WI",
      },
    ],
  },
  {
    name: "Amazon",
    problems: [
      {
        id: 6,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        tags: ["Linked List", "Recursion"],
        leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
        videoUrl: "https://youtu.be/f8RPIb-0DDE?si=dnfx_wlhcYKvEdH9",
      },
      {
        id: 7,
        title: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        tags: ["Array", "Two Pointers"],
        leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        videoUrl: "https://youtu.be/f1BTfBv22og?si=FN0Hny-AA0bexsFR",
      },
      {
        id: 8,
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        tags: ["Array", "Binary Search"],
        leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        videoUrl: "https://youtu.be/6WNZQBHWQJs?si=A_O6FJsfhNO_r4Id",
      },
      {
        id: 9,
        title: "Combination Sum",
        difficulty: "Medium",
        tags: ["Array", "Backtracking"],
        leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
        videoUrl: "https://youtu.be/OyZFFqQtu98?si=lcf5-KrebstczLpp",
      },
      {
        id: 10,
        title: "Trapping Rain Water",
        difficulty: "Hard",
        tags: ["Array", "Two Pointers", "Dynamic Programming"],
        leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
        videoUrl: "https://youtu.be/ZI2z5pq0TqA?si=j1GGIswgJdwaw-Ad",
      },
    ],
  },
  {
    name: "Microsoft",
    problems: [
      {
        id: 11,
        title: "Reverse Integer",
        difficulty: "Easy",
        tags: ["Math"],
        leetcodeUrl: "https://leetcode.com/problems/reverse-integer/",
        videoUrl: "https://youtu.be/0fwrMYPcGQ0?si=u4lGasfDfMJGYESw",
      },
      {
        id: 12,
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        tags: ["String"],
        leetcodeUrl: "https://leetcode.com/problems/string-to-integer-atoi/",
        videoUrl: "https://youtu.be/An1BTSYpOIY?si=CdvhpWFND4zWmIpa",
      },
      {
        id: 13,
        title: "Container With Most Water",
        difficulty: "Medium",
        tags: ["Array", "Two Pointers"],
        leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
        videoUrl: "https://youtu.be/EbkMABpP52U?si=iD2FvesO8nfaed4F",
      },
      {
        id: 14,
        title: "3Sum",
        difficulty: "Medium",
        tags: ["Array", "Two Pointers"],
        leetcodeUrl: "https://leetcode.com/problems/3sum/",
        videoUrl: "https://youtu.be/cRBSOz49fQk?si=JF8s0dXDAxTMk6NQ",
      },
      {
        id: 15,
        title: "Regular Expression Matching",
        difficulty: "Hard",
        tags: ["String", "Dynamic Programming", "Recursion"],
        leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/",
        videoUrl: "https://youtu.be/HAA8mgxlov8?si=Tc-fJ5Ipe-jtilNM",
      },
    ],
  },
  {
    name: "Apple",
    problems: [
      {
        id: 16,
        title: "Palindrome Number",
        difficulty: "Easy",
        tags: ["Math"],
        leetcodeUrl: "https://leetcode.com/problems/palindrome-number/",
        videoUrl: "https://www.youtube.com/watch?v=yubRKwixN-U",
      },
      {
        id: 17,
        title: "Roman to Integer",
        difficulty: "Easy",
        tags: ["Hash Table", "Math", "String"],
        leetcodeUrl: "https://leetcode.com/problems/roman-to-integer/",
        videoUrl: "https://www.youtube.com/watch?v=3jdxYj3DD98",
      },
      {
        id: 18,
        title: "Longest Common Prefix",
        difficulty: "Easy",
        tags: ["String"],
        leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
        videoUrl: "https://www.youtube.com/watch?v=bl8ue-dTxgs",
      },
      {
        id: 19,
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        tags: ["Hash Table", "String", "Backtracking"],
        leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        videoUrl: "https://www.youtube.com/watch?v=0snEunUacZY",
      },
      {
        id: 20,
        title: "Wildcard Matching",
        difficulty: "Hard",
        tags: ["String", "Dynamic Programming", "Greedy", "Recursion"],
        leetcodeUrl: "https://leetcode.com/problems/wildcard-matching/",
        videoUrl: "https://www.youtube.com/watch?v=3ZDZ-N0EPV0",
      },
    ],
  },
  {
    name: "Meta",
    problems: [
      {
        id: 21,
        title: "Remove Element",
        difficulty: "Easy",
        tags: ["Array", "Two Pointers"],
        leetcodeUrl: "https://leetcode.com/problems/remove-element/",
        videoUrl: "https://www.youtube.com/watch?v=Pcd1ii9P9ZI",
      },
      {
        id: 22,
        title: "Implement strStr()",
        difficulty: "Easy",
        tags: ["Two Pointers", "String"],
        leetcodeUrl: "https://leetcode.com/problems/implement-strstr/",
        videoUrl: "https://www.youtube.com/watch?v=BQ9E-2umSWc",
      },
      {
        id: 23,
        title: "Next Permutation",
        difficulty: "Medium",
        tags: ["Array", "Two Pointers"],
        leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
        videoUrl: "https://www.youtube.com/watch?v=LuLCLgMElus",
      },
      {
        id: 24,
        title: "Search for a Range",
        difficulty: "Medium",
        tags: ["Array", "Binary Search"],
        leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        videoUrl: "https://www.youtube.com/watch?v=4sQL7R5ySUU",
      },
      {
        id: 25,
        title: "First Missing Positive",
        difficulty: "Hard",
        tags: ["Array", "Hash Table"],
        leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/",
        videoUrl: "https://www.youtube.com/watch?v=8g78yfzMlao",
      },
    ],
  },
  {
    name: "Netflix",
    problems: [
      {
        id: 26,
        title: "Search Insert Position",
        difficulty: "Easy",
        tags: ["Array", "Binary Search"],
        leetcodeUrl: "https://leetcode.com/problems/search-insert-position/",
        videoUrl: "https://www.youtube.com/watch?v=K-RYzDZkzCI",
      },
      {
        id: 27,
        title: "Count and Say",
        difficulty: "Medium",
        tags: ["String"],
        leetcodeUrl: "https://leetcode.com/problems/count-and-say/",
        videoUrl: "https://youtu.be/5uJitfSM3vk?si=UhDsIL60cKLfaWW9",
      },
      {
        id: 28,
        title: "Permutations",
        difficulty: "Medium",
        tags: ["Array", "Backtracking"],
        leetcodeUrl: "https://leetcode.com/problems/permutations/",
        videoUrl: "https://www.youtube.com/watch?v=s7AvT7cGdSo",
      },
      {
        id: 29,
        title: "Rotate Image",
        difficulty: "Medium",
        tags: ["Array", "Math", "Matrix"],
        leetcodeUrl: "https://leetcode.com/problems/rotate-image/",
        videoUrl: "https://www.youtube.com/watch?v=fMSJSS7eO1w",
      },
      {
        id: 30,
        title: "N-Queens",
        difficulty: "Hard",
        tags: ["Array", "Backtracking"],
        leetcodeUrl: "https://leetcode.com/problems/n-queens/",
        videoUrl: "https://www.youtube.com/watch?v=Ph95IHmRp5M",
      },
    ],
  },
]

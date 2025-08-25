import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "../components/ThemeProvider"
import { AuthProvider } from "../components/AuthProvider"

export const metadata: Metadata = {
  title: "CodePro - Master Coding Interviews",
  description:
    "Practice coding problems from top tech companies and track your progress",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.variable}`}>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}




































// import type React from "react"
// import type { Metadata } from "next"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
// import "./globals.css"
// import { ThemeProvider } from "../components/ThemeProvider"
// import { AuthProvider } from "../components/AuthProvider"

// export const metadata: Metadata = {
//   title: "CodePractice Pro - Master Coding Interviews",
//   description: "Practice coding problems from top tech companies and track your progress",
//   generator: "v0.app",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <style>{`
// html {
//   font-family: ${GeistSans.style.fontFamily};
//   --font-sans: ${GeistSans.variable};
//   --font-mono: ${GeistMono.variable};
// }
//         `}</style>
//       </head>
//       <body>
//         <ThemeProvider>
//           <AuthProvider>{children}</AuthProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }







